const { B, F, T, W, H, logo, slideFooter, accentDots } = require('../brand')
const path = require('path')

// data: { number: "01", title, subtitle?, backgroundImage? }
module.exports = function section(pres, data, ctx) {
  const s = pres.addSlide()
  s.background = { color: B.navy }
  if (data.backgroundImage) {
    s.addImage({ path: path.join(ctx.assets, 'imagery', data.backgroundImage), x: 0, y: 0, w: W, h: H, sizing: { type: 'cover', w: W, h: H } })
    s.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: B.navy, transparency: 30 }, line: { type: 'none' } })
  }
  s.addImage({ path: logo('white'), x: 0.62, y: 0.5, w: 1.6, h: 0.37 })
  if (data.number) s.addText(data.number, {
    x: 1.0, y: 3.7, w: 3, h: 0.7,
    fontFace: F.heading, fontSize: 30, bold: true, color: B.cyan,
  })
  accentDots(s, 2.1, 3.98, { w: 0.3, h: 0.075, gap: 0.12 })
  s.addText(data.title, {
    x: 0.95, y: 4.45, w: 16, h: 1.2,
    fontFace: F.heading, fontSize: 54, bold: true, color: B.white,
  })
  if (data.subtitle) s.addText(data.subtitle, {
    x: 1.0, y: 5.75, w: 14, h: 0.55,
    fontFace: F.body, fontSize: T.body + 2, color: B.mutedOnDark,
  })
  slideFooter(s, ctx.pageNum, { dark: true })
}
