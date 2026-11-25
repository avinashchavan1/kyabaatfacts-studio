// ===== R012 · ATM PIN sirf 4 digit ka kyun? (Paise Ki Kahani) — Kya Baat look =====
const KB_SAFE = true;                                   // safe-zone layout (v2)
const SUB_STYLE = { maxW: 640, bottom: 1400 };
const R12_CAT = { label: 'PAISE KI KAHANI', col: '#289650' };
function buildScenes() { return kbLoadImg('keypad', 'proof_keypad.jpg'); }

// a friendly cash machine: body, screen (with PIN dots), keypad, cash slot; eyes on the screen frame
function r12ATM(c, x, y, s, t, o = {}) {
  const { dots = 0, total = 4, screen = 'ENTER PIN', cash = 0, eyes = 'kya', old = false } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = KB.INK; c.lineWidth = 10;
  c.fillStyle = old ? '#8C7A63' : '#C9D3DE'; c.beginPath(); c.roundRect(-230, -330, 460, 660, 30); c.fill(); c.stroke();
  c.fillStyle = '#16324F'; c.beginPath(); c.roundRect(-170, -270, 340, 200, 16); c.fill(); c.stroke();
  text(c, screen, 0, -205, { size: 36, weight: 900, color: '#7CF2A6', shadow: 0 });
  for (let i = 0; i < total; i++) { const cx = (i - (total - 1) / 2) * 56, on = i < dots;
    c.fillStyle = on ? '#7CF2A6' : 'rgba(124,242,166,0.25)'; c.beginPath(); c.arc(cx, -135, 17, 0, Math.PI * 2); c.fill(); }
  c.fillStyle = '#E8EDF2';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) { c.beginPath(); c.roundRect(-120 + k * 85, -30 + r * 62, 70, 48, 10); c.fill(); c.stroke(); }
  c.fillStyle = KB.INK; c.beginPath(); c.roundRect(-150, 240, 300, 26, 8); c.fill();
  if (cash > 0) { c.fillStyle = '#7BC67E'; c.beginPath(); c.roundRect(-110, 240 + 10 * (1 - cash), 220, 70 * cash, 6); c.fill(); c.stroke(); text(c, '£10', 0, 240 + 55 * cash, { size: 40 * cash, weight: 900, color: KB.INK, shadow: 0 }); }
  c.restore();
  if (eyes) kbEyes(c, x, y - 330 * s - 4, 34 * s, t, eyes, 12);
}
// a thought / speech bubble with a row of PIN dots (some can fall away)
function r12Bubble(c, x, y, w, h, tailX, tailY) {
  c.save(); c.fillStyle = KB.W; c.strokeStyle = KB.INK; c.lineWidth = 9; c.lineJoin = 'round';
  c.beginPath(); c.roundRect(x - w / 2, y - h / 2, w, h, 40); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(x - 40, y + h / 2 - 4); c.lineTo(tailX, tailY); c.lineTo(x + 30, y + h / 2 - 4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = KB.W; c.fillRect(x - 36, y + h / 2 - 12, 62, 14); c.restore();
}
function r12Dots(c, x, y, n, fallFrom, fall, col = KB.INK) {
  for (let i = 0; i < n; i++) { const cx = x + (i - (n - 1) / 2) * 92, f = i >= fallFrom ? fall : 0;
    c.save(); c.globalAlpha = 1 - Math.min(1, f * 1.2); c.translate(cx + f * (i - 3.5) * 60, y + f * f * 600); c.rotate(f * 2);
    c.fillStyle = col; c.beginPath(); c.arc(0, 0, 30, 0, Math.PI * 2); c.fill(); c.restore(); }
}
function r12Brick(ctx, t) {
  ctx.fillStyle = '#B5542E'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(60,20,10,0.35)'; ctx.lineWidth = 4;
  for (let r = 0; r * 60 < H; r++) for (let k = -1; k * 150 < W; k++) ctx.strokeRect(k * 150 + (r % 2) * 75, r * 60, 150, 60);
  ctx.fillStyle = 'rgba(20,18,58,0.25)'; ctx.fillRect(0, 0, W, H);
}
function r12Cheque(c, x, y, s, t, glow) {
  c.save(); c.translate(x, y); c.rotate(-0.08); c.scale(s, s); c.fillStyle = '#F3E9C8'; c.strokeStyle = KB.INK; c.lineWidth = 9;
  c.beginPath(); c.roundRect(-300, -140, 600, 280, 16); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(20,18,58,0.4)'; c.lineWidth = 6; [-60, 0, 60].forEach((yy) => { c.beginPath(); c.moveTo(-250, yy); c.lineTo(120, yy); c.stroke(); });
  // the radioactive marker (trefoil), glowing softly
  c.save(); c.translate(200, 10); c.shadowColor = '#7CF2A6'; c.shadowBlur = 20 + 16 * Math.sin(t * 5) * glow; c.fillStyle = '#FFD23F'; c.beginPath(); c.arc(0, 0, 70, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0;
  c.strokeStyle = KB.INK; c.lineWidth = 6; c.stroke(); c.fillStyle = KB.INK;
  for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 3; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 58, a - 0.5, a + 0.5); c.closePath(); c.fill(); }
  c.fillStyle = '#FFD23F'; c.beginPath(); c.arc(0, 0, 14, 0, Math.PI * 2); c.fill(); c.fillStyle = KB.INK; c.beginPath(); c.arc(0, 0, 9, 0, Math.PI * 2); c.fill();
  c.restore(); c.restore();
}

const SHOTS = {
  // 1 — hook: a cash machine asking for a 4-dot PIN; the dots fill in
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    r12ATM(ctx, 540, 1060, 0.95 * backOut(map(u, 0.05, 0.45)), t, { dots: Math.floor(Math.min(4, map(u, 0.5, 1.8) * 4.99)), eyes: u > st[1] ? 'wow' : 'kya' });
    post.ui = c => { kbBadge(c, R12_CAT.label, R12_CAT.col, ease(u, 0, 0.3)); (sh.card || []).forEach(([s, col], i) => { const q = i ? ease(u, st[1] - 0.05, st[1] + 0.3) : 1; if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 100, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }, 980); }); };
  },
  // 2 — 1967: the world's first cash machine, in a brick wall in Enfield, near London
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r12Brick(ctx, t);
    r12ATM(ctx, 540, 1080, 0.85, t, { old: true, screen: '1967', total: 0, eyes: 'kya', cash: ease(u, st[1] + 1.0, st[1] + 1.6) });
    post.ui = c => { kbBadge(c, R12_CAT.label, R12_CAT.col); kbStamp(c, 'DUNIYA KI PEHLI CASH MACHINE', 540, 430, u, 0.2, KB.Y, 64);
      if (u > st[1]) kbPin(c, 790, 640, 'ENFIELD · LONDON', u, st[1] + 0.2, KB.RED); };
  },
  // 3 — the inventor wanted a 6-digit PIN: a thought bubble with six dots
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    // a light bulb idea with eyes (no portrait of the real person)
    const bq = backOut(map(u, 0.1, 0.5));
    if (bq > 0) { ctx.save(); ctx.translate(540, 1180); ctx.scale(bq, bq); ctx.fillStyle = '#FFE680'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 10;
      ctx.beginPath(); ctx.arc(0, -40, 130, Math.PI * 0.8, Math.PI * 2.2); ctx.lineTo(55, 90); ctx.lineTo(-55, 90); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#9AA4B2'; ctx.beginPath(); ctx.roundRect(-60, 90, 120, 70, 12); ctx.fill(); ctx.stroke(); ctx.restore(); kbEyes(ctx, 540, 1140, 30 * bq, t, 'hmm', 5); }
    if (u > st[1]) { r12Bubble(ctx, 540, 830, 680, 200, 560, 1030); r12Dots(ctx, 540, 830, Math.min(6, Math.floor(map(u, st[1] + 0.2, st[1] + 1.4) * 6.99)), 9, 0); }
    post.ui = c => { kbBadge(c, R12_CAT.label, R12_CAT.col); kbStamp(c, 'INVENTOR: JOHN SHEPHERD-BARRON', 540, 430, u, 0.2, KB.Y, 58);
      if (u > st[1] + 1.4) kbLabel(c, 'PIN = 6 DIGIT?', 600, u, st[1] + 1.4, { size: 56 }); };
  },
  // 4 — Caroline: "six? I only remember four!" → two dots fall away → real keypad with 4 keys circled → kya baat hai
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 3);
    kbYellow(ctx, t);
    const fall = map(u, st[1] - 0.6, st[1] + 0.4);
    r12Bubble(ctx, 540, 900, 680, 200, 520, 1180); r12Dots(ctx, 540, 900, 6, 4, fall, fall > 0.6 ? KB.RED : KB.INK);
    kbHeart(ctx, 540, 1130, 1.0, KB.RED, 1 + 0.06 * Math.sin(t * 6));
    post.ui = c => { kbBadge(c, R12_CAT.label, R12_CAT.col);
      kbLabel(c, u < st[1] ? '"CHHAH? MUJHE BAS 4 YAAD!"' : 'PIN = 4 DIGIT!', 560, u, u < st[1] ? 0.3 : st[1], { fill: u < st[1] ? KB.W : KB.Y, size: 52 });
      kbStamp(c, 'CAROLINE KI WAJAH SE!', 540, 430, u, st[1] + 0.3, KB.RED, 72);
      kbProof(c, 'keypad', u, st[1] + 1.2, Math.max(4.0, st[2] - st[1] - 1.5), 'ASLI ATM KEYPAD', 'Photo: rawpixel · CC0', -0.03, {
        focus: [0.5, 0.45], zoomTo: 1.15, notes: [
          { x: 0.31, y: 0.15, r: 0.08, at: 0.8 }, { x: 0.77, y: 0.34, r: 0.08, at: 1.3 }, { x: 0.28, y: 0.56, r: 0.08, at: 1.8 },
          { x: 0.76, y: 0.56, r: 0.08, at: 2.3, text: 'SIRF 4 DIGIT!', tx: 0.5, ty: -0.12 }] });
      kbKyaBaat(c, u, t, st[2]); };
  },
  // 5 — no plastic card: a special cheque with a little radioactive carbon-14; and only £10 at a time
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbNight(ctx, t, '#14123A', '#2B276A');
    if (u < st[1]) { const q = backOut(map(u, 0.1, 0.5)); ctx.save(); ctx.translate(540, 1050); ctx.scale(q, q); ctx.fillStyle = '#4A93E4'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 10;
      ctx.beginPath(); ctx.roundRect(-250, -160, 500, 320, 30); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#FFD23F'; ctx.beginPath(); ctx.roundRect(-180, -60, 100, 80, 12); ctx.fill(); ctx.stroke(); ctx.restore();
      kbX(ctx, 540, 1050, map(u, 0.9, 1.3)); }
    else r12Cheque(ctx, 540, 1040, 1.25 * backOut(map(u, st[1], st[1] + 0.4)), t, 1);
    post.ui = c => { kbBadge(c, R12_CAT.label, R12_CAT.col);
      if (u < st[1]) kbLabel(c, 'CARD? NAHI THA!', 430, u, 0.3, { size: 60 });
      else { kbLabel(c, 'CARBON-14 WALA CHEQUE ☢️', 430, u, st[1] + 0.1, { fill: KB.Y, size: 52 }); const late = st[1] + Math.max(1.2, (sh.dur - st[1]) * 0.55); kbStamp(c, 'EK BAAR MEIN: SIRF £10', 540, 620, u, late, KB.RED, 72); } };
  },
  // 6 — loop: next time you type your 4-digit PIN, thank Caroline
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    r12ATM(ctx, 540, 1060, 0.95, t, { dots: Math.floor(Math.min(4, map(u, 0.3, 1.5) * 4.99)), eyes: u > st[1] ? 'sach' : 'kya', screen: u > st[1] ? 'THANK YOU!' : 'ENTER PIN' });
    if (u > st[1]) [[300, 760, 0], [800, 820, 0.7], [250, 1250, 1.3], [830, 1300, 2]].forEach(([x, y, ph]) => kbHeart(ctx, x, y - Math.sin(t * 2 + ph) * 14, 0.9, KB.RED, 1));
    post.ui = c => { kbBadge(c, R12_CAT.label, R12_CAT.col); kbStamp(c, u > st[1] ? 'THANK YOU, CAROLINE! 💛' : '4 DIGIT KA PIN...', 540, 430, u, u > st[1] ? st[1] + 0.1 : 0.2, u > st[1] ? KB.RED : KB.Y, 76); };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
// a red cross over the old-style card
function kbX(c, x, y, q) { if (q <= 0) return; c.save(); c.translate(x, y); c.scale(q, q); c.strokeStyle = KB.RED; c.lineWidth = 34; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-180, -140); c.lineTo(180, 140); c.moveTo(180, -140); c.lineTo(-180, 140); c.stroke(); c.restore(); }
