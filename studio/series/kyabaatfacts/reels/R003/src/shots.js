// ===== R003 · Octopus ke 3 dil aur neela khoon (Jaanwaron Ki Duniya) — Kya Baat look =====
const R3_CAT = { label: 'JAANWARON KI DUNIYA', col: '#58AA32' };
const R3_FACTS = { 2: { big: '3 DIL', label: 'OCTOPUS', src: 'LIVE SCIENCE · SMITHSONIAN' } };
function buildScenes() { return kbLoadImg('octo', 'proof_octopus.jpg'); }

function r3Sea(ctx, t, top = '#1E7FB8', bot = '#0C2A5C') {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = '#FFFFFF'; for (let k = 0; k < 5; k++) { const x = 100 + k * 220 + Math.sin(t * 0.7 + k) * 40; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 120, 0); ctx.lineTo(x + 260, H * 0.8); ctx.lineTo(x + 40, H * 0.8); ctx.fill(); } ctx.restore();
  kbBubbles(ctx, t, 22, 5);
}
function r3Floor(ctx, t) {
  ctx.fillStyle = '#E8C89A'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 1500); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 1490 + Math.sin(x * 0.012) * 18); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); ctx.stroke();
  for (const [x, h, col] of [[120, 220, '#2E9E6B'], [930, 280, '#3FB46A'], [990, 180, '#E24682']]) { ctx.strokeStyle = col; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, 1500); for (let k = 1; k <= 6; k++) ctx.lineTo(x + Math.sin(t * 1.5 + k) * 18, 1500 - h * k / 6); ctx.stroke(); }
}
// the octopus: mantle + googly eyes + 8 wavy arms. xray shows the 3 hearts; blood colour for the hearts
function r3Octo(c, x, y, s, t, o = {}) {
  const { mood = 'kya', xray = 0, swim = 0, body = '#B05BD6', heartCol = '#3B7BFF', hearts = 1, stopBig = false } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.lineCap = 'round';
  for (let a = 0; a < 8; a++) {      // arms
    const base = -0.9 + a * (1.8 / 7), len = 330 - Math.abs(a - 3.5) * 18;
    c.strokeStyle = KB.INK; c.lineWidth = 44; const pts = [];
    for (let k = 0; k <= 10; k++) { const f = k / 10, ang = base + Math.sin(t * 2.4 + a * 0.9 + f * 3) * 0.25 * f + swim * (a < 4 ? -0.3 : 0.3) * f; pts.push([Math.sin(ang) * len * f * (1 - swim * 0.5) + Math.sin(ang) * 40, 60 + Math.cos(ang) * len * f]); }
    c.beginPath(); pts.forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.stroke();
    c.strokeStyle = body; c.lineWidth = 30; c.beginPath(); pts.forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.stroke();
  }
  c.fillStyle = body; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.ellipse(0, -60, 190, 220, 0, 0, Math.PI * 2); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,0.25)'; c.beginPath(); c.ellipse(-70, -170, 50, 80, -0.4, 0, Math.PI * 2); c.fill();
  if (xray > 0) {
    c.save(); c.globalAlpha = xray; c.fillStyle = 'rgba(20,18,58,0.55)'; c.beginPath(); c.ellipse(0, -60, 175, 205, 0, 0, Math.PI * 2); c.fill();
    const beat = 1 + Math.sin(t * 9) * 0.08, bigBeat = stopBig ? 1 : 1 + Math.sin(t * 7) * 0.1;
    kbHeart(c, -95, -10, 0.85, heartCol, beat); kbHeart(c, 95, -10, 0.85, heartCol, beat); kbHeart(c, 0, -110, 1.35, heartCol, bigBeat);
    c.restore();
  }
  kbEyes(c, 0, xray > 0.5 ? -230 : -40, 46, t, mood, 4);
  c.restore();
}
function r3Drop(c, x, y, s, col, label) {
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 10;
  c.beginPath(); c.moveTo(0, -150); c.bezierCurveTo(70, -40, 110, 20, 110, 70); c.arc(0, 70, 110, 0, Math.PI); c.bezierCurveTo(-110, 20, -70, -40, 0, -150); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.ellipse(-40, 40, 20, 40, 0.3, 0, Math.PI * 2); c.fill(); c.restore();
  if (label) text(c, label, x, y + 250 * s, { size: 56, weight: 900, color: KB.W, stroke: 12, shadow: 0 });
}
function r3Tile(c, x, y, sym, name, col, a = 1) {
  c.save(); c.globalAlpha = a; kbPanel(c, x - 110, y - 110, 220, 220, col, 26, 12); c.restore();
  text(c, sym, x, y + 30, { size: 110, weight: 900, color: KB.INK, alpha: a, shadow: 0 }); text(c, name, x, y + 85, { size: 30, weight: 900, color: KB.INK, alpha: a, shadow: 0 });
}

const SHOTS = {
  // 1 — hook: your 1 heart vs the octopus "?"
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r3Sea(ctx, t); r3Floor(ctx, t);
    ctx.save(); ctx.globalAlpha = ease(u, st[1], st[1] + 0.5); r3Octo(ctx, 760, 1180, 0.75, t, { mood: 'hmm' }); ctx.restore();
    post.ui = c => {
      kbBadge(c, R3_CAT.label, R3_CAT.col, ease(u, 0, 0.3));
      (sh.card || []).forEach(([s, col], i) => { const q = ease(u, (i ? st[1] : 0.05) - 0.05, (i ? st[1] : 0.05) + 0.3); if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 104, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }); });
      const b = backOut(map(u, 0.6, 1.0)); if (b > 0) { c.save(); c.translate(300, 1000); c.scale(b, b); kbHeart(c, 0, 0, 2.2, KB.RED, 1 + Math.sin(u * 7) * 0.06); c.restore(); text(c, '1', 300, 1030, { size: 90, weight: 900, color: KB.W, shadow: 0, alpha: b > 0.5 ? 1 : 0 }); }
    };
  },
  // 2 — "three whole hearts!": the octopus pops in, 3 hearts pop above
  2(ctx, u, p, sh, t, post) {
    r3Sea(ctx, t); r3Floor(ctx, t);
    const b = backOut(map(u, 1.75, 2.1)); r3Octo(ctx, 540, 1200, 0.9 * b, t, { mood: 'wow' });
    post.ui = c => {
      kbBadge(c, R3_CAT.label, R3_CAT.col);
      [[330, 2.05], [540, 2.3], [750, 2.55]].forEach(([x, at]) => { const q = backOut(map(u, at, at + 0.3)); if (q > 0) kbHeart(c, x, 560, 1.6 * q, KB.RED, 1 + Math.sin(t * 8 + x) * 0.06); });
      kbStamp(c, '3 DIL!', 540, 360, u, 2.8, KB.RED, 120);
      kbProof(c, 'octo', u, 0.0, 1.9, 'ASLI OCTOPUS', 'Photo: Wikimedia Commons · Public domain');
    };
  },
  // 3 — x-ray: 2 gill hearts + 1 big body heart
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r3Sea(ctx, t, '#155E8C', '#0A1F45');
    r3Octo(ctx, 540, 1150, 1.05, t, { xray: ease(u, 0.2, 0.8), heartCol: KB.RED });
    post.ui = c => {
      kbBadge(c, R3_CAT.label, R3_CAT.col);
      const q1 = ease(u, 0.6, 1.0), q2 = ease(u, st[1], st[1] + 0.4);
      if (q1 > 0) { kbLabel(c, '2 CHHOTE DIL → GALPHADE', 320, u, 0.6, { size: 46 }); kbArrow(c, 250, 1300, 380, 1170, KB.Y, 10); kbArrow(c, 830, 1300, 700, 1170, KB.Y, 10); }
      if (q2 > 0) kbLabel(c, '1 BADA DIL → POORA SHARIR', 520, u, st[1], { size: 46, fill: KB.Y });
    };
  },
  // 4 — blood: red → BLUE, then the catchphrase
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r3Sea(ctx, t);
    const k = easeOut(map(u, st[1] * 0.45, st[1] * 0.75)); const col = k < 0.5 ? KB.RED : '#3B7BFF';
    ctx.save(); kbShake(ctx, u, st[1] * 0.6, 14); r3Drop(ctx, 540, 1000, 1.7 * (1 + (k > 0 && k < 1 ? Math.sin(k * Math.PI) * 0.12 : 0)), col); ctx.restore();
    post.ui = c => { kbBadge(c, R3_CAT.label, R3_CAT.col); if (k < 0.5) kbLabel(c, 'LAAL?', 320, u, 0.2); else kbStamp(c, 'NEELA!', 540, 420, u, st[1] * 0.62, '#3B7BFF', 130); kbKyaBaat(c, u, t, st[1]); };
  },
  // 5 — why: iron (Fe) → red, copper (Cu) → blue
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    const a1 = ease(u, 0.3, 0.7), a2 = ease(u, st[1], st[1] + 0.4);
    if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1; r3Drop(ctx, 300, 1130, 0.9, KB.RED); ctx.restore(); r3Tile(ctx, 300, 760, 'Fe', 'LOHA · IRON', '#FFB3A8', a1); text(ctx, 'HUM', 300, 1420, { size: 60, weight: 900, color: KB.INK, alpha: a1, shadow: 0 }); }
    if (a2 > 0) { ctx.save(); ctx.globalAlpha = a2; r3Drop(ctx, 780, 1130, 0.9, '#3B7BFF'); ctx.restore(); r3Tile(ctx, 780, 760, 'Cu', 'TAANBA · COPPER', '#9BD3FF', a2); text(ctx, 'OCTOPUS', 780, 1420, { size: 60, weight: 900, color: KB.INK, alpha: a2, shadow: 0 }); }
    post.ui = c => { kbBadge(c, R3_CAT.label, R3_CAT.col); kbLabel(c, 'KHOON KA RANG KYUN?', 330, u, 0.05); };
  },
  // 6 — the twist: swimming → the big heart pauses; maybe that's why it crawls
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2), s2 = st[1], swimming = u < s2;
    r3Sea(ctx, t); r3Floor(ctx, t);
    if (swimming) { const f = u / s2; r3Octo(ctx, lerp(300, 760, f), 1000 - Math.sin(f * Math.PI) * 200, 0.7, t, { mood: 'hmm', swim: 0.6 + Math.sin(u * 5) * 0.3, xray: ease(u, 0.8, 1.3), heartCol: KB.RED, stopBig: u > 1.4 }); }
    else { const f = (u - s2) / (sh.dur - s2); r3Octo(ctx, lerp(820, 380, f), 1330, 0.6, t, { mood: 'kya' }); }
    post.ui = c => {
      kbBadge(c, R3_CAT.label, R3_CAT.col);
      if (swimming) { if (u > 1.4) kbStamp(c, 'BADA DIL: PAUSE!', 540, 430, u, 1.4, KB.RED, 76, -0.05); }
      else kbLabel(c, 'SHAYAD ISLIYE... RENGTA HAI!', 320, u, s2 + 0.2, { size: 48, fill: KB.Y });
    };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
