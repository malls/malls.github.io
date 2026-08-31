# Plan — Flesh out `memphis/BRANDING.md`

## Scope

Author `memphis/BRANDING.md` as a complete design brief for the Memphis Group direction.
The file is the source of truth that the `brand-page` skill renders into `memphis/index.html`.
It is currently a zero-byte file, which the skill correctly refuses to render.

Out of scope: editing the root `index.html` router, the `liquid/` brief, or the skill/hook.

## Approach

Write a brief that is prescriptive enough to render from without invention, covering:

1. **Direction** — what Memphis Milano (Sottsass, 1980–87) actually was, and the voice.
2. **Palette** — named swatches with hexes, drawn from the real Memphis object vocabulary
   (Carlton, Tahiti, Bacterio, Casablanca, Super, Kristall, First, Bel Air, Spugnato).
   Ink and Paper as the structural anchors — Memphis is black-and-white first, colour second.
3. **Contrast rules** — computed WCAG pairings so the palette is usable for real text.
   Rule to land on: Ink carries text on every swatch except Cobalt; Paper only on Cobalt/Ink.
4. **Fill patterns** — the headline requirement. Reusable, self-contained CSS fills, not
   solid colours. Two mechanisms:
   - Single-declaration gradient patterns shipped as custom properties that take
     `--pat-ink` / `--pat-ground` at the use site (nested `var()` resolves on the
     referencing element, so one token re-colours per component).
   - Multi-declaration patterns (checkerboard, half-drop dots) and organic SVG data-URI
     patterns (Bacterio, terrazzo, confetti, wave rule) shipped as utility classes.
     SVG patterns bake Ink and set their ground via `background-color`.
5. **Type, shape, border/shadow, spacing, motion** — the non-colour vocabulary.
6. **Composition rules + anti-patterns** — including the common failure of rendering
   Memphis as vaporwave/synthwave, which it is not.
7. **Page application** — concrete instructions for what `memphis/index.html` should be.

## Key files

- `memphis/BRANDING.md` (write)
- `.claude/skills/brand-page/SKILL.md` (read — constraints the brief must respect:
  self-contained, no external requests, responsive, full-bleed, tab-indented markup)

## Acceptance criteria

- [ ] Every colour has a name, a hex, and a stated role.
- [ ] At least 8 reusable fill patterns, each with working, copy-pasteable CSS.
- [ ] SVG data URIs are percent-encoded (`%3C`, `%3E`, `%23`) so they load in strict parsers.
- [ ] Contrast guidance is computed, not asserted.
- [ ] No webfont or external asset is named (skill forbids external requests unless the
      brief explicitly asks). System stack only.
- [ ] Brief is specific enough that `brand-page` can render it without guessing.

## Complexity

medium — single authored file, no code paths, but the CSS must actually work.
