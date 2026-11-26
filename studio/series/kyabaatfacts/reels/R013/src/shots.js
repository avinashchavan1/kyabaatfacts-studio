// ===== R013 · Bachche 300 haddiyon ke saath, bade hokar 206 kyun? (Science Wala Sach) — Kya Baat look =====
const KB_SAFE = true;                                   // safe-zone layout (v2)
const SUB_STYLE = { maxW: 640, bottom: 1400 };
const R13_CAT = { label: 'SCIENCE WALA SACH', col: '#20B2A6' };
function buildScenes() { return kbLoadImg('xray', 'proof_xray.jpg'); }

// a cartoon bone (two knobs each end), optional eyes
function r13Bone(c, x, y, len, s, rot = 0, t = 0, mood = null, col = '#FFF6E4') {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 10; c.lineJoin = 'round';
  const L = len / 2, r = 46;
  c.beginPath(); c.roundRect(-L, -26, len, 52, 20); c.fill(); c.stroke();
  [[-L, -28], [-L, 28], [L, -28], [L, 28]].forEach(([bx, by]) => { c.beginPath(); c.arc(bx, by, r, 0, Math.PI * 2); c.fill(); c.stroke(); });
  c.beginPath(); c.roundRect(-L + 10, -24, len - 20, 48, 16); c.fill();
  c.restore(); if (mood) kbEyes(c, x, y - 4 * s, 26 * s, t, mood, 7);
}
// a number counter that rolls from a to b
function r13Count(u, a, b, from, to) { const k = Math.max(0, Math.min(1, (u - from) / (to - from))); return Math.round(a + (b - a) * (1 - Math.pow(1 - k, 3))); }
// baby head seen from above with skull plates and soft spots (q: 0 open … 1 closed)
function r13Skull(c, x, y, s, q, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round';
  c.fillStyle = '#FFE2C2'; c.strokeStyle = KB.INK; c.lineWidth = 12; c.beginPath(); c.ellipse(0, 0, 260, 320, 0, 0, Math.PI * 2); c.fill(); c.stroke();
  const gap = 26 * (1 - q);
  c.strokeStyle = rgba('#B5542E', 0.85); c.lineWidth = 6 + 10 * (1 - q); c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, -300); c.lineTo(0, 280); c.stroke();                          // middle seam
  c.beginPath(); c.moveTo(-250, -60); c.quadraticCurveTo(0, -20, 250, -60); c.stroke();     // front seam
  // the big soft spot (front) and small one (back): diamonds that shrink as q → 1
  const d = 90 * (1 - q) + 2, d2 = 40 * (1 - q) + 1;
  c.fillStyle = rgba(KB.RED, 0.75 * (1 - q) + 0.05); c.strokeStyle = KB.INK; c.lineWidth = 6;
  c.beginPath(); c.moveTo(0, -40 - d); c.lineTo(d * 0.8, -40); c.lineTo(0, -40 + d); c.lineTo(-d * 0.8, -40); c.closePath(); c.fill(); if (q < 0.95) c.stroke();
  c.beginPath(); c.moveTo(0, 240 - d2); c.lineTo(d2, 240); c.lineTo(0, 240 + d2); c.lineTo(-d2, 240); c.closePath(); c.fill(); if (q < 0.95) c.stroke();
  c.restore();
}
// stack of vertebra blocks merging into one sacrum wedge (q: 0 separate … 1 one bone)
function r13Sacrum(c, x, y, s, q, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = KB.INK; c.lineWidth = 10; c.lineJoin = 'round';
  const gap = 34 * (1 - q);
  for (let i = 0; i < 5; i++) {
    const w = 300 - i * 46, h = 80, yy = i * (h + gap) - 2 * (h + gap);
    c.fillStyle = q > 0.98 ? '#FFF6E4' : ['#FFF6E4', '#FDEBD0', '#FFF6E4', '#FDEBD0', '#FFF6E4'][i];
    c.beginPath(); c.roundRect(-w / 2, yy - h / 2, w, h, 18); c.fill(); if (q < 0.98) c.stroke();
  }
  if (q > 0.98) { c.beginPath(); c.moveTo(-150, -2 * 80 - 40); c.lineTo(150, -2 * 80 - 40); c.lineTo(58, 2 * 80 + 40); c.lineTo(-58, 2 * 80 + 40); c.closePath(); c.stroke(); }
  c.restore();
}
// a simple figure that grows (baby → adult), cartoon, no face detail
function r13Person(c, x, y, h, t) {
  c.save(); c.translate(x, y); c.strokeStyle = KB.INK; c.lineCap = 'round'; c.lineWidth = 16; const k = h / 600;
  c.beginPath(); c.moveTo(0, -h * 0.55); c.lineTo(0, -h * 0.15); c.moveTo(0, -h * 0.15); c.lineTo(-90 * k, 0); c.moveTo(0, -h * 0.15); c.lineTo(90 * k, 0);
  c.moveTo(0, -h * 0.48); c.lineTo(-110 * k, -h * 0.3); c.moveTo(0, -h * 0.48); c.lineTo(110 * k, -h * 0.3); c.stroke();
  c.fillStyle = '#FFE2C2'; c.lineWidth = 10; c.beginPath(); c.arc(0, -h * 0.55 - 80 * k, 80 * k, 0, Math.PI * 2); c.fill(); c.stroke();
  c.restore(); kbEyes(c, x, y - h * 0.55 - 80 * k, 26 * k, t, 'kya', 9);
}

const SHOTS = {
  // 1 — hook: a bone with eyes; the counter 300 → 206
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    r13Bone(ctx, 540, 1060, 420, 1.05 * backOut(map(u, 0.05, 0.45)), -0.15, t, u > st[1] ? 'wow' : 'kya');
    post.ui = c => { kbBadge(c, R13_CAT.label, R13_CAT.col, ease(u, 0, 0.3)); (sh.card || []).forEach(([s, col], i) => { const q = i ? ease(u, st[1] - 0.05, st[1] + 0.3) : 1; if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 92, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }, 980); });
      const n = u < st[1] ? r13Count(u, 0, 300, 0.4, 1.6) : r13Count(u, 300, 206, st[1] + 0.1, st[1] + 1.3);
      text(c, String(n), 540, 800, { size: 150, weight: 900, color: u > st[1] ? KB.RED : KB.INK, stroke: 14, shadow: 0 }); };
  },
  // 2 — where did they go? nowhere: two bones slide together and become one
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    const j = easeOut(map(u, st[1] + 0.2, st[1] + 1.1));
    if (j < 1) { r13Bone(ctx, 540 - 260 * (1 - j), 1050, 260, 0.9, 0, t, u < st[1] ? 'hmm' : 'kya'); r13Bone(ctx, 540 + 260 * (1 - j), 1050, 260, 0.9, 0, t, u < st[1] ? 'hmm' : 'kya'); }
    else r13Bone(ctx, 540, 1050, 560, 0.9, 0, t, 'wow');
    if (j > 0.9 && j < 1.2) { ctx.fillStyle = KB.Y; for (let k = 0; k < 10; k++) { const a = k * 0.63 + t; ctx.beginPath(); ctx.arc(540 + Math.cos(a) * 160, 1050 + Math.sin(a) * 110, 10, 0, Math.PI * 2); ctx.fill(); } }
    post.ui = c => { kbBadge(c, R13_CAT.label, R13_CAT.col);
      kbLabel(c, u < st[1] ? 'BAAKI HADDIYAN KAHAN GAYIN?' : 'AAPAS MEIN JUD GAYIN!', 430, u, u < st[1] ? 0.2 : st[1], { size: 54, fill: u < st[1] ? KB.W : KB.Y }); };
  },
  // 3 — the baby skull: plates with soft spots that close in 1-2 years
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    r13Skull(ctx, 540, 1000, 1.05 * backOut(map(u, 0.05, 0.45)), easeOut(map(u, st[1] + 0.6, sh.dur - 0.6)), t);
    post.ui = c => { kbBadge(c, R13_CAT.label, R13_CAT.col);
      kbLabel(c, u < st[1] ? 'NARAM JAGAH (SOFT SPOT)' : '1-2 SAAL MEIN BAND!', 430, u, u < st[1] ? 0.4 : st[1], { size: 54, fill: u < st[1] ? KB.W : KB.Y });
      if (u < st[1] + 0.5) kbArrow(c, 790, 560, 600, 830, KB.INK, 12); };
  },
  // 4 — the real X-ray of a child's hand: gaps at the wrist (not joined yet) → kya baat hai
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 3);
    kbNight(ctx, t, '#0C1A2E', '#123050');
    post.ui = c => { kbBadge(c, R13_CAT.label, R13_CAT.col);
      kbProof(c, 'xray', u, 0.3, Math.max(4.2, st[2] - 0.5), 'ASLI X-RAY · BACHCHE KA HAATH', 'Jason Hickey · Wikimedia · CC BY 3.0', -0.03, {
        focus: [0.6, 0.55], zoomTo: 1.4, notes: [
          { x: 0.6, y: 0.63, r: 0.2, shape: 'box', at: Math.max(0.8, st[1] - 0.1), text: 'ABHI JUDI NAHI!', tx: 0.3, ty: 0.15 },
          { x: 0.64, y: 0.45, r: 0.15, at: Math.max(1.4, st[1] + 0.6) }] });
      kbKyaBaat(c, u, t, st[2]); };
  },
  // 5 — the bottom of the spine: 5 separate bones fuse into 1 by about 20-25
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    r13Sacrum(ctx, 540, 1030, 1.0 * backOut(map(u, 0.05, 0.45)), easeOut(map(u, st[1] + 0.2, st[1] + 1.8)), t);
    post.ui = c => { kbBadge(c, R13_CAT.label, R13_CAT.col);
      if (u < st[1]) kbLabel(c, 'PEHLE: 5 ALAG HADDIYAN', 430, u, 0.4, { size: 56 });
      else { kbStamp(c, '5 → 1', 540, 430, u, st[1] + 0.3, KB.RED, 120); kbLabel(c, '20-25 SAAL TAK', 640, u, st[1] + 1.0, { fill: KB.Y, size: 54 }); } };
  },
  // 6 — loop: you grew up and your bones got fewer; "that was when I was a baby!"
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    const g = easeOut(map(u, 0.2, Math.max(1.4, st[1] - 0.2)));
    r13Person(ctx, 540, 1320, 260 + 360 * g, t);
    post.ui = c => { kbBadge(c, R13_CAT.label, R13_CAT.col);
      if (u < st[1]) { const n = r13Count(u, 300, 206, 0.2, Math.max(1.4, st[1] - 0.2)); text(c, `HADDIYAN: ${n}`, 540, 460, { size: 80, weight: 900, color: KB.INK, stroke: 0, shadow: 0 }); }
      else kbStamp(c, '"WO TO BACHPAN MEIN THI!"', 540, 430, u, st[1] + 0.2, KB.RED, 68); };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
