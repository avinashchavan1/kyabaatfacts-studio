// ===== R004 · Kailasa Mandir: ek hi chattan, upar se neeche (Desh Ke Ajoobe) — Kya Baat look =====
const KB_SAFE = true;                                   // safe-zone layout (v2)
const SUB_STYLE = { maxW: 640, bottom: 1400 };
const R4_CAT = { label: 'DESH KE AJOOBE', col: '#F06E28' };
function buildScenes() { return Promise.all([kbLoadImg('top', 'proof_kailasa_top.jpg'), kbLoadImg('scarp', 'proof_kailasa_scarp.jpg')]); }

const R4_ROCK = '#8C6A4F', R4_ROCK2 = '#6E513C', R4_STONE = '#B98E6B';
function r4Sky(ctx, top = '#FFB36B', bot = '#FFE3A8') { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
// the rock scarp: a big basalt block (ground level y0 .. y1)
function r4Rock(c, x0, y0, x1, y1) {
  c.save(); c.fillStyle = R4_ROCK; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.moveTo(x0, y1); c.lineTo(x0, y0 + 30); c.lineTo(x0 + 80, y0); c.lineTo(x1 - 60, y0 + 10); c.lineTo(x1, y0 + 50); c.lineTo(x1, y1); c.closePath(); c.fill(); c.stroke();
  const r = rng(9); c.strokeStyle = rgba(KB.INK, 0.35); c.lineWidth = 5; for (let k = 0; k < 14; k++) { const x = x0 + r() * (x1 - x0), y = y0 + 40 + r() * (y1 - y0 - 60); c.beginPath(); c.moveTo(x, y); c.lineTo(x + 40 + r() * 60, y + (r() - 0.5) * 20); c.stroke(); }
  c.restore();
}
// the temple carved inside the rock: pit + platform + mandapa + stepped shikhara. reveal 0..1 = carved from the TOP down
function r4Temple(c, cx, base, s, reveal = 1) {
  c.save(); c.translate(cx, base); c.scale(s, s);
  const top = -760, cut = top + (40 - top) * reveal;          // carving line moves down
  c.save(); c.beginPath(); c.rect(-520, top - 60, 1040, cut - top + 60); c.clip();
  c.fillStyle = R4_ROCK2; c.fillRect(-520, top - 60, 1040, 860);  // the excavated pit (shadow)
  c.lineWidth = 9; c.strokeStyle = KB.INK; c.lineJoin = 'round';
  const B = (x, y, w, h, col = R4_STONE) => { c.fillStyle = col; c.beginPath(); c.rect(x, y, w, h); c.fill(); c.stroke(); };
  B(-420, -60, 840, 100);                                       // plinth
  for (let k = -3; k <= 3; k++) { c.fillStyle = '#9C7656'; c.beginPath(); c.ellipse(k * 115, -10, 34, 26, 0, 0, Math.PI * 2); c.fill(); c.stroke(); }   // elephant frieze (simplified)
  B(-330, -260, 380, 200);                                     // mandapa
  for (let k = 0; k < 4; k++) B(-310 + k * 92, -240, 30, 170, '#A57E5E');
  for (let k = 0; k < 6; k++) { const w = 300 - k * 44, h = 72; B(80 - w / 2 + 70, -260 - (k + 1) * h, w, h); }   // shikhara (stepped)
  c.fillStyle = '#D9A55A'; c.beginPath(); c.arc(150, -260 - 6 * 72 - 30, 34, 0, Math.PI * 2); c.fill(); c.stroke();   // amalaka / kalash
  B(-470, -200, 70, 160); B(400, -200, 70, 160);                // side shrines
  c.restore();
  if (reveal < 1) { c.strokeStyle = KB.Y; c.lineWidth = 12; c.setLineDash([30, 20]); c.beginPath(); c.moveTo(-540, cut); c.lineTo(540, cut); c.stroke(); c.setLineDash([]); }
  c.restore();
  return cut * s + base;
}
function r4Chisel(c, x, y, u) {
  const k = Math.abs(Math.sin(u * 14)) * 18; c.save(); c.translate(x, y - k); c.rotate(-0.5); c.fillStyle = '#C9CED6'; c.strokeStyle = KB.INK; c.lineWidth = 7;
  c.beginPath(); c.moveTo(-14, -120); c.lineTo(14, -120); c.lineTo(10, 0); c.lineTo(0, 22); c.lineTo(-10, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#8A5A2A'; c.beginPath(); c.roundRect(-22, -200, 44, 90, 12); c.fill(); c.stroke(); c.restore();
  for (let i = 0; i < 4; i++) { const a = u * 20 + i * 1.7, d = (u * 300 + i * 40) % 90; c.fillStyle = R4_STONE; c.beginPath(); c.arc(x + Math.cos(a) * d, y + 10 + Math.abs(Math.sin(a)) * d * 0.5, 8, 0, Math.PI * 2); c.fill(); }
}
function r4Brick(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#C8553D'; c.strokeStyle = KB.INK; c.lineWidth = 8; c.beginPath(); c.roundRect(-90, -45, 180, 90, 10); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-90, 0); c.lineTo(90, 0); c.moveTo(0, -45); c.lineTo(0, 0); c.stroke(); c.restore(); }

const SHOTS = {
  // 1 — hook: a temple with no bricks? (brick crossed out, a huge rock)
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r4Sky(ctx); r4Rock(ctx, 60, 900, 1020, 1560);
    ctx.fillStyle = '#C9A06A'; ctx.fillRect(0, 1560, W, H - 1560);
    post.ui = c => {
      kbBadge(c, R4_CAT.label, R4_CAT.col, ease(u, 0, 0.3));
      (sh.card || []).forEach(([s, col], i) => { const q = i ? ease(u, st[1] - 0.05, st[1] + 0.3) : 1; if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 100, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }); });
      const b = backOut(map(u, st[1] + 0.2, st[1] + 0.6)); if (b > 0) { c.save(); c.translate(540, 760); c.scale(b, b); r4Brick(c, 0, 0, 1); c.strokeStyle = KB.RED; c.lineWidth = 18; c.lineCap = 'round'; c.beginPath(); c.moveTo(-120, -80); c.lineTo(120, 80); c.moveTo(120, -80); c.lineTo(-120, 80); c.stroke(); c.restore(); }
    };
  },
  // 2 — Ellora, Maharashtra: the temple appears inside one rock
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r4Sky(ctx, '#FF9B5C', '#FFE0A8'); r4Rock(ctx, 40, 760, 1040, 1560);
    r4Temple(ctx, 470, 1500, 0.95, easeOut(map(u, st[1], st[1] + 1.6)));
    ctx.fillStyle = '#C9A06A'; ctx.fillRect(0, 1560, W, H - 1560);
    post.ui = c => { kbBadge(c, R4_CAT.label, R4_CAT.col); kbPin(c, 640, 650, 'ELLORA, MAHARASHTRA', u, 0.3); kbStamp(c, 'EK HI CHATTAN!', 540, 420, u, st[1] + 1.0, KB.RED, 104); kbProof(c, 'top', u, Math.min(st[1] + 1.6, sh.dur - 2.3), 2.1, 'ASLI KAILASA', 'Photo: Arian Zwegers / Flickr · CC BY 2.0'); };
  },
  // 3 — not bottom-up… TOP-DOWN: the carving line moves down, chisel at work
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r4Sky(ctx, '#8EC5F0', '#E2F1FB'); r4Rock(ctx, 40, 760, 1040, 1560);
    const rv = u < st[1] ? 0.05 : easeOut(map(u, st[1], sh.dur - 0.2)) * 0.85 + 0.05;
    const cy = r4Temple(ctx, 470, 1500, 0.95, rv);
    ctx.fillStyle = '#C9A06A'; ctx.fillRect(0, 1560, W, H - 1560);
    if (u >= st[1]) r4Chisel(ctx, 760, cy, u);
    post.ui = c => {
      kbBadge(c, R4_CAT.label, R4_CAT.col);
      if (u < st[1]) kbLabel(c, 'NEECHE SE UPAR? ✗', 330, u, 0.2); else { kbLabel(c, 'UPAR SE NEECHE!', 330, u, st[1], { fill: KB.Y }); kbArrow(c, 140, 820, 140, 1300, KB.INK, 16); }
    };
  },
  // 4 — no undo: a crack + "NO UNDO!", then the catchphrase
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r4Sky(ctx, '#8EC5F0', '#E2F1FB'); r4Rock(ctx, 40, 760, 1040, 1560);
    r4Temple(ctx, 470, 1500, 0.95, 0.75); ctx.fillStyle = '#C9A06A'; ctx.fillRect(0, 1560, W, H - 1560);
    post.ui = c => { kbBadge(c, R4_CAT.label, R4_CAT.col); kbLabel(c, 'EK GALTI = KHEL KHATAM', 330, u, 0.2, { size: 50 }); kbStamp(c, 'NO UNDO!', 540, 620, u, st[1] * 0.45, KB.RED, 110, 0.06); kbKyaBaat(c, u, t, st[1]); };
  },
  // 5 — size: 300 ft × 175 ft, a tiny person for scale
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r4Sky(ctx, '#FFC97A', '#FFEBC2'); r4Rock(ctx, 20, 760, 1060, 1560);
    r4Temple(ctx, 500, 1500, 0.98, 1); ctx.fillStyle = '#C9A06A'; ctx.fillRect(0, 1560, W, H - 1560);
    ctx.fillStyle = KB.INK; ctx.beginPath(); ctx.arc(1000, 1478, 9, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(994, 1488, 12, 30);   // tiny person
    post.ui = c => {
      kbBadge(c, R4_CAT.label, R4_CAT.col);
      const pe = Math.min(2.2, st[1] - 0.2), a1 = ease(u, pe + 0.1, pe + 0.5), a2 = ease(u, st[1], st[1] + 0.4);
      if (a1 > 0) { c.save(); c.globalAlpha = a1; kbArrow(c, 160, 1420, 840, 1420, KB.INK, 10); kbArrow(c, 840, 1420, 160, 1420, KB.INK, 10); c.restore(); kbStamp(c, '~300 FT LAMBA', 540, 380, u, pe + 0.1, KB.RED, 84, -0.04); }
      kbProof(c, 'scarp', u, 0.1, pe - 0.1, 'POORI CHATTAN', 'Photo: Arian Zwegers / Flickr · CC BY 2.0', 0.03);
      if (a2 > 0) kbStamp(c, '~175 FT CHAUDA', 540, 560, u, st[1], '#F06E28', 84, 0.04);
    };
  },
  // 6 — 1,200+ years ago (Rashtrakuta) → today a UNESCO World Heritage Site
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r4Sky(ctx, '#3B3585', '#FF9B5C'); glow(ctx, 540, 1100, 500, '#FFB36B', 0.4);
    r4Rock(ctx, 40, 760, 1040, 1560); r4Temple(ctx, 470, 1500, 0.95, 1); ctx.fillStyle = '#7A5A3C'; ctx.fillRect(0, 1560, W, H - 1560);
    post.ui = c => {
      kbBadge(c, R4_CAT.label, R4_CAT.col);
      if (u < st[1]) { kbStamp(c, '1,200+ SAAL PEHLE', 540, 400, u, 0.4, KB.RED, 88); kbLabel(c, 'RASHTRAKUTA RAJAON KA SAMAY', 520, u, 1.0, { size: 44 }); }
      else { const b = backOut(map(u, st[1], st[1] + 0.4)); c.save(); c.translate(540, 470); c.scale(b, b); kbPanel(c, -330, -110, 660, 220, KB.Y, 40); text(c, 'UNESCO', 0, -10, { size: 84, weight: 900, color: KB.INK, shadow: 0 }); text(c, 'WORLD HERITAGE', 0, 62, { size: 46, weight: 900, color: KB.INK, shadow: 0 }); c.restore(); }
    };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
