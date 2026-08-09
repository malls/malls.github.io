# FA-14 Plan: slop/BRANDING.md — AI-slop flier design direction

## Deliverable

Exactly one file: `slop/BRANDING.md` (create the `slop/` folder). **No index.html, no
style.css, no script.js in this task** — page generation is a follow-up task that the
`brand-page` skill will run against this brief. Do not map `slop` in `sites.config.json`
and do not run `node build.js`.

## Quality bar and voice

Match `memphis/BRANDING.md` for structure and rigor: named swatches with tokens, computed
contrast tables, copy-pasteable CSS recipes, hard rules stated as rules, a "what this is
not" table, and a concrete page-application section. Study `liquid/BRANDING.md` for how a
brief can vary structure (z-ladder, gotcha callouts) — borrow the *gotcha callout* habit
where relevant, but keep memphis's numbered-section skeleton.

The brief's own prose voice should be deadpan-scholarly about a ridiculous subject: it
treats "AI's confused idea of a street-party flier" as a design movement worth documenting
precisely. The joke is in the rigor, not in winking asides.

## Aesthetic thesis (write the whole document toward this)

A **lovingly handcrafted CSS reproduction of a low-effort AI-generated hype flier**
(reference: a 'TEEN TAKE OVER' park-party flier). Core reads, all of which the brief must
codify as rules:

- **Palette:** purple / black / gold. Deep purple grounds, near-black vignettes, and
  gold used as a *gradient*, never flat — the shiny beveled gold of AI numerals.
- **Type:** graffiti-brush / marker display faces from Google Fonts (candidates the brief
  should name: Rubik Wet Paint, Bungee Shade, Permanent Marker, Bangers, Luckiest Guy —
  implementer picks 4–6 and locks them in). **Every word styled differently** is a law,
  not an accident: adjacent words change font, size, color, rotation, and treatment.
- **Numerals:** gold-gradient fill (`background-clip: text`), beveled look via layered
  shadows, with a randomly attached superscript "TH" (or "ST" on the wrong number) as a
  codified move.
- **Text treatment:** hard multi-layer drop shadows (2–4 opaque offset layers, never
  blurred-grey), white text strokes (`-webkit-text-stroke` + paint-order fallback), glow
  where it makes least sense. The brief should define named treatment recipes as utility
  classes (e.g. `.slop-txt-gold`, `.slop-txt-sticker`, `.slop-txt-spray`).
- **Garble:** deliberately almost-right text is part of the vocabulary — "BRING YO WHOLE
  CREW", "4:30 UNTIL 8:00", doubled letters, inconsistent apostrophes, a phone number
  with too many digits. The brief must include a short lexicon/rules for generating
  garble (what kinds of errors are in-vocabulary vs. just typos).
- **Textures/clip-art in pure SVG data URIs:** spray-splatter field, clip-art crown,
  star burst, peace sign, curved arrow — each shipped as a copy-pasteable
  `background-image: url("data:image/svg+xml,…")` recipe with `%3C %3E %23` encoding,
  memphis §3.3-style.
- **Raster AI imagery:** licensed ONLY as decorative background layers — the
  pseudo-photographic parts CSS can't fake (mushy crowd silhouettes, melting skyline,
  garbled park sign). Referenced by **absolute path `/slop/<file>.png`** because relative
  CSS URLs break in the root build. The brief must state this rule and specify slots
  (which layers may be raster) even though the images themselves are produced later.
- **Composition:** flier logic, not web logic — a single crammed portrait "canvas",
  everything centered-ish but misaligned, no grid, elements rotated at competing angles,
  zero respect for whitespace, content density as a virtue. Layer order codified
  (raster background → vignette → splatter → clip-art → text stack).

## Section outline for slop/BRANDING.md

1. **The direction** — essay: what AI-slop flier design is, why it's reproduced by hand
   in CSS, the three things to hold onto (every word differently styled; gold is a
   gradient; wrongness is deliberate and specific). Voice paragraph.
2. **Palette** — named tokens (`--slop-*`-free CSS vars are fine inside the brief's
   `:root` block, but note they land under `#site-slop` after build): purples, blacks,
   golds (gold as a 3–4 stop gradient token pair), white, an accent (hot pink or cyan
   for one out-of-place word). Contrast table computed against the grounds; the hard
   rule (e.g. "readable words are white-stroked or gold-gradiented on dark; the stroke
   IS the contrast mechanism").
3. **Type** — Google Fonts stack via ONE `@import` at the top of `style.css` with
   `%3B`-encoded semicolons (show the exact import line); per-font roles; the
   every-word-different law; fluid size scale.
4. **Text treatments** — the named recipes: gold-gradient numerals + superscript TH,
   hard layered shadows, white strokes, arc/rotated words, glow. Copy-pasteable CSS.
5. **Textures, splatter and clip-art** — SVG data-URI recipes (splatter, crown, stars,
   peace sign, arrow), sized/positioned as background layers or absolutely-positioned
   decorations.
6. **The garble** — rules and lexicon for almost-text.
7. **Raster image layers** — licensing rule (background-only, absolute `/slop/…` paths),
   the three slots (crowd, skyline, park sign), how they're masked/vignetted, and the
   fallback rule (page must still read as slop with the rasters missing).
8. **Composition** — the flier canvas, layer order, rotation/misalignment rules, density
   rule, responsive behavior (the flier scales as a unit; it is taller than the viewport
   so it owns its own scroll container).
9. **Motion** (small) — at most: a pulsing glow, a slowly rotating starburst, blinking
   text — the GIF-era moves an AI flier implies. All keyframes `slop-` prefixed;
   `prefers-reduced-motion` block mandatory.
10. **What this is not** — table: not vaporwave, not real graffiti/street art, not actual
    competent party-flier design, not memphis, not ironic-ugly brutalism, not a raster
    image with an image map. Each with a one-line "because".
11. **Page application** — what `slop/index.html` will concretely contain (hero headline
    stack, date/time block with gold numerals, garbled details block, clip-art placement,
    raster layers), plus a testable checklist for the page.

## Build-contract constraints the brief itself MUST state (in §11 or a dedicated callout)

So the future page generator honors them without reading CLAUDE.md:

- Google Fonts loaded via `@import` at the very top of `style.css`, semicolons in the
  URL percent-encoded as `%3B` (raw `;` gets cut by the build's statement splitter).
- Every `id` in markup/SVG prefixed `slop-`; every `@keyframes` name and custom
  `font-family` name prefixed `slop` (ids/filters resolve document-wide in the build).
- No commas inside functional pseudo-classes (`:is()`, `:not(a, b)`) — separate selectors.
- No literal `</style>` in CSS or `</script>` in JS.
- Never set `display` on `html`/`body`; don't set the same property differently on both.
- The combined page does not scroll (`overflow: hidden` shell, wrapper at
  `height: 100%`) — the flier is tall, so the site must own its own scroll container.
- Raster URLs absolute (`/slop/…`), never relative.
- JS (if any) as `(window.SITES = window.SITES || {})['slop'] = function (root) {…}`,
  querying only inside `root`, no `window`/`document` handlers.

## Key files

- Write: `/Users/forrest/Code/malls.github.io/slop/BRANDING.md` (new; create folder)
- Read for format: `/Users/forrest/Code/malls.github.io/memphis/BRANDING.md`,
  `/Users/forrest/Code/malls.github.io/liquid/BRANDING.md`
- Read for contract: `/Users/forrest/Code/malls.github.io/CLAUDE.md` ("Authoring contract
  for a sub-site")

## Acceptance criteria

- [ ] `slop/BRANDING.md` exists; it is the only file added; no build artifacts touched.
- [ ] Contains all 11 sections above (numbering may differ; content may not).
- [ ] Palette: named swatches with hex tokens, a `:root` CSS block, and a computed
      contrast table with an explicit hard rule for what carries text.
- [ ] Gold is specified as a gradient recipe (with `background-clip: text` numeral
      treatment + superscript TH rule), never a flat fill for numerals/display.
- [ ] Names 4–6 specific Google Fonts and shows the exact one-line `@import` with
      `%3B`-encoded semicolons.
- [ ] "Every word styled differently" appears as an explicit rule with concrete
      mechanics (font/size/rotation/treatment rotation).
- [ ] At least 4 SVG data-URI recipes (splatter + at least 3 clip-art marks), each a
      complete copy-pasteable CSS rule with percent-encoded SVG.
- [ ] Garble section with rules/lexicon including the reference phrases ("BRING YO WHOLE
      CREW", "4:30 UNTIL 8:00").
- [ ] Raster-image section: background-layers-only rule, absolute `/slop/…` path rule,
      named slots, graceful-degradation rule.
- [ ] "What this is not" table includes at minimum vaporwave, real graffiti design, and
      actual competent street-party design.
- [ ] Build-contract constraints (list above) all stated inside the brief itself.
- [ ] Page-application section describes a concrete flier layout including the
      own-scroll-container requirement.
- [ ] Quality/length in the same league as memphis/BRANDING.md (~400+ lines, real CSS
      recipes, not sketches).

## Implementation notes

- Commit on the current `liquid` branch (already branch-linked to FA-14) with sources
  only; message per repo convention.
- Estimated complexity: medium — single-file deliverable, but the recipes (SVG data
  URIs, gradient text) must actually be valid CSS since the brand-page skill will
  execute against them literally.
