// ===== R011 · Great Wall space se dikhti hai? MYTH! (Myth or Fact?) — Kya Baat look =====
const KB_SAFE = true;                                   // safe-zone layout (v2)
const SUB_STYLE = { maxW: 640, bottom: 1400 };
const R11_CAT = { label: 'MYTH OR FACT?', col: '#FF4B3E' };
function buildScenes() { return Promise.all([kbLoadImg('iss', 'proof_iss.jpg'), kbLoadImg('wall', 'proof_wall.jpg')]); }

// Earth seen from orbit: a big curved horizon at the bottom with a thin atmosphere glow
function r11Earth(c, t, y0 = 1250, lights = 0) {
  const R = 1500, cx = 540, cy = y0 + R;
  c.save(); const g = c.createRadialGradient(cx, cy, R - 20, cx, cy, R + 70); g.addColorStop(0, 'rgba(120,190,255,0.55)'); g.addColorStop(1, 'rgba(120,190,255,0)');
  c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R + 70, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#2E6FC4'; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.arc(cx, cy, R, 0, Math.PI * 2); c.fill(); c.stroke();
  c.save(); c.beginPath(); c.arc(cx, cy, R, 0, Math.PI * 2); c.clip();
  c.fillStyle = '#5FAF4E'; [[260, y0 + 60, 260, 70], [760, y0 + 90, 300, 80], [520, y0 + 230, 380, 90]].forEach(([x, y, w, h]) => { c.beginPath(); c.ellipse(x, y, w, h, -0.1, 0, Math.PI * 2); c.fill(); });
  if (lights > 0) { for (let k = 0; k < 70; k++) { const x = (k * 137) % 1080, y = y0 + 40 + (k * 71) % 420, a = lights * (0.6 + 0.4 * Math.sin(t * 3 + k)); c.fillStyle = `rgba(255,214,90,${a})`; c.beginPath(); c.arc(x, y, 5 + (k % 3) * 2, 0, Math.PI * 2); c.fill(); }
    c.strokeStyle = `rgba(255,214,90,${0.7 * lights})`; c.lineWidth = 4; [[60, y0 + 120, 1020, y0 + 260], [120, y0 + 380, 980, y0 + 150], [540, y0 + 40, 520, y0 + 460]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); }); }
  c.restore(); c.restore();
}
function r11ISS(c, x, y, s, t) {
  c.save(); c.translate(x, y + Math.sin(t * 1.5) * 8); c.rotate(-0.12); c.scale(s, s); c.strokeStyle = KB.INK; c.lineWidth = 8;
  c.fillStyle = '#3B5BA8'; [[-230, -40], [130, -40]].forEach(([px, py]) => { c.beginPath(); c.roundRect(px, py, 100, 80, 6); c.fill(); c.stroke(); c.beginPath(); c.moveTo(px + 50, py); c.lineTo(px + 50, py + 80); c.stroke(); });
  c.beginPath(); c.moveTo(-130, 0); c.lineTo(130, 0); c.stroke();
  c.fillStyle = '#E8E4DA'; c.beginPath(); c.roundRect(-60, -28, 120, 56, 20); c.fill(); c.stroke();
  c.restore();
}
// the wall: a zig-zag ribbon with tiny towers
function r11Wall(c, pts, w, col = '#B8A27A') {
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = KB.INK; c.lineWidth = w + 10; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
  c.strokeStyle = col; c.lineWidth = w; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
  pts.forEach(([x, y], i) => { if (i % 2) return; c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 6; c.beginPath(); c.roundRect(x - w * 0.9, y - w * 1.3, w * 1.8, w * 1.6, 4); c.fill(); c.stroke(); });
  c.restore();
}
function r11Helmet(c, x, y, s, t, mood) {
  c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = KB.INK; c.lineWidth = 12;
  c.fillStyle = '#F2F2F2'; c.beginPath(); c.arc(0, 0, 190, 0, Math.PI * 2); c.fill(); c.stroke();
  c.fillStyle = '#1F2E5A'; c.beginPath(); c.ellipse(0, 10, 140, 110, 0, 0, Math.PI * 2); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.ellipse(-60, -30, 30, 50, -0.5, 0, Math.PI * 2); c.fill();
  c.fillStyle = KB.RED; c.beginPath(); c.roundRect(-50, 150, 100, 40, 10); c.fill(); c.stroke();
  c.restore(); kbEyes(c, x, y + 10 * s, 40 * s, t, mood, 11);
}
function r11X(c, x, y, s, q, col = KB.RED) {
  if (q <= 0) return; c.save(); c.translate(x, y); c.scale(q * s, q * s); c.strokeStyle = col; c.lineWidth = 34; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-100, -100); c.lineTo(100, 100); c.moveTo(100, -100); c.lineTo(-100, 100); c.stroke(); c.restore();
}
function r11Moon(c, x, y, r) {
  c.save(); c.fillStyle = '#E9E4D4'; c.strokeStyle = KB.INK; c.lineWidth = 9; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke();
  c.fillStyle = '#CFC8B2'; [[-0.3, -0.2, 0.2], [0.3, 0.25, 0.15], [0.05, 0.45, 0.1]].forEach(([dx, dy, rr]) => { c.beginPath(); c.arc(x + dx * r, y + dy * r, rr * r, 0, Math.PI * 2); c.fill(); });
  c.restore();
}
function r11Stars(c, t) { for (let k = 0; k < 60; k++) { const x = (k * 173) % 1080, y = (k * 97) % 1200, a = 0.4 + 0.4 * Math.sin(t * 2 + k); c.fillStyle = `rgba(255,255,255,${a})`; c.fillRect(x, y, 4, 4); } }

const SHOTS = {
  // 1 — hook: Earth from orbit, the ISS, a big question mark over the wall
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbNight(ctx, t, '#05051A', '#14123A'); r11Stars(ctx, t); r11Earth(ctx, t, 1180);
    r11ISS(ctx, 540, 960, 1.7 * backOut(map(u, 0.1, 0.5)), t);
    post.ui = c => { kbBadge(c, R11_CAT.label, R11_CAT.col, ease(u, 0, 0.3)); (sh.card || []).forEach(([s, col], i) => { const q = i ? ease(u, st[1] - 0.05, st[1] + 0.3) : 1; if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 96, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }, 980); }); };
  },
  // 2 — very long, but only ~6 m wide: the width next to a road
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t);
    if (u < st[1]) {
      const k = easeOut(map(u, 0.2, 1.6)), pts = []; for (let i = 0; i <= 10; i++) pts.push([60 + i * 96, 980 + Math.sin(i * 1.3) * 120]);
      r11Wall(ctx, pts.slice(0, 1 + Math.round(10 * k)), 34);
    } else {
      const q = backOut(map(u, st[1], st[1] + 0.4));
      ctx.save(); ctx.translate(540, 1050); ctx.scale(q, q);
      // the wall's top in cross-section, next to a two-lane road of the same width
      ctx.fillStyle = '#B8A27A'; ctx.strokeStyle = KB.INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.roundRect(-420, -150, 360, 300, 10); ctx.fill(); ctx.stroke();
      for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.roundRect(-420 + k * 95, -200, 60, 50, 4); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = '#4A4552'; ctx.beginPath(); ctx.roundRect(60, -150, 360, 300, 10); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = KB.W; ctx.lineWidth = 10; ctx.setLineDash([40, 30]); ctx.beginPath(); ctx.moveTo(240, -140); ctx.lineTo(240, 140); ctx.stroke(); ctx.setLineDash([]);
      ctx.restore();
    }
    post.ui = c => { kbBadge(c, R11_CAT.label, R11_CAT.col);
      if (u < st[1]) kbLabel(c, 'LAMBI? BAHUT!', 430, u, 0.3, { size: 60 });
      else { kbStamp(c, 'CHAUDI: SIRF ~6 M', 540, 430, u, st[1] + 0.2, KB.RED, 88); text(c, 'DEEWAR', 360, 1260, { size: 44, weight: 900, color: KB.INK, shadow: 0 }); text(c, 'SADAK', 720, 1260, { size: 44, weight: 900, color: KB.INK, shadow: 0 }); }
      // the real wall: long, but the walkway on top is narrow (box + label when the width is said)
      kbProof(c, 'wall', u, 0.4, Math.min(sh.dur - 1.2, st[1] + 2.6), 'ASLI GREAT WALL', 'Photo: Ray in Manila / Flickr · CC BY 2.0', -0.03,
        { focus: [0.7, 0.5], zoomTo: 1.45, notes: [{ x: 0.7, y: 0.5, r: 0.1, shape: 'box', at: Math.max(0.8, st[1] - 0.4), text: 'SIRF ~6 M CHAUDI!', tx: 0.32, ty: 0.16 }] }); };
  },
  // 3 — 2003: China's first astronaut came back and said he didn't see it
  3(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbNight(ctx, t, '#05051A', '#14123A'); r11Stars(ctx, t); r11Earth(ctx, t, 1260);
    r11Helmet(ctx, 540, 900, 1.0 * backOut(map(u, 0.1, 0.5)), t, u < st[1] ? 'kya' : 'hmm');
    post.ui = c => { kbBadge(c, R11_CAT.label, R11_CAT.col); kbStamp(c, '2003 · PEHLA CHINESE ASTRONAUT', 540, 430, u, 0.3, KB.Y, 64);
      if (u > st[1]) kbLabel(c, '"GREAT WALL? NAHI DIKHI!"', 620, u, st[1] + 0.3, { fill: KB.W, size: 54 }); };
  },
  // 4 — NASA: not to the naked eye from orbit, and not at all from the Moon
  4(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbNight(ctx, t, '#05051A', '#14123A'); r11Stars(ctx, t); r11Earth(ctx, t, 1250);
    const moonAt = st[1] + Math.max(0.8, (sh.dur - st[1]) * 0.55);
    // a big eye looking down at Earth, crossed out
    if (u > st[1] && u < moonAt - 0.15) { kbEyes(ctx, 540, 920, 90, t, 'hmm', 4); r11X(ctx, 540, 920, 1.2, backOut(map(u, st[1] + 0.6, st[1] + 1.0))); }
    if (u >= moonAt - 0.15) { r11Moon(ctx, 540, 900, 150 * backOut(map(u, moonAt - 0.15, moonAt + 0.25))); r11X(ctx, 540, 900, 1.3, backOut(map(u, moonAt + 0.2, moonAt + 0.55))); }
    post.ui = c => { kbBadge(c, R11_CAT.label, R11_CAT.col); kbStamp(c, 'NASA KE HISAAB SE', 540, 430, u, 0.2, KB.Y, 80);
      if (u > st[1] && u < moonAt) kbLabel(c, 'SIRF AANKHON SE: NAHI', 620, u, st[1] + 0.4, { size: 54 });
      if (u >= moonAt) kbLabel(c, 'CHAAND SE: BILKUL NAHI!', 620, u, moonAt, { fill: KB.Y, size: 54 }); };
  },
  // 5 — the famous photo: from the ISS, but with a 400 mm zoom lens, and only a tiny piece shows
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 3);
    kbNight(ctx, t, '#05051A', '#14123A'); r11Stars(ctx, t); r11Earth(ctx, t, 1250); r11ISS(ctx, 540, 900, 1.7, t);
    post.ui = c => { kbBadge(c, R11_CAT.label, R11_CAT.col); kbStamp(c, 'ZOOM LENS: 400 MM!', 540, 430, u, st[1] + 0.2, KB.RED, 88);
      kbProof(c, 'iss', u, 0.4, Math.max(4.0, st[2] - 0.5), 'NASA: SPACE STATION SE', 'Photo: NASA · ISS010-E-08497 (400 mm lens) · Public domain', 0.03, { focus: [0.5, 0.56], zoomTo: 1.6, notes: [{ x: 0.5, y: 0.56, r: 0.09, at: 1.2, text: 'YE HAI DEEWAR!', tx: 0.3, ty: 0.18 }] });
      kbKyaBaat(c, u, t, st[2]); };
  },
  // 6 — cities and roads ARE visible; send this reel next time (loop back to the hook)
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbNight(ctx, t, '#05051A', '#0E0C2E'); r11Stars(ctx, t); r11Earth(ctx, t, 1000, ease(u, 0.3, 1.2));
    post.ui = c => { kbBadge(c, R11_CAT.label, R11_CAT.col);
      if (u < st[1]) kbLabel(c, 'SHEHAR + SADAKEIN: DIKHTI HAIN!', 430, u, 0.3, { fill: KB.Y, size: 50 });
      else kbStamp(c, 'YE REEL BHEJ DO! 📲', 540, 430, u, st[1] + 0.2, KB.RED, 88); };
  },
  7(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
