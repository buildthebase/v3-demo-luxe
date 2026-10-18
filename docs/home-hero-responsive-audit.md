# Homepage hero responsive spacing

## Plan and implementation

- Give the cinematic title, description and primary CTA separate content-sized grid rows instead of independently positioning all three over the video.
- Keep full-bleed video panels, intro visibility transitions and playback timing unchanged.
- Use fluid, bounded typography, a readable minimum heading size and consistent gutters.
- Match the wrapping breakpoint to the existing 820px mobile/tablet video layout.
- Allow the hero to grow when text needs more room, including short landscape screens. Do not hide overflow to conceal layout problems.
- Reserve the same description/button space during the intro to avoid a layout jump when they appear.

Original issue reproduced at 320 × 568: the description started around y=211 while the cinematic title occupied y=274–343. Their content overlapped.

Implementation lives in `app/home-hero-responsive.css`, imported after the existing homepage refinements. The description is now a sibling of the title container in `app/components/home-hero.tsx`. Approved wording, accessible H1 text and video playback effects are unchanged.

## Browser verification

Tested 26 viewport configurations in the in-app browser:

- Phones: 320 × 568, 360 × 640, 375 × 667, 390 × 844, 430 × 932.
- Tablets: 600 × 960, 768 × 1024, 820 × 1180, 821 × 1180.
- Desktop: 1024 × 768, 1280 × 800, 1440 × 900, 1920 × 1080, 2560 × 1440, 3840 × 1600.
- Landscape/short screens: 844 × 390, 667 × 375, 1024 × 600.
- Breakpoint boundaries: 699 × 900, 700 × 900, 701 × 900, 819 × 900, 820 × 900, 821 × 900, 950 × 768, 951 × 768.

All configurations passed:

- No overlap between cinematic title, description and CTA.
- No horizontal overflow in the title words, description or button.
- Description-to-button spacing is at least 16px, scaling to 32px.
- The stage contains its content; narrow screens may scroll vertically rather than compressing text.

The mobile CTA was clicked at 390 × 844 and the inquiry dialog opened successfully, then was closed without submitting anything. Temporary viewport overrides were reset.

These are browser viewport checks, not a claim of physical-device testing across every browser or OS. Text-size/zoom-specific accessibility testing was not performed in this pass.
