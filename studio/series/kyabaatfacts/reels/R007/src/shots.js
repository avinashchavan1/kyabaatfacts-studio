// ===== R007 · Shahad kabhi kharab kyun nahi hota? (Science Wala Sach) — Kya Baat look =====
const KB_SAFE = true;                                   // safe-zone layout pilot (Instagram/YouTube UI never covers text)
const SUB_STYLE = { maxW: 640, bottom: 1400 };
const R7_CAT = { label: 'SCIENCE WALA SACH', col: '#20B2A6' };
function buildScenes() { return kbLoadImg('comb', 'proof_honeycomb.jpg'); }

function r7Jar(c, x, y, s, t, o = {}) {
  const { lid = 1, mood = 'kya', level = 0.75 } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.lineWidth = 10; c.strokeStyle = KB.INK; c.lineJoin = 'round';
  c.fillStyle = 'rgba(255,255,255,0.55)'; c.beginPath(); c.roundRect(-150, -170, 300, 340, 50); c.fill();
  c.save(); c.beginPath(); c.roundRect(-150, -170, 300, 340, 50); c.clip(); c.fillStyle = '#F5A623'; c.fillRect(-150, 170 - 340 * level, 300, 340); c.fillStyle = 'rgba(255,255,255,0.25)'; c.fillRect(-120, -120, 40, 260); c.restore();
  c.beginPath(); c.roundRect(-150, -170, 300, 340, 50); c.stroke();
  c.fillStyle = '#FFFFFF'; c.beginPath(); c.roundRect(-110, -40, 220, 90, 18); c.fill(); c.stroke();
  c.font = '900 44px Montserrat'; c.textAlign = 'center'; c.fillStyle = KB.INK; c.fillText('SHAHAD', 0, 20);
  c.save(); c.translate(0, -195 - (1 - lid) * 160); c.rotate((1 - lid) * -0.5); c.fillStyle = KB.RED; c.beginPath(); c.roundRect(-165, -35, 330, 60, 16); c.fill(); c.stroke(); c.restore();
  c.restore(); kbEyes(c, x, y - 105 * s, 26 * s, t, mood, 5);
}
function r7Bee(c, x, y, s, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineWidth = 7; c.strokeStyle = KB.INK;
  const fl = Math.sin(t * 40) * 0.4; c.fillStyle = 'rgba(255,255,255,0.8)'; for (const sgn of [-1, 1]) { c.save(); c.rotate(sgn * (0.5 + fl)); c.beginPath(); c.ellipse(0, -60, 34, 56, 0, 0, Math.PI * 2); c.fill(); c.stroke(); c.restore(); }
  c.fillStyle = '#FFC83D'; c.beginPath(); c.ellipse(0, 0, 80, 56, 0, 0, Math.PI * 2); c.fill(); c.stroke();
  c.save(); c.beginPath(); c.ellipse(0, 0, 80, 56, 0, 0, Math.PI * 2); c.clip(); c.fillStyle = KB.INK; c.fillRect(-20, -60, 22, 120); c.fillRect(28, -60, 22, 120); c.restore();
  c.restore(); kbEye(c, x - 52 * s, y - 8 * s, 18 * s, [0.6, -0.6], { brows: false });
}
function r7Germ(c, x, y, r, t, seed) { c.save(); c.translate(x, y); c.rotate(t + seed); c.fillStyle = '#58AA32'; c.strokeStyle = KB.INK; c.lineWidth = 5; c.beginPath(); for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, rr = r * (k % 2 ? 0.75 : 1.05); c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } c.closePath(); c.fill(); c.stroke(); c.restore(); }

const SHOTS = {
  // 1 — claim-first hook: the tomb honey pot, card up at frame 1
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#FFB36B'); g.addColorStop(1, '#F5D59A'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#E3B46A'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(120, 1250); ctx.lineTo(480, 760); ctx.lineTo(840, 1250); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#D9A55A'; ctx.fillRect(0, 1250, W, H - 1250);
    const b = backOut(map(u, 0.0, 0.35)); ctx.save(); ctx.translate(560, 1180); ctx.scale(b * 1.15, b * 1.15); ctx.fillStyle = '#B8642E'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(-60, -170); ctx.lineTo(60, -170); ctx.lineTo(50, -130); ctx.bezierCurveTo(170, -100, 170, 90, 0, 120); ctx.bezierCurveTo(-170, 90, -170, -100, -50, -130); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#F5A623'; ctx.beginPath(); ctx.ellipse(0, -170, 60, 16, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    post.ui = c => {
      kbBadge(c, R7_CAT.label, R7_CAT.col);
      (sh.card || []).forEach(([s_, col], i) => { const at = i < 2 ? 0 : st[1], q = i < 2 ? 1 : ease(u, at - 0.05, at + 0.25); if (q > 0) textFit(c, s_, 540, 430 + i * 112 + (1 - q) * 18, { size: 100, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }); });
      kbEyes(c, 560, 1080, 30, t, u < st[1] ? 'kya' : 'wow', 5);
    };
  },
  // 2 — "so why doesn't it go bad? three secrets!"
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbYellow(ctx, t); r7Jar(ctx, 540, 1060, 1.3 * backOut(map(u, 0.05, 0.4)), t, { mood: u < st[1] ? 'hmm' : 'kya' });
    post.ui = c => { kbBadge(c, R7_CAT.label, R7_CAT.col); kbLabel(c, 'KHARAB KYUN NAHI HOTA?', 330, u, 0.1, { size: 50 }); kbStamp(c, '3 RAAZ!', 540, 600, u, st[1] + 0.1, KB.RED, 120); };
  },
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbYellow(ctx, t); r7Jar(ctx, 540, 1080, 1.2, t, { mood: 'kya' });
    const n = 6; for (let i = 0; i < n; i++) { const a = i * Math.PI * 2 / n + t * 0.5, k = u > st[1] ? Math.min(1, (u - st[1]) / 1.0) : 0, R = 330 + k * 260; r7Germ(ctx, 540 + Math.cos(a) * R, 1080 + Math.sin(a) * R * 0.9, 34, t, i); }
    post.ui = c => { kbBadge(c, R7_CAT.label, R7_CAT.col); kbLabel(c, 'RAAZ #1: KAM PAANI', 320, u, 0.2, { size: 58 }); if (u > st[1]) kbStamp(c, 'KEETANU OUT!', 540, 540, u, st[1] + 0.4, KB.RED, 80, -0.04); };
  },
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbYellow(ctx, t);
    if (u < st[1]) { kbPanel(ctx, 200, 820, 680, 420, KB.W, 40); text(ctx, 'pH', 540, 960, { size: 90, weight: 900, color: KB.INK, shadow: 0 }); text(ctx, '3 – 4.5', 540, 1110, { size: 120, weight: 900, color: KB.RED, shadow: 0 }); text(ctx, 'ACIDIC', 540, 1200, { size: 50, weight: 900, color: KB.INK, shadow: 0 }); }
    else { r7Bee(ctx, 380 + Math.sin(u * 2) * 30, 1000, 1.4, t); const b = backOut(map(u, st[1] + 1.0, st[1] + 1.4)); ctx.save(); ctx.translate(760, 1080); ctx.scale(b, b); ctx.fillStyle = '#9BD3FF'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, -170); ctx.lineTo(140, -110); ctx.lineTo(120, 60); ctx.quadraticCurveTo(0, 170, 0, 170); ctx.quadraticCurveTo(0, 170, -120, 60); ctx.lineTo(-140, -110); ctx.closePath(); ctx.fill(); ctx.stroke(); text(ctx, 'H₂O₂', 0, 20, { size: 64, weight: 900, color: KB.INK, shadow: 0 }); ctx.restore(); }
    post.ui = c => { kbBadge(c, R7_CAT.label, R7_CAT.col); kbLabel(c, u < st[1] ? 'RAAZ #2: ACIDIC' : 'RAAZ #3: HYDROGEN PEROXIDE', 320, u, u < st[1] ? 0.2 : st[1], { size: 50, fill: u < st[1] ? KB.W : KB.Y }); };
  },
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbYellow(ctx, t); r7Bee(ctx, 540, 1080, 2.0, t);
    post.ui = c => { kbBadge(c, R7_CAT.label, R7_CAT.col); kbLabel(c, 'KUDRAT KA PRESERVATIVE!', 320, u, 0.2, { size: 52 }); kbProof(c, 'comb', u, 0.2, Math.min(2.4, st[1] - 0.4), 'ASLI MADHUMAKKHI KA CHHATTA', 'Photo: BotheredByBees / Flickr · CC BY 2.0'); kbKyaBaat(c, u, t, st[1]); };
  },
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbYellow(ctx, t);
    const open = u > st[1] ? easeOut(map(u, st[1], st[1] + 0.8)) : 0;
    r7Jar(ctx, 540, 1120, 1.3, t, { lid: 1 - open, mood: open > 0.5 ? 'hmm' : 'kya' });
    if (open > 0.5) for (let k = 0; k < 7; k++) { const ph = (t * 0.7 + k / 7) % 1, x = 300 + k * 80, y = 600 + ph * 360; ctx.fillStyle = rgba('#3B7BFF', 0.85 * (1 - ph * 0.5)); ctx.beginPath(); ctx.moveTo(x, y - 24); ctx.quadraticCurveTo(x + 18, y, x, y + 14); ctx.quadraticCurveTo(x - 18, y, x, y - 24); ctx.fill(); }
    post.ui = c => { kbBadge(c, R7_CAT.label, R7_CAT.col); if (u < st[1]) kbLabel(c, 'LEKIN DHYAAN RAHE...', 320, u, 0.1, { fill: KB.Y }); else { kbLabel(c, 'HAWA KI NAMI = KHATRA', 320, u, st[1], { size: 54 }); kbStamp(c, 'DHAKKAN BAND RAKHO!', 540, 540, u, st[1] + 1.4, KB.RED, 76, 0.04); } };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
