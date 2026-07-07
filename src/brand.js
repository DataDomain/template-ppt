// Data Domain brand system — extracted from Introduction_to_Data_Domain template
// Slide canvas: 20 x 11.25 inches (16:9, large format)

const path = require('path')

const B = {
  navy:   '122853', // headings, dark panels, footer
  slate:  '5A6B8C', // body text
  teal:   '005A6C', // kicker / eyebrow labels
  cyan:   '3CCDCD', // accent 2 (cover subtitle, dots)
  green:  '00E0AC', // accent 3
  yellow: 'FFE229', // accent 4 (stat numbers on navy)
  purple: 'AF62E8', // accent 5
  blue:   '2558BC', // accent 1 (first dot)
  border: 'DCE3F0', // card borders / light fills
  cardBg: 'F4F7FC', // light card background
  mutedOnDark: 'B9C7E4', // labels on dark backgrounds
  mutedOnDark2: '8DA0C6',
  white:  'FFFFFF',
}

// Accent dot sequence (cover + agenda motif)
B.dots = [B.blue, B.cyan, B.green, B.yellow, B.purple]

const F = { body: 'Figtree', heading: 'Figtree' }

// Type scale (pt)
const T = {
  coverTitle: 76,
  coverSubtitle: 27.5,
  slideTitle: 38,
  kicker: 17.5,       // uppercase eyebrow above slide title
  cardHead: 20,
  body: 16.5,
  label: 14.5,        // uppercase column labels e.g. THE CHALLENGE
  stat: 31,
  footer: 10,
}

const W = 20, H = 11.25

const ASSETS = path.join(__dirname, '..', 'assets')
const logo = (variant = 'white') => path.join(ASSETS, 'logos', `logo-${variant}.png`)
// Logo native aspect ratio ≈ 4.33:1 → standard placements
const LOGO = { w: 1.6, h: 0.37 }

// ---- Shared slide furniture ----

/** Kicker + title header on light content slides, logo top-right */
function slideHeader(s, kicker, title, opts = {}) {
  s.addText(kicker.toUpperCase(), {
    x: 1.0, y: 0.62, w: 12, h: 0.34,
    fontFace: F.heading, fontSize: T.kicker, bold: true,
    color: opts.kickerColor || B.teal, charSpacing: 2,
  })
  s.addText(title, {
    x: 1.0, y: 0.95, w: opts.titleW || 18, h: 0.85,
    fontFace: F.heading, fontSize: T.slideTitle, bold: true,
    color: opts.titleColor || B.navy,
  })
  s.addImage({ path: logo(opts.logoVariant || 'blue'), x: 17.78, y: 0.5, w: LOGO.w, h: LOGO.h })
}

/** Confidentiality footer + page number */
function slideFooter(s, pageNum, opts = {}) {
  const dark = !!opts.dark
  s.addText('Data Domain Confidential — Do Not Distribute', {
    x: 0, y: 10.81, w: W, h: 0.3, align: 'center',
    fontFace: F.body, fontSize: T.footer,
    color: dark ? B.mutedOnDark2 : B.slate,
  })
  if (pageNum != null) {
    s.addText(String(pageNum).padStart(2, '0'), {
      x: 18.9, y: 10.78, w: 0.6, h: 0.32, align: 'right',
      fontFace: F.body, fontSize: T.footer, bold: true,
      color: dark ? B.mutedOnDark : B.slate,
    })
  }
}

/** Row of five accent dots — the brand motif */
function accentDots(s, x, y, opts = {}) {
  const w = opts.w || 0.38, h = opts.h || 0.09, gap = opts.gap || 0.145
  B.dots.forEach((c, i) => {
    s.addShape('roundRect', {
      x: x + i * (w + gap), y, w, h,
      fill: { color: c }, line: { type: 'none' }, rectRadius: h / 2,
    })
  })
}

/** Light card with border */
function card(s, x, y, w, h, opts = {}) {
  s.addShape('roundRect', {
    x, y, w, h,
    fill: { color: opts.fill || B.cardBg },
    line: opts.line === false ? { type: 'none' } : { color: opts.lineColor || B.border, width: 1 },
    rectRadius: opts.radius != null ? opts.radius : 0.08,
  })
}

/** Short colored dash — card accent used on card-grid heads */
function dash(s, x, y, color, opts = {}) {
  s.addShape('roundRect', {
    x, y, w: opts.w || 0.55, h: opts.h || 0.13,
    fill: { color }, line: { type: 'none' }, rectRadius: (opts.h || 0.13) / 2,
  })
}

module.exports = { B, F, T, W, H, logo, LOGO, ASSETS, slideHeader, slideFooter, accentDots, card, dash }
