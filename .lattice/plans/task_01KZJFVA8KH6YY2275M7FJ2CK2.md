# FA-20: horse/: generate page from BRANDING.md — frames from Smithsonian scan, config mapping, build

Deliverable: the working `horse/` sub-site — `frames.jpg` sprite strip cut with
**ffmpeg** from the user-chosen Smithsonian/LOC scan, page files generated via the
`brand-page` skill from `horse/BRANDING.md`, mapped into the **mobile landscape**
slot in `sites.config.json`, and the root `index.html` rebuilt with `node build.js`.

`horse/BRANDING.md` is the authoritative design spec (read it in full before
generating). This plan covers the pipeline, wiring, and verification.

## 0. Established facts (do not re-derive)

- Source image (user's explicit choice): the 1536×1200 baseline JPEG LOC scan of
  the 1878 "Sallie Gardner" card, already downloaded at
  `/private/tmp/claude-503/-Users-forrest-Code-malls-github-io/7e5a1f85-446e-4042-9d3f-8829425f83cd/scratchpad/horse_fullres.jpg`
  (a `.png` copy sits beside it). If the scratchpad copy is gone, re-download:
  `https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/b7/1e/b71e206b-df4a-4d9e-958a-1a249c544c6e/the_horse_in_motion_2_resized.jpg`
- Layout of the scan: white outer border; **12 numbered panels in a 4-column ×
  3-row black-bordered grid** occupying roughly the upper ~3/4; below it the
  letterpress caption band. Panel 12 is the standing horse — it IS part of the
  numbered run and ships (the "portrait vignette" drop rule in BRANDING.md §2 does
  not apply to this printing).
- Each panel is only ~340px wide — **below BRANDING.md's ≥800px/frame ideal. The
  user chose this source, so the ideal is waived**; note the deviation in the
  review comment, do not upscale (albumen softness is period-correct, upscaling is
  not).
- **ffmpeg is the user-specified tool for panel extraction** (installed via
  Homebrew). ImageMagick exists but is not the requested tool.
- N = 12 everywhere: ids `horse-f01`…`horse-f12`, roman numerals I…XII, `--n: 12`.

## 1. Asset pipeline → `horse/frames.jpg` (ffmpeg)

Work in the scratchpad directory; only the final `frames.jpg` lands in `horse/`.

1. **Measure the grid by iterative trial crops.** The grid is regular, so panel
   origins are linear in column/row index:
   `x = x0 + col*dx`, `y = y0 + row*dy` (col 0–3, row 0–2), one uniform crop
   `w × h` for all 12. Determine `x0, y0, dx, dy, w, h` empirically: cut trial
   panels with

   ```
   ffmpeg -y -i horse_fullres.jpg -vf "crop=W:H:X:Y" trial.png
   ```

   and **visually inspect each with the Read tool**, iterating until edges are
   clean. Calibrate on the corners (panels 1, 4, 9, 12) — if all four are clean
   with the same linear formula, the middle panels are too. Crop **inside** each
   panel's black border so no neighboring panel or border rule bleeds into any
   frame. Rough starting guesses: dx ≈ 1536/4 ≈ 384, panel content ~340px wide;
   refine by eye.
2. **Registration comes free from the linear formula**: identical `w × h` at
   linearly spaced origins means the track rail and horse torso sit at the same y
   in every frame — provided the *grid itself* is square to the image. Check the
   trial crops for skew; if the scan is slightly rotated, tolerate ≤ ~2px drift
   (the panels are small) rather than inventing a rotation step.
3. **Extract all 12 panels** in gallop order — left-to-right, top-to-bottom
   (row 1 = panels 1–4, row 2 = 5–8, row 3 = 9–12); **confirm against the printed
   panel numbers visible in the scan** rather than assuming. Emit
   `f01.png`…`f12.png` at the identical crop size (uniform by construction — no
   scaling step needed).
4. **Tone normalization** (BRANDING.md §2 step 4): the panels come from one scan,
   so they should already match; compare a few and only add a normalization filter
   (e.g. `eq=` tweaks) if a panel is visibly off. Warming is done in CSS
   (`sepia()` filter), not baked into the JPEG.
5. **Assemble the horizontal strip with hstack** (12 inputs):

   ```
   ffmpeg -y -i f01.png -i f02.png … -i f12.png \
     -filter_complex "hstack=inputs=12" -frames:v 1 -q:v 3 horse/frames.jpg
   ```

   `-q:v 3` ≈ JPEG quality ~80 for mjpeg. Confirm size ≤ 1.5MB — trivially met at
   this resolution (expect well under 300KB).
6. **Verify the strip**: `ffprobe` (or `ffmpeg -i`) reports exactly `12*w × h`;
   Read `horse/frames.jpg` and confirm 12 registered panels in order 1–12, no
   black-border bleed at any seam, no drift of the track rail. Record the final
   per-frame `w × h` and its aspect ratio — the CSS needs `--frame-ar` (§2 of
   BRANDING.md) and the review comment should note the actual frame width vs the
   waived 800px ideal.

## 2. Page generation → `horse/index.html` + `style.css` + `script.js`

**Invoke the repo's `brand-page` skill** (Skill tool, skill: `brand-page`, args
pointing at `horse/`) to generate the page from `BRANDING.md`. Pass along the
measured facts it cannot know: N = 12, the per-frame aspect ratio, and that
`frames.jpg` already exists at `horse/frames.jpg`.

BRANDING.md encodes the full technical recipe (§5 `:target` stage, §6 swipe JS,
§7 layout). Acceptance-critical contract points, restated:

- **Every id `horse-`-prefixed** — frame ids `horse-f01`…`horse-f12`, grain
  filter id, any others. Ids resolve document-wide in the built page.
- **`@import` at the very top of `style.css` with every `;` in the URL encoded as
  `%3B`** (EB Garamond — the exact URL is in BRANDING.md §4).
- **No commas inside functional pseudo-classes** — use the comma-free `:has()`
  recipes from §5 verbatim; write `a:hover` / `a:focus-visible` as separate rules.
- **Sprite URL is absolute**: `url('/horse/frames.jpg')` — relative breaks either
  standalone `/horse/` or the built root page.
- **Slides first, playback layer AFTER the slides in DOM order** inside `.stage`
  (the `.frame:first-of-type` default depends on it).
- **JS**: single registry function
  `(window.SITES = window.SITES || {})['horse'] = function (root) { … }`;
  `root.querySelector(All)` only; pointer listeners on `.stage` only — never
  `window`/`document`; no `root.style` writes; no `window.location` reads (commit
  the landing frame by `.click()`ing the frame's existing anchor). The one
  `matchMedia('(prefers-reduced-motion: reduce)')` read from §6 is fine.
- **Standalone boot** at end of body, per liquid/ (the canonical file pattern —
  marble/ is an older inline-style variant, do not copy it):
  `<script src="./script.js"></script><script>SITES['horse'](document);</script>`
- **Standalone head**: own title, `<meta name="robots" content="noindex">`,
  `<link rel="stylesheet" href="./style.css"/>` — mirror `liquid/index.html`.
- No scroll container, no `display` on `html`/`body`, no `position: fixed`, no
  literal `</style>`/`</script>` in CSS/JS strings, no keyframes without the
  `horse-` prefix.
- Caption band (identity links, Muybridge credit
  `AFTER EADWEARD MUYBRIDGE · "THE HORSE IN MOTION" · 1878`, `TAP · SWIPE` hint)
  sits **outside/below** `.stage` so links never sit under tap anchors.

## 3. Config + build

- `sites.config.json`: the mobile slot is
  `"mobile": { "portrait": "random", "landscape": "random" }` — change **only**
  `"landscape"` to `"horse"`. Portrait, `"default": "random"`, and the `"800":
  "random"` bucket stay untouched. (build.js validates both mobile slots as
  required strings and resolves them as site folder names.)
- Run `node build.js`; it must exit clean.
- Verify the built root `index.html` contains a `#site-horse` wrapper, the
  landscape media query showing it, `horse-`-prefixed selectors, and the inlined
  JS registry.

## 4. Verification (no browser required)

- `node build.js` exits 0.
- Grep checks on generated sources:
  - `grep -n 'id="' horse/index.html` — every id starts with `horse-`.
  - `grep -n '@import' horse/style.css` — one, at top, no raw `;` inside the URL
    (only the terminating one).
  - `grep -nE ':(is|has|not|where)\([^)]*,' horse/style.css` — no matches.
  - `grep -n 'frames.jpg' horse/style.css` — absolute `/horse/frames.jpg`.
  - `grep -nE 'window\.|document\.' horse/script.js` — nothing beyond the
    `window.SITES` registry line (and a bare `matchMedia(` call is allowed).
  - `grep -n 'horse-f01' horse/index.html` — first frame present; count frame
    divs = 12; wrap-around anchors: f01's prev → `#horse-f12`, f12's next →
    `#horse-f01`.
- Built page: `grep -c 'site-horse' index.html` > 0; confirm `orientation:
  landscape` media query maps to horse; confirm other sites' wrappers survived.
- `frames.jpg`: ffprobe dimensions = 12 × frame-width; visual Read check done in
  §1 step 6.
- Optional cheap preview: `python3 -m http.server` in repo root + `curl -s
  localhost:8000/horse/ | head` — fine, but not required; no browser automation.

## 5. Commit

One commit on `liquid` (the working branch): `horse/index.html`,
`horse/style.css`, `horse/script.js`, `horse/frames.jpg`, `sites.config.json`,
rebuilt root `index.html`, plus this task's `.lattice/` files. Do not sweep in
other agents' unrelated dirty files (see Shared Worktree Discipline).

Message:

```
FA-20: generate horse/ — Muybridge flipbook site, landscape slot

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

Then move the task to `review` (`--actor agent:claude-fable-5-impl`).

## 6. Acceptance criteria

- [ ] `horse/frames.jpg` exists: one horizontal strip, exactly 12 uniform frames
      in printed-number order 1–12, cut with ffmpeg, no border bleed between
      frames, track rail registered (no visible jitter frame to frame), JPEG
      q≈80, ≤ 1.5MB.
- [ ] Per-frame size and aspect ratio recorded; the <800px/frame deviation from
      BRANDING.md's ideal is noted as waived by the user's source choice (no
      upscaling performed).
- [ ] `horse/index.html`, `style.css`, `script.js` generated via the `brand-page`
      skill and conform to the authoring contract: all ids `horse-`-prefixed,
      `%3B`-encoded `@import` at top of CSS, comma-free functional
      pseudo-classes, absolute `/horse/frames.jpg`, registry-function JS with
      listeners only inside `root`, standalone boot lines, `robots noindex` head.
- [ ] Slides precede the JS playback layer in `.stage` DOM order; tap anchors
      wrap f12→f01 and f01→f12; caption band with identity links + Muybridge
      credit + `TAP · SWIPE` sits below the stage.
- [ ] `sites.config.json` mobile.landscape = `"horse"`; portrait, buckets, and
      `default` untouched.
- [ ] `node build.js` exits clean; rebuilt root `index.html` contains
      `#site-horse` gated to the landscape slot; `index.html` not hand-edited.
- [ ] All §4 grep checks pass.
- [ ] Single commit in repo style with the Co-Authored-By trailer; `.lattice`
      task files included.
