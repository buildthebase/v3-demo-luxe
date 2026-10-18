"""Track imagegen-retouched clean plates through the existing stabilized video.

This composites only the clear hopper panels and the cup area in the sink.
The live beans, hands, portafilter and coffee stream remain original footage.
Requires numpy and opencv-python-headless in the processing environment only.
"""
import argparse
import json
import subprocess

import cv2
import numpy as np

parser = argparse.ArgumentParser()
parser.add_argument("source")
parser.add_argument("plate")
parser.add_argument("output")
args = parser.parse_args()
width, height, fps = 1080, 1720, 30

reader = cv2.VideoCapture(args.source)
frames = []
while True:
    ok, frame = reader.read()
    if not ok:
        break
    frames.append(frame)
reader.release()
reference = frames[30]
reference_gray = cv2.cvtColor(reference, cv2.COLOR_BGR2GRAY)
plate = cv2.resize(cv2.imread(args.plate), (width, height), interpolation=cv2.INTER_LANCZOS4)

# Register the generated plate back to the exact source-frame geometry.
sift = cv2.SIFT_create(nfeatures=5000)
kp_plate, desc_plate = sift.detectAndCompute(cv2.cvtColor(plate, cv2.COLOR_BGR2GRAY), None)
kp_ref, desc_ref = sift.detectAndCompute(reference_gray, None)
matches = cv2.BFMatcher().knnMatch(desc_plate, desc_ref, k=2)
good = [a for a, b in matches if a.distance < 0.7 * b.distance]
plate_to_ref, inliers = cv2.findHomography(
    np.float32([kp_plate[m.queryIdx].pt for m in good]),
    np.float32([kp_ref[m.trainIdx].pt for m in good]), cv2.RANSAC, 3,
)
if plate_to_ref is None or int(inliers.sum()) < 30:
    raise RuntimeError("Clean plate registration failed")
plate = cv2.warpPerspective(plate, plate_to_ref, (width, height))

regions = [
    # Only acrylic above the beans: retain original beans and casing silhouette.
    {"name": "hopper", "polygons": [
        [(436, 331), (605, 348), (607, 421), (575, 421), (540, 432), (490, 453), (443, 475)],
        [(636, 345), (907, 320), (905, 462), (884, 444), (858, 426), (830, 415), (790, 405), (748, 405), (705, 410), (669, 417), (636, 425)],
    ], "track": (390, 270, 550, 450)},
    {"name": "sink", "polygons": [
        [(135, 1507), (255, 1478), (435, 1483), (500, 1528), (510, 1640), (475, 1719), (130, 1719)],
    ], "track": (0, 1370, 700, 350)},
]
for region in regions:
    mask = np.zeros((height, width), np.uint8)
    for polygon in region["polygons"]:
        cv2.fillPoly(mask, [np.array(polygon, np.int32)], 255)
    region["mask"] = cv2.GaussianBlur(mask.astype(np.float32) / 255, (0, 0), 5)
    track_mask = np.zeros_like(mask)
    x, y, w, h = region["track"]
    track_mask[y:y+h, x:x+w] = 255
    track_mask[mask > 0] = 0
    region["points"] = cv2.goodFeaturesToTrack(reference_gray, 300, 0.01, 8, mask=track_mask)

encoder = subprocess.Popen([
    "ffmpeg", "-hide_banner", "-loglevel", "error", "-f", "rawvideo",
    "-pix_fmt", "bgr24", "-s", f"{width}x{height}", "-r", str(fps),
    "-i", "pipe:0", "-an", "-c:v", "ffv1", args.output,
], stdin=subprocess.PIPE)
diagnostics = []
for index, frame in enumerate(frames):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    output = frame.astype(np.float32)
    for region in regions:
        points = region["points"]
        target, status, _ = cv2.calcOpticalFlowPyrLK(
            reference_gray, gray, points, None, winSize=(31, 31), maxLevel=4,
            criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 50, 0.005),
        )
        reverse, reverse_status, _ = cv2.calcOpticalFlowPyrLK(gray, reference_gray, target, None, winSize=(31, 31), maxLevel=4)
        valid = (status[:, 0] == 1) & (reverse_status[:, 0] == 1) & (np.linalg.norm(points[:, 0] - reverse[:, 0], axis=1) < 1.5)
        transform, fit = cv2.estimateAffinePartial2D(points[valid], target[valid], method=cv2.RANSAC, ransacReprojThreshold=1.5)
        if transform is None or int(fit.sum()) < 8:
            raise RuntimeError(f"Tracking failed at frame {index}, {region['name']}")
        moved_plate = cv2.warpAffine(plate, transform, (width, height), flags=cv2.INTER_CUBIC)
        alpha = cv2.warpAffine(region["mask"], transform, (width, height))[..., None]
        output = output * (1 - alpha) + moved_plate.astype(np.float32) * alpha
        diagnostics.append({"frame": index, "region": region["name"], "inliers": int(fit.sum()), "dx": round(float(transform[0, 2]), 3), "dy": round(float(transform[1, 2]), 3)})
    encoder.stdin.write(np.clip(output, 0, 255).astype(np.uint8).tobytes())
encoder.stdin.close()
if encoder.wait() != 0:
    raise RuntimeError("Video encoding failed")
print(json.dumps({"frames": len(frames), "registration_inliers": int(inliers.sum()), "minimum_tracking_inliers": min(d["inliers"] for d in diagnostics), "max_translation": max(max(abs(d["dx"]), abs(d["dy"])) for d in diagnostics)}))
