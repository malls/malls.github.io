# FA-6 — liquid/index.html

Render `liquid/BRANDING.md` as a page, per the `/brand-page` skill (fired by the
PostToolUse hook on FA-5's write).

## Deviation from the skill, stated up front

The skill says direction folders are single self-contained files. Root `CLAUDE.md`'s
sub-site authoring contract — which `build.js` actually enforces — requires
`<name>/index.html` + `<name>/style.css` (required) + `<name>/script.js` (optional).
`build.js` hard-fails on a missing `style.css`. CLAUDE.md wins: build `liquid/` to the
contract as three files, standalone-previewable at `/liquid/`. Called out in the report.

## Build-contract facts that shape the markup

- The combined shell sets `html, body { height: 100%; overflow: hidden }` and
  `body > [data-site] { height: 100%; position: relative }` — **the combined page does not
  scroll**. Liquid must own its scrolling internally.
- `root` is `document` standalone, `#site-liquid` in the build — so never
  `root.style.setProperty` (Document has no `.style`); set vars on a queried element.
- Pointer listener must attach to an element that actually receives events, so it goes on
  the scroll container, and writes `--mx`/`--my` onto `.field`.

## Structure

```
body (isolation: isolate, background abyss)
  .field   z0  absolute inset 0, overflow clip, isolate — bloom / caustics / slick / goo pool / 2 contours
  .scroll  z6  absolute inset 0, overflow-y auto, overflow-x clip — the content column
  .grain   z8  absolute inset 0, overlay blend
  svg .defs    #liquid-goo filter
```

Content: serial micro string, `forrest almasi` display, `software developer`, one glass
panel (*What's up?* + blurb), three pill chips (GitHub @malls / Twitter @forrestalmasi /
Email), footer with a justified aria-hidden micro block feathered by a mask + the contact
line.

## Acceptance criteria

- Every §3 surface appears: glass, bloom, mercury goo cluster, oil slick, caustics,
  contour, grain. Three distinct blur rungs. Exactly one primary light source.
- No `border: …px solid` anywhere; no radius below `--r-min`; no straight dividers; no
  `position: fixed`; every gradient stop ramped.
- All SVG ids and `@keyframes` names prefixed `liquid-`; single `@import` at top of
  `style.css`; no commas inside functional pseudo-classes.
- `prefers-reduced-motion` block; no horizontal scroll at 320px; blurs and blob count
  reduced on narrow viewports, slick dropped.
- Head is standalone-only (title, viewport, `robots noindex`, stylesheet) per CLAUDE.md —
  OG/Twitter meta lives in `template.html`, not here.
