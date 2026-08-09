# FA-27: memphis/: site is clipped in the built page (1150px unreachable) — give it its own scroll container

## Diagnosis (measured, not guessed)

build.js's shell is `html, body { height: 100%; overflow: hidden }` plus
`body > [data-site] { height: 100% }`. So the combined page never scrolls and
every wrapper is pinned to the viewport height. Per the root CLAUDE.md, "a site
taller than the viewport must own its own scroll container." Memphis doesn't.

Measured in the built page at 1450x800 (headless Chrome, computed styles):

    #site-memphis  overflow-y: visible  scrollHeight 1863  clientHeight 713

`overflow-y` stays `visible` because memphis only sets `overflow-x: clip` on
`html, body`, and `clip` + `visible` is a legal computed pair — unlike
`hidden` + `visible`, it does NOT force the other axis to `auto`. So the wrapper
is not a scroll container, the extra 1150px simply overflows, and `body {
overflow: hidden }` in the shell throws it away. ~62% of the page is unreachable.

Standalone `/memphis/` scrolls normally, so this is a build-only divergence —
which is why it was invisible.

Swept all ten desktop buckets at 800px tall. Only two wrappers clip:
- **memphis** — 1150px lost. The bug.
- **random** — 178px, but `random/style.css` sets `html { overflow: hidden;
  position: fixed }` deliberately, so standalone clips identically. Same
  behaviour built and standalone, i.e. not a regression. Out of scope.
`isomorphic` is the reference implementation: `body { height: 100%; overflow-y:
auto; overflow-x: clip }` with a comment explaining why.

## Approach

Copy the isomorphic pattern into `memphis/style.css`'s existing `body` rule:
`height: 100%` + `overflow-y: auto`, with the same explanatory comment. Do not
touch build.js — the shell contract is documented and nine other sites are
written to it; memphis is the violator.

Why this is safe standalone: `html` has no `height: 100%`, so `height: 100%` on
body resolves against an auto-height parent and computes to auto, making
`overflow-y: auto` a no-op — the viewport scrolls exactly as it does today.
Memphis keeps `overflow-x: clip`, which computes to `hidden` once the other axis
scrolls; that suppresses a horizontal scrollbar, which is what the existing
`overflow-x: hidden` fallback line already intended.

## Acceptance criteria

- `#site-memphis` in the built page has `overflow-y: auto` and
  `scrollHeight > clientHeight`, i.e. it is a real scroll container; the full
  1863px of content is reachable at 1450x800.
- No horizontal scrollbar at any width; the document itself still does not scroll.
- Standalone `/memphis/` is visually unchanged and still scrolls.
- No other site's clipping measurement changes.
- Only `memphis/style.css` and the rebuilt root `index.html` change.
