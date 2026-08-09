# FA-16: Generate slop/index.html from BRANDING.md via brand-page skill

## Scope & deliverable

Ship exactly one new file: `slop/index.html`. Nothing else changes. Do not commit (leave in
working tree), do not touch root `index.html`/`style.css`/`script.js`, do not touch
`sites.config.json`, do not run `node build.js`, do not create PNGs or any other file.

**Files-to-ship decision: `index.html` only — no `slop/style.css`, no `slop/script.js`.**
Rationale: the task description (authoritative, human-approved) says "slop/index.html only
(self-contained inline style/script)". This follows the `memphis/` precedent (BRANDING.md +
index.html only) rather than `liquid/` (which has the full build-contract file set). The
brand-page skill mandates a self-contained single-file page judged in isolation; wiring into
the root build (sites.config.json + splitting CSS out to `style.css`) is explicitly out of
scope and will be a later task. **However:** write the CSS/markup as if the build split were
tomorrow — obey every Build-contract constraint from BRANDING.md §11 (listed below) so a
later task can mechanically extract the inline `<style>` into `style.css` unchanged.

**No JS.** The brief (§11) says the flier as specified needs none; keep it that way. Zero
`<script>` tags.

## Sources (read all before writing a line)

- `slop/BRANDING.md` — the brief. It is unusually executable: §2 palette tokens, §3 font
  tokens + `@import`, §4 treatment classes, §5 clip-art data URIs, §8 canvas/scroll/vignette
  CSS, §9 keyframes are all given as copy-usable CSS. Use them verbatim (do not re-derive,
  do not un-encode the data URIs). §11 is the page spec; §11's "The test" is the acceptance
  list.
- `.claude/skills/brand-page/SKILL.md` — workflow (already reflected in this plan).
- `memphis/index.html` and `liquid/index.html` — house shape. Tab-indented markup.

## Head

Use the lean standalone head per `liquid/index.html` and the CLAUDE.md authoring contract
(the build ignores sub-site heads; noindex is the sub-site convention):
`<!DOCTYPE html>`, `<html lang="en">`, `<title>Forrest Almasi</title>`, charset, viewport,
description meta (`Software developer Forrest Almasi's personal website`),
`<meta name="robots" content="noindex">`, then the inline `<style>`. (Memphis carries the
full OG set, but memphis predates the build architecture; liquid is the current convention.)
The Google Fonts `@import` from §3 goes at the **very top of the inline `<style>`**, with
the `%3B` encoding kept exactly as written in the brief. That is the only external request.

## Page structure (top to bottom, per §11)

Body: `margin: 0; height: 100%; background: var(--void)` (never style `html` separately;
never set `display` on it). Inside body:

```
.slop-scroll            height:100%; overflow-y:auto; overflow-x:hidden  (§8 — owns ALL scroll)
  .slop-flier           width:min(560px, 94vw); margin:0 auto; container-type:inline-size;
                        position:relative; overflow:clip   (§8 canvas; cqi type scale from §3)
    [layer 0] raster slots — ALL THREE (§7): skyline (upper third), sign (mid, small,
              rotated), crowd (bottom). Each is a background-image STACK: scrim gradient,
              url('/slop/<name>.png') — absolute path, PNGs do not exist yet — then the
              gradient stand-in that carries the page today. Mask per §7 recipe. No layout
              may depend on raster dimensions.
    [layer 1] purple wash (grape→void field) + .slop-vignette over the whole canvas (§8)
    [layer 2] .slop-splatter — one field, opacity ~0.16
    [layer 3] clip-art: .slop-star--hero (behind ALMASI, slop-spin 60s), .slop-crown
              (cocked over ALMASI's final letter, overlaps text), .slop-peace (beside the
              details block, partially clipped off the canvas edge), .slop-arrow (pointing
              from the time row at nothing). All aria-hidden, pointer-events:none.
    [layer 4] the text stack (below)
```

Layer order is codified in §8 and does not change. No `position: fixed` anywhere. No grain.

## Copy — exact lines and treatments (do not invent off-lexicon garble)

Every-word law (§3) governs display copy; it is suspended for the links block and fine
print. Each display row gets a tilt token; adjacent rows alternate sign, no shared
magnitude; no two rows share a left edge.

1. **Headline stack** (skyline slot behind it):
   - `FORREST` — `.slop-txt-sticker`, Bangers, `--t-big`, `--tilt-1`.
   - `ALMASI` — `.slop-txt-gold` per word, Luckiest Guy, `--t-shout` (the one biggest
     word), `--tilt-2`; star spinning behind, crown over the final letter.
   - `SOFTWARE "TAKE OVER"` — Bungee Shade, `--t-mid`, `--tilt-3`; `TAKE` in `--pink`
     (the ONE pink word on the page). Phantom quotes exactly as written.
2. **Date block**:
   - `SAT JUNE 15ND` at `--t-mid` base with ≥15% per-word size variance: `SAT`
     `.slop-txt-sticker` (Bangers), `JUNE` `--font-block` (Bungee Shade — no added
     shadows, it brought its own), `15ND` `.slop-txt-gold` (Luckiest Guy) with
     `<sup class="slop-th">ND</sup>` inside the gold span (wrong ordinal — required).
   - `4:30 UNTIL 8:00` — Permanent Marker, `--tilt-4`; `.slop-arrow` points from it to
     nothing.
3. **Details block** (`--t-small`, alternating faces/treatments, peace sign alongside):
   - `BRING YO WHOLE CREW` — `.slop-txt-sticker`, Bangers, `--tilt-5`.
   - `FREE FOOD & AND DRINKS` — `.slop-txt-stack`, Luckiest Guy, `--tilt-1`.
   - `DJ ON THE 1'S AND 1'S` — `.slop-txt-spray`, Rubik Wet Paint (the page's 1–2 spray
     words live here), `--tilt-2`; this word carries `slop-pulse` (opacity only).
   - `MUSIC • FOOD • MUSIC` — Permanent Marker, `--tilt-3`; tail of the final `MUSIC`
     wrapped in `.slop-melt` (the page's one melt; decorative word only).
4. **`.slop-drip` rule** (divider, repeat-x), then the crowd slot rising from the bottom.
5. **Links block — SACRED (§6)**: label `PULL UP:` (Permanent Marker, legible), then three
   `.slop-txt-sticker` chips on a solid `--void` plate over the crowd layer, level within
   ±1.5°, spelled correctly, `--t-small` or larger, generous air around them (the only
   whitespace on the page):
   - GitHub `@malls` → `https://github.com/malls`
   - Twitter `@forrestalmasi` → `https://twitter.com/forrestalmasi`
   - Email `_@forrestalmasi.com` → `mailto:_@forrestalmasi.com`
   Hover/focus styles as separate selectors — never `:is(a, b)`. Sticker stroke note:
   in the links block use the §4.2 fallback guidance (paint-order stroke fill; chips are
   where legibility is non-negotiable).
6. **Fine print** — Rubik 900, `--t-fine`, level, uniform (the law is suspended):
   - `NO SMOKING NO DRUGS NO VIBES · ALL AGES 21+ · EVERYONE IS INVITED"`
   - `FREE $5 ENTRY` — `FREE` wrapped in the blink span (`slop-blink`, steps, 1.1s).
   - `(555) 012-344856`

All garble above is verbatim lexicon (§6) or a listed move; nothing improvised. The name
in the headline is identity: spelled correctly, never melted/arched/garbled. No arch on
this page (§4.5 makes it optional; §11 doesn't ask for one) — skip it.

## Motion (exactly three, §9)

`slop-spin` (hero star, 60s linear), `slop-pulse` (the DJ spray line, opacity only),
`slop-blink` (fine-print `FREE`, steps, no easing). All keyframe names `slop-`prefixed.
Mandatory reduced-motion block, verbatim from §9 — blinking word must rest **visible**
(0%,49% visible ordering already guarantees the 0.01ms single run ends… verify the rest
state is visible in the browser; if not, gate the animation itself inside
`@media (prefers-reduced-motion: no-preference)` instead).

## Build-contract constraints checklist (from §11 + CLAUDE.md)

- [ ] Single `@import` at very top of the style block; `%3B` kept; only
      `@import`/`@media`/`@supports`/`@keyframes`/`@font-face` at-rules used.
- [ ] Every markup/SVG `id` prefixed `slop-` (prefer classes; the crown data URI's
      gradient id is already `slop-crown-au` — keep). Keyframes `slop-*`. No custom
      font-family names needed (Google faces keep their names).
- [ ] No commas inside functional pseudo-classes; no `:is()`/`:where()` lists.
- [ ] No literal `</style>` in CSS, no `<script>` at all.
- [ ] No `display` on `html`/`body`; don't style `html` and `body` with conflicting
      values (style only `body`).
- [ ] `.slop-scroll` owns scroll; no `position: fixed`; nothing scrolls horizontally at
      320px (flier is `min(560px, 94vw)`; rotated rows clipped by `overflow: clip`).
- [ ] Raster URLs absolute `/slop/*.png`; each in a stack with scrim above and gradient
      stand-in beneath; no onerror/JS detection; page fully composed with PNGs missing.
- [ ] Zero flat-gold fills anywhere — gold only as the §4.1 ramp (and inside the crown
      SVG's own gradient). Gold extrusion via chained `drop-shadow()`, never text-shadow.
- [ ] Tab-indented markup, matching siblings; full-bleed dark ground (no white anywhere).

## Acceptance criteria (review agent: open the page in a browser, then check §11 "The test")

1. `slop/index.html` is the only new/changed file; nothing committed.
2. Open `slop/index.html` directly (file:// or local server). All six fonts render; no
   two adjacent display words share font, size, angle or treatment; no display row at 0°.
3. `15ND` gold numeral wears the wrong ordinal; inspect computed `background-image` on
   every gold element — all gradients, zero flat gold.
4. Splatter field + ≥4 distinct clip-art marks visible; ≥1 mark clipped by the canvas
   edge (peace), ≥1 overlapping text (crown on ALMASI).
5. The three PNGs are absent on disk today — the page must already read as slop via the
   stand-ins: haze missing, structure intact (this IS the §7 degradation test).
6. Links block: three working links, correct spelling (`@malls`, `@forrestalmasi`,
   `_@forrestalmasi.com`), sticker treatment on a solid plate, tilt ≤1.5°, clickable at
   320px viewport; no horizontal scroll at 320px.
7. Flier scrolls in `.slop-scroll` only; with `prefers-reduced-motion: reduce`, `FREE`
   rests visible and the star/pulse are static.
8. Page plays it straight: no AI wink, no caption, no robot emoji; fine print reads
   deadpan; every garble string is from §6's lexicon/moves.
