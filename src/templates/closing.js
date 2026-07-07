const { B, F, T, W, H, logo, slideFooter, accentDots } = require('../brand')
const path = require('path')

// data: { number?, title, subtitle?, contact: { address?, phone?, email?, web? }, backgroundImage? }
module.exports = function closing(pres, data, ctx) {
  const s = pres.addSlide()
  s.background = { color: B.navy }
  if (data.backgroundImage) {
    s.addImage({ path: path.join(ctx.assets, 'imagery', data.backgroundImage), x: 0, y: 0, w: W, h: H, sizing: { type: 'cover', w: W, h: H } })
    s.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: B.navy, transparency: 30 }, line: { type: 'none' } })
  }
  s.addImage({ path: logo('white'), x: 0.62, y: 0.5, w: 1.6, h: 0.37 })
  if (data.number) s.addText(data.number, { x: 1.0, y: 3.0, w: 3, h: 0.7, fontFace: F.heading, fontSize: 30, bold: true, color: B.cyan })
  accentDots(s, 1.0, 3.7, { w: 0.3, h: 0.075, gap: 0.12 })
  s.addText(data.title, { x: 0.95, y: 4.1, w: 16, h: 1.2, fontFace: F.heading, fontSize: 54, bold: true, color: B.white })
  if (data.subtitle) s.addText(data.subtitle, { x: 1.0, y: 5.4, w: 14, h: 0.55, fontFace: F.body, fontSize: T.body + 2, color: B.mutedOnDark })
  const c = data.contact || {}
  const rows = [['ADDRESS', c.address], ['PHONE', c.phone], ['EMAIL', c.email], ['WEB', c.web]].filter(r => r[1])
  rows.forEach(([label, val], i) => {
    const y = 7.4 + i * 0.62
    s.addText(label, { x: 1.0, y, w: 1.9, h: 0.45, fontFace: F.heading, fontSize: T.label - 2, bold: true, color: B.cyan, charSpacing: 1.5 })
    s.addText(val, { x: 3.0, y, w: 12, h: 0.45, fontFace: F.body, fontSize: T.label, color: B.white })
  })
  slideFooter(s, ctx.pageNum, { dark: true })
}
