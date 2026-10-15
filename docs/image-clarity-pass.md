# Service-page image clarity pass

Pages: `/experiences/coffee-bar`, `/experiences/sweet-cart`, `/experiences/seating-rentals`.

All 23 rendered photographs use direct delivery of their existing compressed WebP/AVIF files (`unoptimized: true`), avoiding another lossy image-optimizer pass. This does not manufacture missing detail. Sixteen original photos remain unchanged. Seven softer photos were restored using the built-in image-generation tool and exported to quality-95 WebP without additional resizing. Original source files remain intact. Page layout, object-fit and object-position rules are unchanged.

AI restoration reconstructs detail and is not a pixel-faithful photographic original. Small lettering and faces should be treated as reconstructed, not evidence of the original event. Deliberate photographic background blur remains.

## Saved assets

All paths below are relative to `/Users/micholas/Documents/luxe-event-co/`.

| Page and placement | Saved asset |
| --- | --- |
| Coffee Bar hero | `public/images/experiences/coffee-bar-hero-clarity.webp` |
| Coffee Bar overview | `public/images/experiences/coffee-bar-overview-clarity.webp` |
| Sweet Cart hero | `public/images/experiences/sweet-cart-hero-clarity.webp` |
| Sweet Cart overview | `public/images/experiences/sweet-cart-overview-clarity.webp` |
| Sweet Cart evening gallery | `public/images/experiences/sweet-cart-decor-clarity.webp` |
| Seating Rentals hero | `public/images/experiences/seating-rentals-hero-clarity.webp` |
| Seating Rentals cocktail-table category | `public/images/experiences/cocktail-tables-clarity.webp` |

## Prompt set

Execution: built-in image-generation tool, one edit per original photograph. Each prompt used the following template, with the ratio and invariant text from the table substituted verbatim:

> Use case: precise-object-edit and photographic restoration. Edit target: supplied actual Luxe event photograph. Primary task: make image CRYSTAL CLEAR and professionally polished while keeping EXACT SAME viewpoint, framing, camera angle, relative object positions and composition. Do NOT zoom, reframe, widen, crop, outpaint, redesign scene, or add people, furniture, décor, products or text. Output ONE high-resolution {ratio} photograph. Improve genuine-looking fine detail and edge definition, reduce compression smearing and sensor noise, balance exposure, lift muddy shadows modestly, keep clean neutral whites and rich restrained contrast. Retain natural depth of field and real photographic texture; do not sharpen intentional background bokeh, make plastic faces, add halos, create fake HDR or heavy saturation. Invariants specific to this image: {invariants} Return an enhanced version of this SAME photograph, not a new scene or collage.

| Edit | Ratio | Invariants |
| --- | --- | --- |
| Coffee hero | square | The pale blue floral CAFÉ D’ÉA café cart, matching original menu wall with scalloped shelves and small awning, Rocket coffee equipment, exact lettering, flowers, cups and original ornate venue. Preserve ALL signage text and cart geometry. |
| Coffee overview | portrait about 941:1120 | Gold Leandro MERCADO DO CAFÉ EST.2025 cart with bow emblem, Rocket equipment, original flowers, menu frame, foreground lamps, original ivory room and floor. Preserve all branding exactly. |
| Sweet hero | portrait about1440:2227 | The same three-quarter angle of white fluted LuxeSweetCart, three glass pendant lamps, gold chef emblem, exact 'LuxeSweetCart' and 'Live Dessert Station' text, cooking machine and topping bins and sauces, black-white floor. Keep identical framing and warm illumination but correct muddy yellow cast. |
| Sweet overview | portrait about941:1120 | The exact woman in white and pink trousers and man in olive shirt enjoying dessert at the Sweet Cart. Preserve both identities, faces, clothes, hair, hands, poses, dessert plate and service equipment, cart and venue. Natural skin detail; no beautifying or changing faces. |
| Sweet decor | portrait 9:16 | Actual evening tent reception with LuxeSweetCart behind guests. Preserve every guest identity, face, pose and clothing; existing tables, chairs, tent fabric, three globe lamps and serving staff/cart. Lift crushed shadows so service and guests read clearly but retain believable evening ambience; do not turn into daytime or add decor. |
| Rentals hero | landscape about1554:960 | Existing stone-arched warm indoor reception with white folding resin chairs, round linen tables, original glassware and flowers, wooden beams and chandeliers. Keep exact venue architecture, same furniture models and layout, no additions. Whites luminous without overexposure, clarity in chair edges, glass and masonry. |
| Cocktail tables | landscape5:4 | Same actual glowing white cocktail tables, dark chairs and existing lanterns and glass bottles in blue/pink evening venue. Preserve exact table shapes, lantern arrangements and scene geometry. Improve focus and fine detail without exaggerated glow, oversaturation or changing furniture, do not invent guests. |
