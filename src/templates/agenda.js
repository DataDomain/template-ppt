const { B, F, T, W, H, logo, slideFooter, accentDots } = require('../brand')

// data: { title?, items: ["About Us", ...] }
module.exports = function agenda(pres, data, ctx) {
  const s = pres.addSlide()
  s.background = { color: B.navy }
  s.addImage({ path: logo('white'), x: 0.62, y: 0.5, w: 1.6, h: 0.37 })
  s.addText(data.title || 'Agenda', {
    x: 1.0, y: 1.2, w: 10, h: 0.9,
    fontFace: F.heading, fontSize: T.slideTitle, bold: true, color: B.white,
  })
  accentDots(s, 1.02, 2.15, { w: 0.3, h: 0.075, gap: 0.12 })
  const items = data.items || []
  const startY = 2.9, rowH = Math.min(1.15, 7.2 / Math.max(items.length, 1))
  items.forEach((item, i) => {
    const y = startY + i * rowH
    s.addText(String(i + 1).padStart(2, '0'), {
      x: 1.0, y, w: 0.75, h: 0.5,
      fontFace: F.heading, fontSize: T.cardHead, bold: true, color: B.cyan,
    })
    s.addText(item, {
      x: 1.95, y, w: 10.5, h: 0.5,
      fontFace: F.body, fontSize: T.cardHead, color: B.white,
    })
    if (i < items.length - 1) s.addShape('line', {
      x: 1.95, y: y + 0.75, w: 9.0, h: 0,
      line: { color: B.navy === '122853' ? '2E4E8C' : B.border, width: 0.75 },
    })
  })
  slideFooter(s, ctx.pageNum, { dark: true })
}
