const { B, F, T, W, slideHeader, slideFooter, card, dash } = require('../brand')

// data: { kicker, title, cards: [{head, body}] }  — 2 rows: 3 on top, remainder below (like "What Makes Us Different")
module.exports = function cardGrid(pres, data, ctx) {
  const s = pres.addSlide()
  s.background = { color: B.white }
  slideHeader(s, data.kicker || '', data.title)
  const cards = data.cards || []
  const top = cards.slice(0, 3), bottom = cards.slice(3, 5)
  const gap = 0.45, x0 = 1.0, availW = 18.0
  if (top.length) {
    const w = (availW - gap * (top.length - 1)) / top.length
    top.forEach((c, i) => {
      const x = x0 + i * (w + gap), y = 2.55, h = bottom.length ? 3.95 : 7.6
      card(s, x, y, w, h)
      dash(s, x + 0.5, y + 0.5, B.dots[i % 5])
      s.addText(c.head, { x: x + 0.5, y: y + 0.78, w: w - 1.0, h: 0.8, fontFace: F.heading, fontSize: T.cardHead, bold: true, color: B.navy })
      s.addText(c.body, { x: x + 0.5, y: y + 1.75, w: w - 1.0, h: h - 2.15, fontFace: F.body, fontSize: T.body - 1.5, color: B.slate })
    })
  }
  if (bottom.length) {
    const w = (availW - gap * (bottom.length - 1)) / bottom.length
    bottom.forEach((c, i) => {
      const x = x0 + i * (w + gap), y = 6.75, h = 3.55
      card(s, x, y, w, h)
      dash(s, x + 0.5, y + 0.5, B.dots[(i + 3) % 5])
      s.addText(c.head, { x: x + 0.5, y: y + 0.78, w: w - 1.0, h: 0.5, fontFace: F.heading, fontSize: T.cardHead, bold: true, color: B.navy })
      s.addText(c.body, { x: x + 0.5, y: y + 1.45, w: w - 1.0, h: h - 1.85, fontFace: F.body, fontSize: T.body - 1.5, color: B.slate })
    })
  }
  slideFooter(s, ctx.pageNum)
}
