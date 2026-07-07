# Data Domain Presentation Engine — Claude Instructions

You have cloned the Data Domain branded PPTX engine. Your job: work with the user to define deck content, write it into a `content.json` manifest, build, and deliver the `.pptx`. **Never build slides from scratch or invent your own styling — the templates in this repo are the brand.**

## Quick start

```bash
npm install
node src/build.js example/content.json          # sanity-check the engine works
node src/build.js path/to/your-content.json output.pptx
```

For visual QA in a sandboxed environment, install the bundled fonts first so renders are faithful:

```bash
mkdir -p ~/.fonts && cp assets/fonts/*.ttf ~/.fonts/ && fc-cache -f
```

## Workflow

1. **Interview the user** — audience, purpose, what sections they need. Propose a slide outline (template per slide) and get approval before writing content.
2. **Write `content.json`** — see schema below and `example/content.json` for a complete worked example using every template.
3. **Build** and visually QA the output (render to images, check for text overflow — long content is the usual culprit).
4. **Deliver the .pptx** to the user.

## content.json schema

```json
{
  "title": "Deck title",
  "author": "Data Domain",
  "output": "my-deck.pptx",
  "slides": [
    { "template": "<name>", "data": { ... }, "notes": "optional speaker notes" }
  ]
}
```

## Available templates

| Template | Use for | Key data fields |
|---|---|---|
| `cover` | Title slide (dark) | `title`, `subtitle`, `kicker`, `preparedFor`, `presentedBy`, `year` |
| `agenda` | Numbered agenda (dark) | `items: [string]` (4–6 works best) |
| `section` | Section divider (dark) | `number` ("01"), `title`, `subtitle` |
| `bullets` | Dashed bullet list, optional dark side panel | `kicker`, `title`, `bullets: [{head, body}]` (≤5), `panel: {label, people: [{name, role, photo?}]}` |
| `card-grid` | 3–5 feature cards | `kicker`, `title`, `cards: [{head, body}]` (3 top row, 2 bottom) |
| `case-study` | Challenge / What we did / Outcome + stats rail | `title`, `client`, `challenge`, `whatWeDid`, `outcome` (each array of strings), `numbers: [{value, label}]` (max 3), `link` |
| `closing` | Next steps + contact (dark) | `number`, `title`, `subtitle`, `contact: {address, phone, email, web}` |

## Content limits (avoid overflow)

- Slide titles: ≤ 55 characters
- `bullets` body: ≤ 2 lines (~160 chars); max 5 bullets with panel, 6 without
- `card-grid` body: ≤ 300 chars per card
- `case-study` columns: 3–5 short bullet strings each; `numbers[].value` ≤ 12 chars
- Agenda items: ≤ 45 chars

## Brand rules (do not deviate)

- Canvas is 20 × 11.25 in — all templates handle this; never change `defineLayout`
- Colors and type live in `src/brand.js`. Navy `122853` dark slides, white content slides, teal kickers, five-dot accent motif
- Font is Figtree everywhere. Do not substitute
- Dark/light rhythm: cover, agenda, section dividers, and closing are dark; content slides are light
- If the user needs a layout that doesn't exist, compose it as a new module in `src/templates/` reusing `brand.js` helpers (`slideHeader`, `slideFooter`, `card`, `dash`, `accentDots`) — then suggest they PR it back to this repo

## QA before delivering

Render and inspect every slide. Most common defect: text overflowing a card because content exceeds the limits above — trim the content rather than shrinking fonts.
