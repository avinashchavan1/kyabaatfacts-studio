// ===== R010 · Delhi ka loha stambh: 1,600 saal, phir bhi zang nahi! (Desh Ke Ajoobe) — Kya Baat look =====
const KB_SAFE = true;                                   // safe-zone layout (v2)
const SUB_STYLE = { maxW: 640, bottom: 1400 };
const R10_CAT = { label: 'DESH KE AJOOBE', col: '#E8792C' };
const R10_FACT5 = { big: 'PHOSPHORUS', label: 'LOHE MEIN ZYADA', src: 'IIT KANPUR RESEARCH' };
function buildScenes() { return kbLoadImg('pillar', 'proof_pillar.jpg'); }

const R10_IRON = '#4A4552', R10_IRON_HI = '#6E6878';
// the pillar: shaft + bell capital + top block; x = centre, y = ground line, s = scale; o.eyes / o.layer (0..1 shiny film) / o.rust
function r10Pillar(c, x, y, s, t, o = {}) {
  const { eyes = null, layer = 0, rust = 0, glow = 0 } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = KB.INK; c.lineWidth = 10;
  // stone base
  c.fillStyle = '#C9A77A'; c.beginPath(); c.roundRect(-110, -40, 220, 40, 10); c.fill(); c.stroke();
  // shaft (slight taper)
  const g = c.createLinearGradient(-50, 0, 50, 0); g.addColorStop(0, R10_IRON); g.addColorStop(0.35, R10_IRON_HI); g.addColorStop(1, R10_IRON);
  c.fillStyle = g; c.beginPath(); c.moveTo(-52, -40); c.lineTo(-40, -760); c.lineTo(40, -760); c.lineTo(52, -40); c.closePath(); c.fill(); c.stroke();
  // inscription band
  c.strokeStyle = rgba('#FFFFFF', 0.35); c.lineWidth = 4;
  for (let k = 0; k < 4; k++) { const yy = -260 - k * 22; c.beginPath(); for (let xx = -38; xx <= 38; xx += 8) c.lineTo(xx, yy + ((xx / 8) % 2 ? -5 : 4)); c.stroke(); }
  c.strokeStyle = KB.INK; c.lineWidth = 10;
  // capital: rings + bell + block
  c.fillStyle = R10_IRON_HI;
  [[-760, 54, 22], [-790, 62, 26], [-820, 50, 22]].forEach(([yy, w, h]) => { c.beginPath(); c.roundRect(-w, yy - h, w * 2, h, 8); c.fill(); c.stroke(); });
  c.beginPath(); c.moveTo(-46, -842); c.bezierCurveTo(-70, -900, 70, -900, 46, -842); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(-44, -940, 88, 60, 8); c.fill(); c.stroke();
  // rust blotches (for the "what if" moment)
  if (rust > 0) { c.fillStyle = rgba('#C4561E', 0.85 * rust); [[-20, -150, 30], [18, -400, 24], [-10, -560, 34], [22, -660, 20], [-24, -320, 18]].forEach(([bx, by, r]) => { c.beginPath(); c.ellipse(bx, by, r * rust, r * 0.8 * rust, 0.3, 0, Math.PI * 2); c.fill(); }); }
  // protective layer: a bright outline sweeping up the shaft
  if (layer > 0) {
    const top = -40 - 720 * Math.min(1, layer);
    c.save(); c.strokeStyle = KB.Y; c.lineWidth = 14; c.shadowColor = KB.Y; c.shadowBlur = 24 + 10 * Math.sin(t * 6);
    c.beginPath(); c.moveTo(-62, -40); c.lineTo(-62 + 12 * (-40 - top) / 720, top); c.moveTo(62, -40); c.lineTo(62 - 12 * (-40 - top) / 720, top); c.stroke(); c.restore();
  }
  if (glow > 0) { c.save(); c.globalAlpha = glow; c.fillStyle = '#FF8A2A'; c.beginPath(); c.roundRect(-40, -700, 80, 640, 20); c.fill(); c.restore(); }
  c.restore();
  if (eyes) kbEyes(c, x, y - 560 * s, 30 * s, t, eyes, 10);
}
// Qutub Minar silhouette in the background
function r10Minar(c, x, y, s, a = 0.35) {
  c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(s, s); c.fillStyle = '#B5542E'; c.strokeStyle = KB.INK; c.lineWidth = 8;
  c.beginPath(); c.moveTo(-90, 0); c.lineTo(-34, -1100); c.lineTo(34, -1100); c.lineTo(90, 0); c.closePath(); c.fill(); c.stroke();
  [-260, -520, -760, -960].forEach((yy) => { const w = 90 - 56 * (-yy / 1100) + 20; c.beginPath(); c.roundRect(-w, yy - 18, w * 2, 26, 6); c.fill(); c.stroke(); });
  c.beginPath(); c.roundRect(-26, -1160, 52, 60, 10); c.fill(); c.stroke();
  c.restore();
}
function r10Ground(ctx, y = 1300, col = '#D9B98A') { ctx.fillStyle = col; ctx.strokeStyle = KB.INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); ctx.stroke(); }
// sun (rays) or rain drops, alternating
function r10Weather(ctx, t, u) {
  const sunny = Math.floor(u / 0.9) % 2 === 0;
  if (sunny) { ctx.save(); ctx.translate(840, 760); ctx.rotate(t * 0.6); ctx.fillStyle = KB.Y; ctx.strokeStyle = KB.INK; ctx.lineWidth = 8;
    for (let k = 0; k < 10; k++) { ctx.rotate(Math.PI / 5); ctx.beginPath(); ctx.moveTo(70, -10); ctx.lineTo(110, 0); ctx.lineTo(70, 10); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(0, 0, 60, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore(); }
  else { ctx.strokeStyle = '#3282DC'; ctx.lineWidth = 8; ctx.lineCap = 'round'; for (let k = 0; k < 26; k++) { const x = (k * 97) % W, yy = 640 + ((t * 900 + k * 173) % 680); ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x - 14, yy + 40); ctx.stroke(); } }
}
// rusty iron gate
function r10Gate(c, x, y, s, rust) {
  c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = KB.INK; c.lineWidth = 10; c.fillStyle = '#5A6070';
  c.beginPath(); c.roundRect(-170, -360, 340, 24, 6); c.fill(); c.stroke(); c.beginPath(); c.roundRect(-170, -40, 340, 24, 6); c.fill(); c.stroke();
  for (let k = -150; k <= 150; k += 50) { c.beginPath(); c.roundRect(k - 9, -400, 18, 390, 6); c.fill(); c.stroke(); c.beginPath(); c.moveTo(k - 16, -400); c.lineTo(k, -432); c.lineTo(k + 16, -400); c.closePath(); c.fill(); c.stroke(); }
  if (rust > 0) { c.fillStyle = rgba('#C4561E', 0.9); for (let k = 0; k < 14; k++) { const bx = -150 + (k * 53) % 300, by = -60 - (k * 89) % 300, r = (10 + (k % 4) * 6) * rust; c.beginPath(); c.ellipse(bx, by, r, r * 0.7, k, 0, Math.PI * 2); c.fill(); } }
  c.restore();
}
function r10Hammer(c, x, y, ang) {
  c.save(); c.translate(x, y); c.rotate(ang); c.strokeStyle = KB.INK; c.lineWidth = 10; c.fillStyle = '#8A5A2A';
  c.beginPath(); c.roundRect(-12, -10, 24, 260, 8); c.fill(); c.stroke(); c.fillStyle = '#5A6070'; c.beginPath(); c.roundRect(-70, -60, 140, 70, 12); c.fill(); c.stroke(); c.restore();
}
function r10Fence(c, y, q) {
  if (q <= 0) return; c.save(); c.globalAlpha = Math.min(1, q * 1.4); c.strokeStyle = KB.INK; c.lineWidth = 9; c.fillStyle = '#7A4A2A';
  const h = 170 * Math.min(1, q); c.beginPath(); c.roundRect(300, y - h, 480, 18, 6); c.fill(); c.stroke();
  for (let x = 310; x <= 770; x += 46) { c.beginPath(); c.roundRect(x - 6, y - h, 12, h, 4); c.fill(); c.stroke(); }
  c.restore();
}

const SHOTS = {
  // 1 — hook: the pillar in sun and rain; card "1,600 SAAL KA LOHA / ZANG? NAHI!"
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t); r10Weather(ctx, t, u); r10Ground(ctx);
    r10Pillar(ctx, 540, 1300, 0.62 * backOut(map(u, 0.05, 0.5)), t, { eyes: u > st[1] ? 'sach' : 'hmm' });
    post.ui = c => { kbBadge(c, R10_CAT.label, R10_CAT.col, ease(u, 0, 0.3)); (sh.card || []).forEach(([s, col], i) => { const q = i ? ease(u, st[1] - 0.05, st[1] + 0.3) : 1; if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 100, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }, 980); }); };
  },
  // 2 — reveal: Delhi, next to the Qutub Minar, ~7 m; real photo
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t); r10Minar(ctx, 800, 1300, 0.8, 0.45); r10Ground(ctx);
    r10Pillar(ctx, 420, 1300, 0.68, t, { eyes: 'kya' });
    const rq = easeOut(map(u, st[1] + 0.2, st[1] + 1.0));
    if (rq > 0) { ctx.save(); ctx.strokeStyle = KB.RED; ctx.lineWidth = 10; ctx.lineCap = 'round'; const top = 1300 - 640 * rq; ctx.beginPath(); ctx.moveTo(230, 1300); ctx.lineTo(230, top); ctx.moveTo(205, top); ctx.lineTo(255, top); ctx.stroke(); ctx.restore(); }
    post.ui = c => { kbBadge(c, R10_CAT.label, R10_CAT.col); kbPin(c, 760, 560, 'QUTUB MINAR', u, st[1], KB.RED); kbStamp(c, 'DILLI KA LAUH STAMBH', 540, 430, u, 0.2, KB.RED, 80); if (rq > 0.6) text(c, '~7 M', 230, 600, { size: 64, weight: 900, color: KB.RED, stroke: 12, shadow: 0 });
      kbProof(c, 'pillar', u, Math.max(0.6, st[1] - 1.6), 2.4, 'ASLI IRON PILLAR · DELHI', 'Photo: 03Ani03 / Wikimedia Commons · CC BY-SA 4.0', 0.03); };
  },
  // 3 — the inscription: king "Chandra" → Chandragupta II
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t); r10Ground(ctx);
    r10Pillar(ctx, 540, 1300, 0.7, t);
    const zq = backOut(map(u, 0.3, 0.7));
    if (zq > 0) { ctx.save(); ctx.translate(540, 1100); ctx.scale(zq, zq); ctx.fillStyle = KB.W; ctx.strokeStyle = KB.INK; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, 0, 150, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = R10_IRON; ctx.lineWidth = 9; for (let k = 0; k < 4; k++) { const yy = -60 + k * 40; ctx.beginPath(); for (let xx = -100; xx <= 100; xx += 20) ctx.lineTo(xx, yy + ((xx / 20) % 2 ? -10 : 8)); ctx.stroke(); }
      ctx.restore(); ctx.save(); ctx.strokeStyle = KB.INK; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(646, 1206); ctx.lineTo(740, 1300); ctx.stroke(); ctx.restore(); }
    post.ui = c => { kbBadge(c, R10_CAT.label, R10_CAT.col); kbStamp(c, 'RAJA "CHANDRA"', 540, 430, u, 0.6, KB.RED, 96);
      if (u > st[1]) kbLabel(c, 'CHANDRAGUPTA II · GUPTA RAJA', 600, u, st[1] + 0.2, { fill: KB.Y, size: 54 }); };
  },
  // 4 — the home gate rusts in a few years… why not the pillar?
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t); r10Ground(ctx);
    r10Gate(ctx, 290, 1290, 0.85, easeOut(map(u, 0.8, st[1])));
    r10Pillar(ctx, 790, 1300, 0.6, t, { eyes: u > st[1] ? 'hmm' : 'kya' });
    post.ui = c => { kbBadge(c, R10_CAT.label, R10_CAT.col);
      if (u > 1.0) text(c, 'GATE: ZANG!', 290, 800, { size: 60, weight: 900, color: KB.RED, stroke: 14, shadow: 0, alpha: ease(u, 1.0, 1.3) });
      if (u > st[1]) { kbStamp(c, 'ISE KYUN NAHI?', 540, 430, u, st[1], KB.RED, 96); } };
  },
  // 5 — the secret: phosphorus → a thin layer that holds back rust; then the catchphrase
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 3);
    kbNight(ctx, t, '#14123A', '#2B276A');
    const lay = easeOut(map(u, st[1] + 0.2, st[1] + 1.6));
    r10Pillar(ctx, 540, 1330, 0.6, t, { layer: lay, eyes: lay > 0.9 ? 'wow' : null });
    // raindrops bouncing off the shining layer
    if (lay > 0.6) { ctx.strokeStyle = '#7FB6FF'; ctx.lineWidth = 7; ctx.lineCap = 'round'; for (let k = 0; k < 8; k++) { const side = k % 2 ? 1 : -1, ph = (t * 1.4 + k * 0.23) % 1, yy = 760 + k * 60; ctx.beginPath(); ctx.moveTo(540 + side * (70 + ph * 120), yy - 20 + ph * ph * 80); ctx.lineTo(540 + side * (60 + ph * 120), yy - 40 + ph * ph * 80); ctx.stroke(); } }
    post.ui = c => { kbBadge(c, R10_CAT.label, R10_CAT.col); kbFact(c, u, R10_FACT5, 300, 0.3, KB.RED);
      if (u > st[1] && u < st[2]) kbLabel(c, 'PATLI PARAT = ZANG STOP!', 640, u, st[1] + 0.6, { fill: KB.Y, size: 50 });
      kbKyaBaat(c, u, t, st[2]); };
  },
  // 6 — forge-welded (hammer + glowing pieces), then the hug tradition and the 1997 fence
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t); r10Ground(ctx);
    if (u < st[1]) {
      const hit = Math.abs(Math.sin(t * 5));
      r10Pillar(ctx, 540, 1300, 0.62, t, { glow: 0.55 + 0.3 * hit });
      r10Hammer(ctx, 700, 900, -0.9 + hit * 0.7);
      if (hit > 0.85) { ctx.fillStyle = KB.Y; for (let k = 0; k < 8; k++) { const a = k * 0.8 + t; ctx.beginPath(); ctx.arc(600 + Math.cos(a) * 60, 900 + Math.sin(a) * 60, 9, 0, Math.PI * 2); ctx.fill(); } }
    } else {
      const fq = easeOut(map(u, st[1] + 2.4, st[1] + 3.0));
      r10Pillar(ctx, 540, 1300, 0.62, t, { eyes: fq > 0.5 ? 'sach' : 'kya' });
      if (fq < 0.5) [[400, 1000, 0], [690, 1050, 0.6], [470, 820, 1.2]].forEach(([x, y, ph]) => kbHeart(ctx, x, y - Math.sin(t * 2 + ph) * 12, 0.8, KB.RED, 1 + 0.1 * Math.sin(t * 6 + ph)));
      r10Fence(ctx, 1300, fq);
    }
    post.ui = c => { kbBadge(c, R10_CAT.label, R10_CAT.col);
      if (u < st[1]) kbLabel(c, 'PEET-PEET KAR JODA!', 430, u, 0.3, { size: 56 });
      else { const fq = map(u, st[1] + 2.4, st[1] + 3.0); if (fq < 0.5) kbLabel(c, 'WISH WALA HUG 🤗', 430, u, st[1], { fill: KB.Y, size: 56 }); else kbStamp(c, '1997: JAALI LAGI', 540, 430, u, st[1] + 2.4, KB.RED, 92); } };
  },
  // 7 — loop: next time at the Qutub Minar, see this 1,600-year-old pillar
  7(ctx, u, p, sh, t, post) {
    kbYellow(ctx, t); r10Minar(ctx, 820, 1300, 0.8, 0.45); r10Ground(ctx);
    r10Pillar(ctx, 470, 1300, 0.66, t, { eyes: 'wow' });
    post.ui = c => { kbBadge(c, R10_CAT.label, R10_CAT.col); kbStamp(c, '1,600 SAAL PURANA!', 540, 430, u, 0.4, KB.RED, 92); };
  },
  8(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
