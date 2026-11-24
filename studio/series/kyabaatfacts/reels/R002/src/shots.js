// ===== R002 · Taj Mahal: 22 saal, 20,000 kaarigar (Itihaas Ke Raaz) — Kya Baat look =====
const KB_SAFE = true;                                   // safe-zone layout (v2)
const SUB_STYLE = { maxW: 640, bottom: 1400 };
const R2_CAT = { label: 'ITIHAAS KE RAAZ', col: '#C47832' };
const R2_FACTS = { 2: { big: '22 SAAL', label: '1631 – 1653', src: 'TAJMAHAL.GOV.IN' }, 3: { big: '~20,000', label: 'MAZDOOR AUR KAARIGAR', src: 'TAJMAHAL.GOV.IN' }, 5: { big: 'MAKRANA', label: 'SAFED SANGMARMAR · RAJASTHAN', src: 'MAKRANA MARBLE' } };
function buildScenes() { return Promise.all([kbLoadImg('taj', 'proof_taj.jpg'), kbLoadImg('inlay', 'proof_inlay.jpg')]); }

// the Taj Mahal, sticker style: platform, main hall with arch, onion dome, chhatris, 4 minarets. grow 0..1 builds it bottom-up
function r2Taj(c, x, y, s, grow = 1, col = '#FFFFFF', sky = null) {
  c.save(); c.translate(x, y); c.scale(s, s);
  if (grow < 1) { c.beginPath(); c.rect(-700, -900 + 1000 * (1 - grow), 1400, 1100); c.clip(); }
  c.lineWidth = 9; c.strokeStyle = KB.INK; c.fillStyle = col; c.lineJoin = 'round';
  const R = (x0, y0, w, h) => { c.beginPath(); c.rect(x0, y0, w, h); c.fill(); c.stroke(); };
  R(-560, 0, 1120, 70);                                                    // plinth
  for (const mx of [-500, 500]) { R(mx - 26, -470, 52, 470); c.beginPath(); c.arc(mx, -470, 40, Math.PI, 0); c.fill(); c.stroke(); R(mx - 34, -330, 68, 14); R(mx - 34, -180, 68, 14); }   // minarets
  R(-300, -330, 600, 330);                                                 // main hall
  c.fillStyle = sky || '#C9D8F2'; c.beginPath(); c.moveTo(-90, 0); c.lineTo(-90, -190); c.quadraticCurveTo(0, -300, 90, -190); c.lineTo(90, 0); c.closePath(); c.fill(); c.stroke();   // central iwan
  for (const ax of [-210, 210]) { c.beginPath(); c.moveTo(ax - 45, -40); c.lineTo(ax - 45, -150); c.quadraticCurveTo(ax, -205, ax + 45, -150); c.lineTo(ax + 45, -40); c.closePath(); c.fill(); c.stroke(); }
  c.fillStyle = col;
  R(-150, -380, 300, 50);                                                  // drum
  c.beginPath(); c.moveTo(-160, -380); c.bezierCurveTo(-230, -520, -90, -640, 0, -690); c.bezierCurveTo(90, -640, 230, -520, 160, -380); c.closePath(); c.fill(); c.stroke();   // onion dome
  c.beginPath(); c.moveTo(0, -690); c.lineTo(0, -760); c.stroke(); c.beginPath(); c.arc(0, -770, 12, 0, Math.PI * 2); c.fillStyle = '#FFD84D'; c.fill(); c.stroke(); c.fillStyle = col;
  for (const cx of [-250, 250]) { R(cx - 45, -400, 90, 70); c.beginPath(); c.moveTo(cx - 55, -400); c.quadraticCurveTo(cx, -480, cx + 55, -400); c.closePath(); c.fill(); c.stroke(); }   // chhatris
  c.restore();
}
function r2Sky(ctx, top, bot) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function r2Worker(c, x, y, s, t, seed) {
  const r = rng(seed), hue = ['#FF8A1F', '#3282DC', '#E24682', '#289650', '#FFC83D'][Math.floor(r() * 5)], bob = Math.sin(t * 6 + seed) * 4;
  c.save(); c.translate(x, y + bob); c.scale(s, s); c.strokeStyle = KB.INK; c.lineWidth = 6;
  c.fillStyle = hue; c.beginPath(); c.roundRect(-26, -60, 52, 70, 18); c.fill(); c.stroke();
  c.fillStyle = '#C68A5A'; c.beginPath(); c.arc(0, -82, 24, 0, Math.PI * 2); c.fill(); c.stroke();
  c.fillStyle = '#FFFFFF'; c.beginPath(); c.ellipse(0, -100, 30, 12, 0, Math.PI, 0); c.fill(); c.stroke();   // turban/cap
  c.restore();
}

const SHOTS = {
  // 1 — hook: the Taj at dawn, the eyes wonder
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r2Sky(ctx, '#FFB36B', '#FFE3A8'); glow(ctx, 540, 900, 600, '#FFFFFF', 0.4);
    r2Taj(ctx, 540, 1350, 0.82 * lerp(1, 1.04, p), 1, '#FFFFFF', '#FFD9A8');
    ctx.fillStyle = '#9BC9E8'; ctx.fillRect(0, 1405, W, H - 1405);
    post.ui = c => {
      kbBadge(c, R2_CAT.label, R2_CAT.col, ease(u, 0, 0.3));
      (sh.card || []).forEach(([s, col], i) => { const q = i ? ease(u, st[1] - 0.05, st[1] + 0.3) : 1; if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 112, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }); });
      kbEyes(c, 540, 1600, 44, t, u < st[1] ? 'hmm' : 'kya', 3);
    };
  },
  // 2 — "one year? five?" … "22 years!": calendar flips 1631 → 1653
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2), s2 = st[1];
    kbYellow(ctx, t); ctx.save(); kbShake(ctx, u, s2 + 0.9, 16);
    const yr = Math.round(lerp(0, 22, easeOut(map(u, 0.3, Math.max(1.5, sh.dur - 0.6)))));
    kbPanel(ctx, 240, 720, 600, 560, KB.W, 40);
    ctx.fillStyle = KB.RED; ctx.beginPath(); ctx.roundRect(240, 720, 600, 130, [40, 40, 0, 0]); ctx.fill();
    for (const rx of [360, 720]) { ctx.fillStyle = KB.INK; ctx.beginPath(); ctx.roundRect(rx - 14, 690, 28, 70, 14); ctx.fill(); }
    text(ctx, 'SAAL', 540, 815, { size: 64, weight: 900, color: KB.W, shadow: 0 });
    text(ctx, String(yr), 540, 1150, { size: 280, weight: 900, color: KB.INK, shadow: 0 });
    text(ctx, String(1631 + yr), 540, 1240, { size: 54, weight: 800, color: KB.RED, shadow: 0 });
    ctx.restore();
    post.ui = c => { kbBadge(c, R2_CAT.label, R2_CAT.col); kbLabel(c, u < s2 ? '1631: KAAM SHURU' : '1653: POORA!', 330, u, u < s2 ? 0.1 : s2, { size: 54, fill: u < s2 ? KB.W : KB.Y }); if (u > s2) kbStamp(c, '22 SAAL!', 540, 620, u, s2 + 0.9, KB.RED, 120); };
  },
  // 3 — the workforce: workers keep arriving, counter → 20,000
  3(ctx, u, p, sh, t, post) {
    r2Sky(ctx, '#FFC97A', '#FFE9B8');
    r2Taj(ctx, 540, 1000, 0.5, 0.35 + 0.25 * p, '#F4EEE2');
    ctx.fillStyle = '#E8C89A'; ctx.fillRect(0, 1000, W, H - 1000);
    const n = Math.floor(lerp(4, 46, easeOut(p)));
    for (let i = 0; i < n; i++) { const r = rng(i * 7 + 1), x = 70 + r() * 940, y = 1100 + r() * 300; r2Worker(ctx, x, y, 0.75 + r() * 0.3, t, i); }
    post.ui = c => { kbBadge(c, R2_CAT.label, R2_CAT.col); kbFact(c, u, Object.assign({}, R2_FACTS[3], { big: '~' + kbCount(20000, u, 0.4, sh.dur * 0.7) }), 300, 0.3, KB.RED); kbPin(c, 860, 960, 'UTTAR BHARAT', u, 1.2); };
  },
  // 4 — the Taj rises; then the catchphrase
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r2Sky(ctx, '#7FB8E8', '#D7ECFA'); glow(ctx, 540, 800, 500, '#FFFFFF', 0.35);
    const g = easeOut(map(u, 0.1, st[1] - 0.2));
    r2Taj(ctx, 540, 1320, 0.8, g, '#FFFFFF');
    if (g < 1) { ctx.strokeStyle = rgba('#8A5A2A', 0.8); ctx.lineWidth = 8; for (let k = 0; k < 6; k++) { const yy = 1320 - g * 650 + k * 40; ctx.beginPath(); ctx.moveTo(60, yy); ctx.lineTo(1020, yy); ctx.stroke(); } }
    ctx.fillStyle = '#9BC9E8'; ctx.fillRect(0, 1375, W, H - 1375);
    post.ui = c => { kbBadge(c, R2_CAT.label, R2_CAT.col); kbLabel(c, '22 SAAL · 20,000 LOG', 320, u, 0.2); kbProof(c, 'taj', u, 0.3, Math.min(2.4, st[1] - 0.5), 'ASLI TAJ MAHAL', 'Photo: Paul and Jill / Flickr · CC BY 2.0'); kbKyaBaat(c, u, t, st[1]); };
  },
  // 5 — Makrana marble: a gleaming block + map pin
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    const bx = 280, by = 900, sh_ = Math.sin(u * 2.2) * 0.5 + 0.5;
    kbPanel(ctx, bx, by, 520, 360, '#F7F4EC', 30, 16);
    ctx.save(); ctx.beginPath(); ctx.roundRect(bx, by, 520, 360, 30); ctx.clip(); const gx = bx - 300 + ((u * 260) % 1100); const g = ctx.createLinearGradient(gx, 0, gx + 200, 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,0.95)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(bx, by, 520, 360);
    ctx.strokeStyle = 'rgba(160,160,170,0.5)'; ctx.lineWidth = 3; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(bx, by + 60 + k * 70); ctx.bezierCurveTo(bx + 200, by + 20 + k * 70, bx + 300, by + 110 + k * 70, bx + 520, by + 50 + k * 70); ctx.stroke(); } ctx.restore();
    for (let k = 0; k < 4; k++) { const a = u * 3 + k * 1.6, sx = bx + 80 + (k * 137) % 400, sy = by + 60 + (k * 89) % 240, s = (Math.sin(a) * 0.5 + 0.5) * 26; ctx.fillStyle = KB.W; ctx.beginPath(); ctx.moveTo(sx, sy - s); ctx.lineTo(sx + s * 0.3, sy - s * 0.3); ctx.lineTo(sx + s, sy); ctx.lineTo(sx + s * 0.3, sy + s * 0.3); ctx.lineTo(sx, sy + s); ctx.lineTo(sx - s * 0.3, sy + s * 0.3); ctx.lineTo(sx - s, sy); ctx.lineTo(sx - s * 0.3, sy - s * 0.3); ctx.fill(); }
    post.ui = c => { kbBadge(c, R2_CAT.label, R2_CAT.col); kbFact(c, u, R2_FACTS[5], 300, 0.3, '#C47832'); kbPin(c, 830, 880, 'RAJASTHAN', u, 0.9); if (u > st[1]) kbStamp(c, 'AAJ BHI CHAMAKTA!', 540, 1380, u, st[1] + 0.2, KB.RED, 72, 0.04); kbProof(c, 'inlay', u, 2.0, Math.min(2.3, st[1] - 2.2), 'ASLI SANGMARMAR', 'Photo: gregor_y / Flickr · CC BY-SA 2.0', 0.03); };
  },
  // 6 — the twist: tomb 1648, gardens + buildings 1653
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2), s2 = st[1], half = s2 + (sh.dur - s2) * 0.5;
    r2Sky(ctx, '#8EC5F0', '#E2F1FB');
    r2Taj(ctx, 540, 1230, 0.62, 1, '#FFFFFF');
    const gq = easeOut(map(u, half, half + 1.2));
    ctx.fillStyle = '#E8C89A'; ctx.fillRect(0, 1270, W, H - 1270);
    if (gq > 0) { ctx.save(); ctx.globalAlpha = gq; ctx.fillStyle = '#58AA32'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 6; for (let k = 0; k < 8; k++) { const x = 80 + k * 132; ctx.beginPath(); ctx.ellipse(x, 1330, 46, 70, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); } ctx.fillStyle = '#7FB8E8'; ctx.fillRect(470, 1290, 140, 260); ctx.strokeRect(470, 1290, 140, 260); ctx.restore(); }
    post.ui = c => {
      kbBadge(c, R2_CAT.label, R2_CAT.col);
      if (u < s2) kbLabel(c, 'EK TWIST!', 320, u, 0.1, { fill: KB.Y });
      else {
        const q1 = backOut(map(u, s2 + 0.3, s2 + 0.7)), q2 = backOut(map(u, half, half + 0.4));
        if (q1 > 0) { c.save(); c.translate(300, 420); c.scale(q1, q1); kbPanel(c, -200, -90, 400, 180, KB.W, 30); text(c, '1648', 0, -5, { size: 76, weight: 900, color: KB.INK, shadow: 0 }); text(c, 'MAQBARA ✓', 0, 60, { size: 36, weight: 900, color: '#289650', shadow: 0 }); c.restore(); }
        if (q2 > 0) { c.save(); c.translate(780, 420); c.scale(q2, q2); kbPanel(c, -200, -90, 400, 180, KB.Y, 30); text(c, '1653', 0, -5, { size: 76, weight: 900, color: KB.INK, shadow: 0 }); text(c, 'BAAG + IMAARATEIN', 0, 60, { size: 30, weight: 900, color: KB.RED, shadow: 0 }); c.restore(); }
      }
    };
  },
  // 7 — sunset Taj + reflection, Shah Jahan ❤ Mumtaz Mahal
  7(ctx, u, p, sh, t, post) {
    r2Sky(ctx, '#3B3585', '#FF8A5C'); glow(ctx, 540, 1000, 520, '#FFB36B', 0.5);
    r2Taj(ctx, 540, 1180, 0.66 * lerp(1, 1.04, p), 1, '#FFE9D6', '#FFB38A');
    ctx.fillStyle = '#2B276A'; ctx.fillRect(0, 1225, W, H - 1225);
    ctx.save(); ctx.globalAlpha = 0.35; ctx.translate(0, 2450); ctx.scale(1, -1); r2Taj(ctx, 540, 1225, 0.66 * lerp(1, 1.04, p), 1, '#FFE9D6', '#FFB38A'); ctx.restore();
    post.ui = c => {
      kbBadge(c, R2_CAT.label, R2_CAT.col);
      const q = ease(u, 0.6, 1.1); if (q > 0) { c.save(); c.globalAlpha = q; kbPanel(c, 190, 290, 700, 330, KB.W, 50); c.restore(); text(c, 'SHAH JAHAN', 540, 385, { size: 64, weight: 900, color: KB.INK, shadow: 0, alpha: q }); kbHeart(c, 540, 450, 0.75, KB.RED, 1 + Math.sin(u * 6) * 0.08); text(c, 'MUMTAZ MAHAL', 540, 575, { size: 64, weight: 900, color: KB.INK, shadow: 0, alpha: q }); }
    };
  },
  8(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
