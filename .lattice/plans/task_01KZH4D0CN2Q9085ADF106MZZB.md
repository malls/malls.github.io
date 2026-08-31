# FA-9 — liquid: no straight lines, no symmetry

## Problem

The first pass obeyed "no hard edges" but not "no straight lines". A `border-radius: 44px`
panel is a rectangle with softened corners — its top, bottom, left and right runs are
straight. Same for the `--r-pill` chips (straight top and bottom between the round caps)
and the justified micro block (two straight vertical edges). The layout is also mirror-
symmetric: a centred column, equal left/right padding, every block sharing one left edge.

The user's correction: **no straight lines, no symmetry.**

## The geometric rule

A `border-radius` edge is fully curved only when the two radii meeting on that edge sum to
100% of its length. So every surface uses eight-value percentage radii where all four
pairs sum to 100 — uneven within the pair, which is what makes it a blob rather than an
ellipse. Anything less leaves a straight run.

`clip-path` is rejected: it clips `box-shadow`, which is what draws the meniscus and the
glow. The radius route keeps the wet rim.

## Changes

**BRANDING.md**
- §5 becomes "Shape, edge and asymmetry". Replace the radius floor with the pair-sums-to-100
  law; state plainly that a rounded rectangle is still a rectangle. Keep `--r-pill` only for
  true ellipses. Add the `clip-path` note.
- §6 gains the no-symmetry rule: nothing centred, no two blocks sharing an edge, unequal
  page margins, staggered chips, no mirrored radii anywhere.
- §9 updated to describe the blob panel and pebble chips.

**Page**
- `.panel` → blob radius, padding grown to fit text inside the curve.
- `.chip` → pebble (uneven ellipse), a different radius and vertical offset each.
- `.content` → left-weighted, not `auto` centred; per-block indent staircase; drop
  `justify-content: center`.
- `.display` second line indented off the first.
- `.micro-fill` → drop `text-align: justify`, feather with an elliptical mask.
- `.bloom` / `.slick` → unequal width and height so even the light is off-axis.
- Narrow viewports: shallower blobs so text still has usable measure at 320px.

## Acceptance criteria

- No `border-radius` on any visible surface whose edge pairs fail to sum to 100%.
- No `margin: 0 auto`, no centred text, no two blocks sharing a left edge.
- Text stays inside every blob at 320 / 390 / 430 / 1280, verified by render.
- No horizontal overflow at 320px.
