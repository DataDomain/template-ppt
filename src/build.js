#!/usr/bin/env node
// Data Domain deck builder — assembles a branded .pptx from a content.json manifest
// Usage: node src/build.js <content.json> [output.pptx]

const fs = require('fs')
const path = require('path')
const PptxGenJS = require('pptxgenjs')
const { W, H, ASSETS } = require('./brand')

const TEMPLATES = {
  cover: require('./templates/cover'),
  agenda: require('./templates/agenda'),
  section: require('./templates/section'),
  bullets: require('./templates/bullets'),
  'card-grid': require('./templates/cardGrid'),
  'case-study': require('./templates/caseStudy'),
  closing: require('./templates/closing'),
}

function build(manifestPath, outPath) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const pres = new PptxGenJS()
  pres.defineLayout({ name: 'DD', width: W, height: H })
  pres.layout = 'DD'
  pres.author = manifest.author || 'Data Domain'
  pres.title = manifest.title || 'Data Domain Presentation'

  const slides = manifest.slides || []
  slides.forEach((slide, i) => {
    const fn = TEMPLATES[slide.template]
    if (!fn) throw new Error(`Unknown template "${slide.template}" (slide ${i + 1}). Available: ${Object.keys(TEMPLATES).join(', ')}`)
    const ctx = { pageNum: i + 1, totalSlides: slides.length, assets: ASSETS, manifest }
    fn(pres, slide.data || {}, ctx)
    if (slide.notes) {
      // last added slide
      pres.slides[pres.slides.length - 1].addNotes(slide.notes)
    }
  })

  const out = outPath || manifest.output || 'output.pptx'
  return pres.writeFile({ fileName: out }).then(() => {
    console.log(`Built ${slides.length} slides → ${out}`)
  })
}

if (require.main === module) {
  const [, , manifestPath, outPath] = process.argv
  if (!manifestPath) {
    console.error('Usage: node src/build.js <content.json> [output.pptx]')
    process.exit(1)
  }
  build(manifestPath, outPath).catch(e => { console.error(e); process.exit(1) })
}

module.exports = { build, TEMPLATES }
