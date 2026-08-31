# FA-18: vhs/: BRANDING.md — skeuomorphic TV+VCR direction (FF-to-navigate, hazy screen overlay for videos)

## Scope

Create **one file**: `vhs/BRANDING.md`. Nothing else — no `index.html`, no
`style.css`, no `sites.config.json` edit, no build run. Page generation happens
later via the `brand-page` skill under a separate task. The `vhs/` folder exists
and is empty.

User's concept, verbatim (this is the contract; the brief must serve all four
clauses): "a UI of a TV with a built in VCR. fast forward to navigate. hazy
overlay effect on the screen contents, which will be videos I add later.
skeumorphic."

## House format (mirror it)

Existing briefs (`slop/`, `marble/`, `iphone/`, `shibuya/`, …) share a strict
shape. `iphone/BRANDING.md` is the closest precedent — the repo's other
skeuomorphic direction — and the model to match in tone and depth. The shape:

1. `# Title` + blockquote: `> Design direction: **name** — …` one-paragraph
   framing with a concrete real-world reference artifact.
2. `## 1. The direction` — exactly **three numbered laws** ("three things to
   hold onto, because getting them wrong produces X instead of Y"), then a
   **Voice** paragraph.
3. `## 2. Palette` — named tokens in tables (Token | Name | Hex | Role), a
   `:root` CSS block, and a **measured WCAG contrast table** with a stated
   "one hard rule" for legibility.
4. Middle sections (3–7ish) — type, surfaces/materials with real CSS recipes
   (copy-pasteable, with gotcha callouts in bold or blockquotes), layout/
   composition (including who owns scroll), and a degradation rule for
   assets that arrive later.
5. `## Motion` — a short sanctioned-effects list, keyframe names prefixed,
   **mandatory `prefers-reduced-motion` block** whose static state is a
   composed frame.
6. `## What this is not` — table of nearby failure modes (| Not this | Because |).
7. `## Page application` — how `vhs/index.html` will render the brief: concrete
   structure top-to-bottom (including the owner's real links: GitHub `@malls`,
   Twitter `@forrestalmasi`, Email `_@forrestalmasi.com`), a **build-contract
   specifics** list restated in full so the page generator needs nothing
   outside the file, and **The test** — checkable, not vibeable, acceptance
   criteria.

Numbers-and-hexes specificity is the norm: real hex values, px metrics, timing
values, named utility classes with working CSS.

## Proposed outline for vhs/BRANDING.md

1. **Header + framing quote.** Direction: the mid-90s TV/VCR combo unit
   (13-inch curved-glass CRT with the VCR deck built into the plastic below
   the tube). Reference artifact: something concrete and evocative — the
   classroom/motel combo TV, blue OSD text, tracking band, the whole object
   rendered seriously in CSS, the way `iphone/` renders 2009.
2. **The direction — three laws.** Proposed:
   - **The page is the appliance, not a page.** Everything visible is molded
     charcoal plastic, curved glass, or the phosphor glow behind it. No web
     surfaces, no cards, no browser-idiom chrome. Skeuomorphism played
     completely straight (voice: deadpan; the machine never winks).
   - **Fast-forward is the only navigation.** No scroll, no nav bar, no menu.
     The deck's transport controls (⏪ ◀◀ / ▶ PLAY / ▶▶ FF, maybe ⏏ EJECT) move
     the viewer between content "segments on the tape". FF between segments
     plays a shuttle effect (speed lines / tracking tear / counter spinning);
     the OSD announces state (`PLAY`, `FF ▶▶`, counter). Keyboard arrows work
     as transport too.
   - **Everything on the screen is behind the haze.** One fixed overlay stack
     on the tube — scanlines, chroma fringing, tracking band, vignette, glass
     glare — sits above *all* screen content, always, including future videos.
     Content never renders crisp; crisp is the failure mode.
3. **Palette.** Two families: the **cabinet** (charcoal/black plastics, silver
   deck lettering, LED green/amber for the clock display, a red record dot)
   and the **screen** (VCR-blue `#0000AA`-ish OSD ground, phosphor white OSD
   text, static greys). Include the `:root` block and the WCAG table; the hard
   rule: OSD text is big blocky white-on-blue (or on a dark scrim plate over
   video) — never thin type over static/haze.
4. **Type.** OSD face: a monospaced/pixel face (e.g. VT323 via one `@import`
   at top of `style.css`, `;` in URL percent-encoded `%3B` — restate the
   build gotcha exactly as slop/marble do) for everything on-screen; cabinet
   labels (embossed `VHS`, `HQ`, model number) in condensed caps system
   sans. All caps on screen — the OSD had no lowercase.
5. **Surfaces / the cabinet.** CSS recipes: molded-plastic gradient + 1px
   edge/highlight sandwich (borrow iphone/'s four-layer molding discipline
   with an overhead light), the curved-glass screen (border-radius + inset
   vignette + corner glare), the cassette slot/flap, transport buttons with
   instant `:active` press states (mechanical, no easing), the green LED
   clock (blinking `12:00`, obviously). Speaker grille / vent lines as
   repeating-linear-gradient texture.
6. **The haze stack (screen effects).** The signature section. Codified layer
   order, bottom to top: content (future `<video>` or placeholder) → chroma
   fringe (offset color ghosts) → scanlines (repeating-linear-gradient) →
   tracking band (a slow-roving horizontal distortion strip) → noise/static →
   glass vignette + glare. Recipes for each, opacities capped so content stays
   ~legible. Gotchas: effects are `pointer-events: none`; use `mix-blend-mode`
   only with `isolation: isolate` on the site body (marble precedent — blends
   must not leak into sibling sites in the combined build).
7. **The tape library (content + video placeholders).** What plays on screen:
   a handful of "recordings" (the intro/identity segment, links segment,
   blurb segment) navigated by FF/REW. Videos arrive later as files at
   **absolute** paths (`/vhs/…`, never relative — restate slop/'s §7 rule).
   **Degradation rule (mandatory, mirrors slop):** until videos exist — and
   whenever one is missing — each segment shows its purpose-built stand-in
   (VCR-blue OSD card, or a `NO SIGNAL` / static screen) declared in the same
   stack; the page must read fully composed with zero video files present.
   No JS detection of missing files; HTML/CSS fallback only. Text content
   (name, links) always lives in DOM/OSD, never inside a video.
8. **Motion.** Sanctioned effects list: tracking-band drift, static flicker
   (subtle), LED blink, the FF shuttle transition, power-on collapse
   (optional, once). All keyframes `vhs-`prefixed. `prefers-reduced-motion`
   block mandatory; static state is a composed, legible frame (tracking band
   parked, static frozen, blinking clock resting visible).
9. **What this is not.** Table: not vaporwave/synthwave (neon-grid irony vs.
   sincere appliance); not a glitch-art demo (haze is period-accurate wear,
   not datamosh); not a Netflix-style video site (no thumbnails/grid/UI
   chrome on screen); not iphone/ next door (gloss-gel 2009 vs. matte-plastic
   1996 — different decade, different materials); not a YouTube embed page.
10. **Page application.** Concrete structure of the eventual `vhs/index.html`
    (TV cabinet filling the wrapper; screen region with haze stack; deck
    below with transport controls and LED clock; segments = identity card,
    links card [GitHub `@malls` / Twitter `@forrestalmasi` / Email
    `_@forrestalmasi.com` — the sacred, always-legible zone], blurb card),
    plus **build-contract specifics** and **The test**.

## Build-contract constraints the brief must bake in

Restate these inside the BRANDING.md (Page application section), as every
sibling brief does, so the page generator needs nothing outside the file:

- Single `@import` at very top of `style.css`; every `;` in its URL
  percent-encoded `%3B`; only `@import`/`@media`/`@supports`/`@keyframes`/
  `@font-face` at-rules.
- Every markup/SVG `id` and every `@keyframes` / custom `font-family` name
  prefixed `vhs-` (one shared document in the built page).
- No commas inside functional pseudo-classes — separate selectors.
- No literal `</style>` in CSS or `</script>` in JS.
- Never set `display` on `html`/`body`; no conflicting `html` vs `body`
  properties (both map to the wrapper); `body { isolation: isolate }` if any
  blend modes are used.
- **No `position: fixed`** — chrome is `position: absolute` in the wrapper.
- Combined shell does not scroll. This direction's answer: **the TV does not
  scroll at all** — FF navigation replaces scrolling; if any segment's text
  can exceed the screen, that segment owns an internal `overflow-y: auto`
  region (the screen area), never the page.
- JS is one registry function `(window.SITES = window.SITES || {})['vhs'] =
  function (root) { … }`; query only via `root.querySelector(All)`; listeners
  only on elements inside `root` (keyboard transport listens on a focusable
  element inside the TV, not on `window`/`document`); never style `root`
  itself; standalone boot at end of vhs's own body. Note: JS is genuinely
  required here (FF navigation) — unlike marble/slop, the brief must spec a
  **no-JS baseline**: with scripts absent, all segments render stacked and
  readable inside the screen region.
- Video/poster asset URLs absolute (`/vhs/…`), never relative.
- Links/identity are sacred: correct spelling, real `<a>` elements ≥ 44px
  target, contrast ≥ 4.5:1 effective (scrim plate under OSD text over any
  video/static), reachable by keyboard.

## Key design decisions to capture (from the user's concept)

1. **Skeuomorphic TV/VCR combo** — one appliance object, cabinet + tube +
   deck, drawn in CSS with molded-plastic light discipline.
2. **Fast-forward as the navigation verb** — transport buttons are the site
   nav; shuttle effect + OSD feedback; keyboard equivalents; no scroll nav.
3. **Hazy overlay on screen contents** — a codified, always-on effect stack
   above whatever is on the tube, tuned to degrade but not destroy
   legibility; sacred-content exception via scrim plates.
4. **Videos added later** — placeholder/degradation rule so the page ships
   complete now and `<video>` elements slot beneath the existing haze stack
   later without structural change.

## Acceptance criteria

- [ ] `vhs/BRANDING.md` exists and is the only file created/modified.
- [ ] Follows the house structure: framing blockquote, three-laws direction
      section + Voice, token palette with `:root` block and measured WCAG
      contrast table + one hard legibility rule, type, surface recipes with
      real CSS, haze-stack layer order, motion with mandatory
      reduced-motion, "What this is not" table, "Page application" with
      build-contract specifics and a checkable "The test" list.
- [ ] All four clauses of the user's concept are load-bearing sections: TV+VCR
      skeuomorphism, FF-to-navigate, hazy screen overlay, later-video
      placeholder treatment (with the degradation rule).
- [ ] Owner identity/links (GitHub `@malls`, Twitter `@forrestalmasi`, email
      `_@forrestalmasi.com`) specified in Page application with a sacred
      always-legible treatment.
- [ ] Every id/keyframe/font naming rule, the `%3B` `@import` gotcha, the
      no-fixed/no-page-scroll rule, absolute asset paths, and the JS registry
      pattern (plus a no-JS readable baseline) are restated in the doc.
- [ ] Specificity on par with siblings: hexes, px, ms, named classes — no
      hand-waving.
- [ ] Depth comparable to `iphone/BRANDING.md` (~400–700 lines); tone deadpan
      and sincere, consistent with the house voice.

## Out of scope

- `vhs/index.html`, `style.css`, `script.js` (later task via `brand-page`).
- `sites.config.json` mapping and `node build.js` (the brief may *suggest* a
  target viewport bucket — a mid-desktop bucket suits a 4:3 TV object — but
  mapping is decided at page-build time).
- Producing or sourcing any video files.
