const { B, F, T, slideHeader, slideFooter, card } = require('../brand')

// data: { title, client?, challenge, whatWeDid, outcome, numbers: [{value, label}], link? }
module.exports = function caseStudy(pres, data, ctx) {
  const s = pres.addSlide()
  s.background = { color: B.white }
  slideHeader(s, data.kicker || 'Client Case Study', data.title, { titleW: 14.2 })
  if (data.client) {
    card(s, 16.05, 0.98, 2.95, 1.0, { fill: B.white })
    s.addText(data.client, { x: 16.05, y: 0.98, w: 2.95, h: 1.0, align: 'center', fontFace: F.heading, fontSize: T.body, bold: true, color: B.navy })
  }
  const cols = [
    ['THE CHALLENGE', data.challenge],
    ['WHAT WE DID', data.whatWeDid],
    ['THE OUTCOME', data.outcome],
  ]
  cols.forEach(([label, body], i) => {
    const x = 1.0 + i * 5.02
    card(s, x, 2.4, 4.6, 7.85)
    s.addText(label, { x: x + 0.4, y: 2.7, w: 3.8, h: 0.3, fontFace: F.heading, fontSize: T.label, bold: true, color: B.teal, charSpacing: 1.5 })
    const items = Array.isArray(body) ? body.map(t => ({ text: t, options: { bullet: { characterCode: '2013', indent: 12 }, paraSpaceAfter: 8 } })) : body
    s.addText(items, { x: x + 0.4, y: 3.1, w: 3.8, h: 6.85, fontFace: F.body, fontSize: T.body - 3, color: B.slate, valign: 'top' })
  })
  s.addText('THE NUMBERS', { x: 16.1, y: 2.08, w: 2.95, h: 0.28, fontFace: F.heading, fontSize: T.label, bold: true, color: B.navy, charSpacing: 1.5 })
  const nums = (data.numbers || []).slice(0, 3)
  nums.forEach((n, i) => {
    const y = 2.4 + i * 2.72
    card(s, 16.05, y, 2.95, 2.42, { fill: B.navy, line: false, radius: 0.1 })
    s.addText(n.value, { x: 16.35, y: y + 0.18, w: 2.35, h: 1.21, fontFace: F.heading, fontSize: T.stat, bold: true, color: B.yellow, valign: 'middle' })
    s.addText(n.label, { x: 16.35, y: y + 1.26, w: 2.35, h: 1.06, fontFace: F.body, fontSize: T.label - 1.5, color: B.mutedOnDark, valign: 'top' })
  })
  if (data.link) s.addText(`Full case study:  ${data.link}`, { x: 1.0, y: 10.38, w: 18, h: 0.32, fontFace: F.body, fontSize: T.footer + 1, color: B.slate })
  slideFooter(s, ctx.pageNum)
}
