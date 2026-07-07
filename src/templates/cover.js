const { B, F, T, W, H, logo, accentDots, slideFooter } = require('../brand')
const path = require('path')

// data: { title, subtitle, kicker?, preparedFor?, presentedBy?, year?, backgroundImage? }
module.exports = function cover(pres, data, ctx) {
  const s = pres.addSlide()
  s.background = { color: B.navy }
  if (data.backgroundImage) {
    s.addImage({ path: path.join(ctx.assets, 'imagery', data.backgroundImage), x: 0, y: 0, w: W, h: H, sizing: { type: 'cover', w: W, h: H } })
    s.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: B.navy, transparency: 35 }, line: { type: 'none' } })
  }
  s.addImage({ path: logo('white'), x: 0.62, y: 0.5, w: 2.0, h: 0.46 })
  s.addText((data.kicker || 'Company Introduction').toUpperCase(), {
    x: 13.4, y: 0.62, w: 6, h: 0.35, align: 'right',
    fontFace: F.heading, fontSize: T.body, bold: true, color: B.mutedOnDark, charSpacing: 2,
  })
  accentDots(s, 1.0, 4.02)
  s.addText(data.title, {
    x: 0.93, y: 4.35, w: 15.5, h: 1.6,
    fontFace: F.heading, fontSize: T.coverTitle, bold: true, color: B.white,
  })
  if (data.subtitle) s.addText(data.subtitle, {
    x: 1.0, y: 5.95, w: 13, h: 0.6,
    fontFace: F.body, fontSize: T.coverSubtitle, color: B.cyan,
  })
  const lines = []
  if (data.preparedFor) lines.push({ text: `Prepared for  ${data.preparedFor}\n`, options: { color: B.white, bold: true } })
  if (data.presentedBy) lines.push({ text: `Presented by  ${data.presentedBy}`, options: { color: B.mutedOnDark } })
  if (lines.length) s.addText(lines, { x: 1.0, y: 8.55, w: 11, h: 1.0, fontFace: F.body, fontSize: T.body, lineSpacing: 26 })
  if (data.year) s.addText(String(data.year), { x: 1.0, y: 9.75, w: 4, h: 0.4, fontFace: F.body, fontSize: T.label, color: B.mutedOnDark2 })
  slideFooter(s, ctx.pageNum, { dark: true })
}
