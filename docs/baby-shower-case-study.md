# Baby shower case study — local review

The homepage `#combinations` section now uses the approved 14-second edit, with a portrait film and short Client request / We recommended / The result copy. The video loops silently, loads on intersection, pauses offscreen and respects reduced motion through the existing HomeEditorialVideo component. MP4 is fast-start H.264; WebM is VP9. Existing video cache headers apply. No borders, stretching or extra crops were added.

The single underlined CTA opens `/blog/baby-shower-custom-coffee-bar`. The user chose a regular linked article in local preview rather than a CMS-only draft. It therefore lives in the published content collection, but **this work has not been pushed or deployed**. Its October 29 date is the editorial date, not a claimed event date. Homepage and article copy use no baby names.

## Grounding

The user confirmed Coffee Bar was the only Luxe service booked. The family wanted custom cup and cart signage to blend into the shower’s colours and theme. The supplied footage establishes the visual setting. No guest count, venue, event date, menu, testimonial or performance result was supplied; none is claimed. Surrounding décor is not attributed to Luxe.

## Responsive review

Browser checks at widths 320, 390, 430, 768, 820, 1024, 1280 and 1920 found no page overflow or film/copy overlap. Mobile stacks a full-proportion film above the story; wider screens use two columns. All text, controls and media stay inside the section’s content bounds. The decorative full-bleed pseudo-element deliberately extends beyond those bounds. Controls have a 44px touch target.

The article link was followed from the mobile homepage; its title, image, copy and no-overflow state were verified. Additional checks cover article structure, name removal, service scope, matching CTA URL and media existence.

## Blog photograph revision

The article now uses a separate still extracted at 1.0 seconds from the original C8263 4K cart clip (autorotated 2160 × 3840), rather than the compressed 720px web film. The 1440 × 2560 WebP is encoded at quality 90 and served responsively. The homepage film and poster are unchanged. Portrait article heroes retain their intrinsic ratio and are capped at 32rem, preventing the landscape hero frame from cutting off the cart signage and wheels. No AI reconstruction or invented lettering was used.

The subsequent desktop revision adds `heroDesktopImage`: a 1920 × 1280 WebP extracted from the same original frame, cropping the top and bottom to a 3:2 view of the cart and menu. At 1024px and wider, a native picture source serves only this desktop crop, displayed at up to 960px wide (2× resolution). Mobile and portrait tablets retain the original portrait image and sizing. The portrait ratio is reserved while the chosen image loads.

The sharpness/loading revision adds AVIF picture sources made directly from the original lossless frame, with mild output sharpening (sigma 0.65) after resizing. Portrait widths: 480, 768, 1024, 1440. Landscape widths: 960, 1440, 1920. The browser chooses a single matching crop, size and format from native picture sources; WebP remains the fallback. Landscape AVIF payloads are 66,280 / 156,634 / 266,771 bytes, compared with the previous fixed 455KB WebP. Portrait payloads range from 68,079 to 434,812 bytes. No crop, text, colours or layout were changed during this pass.
