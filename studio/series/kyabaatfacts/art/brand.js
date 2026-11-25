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
  ctx.save(); ctx.font = '900 30px Montserrat'; ctx.letterSpacing = '2px'; const tw = ctx.measureText('KYA BAAT FACTS').width; ctx.restore();
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(KB.INK, 0.6); ctx.beginPath(); ctx.roundRect(36, 108, 152 + tw + 30 - 36, 70, 35); ctx.fill(); ctx.restore();   // pill sized to the text
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

// ---- shared reel helpers (R002+) ----
function kbStamp(c, str, x, y, u, at, col = KB.RED, size = 120, rot = -0.1) {
  const b = backOut(map(u, at, at + 0.35)); if (b <= 0) return;
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(b, b); c.font = `900 ${size}px Montserrat`; c.letterSpacing = '2px';
  const w = Math.min(c.measureText(str).width + 80, 980), h = size * 1.25;
  c.fillStyle = KB.INK; c.beginPath(); c.roundRect(-w / 2 + 12, -h / 2 + 12, w, h, 30); c.fill();
  c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, 30); c.fill(); c.stroke(); c.restore();
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(b, b); textFit(c, str, 0, size * 0.36, { size, weight: 900, color: KB.W, shadow: 0 }, 900); c.restore();
}
function kbShake(ctx, u, at, amt = 18, len = 0.35) { const k = 1 - map(u, at, at + len); if (u < at || k <= 0) return; ctx.translate(Math.sin(u * 90) * amt * k, Math.cos(u * 77) * amt * k); }
// speech/label panel with text (fades in at `at`)
function kbLabel(c, str, y, u, at = 0.2, o = {}) {
  const q = ease(u, at, at + 0.35); if (q <= 0) return; const { size = 56, fill = KB.W, col = KB.INK, w = 880 } = o;
  c.save(); c.globalAlpha = q; kbPanel(c, 540 - w / 2, y + (1 - q) * 24, w, size * 2.6, fill, size * 1.3); c.restore();
  textFit(c, str, 540, y + size * 1.6 + (1 - q) * 24, { size, weight: 900, color: col, alpha: q, shadow: 0 }, w - 60);
}
function kbPin(c, x, y, label, u, at = 0.3, col = KB.RED) {
  const b = backOut(map(u, at, at + 0.4)); if (b <= 0) return;
  c.save(); c.translate(x, y); c.scale(b, b); c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 8;
  c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(-60, -70, -60, -140, 0, -140); c.bezierCurveTo(60, -140, 60, -70, 0, 0); c.fill(); c.stroke();
  c.fillStyle = KB.W; c.beginPath(); c.arc(0, -95, 20, 0, Math.PI * 2); c.fill(); c.stroke(); c.restore();
  if (label) { c.save(); c.globalAlpha = ease(u, at + 0.2, at + 0.5); c.font = '900 40px Montserrat'; const w = c.measureText(label).width + 50; kbPanel(c, x - w / 2, y + 20, w, 70, KB.W, 35, 8); c.restore(); text(c, label, x, y + 68, { size: 40, weight: 900, color: KB.INK, alpha: ease(u, at + 0.2, at + 0.5), shadow: 0 }); }
}
function kbHeart(c, x, y, s, col = KB.RED, beat = 1) {
  c.save(); c.translate(x, y); c.scale(s * beat, s * beat); c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 8 / Math.max(s, 0.3);
  c.beginPath(); c.moveTo(0, 30); c.bezierCurveTo(-60, -10, -40, -60, 0, -30); c.bezierCurveTo(40, -60, 60, -10, 0, 30); c.fill(); c.stroke(); c.restore();
}
function kbArrow(c, x0, y0, x1, y1, col = KB.INK, w = 12) {
  c.save(); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
  const a = Math.atan2(y1 - y0, x1 - x0), L = w * 3; c.beginPath(); c.moveTo(x1 + Math.cos(a) * w, y1 + Math.sin(a) * w); c.lineTo(x1 - Math.cos(a - 0.5) * L, y1 - Math.sin(a - 0.5) * L); c.lineTo(x1 - Math.cos(a + 0.5) * L, y1 - Math.sin(a + 0.5) * L); c.closePath(); c.fill(); c.restore();
}
function kbBubbles(c, t, n = 18, seed = 3, col = 'rgba(255,255,255,0.35)') {
  const r = rng(seed); c.save(); c.strokeStyle = col; c.lineWidth = 4;
  for (let i = 0; i < n; i++) { const x = r() * W, sp = 60 + r() * 90, rad = 6 + r() * 16, y = H - ((t * sp + r() * H) % (H + 100)); c.beginPath(); c.arc(x + Math.sin(t * 2 + i) * 10, y, rad, 0, Math.PI * 2); c.stroke(); }
  c.restore();
}
// counting number (0 → n) formatted Indian style
function kbCount(n, u, a, b) { const v = Math.round(n * easeOut(map(u, a, b))); return v.toLocaleString('en-IN'); }
// the catchphrase overlay: yellow wash + giant WOW eyes + "KYA BAAT HAI!" from time `at`
function kbKyaBaat(c, u, t, at) {
  if (u < at - 0.1) return; const q = backOut(map(u, at - 0.1, at + 0.3));
  c.save(); c.fillStyle = rgba(KB.Y, 0.93 * Math.min(1, q)); c.fillRect(0, 0, W, H); c.restore();
  c.save(); c.translate(540, 900); c.scale(q, q); kbEyes(c, 0, 0, 170, t, 'wow', 1); c.restore();
  text(c, 'KYA BAAT HAI!', 540, 1310, { size: 118 * Math.min(1, q), weight: 900, color: KB.INK, shadow: 0 });
}

// ---- Proof shot: a real photo for 2-3 s, in a tilted sticker frame with "ASLI PHOTO" + credit (load with kbLoadImg in buildScenes) ----
const KB_IMG = {};
function kbLoadImg(key, src) { return new Promise(res => { const im = new Image(); im.onload = () => { KB_IMG[key] = im; res(); }; im.onerror = () => { console.log('PROOF IMAGE MISSING', src); res(); }; im.src = src; }); }
function kbProof(c, key, u, at, len, label = 'ASLI PHOTO', credit = '', rot = -0.035) {
  const im = KB_IMG[key]; if (!im || u < at || u > at + len) return false;
  const inQ = backOut(map(u, at, at + 0.3)), outQ = 1 - easeOut(map(u, at + len - 0.25, at + len)), q = Math.min(inQ, 1) * outQ;
  if (!c._kbNoDim) { c.save(); c.fillStyle = rgba(KB.INK, Math.min(1, q * 1.4)); c.fillRect(0, 0, W, H); c.restore(); }   // the safe-zone wrapper dims the full frame itself
  const maxW = 900, maxH = 720, sc = Math.min(maxW / im.width, maxH / im.height), w = im.width * sc, h = im.height * sc, pad = 26;
  const zoom = 1 + 0.04 * map(u, at, at + len);   // slow push-in
  c.save(); c.translate(540, 860); c.rotate(rot); c.scale(q * zoom, q * zoom);
  c.fillStyle = KB.INK; c.beginPath(); c.roundRect(-w / 2 - pad + 16, -h / 2 - pad + 16, w + 2 * pad, h + 2 * pad + 70, 18); c.fill();
  c.fillStyle = KB.W; c.strokeStyle = KB.INK; c.lineWidth = 8; c.beginPath(); c.roundRect(-w / 2 - pad, -h / 2 - pad, w + 2 * pad, h + 2 * pad + 70, 18); c.fill(); c.stroke();
  c.drawImage(im, -w / 2, -h / 2, w, h); c.strokeRect(-w / 2, -h / 2, w, h);
  if (credit) { c.font = '700 26px Montserrat'; c.fillStyle = KB.INK; c.textAlign = 'center'; c.fillText(credit, 0, h / 2 + pad + 30); }
  c.restore();
  kbStamp(c, label + ' 📸', 540, 860 - h / 2 - 110, u, at + 0.15, KB.RED, 64, 0.05);
  return true;
}

// ---- Safe-zone layout (opt-in per reel: `const KB_SAFE = true;` at the top of its shots.js) ----
// Instagram/YouTube cover y < 230 (header), y > 1440 (caption, buttons) and the right ~230 px (action rail).
// With KB_SAFE: logo + category badge share one row at y 236, text blocks stay within x 220-860, subtitles end at y 1400.
const KB_S = () => typeof KB_SAFE !== 'undefined' && KB_SAFE;
const KB_SAFE_W = 640;
const KB_RAIL_Y = 900;   // the like/comment/share rail covers the right side only below about y 900; above it full width is safe
const _kbLogo0 = logo, _kbBadge0 = kbBadge, _kbLabel0 = kbLabel, _kbStamp0 = kbStamp, _kbTextFit1 = textFit, _kbFact0 = kbFact, _kbProof0 = kbProof, _kbKyaBaat0 = kbKyaBaat, _kbEnd0 = endCard;
let KB_LOGO_R = 0;   // right edge of the logo pill (the badge sits after it)
logo = function (ctx, a = 1) {
  if (!KB_S()) return _kbLogo0(ctx, a);
  ctx.save(); ctx.font = '900 26px Montserrat'; ctx.letterSpacing = '2px'; const tw = ctx.measureText('KYA BAAT FACTS').width; ctx.restore();
  const x = 40, y = 236, h = 58; KB_LOGO_R = x + 104 + tw + 24;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(KB.INK, 0.6); ctx.beginPath(); ctx.roundRect(x, y, KB_LOGO_R - x, h, h / 2); ctx.fill(); ctx.restore();
  ctx.save(); ctx.globalAlpha = a; kbEye(ctx, x + 32, y + h / 2, 14, [0.6, -0.6], { brows: false }); kbEye(ctx, x + 66, y + h / 2, 14, [0.6, -0.6], { brows: false }); ctx.restore();
  text(ctx, 'KYA BAAT FACTS', x + 92, y + h / 2 + 9, { size: 26, weight: 900, color: KB.Y, align: 'left', ls: 2, alpha: a, shadow: 0 });
};
kbBadge = function (c, label, col, a = 1, y = 220) {
  if (!KB_S()) return _kbBadge0(c, label, col, a, y);
  c.save(); c.font = '900 26px Montserrat'; c.letterSpacing = '2px'; const w = c.measureText(label).width + 50; c.restore();
  const x0 = Math.min(Math.max(KB_LOGO_R || 420, 420) + 14, 850 - w), yy = 236, h = 58;
  c.save(); c.globalAlpha = a; c.fillStyle = KB.INK; c.beginPath(); c.roundRect(x0 + 5, yy + 5, w, h, h / 2); c.fill();
  c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 5; c.beginPath(); c.roundRect(x0, yy, w, h, h / 2); c.fill(); c.stroke(); c.restore();
  text(c, label, x0 + w / 2, yy + h / 2 + 9, { size: 26, weight: 900, color: KB.W, ls: 2, alpha: a, shadow: 0 });
};
kbLabel = function (c, str, y, u, at = 0.2, o = {}) { return _kbLabel0(c, str, Math.max(y, 320), u, at, KB_S() && y > KB_RAIL_Y ? Object.assign({}, o, { w: Math.min(o.w || 880, KB_SAFE_W + 40), size: Math.min(o.size || 56, 50) }) : o); };
textFit = function (ctx, str, x, y, o = {}, maxW = 960) { return _kbTextFit1(ctx, str, x, y, o, KB_S() ? Math.min(maxW, y > KB_RAIL_Y ? KB_SAFE_W : 940) : maxW); };
kbStamp = function (c, str, x, y, u, at, col = KB.RED, size = 120, rot = -0.1) {
  if (!KB_S()) return _kbStamp0(c, str, x, y, u, at, col, size, rot);
  const lim = y > KB_RAIL_Y ? KB_SAFE_W : 940; c.save(); c.font = `900 ${size}px Montserrat`; c.letterSpacing = '2px'; let s = size; while (s > 40 && c.measureText(str).width + 80 > lim) { s -= 4; c.font = `900 ${s}px Montserrat`; } c.restore();
  return _kbStamp0(c, str, x, Math.min(Math.max(y, 340), 1300), u, at, col, s, rot);
};
kbFact = function (c, u, F, y = 330, at = 0.2, col = KB.RED) {
  if (!KB_S()) return _kbFact0(c, u, F, y, at, col);
  c.save(); c.translate(540, Math.max(y, 330) + 130); c.scale(0.72, 0.72); c.translate(-540, -(Math.max(y, 330) + 130)); _kbFact0(c, u, F, Math.max(y, 330), at, col); c.restore();
};
kbProof = function (c, key, u, at, len, label, credit, rot) {
  if (!KB_S()) return _kbProof0(c, key, u, at, len, label, credit, rot);
  // dim the WHOLE frame here, outside the 0.72 scale (inside it the dimming shrank into a grey box around the photo)
  if (KB_IMG[key] && u >= at && u <= at + len) {
    const q = Math.min(backOut(map(u, at, at + 0.3)), 1) * (1 - easeOut(map(u, at + len - 0.25, at + len)));
    c.save(); c.fillStyle = rgba(KB.INK, Math.min(1, q * 1.4)); c.fillRect(0, 0, W, H); c.restore();
  }
  c.save(); c.translate(540, 860); c.scale(0.72, 0.72); c.translate(-540, -860); c._kbNoDim = true;
  let r; try { r = _kbProof0(c, key, u, at, len, label, credit, rot); } finally { c._kbNoDim = false; c.restore(); }
  return r;
};
kbKyaBaat = function (c, u, t, at) {
  if (!KB_S()) return _kbKyaBaat0(c, u, t, at);
  if (u < at - 0.1) return; const q = backOut(map(u, at - 0.1, at + 0.3));
  c.save(); c.fillStyle = rgba(KB.Y, 0.93 * Math.min(1, q)); c.fillRect(0, 0, W, H); c.restore();
  c.save(); c.translate(540, 820); c.scale(q * 0.8, q * 0.8); kbEyes(c, 0, 0, 170, t, 'wow', 1); c.restore();
  textFit(c, 'KYA BAAT HAI!', 540, 1180, { size: 104 * Math.min(1, q), weight: 900, color: KB.INK, shadow: 0 });
};
endCard = function (ctx, u, p, sh, t, post) {
  if (!KB_S()) return _kbEnd0(ctx, u, p, sh, t, post);
  kbYellow(ctx, t); post.noLogo = true;
  post.ui = c => {
    const a = ease(u, 0.05, 0.45), s = lerp(0.9, 1, backOut(map(u, 0.05, 0.6)));
    kbLogo(c, 540, 560, 0.85 * s, t, a);
    text(c, 'Aise aur facts ke liye', 540, 1000, { size: 54, weight: 900, color: KB.INK, alpha: ease(u, 0.5, 0.9), shadow: 0 });
    const b = backOut(map(u, 0.8, 1.25));
    if (b > 0) { const pu = 1 + Math.sin(u * 5) * 0.025; c.save(); c.translate(540, 1140); c.scale(b * pu, b * pu); const label = CTA.button; c.font = '900 64px Montserrat'; c.letterSpacing = '4px'; const tw = c.measureText(label).width, bw = Math.min(tw + 150, KB_SAFE_W);
      c.fillStyle = KB.INK; c.beginPath(); c.roundRect(-bw / 2 + 10, -64 + 10, bw, 128, 64); c.fill();
      c.fillStyle = KB.RED; c.strokeStyle = KB.INK; c.lineWidth = 9; c.beginPath(); c.roundRect(-bw / 2, -64, bw, 128, 64); c.fill(); c.stroke();
      text(c, label, 0, 23, { size: 64, weight: 900, color: KB.W, ls: 4, shadow: 0 }); c.restore(); }
    const handles = CTA.handles_line || SERIES.handles_line;
    if (handles) [].concat(handles).forEach((l, i) => text(c, l, 540, 1290 + i * 52, { size: 34, weight: 800, color: KB.INK, ls: 2, alpha: ease(u, 1.1, 1.5), shadow: 0 }));
  };
};
// safe zone: map pins keep their label clear of the action rail
const _kbPin0 = kbPin;
kbPin = function (c, x, y, label, u, at = 0.3, col = KB.RED) { return _kbPin0(c, KB_S() ? Math.min(Math.max(x, 220), 760) : x, KB_S() ? Math.min(y, 1140) : y, label, u, at, col); };
