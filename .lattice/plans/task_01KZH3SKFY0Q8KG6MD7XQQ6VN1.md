# FA-7 — isomorphic/BRANDING.md

## Scope

Write `isomorphic/BRANDING.md` only. No `index.html`, no `style.css`, no
`sites.config.json` change, no `build.js` run. Generating the page from the brief is
follow-on work (cf. FA-6 for liquid).

## Direction

**A kid's play-town rug, lifted off the floor into forced isometric.** Reference:
KidCarpet "Total Transportation Play Town" (FE744) — green grass ground, black roads with
yellow dashed centrelines, blue river, rail line, and squat buildings each wearing a red
sign band lettered with what it is (TRAIN STATION, HOSPITAL, LIBRARY, POLICE, AIRPORT).
The rug draws its buildings flat/front-on; this direction re-projects that town into 2:1
dimetric so it reads as a solid 3D toy.

The rug's sign band is the whole affordance model: **a labelled building is a link, an
unlabelled prop is not.** Buildings are GITHUB, LINKEDIN, TWITTER, EMAIL, RESUME.

## Key decisions to bake into the brief

1. **Projection is 2:1 dimetric, not true 30° isometric.** `atan(0.5) = 26.565°` — two
   pixels across per one down, so every diagonal lands on whole pixels. Everything on the
   page derives from three transforms: `scaleY(.5) rotate(45deg)` (tops/ground),
   `skewY(26.565deg)` (right walls), `skewY(-26.565deg)` (left walls).
2. **Parallel projection — no `perspective`, ever.** No vanishing point; distant buildings
   are the same size as near ones. This is the single most likely wrong output.
3. **Three flat tones per volume**, fixed light direction, hard-edged parallelogram contact
   shadows. No gradients on faces, no blurred shadows — it is a printed rug, not a render.
4. **DOM order is depth.** Painter's algorithm on `(col + row)`; `z-index` inside the scene
   is a trap.
5. Recommend the **2D-skew route over `preserve-3d`**, since `filter` / `opacity<1` /
   `overflow` / `clip-path` / `mix-blend-mode` flatten a 3D context.
6. **Exactly one unprojected element permitted** — the map legend card, which carries the
   intro prose. Everything else lives in the world.
7. Name goes on the water tower; role on a roadside sign. Both in-plane.
8. Hit-testing: anchor wrapper gets `pointer-events: none`, faces get `auto`, so
   rectangular wrapper boxes don't eat neighbouring buildings' clicks.

## Structure

Mirror `liquid/BRANDING.md` and `memphis/BRANDING.md` — nine numbered sections, same voice
and density (~550–650 lines):

1. The direction (three laws + voice)
2. Palette (ground / built / ink-and-sign tokens, the shading triplet rule, contrast table)
3. Geometry — the projection (the three transforms, the unit grid, boxes, depth sorting,
   shadows, and an "isometric gotchas" subsection)
4. Type (signage face via `@import`, sign-band rules, scale)
5. Surface and edge (flat fills, ink outline, seam handling, no blur/radius)
6. Layout and composition (the block, tile budget, responsive)
7. Motion (town lives, camera never moves; snap not drift; reduced motion)
8. What this is not (perspective render, three.js, pixel-art tileset, Monument Valley,
   isometric stock illustration, skeuomorphic bevel)
9. Page application (the block map, the five buildings, props, build-contract specifics,
   the test)

## Constraints from root CLAUDE.md the brief must restate

Wrapper `#site-isomorphic`; CSS authored standalone with `@import` at top of `style.css`;
`@keyframes` and SVG ids prefixed `isomorphic-`; no commas in functional pseudo-classes;
no `display` on `html`/`body`; no `position: fixed`; JS as a single
`SITES['isomorphic'] = function (root) {…}` registry function querying only through `root`.

## Acceptance criteria

- `isomorphic/BRANDING.md` exists, ~500+ lines, nine sections, same register as siblings.
- Projection math is stated exactly and is correct (26.565°, 2:1, the three transforms).
- Contrast numbers in the palette table are computed, not guessed.
- Affordance model (labelled = clickable) is stated as a law.
- Build-contract specifics for `isomorphic` are present in §9.
- No other file in the repo is modified.
