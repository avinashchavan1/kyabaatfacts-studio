// ===== R008 · Mohenjo-daro: 4,500 saal pehle drainage! (Itihaas Ke Raaz) — Kya Baat look =====
const R8_CAT = { label: 'ITIHAAS KE RAAZ', col: '#C47832' };
function buildScenes() { return kbLoadImg('lothal', 'proof_lothal.jpg'); }
const R8_BRICK = '#C8704A', R8_BRICK2 = '#A9573A';

function r8Sky(ctx) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#FFC97A'); g.addColorStop(1, '#FFEBC2'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function r8Bricks(c, x, y, w, h, bw = 70, bh = 34) {
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.fillStyle = R8_BRICK; c.fillRect(x, y, w, h); c.strokeStyle = R8_BRICK2; c.lineWidth = 4;
  for (let r = 0; r * bh < h; r++) { const yy = y + r * bh; c.beginPath(); c.moveTo(x, yy); c.lineTo(x + w, yy); c.stroke(); for (let k = -1; k * bw < w; k++) { const xx = x + k * bw + (r % 2 ? bw / 2 : 0); c.beginPath(); c.moveTo(xx, yy); c.lineTo(xx, yy + bh); c.stroke(); } }
  c.restore(); c.strokeStyle = KB.INK; c.lineWidth = 8; c.strokeRect(x, y, w, h);
}
// cross-section: street surface + covered drain channel below; lift 0..1 raises one cover slab; flow animates water
function r8Drain(c, t, lift = 0, flow = 1, y0 = 1100) {
  r8Bricks(c, 0, y0, W, 70);                               // street surface
  c.fillStyle = '#6E513C'; c.fillRect(0, y0 + 70, W, 380);  // earth
  r8Bricks(c, 140, y0 + 120, 800, 40); r8Bricks(c, 140, y0 + 300, 800, 40); r8Bricks(c, 140, y0 + 160, 40, 140); r8Bricks(c, 900, y0 + 160, 40, 140);
  c.fillStyle = '#3282DC'; c.fillRect(180, y0 + 230, 720, 70);
  if (flow) { c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 6; for (let k = 0; k < 8; k++) { const x = 180 + ((t * 120 + k * 95) % 720); c.beginPath(); c.moveTo(x, y0 + 255); c.lineTo(x + 40, y0 + 255); c.stroke(); } }
  // cover slabs on the street
  for (let k = 0; k < 5; k++) { const x = 160 + k * 160, up = k === 2 ? lift : 0; c.save(); c.translate(x + 70, y0 - 10 - up * 220); c.rotate(-up * 0.25); c.fillStyle = '#B98E6B'; c.strokeStyle = KB.INK; c.lineWidth = 7; c.fillRect(-70, -18, 140, 36); c.strokeRect(-70, -18, 140, 36); c.restore(); }
}

const SHOTS = {
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); r8Sky(ctx); r8Drain(ctx, t, 0, 0);
    r8Bricks(ctx, 60, 760, 300, 340); r8Bricks(ctx, 720, 700, 300, 400);
    post.ui = c => { kbBadge(c, R8_CAT.label, R8_CAT.col, ease(u, 0, 0.3)); (sh.card || []).forEach(([s, col], i) => { const q = ease(u, (i ? st[1] : 0.05) - 0.05, (i ? st[1] : 0.05) + 0.3); if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 96, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }, 980); }); kbEyes(c, 540, 900, 44, t, u < st[1] ? 'hmm' : 'sach', 2); };
  },
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); r8Sky(ctx); r8Drain(ctx, t, 0, 1);
    post.ui = c => { kbBadge(c, R8_CAT.label, R8_CAT.col); kbPin(c, 540, 900, 'MOHENJO-DARO', u, 0.2); if (u > st[1]) { kbArrow(c, 860, 880, 760, 1290, KB.INK, 12); text(c, 'PAKKI EENT KI NAALI', 760, 850, { size: 44, weight: 900, color: KB.INK, shadow: 0, alpha: ease(u, st[1], st[1] + 0.4) }); }
      kbStamp(c, 'DHAKI HUI NAALI!', 540, 430, u, st[1] + 0.3, KB.RED, 92); kbProof(c, 'lothal', u, Math.min(st[1] + 1.4, sh.dur - 2.4), 2.2, 'ISI SABHYATA KA LOTHAL', 'Lothal, Gujarat · Emmanuel Dyan / Flickr · CC BY 2.0'); };
  },
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); r8Sky(ctx); const lift = u < st[1] ? 0 : Math.sin(Math.min(1, (u - st[1]) / 2.2) * Math.PI); r8Drain(ctx, t, lift, 1);
    post.ui = c => { kbBadge(c, R8_CAT.label, R8_CAT.col); kbLabel(c, u < st[1] ? 'SAFAI KAISE?' : 'DHAKKAN UTHAO → SAAF KARO → RAKHO', 320, u, u < st[1] ? 0.1 : st[1], { size: u < st[1] ? 60 : 42, fill: u < st[1] ? KB.W : KB.Y }); };
  },
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); r8Sky(ctx); r8Drain(ctx, t, 0, 1);
    r8Bricks(ctx, 620, 640, 400, 460); ctx.fillStyle = '#9BD3FF'; ctx.fillRect(680, 980, 280, 40); ctx.strokeStyle = KB.INK; ctx.lineWidth = 6; ctx.strokeRect(680, 980, 280, 40);
    ctx.strokeStyle = '#3282DC'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(700, 1020); ctx.lineTo(600, 1100); ctx.lineTo(600, 1330); ctx.stroke();
    const pq = ease(u, st[1], st[1] + 0.5); if (pq > 0) { ctx.save(); ctx.globalAlpha = pq; ctx.fillStyle = '#4A3424'; ctx.beginPath(); ctx.ellipse(380, 1430, 110, 50, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = KB.INK; ctx.stroke(); ctx.restore(); }
    post.ui = c => { kbBadge(c, R8_CAT.label, R8_CAT.col); kbLabel(c, u < st[1] ? 'GHAR KA PAANI → SADAK KI NAALI' : 'KACHRA NEECHE BAITHE: GADDHE!', 320, u, u < st[1] ? 0.2 : st[1], { size: 44, fill: u < st[1] ? KB.W : KB.Y }); };
  },
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); kbYellow(ctx, t);
    for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) { const x = 150 + k * 200, y = 640 + r * 200, q = backOut(map(u, 0.1 + (r * 4 + k) * 0.06, 0.4 + (r * 4 + k) * 0.06)); if (q > 0) { ctx.save(); ctx.translate(x + 80, y + 80); ctx.scale(q, q); r8Bricks(ctx, -80, -80, 160, 160, 40, 20); ctx.restore(); } }
    post.ui = c => { kbBadge(c, R8_CAT.label, R8_CAT.col); kbLabel(c, '4,500 SAAL PEHLE: SMART CITY!', 320, u, 0.2, { size: 48 }); kbKyaBaat(c, u, t, st[1]); };
  },
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2); r8Sky(ctx);
    if (u < st[1]) { r8Bricks(ctx, 90, 760, 900, 640); ctx.fillStyle = '#2B1D14'; ctx.beginPath(); ctx.moveTo(340, 1400); ctx.lineTo(340, 1080); ctx.lineTo(420, 1000); ctx.lineTo(500, 940); ctx.lineTo(580, 940); ctx.lineTo(660, 1000); ctx.lineTo(740, 1080); ctx.lineTo(740, 1400); ctx.closePath(); ctx.fill(); ctx.strokeStyle = KB.INK; ctx.lineWidth = 8; ctx.stroke();
      ctx.fillStyle = KB.Y; ctx.beginPath(); ctx.arc(540, 1200, 24, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(528, 1226, 24, 90); }
    else { kbYellow(ctx, t); kbPanel(ctx, 240, 760, 600, 600, '#9BC9E8', 40); ctx.fillStyle = '#58AA32'; ctx.beginPath(); ctx.moveTo(300, 820); ctx.lineTo(560, 800); ctx.lineTo(780, 900); ctx.lineTo(760, 1300); ctx.lineTo(420, 1310); ctx.lineTo(290, 1100); ctx.closePath(); ctx.fill(); ctx.strokeStyle = KB.INK; ctx.lineWidth = 6; ctx.stroke(); }
    post.ui = c => { kbBadge(c, R8_CAT.label, R8_CAT.col); if (u < st[1]) kbStamp(c, 'ISME AADMI CHAL SAKE!', 540, 450, u, 0.5, KB.RED, 76); else kbPin(c, 520, 1150, 'SINDH, PAKISTAN', u, st[1] + 0.2); };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
