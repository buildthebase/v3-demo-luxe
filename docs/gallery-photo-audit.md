# Gallery photo coverage, November 20, 2026

Added 29 unique photo files, increasing the gallery from 57 to 86 photos, plus the existing five films. Kept masonry, natural proportions, filters, and the full-screen viewer.

Included all six wedding hero photos, five wedding branding photos, three other occasion heroes, the churro image, the remaining registered baby shower/corporate/rental/wedding details, and the matching Café Dea guests photograph from the project's original `public/images/experiences/coffee.JPG`.

The Café Dea JPEG was rotated using its EXIF orientation, resized without cropping to 900 × 1600, and encoded as AVIF at quality 82 with 4:4:4 chroma. Original remains untouched. New asset: `public/images/gallery/cafe-dea-guests.avif` (131,329 bytes).

## Screenshot cross-check

| Screenshot | Photos | Result |
| --- | --- | --- |
| 12.50.03 | Mercado do Café; Café Bébé bow cart; Café Bébé cups; Café Bébé classic cart; She Flirts cart; Sonali cart; IMG_8725/Sonali cup | All seven already included via the Coffee Bar branding collection. |
| 12.50.06 | Café Dea custom stickers/cart; DSC03850 two cups on board | Custom stickers/cart added using `corporateBranding`; two-cup photo already present via `coffeeBar`. |
| 12.50.56 | Mother and child; woman in a sombrero beside globe lights | Mother and child added using current birthday hero. Second photo not matched in project; awaiting full photo from user. |
| 12.51.03 | Bride holding coffee; smiling woman holding cup | Bride added using current bridal hero. Second photo not matched in project; awaiting full photo from user. |
| 12.51.37 | DSC03853, DSC03823, DSC03832, DSC03861, DSC03839 | DSC03832 matched to `coffee.JPG`, optimized and added. Other four originals not found in project; awaiting full photos from user. |

No cropped screenshots were used as substitute photographs. Logos, duplicate historical encodings, and standalone video posters are excluded from the photo additions. Film posters remain attached to their films.

Refresh gallery thumbnails after adding an asset:

```sh
node scripts/generate-gallery-previews.mjs
```

Validation: gallery filter and coverage regression checks, TypeScript, targeted lint, production build, desktop viewer/navigation and mobile filtering/layout.
