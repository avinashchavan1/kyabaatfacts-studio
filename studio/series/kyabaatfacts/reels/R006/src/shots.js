// ===== R006 · Aloo, tamatar, mirch: Indian nahi! (Khaane Ka Itihaas) — Kya Baat look =====
const R6_CAT = { label: 'KHAANE KA ITIHAAS', col: '#E24682' };
function buildScenes() { return Promise.all([kbLoadImg('chilli', 'proof_chillies.jpg'), kbLoadImg('potato', 'proof_potatoes.jpg')]); }

function r6Chilli(c, x, y, s, t, eyes = true, rot = 0) {
  c.save(); c.translate(x, y); c.rotate(rot + Math.sin(t * 3) * 0.05); c.scale(s, s); c.lineWidth = 9; c.strokeStyle = KB.INK; c.lineJoin = 'round';
  c.fillStyle = '#E8392C'; c.beginPath(); c.moveTo(-40, -110); c.bezierCurveTo(60, -110, 70, 40, 10, 150); c.bezierCurveTo(0, 170, -10, 160, -5, 140); c.bezierCurveTo(30, 40, -10, -40, -60, -70); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#3FB46A'; c.beginPath(); c.moveTo(-60, -80); c.quadraticCurveTo(-50, -130, 0, -115); c.quadraticCurveTo(-20, -95, -40, -100); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-30, -112); c.quadraticCurveTo(-40, -150, -10, -165); c.stroke();
  c.restore(); if (eyes) kbEyes(c, x + 5 * s, y - 30 * s, 18 * s, t, 'kya', 1);
}
function r6Potato(c, x, y, s, t, eyes = true) {
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#C9965A'; c.strokeStyle = KB.INK; c.lineWidth = 9;
  c.beginPath(); c.moveTo(-120, 0); c.bezierCurveTo(-130, -90, -20, -110, 40, -90); c.bezierCurveTo(130, -70, 140, 40, 90, 80); c.bezierCurveTo(30, 120, -110, 100, -120, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#8A5A2A'; [[-60, -40], [50, -50], [70, 30], [-30, 50], [0, -10]].forEach(([dx, dy]) => { c.beginPath(); c.arc(dx, dy, 7, 0, Math.PI * 2); c.fill(); });
  c.restore(); if (eyes) kbEyes(c, x, y - 10 * s, 20 * s, t, 'kya', 2);
}
function r6Tomato(c, x, y, s, t, eyes = true) {
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#FF4B3E'; c.strokeStyle = KB.INK; c.lineWidth = 9;
  c.beginPath(); c.ellipse(0, 0, 120, 105, 0, 0, Math.PI * 2); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.ellipse(-50, -45, 22, 34, -0.5, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#3FB46A'; c.beginPath(); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 5; c.lineTo(Math.cos(a) * 55, -95 + Math.sin(a) * 25); c.lineTo(Math.cos(a + 0.6) * 15, -100 + Math.sin(a + 0.6) * 8); } c.closePath(); c.fill(); c.stroke();
  c.restore(); if (eyes) kbEyes(c, x, y + 5 * s, 20 * s, t, 'kya', 3);
}
function r6Ship(c, x, y, s, t) {
  c.save(); c.translate(x, y + Math.sin(t * 2) * 6); c.rotate(Math.sin(t * 1.6) * 0.04); c.scale(s, s); c.lineWidth = 9; c.strokeStyle = KB.INK; c.lineJoin = 'round';
  c.fillStyle = '#8A5A2A'; c.beginPath(); c.moveTo(-200, 0); c.lineTo(200, 0); c.lineTo(150, 80); c.lineTo(-160, 80); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -280); c.stroke(); c.beginPath(); c.moveTo(-110, 0); c.lineTo(-110, -200); c.stroke();
  c.fillStyle = '#FFF6E4'; c.beginPath(); c.moveTo(10, -260); c.quadraticCurveTo(140, -160, 10, -40); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-100, -190); c.quadraticCurveTo(0, -120, -100, -40); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = KB.RED; c.beginPath(); c.moveTo(0, -280); c.lineTo(70, -262); c.lineTo(0, -244); c.closePath(); c.fill(); c.stroke();
  c.restore();
}
function r6Sea(ctx, t) { kbYellow(ctx, t); ctx.fillStyle = '#4A93E4'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 1250); for (let x = 0; x <= W; x += 30) ctx.lineTo(x, 1250 + Math.sin(x * 0.03 + t * 3) * 12); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); ctx.stroke(); }

const SHOTS = {
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    const b = i => backOut(map(u, 0.2 + i * 0.25, 0.5 + i * 0.25));
    if (b(0) > 0) r6Potato(ctx, 270, 1080, 0.9 * b(0), t); if (b(1) > 0) r6Tomato(ctx, 540, 1020, 0.95 * b(1), t); if (b(2) > 0) r6Chilli(ctx, 820, 1080, 1.1 * b(2), t);
    post.ui = c => { kbBadge(c, R6_CAT.label, R6_CAT.col, ease(u, 0, 0.3)); (sh.card || []).forEach(([s, col], i) => { const q = ease(u, (i ? st[1] : 0.05) - 0.05, (i ? st[1] : 0.05) + 0.3); if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 96, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }, 980); }); };
  },
  2(ctx, u, p, sh, t, post) {
    kbYellow(ctx, t);
    const f = easeOut(map(u, 0.4, 2.2));
    ctx.save(); ctx.setLineDash([24, 18]); ctx.strokeStyle = KB.INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(160, 1150); ctx.quadraticCurveTo(540, 650, 920, 1150); ctx.stroke(); ctx.restore();
    const px = (k) => { const q = Math.max(0, Math.min(1, f - k * 0.12)); return [lerp(160, 920, q), (1 - q) * (1 - q) * 1150 + 2 * (1 - q) * q * 650 + q * q * 1150 - 40]; };
    [[r6Potato, 0.45], [r6Tomato, 0.45], [r6Chilli, 0.55]].forEach(([fn, s], k) => { const [x, y] = px(k); fn(ctx, x, y, s, t); });
    post.ui = c => { kbBadge(c, R6_CAT.label, R6_CAT.col); kbPin(c, 160, 1300, 'AMERICA', u, 0.1, '#3282DC'); kbPin(c, 920, 1300, 'BHARAT', u, 0.3, KB.RED); kbStamp(c, 'AMERICA SE AAYE!', 540, 430, u, 1.4, KB.RED, 88); };
  },
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    r6Sea(ctx, t); r6Ship(ctx, lerp(260, 640, easeOut(p)), 1180, 1.0, t);
    post.ui = c => { kbBadge(c, R6_CAT.label, R6_CAT.col); kbLabel(c, 'PORTUGUESE VYAPARI', 320, u, 0.3, { size: 56 }); kbPin(c, 900, 1150, 'GOA', u, st[1], KB.RED); kbProof(c, 'chilli', u, st[1] + 0.3, Math.min(2.3, sh.dur - st[1] - 0.5), 'ASLI MIRCH', 'Photo: JimReeves / Flickr · CC BY 2.0'); };
  },
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    ctx.fillStyle = '#8A5A2A'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(540, 1150, 300, 70, 0, 0, Math.PI); ctx.lineTo(240, 1150); ctx.bezierCurveTo(240, 1380, 840, 1380, 840, 1150); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#E8792C'; ctx.beginPath(); ctx.ellipse(540, 1150, 290, 60, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    for (let k = 0; k < 3; k++) { const x = 420 + k * 120, ph = (t * 0.8 + k * 0.3) % 1; ctx.strokeStyle = rgba('#FFFFFF', 0.7 * (1 - ph)); ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x, 1090 - ph * 200); ctx.bezierCurveTo(x - 30, 1040 - ph * 200, x + 30, 1000 - ph * 200, x, 960 - ph * 200); ctx.stroke(); }
    r6Chilli(ctx, 470, 1130, 0.5, t, false, -0.6); r6Chilli(ctx, 620, 1120, 0.45, t, false, 0.5);
    post.ui = c => { kbBadge(c, R6_CAT.label, R6_CAT.col); kbLabel(c, 'MIRCH KE BINA KHAANA? ADHOORA!', 320, u, 0.2, { size: 46 }); kbKyaBaat(c, u, t, st[1]); };
  },
  5(ctx, u, p, sh, t, post) {
    kbYellow(ctx, t); r6Potato(ctx, 540, 1100, 1.6 * backOut(map(u, 0.05, 0.5)), t);
    post.ui = c => { kbBadge(c, R6_CAT.label, R6_CAT.col); kbStamp(c, 'ALOO: ~1600', 540, 430, u, 0.6, KB.RED, 110); kbProof(c, 'potato', u, Math.min(1.5, sh.dur - 2.4), Math.min(2.2, sh.dur - 1.6), 'ASLI ALOO', 'Photo: 16:9clue / Flickr · CC BY 2.0', 0.03); };
  },
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t); r6Tomato(ctx, 540, 1120, 1.4, t);
    post.ui = c => {
      kbBadge(c, R6_CAT.label, R6_CAT.col);
      if (u < st[1]) kbLabel(c, 'TAMATAR KA TWIST!', 320, u, 0.1, { fill: KB.Y });
      else { const q1 = backOut(map(u, st[1] + 0.2, st[1] + 0.6)), q2 = backOut(map(u, st[1] + 1.8, st[1] + 2.2));
        if (q1 > 0) { c.save(); c.translate(300, 430); c.scale(q1, q1); kbPanel(c, -200, -80, 400, 160, KB.W, 30); text(c, 'AAYA: PEHLE', 0, 20, { size: 50, weight: 900, color: KB.INK, shadow: 0 }); c.restore(); }
        if (q2 > 0) { c.save(); c.translate(780, 430); c.scale(q2, q2); kbPanel(c, -200, -80, 400, 160, KB.Y, 30); text(c, 'KHAAYA: 1800s', 0, 20, { size: 46, weight: 900, color: KB.RED, shadow: 0 }); c.restore(); } }
    };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
