# FA-5 — liquid/BRANDING.md

## Scope

Write `liquid/BRANDING.md` from empty. Design brief only — no `liquid/index.html`,
no `sites.config.json` mapping, no `build.js` run in this task.

## Direction

Y2K / aqua / rave-flyer, per the user's reference
(https://i.pinimg.com/736x/10/1c/45/101c45f15ae3363671dc3963167f29f8.jpg): deep
electric-blue-to-near-black field, a blown-out white light bloom, mercury metaball
puddles with soft edges, hairline white contour curves, ultra-heavy rounded lowercase
display type with a wet glow, dense tiny mono microtext.

Two hard constraints from the user: **maximum blur and transparency**, and **no straight
lines or hard edges** anywhere. Those become enforced rules in the doc, not suggestions.

## Approach

Mirror `memphis/BRANDING.md`'s structure and register (numbered sections, named swatches,
copy-pasteable CSS, computed contrast table, a "what this is not" table, a concrete page
application). Where memphis's core section is *fill patterns*, liquid's core section is
*surfaces* — glass, bloom, metaball, iridescence, caustics, contour, grain.

Sections:
1. The direction (three things to hold onto + voice)
2. Palette (field / luminous / oil-slick, tokens, computed contrast rule)
3. Surfaces: blur and transparency (the meat — utility classes + tunable props + the
   blur gotchas box)
4. Type
5. Shape and edge (the no-straight-lines law)
6. Layout and composition (z-ladder, dissolving sections)
7. Motion (slow drift; pointer bloom under the build's JS contract)
8. What this is not
9. Page application

## Key constraints to bake in (from CLAUDE.md's authoring contract)

- CSS written standalone; `html`/`body`/`:root` rewrite to `#site-liquid`, everything else
  gets prefixed — so: `body { isolation: isolate }` to contain `mix-blend-mode`.
- Webfont via `@import` at top of `style.css` only (head `<link>`s don't survive).
- Prefix `@keyframes` names with `liquid-`.
- No commas inside `:is()`; never set `display` on html/body; don't set a property
  differently on html vs body.
- JS is one registry function `SITES['liquid'] = function (root)`; listeners only on
  elements inside `root` — so pointer tracking attaches to a full-bleed child, never
  `document`/`window`.
- No `position: fixed` (filter/backdrop-filter ancestors become its containing block).
- Blur bleed contained by `overflow: clip`; nothing scrolls horizontally at 320px.

## Acceptance criteria

- `liquid/BRANDING.md` exists and is non-empty.
- Palette tokens have hexes and a computed contrast table with an explicit "what carries
  text" rule.
- Every CSS snippet is self-contained (no external assets beyond the one `@import`) and
  consistent with the build contract above.
- The no-straight-lines / no-hard-edges rule is stated as a law with concrete mechanics
  (min radius, blob radii, mask feathering, curved dividers, no `border: 1px solid`).
- Includes a blur/transparency gotchas box (backdrop-filter stacking + Safari prefix,
  filter-blur containing block, gradient banding → grain, blur bleed → clip).
- Has a "what this is not" table distinguishing it from Frutiger Aero, vaporwave,
  corporate glassmorphism, neumorphism, Aqua skeuomorphism.
- §9 describes `liquid/index.html` concretely against the site's real content
  (name, role, blurb, GitHub/Twitter/Email, footer).

Complexity: low-medium. Single-file documentation deliverable.
