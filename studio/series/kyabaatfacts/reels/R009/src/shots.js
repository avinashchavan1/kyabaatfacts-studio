// ===== R009 · Venus ka ek din, ek saal se lamba! (Antriksh) — Kya Baat look =====
const R9_CAT = { label: 'ANTRIKSH', col: '#6E50F0' };
function buildScenes() { return kbLoadImg('venus', 'proof_venus.jpg'); }

function r9Venus(c, x, y, R, t, o = {}) {
  const { mood = null, spin = 0, dir = -1 } = o;
  glow(c, x, y, R * 1.6, '#FFE3A8', 0.35);
  const g = c.createRadialGradient(x - R * 0.35, y - R * 0.35, R * 0.1, x, y, R); g.addColorStop(0, '#FFF3D1'); g.addColorStop(0.6, '#F2D49A'); g.addColorStop(1, '#C9A063');
  c.save(); c.fillStyle = g; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.arc(x, y, R, 0, Math.PI * 2); c.fill(); c.save(); c.clip();
  c.strokeStyle = 'rgba(255,255,255,0.45)'; c.lineWidth = R * 0.08; for (let k = 0; k < 5; k++) { const yy = y - R * 0.7 + k * R * 0.35, off = (spin * dir * R * 2 + k * 60) % (R * 2); c.beginPath(); c.moveTo(x - R * 1.2 + off, yy); c.bezierCurveTo(x - R * 0.4 + off, yy - 30, x + off, yy + 30, x + R * 0.8 + off, yy); c.stroke(); }
  c.restore(); c.beginPath(); c.arc(x, y, R, 0, Math.PI * 2); c.stroke(); c.restore();
  if (mood) kbEyes(c, x, y, R * 0.16, t, mood, 7);
}
function r9Dial(c, x, y, r, frac, col, label, val) {
  c.save(); c.fillStyle = KB.W; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke();
  c.strokeStyle = col; c.lineWidth = 26; c.lineCap = 'round'; c.beginPath(); c.arc(x, y, r - 30, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac); c.stroke(); c.restore();
  text(c, val, x, y + 28, { size: 78, weight: 900, color: KB.INK, shadow: 0 }); text(c, label, x, y + r + 70, { size: 44, weight: 900, color: KB.W, stroke: 10, shadow: 0 });
}

const SHOTS = {
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbNight(ctx, t, '#0C0A26', '#2B276A');
    post.ui = c => { kbBadge(c, R9_CAT.label, R9_CAT.col, ease(u, 0, 0.3)); (sh.card || []).forEach(([s, col], i) => { const q = ease(u, (i ? st[1] : 0.05) - 0.05, (i ? st[1] : 0.05) + 0.3); if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 104, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }); }); kbEyes(c, 540, 1050, 80, t, u < st[1] ? 'hmm' : 'sach', 1); };
  },
  2(ctx, u, p, sh, t, post) {
    kbNight(ctx, t, '#0C0A26', '#2B276A'); r9Venus(ctx, 540, 1060, 330 * backOut(map(u, 0.05, 0.5)), t, { mood: 'kya', spin: t * 0.05 });
    post.ui = c => { kbBadge(c, R9_CAT.label, R9_CAT.col); kbStamp(c, 'SHUKRA · VENUS!', 540, 440, u, 0.4, KB.RED, 100); };
  },
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbNight(ctx, t, '#0C0A26', '#2B276A');
    const pe = Math.min(2.3, Math.max(1.2, st[1] - 0.3));
    r9Dial(ctx, 300, 1050, 200, Math.min(1, map(u, pe, st[1] + 1.0)) * 0.92, '#F2D49A', 'EK CHAKKAR', u > pe ? '243' : '?');
    r9Dial(ctx, 780, 1050, 200, u > st[1] ? Math.min(1, map(u, st[1], sh.dur - 0.3)) : 0, '#FF4B3E', 'SURAJ KA CHAKKAR', u > st[1] ? '225' : '?');
    post.ui = c => { kbBadge(c, R9_CAT.label, R9_CAT.col); kbLabel(c, 'DIN vs SAAL (EARTH DAYS)', 320, u, pe, { size: 52 }); kbProof(c, 'venus', u, 0.05, pe - 0.1, 'ASLI VENUS', 'Image: NASA Mariner 10 · Public domain'); };
  },
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbNight(ctx, t, '#0C0A26', '#2B276A'); r9Venus(ctx, 540, 1080, 300, t, { mood: 'wow', spin: t * 0.02 });
    post.ui = c => { kbBadge(c, R9_CAT.label, R9_CAT.col); kbStamp(c, 'NAYA SAAL! 🎉', 540, 450, u, 0.6, KB.RED, 100); kbLabel(c, 'CHAKKAR ABHI ADHOORA...', 600, u, 1.2, { size: 46, fill: KB.Y }); kbKyaBaat(c, u, t, st[1]); };
  },
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#E8792C'); g.addColorStop(1, '#FFC97A'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const rise = u > st[1] ? easeOut(map(u, st[1], sh.dur - 0.2)) : 0;
    glow(ctx, 230, 1260 - rise * 380, 260, '#FFF3B0', 0.8); ctx.fillStyle = '#FFE38A'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(230, 1260 - rise * 380, 110, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#8A5A2A'; ctx.beginPath(); ctx.moveTo(0, 1300); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 1290 + Math.sin(x * 0.02) * 22); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (u < st[1]) { kbArrow(ctx, 780, 900, 300, 900, KB.INK, 16); }
    post.ui = c => { kbBadge(c, R9_CAT.label, R9_CAT.col); text(c, 'PASCHIM (W)', 200, 1250, { size: 48, weight: 900, color: KB.W, stroke: 10, shadow: 0 }); text(c, 'PURAB (E)', 880, 1250, { size: 48, weight: 900, color: KB.W, stroke: 10, shadow: 0 });
      kbLabel(c, u < st[1] ? 'ULTA GHOOMTA HAI!' : 'SURAJ UGTA HAI PASCHIM SE!', 320, u, u < st[1] ? 0.1 : st[1], { size: 50, fill: u < st[1] ? KB.W : KB.Y }); };
  },
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbNight(ctx, t, '#0C0A26', '#2B276A');
    r9Dial(ctx, 540, 1060, 260, u > st[1] ? Math.min(1, map(u, st[1], sh.dur - 0.4)) : 0, '#FFC83D', 'SUNRISE → SUNRISE', u > st[1] ? '~117' : '?');
    post.ui = c => { kbBadge(c, R9_CAT.label, R9_CAT.col); kbLabel(c, u < st[1] ? 'LEKIN TWIST...' : 'EK SURYODAY SE AGLE TAK', 320, u, u < st[1] ? 0.1 : st[1], { size: 50, fill: u < st[1] ? KB.Y : KB.W }); };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
