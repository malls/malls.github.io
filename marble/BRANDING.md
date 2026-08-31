# Marble

> Design direction: **pietra dura** — the semiprecious-stone tabletops of the Real
> Laboratorio delle Pietre Dure, as in the Prado's mesa de piedras duras: a polished
> black touchstone slab inlaid with jasper, agate, chalcedony and lapis lazuli — flowers,
> volutes and borders cut so precisely the joints disappear — framed in gilt bronze.
> The page is that tabletop, seen from directly above, at the width of a whole wall.

## 1. The direction

Elegance is the entire brief. Not minimalism — the reference tables are dense with
ornament — but *control*: every element cut to fit, nothing overlapping by accident,
nothing loud, everything still.

Three laws, because getting them wrong produces a "marble-themed website" instead of a
slab of inlaid stone:

1. **Everything is stone or gilt.** Every visible surface is a marble texture tile;
   every line is a gilt fillet or a saw kerf. There are no flat "web" surfaces — no
   plain color panels, no white cards, no grey backgrounds. If a region isn't stone,
   it's the gilt bronze between stones.
2. **Stone meets stone at a knife seam.** Edges here are *hard*: straight lines, right
   angles, true ellipses, 1px gold fillets. No blur, no glow, no soft shadow, no
   rounded-corner softness. The craft of pietra dura is the invisible joint — crisp
   seams are the whole aesthetic. (This is the exact inverse of `liquid/`'s law.)
3. **The composition is bilaterally symmetrical.** The reference tables mirror left–right
   around a central cartouche. Everything is centered or paired: one medallion on the
   axis, flanking panels in mirrored pairs, borders running the full perimeter. Asymmetry
   reads as breakage.

**Voice.** Lapidary — engraved, not typed. Few words, formal, museum-label calm. Small
caps and wide tracking in display; no exclamation marks, no casual asides in display
type (the prose blurb may stay conversational — it is the one modern thing on the table).

---

## 2. The stones

The material library is a found object: a 1990s seamless-texture pack of 118 marble and
granite tiles, served from GitHub. This is the *only* image source on the page.

```
https://raw.githubusercontent.com/malls/forrest/master/public/images/marble/marbNNN.jpg
```

`NNN` runs 001–150 **with gaps** — these numbers do not exist and must never be
referenced: 037–042, 046–047, 049–068, 087–088, 102–103. Every URL you write must come
from the cast list below or be verified against the directory listing.

Tiles are small (96×96 up to 360×256) and genuinely seamless. That is a feature:

- **Tile at native size.** `background-repeat: repeat; background-size: auto;`. Never
  stretch a tile across a panel (`cover` on a 96px JPEG is mud), never
  `image-rendering: pixelated`. The fine repeating grain at 1× is the material's honesty.
- **No panel wider than ~640px in a single stone.** Real pietra dura is made of many
  small pieces. Large regions are subdivided into separate panels with seams between
  them — the ultra-wide viewport is filled by *more stones*, not bigger ones.
- **Book-match large fields.** Adjacent panels of the same stone may mirror
  (`transform: scaleX(-1)` on alternate panel elements) so the figure reflects across
  the seam, as sawn slabs do.

### The cast

Roles, by stone. Filenames verified against the directory.

| Role | Stone | Tiles | Use |
|---|---|---|---|
| **Ground** | Paragone (touchstone) | `marb109` (primary), `marb019`, `marb021` | The slab itself. The largest area of the page. Near-black, low variance — the only stone type that carries body text directly. |
| **Feature black** | Nero antico | `marb093` | Black with white lightning veins. Frames and small feature panels only — too figured for text. |
| **Lapis** | Lapis lazuli | `marb110`, `marb114`, `marb076`, `marb115` | The border frieze — the reference table's lapis border. Also small reserves. |
| **Verde** | Verde antico / serpentine | `marb034`, `marb015`, `marb096`, `marb107`, `marb140`, `marb150` | Garland leaves, paired side panels, dark accents. |
| **Rosso** | Jasper / rosso antico | `marb144`, `marb133`, `marb129`, `marb016`, `marb084` | Petals, small lozenges, paired accents. Sparingly — red is a jewel, not a field. |
| **Giallo** | Giallo antico / Siena | `marb022`, `marb105`, `marb113`, `marb137`, `marb006`, `marb126` | The outer moulding band, fruit and ornament fills. `marb105` is the brightest — small doses. |
| **Bianco** | Carrara / chalcedony | `marb030`, `marb083`, `marb090`, `marb092`, `marb097`, `marb108`, `marb009` | Blossoms, highlights, the lightest reserves. Never a text ground. |
| **Rosa** | Alabaster / rose | `marb007`, `marb033`, `marb071`, `marb091`, `marb142` | Rare warm accents inside ornament. |
| **Showpiece** | Agates | `marb044` (amber), `marb043` (moss), `marb045` (teal), `marb002`, `marb089` | The centre of the cartouche and nowhere else. One showpiece per page, maximum two. These are the gems; scarcity is what makes them read as precious. |

### Banned tiles

The pack contains synthetic-neon outliers that would demolish the palette. Never use:
`marb029`, `marb036` (hot pink), `marb116` (lime), `marb117`, `marb118` (electric cyan),
`marb119` (magenta), `marb121`, `marb122` (turquoise mosaic) — and `marb005` and
`marb008`, which are printed patterns (brick courses, a border strip), not stone.

The working palette of the page is: black ground, lapis blue, verde green, giallo gold,
with white, rosso and rose as jewels. If a screenshot reads as colorful, the casting is
wrong; the reference tables are 70% black.

---

## 3. Quarry tokens (CSS palette)

Solid colors sampled from the stones, for everything texture can't do: type, fillets,
scrims, seams. Reach for these before inventing a hex.

```css
:root {
	/* grounds */
	--paragone:   #12100C;   /* the slab; matches marb109's mean */
	--basanite:   #1C1915;   /* raised plinths, plaque grounds */

	/* stones */
	--lapis:      #26428B;
	--lapis-deep: #1B2F63;
	--verde:      #1F5C45;
	--rosso:      #71291D;
	--giallo:     #C89B3C;

	/* light stones — type only */
	--alabaster:  #F2EBDA;   /* body copy on dark grounds */
	--calcite:    #FAF6EC;   /* brightest highlight, rare */

	/* gilt bronze — the metal between the stones */
	--gilt:        #C9A34A;  /* the standard fillet and small-caps labels */
	--gilt-bright: #E6CC82;  /* catch-light state: hover, the lit edge of a moulding */
	--gilt-deep:   #7A6231;  /* the shadowed side of the same moulding */

	/* joinery */
	--kerf:   rgb(0 0 0 / 0.85);       /* the saw cut — the dark gap beside every fillet */
	--polish: rgb(255 245 220 / 0.07); /* sheen wash; never higher alpha than this */
}
```

### Contrast — measured (WCAG 2.1, computed)

| Ink | on Paragone `#12100C` | on Lapis `#26428B` | on Verde `#1F5C45` | on Rosso `#71291D` | on Giallo `#C89B3C` |
|---|---|---|---|---|---|
| Alabaster `#F2EBDA` | **16.0** ✓ | **7.9** ✓ | **6.6** ✓ | **8.7** ✓ | 2.2 ✗ |
| Gilt bright `#E6CC82` | **12.1** ✓ | **6.0** ✓ | **5.0** ✓ | **6.5** ✓ | 1.6 ✗ |
| Gilt `#C9A34A` | **8.0** ✓ | 3.9 — large only | 3.3 — large only | 4.3 — large only | ✗ |
| Paragone `#12100C` | — | 2.0 ✗ | 2.4 ✗ | 1.8 ✗ | **7.4** ✓ |

So: Alabaster carries prose. Gilt and gilt-bright carry inscriptions and labels on the
black ground. On lapis/verde/rosso panels, only alabaster or gilt-bright, and only at
label sizes. On giallo, dark paragone type (an engraved look). Plain gilt on colored
stone is display-size only.

**The texture caveat.** These numbers assume solid grounds; the actual grounds are
image tiles. The rule is structural: **type sits only on paragone-ground tiles**
(`marb109`/`marb019` — near-solid, low variance) **or on solid `--basanite` plaques.**
Never on veined, figured or mid-value stone. Text on the tiled ground additionally takes
`text-shadow: 0 1px 2px rgb(0 0 0 / 0.8)` — not as a glow, as the shadow in an engraved
cut. Check contrast against the lightest fleck of the tile, not its average.

---

## 4. Joinery: seams, fillets, mouldings

The craft signature. Every boundary between two stones is a **seam**, and every seam is
built from the same three layers, always in this order:

1. **Kerf** — the dark saw cut: a 1px line of `--kerf` on the outside.
2. **Fillet** — the brass wire laid into the joint: `1px solid var(--gilt-deep)` up to
   `2px` for major frames. Straight, uniform, unbroken. (Here — unlike every other
   direction in this repo — `border: 1px solid` is not just allowed, it is the medium.)
3. **Arris light** — the polished edge catching light: a 1px inner highlight,
   `inset 0 1px 0 rgb(255 245 220 / 0.10)`.

```css
.inlay {
	border: 1px solid var(--gilt-deep);
	box-shadow:
		0 0 0 1px var(--kerf),                      /* kerf outside the fillet */
		inset 0 0 0 1px var(--kerf),                /* kerf inside */
		inset 0 1px 0 1px rgb(255 245 220 / 0.10),  /* arris catch-light */
		inset 0 0 44px rgb(0 0 0 / 0.35);           /* depth of polish toward the edges */
}
```

Major frames (the cartouche, the outer border) upgrade the fillet to a two-tone
moulding: `--gilt-bright` on the top/left edges, `--gilt-deep` on the bottom/right —
a lit bead of metal, drawn with `border-color` per side, never with `outline`.

**Border bands.** The slab's perimeter is a nested sequence of full-width bands, each a
stone panel with seams: outer **giallo moulding** → **lapis frieze** (the reference
table's lapis border, with small paired reserves let into it) → **kerf + fillet** →
the paragone field. Bands run the full perimeter and meet at mitred corners — at
minimum, a corner square of a contrasting stone (`marb093` or a rosso) set where the
bands cross, as inlaid tables actually resolve their corners.

**Shadows.** Only two are permitted: the inset polish-depth shadow above, and one soft
page-level vignette darkening the slab's extreme edges
(`inset 0 0 180px rgb(0 0 0 / 0.55)` on the outermost wrapper). No drop shadows —
nothing floats above a tabletop.

**Radii.** `border-radius` is either `0`, a true ellipse (`50%` — the cartouche and
oval reserves), or a full pill (lozenge reserves). Nothing in between: an 8px rounded
corner is a web card, and web cards are banned. Ellipse panels draw their seam with
layered `box-shadow` rings (borders follow the curve) — kerf, fillet, arris, same three
layers.

---

## 5. Ornament: the inlay trick

Volutes, husk garlands, petals, birds — the reference's decorative vocabulary — are
**SVG paths filled with the stone tiles** via `<pattern>`. This is pietra dura in the
browser: a leaf-shaped piece *cut from* verde antico, not a green leaf.

```html
<svg class="marble-defs" width="0" height="0" aria-hidden="true" focusable="false">
	<defs>
		<pattern id="marble-p-verde" patternUnits="userSpaceOnUse" width="320" height="256">
			<image href="https://raw.githubusercontent.com/malls/forrest/master/public/images/marble/marb034.jpg"
				width="320" height="256"/>
		</pattern>
		<!-- one pattern per cast stone: marble-p-lapis, marble-p-rosso, marble-p-giallo, … -->
	</defs>
</svg>
```

```css
#site-marble .ornament-leaf { fill: url(#marble-p-verde); stroke: var(--gilt-deep); stroke-width: 1; }
```

Rules:

- Every ornament piece takes the gilt hairline stroke — it is a separate stone, and
  separate stones have seams. No stroke, no inlay illusion.
- Ornament is **flat**. No gradients inside pieces, no drop shadows, no 3D modelling.
  Depth in pietra dura comes from the figure of the stone, and the tile provides it.
- Ornament obeys the symmetry law: garlands and volutes come in mirrored pairs
  (`transform: scale(-1, 1)` about the axis); a single motif sits on the axis itself.
- Keep the vocabulary of the reference: volutes, acanthus scrolls, husk garlands,
  laurel, blossoms, and at most one pair of birds. No modern iconography — no icon-font
  glyphs, no emoji, no logos rendered as ornament.
- **All SVG ids are prefixed `marble-`** (`marble-p-verde`, `marble-cartouche-clip`).
  Every site shares one document in the built page; `fill: url(#p-verde)` resolves
  document-wide and an unprefixed id will silently bind elsewhere.

Where ornament is decorative it takes `aria-hidden="true"`; the page must read
completely with every SVG removed.

---

## 6. Type

Two faces, imported at the top of `style.css` (head `<link>`s don't survive the build;
the `;` between weights is percent-encoded because build.js splits statements on raw `;`):

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400%3B700&family=Cormorant+Garamond:ital,wght@0,500%3B0,600%3B1,500&display=swap');

:root {
	--font-inscription: 'Cinzel', 'Trajan Pro', Georgia, serif;
	--font-prose:       'Cormorant Garamond', Georgia, 'Times New Roman', serif;
}
```

- **Inscriptions** (Cinzel) — the engraved voice. ALL CAPS always (Cinzel has no
  lowercase worth using), tracking `0.18em`–`0.30em` (wider as the text gets smaller),
  weight 400 for labels, 700 only for the name in the cartouche. Color `--gilt` or
  `--gilt-bright`; alabaster for the largest inscription only. Centered, always.
- **Prose** (Cormorant Garamond) — weight 500, size ≥ 1.05rem (Cormorant runs small —
  never below 17px computed), leading 1.65, measure ≤ `58ch`, color `--alabaster`,
  sentence case. Italic is permitted for one phrase of emphasis; bold is not.
- **Labels/micro** — Cinzel 400 at 10–12px, tracking `0.3em`, `--gilt`. Catalog-plate
  style: interpunct separators (`·`) welcome. Anything a reader actually needs stays
  ≥ 11px at full contrast.
- No sans-serif anywhere. No lowercase display. No letterspacing on prose. No text
  glow — the only text-shadow is the 1px engraved cut (§3).

Scale — steps, not fluid sprawl; the composition is fixed-ratio (§7):

```css
--t-label: clamp(0.66rem, 0.6rem + 0.15vw, 0.8rem);
--t-body:  clamp(1.06rem, 1rem + 0.2vw,   1.25rem);
--t-md:    clamp(1.3rem,  1.1rem + 0.5vw,  1.9rem);
--t-lg:    clamp(2rem,    1.4rem + 1.4vw,  3.4rem);
--t-xl:    clamp(2.8rem,  1.6rem + 2.6vw,  5.4rem);   /* the cartouche name */
```

---

## 7. Layout: the slab at full width

This site targets the **widest viewport buckets** — it is designed at 2200–3440px and
mapped in `sites.config.json` to the top of the range. The layout is a tabletop, and a
tabletop has no scroll: **at target widths the entire composition fits the viewport.**
The built shell already pins the page to `100%`/`overflow: hidden`; marble simply obeys
— design to the frame. (Below ~1400px, if the site is ever mapped there, the bands
stack vertically and the site owns its own scroll container per the root contract.)

Composition, outside in — all of it mirror-symmetric about the vertical center line:

```
1  giallo moulding      full-perimeter outer band (~24px), mitred corners
2  lapis frieze         full-perimeter band (~64px) with paired oval reserves
                        let into it; corner squares where bands cross
3  kerf + gilt fillet   the frame seam
4  paragone field       the slab: marb109 tiled, vignette at the edges
5  the cartouche        one ellipse on the axis, showpiece agate ground,
                        double gilt moulding — the hero
6  flanking panels      mirrored pairs left/right of the cartouche:
                        garland ornament, link reserves, the prose plaque
```

- **Wings absorb the width.** Extra viewport width goes into the ornament wings and
  into *more* border reserves — the cartouche and plaques hold a fixed maximum width
  on the axis. At 3440px the table is grander, not stretched: garlands extend, the
  frieze gains reserves, panel counts go up in mirrored pairs.
- **The grid is the joint map.** Lay panel arrays out on a symmetric CSS grid whose
  gaps *are* the seams: `gap: 2px; background: var(--gilt-deep)` on the grid container
  with each cell a stone panel is the cheapest honest joinery.
- **Density with order.** The reference tables are full — border, frieze, garlands,
  sprays — but every element is enclosed by its own seam and placed by the symmetry.
  Empty paragone is also correct: the slab showing between inlays is the composition
  breathing. When in doubt, more black ground, fewer stones.
- **Nothing crosses a seam.** Text, ornament and reserves sit *inside* their panel with
  clearance (≥ 1.5rem for text panels). An element overlapping a fillet reads as a
  cracked table.

---

## 8. Motion: stone is still

The page is a five-hundred-pound polished slab. It does not animate; light moves over it.

- **The sheen.** One page-wide specular pass — a soft diagonal band of `--polish`
  (`mix-blend-mode: screen` — the site root sets `isolation: isolate` so the blend
  can't reach other sites in the combined page) sweeping the slab on
  `transform: translateX` over ~45s, `ease-in-out`, `infinite alternate`. It is barely
  perceptible; if a viewer can point at it, halve its opacity. This is the only
  ambient animation on the page.
- **Hover is polish, not motion.** Interactive reserves (links) respond by brightening
  their fillet `--gilt-deep → --gilt-bright` and lifting the stone with a
  `--polish`-tinted overlay fading in over 280ms `ease-out`. No transform, no scale,
  no translation — stones do not move.
- **Focus** is a second gilt ring: `outline: 1px solid var(--gilt-bright);
  outline-offset: 3px` — a double fillet, clearly visible on the black ground.
- No parallax, no scroll effects, no entrance animations, no typewriter, no cursor
  effects, no tilt. Nothing loops visibly.

```css
@media (prefers-reduced-motion: reduce) {
	#site-marble .sheen { animation: none; opacity: 0; }
}
```

Reduced motion simply removes the sheen; the page is already still.

---

## 9. What this is not

| Not this | Because |
|---|---|
| Luxury-brand web minimalism | Thin sans-serif, acres of white, one marble hero JPEG. This page is dense, dark, ornamented, and built *of* stone, not decorated with a photo of it. |
| Vaporwave classicism | Roman busts, pink-teal gradients, irony. The direction is sincere and museum-grade; the 90s tiles are material, not a joke. |
| Skeuomorphic 3D | Bevel-and-emboss buttons, chiseled gradients, engraved-metal Photoshop styles. Depth here is one inset shadow and a vignette — the inlay is flat by craft. |
| Marble-print fashion graphics | Full-bleed marbling with bold sans overlay (the gym-brand look). Stone is cut into panels with seams, never used as a poster wash. |
| A dark-mode portfolio | Grey `#1a1a1a` cards, 8px radii, blue links. Web-default anything is the enemy: if a component would look at home in a dashboard, it has no seam and no stone. |
| Casino / baroque kitsch | Gold everywhere. Gilt is the *line between* stones — fillets, labels, one moulding — never a fill for large areas. If gold covers more than ~5% of the page, it's a slot machine. |

Also out: photographs, gradients as color (only the sheen and vignette exist), soft
shadows, rounded rectangles, sans-serif type, neon tiles (§2), animation of anything
but light, and asymmetry of any kind.

---

## 10. Page application

`marble/index.html` renders this brief to the sub-site authoring contract in the root
`CLAUDE.md` (self-contained folder, wrapper `#site-marble`, JS as a
`SITES['marble']` registry function; regenerate with the `brand-page` skill).

**Structure**, outside in:

- **Border bands.** Giallo moulding (`marb022`), lapis frieze (`marb110`, book-matched)
  with four oval reserves (`marb093` in gilt fillets) let into it at the quarter
  points, `marb144` corner squares. Full perimeter, mitred.
- **Field.** `marb109` tiled at native size, edge vignette, the sheen layer above it.
- **Cartouche.** The hero: one ellipse on the axis, `marb044` amber-agate ground,
  double gilt moulding, kerf rings. Inside: FORREST ALMASI in Cinzel 700 caps at
  `--t-xl`, gilt-bright, engraved shadow; SOFTWARE · DEVELOPER beneath at `--t-label`,
  tracking `0.3em`, on a `--basanite` plaque band so it clears the agate figure.
- **Garland wings.** Mirrored SVG husk-garland-and-volute pairs (verde `marb034`
  leaves, rosso `marb133` blossoms, giallo `marb113` husks) flanking the cartouche,
  pattern-filled per §5, `aria-hidden`.
- **Prose plaque.** Below the cartouche on the axis: a rectangular `--basanite` plaque
  in a gilt fillet holding *What's up?* and the one-line blurb in Cormorant at
  `--t-body`, alabaster.
- **Link reserves.** Three lozenge (pill) reserves in a centered row beneath the
  plaque — GitHub `@malls` on verde `marb107`, Twitter `@forrestalmasi` on lapis
  `marb115`, Email `_@forrestalmasi.com` on rosso `marb129` — Cinzel caps labels in
  alabaster at `--t-label`, full joinery per §4, hover per §8. The odd count keeps one
  on the axis; the outer two mirror.
- **Maker's mark.** Bottom center of the frieze, label-size Cinzel in gilt:
  `FORRESTALMASI.COM · MMXXVI` — the catalog line, readable at full contrast.

**Build-contract specifics that bite hardest here:**

- The `@import` sits at the very top of `style.css` with `%3B` for every `;` in its
  URL (§6). Tile URLs in `url()` contain no `;` and need no encoding.
- Every SVG id and `@keyframes` name is prefixed `marble-` (`marble-p-verde`,
  `marble-sheen`). Pattern fills resolve document-wide in the built page.
- `body { isolation: isolate }` in `marble/style.css` (the build rewrites it onto
  `#site-marble`) so the sheen's `mix-blend-mode` cannot light up sibling sites.
- No commas inside functional pseudo-classes — write `#site-marble a:hover` and
  `#site-marble a:focus-visible` as separate selectors.
- No `position: fixed`; the composition is absolutely positioned within the wrapper.
- JS is minimal to nil. If used at all (e.g. pausing the sheen when hidden), it is the
  registry function querying only via `root.querySelector` — no `window`/`document`
  listeners, no writes to `root.style`.

**The test.** Screenshot at 2560×1440 and check, in order: (1) mirror the image about
its vertical axis — the layout must match itself, ornament for ornament; (2) every
visible boundary shows kerf + fillet + arris, and there is not one soft or unseamed
edge on the page; (3) every `background-image` and `<image href>` resolves — no gap
numbers, no banned tiles; (4) type sits only on paragone ground or basanite plaques,
16:1-class contrast, engraved shadow; (5) the page reads as one black slab bordered in
lapis and gold — if it reads as a colorful grid of textures, recast toward black; and
(6) nothing moves except a sheen you have to wait for.
