# FA-8: Generate isomorphic/index.html from isomorphic/BRANDING.md (brand-page) and map a viewport bucket

## Scope

Render `isomorphic/BRANDING.md` into a standalone page via the brand-page skill, authored
to the root CLAUDE.md sub-site contract (like `liquid/`, not like the older self-contained
`memphis/`): `isomorphic/index.html` + `isomorphic/style.css`, no `script.js` — the brief
says the town must be fully navigable with no JS, and all motion is CSS animation.

Bucket mapping + `node build.js` are deferred: the brand-page skill scopes out touching the
root `index.html`, and the bucket choice (which width range shows this site) is the user's.

## Approach

- 9×9 grid per §9; all cell coordinates live in the stylesheet (not inline styles) so media
  queries can re-lay the town on mobile.
- Placement: anchor at grid corner, `left = (c − r + 9) · half`, `top = (c + r) · quart`.
  Ground pieces are `.flat` (pre-transform square `w·sq × d·sq`, origin 0 0,
  `scaleY(.5) rotate(45°)`); walls are the two skews with derived offsets; shadows are
  flats in `--cast` shifted `(0.35, 0.175) · wall` via the `translate` property.
- DOM emitted back-to-front by front-corner sum. Painter's algorithm only, no z-index.
- Buildings: GITHUB (1,1) 2×2×6, LINKEDIN (6,1) 1×2×4, TWITTER (1,6) 1×2×3+mast,
  EMAIL (6,6) 2×1×2. RESUME dropped — the brief says drop it when there is no link, and
  the repo has none. TWITTER widened 1×1→1×2 per §4 ("the building gets wider — the type
  does not get smaller"). LinkedIn URL is a placeholder needing the real slug.
- Props: trees (CSS), water tower SVG with FORREST/ALMASI band, SOFTWARE DEVELOPER
  roadside sign, level-crossing gate, traffic signal, parked + moving car SVGs, river,
  pond, rail, parking apron.
- Mobile ≤700px: tile 56px, stage center-crops the fixed-width plot (`overflow: clip`),
  fringe scenery hidden, TWITTER/LINKEDIN re-coordinated into the visible band.
- Legend: the one unprojected element — chalk card, 2px ink border, key teaching
  "red band = link"; bottom-left beside the plot ≥1180px, below it otherwise.

## Acceptance criteria

- Page matches the brief's §9 map and passes its §"The test" items 1–5 by inspection.
- Standalone head matches liquid's (title, charset, viewport, description, robots
  noindex, `./style.css` link).
- Contract: `@import` first line; `isomorphic-` keyframe prefixes; no `position: fixed`;
  no commas in functional pseudo-classes; nothing set on `html` that differs from `body`.
- No file outside `isomorphic/` modified.
