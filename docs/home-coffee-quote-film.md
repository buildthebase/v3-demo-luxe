# Homepage Coffee Bar quote film

## Current presentation: still image

At the user's request, the quote video has been replaced on desktop and mobile by the complete generated clean-plate still, not a frame from the tracked retouch. Current asset: `public/images/home/coffee-quote-preparation-clean.webp` (993 × 1583, quality 87). Shared asset `imageAssets.home.coffeeQuotePreparation` is lazy-loaded in the existing frame. The gallery entry is now a photo as well. Video files and the processing history below are retained but no longer referenced by these sections. Quote alignment and mobile placement are unchanged.

Source: `/Users/micholas/Downloads/coffee bar 2/C5024.mp4` (preserved, 2160 × 3840, approximately 15.7 MB).

Placement: on desktop, under the label in the left column of `#review-coffee`; on mobile, unchanged standalone placement directly above the quote. Muted looping playback, inline on mobile, loads near the viewport, pauses out of view, manual pause/play control, respects reduced-motion autoplay preferences. Only the visible responsive instance loads/plays. Also included in the gallery Coffee Bar collection.

Outputs: `public/images/home/coffee-quote-steady-v5.mp4`, `.webm`, and `coffee-quote-steady-v5-poster.webp`. 1080 × 1720 at 30 fps; approximately 3.33 seconds. The top 200 pixels (about 10%) are cropped after stabilization to reduce empty upper space and frame height without stretching. Earlier versions are preserved.

V5 object retouch: built-in image generation edits one reference frame (frame 30) to clean the transparent bean-hopper panels and remove the clear cup/utensil from the sink. The generated clean plate is retained at `docs/media/coffee-quote-clean-plate-v5.png`. Only feathered masks within those two areas are composited into the video, not the complete generated frame. `scripts/retouch-coffee-quote-video.py` registers the plate with SIFT/RANSAC and tracks each region through every frame using forward/backward-checked optical flow and robust affine fitting. Original hands, coffee stream, beans, grinder display and surrounding scene remain live. This is an AI-assisted localized retouch, not an unedited recording. Site framing, placement and loop behavior are unchanged. OpenCV was installed only into a temporary processing directory; site dependencies were not changed.

### V5 clean-plate prompt

Use case: precise-object-edit. Input image is an exact video frame, edit target for tracked video retouch. Keep EXACT framing, perspective, placement, scale, lighting, dimensions/aspect ratio of all elements. Change ONLY two things: (1) Remove the clear drinking cup with the tan utensil inside it from the small stainless steel sink at the very bottom left. Fill its former area with a naturally empty stainless steel basin, matching existing metal reflections and shallow depth of field; keep basin rim exactly in place. (2) Clean the transparent acrylic coffee bean hopper casing near the top center/right: remove dust, smudges, grime and coffee specks on the clear front and left panels; keep acrylic realistically transparent, its precise edges and seams intact, and preserve every coffee bean and bean level. Do not remove or change the round metal lid on the wooden counter bottom right. Keep barista hands, portafilter, coffee stream, grinder shape and display, background equipment and cups, countertop, wall and all other image areas unchanged. Do not brighten/color-grade, sharpen globally, move/reframe anything or change the aspect ratio. This must look like the same exact frame with only cup removal and hopper cleaning.

V4 clarity pass: regenerated from the original, not the compressed V3. Reduced denoising to retain texture, Lanczos resizing, spatially weighted contrast-adaptive sharpening strongest near the upper/lower frame. Light median cleanup blended into the clear hopper panel reduces small specks without replacing its shape, reflections or beans. H.264 CRF 20 / VP9 CRF 28 preserve more detail. Framing, duration, stabilization, loop, placement and cache policy unchanged. Original defocus remains: this is an enhancement, not reconstructed detail or a digitally pristine replacement casing. Filter graph: `scripts/coffee-quote-clarity-v4.ffgraph`; requires the existing first-pass stabilization transform at `/private/tmp/luxe-coffee-C5024.trf`.

V3 clarity pass: spatially weighted unsharp strength 0.65 (stronger near the top/bottom, gentler centrally), subtle contrast correction, localized temporal denoising and radius-1 median cleanup on the bean-hopper region. H.264 quality increased to CRF 22 and VP9 to CRF 30. This reduces noise/haze and improves perceived detail; it does not reconstruct genuinely out-of-focus content or digitally replace the hopper casing.

Processing: FFmpeg two-pass vidstab motion detection (shakiness 7, accuracy 15), transform smoothing 12 with automatic protective crop/zoom, bicubic interpolation, gentle hqdn3d denoising, slight exposure/contrast correction and unsharp 0.3. H.264 CRF 24 with fast-start metadata; VP9 CRF 32. Audio removed for muted atmospheric playback.

## Site-wide video caching

`public/_headers` matches all static MP4 and WebM paths, including nested paths: browser freshness 7 days, shared/CDN freshness 30 days, stale-while-revalidate 7 days. Existing filenames are not content hashes, so these are deliberately not marked immutable; retain ETag validation and always version filenames when replacing a cut. Loop playback reuses the browser's existing media buffer; no reload is performed on each loop. HTML and API response cache policies are unchanged.

Cloudflare Workers static asset headers and greedy single-splat URL patterns: https://developers.cloudflare.com/workers/static-assets/headers/

Vite development static responses use `no-cache` for hot reload, which is expected and does not represent deployed asset cache behaviour. Production CDN behaviour must be checked after deployment; this task does not publish.
