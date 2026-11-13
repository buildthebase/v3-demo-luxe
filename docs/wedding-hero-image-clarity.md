# Wedding hero clarity

Placement: `/events/weddings`, existing hero photo. Enhanced with the built-in image-generation tool, then encoded to AVIF with Sharp (quality 74, effort 8, 4:4:4 chroma). The original WebP is preserved. The portrait framing remains unchanged. Direct delivery avoids a second lossy image-optimizer pass; eager loading and high fetch priority remain enabled. This photo is now the first slide in the six-photo hero carousel described in `wedding-hero-carousel.md`, with full photographs fitted into a consistent 3:4 frame and controls below the photo.

Final asset: `public/images/weddings/wedding-hero-dessert-moment-clear-v2.avif`.

Dimensions: 941 × 1672. File size: 135,604 bytes, compared with the original's 192,572 bytes (about 30% smaller). Verified in the local wedding-page preview at 1440px and 390px widths: image loads successfully, existing crop is maintained, no horizontal overflow, no headline overlap on desktop and no browser console errors. The preview server remains running on port 3000.

Original: `public/images/weddings/wedding-hero-dessert-moment.webp`.

Generated master: `/Users/micholas/.codex/generated_images/01a02fa4-5959-72c1-b49b-09f08fb9b9a6/exec-cab0645d-0c6b-4619-a1cb-2c4bfe23583c.png`.

AI restoration reconstructs fine detail. It is an enhanced derivative of the actual event photograph, not a pixel-faithful photographic original.

## Final prompt

Use case: identity-preserve photographic restoration. Edit target: the supplied REAL Luxe wedding-event portrait, currently the wedding page hero. Enhance this exact photograph for noticeably better natural clarity, not a replacement scene. Keep the complete original 941:1672 portrait composition, identical viewpoint, full framing, exact people, faces, identities, expressions, anatomy, hands, pose, hairstyle, white wedding dress with pearl straps and off-shoulder fabric, man's white shirt and dark suspenders, dessert plate, cart frame, glass globe lights, doors, ceiling, wall and red EXIT sign. Do not crop, zoom, reframe, add or remove anything. Improve the fine detail around both faces, eyes, hair, fingers, dessert, white fabric folds and cart/light edges. Gently lift the underexposed faces and foreground so they are clear and readable, reducing muddy low-light softness and compression while retaining natural skin texture and the warm indoor wedding atmosphere. Hold highlight detail in the globe lights and white clothing, preserve authentic lighting, original facial features and genuine photographic depth of field. No facial beautification or reshaping, plastic skin, invented embroidery, false lettering, aggressive halos, artificial HDR, or oversaturated colours. Produce one high-resolution enhanced version of this same image, portrait aspect ratio matching the input as closely as possible, with crisp authentic-looking editorial photographic detail.
