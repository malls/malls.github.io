# FA-13: Write shibuya/BRANDING.md: neon dense vertical signage direction (Shibuya at night)

## Scope

One deliverable: `/Users/forrest/Code/malls.github.io/shibuya/BRANDING.md` — a design-direction
brief for a new sub-site, at full format parity with the two exemplars
(`memphis/BRANDING.md`, `liquid/BRANDING.md`). No HTML/CSS/JS files are built under this task;
the brief must be complete enough that the `brand-page` skill (or an implementer) can render
`shibuya/index.html` from it under the root `CLAUDE.md` sub-site authoring contract.
Complexity: medium — the file is prose + copy-pasteable CSS recipes, but the quality bar set
by the siblings is high (computed numbers, working recipes, named gotchas).

## The direction (what the essay must say)

**Shibuya, Tokyo, at night** — not "neon city" in the abstract, but the specific optical fact
of standing at street level: a near-black sky and wet asphalt, and every building face tiled
floor-to-roof with independently lit signs, each one a different business shouting in its own
color. The page is dark because the *ground* is night; everything legible is a light source.

Open with a short blockquote framing (siblings do: `> Design direction: **X** — ...`), then
"## 1. The direction" with an essay and exactly **three "things to hold onto"**, proposed:

1. **The dark is the canvas, not a theme.** Nothing on this page is "dark mode" — the ground
   is night air and it stays close to black everywhere. Signs don't sit *on* the dark; they
   punch *through* it. A gray card with colored text is a dashboard, not a street.
2. **Every sign is somebody else's sign.** Adjacent signs never share a color, a typeface
   treatment, or an alignment — each is an independent business. Coherence comes from the
   *street* (the dark, the stacking grid, the glow physics), never from the signs agreeing
   with each other. This is what separates dense from messy.
3. **Vertical is the default reading direction.** Japanese signage runs top-to-bottom down
   the building edge; the tall thin sign stack (袖看板, projecting edge signs) is the core
   compositional unit. Horizontal text is the exception — a marquee, a ticker — not the rule.

**Voice**: short, declarative, a little wry — signage copy, not marketing copy. Sibling briefs
each define voice in §1; keep that.

## Section outline (mirror the siblings' structure exactly)

Numbered `##` sections with `---` rules between, same order of concerns:

1. **The direction** — essay + 3 holds + voice (above).
2. **Palette** — tokens, `:root` block, computed contrast table, one hard rule (below).
3. **The signage system** — the core-technique section (Memphis's §3 is fill patterns,
   liquid's §3 is wet surfaces; shibuya's is signs). Details below.
4. **Type** — incl. Japanese-capable stacks and the `@import` `%3B` gotcha (below).
5. **Shape, surface and glow hardware** — sign-board construction: hard rectangular boards
   (this direction is rectilinear — the anti-liquid), thin bright tube outlines, mounting
   details (a 2px "bracket" gap between sign and wall via outline/offset), corner radii
   near zero except rounded-tube outlines (`border-radius` ≤ 6px, radius of a bent glass tube).
6. **Layout and composition** — dense vertical stacking, no dead space (below).
7. **Motion** — flicker, buzz, animated signs, reduced-motion (below).
8. **What this is not** — distinction table (below).
9. **Page application** — how `shibuya/index.html` renders the brief under the build
   contract (below).

## 2. Palette (key decisions, numbers already computed)

Night-dark ground; neons named for the **real businesses whose signs carry these colors** —
same naming discipline as "Carlton Pink" / "Trench Black". Proposed tokens (implementer may
fine-tune hues but must recompute the table if any hex changes):

Grounds (never pure black — night air is blue):
- `--night` Night Air `#0A0A12` — the sky/street ground.
- `--asphalt` Wet Asphalt `#15151F` — mid ground, reflective street level.
- `--board` Signboard `#1D1D2B` — the lightest surface; a sign's unlit backing panel.

Neons (light-emitting; anchored in real Shibuya signage):
- `--izakaya` Izakaya Lantern `#FF5C33` — red-orange, chochin lantern / yakitori sign.
- `--kusuri` Pharmacy Green `#2EE58A` — the green cross, discount-drugstore fascia.
- `--karaoke` Karaoke Magenta `#FF3D9E` — karaoke-box pink/magenta.
- `--konbini` Konbini Cyan `#35D6FF` — convenience-store cool cyan.
- `--densha` Signal Blue `#3D7BFF` — deep transit/vending blue. **The one weak neon** (see rule).
- `--nama` Beer Yellow `#FFC933` — beer-hall / taxi-lamp yellow, highest luminance neon.
- `--paper` Paper Lantern `#F5F1E6` — warm off-white; prose and washi-paper surfaces.

Include the `:root` block verbatim in the brief (siblings do), plus glow-alpha film tokens
(e.g. `--tube: rgb(255 255 255 / 0.92)` for the white-hot core of a neon tube — real neon
reads white at the tube and colored in the halo; this is the recipe's key trick, see §3).

**Contrast table — computed, not guessed** (WCAG 2.1 relative luminance; verified by script
during planning; re-run if hexes change):

| Color | vs Night `#0A0A12` | vs Asphalt `#15151F` | vs Board `#1D1D2B` |
|---|---|---|---|
| Paper Lantern `#F5F1E6` | 17.5 ✓ | 16.1 ✓ | 14.7 ✓ |
| Beer Yellow `#FFC933` | 12.8 ✓ | 11.8 ✓ | 10.8 ✓ |
| Pharmacy Green `#2EE58A` | 11.9 ✓ | 11.0 ✓ | 10.0 ✓ |
| Konbini Cyan `#35D6FF` | 11.5 ✓ | 10.5 ✓ | 9.7 ✓ |
| Izakaya Lantern `#FF5C33` | 6.4 ✓ | 5.9 ✓ | 5.4 ✓ |
| Karaoke Magenta `#FF3D9E` | 6.0 ✓ | 5.5 ✓ | 5.1 ✓ |
| Signal Blue `#3D7BFF` | 5.1 ✓ | 4.7 ✓ | 4.3 — large only |

Also computed: Night ink on neon grounds mirrors column 1 (symmetric), so **dark type on a
lit sign panel** is legal on every neon (5.1–12.8) — that's the "surface-carried type" mode.

**The one hard rule** (each sibling has exactly one): propose —
**"Type is either a light or on a light — never a color on a color."** Text is (a) a neon
color on a night ground (light-emitting type, gets a glow), or (b) night ink on a solid neon
panel (surface-carried type, backlit panel sign — think dark-on-color konbini fascia), or
(c) Paper on anything dark. Never neon-on-neon (magenta on cyan ≈ 1.9:1 — it's a moiré, not
a message). Signal Blue never carries small text on Board. Plus **the glow caveat**
(liquid's "transparency caveat" analogue): `text-shadow` glow does not add contrast — the
measured pair is the letterform color vs. the ground; check contrast with glow disabled.

## 3. The signage system (the core-technique section)

This is the brief's center of gravity, like Memphis's patterns / liquid's surfaces. Every
recipe must be a complete, copy-pasteable utility class. Subsections:

- **3.1 The sign stack** — `writing-mode: vertical-rl` columns. The compositional unit is a
  tall thin stack of stacked sign boards down a "building edge". Recipe: a flex column of
  `.sign` boards, each `writing-mode: vertical-rl; text-orientation: mixed;` (`mixed` so
  Latin rotates 90° like real Japanese signage romaji; `upright` reserved for CJK-only or
  initialism signs). **Gotchas to document**: logical properties flip — `inline-size` is now
  vertical, so pad with logical properties (`padding-block/inline`) or the box breaks;
  `text-orientation` does nothing without `writing-mode`; vertical text still needs
  `line-height` (it's the column gauge).
- **3.2 Neon tube glow** — the recipe that makes or breaks the direction. Real neon: the
  tube itself is near-white; color lives in the halo. So:
  `color: near-white core; text-shadow: 0 0 2px core, 0 0 8px hue, 0 0 24px hue, 0 0 60px hue(α↓)`
  — layered, widening, decreasing alpha, **hue in the shadows not the fill**. Provide one
  glow recipe per neon as utility classes (`.neon-izakaya` etc.), plus a box-glow variant
  for tube-outlined boards (`box-shadow` inner tube + outer halo). Rule: glow radii scale
  with font size (use `em` in shadows, not px, so one class serves all sizes).
- **3.3 Sign-board surfaces** — the layered backlit-panel look: `--board` backing, a subtle
  top-lit gradient, a 1px tube outline in the sign's hue, hard corners, a colored ambient
  `box-shadow` (the light a sign throws on the wall behind it — this is what makes the dark
  read as *air* and not vacuum). Variants: backlit panel (solid neon ground + dark ink),
  tube-outline sign (dark board + glowing border + glowing type), paper lantern (Paper
  ground, warm glow, the one soft/rounded element allowed).
- **3.4 The street glow wash** — low-alpha colored radial gradients rising from behind the
  sign stacks onto `--night` (light pollution). Keep ≤ 3, huge, pre-blurred gradients;
  this is ambience, not a light-source competition.
- **3.5 Using signs** — density rules: adjacent signs in a stack never share a hue;
  a stack mixes 3–5 different sign types; at most one animated sign per stack (§7).

## 4. Type

- **One webfont import max**, at the very top of `style.css`, `;` percent-encoded as `%3B`
  — restate the build gotcha verbatim like liquid §4 does (build.js splits statements on raw
  `;` without string awareness).
- **Japanese-capable stack decision**: the brief should *specify Japanese glyph support in the
  fallback stack* — `'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans JP', 'Meiryo'` —
  because the page application (§9) uses real Japanese sign text (渋谷, 居酒屋, カラオケ, 営業中)
  as decorative signage, and tofu boxes kill the illusion. Options: (a) system-JP stack only,
  zero-download (recommend as default — every target OS ships a JP gothic), or (b) one Google
  Fonts JP import (e.g. `Noto Sans JP` — warn it's a multi-MB family; if imported, weights
  percent-encoded). Display face: heavy geometric/gothic sans, wide tracking on vertical
  runs; micro face: condensed mono for ticker/label text.
- Decorative Japanese sign text takes `aria-hidden="true"` + `lang="ja"` where used
  (mirror liquid's micro-text accessibility discipline); anything a reader needs is in the
  content language at full contrast.
- Fluid `clamp()` scale like siblings (ratio ~1.33–1.4), plus a note that vertical display
  type sizes against **viewport height** (`vh` terms in the clamp) since its long axis is
  vertical.
- Bans list (siblings end §4 with one): no italics (neon tubes don't slant), no ultra-light
  weights (a thin tube reads fine but thin *type* on dark halates away), etc.

## 6. Layout and composition

- **The street grid**: page = a dark ground with 2–4 vertical sign-stack columns of unequal
  width plus one horizontal marquee band — like building edges around an intersection.
  Asymmetric; stacks reach different heights; no two stacks aligned to the same top edge.
- **No dead space**: gaps between signs are thin (the dark reads through as mortar lines,
  `--s-1`–`--s-2`), never wide empty fields. The dark is *between* things, not around them.
  But: prose (the actual readable content) gets one calmer, wider panel — the street is
  dense, the letter home is legible.
- **Scroll ownership**: the combined build pins `html, body { height: 100%; overflow:
  hidden }` — a dense vertical direction *will* overflow, so shibuya owns its scroll
  container (an inner wrapper with `overflow-y: auto; height: 100%`), with the street-glow
  wash on a non-scrolling sibling layer or `position: sticky` — **no `position: fixed`**,
  per contract.
- Spacing token scale like siblings.
- Nothing scrolls horizontally at 320px; on narrow viewports stacks reduce to 1–2 columns
  and glow radii shrink.

## 7. Motion

Electric, not organic (the anti-liquid): everything is on/off, PWM, mains hum.
- **Flicker**: one dying-tube sign per page maximum — `steps()` opacity keyframes with
  irregular percentages (real flicker is aperiodic); everything else is steady (a street of
  flickering signs is a horror film, not Shibuya).
- **Buzz**: sub-pixel translate jitter on at most one element, `steps(2)`, subtle.
- **Animated signs**: chase-light border (animated `background-position` on a dashed
  gradient border), marquee ticker (translateX loop, seamless), slow hue-cycling on exactly
  one karaoke sign. Periods unequal so nothing beats in sync.
- **Hover**: signs light *up* — glow radii/alpha increase, as if you stepped closer.
- The standard `prefers-reduced-motion` block (copy siblings') **plus** shibuya-specific
  rules: flicker/buzz/marquee stop dead; every sign's reduced state is fully lit (its most
  composed frame — steady-on, not dark); photosensitivity note: flicker opacity delta kept
  small and under 3 flashes/sec.

## 8. What this is not

Table format like siblings (`| Not this | Because |`), proposed rows:
- **Cyberpunk / Blade Runner** — rain-soaked dystopia, holograms, teal-orange grading, decay
  as aesthetic. Shibuya at night is *cheerful commerce* — the signs sell beer and karaoke,
  not existential dread. No smog gradients, no glitch effects.
- **Vaporwave** — pink-teal sunsets, perspective grids, Roman busts, irony, 90s-web nostalgia.
  This direction is a real place photographed straight, not a mood about a fake one.
- **Synthwave / outrun** — horizon grids, chrome script, sun-with-scanlines. No horizon
  exists here; you're inside the canyon looking up.
- **Generic "neon UI" / gamer RGB** — a dark dashboard with one accent glow and rounded
  cards. Shibuya has seven competing light sources and zero soft UI chrome.
- **Tokyo-kitsch orientalism** — torii gates, cherry blossoms, faux-brush "wonton" latin
  type. The Japanese text is real signage vocabulary set in real gothic faces, or it's absent.
- Also-out list: pure `#000` ground, colored text on colored grounds, uniform sign sizes,
  symmetric layouts, glassmorphism blur panels, gradients as decoration (light glows,
  surfaces don't).

## 9. Page application

Describe `shibuya/index.html` concretely, honoring the full authoring contract
(root `CLAUDE.md`):
- Files `shibuya/index.html` + `style.css` (+ optional `script.js`); CSS written standalone
  (build rewrites `html`/`body`/`:root` → `#site-shibuya`, prefixes the rest).
- **Every `id`, `@keyframes` name, and custom font-family prefixed `shibuya-`** (shared
  document in the built page).
- At most one `@import` at top of `style.css`, `%3B`-encoded; only
  `@import/@media/@supports/@keyframes/@font-face` at-rules; no comma-lists inside
  functional pseudo-classes; no literal `</style>`/`</script>`.
- JS (if any — the marquee and flicker can be pure CSS; JS optional, e.g. a "lights come on"
  staggered power-up on load, or hover-proximity glow): registry form
  `(window.SITES = window.SITES || {})['shibuya'] = function (root) {...}`, `root`-scoped
  queries only, no `window`/`document` listeners, no styles on `root` itself; standalone
  boot script at end of body.
- Site root sets `isolation: isolate` (written as `body { … }`) if any `mix-blend-mode` is
  used for glow washes.
- **Owns its scroll** (§6): inner `overflow-y: auto` wrapper; no `position: fixed`.
- Concrete structure: hero = the tallest sign stack carrying `forrest almasi` vertically in
  the flagship neon (tube-glow recipe) with 渋谷-style decorative signs above/below;
  a horizontal marquee band with `software developer`; a backlit-panel sign holding the
  "What's up?" blurb in Paper on Board (the calm readable panel); three link signs
  (GitHub `@malls`, Twitter `@forrestalmasi`, Email `_@forrestalmasi.com`) as three
  different sign types in three different hues at three different offsets; one flickering
  sign; footer as a small paper-lantern sign. Content matches siblings' (same name/links).
- **The test** paragraph (siblings end with one): all neons present, ≥ 4 distinct sign
  types, ≥ 3 vertical-writing runs, exactly one flickering element, no color-on-color type,
  contrast table holds with glows disabled, nothing horizontal-scrolls at 320px.

## Key files

- Deliverable: `/Users/forrest/Code/malls.github.io/shibuya/BRANDING.md` (folder exists, empty)
- Exemplars for format parity: `/Users/forrest/Code/malls.github.io/memphis/BRANDING.md`,
  `/Users/forrest/Code/malls.github.io/liquid/BRANDING.md`
- Contract: root `CLAUDE.md` §"Authoring contract for a sub-site"
- Do NOT touch `index.html` (root), `build.js`, or `sites.config.json` in this task.

## Acceptance criteria

1. **Format parity**: same skeleton as siblings — opening blockquote, numbered `##` sections
   in the order above, `---` rules, one "things to hold onto" triplet, voice paragraph, one
   bolded hard contrast rule, "What this is not" table, closing "Page application" with a
   testable "The test" paragraph.
2. **Contrast table is computed, not guessed** — WCAG 2.1 ratios for every neon against all
   three grounds; if the implementer changes any hex, the table is recomputed (one-liner
   Node script; luminance per WCAG 2.1). The glow caveat is stated.
3. **Recipes are copy-pasteable** — every technique in §3/§5/§7 is a complete CSS utility
   class (real values, no `/* ... */` placeholders), including at least: vertical sign stack,
   one full neon-glow text recipe with white-hot core, one sign-board surface with ambient
   wall-glow, one flicker keyframe set, one marquee/chase recipe.
4. **Build-contract compliance in §9** — id/keyframes/font prefixing, `@import` `%3B` gotcha
   restated, scroll ownership, no-`fixed`, registry-function JS shape, `isolation: isolate`
   if blend modes used.
5. **Distinctness**: the "not this" table explicitly fences off cyberpunk, vaporwave,
   synthwave, generic neon-UI, and orientalist kitsch.
6. **Japanese text handled correctly**: JP-capable fallback stacks specified;
   decorative JP text marked `aria-hidden` + `lang="ja"`; `text-orientation` guidance given.
7. No other files created or modified; the brief alone is the deliverable.
