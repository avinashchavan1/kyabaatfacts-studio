// ===== R014 · Akbar padh-likh nahi sakte the, phir bhi empire kaise chalaya? (Itihaas Ke Raaz) — Kya Baat look =====
// Akbar is shown only as symbols (turban, book, pen, coins): no invented face for a real person.
const KB_SAFE = true;                                   // safe-zone layout (v2)
const SUB_STYLE = { maxW: 640, bottom: 1400 };
const R14_CAT = { label: 'ITIHAAS KE RAAZ', col: '#C47832' };
function buildScenes() { return kbLoadImg('razm', 'proof_razmnama.jpg'); }

// a Mughal turban (white with gold band, red jewel, plume) — the "Akbar" symbol
function r14Turban(c, x, y, s, t = 0) {
  c.save(); c.translate(x, y + Math.sin(t * 2) * 6); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = KB.INK; c.lineWidth = 12;
  c.fillStyle = rgba(KB.INK, 0.9); c.beginPath(); c.ellipse(16, 20, 230, 140, 0, 0, Math.PI * 2); c.fill();                 // hard shadow
  c.fillStyle = '#FFF6E4'; c.beginPath(); c.ellipse(0, 0, 230, 140, 0, 0, Math.PI * 2); c.fill(); c.stroke();
  c.strokeStyle = rgba('#C9A15A', 0.9); c.lineWidth = 8;                                                                       // wrap folds
  for (let i = -2; i <= 2; i++) { c.beginPath(); c.ellipse(0, i * 22, 220 - Math.abs(i) * 18, 50, -0.12 * i, Math.PI * 0.1, Math.PI * 0.9); c.stroke(); }
  c.fillStyle = '#E6B450'; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.roundRect(-230, 70, 460, 56, 26); c.fill(); c.stroke();   // gold band
  c.fillStyle = KB.RED; c.beginPath(); c.ellipse(0, -40, 34, 44, 0, 0, Math.PI * 2); c.fill(); c.stroke();                     // jewel
  c.fillStyle = '#fff'; c.beginPath(); c.arc(-10, -54, 9, 0, Math.PI * 2); c.fill();
  c.save(); c.translate(0, -84); c.rotate(0.2 + Math.sin(t * 3) * 0.06); c.fillStyle = '#FFFFFF'; c.lineWidth = 9;            // plume
  c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-60, -110, 10, -210); c.quadraticCurveTo(50, -110, 0, 0); c.fill(); c.stroke(); c.restore();
  c.restore();
}
// an open (q=1) or closed (q=0) book with Persian-like squiggle lines
function r14Book(c, x, y, s, q = 1, t = 0, lines = 1) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = KB.INK; c.lineWidth = 12;
  const w = 220 * (0.35 + 0.65 * q);
  c.fillStyle = KB.INK; c.beginPath(); c.roundRect(-w + 18, -150 + 18, 2 * w, 300, 22); c.fill();
  c.fillStyle = '#8B3A1E'; c.beginPath(); c.roundRect(-w - 14, -162, 2 * w + 28, 324, 24); c.fill(); c.stroke();                // cover
  c.fillStyle = '#FFF6E4'; c.beginPath(); c.roundRect(-w, -150, w, 300, 14); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(0, -150, w, 300, 14); c.fill(); c.stroke();
  if (q > 0.6) { c.strokeStyle = rgba(KB.INK, 0.75); c.lineWidth = 6; c.lineCap = 'round';
    for (const side of [-1, 1]) for (let i = 0; i < 7 * lines; i++) { const yy = -110 + i * 34; if (yy > 120) break; const x0 = side < 0 ? -w + 28 : 28, x1 = x0 + w - 56;
      c.beginPath(); c.moveTo(x1, yy); for (let xx = x1; xx > x0; xx -= 14) c.quadraticCurveTo(xx - 7, yy - 10 * Math.sin(xx * 0.3 + i), xx - 14, yy); c.stroke(); } }
  c.restore();
}
// a big friendly ear (listening) with sound waves coming in from the left
function r14Ear(c, x, y, s, t = 0, waves = 1) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = KB.INK; c.lineWidth = 14;
  c.fillStyle = KB.INK; c.beginPath(); c.ellipse(16, 16, 120, 170, 0.15, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#FFD7B0'; c.beginPath(); c.ellipse(0, 0, 120, 170, 0.15, 0, Math.PI * 2); c.fill(); c.stroke();
  c.lineWidth = 12; c.beginPath(); c.moveTo(-30, 100); c.bezierCurveTo(-70, 20, -60, -100, 20, -100); c.bezierCurveTo(80, -100, 80, -20, 30, 10); c.bezierCurveTo(0, 30, 10, 60, 30, 70); c.stroke();
  for (let k = 0; k < 3 * waves; k++) { const ph = (t * 1.6 + k / 3) % 1; c.strokeStyle = rgba(KB.INK, 1 - ph); c.lineWidth = 10;
    c.beginPath(); c.arc(-200 - 160 * (1 - ph), 0, 60 + 90 * (1 - ph), -0.6, 0.6); c.stroke(); }
  c.restore();
}
// a reed pen (qalam) whose tip sits at (x, y)
function r14Pen(c, x, y, s, rot = -0.7) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.lineJoin = 'round'; c.strokeStyle = KB.INK; c.lineWidth = 10;
  c.fillStyle = '#D9A55A'; c.beginPath(); c.moveTo(0, 0); c.lineTo(26, -60); c.lineTo(26, -380); c.lineTo(-26, -380); c.lineTo(-26, -60); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = KB.INK; c.beginPath(); c.moveTo(0, 0); c.lineTo(14, -40); c.lineTo(-14, -40); c.closePath(); c.fill();
  c.restore();
}
// a gold coin
function r14Coin(c, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = KB.INK; c.lineWidth = 8;
  c.fillStyle = '#E6B450'; c.beginPath(); c.ellipse(0, 0, 70, 26, 0, 0, Math.PI * 2); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(0, -2, 46, 15, 0, 0, Math.PI * 2); c.stroke(); c.restore();
}
// farmland seen from above: a grid of plots, each measured in turn (q 0 … 1)
function r14Fields(c, x, y, s, q, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineJoin = 'round';
  const cols = ['#9BCB55', '#C9D86A', '#7DB547', '#E3C566'], n = 3, cell = 200;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const k = i * n + j, px = (j - 1) * cell, py = (i - 1) * cell;
    c.fillStyle = cols[(i + 2 * j) % 4]; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.roundRect(px - cell / 2 + 6, py - cell / 2 + 6, cell - 12, cell - 12, 14); c.fill(); c.stroke();
    c.strokeStyle = rgba('#3F6B22', 0.5); c.lineWidth = 5; for (let r = -2; r <= 2; r++) { c.beginPath(); c.moveTo(px - cell / 2 + 26, py + r * 26); c.lineTo(px + cell / 2 - 26, py + r * 26); c.stroke(); }
    if (q * n * n > k) { c.strokeStyle = KB.RED; c.lineWidth = 9; c.setLineDash([18, 12]); c.lineDashOffset = -t * 40; c.strokeRect(px - cell / 2 + 16, py - cell / 2 + 16, cell - 32, cell - 32); c.setLineDash([]); } }
  c.restore();
}

const SHOTS = {
  // 1 — hook: the turban; a counter of years ruled; a closed book with a red cross
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    r14Turban(ctx, 540, 860, 1.0 * backOut(map(u, 0.05, 0.45)), t);
    const b = backOut(map(u, 1.0, 1.4));
    if (b > 0) { r14Book(ctx, 760, 1080, 0.48 * b, 0, t);
      ctx.save(); ctx.strokeStyle = KB.RED; ctx.lineWidth = 22; ctx.lineCap = 'round'; const k = ease(u, 1.4, 1.8); ctx.globalAlpha = k;
      ctx.beginPath(); ctx.moveTo(690, 1010); ctx.lineTo(830, 1150); ctx.moveTo(830, 1010); ctx.lineTo(690, 1150); ctx.stroke(); ctx.restore(); }
    kbEyes(ctx, 330, 1080, 52, t, u > st[1] ? 'hmm' : 'wow', 3);
    post.ui = c => { kbBadge(c, R14_CAT.label, R14_CAT.col, ease(u, 0, 0.3));
      (sh.card || []).forEach(([s, col], i) => { const q = i ? ease(u, 1.3, 1.65) : 1; if (q > 0) textFit(c, s, 540, 430 + i * 120 + (1 - q) * 22, { size: 80, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }, 640); });
      if (u > st[1]) kbLabel(c, 'EMPIRE KAISE CHALAYA?', 640, u, st[1], { size: 50, fill: KB.W, w: 640 }); };
  },
  // 2 — emperor at 13, childhood in hunting and fighting; studied with his ears
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    if (u < st[1]) {
      r14Turban(ctx, 540, 860, 0.75 * backOut(map(u, 0.05, 0.45)), t);
      // a bow and a sword crossed below: hunting and fighting
      const b = backOut(map(u, 1.0, 1.4)); if (b > 0) { ctx.save(); ctx.translate(540, 1090); ctx.scale(0.75 * b, 0.75 * b); ctx.strokeStyle = KB.INK; ctx.lineCap = 'round';
        ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(-40, 0, 130, -1.1, 1.1); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-40 + 130 * Math.cos(-1.1), 130 * Math.sin(-1.1)); ctx.lineTo(-40 + 130 * Math.cos(1.1), 130 * Math.sin(1.1)); ctx.stroke();
        ctx.rotate(0.7); ctx.fillStyle = '#D8DEE6'; ctx.lineWidth = 9; ctx.beginPath(); ctx.roundRect(-14, -170, 28, 260, 10); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#E6B450'; ctx.beginPath(); ctx.roundRect(-60, 80, 120, 24, 10); ctx.fill(); ctx.stroke(); ctx.restore(); }
    } else {
      r14Ear(ctx, 640, 1020, 1.15 * backOut(map(u, st[1], st[1] + 0.4)), t);
      r14Book(ctx, 300, 1020, 0.5 * backOut(map(u, st[1] + 0.3, st[1] + 0.7)), 1, t);
    }
    post.ui = c => { kbBadge(c, R14_CAT.label, R14_CAT.col);
      if (u < st[1]) { kbStamp(c, '13 SAAL: BAADSHAH', 540, 470, u, 0.3, KB.RED, 72); kbLabel(c, 'SHIKAAR + LADAAI, PADHAI NAHI', 610, u, 1.2, { size: 44, w: 640 }); }
      else kbLabel(c, 'AANKHON NAHI, KAANON SE PADHAI!', 430, u, st[1] + 0.2, { size: 46, fill: KB.Y, w: 640 }); };
  },
  // 3 — every evening a reader with a sweet voice; what he heard once, he remembered
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbNight(ctx, t, '#14123A', '#3A2A5C');
    // an oil lamp glow
    const g = ctx.createRadialGradient(540, 1000, 40, 540, 1000, 520); g.addColorStop(0, 'rgba(255,200,61,0.35)'); g.addColorStop(1, 'rgba(255,200,61,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    r14Book(ctx, 360, 1080, 0.62 * backOut(map(u, 0.05, 0.45)), 1, t);
    r14Turban(ctx, 720, 900, 0.55 * backOut(map(u, 0.2, 0.6)), t);
    // musical notes from the book to the turban: the sweet voice
    for (let k = 0; k < 5; k++) { const ph = (t * 0.5 + k / 5) % 1, nx = 420 + 260 * ph, ny = 980 - 120 * ph + Math.sin(ph * 9 + k) * 20;
      ctx.save(); ctx.globalAlpha = Math.sin(ph * Math.PI) * ease(u, 0.6, 1.0); ctx.fillStyle = KB.Y; ctx.strokeStyle = KB.Y; ctx.lineWidth = 7;
      ctx.beginPath(); ctx.ellipse(nx, ny, 18, 13, -0.4, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.moveTo(nx + 16, ny - 4); ctx.lineTo(nx + 16, ny - 64); ctx.stroke(); ctx.restore(); }
    if (u > st[1]) kbEyes(ctx, 720, 1120, 50, t, 'wow', 5);
    post.ui = c => { kbBadge(c, R14_CAT.label, R14_CAT.col);
      if (u < st[1]) { kbLabel(c, 'HAR SHAAM: KITAAB SUNNA', 430, u, 0.3, { size: 48, w: 640 }); kbLabel(c, 'MEETHI AAWAZ WALE READERS', 610, u, 2.0, { size: 44, fill: KB.Y, w: 640 }); }
      else kbStamp(c, 'EK BAAR SUNA = YAAD!', 540, 470, u, st[1] + 0.2, KB.RED, 70); };
  },
  // 4 — reveal: he marked the stopping page with a pen; readers paid by pages → kya baat hai
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 3);
    kbYellow(ctx, t);
    r14Book(ctx, 540, 1000, 1.0 * backOut(map(u, 0.05, 0.45)), 1, t);
    // the pen comes in and draws a red tick on the right page
    const pk = easeOut(map(u, 1.0, 2.0)), mk = map(u, 1.8, 2.6);
    if (pk > 0) {
      ctx.save(); ctx.strokeStyle = KB.RED; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
      const pts = [[620, 1040], [660, 1080], [740, 960]]; let tipX = 620, tipY = 1040;
      if (mk > 0) { ctx.moveTo(620, 1040); const L = mk * 2; if (L < 1) { tipX = 620 + 40 * L; tipY = 1040 + 40 * L; ctx.lineTo(tipX, tipY); } else { ctx.lineTo(660, 1080); const k = Math.min(1, L - 1); tipX = 660 + 80 * k; tipY = 1080 - 120 * k; ctx.lineTo(tipX, tipY); } ctx.stroke(); }
      ctx.restore();
      r14Pen(ctx, tipX + (1 - pk) * 300, tipY - (1 - pk) * 300, 0.9, -0.6);
    }
    // coins stack up beside the book, one per page
    if (u > st[1]) { const n = Math.min(6, Math.floor((u - st[1] - 0.2) * 3)); for (let i = 0; i < n; i++) r14Coin(ctx, 870, 1150 - i * 34, 0.9); }
    post.ui = c => { kbBadge(c, R14_CAT.label, R14_CAT.col);
      if (u < st[1]) kbLabel(c, 'JAHAN PADHAI RUKI: PEN SE NISHAAN', 430, u, 0.5, { size: 42, w: 640 });
      else kbStamp(c, 'HAR PANNE KE PAISE!', 540, 470, u, st[1] + 0.2, KB.RED, 74);
      kbKyaBaat(c, u, t, st[2]); };
  },
  // 5 — 1582: the Mahabharata into Persian; a real Razmnama page (proof)
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2), pAt = Math.max(0.3, st[1] - 0.3), pLen = Math.max(4.2, sh.dur - pAt - 0.3);
    kbYellow(ctx, t);
    if (u < pAt + 0.3) {
      // a shelf of many books (library) and two books with an arrow: Sanskrit → Persian
      for (let i = 0; i < 9; i++) { const b = backOut(map(u, 0.1 + i * 0.06, 0.4 + i * 0.06)); if (b <= 0) continue;
        ctx.save(); ctx.translate(250 + i * 66, 1160); ctx.scale(b, b); ctx.fillStyle = ['#8B3A1E', '#C47832', '#2E6E8E', '#6E50F0', '#289650'][i % 5]; ctx.strokeStyle = KB.INK; ctx.lineWidth = 8;
        ctx.beginPath(); ctx.roundRect(-28, -200 - (i % 3) * 20, 56, 200 + (i % 3) * 20, 8); ctx.fill(); ctx.stroke(); ctx.restore(); }
      ctx.fillStyle = KB.INK; ctx.fillRect(200, 1160, 680, 22);
      r14Book(ctx, 330, 770, 0.42 * backOut(map(u, 1.2, 1.6)), 1, t); r14Book(ctx, 750, 770, 0.42 * backOut(map(u, 1.8, 2.2)), 1, t);
      if (u > 1.7) kbArrow(ctx, 450, 770, 630, 770, KB.INK, 14);
    }
    post.ui = c => { kbBadge(c, R14_CAT.label, R14_CAT.col);
      if (u < pAt + 0.2) { kbLabel(c, 'TRANSLATION TEAM!', 430, u, 0.2, { size: 50, w: 640 });
        text(c, 'MAHABHARAT', 330, 900, { size: 40, weight: 900, color: KB.INK, stroke: 0, shadow: 0, alpha: ease(u, 1.3, 1.6) });
        text(c, 'PERSIAN', 750, 900, { size: 40, weight: 900, color: KB.RED, stroke: 0, shadow: 0, alpha: ease(u, 1.9, 2.2) });
        kbStamp(c, '1582', 540, 630, u, 2.2, KB.RED, 90); }
      kbProof(c, 'razm', u, pAt, pLen, 'ASLI PANNA · RAZMNAMA', 'Daswant & Kesho · Razmnama · 16th c. · Wikimedia (PD)', -0.03, {
        focus: [0.62, 0.3], zoomTo: 1.35, notes: [
          { x: 0.66, y: 0.24, r: 0.27, shape: 'box', at: 0.9, text: 'PERSIAN MEIN!', tx: 0.3, ty: -0.04 },
          { x: 0.22, y: 0.68, r: 0.13, at: Math.max(1.8, pLen * 0.5), text: 'ARJUN KA NISHANA', tx: 0.5, ty: 1.02 }] }); };
  },
  // 6 — the best people for each job: Raja Todar Mal; land measured, tax on the 10-year average crop
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    const bq = map(u, st[1] + 2.0, st[1] + 3.0);
    if (bq < 0.5) r14Fields(ctx, 540, 880, 0.8 * backOut(map(u, 0.05, 0.45)) * (1 - easeOut(map(bq, 0, 0.5))), map(u, st[1] + 0.1, st[1] + 2.0), t);
    // ten bars and their average line
    ctx.save(); ctx.translate(0, -340);
    if (bq > 0) { ctx.save(); ctx.globalAlpha = Math.min(1, bq * 2); kbPanel(ctx, 230, 1140, 620, 260, KB.W, 30);
      const hs = [0.6, 0.8, 0.5, 0.9, 0.7, 0.65, 0.85, 0.55, 0.75, 0.7]; hs.forEach((h, i) => { const hh = 180 * h * Math.min(1, bq * 1.5); ctx.fillStyle = '#7DB547'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(262 + i * 58, 1370 - hh, 40, hh, 6); ctx.fill(); ctx.stroke(); });
      if (bq > 0.6) { ctx.strokeStyle = KB.RED; ctx.lineWidth = 10; ctx.setLineDash([22, 12]); ctx.beginPath(); ctx.moveTo(250, 1370 - 180 * 0.7); ctx.lineTo(830, 1370 - 180 * 0.7); ctx.stroke(); ctx.setLineDash([]); }
      ctx.restore(); }
    ctx.restore();
    post.ui = c => { kbBadge(c, R14_CAT.label, R14_CAT.col);
      if (u < st[1]) kbStamp(c, 'RAJA TODARMAL', 540, 470, u, 0.6, KB.RED, 84);
      else kbLabel(c, u < st[1] + 2.0 ? 'ZAMEEN NAAPI GAYI' : 'TAX = 10 SAAL KI AVERAGE FASAL', 430, u, st[1], { size: 44, fill: u < st[1] + 2.0 ? KB.W : KB.Y, w: 640 }); };
  },
  // 7 — loop: couldn't read or write... but listening and picking the right people
  7(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    r14Turban(ctx, 540, 840, 0.75 * backOut(map(u, 0.05, 0.45)), t);
    if (u > st[1]) { r14Ear(ctx, 330, 1080, 0.55 * backOut(map(u, st[1], st[1] + 0.4)), t, 0);
      // three people icons: the right team
      for (let i = 0; i < 3; i++) { const b = backOut(map(u, st[1] + 0.6 + i * 0.2, st[1] + 1.0 + i * 0.2)); if (b <= 0) continue; const px = 640 + i * 90;
        ctx.save(); ctx.translate(px, 1110); ctx.scale(b, b); ctx.fillStyle = [KB.RED, '#2E6E8E', '#289650'][i]; ctx.strokeStyle = KB.INK; ctx.lineWidth = 8;
        ctx.beginPath(); ctx.arc(0, -90, 34, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-44, -48, 88, 110, 30); ctx.fill(); ctx.stroke(); ctx.restore(); } }
    post.ui = c => { kbBadge(c, R14_CAT.label, R14_CAT.col);
      if (u < st[1]) kbLabel(c, 'PADH-LIKH NAHI SAKTE THE...', 430, u, 0.3, { size: 48, w: 640 });
      else kbStamp(c, 'SUNNA + SAHI LOG!', 540, 470, u, st[1] + 0.2, KB.RED, 80); };
  },
  8(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
