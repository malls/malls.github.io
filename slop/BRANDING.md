# Slop

> Design direction: **AI slop** — the house style of the machine-generated hype flier,
> c. 2023 onward. Reference artifact: a "TEEN TAKE OVER" park-party flier — purple night,
> gold numerals, five competing display faces, a crowd that has no faces, and the phrase
> "4:30 UNTIL 8:00" rendered with total conviction. Reproduced here by hand, in CSS, with
> a care the original never received.

## 1. The direction

Somewhere in the training data there are ten million party fliers, and the model has
averaged all of them. The result is not a flier — it is the *idea* of a flier: every
promotional move ever made, deployed simultaneously, with no understanding of why any of
them existed. Gold numerals because dates are important. A crown because crowns appear on
fliers. Spray paint because the word "street" was in the prompt. Text that scans perfectly
at arm's length and falls apart the moment you read it.

This direction reproduces that artifact **by hand**. Not a screenshot, not an image map —
a lovingly built CSS reconstruction, where every beveled numeral and every garbled phrase
is deliberate. The comedy is in the fidelity. A sloppy imitation of slop is just a bad
page; a precise one is a document of how the machine sees us.

Three things to hold onto, because getting them wrong produces something that is merely
ugly rather than something that is *slop*:

1. **Every word is styled differently.** This is the law, not a tendency. Adjacent words
   change font, size, color, rotation and treatment. The model does not know that a flier
   has a hierarchy; it knows that every word it has ever seen on a flier was emphasized.
   Two consecutive words in the same style is a human error, which is the wrong kind of
   error. §3 gives the mechanics.
2. **Gold is a gradient.** Always. The shiny beveled gold of AI numerals is a vertical
   ramp — glint, gold, bronze, glint again, shadow — clipped into the glyphs. A flat gold
   fill reads as mustard and breaks the whole spell. There is no flat gold anywhere in
   this vocabulary, including the clip-art. §4.1 is the recipe.
3. **The wrongness is deliberate and specific.** Slop's errors are a model's confident
   errors, never a human's careless ones. "ALL AGES 21+" is in vocabulary; a keyboard typo
   is not. Every garble is chosen from the lexicon in §6 and rendered with full
   typographic commitment — the model never hedges, so neither does this page.

**Voice.** The flier shouts, so the prose around it does not. Copy that is *content*
(links, contact, the name) is set straight and spelled correctly. Copy that is *decor*
follows §6. The brief's own voice — and the voice of anything explanatory on the page —
is deadpan. Slop is never acknowledged as a joke anywhere on the page. It plays it
completely straight, the way the model did.

---

## 2. Palette

Purple, black and gold. Swatches are named for what they are doing in the reference
artifact. Use the names in code and in conversation.

### Grounds

The night. Every composition is dark; there is no light mode of slop.

| Token | Name | Hex | Role |
|---|---|---|---|
| `--void` | Vignette Black | `#0B0614` | The darkened corners. Purple-black, never `#000`. Deepest ground and the dark layer of every hard shadow. |
| `--grape` | Latent Grape | `#2B0A4E` | The mid ground. Where the purple settles between glows. |
| `--purple` | Hype Purple | `#5B1FA8` | The saturated heart. Washes, plates, radial glows behind headlines. |
| `--violet` | Diffusion Violet | `#8A3BFF` | The bloom color. Glows, spray halos, one shadow layer in a stack. Never a text color. |

### The gold ramp

Gold exists only as these four stops in a gradient (§4.1). None of them ever appears as
a flat fill on type or display — not once, not small, not "just this one badge".

| Token | Name | Hex | Position in the ramp |
|---|---|---|---|
| `--gold-1` | Glint | `#FFF6C8` | The highlight, top and the false reflection line. |
| `--gold-2` | Trophy Gold | `#FFD34D` | The body of the metal. |
| `--gold-3` | Bronze Bevel | `#B8791A` | The turn of the bevel. |
| `--gold-4` | Bevel Shadow | `#6E4A0A` | The underside; also the extrusion color. |

### Stroke and accents

| Token | Name | Hex | Role |
|---|---|---|---|
| `--white` | Sticker White | `#FFFFFF` | The outline around everything. The contrast mechanism (see below). |
| `--pink` | Wrong Pink | `#FF2FB3` | One out-of-place word per screen. Decorative and large only. |
| `--cyan` | Notification Cyan | `#00E5FF` | The color of a UI element the model hallucinated onto a flier. Glows and at most one small label. |

```css
:root {
	--void:   #0B0614;
	--grape:  #2B0A4E;
	--purple: #5B1FA8;
	--violet: #8A3BFF;

	--gold-1: #FFF6C8;
	--gold-2: #FFD34D;
	--gold-3: #B8791A;
	--gold-4: #6E4A0A;

	--white:  #FFFFFF;
	--pink:   #FF2FB3;
	--cyan:   #00E5FF;
}
```

> **Build note.** These land under `#site-slop` after the root build (`:root` is rewritten
> to the site wrapper), so the tokens are scoped to this site and cannot collide with
> another direction's `--gold`. Unprefixed names are fine.

### Contrast — the one hard rule

**Anything a visitor must read is Sticker White or the gold ramp, on a dark ground, and
the white stroke IS the contrast mechanism.** Slop text does not rely on its fill against
its ground — it travels inside a thick white outline and a hard dark shadow, which hold
it legible over *anything*: raster crowd, splatter, gradient wash. That is authentic (the
model outlines everything for the same reason) and it is what keeps this page readable.

Measured against the grounds (WCAG 2.1, computed):

| Color | vs Vignette Black `#0B0614` | vs Latent Grape `#2B0A4E` | vs Hype Purple `#5B1FA8` |
|---|---|---|---|
| Sticker White `#FFFFFF` | **20.0** ✓ | **16.7** ✓ | **9.5** ✓ |
| Glint `#FFF6C8` | **18.3** ✓ | **15.3** ✓ | **8.7** ✓ |
| Trophy Gold `#FFD34D` | **14.0** ✓ | **11.7** ✓ | **6.7** ✓ |
| Notification Cyan `#00E5FF` | **13.0** ✓ | **10.9** ✓ | **6.2** ✓ |
| Wrong Pink `#FF2FB3` | **6.0** ✓ | **5.0** ✓ | 2.9 — large only |
| Diffusion Violet `#8A3BFF` | 4.0 — large only | 3.3 ✗ | 1.9 ✗ |
| Bronze Bevel `#B8791A` | 5.5 ✓* | 4.6 ✓* | 2.6 ✗ |

\* Bronze passes numerically but never carries text alone — it exists inside the ramp.

So: white and the top of the gold ramp carry everything. Pink is a display-size accent.
Violet is a light, not a letterform. And because most text sits over busy layers where no
single ratio can be measured, the structural rule stands in for the number: **body-size
text gets the white stroke or a solid plate; no bare thin type over raster or splatter,
ever.** Where legibility is sacred (§6, the links), both mechanisms apply at once.

---

## 3. Type

Six faces. This is more webfonts than any reasonable page loads, which is the point — the
model believes fonts are free and so, thanks to Google, does this page. One `@import` at
the very top of `style.css` (a head `<link>` does not survive the build):

```css
/* The ";" in the Rubik weight list is percent-encoded on purpose — build.js splits
   top-level statements on a raw ";" without string awareness and would cut this rule
   in half. */
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Bungee+Shade&family=Luckiest+Guy&family=Permanent+Marker&family=Rubik+Wet+Paint&family=Rubik:wght@700%3B900&display=swap');
```

Each face has one job. The model would not respect these assignments; the reproduction
must, or the page turns to mush instead of slop:

| Font | Token | Role |
|---|---|---|
| Bangers | `--font-shout` | The shout. Condensed comic caps — headline words, the sticker treatment's best carrier. |
| Luckiest Guy | `--font-bubble` | The bubble. Fat rounded caps — gold-gradient numerals and money words. The bevel needs this weight. |
| Bungee Shade | `--font-block` | The one with the 3D built in. Dates, "FREE", any word the model decided was load-bearing. Never stack extra shadows on it — it brought its own. |
| Permanent Marker | `--font-marker` | The handwritten aside. Times, "PULL UP", most of the garble. The flier's attempt at a human touch. |
| Rubik Wet Paint | `--font-spray` | The "graffiti". A font named after paint, which is exactly as street as the model gets. Loud; one or two words per screen, maximum. |
| Rubik 700/900 | `--font-fine` | The fine print. The flier's bureaucratic voice — disclaimers, the phone number, anything that pretends to be information. |

```css
:root {
	--font-shout:  'Bangers', 'Arial Narrow', Impact, sans-serif;
	--font-bubble: 'Luckiest Guy', 'Arial Black', sans-serif;
	--font-block:  'Bungee Shade', 'Arial Black', sans-serif;
	--font-marker: 'Permanent Marker', 'Comic Sans MS', cursive;
	--font-spray:  'Rubik Wet Paint', 'Comic Sans MS', cursive;
	--font-fine:   'Rubik', 'Helvetica Neue', Arial, sans-serif;
}
```

### The every-word law

Stated as mechanics so it can be checked, not vibed:

- **Font**: no two horizontally or vertically adjacent words share a face. Rotate through
  the six; `--font-fine` counts only in the fine print, where the law is suspended.
- **Size**: adjacent words differ by at least 15%. A headline row of equal-size words is
  a human decision; delete one of them or grow one of them.
- **Rotation**: every display row carries one of the tilt tokens (§8); adjacent rows
  alternate sign, and no two adjacent rows share a magnitude.
- **Treatment**: no treatment (§4) appears on two adjacent words. Sticker next to gold
  next to spray next to stack.
- **Case**: everything display is ALL CAPS except the marker face, which is whatever the
  marker face feels like.

The law's boundary: it applies to display copy and garble. It does **not** apply to the
links block and contact line (§6, legibility is sacred there) or to fine print, which is
uniform precisely so it reads as a different, duller machine wrote it.

### Scale

The flier scales as a unit — one column, sized like a printed object. Type is therefore
sized in container-query units against the flier canvas, not the viewport:

```css
.slop-flier {
	container-type: inline-size;
}
```

```css
--t-shout: 16cqi;               /* the biggest word on the page — one per page */
--t-big:   11cqi;               /* headline row words */
--t-mid:   7cqi;                /* dates, times, secondary shouts */
--t-small: 4.4cqi;              /* garble lines, labels */
--t-fine:  max(2.9cqi, 11px);   /* fine print — floored, because even slop is read */
```

At any canvas width the proportions hold, which is the flier behaving like a flier: you
do not reflow a poster, you hold it closer.

---

## 4. Text treatments

The named moves. Each is a utility class; a display word carries exactly one.

### 4.1 Gold numerals — `.slop-txt-gold`

The signature. A vertical five-stop ramp clipped into the glyphs: glint, gold, bronze
turn, a false reflection line, shadow. The extrusion and glow come from **chained
`drop-shadow()` filters**, not `text-shadow` — see the gotcha below.

```css
.slop-txt-gold {
	font-family: var(--font-bubble);
	background-image: linear-gradient(
		180deg,
		var(--gold-1) 0%,
		var(--gold-2) 36%,
		var(--gold-3) 50%,
		var(--gold-1) 58%,
		var(--gold-2) 76%,
		var(--gold-4) 100%
	);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	-webkit-text-stroke: 0.02em rgb(110 74 10 / 0.9);
	filter:
		drop-shadow(0.03em 0.03em 0 var(--gold-4))
		drop-shadow(0.03em 0.04em 0 var(--void))
		drop-shadow(0 0 0.35em rgb(255 211 77 / 0.5));
}
```

> **Gotcha: `text-shadow` paints on top of a background-clipped fill.** Paint order for a
> text node is background (which is where the clipped gradient lives), then text-shadow,
> then the — here transparent — fill. So a hard `text-shadow` extrusion renders *over*
> the gold and the numeral becomes a dark silhouette. `drop-shadow()` filters run after
> the element is rendered and land behind it; chaining them compounds each shadow onto
> the last, which is exactly what a beveled extrusion wants. This was caught by a 6.

> **Gotcha: the ramp spans the element's box, not each glyph run.** A two-line block with
> one gradient gives the top line all glint and the bottom line all shadow. Apply
> `.slop-txt-gold` per word — which the every-word law requires anyway.

**The superscript rule — `.slop-th`.** At least one prominent numeral wears an ordinal it
did not ask for. Agreement is optional and mild disagreement is preferred: `15ND` and
`3TH` are in vocabulary; so is a `TH` on a year. The span sits inside the gold span and
inherits the ramp.

```css
.slop-th {
	display: inline-block;
	font-size: 0.38em;
	vertical-align: 0.9em;
	margin-left: 0.05em;
	transform: rotate(9deg);
}
```

### 4.2 Sticker — `.slop-txt-sticker`

Solid fill inside a fat white outline with one hard dark shadow. The workhorse, and the
treatment that carries anything important (§2's hard rule made flesh).

```css
.slop-txt-sticker {
	font-family: var(--font-shout);
	color: var(--purple);
	paint-order: stroke fill;
	-webkit-text-stroke: 0.14em var(--white);
	text-shadow: 0.06em 0.08em 0 var(--void);
}
```

`paint-order: stroke fill` pushes the stroke behind the glyph so it fattens outward
instead of eating the letterform. Every current engine honors it on HTML text; if a
legacy engine ignores it, the stroke is centered and 0.14em would hollow the glyphs —
where that matters (the links block), thin the stroke to 0.05em rather than dropping it.

### 4.3 Stacked shadows — `.slop-txt-stack`

Two to four **opaque, unblurred** shadow layers marching down one diagonal. Never a
blurred grey drop shadow — soft grey is a human designer's move and instantly breaks the
artifact.

```css
.slop-txt-stack {
	font-family: var(--font-bubble);
	color: var(--white);
	text-shadow:
		0.045em 0.045em 0 var(--pink),
		0.09em  0.09em  0 var(--void),
		0.135em 0.135em 0 var(--violet),
		0.18em  0.18em  0 var(--void);
}
```

All layers share one angle. Alternating dark/color layers reads as printed misregistration,
which is precisely the kind of depth the model thinks text has.

### 4.4 Spray glow — `.slop-txt-spray`

Neon glow on the "graffiti" face — glow deployed where it makes the least sense, which is
the correct amount of sense.

```css
.slop-txt-spray {
	font-family: var(--font-spray);
	color: var(--white);
	text-shadow:
		0 0 0.08em rgb(255 255 255 / 0.9),
		0 0 0.35em var(--cyan),
		0 0 0.9em  var(--violet);
}
```

The blur here is licensed because it is a *glow*, not a shadow: centered, colored,
additive. Offset it and it becomes the grey shadow §4.3 bans.

### 4.5 Tilt and arc

Rotation is applied per row via the tilt tokens (§8) — `transform: rotate(var(--tilt-2))`
on the row, never on the flier. A genuinely arched word (the model loves an arch) is
per-letter: wrap each glyph in a `<span aria-hidden="true">` with incremental
`rotate`/`translateY`, and keep the readable word in a visually-hidden sibling so
assistive tech gets one word, not eleven letters. Budget one arch per page; it is
expensive to write and the model only ever managed one either.

### 4.6 Dissolution — `.slop-melt`

The word that gives up. The tail of one decorative word fades and smears mid-letter —
the visual of a model running out of certainty about how the word ends.

```css
.slop-melt {
	display: inline-block;
	-webkit-mask-image: linear-gradient(100deg, black 55%, rgb(0 0 0 / 0.4) 78%, transparent 96%);
	mask-image: linear-gradient(100deg, black 55%, rgb(0 0 0 / 0.4) 78%, transparent 96%);
}
```

Wrap only the tail span of the word so the first half stays committed. One per page,
decorative words only — a dissolving link is a broken link, not a joke.

---

## 5. Splatter and clip-art

Every mark is a pure SVG data URI — no image files, no network. `%3C` `%3E` `%23` are
percent-encoded so strict URL parsers accept them; do not un-encode when copying. The
ids inside the crown's gradient are `slop-`-prefixed even though a data URI is its own
document — the prefix rule (§11) is followed everywhere so nobody has to remember the
exception.

**Splatter field** — the texture layer. Irregular blots with satellite droplets, white,
tiled, held at low opacity over the purple. This is the "spray paint" the prompt asked
for, rendered with the smooth confidence of something that has never seen a wall.

```css
.slop-splatter {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cg fill='%23FFFFFF'%3E%3Cpath d='M28 34c9-14 28-9 30 4 2 12-11 19-21 14-8-4-11-11-9-18'/%3E%3Ccircle cx='64' cy='24' r='3'/%3E%3Ccircle cx='14' cy='58' r='2'/%3E%3Cellipse cx='52' cy='52' rx='6' ry='3' transform='rotate(-28 52 52)'/%3E%3Cpath d='M138 18c12-6 24 4 20 15-4 10-18 11-24 3-5-7-3-14 4-18'/%3E%3Ccircle cx='170' cy='40' r='2.5'/%3E%3Ccircle cx='122' cy='44' r='4'/%3E%3Cpath d='M196 84c8 1 12 11 6 17-7 6-17 1-16-8 1-6 5-9 10-9'/%3E%3Ccircle cx='206' cy='112' r='2'/%3E%3Cpath d='M40 118c14-8 28 4 23 17-5 12-22 12-28 2-4-8-2-15 5-19'/%3E%3Cellipse cx='80' cy='110' rx='4' ry='2' transform='rotate(20 80 110)'/%3E%3Ccircle cx='96' cy='140' r='3'/%3E%3Cpath d='M150 138c10-10 26-2 24 11-2 12-17 15-24 6-5-6-4-12 0-17'/%3E%3Ccircle cx='128' cy='170' r='2.5'/%3E%3Ccircle cx='186' cy='158' r='3.5'/%3E%3Cpath d='M64 182c8-8 21-3 21 7 0 11-13 15-20 8-5-5-5-11-1-15'/%3E%3Ccircle cx='30' cy='168' r='2'/%3E%3Ccircle cx='104' cy='202' r='4'/%3E%3Cellipse cx='160' cy='198' rx='5' ry='2.5' transform='rotate(-15 160 198)'/%3E%3C/g%3E%3C/svg%3E");
	background-size: 220px 220px;
	opacity: 0.16;
	pointer-events: none;
}
```

The marks bake in white; `opacity` on the layer does the recoloring — `0.12–0.2` over
Grape or Purple. Above `0.25` it stops being texture and starts being weather.

**Crown** — the clip-art king-maker. The one mark that carries gold, and even here the
gold is a gradient (the ramp lives inside the SVG). White sticker stroke, always rotated.

```css
.slop-crown {
	position: absolute;
	width: 96px;
	aspect-ratio: 96 / 78;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='78' viewBox='0 0 96 78'%3E%3Cdefs%3E%3ClinearGradient id='slop-crown-au' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23FFF6C8'/%3E%3Cstop offset='.45' stop-color='%23FFD34D'/%3E%3Cstop offset='.6' stop-color='%23B8791A'/%3E%3Cstop offset='.72' stop-color='%23FFF6C8'/%3E%3Cstop offset='1' stop-color='%236E4A0A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg stroke='%23FFFFFF' stroke-width='5' stroke-linejoin='round' fill='url(%23slop-crown-au)'%3E%3Cpath d='M14 62 L9 26 L31 42 L48 12 L65 42 L87 26 L82 62 Z'/%3E%3Ccircle cx='9' cy='22' r='6'/%3E%3Ccircle cx='48' cy='9' r='6'/%3E%3Ccircle cx='87' cy='22' r='6'/%3E%3C/g%3E%3C/svg%3E");
	background-size: contain;
	background-repeat: no-repeat;
	transform: rotate(-14deg);
	pointer-events: none;
}
```

**Starburst** — a four-point flare with a satellite sparkle. Goes behind a headline word
(where it slowly rotates, §9) or floats free pretending to be lens flare.

```css
.slop-star {
	position: absolute;
	width: 110px;
	aspect-ratio: 1;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Cg fill='%23FFFFFF'%3E%3Cpath d='M50 4 L59 45 L100 54 L59 63 L50 104 L41 63 L0 54 L41 45 Z'/%3E%3Cpath d='M88 6 L92 20 L106 24 L92 28 L88 42 L84 28 L70 24 L84 20 Z'/%3E%3C/g%3E%3C/svg%3E");
	background-size: contain;
	background-repeat: no-repeat;
	pointer-events: none;
}
```

**Peace sign** — because the reference has one, and the reference has one because fliers
have one. Thick white stroke, no fill, no explanation.

```css
.slop-peace {
	position: absolute;
	width: 72px;
	aspect-ratio: 1;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='9' stroke-linecap='round'%3E%3Ccircle cx='50' cy='50' r='41'/%3E%3Cpath d='M50 9 L50 91 M50 50 L21 79 M50 50 L79 79'/%3E%3C/g%3E%3C/svg%3E");
	background-size: contain;
	background-repeat: no-repeat;
	transform: rotate(11deg);
	pointer-events: none;
}
```

**Curved arrow** — the marker arrow that points emphatically at something adjacent to
what it means. Flip with `scaleX(-1)` to point the other wrong way.

```css
.slop-arrow {
	position: absolute;
	width: 120px;
	aspect-ratio: 120 / 90;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='90' viewBox='0 0 120 90'%3E%3Cpath d='M12 80 C 18 34 64 14 98 30' fill='none' stroke='%23FFFFFF' stroke-width='9' stroke-linecap='round'/%3E%3Cpolygon points='94,10 118,32 86,44' fill='%23FFFFFF'/%3E%3C/svg%3E");
	background-size: contain;
	background-repeat: no-repeat;
	transform: rotate(-8deg);
	pointer-events: none;
}
```

**Drip rule** — a repeating band of hanging drips with two detached droplets, for section
edges. The model has seen dripping letters; it delivers dripping interface. Use as a
divider, never as a fill.

```css
.slop-drip {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60' viewBox='0 0 120 60'%3E%3Cg fill='%23FFFFFF'%3E%3Cpath d='M0 0 H120 V14 C112 14 110 34 104 34 C98 34 100 14 88 14 C80 14 82 48 74 48 C66 48 70 14 56 14 C46 14 48 28 40 28 C32 28 36 14 22 14 C12 14 16 40 8 40 C2 40 4 14 0 14 Z'/%3E%3Ccircle cx='74' cy='56' r='4'/%3E%3Ccircle cx='8' cy='50' r='3'/%3E%3C/g%3E%3C/svg%3E");
	background-repeat: repeat-x;
	background-size: 120px 60px;
	height: 60px;
	pointer-events: none;
}
```

**Placement rules.** Clip-art is never upright, never aligned to anything, and never
explains itself. At least one mark is partially clipped by the canvas edge; at least one
overlaps text it has no relationship to. Four to six marks per page — fewer reads as
restraint, more reads as a sticker sheet, and both are human failure modes.

---

## 6. The garble

The almost-language. Slop text is generated one confident token at a time by something
that knows what fliers say but not what they mean. The reproduction writes its garble
deliberately, from this system.

**The governing rule: right at arm's length, wrong at reading distance.** Every garble
must scan as normal flier copy at a glance and fail only on inspection. And every garble
is rendered with full typographic commitment — treatments, gold, stickers. The model
never hedges its errors; a shy garble is a typo.

### The moves

| Move | Mechanism | In-vocabulary example |
|---|---|---|
| Register drift | Training-data slang deployed with total confidence | `BRING YO WHOLE CREW` |
| Temporal nonsense | Times and dates that cannot resolve into an event | `4:30 UNTIL 8:00` · `SATURDAY "JUNE" 15` |
| Ordinal confusion | `TH`/`ST`/`ND` attached at random (§4.1) | `JUNE 15ND` · `THE 3TH ANNUAL` |
| Phantom punctuation | Quotes that make a word sound untrue; apostrophes on plurals | `FREE "FOOD"` · `DJ'S ALL NIGHT` |
| Self-contradiction | Two adjacent facts cancel | `ALL AGES 21+` · `FREE $5 ENTRY` |
| Duplication | Doubled letters, words, conjunctions | `PARTTY` · `AT THE THE PARK` · `FOOD & AND DRINKS` |
| Numeric overflow | One digit too many, delivered smoothly | `(555) 012-344856` |
| Dissolution | A word that gives up mid-letter (`.slop-melt`, §4.6) | `SUMMERTI…` |

### The lexicon

Canonical strings, usable verbatim. Extend by the moves above, not by improvising:

`BRING YO WHOLE CREW` · `4:30 UNTIL 8:00` · `PULL UP!!` · `EVERYONE IS INVITED"` ·
`ALL AGES 21+` · `FREE FOOD & AND DRINKS` · `DJ ON THE 1'S AND 1'S` ·
`SATURDAY "JUNE" 15ND` · `AT THE THE PARK` · `MUSIC • FOOD • MUSIC` ·
`(555) 012-344856` · `NO SMOKING NO DRUGS NO VIBES`

One point of taste, stated once: the target of the joke is the model's unearned
confidence, never the vernacular it scraped. `BRING YO WHOLE CREW` is quoted from the
reference artifact as found text; do not generate more dialect than the reference
supplies. The safe moves are structural — time, number, punctuation, duplication.

### Frequency and license

- **Density**: one to two garbles per block. A page that is 100% garble is noise; the
  flier must run about 80% almost-right so each wrongness lands.
- **Licensed**: headlines, the date/time block, the details lines, fine print, decorative
  words. Garble lives where a reader has already stopped expecting information.
- **Sacred — never garbled, never melted, never arched**: the site owner's name rendered
  as identity (one garbled *decorative* echo of it is allowed elsewhere), all links,
  the email address, and anything else a visitor needs to act on. These are set
  `.slop-txt-sticker`, level within ±1.5°, spelled correctly, at `--t-small` or larger.
  The joke stops at the door of anything a visitor needs.

**Out of vocabulary** — these read as human error or a different joke entirely: keyboard
typos (`teh`), leetspeak, censored profanity, intentional innuendo, `Comic Sans` used
knowingly, lorem ipsum, and any error that requires the reader to know the *right*
version of an obscure phrase. The model's errors are statistical, not witty.

---

## 7. Raster image layers

The parts CSS cannot fake are the parts the model faked: the pseudo-photographic mush.
These arrive later as AI-generated PNGs, and they are licensed **only as decorative
background layers**. No raster ever carries text, borders a link, or becomes a foreground
subject. CSS draws the flier; rasters are the haze behind it.

### The three slots

| Slot | File | Placement | Content |
|---|---|---|---|
| Crowd | `/slop/crowd.png` | Bottom of the flier, behind the links block's plate | Backlit crowd silhouettes with slightly wrong anatomy. Hands may have the usual number of fingers, plus some. |
| Skyline | `/slop/skyline.png` | Upper third, behind the headline stack | A city melting at the horizon. Windows that don't tile, one building that becomes a tree. |
| Park sign | `/slop/sign.png` | Mid-flier accent, small, rotated | A park sign whose text almost says something. The raster's own garble — do not caption it. |

**Paths are absolute — `/slop/crowd.png`, never `./crowd.png`.** The built root page
serves from `/`, so a relative URL inside the site's CSS resolves against the root and
404s. This rule is inherited from the build and is not negotiable.

### Integration recipe

Every raster is sandwiched: a scrim above it, a gradient beneath it. The gradient
underlay is the degradation mechanism (below); the scrim and mask melt the image into
the purple so it reads as atmosphere, not photograph:

```css
.slop-crowd-layer {
	background-image:
		linear-gradient(to top, rgb(11 6 20 / 0) 0%, rgb(11 6 20 / 0.85) 75%, var(--void) 100%),
		url('/slop/crowd.png'),
		radial-gradient(ellipse at 50% 100%, #241040 0%, var(--void) 75%);
	background-size: cover, cover, cover;
	background-position: center bottom;
	-webkit-mask-image: linear-gradient(to top, black 55%, transparent 100%);
	mask-image: linear-gradient(to top, black 55%, transparent 100%);
	pointer-events: none;
}
```

Rasters stay dim (the sandwich should hold them under ~60% perceived brightness) and
slightly desaturated toward purple; a full-brightness AI image next to hand-built CSS
reads as a collage, not a flier.

### The degradation rule

**The page must still read as slop with every raster missing.** Each slot's bottom
gradient layer is a purpose-built stand-in in the same tonal range, declared in the same
`background-image` stack — a missing file simply exposes it, and the scrim/mask still
compose. No layout may depend on a raster's dimensions, no text may depend on a raster
for contrast (§2's stroke rule already guarantees this), and nothing may onerror-swap or
JS-detect images. Test by renaming the files away: the flier should lose haze, not structure.

---

## 8. Composition

Flier logic, not web logic. The page is one crammed portrait canvas — a printed object
that happens to be on a screen — and it obeys print-shop physics: everything centered-ish,
nothing aligned, no grid anywhere.

### The canvas

```css
.slop-flier {
	width: min(560px, 94vw);
	margin: 0 auto;             /* centered like a flier on a pole — the internal chaos is the point */
	container-type: inline-size;
	position: relative;
	overflow: clip;             /* rotated rows WILL exceed the box; clip at the canvas */
}
```

### The scroll container

The built shell sets `overflow: hidden` on the document and pins the site wrapper to
`height: 100%` — **the combined page does not scroll**. The flier is much taller than any
viewport, so the site owns its own scroll:

```css
/* In slop/style.css `body` maps to the wrapper after the build. */
body {
	height: 100%;
}

.slop-scroll {
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
```

Everything, including the raster layers, lives inside `.slop-scroll` and scrolls with the
flier. There is no fixed chrome — a flier does not have chrome — and `position: fixed` is
never used (it would escape the wrapper in the combined build anyway).

### Layer order

Codified, bottom to top. It does not change:

```
0  raster slots     crowd / skyline / sign (§7), each with its gradient stand-in
1  purple wash      the grape-to-void field, plus the vignette
2  splatter         .slop-splatter, one field, low opacity
3  clip-art         crowns, stars, peace, arrows (§5)
4  text stack       every word of the flier
```

There is no grain layer and no texture over the type. Slop is upscaled-smooth — the model
outputs a clean, slightly airbrushed surface, and film grain would misdate the artifact
by thirty years.

**The vignette** is mandatory. Every AI flier is vignetted, because the model learned
what fliers look like from phone photos of fliers:

```css
.slop-vignette {
	background-image: radial-gradient(ellipse at 50% 42%, transparent 0%, transparent 52%, rgb(11 6 20 / 0.85) 100%);
	pointer-events: none;
}
```

### Rotation and misalignment

```css
--tilt-1: -6deg;
--tilt-2: 3.5deg;
--tilt-3: -2deg;
--tilt-4: 5deg;
--tilt-5: -3.5deg;
```

- Every display row is rotated; adjacent rows alternate sign; no two adjacent rows share
  a magnitude. Nothing sits at exactly 0° except the fine print and the links block.
- **No two blocks share a left edge.** Each row's horizontal offset drifts a few percent
  from its neighbor's — centered-ish, aligned to nothing.
- Rotation goes on rows and marks, never on the canvas and never on the scroll container.

### Density

**Whitespace is a bug in this vocabulary.** The model fills the frame because every flier
it saw was full. Vertical gaps between display rows stay under `0.4em` of the larger row;
overlap is better than a gap — drop a row's margin negative and let the sticker strokes
collide. The only air on the page surrounds the links block, where §6's sacred-legibility
rule buys it room. If a region looks breathable, add a clip-art mark or a garble line —
in that order.

---

## 9. Motion

The GIF-era moves an AI flier implies, and nothing invented since. Three effects,
maximum, per page — each one cheap, loud and slightly pointless:

- **The pulse** — one spray/glow word breathes. Animate `opacity` on the word (the
  shadows ride along); never animate the `text-shadow` or `filter` values themselves.

  ```css
  @keyframes slop-pulse {
  	0%   { opacity: 0.72; }
  	50%  { opacity: 1; }
  	100% { opacity: 0.72; }
  }
  ```

- **The rotating starburst** — the `.slop-star` behind the headline turns once per
  minute. Slow enough to deny, fast enough to notice.

  ```css
  @keyframes slop-spin {
  	to { transform: rotate(360deg); }
  }
  /* .slop-star--hero { animation: slop-spin 60s linear infinite; } */
  ```

- **The blink** — exactly one fine-print word (`FREE` is traditional) hard-blinks,
  `steps`, no easing, in loving memory of `<blink>`.

  ```css
  @keyframes slop-blink {
  	0%, 49% { visibility: visible; }
  	50%, 100% { visibility: hidden; }
  }
  /* animation: slop-blink 1.1s steps(1) infinite; */
  ```

All keyframe names are `slop-`prefixed — the combined build shares one document and an
unprefixed `pulse` will collide with another site's. No parallax, no scroll-triggered
reveals, no hover choreography: a flier is paper, and paper only ever had three tricks.

The reduced-motion block is mandatory, and the static state must be the composed frame —
the blinking word rests *visible*:

```css
@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

---

## 10. What this is not

The failure modes are all nearby and all fatal:

| Not this | Because |
|---|---|
| Vaporwave | Vaporwave knows exactly what it is referencing — Roman busts, Windows 95, irony with a bibliography. Slop references everything at once and knows none of it. Also: pink-teal is out; the night here is purple. |
| Real graffiti / street art | Letterforms earned with a can and a ladder. Slop's "graffiti" is a Google Font named after paint, and the page never pretends otherwise. Imitating actual writers' styles is out of bounds and out of vocabulary. |
| Actual competent street-party design | A real promoter's flier has hierarchy: one headline, one date, one venue, because it has to work. Slop has five headlines and a date that cannot be parsed. Competence anywhere outside the links block is a bug. |
| Memphis (the direction next door) | Memphis is loud on purpose, built by designers with intent and an ink structure. Slop is loud by averaging. They share a hallway and nothing else. |
| Ironic web brutalism | Brutalism performs poverty — system fonts, default blue links, visible seams. Slop performs excess: six webfonts, five gradients per glyph. Opposite sins. |
| A raster image with an image map | The founding decision (human-approved): image maps do not survive responsive scaling, and a flat image cannot be regenerated from a brief. The flier is built, not embedded. |

Also out: film grain and texture overlays (§8 — slop is oversmooth), blurred grey drop
shadows (§4.3), flat gold anywhere (§2), whitespace as a design element (§8), lorem
ipsum, human-style typos (§6), muted or tasteful palettes, and any wink at the audience —
no "this page was generated by AI" caption, no robot emoji, no disclaimer. The page plays
it straight or it does not work.

---

## 11. Page application

`slop/index.html` renders this brief as one tall flier advertising the only event on the
calendar: the site owner. Top to bottom of the canvas:

- **Skyline slot** (§7) across the upper third, melting behind the headline stack, its
  gradient stand-in doing the work until the PNG lands.
- **Headline stack**, one word per row, every-word law in full force: `FORREST` in
  `.slop-txt-sticker` (Bangers, `--t-big`, `--tilt-1`); `ALMASI` in `.slop-txt-gold`
  (Luckiest Guy, `--t-shout`, `--tilt-2`) with the `.slop-star` spinning behind it and
  the `.slop-crown` cocked over the final letter; a banner row `SOFTWARE "TAKE OVER"` in
  Bungee Shade at `--t-mid`, `--tilt-3`, with `TAKE` in Wrong Pink — the one pink word.
- **Date block**: `SAT JUNE 15<sup class="slop-th">ND</sup>` gold-gradiented at
  `--t-mid`, over `4:30 UNTIL 8:00` in Permanent Marker, a `.slop-arrow` pointing from
  the time to nothing.
- **Details block**: three to four lexicon lines (§6) at `--t-small` in alternating
  faces/treatments — `BRING YO WHOLE CREW`, `FREE FOOD & AND DRINKS`,
  `DJ ON THE 1'S AND 1'S` — with the `.slop-peace` floating alongside and one word
  wearing `.slop-melt`.
- **A `.slop-drip` rule**, then the **crowd slot** rising from the bottom.
- **The links block — the sacred zone**: `PULL UP:` as a label, then GitHub `@malls`,
  Twitter `@forrestalmasi`, Email `_@forrestalmasi.com` as `.slop-txt-sticker` chips on a
  solid `--void` plate over the crowd, level within ±1.5°, spelled correctly, nothing
  garbled, `--t-small` or larger. This is the one part of the page built for the reader.
- **Fine print** in Rubik 900 at `--t-fine`, level, uniform: a garbled disclaimer, the
  overflowing phone number, and the blinking `FREE`.
- Splatter field and vignette over the whole canvas per §8's layer order.

### Build-contract constraints

Stated here in full so the page generator needs nothing outside this file:

- The single `@import` (§3) sits at the **very top** of `style.css`; every `;` inside its
  URL is percent-encoded as `%3B` — the build's statement splitter is not string-aware
  and a raw semicolon cuts the rule in half. Only `@import`/`@media`/`@supports`/
  `@keyframes`/`@font-face` at-rules are allowed.
- Every `id` in markup and inline SVG is prefixed `slop-`; every `@keyframes` name and
  any custom `font-family` name is prefixed `slop` — all sites share one document in the
  built page, and ids/filters/keyframes resolve document-wide.
- No commas inside functional pseudo-classes — write `#site-slop a:hover` and
  `#site-slop a:focus-visible` as separate selectors, never `:is(a, b)`.
- No literal `</style>` sequence in CSS, no literal `</script>` in JS.
- Never set `display` on `html`/`body`; never set the same property differently on `html`
  vs `body` (both map to the wrapper).
- The combined shell does not scroll; the site owns its scroll via `.slop-scroll` (§8).
  No `position: fixed` anywhere.
- All raster URLs are absolute (`/slop/…`), never relative (§7).
- JS, if the page ever needs any, is exactly one registry function —
  `(window.SITES = window.SITES || {})['slop'] = function (root) { … }` — querying only
  via `root`, listeners only on elements inside `root`, no `window`/`document` handlers,
  and never writing styles to `root` itself. The flier as specified needs **no JS**;
  prefer keeping it that way.

### The test

Checkable, not vibeable:

- All six fonts render; no two adjacent display words share font, size, angle or
  treatment; no display row sits at exactly 0°.
- At least one gold-gradient numeral wears a wrong ordinal; zero flat-gold fills
  anywhere (inspect computed `background-image` on every gold element).
- At least four distinct clip-art marks and the splatter field are visible; at least one
  mark is clipped by the canvas edge.
- Rename the three PNGs away: the page still reads as slop — haze gone, structure intact.
- The links block: correct spelling, white-stroke sticker treatment, ≥ 4.5:1 effective
  contrast, tilt within ±1.5°, all three links clickable at 320px.
- The flier scrolls in its own container; nothing scrolls horizontally at 320px; with
  `prefers-reduced-motion`, the blinking word rests visible.
