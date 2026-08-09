# FA-21: vhs/: generate index.html from BRANDING.md (brand-page skill)

Complexity: medium-high (long prescriptive brief, JS transport, no-JS baseline, strict haze/contrast caps)

## Scope

Deliverable is **`vhs/index.html` only**, generated from `vhs/BRANDING.md` under the
brand-page skill contract.

- Do NOT map `vhs` into `sites.config.json`, do NOT run `build.js`, do NOT touch the
  root `index.html` / `style.css` / `script.js`. The direction is not ready to be
  mapped (videos come later); the skill forbids touching root files. BRANDING.md §9's
  mention of a width bucket is explicitly deferred to page-build time — not this task.
- Do NOT commit — the skill says leave the change in the working tree.
- Do not create `vhs/style.css` / `vhs/script.js`. The brief's §3/§9 build-contract
  language describes how the page must be *written so that* a later split into the
  authoring-contract files is mechanical, but the sibling precedent (`iphone/`,
  `marble/`, `slop/` — all single self-contained `index.html` files, `iphone/` with an
  inline `SITES['iphone']` registry script and standalone boot line) and the skill's
  hard "self-contained, inline `<style>`/`<script>`" rule govern the deliverable.
  So: one file, but every build-contract rule (prefixes, at-rule whitelist, `%3B`
  discipline, selector rules) is still obeyed inside it.

## Source of truth

`vhs/BRANDING.md` is fully prescriptive: palette tokens with exact hexes (§2), VT323
via one `@import` (§3), verbatim CSS recipes for molded plastic, tube, grille,
buttons, display well (§4), a 7-layer haze stack with hard alpha caps (§5), a
three-segment tape library with transport semantics and a no-JS baseline (§6), five
sanctioned keyframes + mandatory reduced-motion composed frame (§7), an explicit
anti-goals table (§8), and a page-application section with structure and a checkable
test list (§9). Where the brief gives literal CSS, copy it literally — do not
re-derive values. Choices the brief leaves open (exact spacing, cabinet proportions,
grille placement details, focus-ring specifics beyond "▶ + underline", the exact MEMO
wording) are the only degrees of freedom; take the *What's up?* blurb text from
`random/`'s existing copy so the MEMO segment says what the site already says
(uppercased by CSS — the OSD has no lowercase).

## Standalone head (house conventions)

Match the generated siblings (`marble/index.html`, `slop/index.html`), not the root
page: `<!DOCTYPE html>`, `<html lang="en">`, `<title>Forrest Almasi</title>`,
`charset` + `viewport` metas, description meta, `<meta name="robots" content="noindex">`.
No OG/Twitter/canonical block — direction pages are noindex previews; the root
`template.html` owns SEO. Markup is **tab-indented** throughout.

## File layout of vhs/index.html

1. Head as above; one `<style>` block. First statement inside it: the §3 `@import`
   for VT323 (URL currently has no raw `;`; keep the `%3B` warning comment). Only
   `@import`/`@media`/`@supports`/`@keyframes`/`@font-face` at-rules.
2. `:root { … }` with all 16 §2 palette tokens (exact hexes, exact names), the two
   font tokens, and the §3 scale tokens (`--t-ident`, `--t-osd`, `--t-osd-small`,
   `--t-clock`, `--t-panel`).
3. Layout + component CSS (below).
4. Body: the cabinet markup (below).
5. End of body: `<script>` defining
   `(window.SITES = window.SITES || {})['vhs'] = function (root) { … };`
   then `<script>SITES['vhs'](document);</script>` — the standalone boot, matching
   `iphone/` exactly. (When later split to `script.js`, the registry function moves
   verbatim; the boot line becomes the two-script standalone form.)

## Page structure (body, top to bottom) — maps §9 structure

```
body                      near-black room ground #0B0A09; height:100%; isolation:isolate;
                          display:grid; place-items:center; overflow hidden (page never scrolls)
└─ .vhs-cabinet           the TV/VCR combo; .vhs-molded material; tabindex="0";
                          sized so the 4:3 object fits any viewport (min() against
                          width AND height); visible :focus-visible treatment on
                          the tube bezel
   ├─ top rail            silkscreen brand badge "MALLSVISION" left, model "FA-96" right
   ├─ screen row          grille columns (.vhs-grille) flank the tube on wide
   │  │                   viewports; fold under it on narrow (media query)
   │  └─ .vhs-tube        4:3, elliptical radius `5% / 7%`, inset bezel shadow,
   │     │                overflow:hidden (load-bearing)
   │     ├─ .vhs-screen   container-type:inline-size; holds content layer 0
   │     │  ├─ segment 1 IDENT     video slot stand-in: VCR Blue + --osd-deep corner
   │     │  │                      falloff; OSD card: FORREST ALMASI (--t-ident),
   │     │  │                      SOFTWARE DEVELOPER (--t-osd)
   │     │  ├─ segment 2 CONTACTS  flat VCR Blue, NO video slot ever; 3 real <a>
   │     │  │                      rows ≥44px at --t-osd: GITHUB — @MALLS,
   │     │  │                      TWITTER — @FORRESTALMASI, EMAIL — _@forrestalmasi.com
   │     │  ├─ segment 3 MEMO      video slot stand-in: NO SIGNAL (full-opacity
   │     │  │                      .vhs-static of its own on the content layer +
   │     │  │                      "NO SIGNAL" osd-text on --scrim plate); OSD card:
   │     │  │                      the What's up? blurb lines
   │     │  ├─ stop screen         VCR Blue idle: STOP top-left, MALLSVISION centered
   │     │  └─ OSD chrome          status word top-left / counter top-right at
   │     │                         --t-osd-small, on --scrim plates when over a video slot
   │     ├─ .vhs-fringe   layer 1 (mix-blend-mode:screen — needs body isolation)
   │     ├─ .vhs-scanlines layer 2
   │     ├─ .vhs-tracking layer 3
   │     ├─ .vhs-static   layer 4 (haze copy, opacity .07)
   │     └─ .vhs-glass    layers 5+6 (vignette + glare, border-radius:inherit)
   ├─ .vhs-deck           --deck fascia band
   │  ├─ cassette slot    --shell-deep recess, inverted edge sandwich, VHS wordmark,
   │  │                   flap bar (§4.6) — decorative, mandatory
   │  └─ control row      REW ◀◀ / PLAY ▶ / FF ▶▶ / STOP ■ .vhs-btn <button>s (§4.4),
   │                      REC dot + label, .vhs-display well: .vhs-clock "12:00"
   │                      blinking + .vhs-counter amber tape position
   └─ plinth rail         .vhs-molded + vent slots, nothing else — no footer
```

Every id in markup/data-URI SVG is `vhs-`-prefixed (`vhs-noise`); every keyframe is
`vhs-`-prefixed (`vhs-track`, `vhs-grain`, `vhs-blink`, `vhs-shuttle`, `vhs-poweron`).
Transport glyphs are Unicode geometric characters, not emoji. No `position: fixed`
anywhere. No commas inside functional pseudo-classes (write separate selectors). No
literal `</style>` in CSS or `</script>` in JS. Never set `display` on `html`/`body`;
no conflicting `html` vs `body` properties (standalone-safe split that maps cleanly
to the wrapper: `html, body { margin:0; padding:0; height:100% }` plus
`body { background; isolation:isolate; overflow:hidden; display-free }`).

## Spec-to-page mapping (which BRANDING.md section governs what)

| Brief | Page element | Notes |
|---|---|---|
| §2 palette + build note | `:root` tokens | copy hexes verbatim; screen colors never on cabinet and vice versa |
| §2 contrast rule | all OSD text | Phosphor White on VCR Blue or `--scrim` plate only; ≥ `--t-osd-small` floor |
| §3 fonts/scale | `@import`, `--font-osd`/`--font-panel`, size tokens, `.vhs-osd-text` bloom + chroma ghosts (copy verbatim), LED single bloom, flat silkscreen (no shadow) | `.vhs-screen { container-type: inline-size }` for cqi units |
| §4.1–4.7 | `.vhs-molded`, `.vhs-tube`, `.vhs-grille`, `.vhs-btn` (+`:active`, no transition), `.vhs-display`, cassette slot | copy recipes verbatim; overhead light only; recesses invert the sandwich; glows limited to OSD bloom, LED digits, REC dot |
| §5.1–5.6 | haze stack inside `.vhs-tube`, exact layer order 0–6, all `pointer-events:none`, alpha caps as written | built once; a future `<video>` slots in under it without touching any haze layer |
| §6 library | 3 segments + STOP screen + OSD chrome + transport semantics + sacred CONTACTS rule | segment counters 0:00:00 / 0:04:12 / 0:09:47 |
| §6 degradation | stand-ins via HTML/CSS layering only; future `<video>` at absolute `/vhs/ident.mp4`, `/vhs/memo.mp4`, posters `/vhs/*.jpg`, `object-fit:cover` over the stand-in | no JS file detection, no `onerror`; this deliverable ships with zero `<video>` elements — just slots ready for them |
| §6 no-JS baseline | segments stacked in tape order; the screen content area is the ONE scroll container (`overflow-y:auto`); buttons render but inert | JS boot adds `vhs-js` class to the screen element (never to `root`); only under `.vhs-js` do segments become absolute single-view playback |
| §7 motion | the 5 keyframes (copy verbatim) + reduced-motion block (copy verbatim, band parked at 72%) | first frame of every animation is the composed frame; shuttle animates the content layer only, never haze |
| §8 anti-goals | review checklist | no vaporwave, no glitch-performance, no iframe/embed, no gel gloss, no unsanctioned glow, no explanatory caption |
| §9 structure + JS contract | body layout above; registry function | keyboard listener on the cabinet element inside root, never window/document |

## JS behavior (registry function)

State: `segments` NodeList, `current` index, mode (play/stop), per-segment counter
strings. On boot: add `vhs-js` to the screen element, activate segment 1, OSD status
`PLAY`, counter `0:00:00`.

- FF/REW: at tape ends, do nothing (no apology). Else: set OSD status `FF ▶▶` /
  `REW ◀◀`, add a shuttle state class to the content layer (450ms `vhs-shuttle`),
  flash the haze `.vhs-static` to 0.35 via the same state class, spin the counter
  text toward the target value with a short interval, then after ~450ms clear the
  class, show the target segment, status `PLAY`. Guard re-entrancy: ignore presses
  mid-shuttle.
- STOP: show the idle screen, status `STOP`, counter holds. PLAY: return to the
  current segment.
- Keydown on the cabinet element (`tabindex="0"`): ArrowRight → FF, ArrowLeft → REW.
  No window/document listeners. Buttons are native `<button>`s found via
  `root.querySelector(All)`.
- Under `prefers-reduced-motion` the CSS collapses the shuttle to 0.01ms — instant
  cut, OSD status/counter still update; JS needs no special branch (the ~450ms state
  timeout still runs, harmlessly, or is skipped via a matchMedia check — decide at
  implementation, either satisfies "FF cuts instantly").
- No style writes to `root`; all state via classes on elements inside `root`; no
  fetches, no video probing, no timers left running after shuttle completes (the
  counter spin interval must be cleared).

## Responsive

The cabinet sizes with `min()` against viewport width AND height so the whole
appliance (bezel + tube + deck + plinth) fits without page scroll at any viewport —
including mobile portrait, where grille columns fold under the tube and the control
row wraps. Relative units; body never scrolls horizontally or vertically. Full-bleed
room ground `#0B0A09` covers the viewport — no white anywhere.

## Acceptance criteria

Brief §9 "The test" (verbatim intent) plus skill constraints — the review agent
checks every line:

1. Zero video files present: every segment shows its stand-in, MEMO reads NO SIGNAL,
   page fully composed — no broken layout, no empty box, no JS-triggered fetch for a
   missing file (and no `<video>` in this deliverable at all).
2. JS disabled: all three segments render stacked in tape order and readable inside
   the tube; the tube's content area scrolls; all three links click. Nothing else
   scrolls in either mode at any width — the page body never scrolls.
3. All screen text is Phosphor White `--font-osd` ALL CAPS at ≥ `--t-osd-small`, on
   VCR Blue or a `--scrim` plate (inspect computed grounds). No letterform in Static
   Grey, VCR Blue, or a haze tint. Lowercase only in the email address.
4. Haze: scanline alpha ≤ 0.25, resting static opacity ≤ 0.07, exactly one tracking
   band at ≥ 8s/pass, every haze layer `pointer-events:none`, nothing renders above
   the glass layer, links click through the haze. Haze exists only inside the tube —
   not one scanline on the cabinet.
5. Transport: FF/REW step segments with shuttle + counter spin + OSD feedback;
   ArrowRight/ArrowLeft do the same with the cabinet focused; STOP shows the idle
   screen; PLAY returns; end-of-tape presses do nothing. Buttons ≥ 44px tall,
   `:active` with zero transition.
6. Links: three real `<a>`s — github.com/malls, twitter.com/forrestalmasi,
   mailto:_@forrestalmasi.com — correct spelling, ≥ 44px targets, on flat VCR Blue
   (11.9:1 per §2), Tab-reachable with a visible ▶ + underline Phosphor White focus
   state, never over a video slot.
7. `prefers-reduced-motion`: clock rests lit, tracking band parked visible at 72%,
   grain frozen, FF cuts instantly — a composed frame, not a degraded one.
8. Cabinet: every molded edge lit from above only (no left/right/bottom highlights);
   glows limited to OSD bloom, LED digits, REC dot; instant button presses; cassette
   slot, display well, and plinth present; no browser idiom (no cards/nav/footer)
   and none of the §8 failure modes.
9. Build-contract hygiene (grep-checkable): all ids and keyframes `vhs-`-prefixed;
   `@import` first in the style block with no raw `;` in its URL; only whitelisted
   at-rules; no commas inside `:is()`/`:where()` (none used); no `</style>` /
   `</script>` literals inside CSS/JS; no `position: fixed`; `body { isolation:
   isolate }` present; JS is exactly one `SITES['vhs']` registry function using only
   `root.querySelector(All)`, no window/document listeners, no writes to `root`
   itself, standalone boot line at end of body.
10. Skill constraints: single self-contained file; the only external request is the
    VT323 `@import` the brief names; tab-indented markup; head matches sibling
    direction pages (noindex, no OG block); full-bleed background; responsive, no
    horizontal scroll; root `index.html`/`style.css`/`script.js` and
    `sites.config.json` untouched; `node build.js` not run; nothing committed.

## Key files

- `vhs/BRANDING.md` — source of truth (implementer must read it in full)
- `vhs/index.html` — the deliverable (new file)
- `.claude/skills/brand-page/SKILL.md` — generation contract
- `iphone/index.html` — sibling precedent for the inline SITES registry + boot line,
  and the neighboring skeuomorphism to deliberately diverge from (§8)
- `marble/index.html`, `slop/index.html` — head shape and single-file precedent
- `random/index.html` — source of the *What's up?* blurb copy reused in MEMO
