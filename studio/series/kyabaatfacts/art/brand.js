// ===== Kya Baat Facts look (loaded after templates.js): Montserrat, yellow/ink/punch, googly-eyes mascot, fact cards, end card =====
const KB = { Y: '#FFC83D', DOT: '#F5BA28', INK: '#14123A', INK2: '#262260', RED: '#FF4B3E', W: '#FFFFFF' };

// text defaults to Montserrat (the shared library defaults to Cinzel)
const _kbText = text, _kbTextFit = textFit;
text = function (ctx, str, x, y, o = {}) { return _kbText(ctx, str, x, y, Object.assign({ font: 'Montserrat', strokeCol: KB.INK }, o)); };
textFit = function (ctx, str, x, y, o = {}, maxW = 960) { return _kbTextFit(ctx, str, x, y, Object.assign({ font: 'Montserrat', strokeCol: KB.INK }, o), maxW); };

// one googly eye: look = [-1..1, -1..1], lid 0..1 (closes from the top), brow raise in eye radii
function kbEye(c, x, y, r, look = [0.6, -0.6], o = {}) {
  const { lid = 0, brow = 0, pupil = 0.44, ink = KB.INK, brows = true } = o;
  c.save(); c.lineWidth = Math.max(2, r * 0.2); c.strokeStyle = ink;
  c.fillStyle = KB.W; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
  const pr = r * pupil, px = x + look[0] * r * 0.3, py = y + look[1] * r * 0.3;
  c.fillStyle = ink; c.beginPath(); c.arc(px, py, pr, 0, Math.PI * 2); c.fill();
  c.fillStyle = KB.W; c.beginPath(); c.arc(px + pr * 0.32, py - pr * 0.45, pr * 0.24, 0, Math.PI * 2); c.fill();
  if (lid > 0) { c.save(); c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.clip(); c.fillStyle = o.lidCol || KB.Y; c.fillRect(x - r, y - r, 2 * r, 2 * r * lid); c.restore(); c.beginPath(); c.moveTo(x - r, y - r + 2 * r * lid); c.lineTo(x + r, y - r + 2 * r * lid); c.stroke(); }
  c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
  if (brows) { c.lineCap = 'round'; c.lineWidth = r * 0.24; c.beginPath(); c.arc(x, y - r * 1.55 - brow * r, r * 0.9, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); }
  c.restore();
}
// the mascot: two eyes, with a blink and a mood ('kya' | 'hmm' | 'sach' | 'wow')
function kbEyes(c, x, y, r, t, mood = 'kya', seed = 0) {
  const bl = ((t + seed * 1.7) % 3.1) < 0.12 ? 0.9 : 0;
  const M = { kya: [[0.6, -0.6], 0, 0], hmm: [[-0.7, 0.3], 0.45, -0.2], sach: [[0, 0], 0, 0.45], wow: [[0, 0], 0, 0.6] }[mood] || [[0.6, -0.6], 0, 0];
  const pupil = mood === 'wow' ? 0.24 : 0.44, g = r * 0.12;
  kbEye(c, x - r - g, y, r, M[0], { lid: Math.max(M[1], bl), brow: M[2] * (mood === 'sach' ? 0 : 1), pupil });
  kbEye(c, x + r + g, y, r, M[0], { lid: Math.max(M[1], bl), brow: M[2], pupil });
}

// backgrounds
function kbYellow(ctx, t, drift = 1) {
  ctx.fillStyle = KB.Y; ctx.fillRect(0, 0, W, H);
  const step = 54, off = (t * 8 * drift) % step; ctx.fillStyle = KB.DOT;
  for (let y = -step; y < H + step; y += step) for (let x = -step; x < W + step; x += step) {
    const sx = x + ((Math.round(y / step) % 2) ? step / 2 : 0) + off, sy = y + off; ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();
  }
}
function kbNight(ctx, t, top = '#0C0A26', bot = '#262260') {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const r = rng(7); for (let i = 0; i < 70; i++) { const x = r() * W, y = r() * H * 0.7, s = 1.5 + r() * 3, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); ctx.fillStyle = rgba('#FFE9A8', 0.25 + 0.5 * tw); ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI * 2); ctx.fill(); }
}
// sticker panel: navy hard shadow + outline
function kbPanel(c, x, y, w, h, fill = KB.W, r = 40, sh = 14) {
  c.save(); c.fillStyle = KB.INK; c.beginPath(); c.roundRect(x + sh, y + sh, w, h, r); c.fill();
  c.fillStyle = fill; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); c.stroke(); c.restore();
}
// fact card: big number, label, source line; pops in at time `at` (seconds into the shot)
function kbFact(c, u, F, y = 330, at = 0.2, col = KB.RED) {
  const b = backOut(map(u, at, at + 0.45)); if (b <= 0) return;
  c.save(); c.translate(540, y + 130); c.scale(b, b); c.translate(-540, -(y + 130));
  kbPanel(c, 90, y, 900, 290, KB.W);
  c.fillStyle = col; c.beginPath(); c.roundRect(90, y, 900, 64, [40, 40, 0, 0]); c.fill();
  text(c, F.label, 540, y + 46, { size: 34, weight: 900, color: KB.W, ls: 4, shadow: 0 });
  textFit(c, F.big, 540, y + 200, { size: 128, weight: 900, color: KB.INK, shadow: 0 }, 820);
  c.restore();
  if (F.src) text(c, 'SOURCE: ' + F.src, 540, y + 360, { size: 28, weight: 800, color: KB.W, ls: 2, alpha: ease(u, at + 0.3, at + 0.7), stroke: 7, shadow: 0 });
}
// category badge pill (top)
function kbBadge(c, label, col, a = 1, y = 220) {
  c.save(); c.globalAlpha = a; c.font = '900 34px Montserrat'; c.letterSpacing = '3px';
  const w = c.measureText(label).width + 80, x = 540 - w / 2;
  c.fillStyle = KB.INK; c.beginPath(); c.roundRect(x + 7, y + 7, w, 66, 33); c.fill();
  c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 6; c.beginPath(); c.roundRect(x, y, w, 66, 33); c.fill(); c.stroke(); c.restore();
  text(c, label, 540, y + 45, { size: 34, weight: 900, color: KB.W, ls: 3, alpha: a, shadow: 0 });
}
// stacked logo: KYA / BAAT! (eyes over the AA) / FACTS pill, centred at x,y with scale s
function kbLogo(c, x, y, s, t = 0, a = 1) {
  c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(s, s);
  text(c, 'KYA', 0, -40, { size: 190, weight: 900, color: KB.INK, shadow: 0 });
  c.font = '900 240px Montserrat'; c.letterSpacing = '0px'; const word = 'BAAT!', tw = c.measureText(word).width, x0 = -tw / 2;
  text(c, word, 0, 190, { size: 240, weight: 900, color: KB.INK, shadow: 0 });
  for (const i of [1, 2]) { c.font = '900 240px Montserrat'; const ax = x0 + c.measureText(word.slice(0, i)).width + c.measureText('A').width / 2; kbEye(c, ax, 22, 62, [0.6, -0.6], { lid: ((t % 3.1) < 0.12) ? 0.9 : 0 }); }
  c.font = '900 84px Montserrat'; c.letterSpacing = '2px'; const fw = c.measureText('FACTS').width + 90;
  c.fillStyle = KB.INK; c.beginPath(); c.roundRect(-fw / 2, 240, fw, 120, 60); c.fill();
  text(c, 'FACTS', 0, 330, { size: 84, weight: 900, color: KB.Y, ls: 2, shadow: 0 });
  c.restore();
}
// small corner logo on every shot: eyes + wordmark
logo = function (ctx, a = 1) {
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(KB.INK, 0.55); ctx.beginPath(); ctx.roundRect(36, 108, 360, 70, 35); ctx.fill(); ctx.restore();
  ctx.save(); ctx.globalAlpha = a; kbEye(ctx, 82, 143, 17, [0.6, -0.6], { brows: false }); kbEye(ctx, 122, 143, 17, [0.6, -0.6], { brows: false }); ctx.restore();
  text(ctx, 'KYA BAAT FACTS', 152, 155, { size: 30, weight: 900, color: KB.Y, align: 'left', ls: 2, alpha: a, shadow: 0 });
};
// end card: yellow, logo, line, FOLLOW / SUBSCRIBE button, handles
endCard = function (ctx, u, p, sh, t, post) {
  kbYellow(ctx, t);
  post.noLogo = true;
  post.ui = c => {
    const a = ease(u, 0.05, 0.45), s = lerp(0.9, 1, backOut(map(u, 0.05, 0.6)));
    kbLogo(c, 540, 640, 1.0 * s, t, a);
    text(c, 'Aise aur facts ke liye', 540, 1180, { size: 60, weight: 900, color: KB.INK, alpha: ease(u, 0.5, 0.9), shadow: 0 });
    const b = backOut(map(u, 0.8, 1.25));
    if (b > 0) { const pu = 1 + Math.sin(u * 5) * 0.025; c.save(); c.translate(540, 1340); c.scale(b * pu, b * pu); const label = CTA.button; c.font = '900 72px Montserrat'; c.letterSpacing = '4px'; const tw = c.measureText(label).width, bw = tw + 180;
      c.fillStyle = KB.INK; c.beginPath(); c.roundRect(-bw / 2 + 12, -72 + 12, bw, 144, 72); c.fill();
      c.fillStyle = KB.RED; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.roundRect(-bw / 2, -72, bw, 144, 72); c.fill(); c.stroke();
      text(c, label, 0, 26, { size: 72, weight: 900, color: KB.W, ls: 4, shadow: 0 }); c.restore(); }
    const handles = CTA.handles_line || SERIES.handles_line;
    if (handles) [].concat(handles).forEach((l, i) => text(c, l, 540, 1530 + i * 56, { size: 38, weight: 800, color: KB.INK, ls: 2, alpha: ease(u, 1.1, 1.5), shadow: 0 }));
  };
};
