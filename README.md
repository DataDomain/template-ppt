# Data Domain Presentation Engine

Branded PPTX generation for Data Domain. Claude (or any developer) clones this repo, writes a `content.json` manifest, and builds a fully branded deck — no design work per deck.

## Usage with Claude

Paste this into Claude (chat with code execution, Claude Code, or Cowork):

> Clone https://github.com/DataDomain/template-ppt, read its CLAUDE.md, then help me create a presentation for [audience] covering [topics].

Claude will propose an outline, draft the content with you, and hand back the finished `.pptx`.

## Manual usage

```bash
npm install
node src/build.js example/content.json   # builds the reference example
node src/build.js my-deck.json out.pptx
```

## Structure

```
src/brand.js          # Design tokens + shared slide furniture (colors, type, header/footer/dots)
src/templates/        # One module per slide layout
src/build.js          # Manifest → PPTX
assets/logos/         # Data Domain logo variants
assets/fonts/         # Figtree (OFL) for render QA environments
example/content.json  # Reference manifest exercising every template
CLAUDE.md             # Instructions Claude reads after cloning
```

## Design system (extracted from the master template)

Canvas 20 × 11.25 in. Navy `#122853` dark slides / white content slides. Kickers in teal `#005A6C`, body in slate `#5A6B8C`. Accent dots: blue `#2558BC`, cyan `#3CCDCD`, green `#00E0AC`, yellow `#FFE229`, purple `#AF62E8`. Figtree throughout.

## Adding templates

New layouts go in `src/templates/`, registered in `src/build.js`, reusing `brand.js` helpers. PR with a rendered screenshot.
