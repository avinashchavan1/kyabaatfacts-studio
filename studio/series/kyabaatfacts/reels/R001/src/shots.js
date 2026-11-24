// ===== R001 · Bijli vs Suraj (Science Wala Sach) — Kya Baat look (series/art/brand.js) =====
// Every shot: (ctx, u = seconds into shot, p = 0..1, sh = timeline entry, t = global seconds, post = {ui, sat, flash, noLogo})
const R1_CAT = { label: 'SCIENCE WALA SACH', col: '#20B2A6' };
function buildScenes() {}
const R1_FACTS = { 3: { big: '5,500°C', label: 'SURAJ KI SURFACE', src: 'UCAR · BRITANNICA' }, 4: { big: '28,000°C', label: 'BIJLI KE AASPAAS KI HAWA', src: 'NOAA · NATIONAL WEATHER SERVICE' }, 7: { big: '1.5 CRORE °C', label: 'SURAJ KA CORE', src: 'NASA' } };

// ---- reel-local drawing helpers (prefixed: never redeclare library names) ----
function r1Bolt(c, x0, y0, x1, y1, seed, w = 16, a = 1, col = '#FFF6C8') {
  const r = rng(seed), pts = [[x0, y0]], n = 14;
  for (let i = 1; i < n; i++) { const f = i / n; pts.push([lerp(x0, x1, f) + (r() - 0.5) * 120, lerp(y0, y1, f) + (r() - 0.5) * 30]); }
  pts.push([x1, y1]);
  c.save(); c.globalAlpha = a; c.lineJoin = 'round'; c.lineCap = 'round';
  for (const [lw, cl, bl] of [[w * 4.5, 'rgba(255,200,61,0.35)', 40], [w * 2, 'rgba(255,240,180,0.8)', 18], [w, col, 0]]) {
    c.shadowColor = '#FFC83D'; c.shadowBlur = bl; c.strokeStyle = cl; c.lineWidth = lw; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
  }
  // a couple of branches
  for (let b = 0; b < 3; b++) { const k = 3 + Math.floor(r() * 8), [bx, by] = pts[k]; c.lineWidth = w * 0.45; c.strokeStyle = col; c.beginPath(); c.moveTo(bx, by); let x = bx, y = by; for (let j = 0; j < 4; j++) { x += (r() - 0.3) * 70 * (b % 2 ? 1 : -1); y += 30 + r() * 30; c.lineTo(x, y); } c.stroke(); }
  c.restore(); return pts;
}
function r1Cloud(c, x, y, s, col = '#3B3585', a = 1) {
  c.save(); c.globalAlpha = a; c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 8;
  const B = [[-170, 20, 110], [-60, -40, 140], [80, -20, 130], [190, 30, 100], [0, 50, 120]];
  c.beginPath(); B.forEach(([bx, by, r]) => { c.moveTo(x + (bx + r) * s, y + by * s); c.arc(x + bx * s, y + by * s, r * s, 0, Math.PI * 2); }); c.fill();
  c.restore();
}
function r1Sun(c, x, y, R, t, o = {}) {
  const { rays = true, face = false, mood = 'kya', cut = 0, crown = 0 } = o;
  c.save();
  if (rays) { c.translate(x, y); c.rotate(t * 0.25); c.fillStyle = '#FFB020'; for (let i = 0; i < 14; i++) { c.rotate(Math.PI * 2 / 14); c.beginPath(); c.moveTo(R * 1.08, -R * 0.12); c.lineTo(R * 1.42, 0); c.lineTo(R * 1.08, R * 0.12); c.closePath(); c.fill(); } c.setTransform(1, 0, 0, 1, 0, 0); }
  glow(c, x, y, R * 1.9, '#FFB020', 0.35);
  const g = c.createRadialGradient(x - R * 0.3, y - R * 0.3, R * 0.1, x, y, R); g.addColorStop(0, '#FFF1A8'); g.addColorStop(0.55, '#FFC83D'); g.addColorStop(1, '#FF8A1F');
  c.fillStyle = g; c.strokeStyle = KB.INK; c.lineWidth = 12; c.beginPath(); c.arc(x, y, R, 0, Math.PI * 2); c.fill(); c.stroke();
  // granules (surface texture)
  const r = rng(3); c.fillStyle = 'rgba(255,140,30,0.35)'; for (let i = 0; i < 40; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * R * 0.9; c.beginPath(); c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 6 + r() * 14, 0, Math.PI * 2); c.fill(); }
  if (cut > 0) {   // cut-away wedge showing the core
    c.save(); c.beginPath(); c.moveTo(x, y); c.arc(x, y, R - 6, -Math.PI * 0.05, -Math.PI * 0.05 + Math.PI * 0.62 * cut); c.closePath(); c.clip();
    const cg = c.createRadialGradient(x, y, 0, x, y, R); cg.addColorStop(0, '#FFFFFF'); cg.addColorStop(0.22, '#FFF6C8'); cg.addColorStop(0.3, '#FF6A00'); cg.addColorStop(0.62, '#E8481C'); cg.addColorStop(1, '#B8321A'); c.fillStyle = cg; c.fillRect(x - R, y - R, R * 2, R * 2);
    glow(c, x, y, R * 0.45, '#FFFFFF', 0.9 * cut); c.restore();
    c.strokeStyle = KB.INK; c.lineWidth = 8; c.beginPath(); c.moveTo(x + Math.cos(-Math.PI * 0.05) * R, y + Math.sin(-Math.PI * 0.05) * R); c.lineTo(x, y); c.lineTo(x + Math.cos(-Math.PI * 0.05 + Math.PI * 0.62 * cut) * R, y + Math.sin(-Math.PI * 0.05 + Math.PI * 0.62 * cut) * R); c.stroke();
  }
  if (face) kbEyes(c, x - (cut ? R * 0.28 : 0), y - R * 0.12, R * 0.2, t, mood, 2);
  if (crown > 0) {
    const b = backOut(crown), cy = y - R * 1.02; c.save(); c.translate(x, cy); c.scale(b, b); c.fillStyle = '#FFD84D'; c.strokeStyle = KB.INK; c.lineWidth = 8;
    c.beginPath(); c.moveTo(-110, 40); c.lineTo(-120, -60); c.lineTo(-55, -10); c.lineTo(0, -80); c.lineTo(55, -10); c.lineTo(120, -60); c.lineTo(110, 40); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = KB.RED; [[-62, 10], [0, 0], [62, 10]].forEach(([gx, gy]) => { c.beginPath(); c.arc(gx, gy, 12, 0, Math.PI * 2); c.fill(); c.stroke(); }); c.restore();
  }
  c.restore();
}
function r1Stamp(c, str, x, y, u, at, col = KB.RED, size = 120, rot = -0.12) {
  const b = backOut(map(u, at, at + 0.35)); if (b <= 0) return;
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(b * 1.0, b * 1.0); c.font = `900 ${size}px Montserrat`; c.letterSpacing = '2px';
  const w = c.measureText(str).width + 80, h = size * 1.25;
  c.fillStyle = KB.INK; c.beginPath(); c.roundRect(-w / 2 + 12, -h / 2 + 12, w, h, 30); c.fill();
  c.fillStyle = col; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, 30); c.fill(); c.stroke(); c.restore();
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(b, b); text(c, str, 0, size * 0.36, { size, weight: 900, color: KB.W, shadow: 0 }); c.restore();
}
function r1Shake(ctx, u, at, amt = 18, len = 0.35) { const k = 1 - map(u, at, at + len); if (u < at || k <= 0) return; ctx.translate(Math.sin(u * 90) * amt * k, Math.cos(u * 77) * amt * k); }

const SHOTS = {
  // 1 — hook: lightning vs sun, split screen; the eyes look from one to the other
  1(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(600, 0); ctx.lineTo(480, H); ctx.lineTo(0, H); ctx.closePath(); ctx.clip();
    kbNight(ctx, t); r1Cloud(ctx, 260, 560, 1.05, '#2B276A');
    const fl = ((u * 1.3) % 1.6) < 0.18; r1Bolt(ctx, 250, 600, 330, 1500, 11 + Math.floor(u / 1.6), 16, fl ? 1 : 0.85);
    if (fl) { ctx.fillStyle = 'rgba(255,246,200,0.15)'; ctx.fillRect(0, 0, W, H); }
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.moveTo(600, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H); ctx.lineTo(480, H); ctx.closePath(); ctx.clip();
    kbYellow(ctx, t); r1Sun(ctx, 820, 1030, 230, t);
    ctx.restore();
    ctx.strokeStyle = KB.INK; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(600, 0); ctx.lineTo(480, H); ctx.stroke();
    post.ui = c => {
      kbBadge(c, R1_CAT.label, R1_CAT.col, ease(u, 0, 0.3));
      const b = backOut(map(u, 0.1, 0.5)); c.save(); c.translate(540, 1000); c.scale(b, b); c.fillStyle = KB.RED; c.strokeStyle = KB.INK; c.lineWidth = 10; c.beginPath(); c.arc(0, 0, 95, 0, Math.PI * 2); c.fill(); c.stroke(); text(c, 'VS', 0, 30, { size: 88, weight: 900, color: KB.W, shadow: 0 }); c.restore();
      (sh.card || []).forEach(([s, col], i) => { const q = ease(u, (i ? st[1] : 0.05) - 0.05, (i ? st[1] : 0.05) + 0.3); if (q > 0) textFit(c, s, 540, 430 + i * 130 + (1 - q) * 22, { size: 104, weight: 900, color: col || KB.W, alpha: q, stroke: 14, shadow: 0 }); });
      const look = Math.sin(u * 2.2) > 0 ? [-0.8, 0] : [0.8, 0]; kbEye(c, 488, 1250, 46, look, {}); kbEye(c, 592, 1250, 46, look, {});
    };
  },
  // 2 — "most people say: the Sun!" … "but wait!" (stamp + shake, the sun's eyes go wide)
  2(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2);
    kbYellow(ctx, t); ctx.save(); r1Shake(ctx, u, st[1], 22);
    const proud = lerp(1, 1.08, ease(u, 0.2, 1.4) * (u < st[1] ? 1 : 0));
    r1Sun(ctx, 540, 1000, 300 * proud, t, { face: true, mood: u < st[1] ? 'kya' : 'wow' });
    ctx.restore();
    post.ui = c => {
      kbBadge(c, R1_CAT.label, R1_CAT.col);
      const q = ease(u, 0.6, 1.0); if (q > 0) { kbPanel(c, 170, 300 + (1 - q) * 30, 740, 170, KB.W, 85); text(c, 'SURAJ! ☀', 540, 418 + (1 - q) * 30, { size: 92, weight: 900, color: KB.INK, alpha: q, shadow: 0 }); }
      r1Stamp(c, 'RUKO!', 540, 560, u, st[1], KB.RED, 130);
    };
  },
  // 3 — the Sun's surface: thermometer rises, fact card 5,500°C
  3(ctx, u, p, sh, t, post) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#FF9B3D'); g.addColorStop(1, '#FFC83D'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    r1Sun(ctx, 470, 1260, 470 * lerp(1, 1.05, p), t, { rays: true });
    // thermometer
    const tx = 900, ty0 = 760, ty1 = 1380, lvl = easeOut(map(u, 0.8, 4.5)) * 0.42;
    ctx.fillStyle = KB.W; ctx.strokeStyle = KB.INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.roundRect(tx - 34, ty0, 68, ty1 - ty0, 34); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(tx, ty1 + 30, 62, 0, Math.PI * 2); ctx.fillStyle = KB.RED; ctx.fill(); ctx.stroke();
    ctx.fillStyle = KB.RED; ctx.fillRect(tx - 18, lerp(ty1, ty0 + 20, lvl), 36, ty1 - lerp(ty1, ty0 + 20, lvl) + 20);
    post.ui = c => { kbBadge(c, R1_CAT.label, R1_CAT.col); kbFact(c, u, R1_FACTS[3], 330, 2.2, '#FF8A1F'); };
  },
  // 4 — lightning strikes: flash, glowing hot air around the bolt, fact card 28,000°C
  4(ctx, u, p, sh, t, post) {
    const hit = 1.4, after = u - hit;
    kbNight(ctx, t, '#07061A', '#1F1C52');
    r1Cloud(ctx, 540, 520, 1.5, '#2B276A'); r1Cloud(ctx, 160, 600, 0.9, '#1F1C52'); r1Cloud(ctx, 930, 640, 0.9, '#1F1C52');
    ctx.fillStyle = '#0C0A26'; ctx.beginPath(); ctx.moveTo(0, 1560); for (let x = 0; x <= W; x += 60) ctx.lineTo(x, 1540 + Math.sin(x * 0.02) * 20); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
    if (after > 0) {
      const heat = Math.min(1, after / 1.2);
      glow(ctx, 560, 1100, 380 * heat, '#FF6A00', 0.5 * heat); glow(ctx, 560, 1100, 220 * heat, '#FFC83D', 0.45 * heat);
      const fl = (after % 0.9) < 0.07 || after < 0.12; r1Bolt(ctx, 520, 640, 600, 1540, 21, 20, fl ? 1 : 0.92);
      post.flash = after < 0.15 ? 0.85 * (1 - after / 0.15) : 0; post.flashCol = '#FFF6C8';
      // heat shimmer rings
      for (let i = 0; i < 3; i++) { const q = ((after * 0.7 + i / 3) % 1); ctx.strokeStyle = rgba('#FFC83D', 0.5 * (1 - q)); ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(560, 1100, 80 + q * 300, 120 + q * 420, 0, 0, Math.PI * 2); ctx.stroke(); }
    }
    post.ui = c => { kbBadge(c, R1_CAT.label, R1_CAT.col); kbFact(c, u, R1_FACTS[4], 300, Math.max(hit + 1.2, sh.dur * 0.55), KB.RED); };
  },
  // 5 — 5x bars, then the catchphrase: giant eyes go WOW + "KYA BAAT HAI!"
  5(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2), kb = st[1];
    kbYellow(ctx, t, 2);
    const g1 = easeOut(map(u, 0.2, 0.8)), g2 = easeOut(map(u, 0.6, 2.4)), base = 1250, unit = 130;
    const bars = [[300, unit * g1, '#FF8A1F', 'SURAJ', '5,500°C'], [760, unit * 5 * g2, KB.RED, 'BIJLI', '28,000°C']];
    bars.forEach(([x, h, col, lab, val]) => {
      kbPanel(ctx, x - 120, base - h, 240, Math.max(h, 1), col, 24, 12);
      text(ctx, lab, x, base + 80, { size: 56, weight: 900, color: KB.INK, shadow: 0 });
      if (h > 60) text(ctx, val, x, base - h - 30, { size: 46, weight: 900, color: KB.INK, shadow: 0 });
    });
    post.ui = c => {
      kbBadge(c, R1_CAT.label, R1_CAT.col);
      r1Stamp(c, '5X GARAM!', 540, 460, u, 1.6, KB.RED, 110, -0.08);
      if (u >= kb - 0.1) {
        const q = backOut(map(u, kb - 0.1, kb + 0.3)); c.save(); c.fillStyle = rgba(KB.Y, 0.92 * Math.min(1, q)); c.fillRect(0, 0, W, H); c.restore();
        c.save(); c.translate(540, 900); c.scale(q, q); kbEyes(c, 0, 0, 170, t, 'wow', 1); c.restore();
        text(c, 'KYA BAAT HAI!', 540, 1310, { size: 118 * Math.min(1, q), weight: 900, color: KB.INK, shadow: 0 });
      }
    };
  },
  // 6 — why thunder: the air bursts outward, then pulls back in → BOOM
  6(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 2), s2 = st[1];
    kbNight(ctx, t, '#07061A', '#262260'); ctx.save(); r1Shake(ctx, u, s2 + 4.2, 26, 0.6);
    r1Cloud(ctx, 540, 470, 1.4, '#2B276A');
    const fl = (u % 1.4) < 0.08; r1Bolt(ctx, 520, 560, 580, 1560, 31, 18, fl ? 1 : 0.9);
    if (u > s2) {
      const e = u - s2, out = e < 2.8, q = out ? easeOut(e / 2.8) : 1 - easeOut(Math.min(1, (e - 2.8) / 1.0));
      for (let i = 0; i < 4; i++) { const r = 120 + q * (180 + i * 110); ctx.strokeStyle = rgba(out ? '#FFC83D' : '#9BD3FF', 0.75 - i * 0.15); ctx.lineWidth = 12 - i * 2; ctx.beginPath(); ctx.ellipse(550, 1060, r * 0.75, r, 0, 0, Math.PI * 2); ctx.stroke(); }
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, r0 = 160 + q * 200, r1 = r0 + 80, dir = out ? 1 : -1; ctx.strokeStyle = out ? KB.Y : '#9BD3FF'; ctx.lineWidth = 12; ctx.lineCap = 'round';
        const x0 = 550 + Math.cos(a) * (dir > 0 ? r0 : r1), y0 = 1060 + Math.sin(a) * (dir > 0 ? r0 : r1), x1 = 550 + Math.cos(a) * (dir > 0 ? r1 : r0), y1 = 1060 + Math.sin(a) * (dir > 0 ? r1 : r0);
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const ah = Math.atan2(y1 - y0, x1 - x0); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(ah - 0.5) * 30, y1 - Math.sin(ah - 0.5) * 30); ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(ah + 0.5) * 30, y1 - Math.sin(ah + 0.5) * 30); ctx.stroke(); }
    }
    ctx.restore();
    post.ui = c => {
      kbBadge(c, R1_CAT.label, R1_CAT.col);
      if (u < s2) { const q = ease(u, 0.2, 0.6); kbPanel(c, 140, 330, 800, 170, KB.W, 85); text(c, 'BADAL KYUN GARJATE HAIN?', 540, 436, { size: 52, weight: 900, color: KB.INK, alpha: q, shadow: 0 }); }
      else { const e = u - s2; text(c, e < 2.8 ? 'HAWA PHAILTI HAI →' : 'PHIR SIKUDTI HAI ←', 540, 420, { size: 60, weight: 900, color: e < 2.8 ? KB.Y : '#9BD3FF', stroke: 12, shadow: 0, alpha: ease(u, s2, s2 + 0.3) });
        r1Stamp(c, 'GAD-GAD-GAD!', 540, 640, u, s2 + 4.2, KB.RED, 96, 0.06); }
    };
  },
  // 7 — the twist: cut-away to the core (1.5 crore °C), then the sun gets its crown: BOSS
  7(ctx, u, p, sh, t, post) {
    const st = sentenceStarts(sh, 3);
    kbNight(ctx, t, '#14123A', '#3B3585');
    const cut = easeOut(map(u, st[1] - 0.2, st[1] + 1.2)), crown = map(u, st[2], st[2] + 0.5);
    r1Sun(ctx, 540, 1080, 330, t, { face: true, mood: u < st[1] ? 'hmm' : (u < st[2] ? 'wow' : 'kya'), cut, crown });
    post.ui = c => {
      kbBadge(c, R1_CAT.label, R1_CAT.col);
      if (u < st[1]) { const q = ease(u, 0.2, 0.6); kbPanel(c, 120, 330, 840, 170, KB.W, 85); text(c, 'SURAJ KO KAM MAT SAMJHO', 540, 436, { size: 54, weight: 900, color: KB.INK, alpha: q, shadow: 0 }); }
      else if (u < st[2]) kbFact(c, u, R1_FACTS[7], 300, st[1] + 1.0, '#E8481C');
      else r1Stamp(c, 'ASLI BOSS ☀', 540, 470, u, st[2] + 0.3, KB.RED, 104, -0.06);
    };
  },
  8(ctx, u, p, sh, t, post) { endCard(ctx, u, p, sh, t, post); },
};
