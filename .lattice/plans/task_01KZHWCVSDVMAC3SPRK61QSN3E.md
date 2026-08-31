# FA-11: iphone/ sub-site: BRANDING.md for iPhone OS 3 skeuomorphic direction (mobile portrait slot)

**Complexity: low** (single markdown deliverable, no code). User request: a BRANDING.md
for a new `iphone/` sub-site that follows the UI rules and logic of an iPhone 3G/3GS
running iPhone OS 3 (2008–2009 skeuomorphic era), to be served at the **mobile portrait**
breakpoint (`sites.config.json` → `"mobile": { "portrait": "iphone" }` — a later task).

## Scope

Only `iphone/BRANDING.md`. No index.html/style.css/script.js yet (that's the brand-page
skill's job in a follow-up), no sites.config.json change, no build.

## Approach

Match the established house format of `liquid/BRANDING.md` and `memphis/BRANDING.md`:

1. **The direction** — 3 load-bearing principles + voice. Core idea: every surface is lit
   glossy plastic/glass; light is painted INTO surfaces (vs liquid's transparency).
2. **Palette** — tokens named for the objects they come from (pinstripe ground, navbar
   gradient pair, selection blue, badge red, gel green, notes legal-pad yellow, chrome).
   Include a `:root` block and a **computed WCAG contrast table** (compute with a node
   one-liner, don't guess) plus a "one hard rule" for what carries text.
3. **Surfaces** — the recipe section (this direction's core): the icon shine (elliptical
   specular with hard edge), gel buttons (50% hard-stop gloss), nav-bar gradient with 1px
   highlight/border lines, pinstripe ground, grouped table cells, dock shelf with
   reflections, slide-to-unlock shimmer, badge. All as copy-pasteable CSS.
4. **Type** — Helvetica system stack (no webfonts; authentic), etched text-shadow rules
   (dark-on-light letterpress vs light-on-dark engraving), fixed px scale from real UIKit
   metrics (320pt world), Marker Felt for the Notes material only.
5. **Shape/border/shadow** — 1px non-retina discipline, radius vocabulary (10px cells,
   57px/10px icons), no blur beyond small drop shadows, no border-radius middle ground
   beyond the sanctioned set.
6. **Layout** — the screen chrome stack: status bar / nav or springboard / scroll region /
   dock. The viewport IS the 320×480 screen; no drawn hardware bezel. Site must own its
   scroll container (build contract).
7. **Motion** — 300ms slide/zoom, shimmer, jiggle allowed once; reduced-motion block.
8. **What this is not** — iOS 7+ flat, iOS 5/6 linen, Mac Aqua, Frutiger Aero,
   glassmorphism/neumorphism, vaporwave.
9. **Page application** — concrete spec for `iphone/index.html`: status bar (9:41),
   springboard with glossy link icons (GitHub @malls, Twitter @forrestalmasi, Mail
   `_@forrestalmasi.com` with badge), Notes legal-pad panel for the blurb, reflective
   dock, slide-to-unlock footer. Plus build-contract specifics: `iphone-` id/keyframe
   prefixes, no `position: fixed`, `root` wrapper JS registry, mobile-portrait mapping.

## Acceptance criteria

- File exists at `iphone/BRANDING.md`, follows the 9-section house structure and voice.
- Palette contrast numbers are actually computed (WCAG 2.1 relative luminance), not invented.
- Every CSS recipe is consistent with the build contract in root CLAUDE.md (prefixed ids,
  prefixed keyframes, no head links, no `position: fixed`, no commas in `:is()`, scroll
  ownership).
- Faithful to iPhone OS 3 specifically: no anachronisms (no linen/iOS 5, no wood/iBooks
  iOS 4, no Helvetica Neue/retina-era, no iOS 7 flatness).
