// ===== R005 · Sirf 10% dimaag? MYTH! (Myth or Fact?) — Kya Baat look =====
const R5_CAT = { label: 'MYTH OR FACT?', col: '#FF4B3E' };
const R5_FACTS = { 5: { big: '2% → 20%', label: 'WAZAN → ENERGY', src: 'MIT McGOVERN INSTITUTE' } };
function buildScenes() {}

// the brain: two pink lobes with folds; glow = list of active regions [0..1], eyes optional, bandage optional
const R5_REG = [[-150, -60, 'SOCHNA'], [120, -90, 'YAADEIN'], [-40, -150, 'CHALNA'], [170, 40, 'DEKHNA'], [-170, 70, 'BOLNA'], [20, 60, 'SUNNA']];
function r5Brain(c, x, y, s, t, o = {}) {
  const { glow: gl = [], eyes = null, bandage = 0, fill = 0 } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.lineCap = 'round';
  c.fillStyle = '#F7A8C4'; c.strokeStyle = KB.INK; c.lineWidth = 12;
  c.beginPath(); c.moveTo(0, -200); c.bezierCurveTo(-140, -250, -300, -160, -290, -20); c.bezierCurveTo(-300, 120, -180, 200, -60, 180); c.bezierCurveTo(-20, 230, 60, 230, 90, 180); c.bezierCurveTo(230, 200, 310, 100, 290, -20); c.bezierCurveTo(300, -160, 150, -250, 0, -200); c.closePath(); c.fill();
  if (fill > 0) { c.save(); c.clip(); c.fillStyle = '#FF4B3E'; c.fillRect(-320, 230 - 460 * fill, 640, 460 * fill); c.restore(); }
  c.stroke();
  c.strokeStyle = '#C9547E'; c.lineWidth = 9;
  [[[-230, -60], [-170, -110], [-110, -70], [-60, -130]], [[-250, 50], [-180, 10], [-120, 60], [-60, 20]], [[40, -150], [100, -100], [160, -150], [220, -90]], [[60, 0], [130, -40], [190, 10], [250, -20]], [[-140, 130], [-80, 100], [-20, 140]], [[60, 120], [130, 90], [200, 120]]]
    .forEach(pts => { c.beginPath(); pts.forEach(([px, py], i) => i ? c.quadraticCurveTo((px + pts[i - 1][0]) / 2, py - 30, px, py) : c.moveTo(px, py)); c.stroke(); });
  c.strokeStyle = KB.INK; c.lineWidth = 8; c.beginPath(); c.moveTo(0, -195); c.bezierCurveTo(-20, -100, 20, 0, 0, 170); c.stroke();
  gl.forEach((a, i) => { if (a <= 0) return; const [gx, gy] = R5_REG[i]; c.save(); c.globalAlpha = a; const g = c.createRadialGradient(gx, gy, 0, gx, gy, 95); g.addColorStop(0, 'rgba(255,240,120,1)'); g.addColorStop(1, 'rgba(255,200,61,0)'); c.fillStyle = g; c.beginPath(); c.arc(gx, gy, 95, 0, Math.PI * 2); c.fill(); c.restore(); });
  if (bandage > 0) { c.save(); c.globalAlpha = bandage; c.translate(150, -150); c.rotate(-0.6); c.fillStyle = '#F2D2A9'; c.strokeStyle = KB.INK; c.lineWidth = 7; c.beginPath(); c.roundRect(-110, -32, 220, 64, 20); c.fill(); c.stroke(); c.fillStyle = '#E0B98A'; c.fillRect(-30, -32, 60, 64); c.strokeRect(-30, -32, 60, 64); c.restore(); }
  c.restore();
  if (eyes) kbEyes(c, x, y + 20 * s, 48 * s / 0.9, t, eyes, 6);
}
function r5Meter(c, x, y, w, h, frac, col, label) {
  kbPanel(c, x, y, w, h, KB.W, 20, 10); c.fillStyle = col; c.beginPath(); c.roundRect(x + 10, y + h - 10 - (h - 20) * frac, w - 20, (h - 20) * frac, 12); c.fill();
  if (label) text(c, label, x + w / 2, y + h + 70, { size: 46, weight: 900, color: KB.INK, shadow: 0 });
}

const SHOTS = {
  // 1 — hook: a brain with only 10% lit, "myth ya fact?"
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbNight(ctx, t, '#14123A', '#2B276A');
    r5Brain(ctx, 540, 1060, 1.35, t, { fill: 0.1 * easeOut(map(u, 0.4, 1.4)), eyes: 'hmm' });
    post.ui = c => {
      kbBadge(c, R5_CAT.label, R5_CAT.col, ease(u, 0, 0.3));
      (sh.card || []).forEach(([s, col], i) => { const q = ease(u, (i ? Math.max(st[1] || 0, sh.dur * 0.55) : 0.05) - 0.05, (i ? Math.max(st[1] || 0, sh.dur * 0.55) : 0.05) + 0.3); if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 104, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }); });
      text(c, '10%', 540, 760, { size: 90, weight: 900, color: KB.Y, stroke: 14, shadow: 0, alpha: ease(u, 0.6, 1.0) });
    };
  },
  // 2 — "you've heard it many times… but what's the truth?": speech bubbles pile up
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    r5Brain(ctx, 540, 1080, 1.1, t, { eyes: u < st[1] ? 'hmm' : 'sach' });
    post.ui = c => {
      kbBadge(c, R5_CAT.label, R5_CAT.col);
      [[250, 560, -0.08, 0.3], [780, 640, 0.07, 0.8], [330, 1500, 0.05, 1.3]].forEach(([x, y, r, at]) => { const b = backOut(map(u, at, at + 0.3)); if (b <= 0) return; c.save(); c.translate(x, y); c.rotate(r); c.scale(b, b); kbPanel(c, -200, -60, 400, 120, KB.W, 60, 10); text(c, '"SIRF 10%!"', 0, 18, { size: 50, weight: 900, color: KB.INK, shadow: 0 }); c.restore(); });
      if (u > st[1]) kbLabel(c, 'LEKIN SACH KYA HAI?', 300, u, st[1], { fill: KB.Y, size: 54 });
    };
  },
  // 3 — MYTH! stamp, red X over the 10%
  3(ctx, u, p, sh, t, post) {
    kbNight(ctx, t, '#14123A', '#2B276A');
    ctx.save(); kbShake(ctx, u, 0.9, 22); r5Brain(ctx, 540, 1080, 1.25, t, { eyes: 'wow' }); ctx.restore();
    post.ui = c => {
      kbBadge(c, R5_CAT.label, R5_CAT.col);
      const b = backOut(map(u, 0.7, 1.0)); if (b > 0) { c.save(); c.translate(540, 1080); c.scale(b, b); c.strokeStyle = KB.RED; c.lineWidth = 40; c.lineCap = 'round'; c.beginPath(); c.moveTo(-330, -300); c.lineTo(330, 300); c.moveTo(330, -300); c.lineTo(-330, 300); c.stroke(); c.restore(); }
      kbStamp(c, 'MYTH!', 540, 440, u, 0.8, KB.RED, 150);
    };
  },
  // 4 — brain scan: every region lights up over the day; even at rest
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbNight(ctx, t, '#0C0A26', '#1F1C52');
    const gl = R5_REG.map((_, i) => { const at = 0.5 + i * (Math.max(1.5, st[1] - 0.6) / R5_REG.length); return ease(u, at, at + 0.3) * (0.75 + 0.25 * Math.sin(t * 5 + i)); });
    r5Brain(ctx, 540, 1060, 1.3, t, { glow: gl });
    post.ui = c => {
      kbBadge(c, R5_CAT.label, R5_CAT.col);
      R5_REG.forEach(([gx, gy, name], i) => { if (gl[i] > 0.3) text(c, name, 540 + gx * 1.3, 1060 + gy * 1.3 + 12, { size: 32, weight: 900, color: KB.INK, alpha: Math.min(1, gl[i]), shadow: 0 }); });
      kbLabel(c, u < st[1] ? 'BRAIN SCAN: POORA DIMAAG ON!' : 'AARAAM MEIN BHI! 😴', 320, u, u < st[1] ? 0.3 : st[1], { size: 48, fill: u < st[1] ? KB.W : KB.Y });
    };
  },
  // 5 — 2% of body weight vs 20% of energy, then the catchphrase
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    const g1 = easeOut(map(u, 0.6, 1.4)), g2 = easeOut(map(u, st[1] * 0.5, st[1] * 0.8));
    r5Meter(ctx, 200, 720, 240, 500, 0.02 * 5 * g1, '#F7A8C4', 'WAZAN 2%');
    r5Meter(ctx, 640, 720, 240, 500, 0.2 * 5 * g2 > 1 ? 1 : 0.2 * 5 * g2, KB.RED, 'ENERGY 20%');
    post.ui = c => { kbBadge(c, R5_CAT.label, R5_CAT.col); kbFact(c, u, R5_FACTS[5], 300, 0.3, KB.RED); kbKyaBaat(c, u, t, st[1]); };
  },
  // 6 — if 90% were idle, injuries wouldn't matter… but almost every injury has an effect
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbNight(ctx, t, '#14123A', '#2B276A');
    const gl = R5_REG.map((_, i) => u > st[1] ? ease(u, st[1] + 0.3 + i * 0.35, st[1] + 0.6 + i * 0.35) : 0);
    r5Brain(ctx, 540, 1080, 1.25, t, { bandage: ease(u, 0.4, 0.8), glow: gl, eyes: u < st[1] ? 'hmm' : 'kya' });
    post.ui = c => {
      kbBadge(c, R5_CAT.label, R5_CAT.col);
      if (u < st[1]) kbLabel(c, '90% BEKAAR HOTA... TO?', 320, u, 0.2, { size: 52 });
      else { kbLabel(c, 'HAR HISSA ZAROORI!', 320, u, st[1], { fill: KB.Y, size: 56 }); R5_REG.forEach(([gx, gy, name], i) => { if (gl[i] > 0.3) text(c, name, 540 + gx * 1.25, 1080 + gy * 1.25 + 12, { size: 30, weight: 900, color: KB.INK, alpha: gl[i], shadow: 0 }); }); }
    };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
