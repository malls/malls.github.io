# FA-15: marble/: BRANDING.md — Prado pietra dura inlaid-tabletop direction (ultra-wide viewport)

## Goal

Write `marble/BRANDING.md` (currently an empty file): the design-direction brief for a new
sub-site inspired by the Prado's semiprecious-stone tables (Real Laboratorio delle Pietre
Dure, Naples 1749–1763 — touchstone/paragone black ground inlaid with jasper, agate,
chalcedony, lapis lazuli; floral sprays, birds, volutes; lapis border; gilt-bronze mounts).
User constraints: elegance above all; targets an ultra-wide viewport; sections use image
backgrounds from https://github.com/malls/forrest/tree/master/public/images/marble
(raw URLs: https://raw.githubusercontent.com/malls/forrest/master/public/images/marble/marbNNN.jpg).

## Research done (planning phase)

- Fetched the GitHub image directory: 118 seamless 90s texture tiles, `marb001`–`marb150`
  with gaps (missing: 037–042, 046–047, 049–068, 087–088, 102–103). Tiles are tiny
  (96×96 – 360×256 px) seamless JPEGs.
- Built a contact sheet of all 118 tiles; inventoried by color/stone role: black grounds
  (019, 021, 109), veined black (093), lapis blues (076, 110, 114, 115), verde greens
  (015, 034, 096, 107, 140), rosso reds (016, 129, 133, 144), giallo golds (022, 105,
  113, 137), pale chalcedony (030, 083, 090, 092, 097, 108), showpiece agates (002, 043,
  044, 045, 089); neon outliers (029, 036, 116, 117, 118, 119, 121, 122) to be banned.
- Prado page is Cloudflare-blocked; sourced the piece's materials/technique via search
  (Naples Real Laboratorio table: paragone top, lapis border, jasper/agate/chalcedony
  inlay of flowers, fruit, birds, volutes, gilt bronze).
- Computed WCAG contrast for the proposed palette (alabaster on paragone 16.0, bright
  gilt on paragone 12.1, gilt on paragone 8.0, etc.) so the doc's contrast table is real.

## Approach

Follow the house BRANDING.md format established by `liquid/BRANDING.md` (numbered
sections: direction → palette w/ tokens + computed contrast → surfaces → type → shape →
layout → motion → what-this-is-not → page application w/ build-contract specifics → the
test). Core design ideas:

- The page IS a tabletop seen from above: nested border bands, bilateral symmetry,
  a central oval cartouche, flanking panels. Hard knife-edge seams with gilt fillets
  (the inverse of liquid's no-straight-lines law).
- Sections = inlaid stone panels; each takes a tiled marble texture background (native
  tile size, `background-repeat`), cast by stone role from the inventory above.
- Ornament (volutes, husk garlands, petals) as SVG paths pattern-filled with the tiles
  (`<pattern>` + image href) — the pietra dura trick. All ids prefixed `marble-`.
- Type: engraved-inscription capitals (Cinzel) + Cormorant Garamond for prose; gilt and
  alabaster on paragone. Letterspaced small caps; centered composition (symmetry is law).
- Motion: near-stillness; one slow specular sheen; hover = polish, never movement.
- Ultra-wide first: composition designed for ≥1900px, everything visible without scroll
  at target widths; degrade gracefully below.
- Bake in the root CLAUDE.md sub-site authoring contract (id prefixes, @import encoding,
  keyframe prefixes, SITES registry, no comma pseudo-classes, own scroll container).

## Key files

- `marble/BRANDING.md` — the deliverable (currently 0 bytes).
- `liquid/BRANDING.md` — format/rigor precedent (read).
- Root `CLAUDE.md` — authoring contract to reference.

## Acceptance criteria

1. `marble/BRANDING.md` exists with a complete direction: palette (tokens + computed
   contrast), the tile cast list with real filenames and the raw URL base, ornament/seam
   system, type, layout for ultra-wide, motion, anti-patterns, page-application section
   honoring the build contract, and a falsifiable closing test.
2. Every referenced `marbNNN.jpg` actually exists in the GitHub directory (no gaps).
3. Elegance direction is explicit and enforced (banned tiles, banned effects).
4. No page implementation in this task — BRANDING.md only (the `brand-page` skill builds
   the page from it later, under its own task).
