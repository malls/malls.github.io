# FA-25: software/: BRANDING.md — Innovative Communication ray-traced album-sleeve direction (band Software, 1980s)


## Scope

Write `software/BRANDING.md` only. Do **not** generate `software/index.html`,
`software/style.css`, or touch `sites.config.json` / `index.html` — page
generation is a separate task (see the `random/`→`liquid/` precedent: BRANDING
then brand-page).

## Source of truth

The reference is `https://f4.bcbits.com/img/a3943533590_16.jpg` — Software,
*Past · Present · Future Vol. 2* (1987, Innovative Communication), computer
graphics by Franke/Helbig. Verified the wider discography and its graphics
credits against the Michael Weisser SOFTWARE catalog (rice.de): MAPART/Peitgen
(fractals), Herbert W. Franke, Nelson Max, Yoichiro Kawaguchi, Abel Image
Research. The direction is therefore **1980s scientific-visualisation
raytracing, printed as a record sleeve** — not synthwave, not vaporwave.

## Approach

Follow the house shape set by `liquid/BRANDING.md`: numbered sections, a
three-law opener, hex tokens in a `:root` block, a computed WCAG table, copy-
pasteable CSS recipes, a "what this is not" table, and a §9 page application
tied to the root `CLAUDE.md` sub-site authoring contract.

Sections:

1. The direction — sleeve-not-screen; quadric-sliced-by-plane; one hard
   specular light. Voice.
2. Palette — paper/ink tokens (type) vs plate tokens (render only), `:root`
   block, computed contrast table against the paper ground.
3. The plate — raytracing recipes: quadric shading ramp, the slice, ground
   plane + horizon, the fractal inset, halftone + paper tooth.
4. Type — Helvetica stack (Inter imported as cross-platform fallback, `;`
   percent-encoded per the build contract), the letterspaced wordmark, the
   middot line, the centred tracklist, the hyphenated-compound naming tic.
5. Shape and edge — the hard law: `border-radius` is `0` or `50%`, nothing
   between; hairline keylines; orthogonal paper vs diagonal render.
6. Layout — the sleeve grid, plate left / type right, square aspect, fitting
   the non-scrolling built shell.
7. Motion — printed object, near-still; slow specular orbit; scanline render
   reveal on first paint; reduced-motion.
8. What this is not — vaporwave (the 100% Electronica reissue trap),
   synthwave/outrun, modern soft-studio 3D renders, distressed lo-fi vinyl,
   and the sibling `liquid/`.
9. Page application — element-by-element structure, copy, and the
   build-contract specifics (`software-` id/keyframe prefixes, no
   `position: fixed`, no assets, must fit viewport). Suggest bucket `1100`
   (free; `1200` is 8bit, `1000` is isomorphic) without editing the config.

## Acceptance criteria

- `software/BRANDING.md` is non-empty and reads as a usable brief: a
  competent implementer could build the page from it with no further research.
- Every hex is a real token in a `:root` block; the contrast table numbers are
  computed, not guessed, and the table states which colours may carry type.
- At least one concrete, checkable law (the `0`/`50%` radius rule) analogous
  to liquid's radius-pair rule.
- Every CSS snippet is legal under the root `CLAUDE.md` authoring contract:
  no head `<link>`, no raw `;` inside `@import`, only
  `@import`/`@media`/`@supports`/`@keyframes`/`@font-face`, no commas inside
  functional pseudo-classes, no `display` on `html`/`body`, ids and keyframe
  names prefixed `software-`.
- No files other than `software/BRANDING.md` (plus Lattice artefacts) change.
