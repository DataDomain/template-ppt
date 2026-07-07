const { B, F, T, slideHeader, slideFooter, dash, card } = require('../brand')
const path = require('path')

// data: { kicker, title, bullets: [{head, body}], panel?: { label, people: [{name, role, photo?}] } }
// Mirrors "Who We Are" — bullet list left, optional dark side panel right
module.exports = function bullets(pres, data, ctx) {
  const s = pres.addSlide()
  s.background = { color: B.white }
  slideHeader(s, data.kicker || '', data.title)
  const hasPanel = !!data.panel
  const listW = hasPanel ? 9.55 : 17.5
  const items = data.bullets || []
  const startY = 2.48, rowH = Math.min(1.52, 8.0 / Math.max(items.length, 1))
  items.forEach((b, i) => {
    const y = startY + i * rowH
    dash(s, 1.0, y + 0.21, B.dots[i % 5], { w: 0.3, h: 0.07 })
    s.addText(b.head, { x: 1.55, y, w: listW, h: 0.4, fontFace: F.heading, fontSize: T.cardHead, bold: true, color: B.navy })
    s.addText(b.body, { x: 1.55, y: y + 0.38, w: listW, h: rowH - 0.55, fontFace: F.body, fontSize: T.body, color: B.slate })
  })
  if (hasPanel) {
    card(s, 11.75, 2.5, 7.25, 7.8, { fill: B.navy, line: false, radius: 0.1 })
    s.addText((data.panel.label || '').toUpperCase(), {
      x: 12.25, y: 2.85, w: 6.25, h: 0.32,
      fontFace: F.heading, fontSize: T.label, bold: true, color: B.cyan, charSpacing: 2,
    })
    const people = data.panel.people || []
    people.forEach((pn, i) => {
      const y = 3.45 + i * 2.25
      if (pn.photo) {
        s.addImage({ path: path.join(ctx.assets, 'imagery', pn.photo), x: 12.25, y, w: 1.72, h: 1.72, rounding: true })
      } else {
        s.addShape('ellipse', { x: 12.25, y, w: 1.72, h: 1.72, fill: { color: '2E4E8C' }, line: { type: 'none' } })
        s.addText(pn.name.split(' ').map(w => w[0]).join('').slice(0,2), { x: 12.25, y, w: 1.72, h: 1.72, align: 'center', fontFace: F.heading, fontSize: 24, bold: true, color: B.white })
      }
      s.addText(pn.name, { x: 14.2, y: y + 0.35, w: 4.35, h: 0.4, fontFace: F.heading, fontSize: T.body + 1, bold: true, color: B.white })
      s.addText(pn.role, { x: 14.2, y: y + 0.77, w: 4.35, h: 0.4, fontFace: F.body, fontSize: T.label, color: B.mutedOnDark })
    })
  }
  slideFooter(s, ctx.pageNum)
}
