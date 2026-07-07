# Task: Apply the "Marathon / Graphic Realism" redesign to this website

You are updating an existing personal portfolio site (plain HTML + one shared `src/style.css`).
The final approved visual designs already exist as pixel-level mockups in the file
**`Marathon Drafts.dc.html`** (project root). Your job is to make the real site match them —
do NOT invent a new design.

## Source of truth

Open `Marathon Drafts.dc.html` and locate these blocks (search for the id attribute).
Every element inside them carries inline styles — treat those as the spec:

| Mockup id | Applies to |
|-----------|-----------------------------|
| `id="5a"` | `src/homePage.HTML` |
| `id="5b"` | `src/projects.html` |
| `id="6a"` | `src/project1.html` (drone / NeuralVector Swarm page) |

Ignore every other block in the drafts file (ids 1a–4b are rejected earlier iterations).
Newest content is at the top of the file.

## Design language (extract into `src/style.css` as reusable classes/variables)

Palette (CSS custom properties recommended):
- `--ink: #17191c` (near-black text / dark panels)
- `--paper: #eff0ec` (page background), band background `#e6e8e1`
- `--blue: #24c8ff` — PRIMARY accent (nav active pill, tags, HUD brackets, skill bar)
- `--green: #c6f211` — secondary accent (alternating tags, toolkit label, ring segment)
- `--orange: #ff5500` — status/alert accent only (status dots, step 05, REC)
- Muted text: `#5a5f65`, mono-muted `#9ba098`, hairlines `#d6d8d0`
- Darker text variants used on light: blue `#0f9ecf`, green `#7a9a00`, orange `#d94100`

Typography:
- Display/body: **Archivo** (weights 400–900); mono labels: **IBM Plex Mono** (400–600)
- Add to every page `<head>`:
  `https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap`
- Mono label pattern: 9.5–11px, `letter-spacing: 1.5–3px`, uppercase, often `//` separators.

Depth (IMPORTANT — panels/buttons have NO borders; they float on shadows):
- Light panel shadow: `box-shadow: -5px -5px 12px rgba(255,255,255,.85), 5px 5px 12px rgba(0,0,0,.16);`
- Large/dark panel shadow: `-6px -6px 14px rgba(255,255,255,.85), 7px 7px 16px rgba(0,0,0,.32);`
- Keep the existing rounded corners (16–24px radii).

Recurring graphic textures (pure CSS, no images):
- Barcode: `background: repeating-linear-gradient(90deg, #17191c 0 2px, transparent 2px 5px, #17191c 5px 8px, transparent 8px 12px, #17191c 12px 13px, transparent 13px 17px);`
- Dashed telemetry line: `repeating-linear-gradient(90deg, #17191c 0 2px, transparent 2px 5px, #17191c 5px 7px, transparent 7px 11px);`
- Halftone dot field: `background-image: radial-gradient(#c3c6bc 1.6px, transparent 1.6px); background-size: 12px 12px;`
- Footer texture band: 14px tall, `repeating-linear-gradient(90deg, #17191c 0 14px, #eff0ec 14px 28px);`
- Vertical edge ruler: 26px wide strip, `repeating-linear-gradient(180deg, #b9bcb2 0 1px, transparent 1px 18px)` + right hairline, with a rotated mono coordinate tag.
- Giant outline numerals: huge Archivo 900 text, `color: transparent; -webkit-text-stroke: 1.5px #d6d8d0;` placed absolutely in dead space (decorative, `pointer-events: none`).
- HUD corner brackets on images: four absolutely-positioned corner `<span>`s with 2px blue/green borders and one rounded corner.

## Hard constraints

1. **Do not change page structure or content.** Keep every existing section, heading, link,
   image slot, and the existing layout geometry (circle headshot, side buttons + 720px slider
   on home; stage hero + cards on projects; the drone page's section order). This is a reskin
   plus decorative layer, not a rebuild.
2. Keep dark-mode toggle, breadcrumb.js, and all existing JS working. If dark mode is
   non-trivial to restyle, keep it functional with sensible dark equivalents (ink background
   `#17191c`, paper text) and note what you did.
3. All existing images stay as-is (`src/pictures/…`). Do not hotlink external images.
4. Colors must be used with the fixed roles above — blue primary, green secondary,
   orange status only. Never introduce other hues.
5. Buttons/panels: shadows only, no black outlines.
6. Work on the real files in `src/`. Shared styling goes in `src/style.css`;
   only add small page-specific markup (badges, bands, brackets, mono labels) in the HTML.

## Per-page checklist

### homePage.HTML (match 5a)
- Header: `AG—28` ink pill logo-tag, active nav item as blue pill, keep toggle.
- Barcode band under header with `PERSONAL PORTFOLIO SYSTEM — V.3.0` + `STATUS: OPEN TO WORK` (orange dot).
- Hero: orbit ring around circle headshot (thin gray ring + blue conic segment + green segment + orange node), `RUNNER // AG-28` pill under the photo, info card with striped top edge and cyan mono field labels (LOC/UNI/DEG/NET), green underline on email.
- Giant outline `28` + halftone field + `+` crosshair marks in hero dead space; rotated `ALT/VEL`-style side tag.
- Name: keep original scale, orange period after "Gates".
- Skill chips row (mono, pill outline) under intro paragraph.
- Toolkit panel: dark ink card, green `TECHNICAL TOOLKIT` label, skill bars (HTML green 80%, CSS blue 75%, JS orange 60%, `LV.x` mono tags), green barcode footer.
- Acid→blue color-field band (`▸ SELECTED WORK // 03 FEATURED BUILDS`) above the slider section — blue background, ink text, triple play-arrows.
- Side buttons: white rounded, shadow only, colored number discs (01 blue, 02 green, 03 orange).
- Slider: dark frame, HUD corner brackets (blue), top center `PROJECT // 001` pill, gradient caption bar with progress dashes + `01/03` counter.
- Footer texture band at page bottom.

### projects.html (match 5b)
- Same header + barcode band (`PROJECT INDEX — 06 BUILDS // 2024–2026`, `SORT: CHRONO ▾`).
- Stage hero: split panel — left blue field with giant outline `06` + `Projects` title; right ink field with dot texture, three status dots (green/blue/orange), description, blue pill GitHub button, `FILTER: ALL ▾` ghost pill.
- Project cards: 2-column grid, uniform height (~160px), image LEFT (fixed ~240px column), text right: colored mono tag pill (rotate blue/green/orange), title, `VIEW BUILD` + arrow footer row. Shadow only, no borders.
- Footer texture band.

### project1.html (match 6a)
- Header + breadcrumb band (mono `HOME ▸ PROJECTS ▸ NEURALVECTOR SWARM`, barcode, `FILE // 001`).
- Vertical edge ruler + rotated `UAV // FILE 001` tag on left edge.
- Title hero: giant outline `01`, `PROJECT // 001` blue tag + orange `STATUS: COMPLETE`, cyan mono subtitle, dashed `◂◂ TELEMETRY LINK ACTIVE ▸▸` divider.
- Cover image: HUD corner brackets, `FIG. 01` pill, faint blue scanlines, center reticle, bottom camera-readout bar (`CAM 01 — LIVE`, exposure/coords, orange `REC`).
- Three overview cards: colored 4px top strips (blue/green/orange) + colored mono headers.
- Blue color-field band `▸ FIELD DOCUMENTATION` between stats and gallery.
- Gallery figures: `FIG. 02/03` pills + corner brackets; keep caption paragraph.
- Design Process: header row with `BUILD SEQUENCE` ink pill + dashed rule + giant outline `05` + vertical dashed rail behind cards. Each step card: ink left column (96px) with dot texture, colored number disc, 4-letter mono code (PLAN/FUSE/SEE/CTRL/TEST); right side title + `SEQ 0x/05` tag, body, progress pips (20/40/60/80/100%).
- Performance Results: keep mixed grid; ink stat cards with corner dot textures and big stats (94%, <35ms); photo tiles with mono pills; white cards with colored top strips.
- Footer: `END OF FILE // …` band with barcode + prev/next mono links + three status dots, then texture band.

## Acceptance criteria

- Side-by-side with the mockup blocks, each page reads as the same design (spacing may
  flex slightly for real content).
- No black outlines on shadowed elements; shadows match the spec values.
- Fonts load; mono labels are IBM Plex Mono, everything else Archivo.
- Existing nav links, slider JS, dark-mode toggle, and breadcrumbs still work.
- No horizontal scrollbars at 1360–1512px viewport widths; degrade gracefully below.
