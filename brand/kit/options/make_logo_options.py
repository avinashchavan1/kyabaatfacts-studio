"""Kya Baat Facts - 5 logo directions. python3 kb_options.py <fonts dir> <out dir>"""
import math, os, random, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

FONTS, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
S = 3            # supersample
A = 1080 * S     # canvas

INK = (20, 18, 58); YEL = (255, 200, 61); RED = (230, 57, 70); WHITE = (255, 255, 255); CREAM = (255, 244, 222)


def mont(size, w="Black"):
    f = ImageFont.truetype(os.path.join(FONTS, "Montserrat.ttf"), int(size)); f.set_variation_by_name(w); return f


def hindi(size):
    return ImageFont.truetype(os.path.join(FONTS, "Mukta-Bold.ttf"), int(size), layout_engine=ImageFont.Layout.RAQM)


def ctext(d, cx, y, t, f, fill, **kw):
    d.text((cx - d.textlength(t, font=f) / 2, y), t, font=f, fill=fill, **kw)


def done(im):
    return im.resize((1080, 1080), Image.LANCZOS)


# ---------------------------------------------------------------- 1. Hairaan Aankhen (the AA of BAAT are wide surprised eyes)
def opt1():
    im = Image.new("RGB", (A, A), YEL); d = ImageDraw.Draw(im)
    for y in range(0, A, 60 * S):
        for x in range(0, A, 60 * S):
            d.ellipse((x - 6, y - 6, x + 6, y + 6), fill=(245, 186, 40))
    cx = A / 2
    ctext(d, cx, 150 * S, "KYA", mont(230 * S), INK)
    f = mont(290 * S); word = "BAAT!"; y = 520 * S
    x0 = cx - d.textlength(word, font=f) / 2
    d.text((x0, y), word, font=f, fill=INK)
    # googly eyes peeking over the two A's
    for i in (1, 2):
        ax = x0 + d.textlength(word[:i], font=f) + d.textlength("A", font=f) / 2
        er = 78 * S; ey = y + 20 * S
        d.ellipse((ax - er, ey - er, ax + er, ey + er), fill=WHITE, outline=INK, width=16 * S)
        pr = 34 * S; px, py = ax + 22 * S, ey - 22 * S
        d.ellipse((px - pr, py - pr, px + pr, py + pr), fill=INK)
        d.ellipse((px + 4 * S, py - 24 * S, px + 20 * S, py - 8 * S), fill=WHITE)
        d.arc((ax - er * .9, ey - er * 2.1, ax + er * .9, ey - er * 1.0), 205, 335, fill=INK, width=18 * S)
    fw = mont(110 * S); tw = d.textlength("FACTS", font=fw)
    bx0, by0 = cx - tw / 2 - 50 * S, 860 * S
    d.rounded_rectangle((bx0, by0, bx0 + tw + 100 * S, by0 + 150 * S), 75 * S, fill=INK)
    ctext(d, cx, by0 + 12 * S, "FACTS", fw, YEL)
    return done(im)


# ---------------------------------------------------------------- 2. Truck Art (desi truck painting: bunting, flowers, "FACT OK PLEASE")
def opt2():
    im = Image.new("RGB", (A, A), (14, 92, 82)); d = ImageDraw.Draw(im)
    cols = [(255, 200, 61), (230, 57, 70), (255, 255, 255), (64, 160, 255), (255, 120, 40), (180, 80, 200)]
    # bunting triangles top + bottom
    n = 12; w = A / n
    for i in range(n):
        c = cols[i % len(cols)]
        d.polygon([(i * w, 0), ((i + 1) * w, 0), ((i + .5) * w, 120 * S)], fill=c)
        d.polygon([(i * w, A), ((i + 1) * w, A), ((i + .5) * w, A - 120 * S)], fill=cols[(i + 3) % len(cols)])
    # inner panel with double border
    m = 150 * S
    d.rounded_rectangle((m, m, A - m, A - m), 60 * S, fill=(10, 30, 40), outline=(255, 200, 61), width=16 * S)
    d.rounded_rectangle((m + 34 * S, m + 34 * S, A - m - 34 * S, A - m - 34 * S), 40 * S, outline=(230, 57, 70), width=8 * S)
    # corner flowers
    def flower(x, y, r, c1, c2):
        for k in range(8):
            a = k * math.pi / 4; px, py = x + math.cos(a) * r * .7, y + math.sin(a) * r * .7
            d.ellipse((px - r * .45, py - r * .45, px + r * .45, py + r * .45), fill=c1)
        d.ellipse((x - r * .45, y - r * .45, x + r * .45, y + r * .45), fill=c2)
    for (x, y) in [(m + 10 * S, m + 10 * S), (A - m - 10 * S, m + 10 * S), (m + 10 * S, A - m - 10 * S), (A - m - 10 * S, A - m - 10 * S)]:
        flower(x, y, 70 * S, (230, 57, 70), (255, 200, 61))
    cx = A / 2
    ctext(d, cx, 245 * S, "•  FACT OK PLEASE  •", mont(46 * S, "ExtraBold"), (255, 255, 255))
    # chunky lettering with red drop + white outline
    for word, y, size in [("KYA", 330 * S, 230 * S), ("BAAT!", 545 * S, 230 * S)]:
        f = mont(size)
        for k in range(18, 0, -1):
            ctext(d, cx + k * S, y + k * S, word, f, (180, 30, 40))
        ctext(d, cx, y, word, f, (255, 200, 61), stroke_width=10 * S, stroke_fill=WHITE)
    # FACTS on a scalloped red banner
    by = 800 * S
    d.rounded_rectangle((cx - 230 * S, by, cx + 230 * S, by + 110 * S), 20 * S, fill=(230, 57, 70), outline=WHITE, width=6 * S)
    ctext(d, cx, by + 8 * S, "FACTS", mont(84 * S), WHITE)
    return done(im)


# ---------------------------------------------------------------- 3. Retro Bollywood title (sunburst, 3D slanted letters)
def opt3():
    im = Image.new("RGB", (A, A), (255, 120, 30)); d = ImageDraw.Draw(im)
    cx, cy = A / 2, A * .52
    for k in range(36):
        a0 = k * 2 * math.pi / 36; a1 = a0 + math.pi / 36
        d.polygon([(cx, cy), (cx + math.cos(a0) * A, cy + math.sin(a0) * A), (cx + math.cos(a1) * A, cy + math.sin(a1) * A)], fill=(255, 168, 40))
    # vignette
    v = Image.new("L", (A, A), 0); ImageDraw.Draw(v).ellipse((-A * .2, -A * .2, A * 1.2, A * 1.2), fill=255)
    v = ImageChops.invert(v.filter(ImageFilter.GaussianBlur(A / 10)))
    im.paste((140, 30, 30), (0, 0), v.point(lambda p: int(p * .8)))
    # title layer (drawn straight, then sheared for the slant)
    T = Image.new("RGBA", (A, A), (0, 0, 0, 0)); td = ImageDraw.Draw(T)
    for word, y, size in [("KYA", 210 * S, 280 * S), ("BAAT!", 470 * S, 300 * S)]:
        f = mont(size)
        for k in range(30, 0, -1):     # 3D extrusion
            c = (110 + k * 2, 20, 30)
            ctext(td, cx + k * 1.2 * S, y + k * 1.6 * S, word, f, c)
        ctext(td, cx, y, word, f, (255, 236, 120), stroke_width=12 * S, stroke_fill=(60, 10, 20))
    T = T.transform(T.size, Image.AFFINE, (1, 0.22, -0.22 * A / 2, 0, 1, 0), resample=Image.BICUBIC)
    T = T.rotate(6, resample=Image.BICUBIC)
    im.paste(T, (0, 0), T)
    d = ImageDraw.Draw(im)
    # FACTS as a cinema ticket
    tx0, ty0, tx1, ty1 = cx - 260 * S, 850 * S, cx + 260 * S, 990 * S
    d.rectangle((tx0, ty0, tx1, ty1), fill=CREAM, outline=(60, 10, 20), width=8 * S)
    for yy in (ty0 + 35 * S, ty0 + 95 * S):
        d.ellipse((tx0 - 22 * S, yy - 18 * S, tx0 + 14 * S, yy + 18 * S), fill=(200, 80, 30))
        d.ellipse((tx1 - 14 * S, yy - 18 * S, tx1 + 22 * S, yy + 18 * S), fill=(200, 80, 30))
    ctext(d, cx, ty0 + 18 * S, "FACTS", mont(96 * S), (180, 30, 40))
    return done(im)


# ---------------------------------------------------------------- 4. Bulb-Diya (a light bulb whose filament is a diya flame)
def opt4():
    im = Image.new("RGB", (A, A), INK); d = ImageDraw.Draw(im)
    cx, cy = A / 2, 360 * S
    g = Image.new("L", (A, A), 0); ImageDraw.Draw(g).ellipse((cx - 380 * S, cy - 380 * S, cx + 380 * S, cy + 380 * S), fill=170)
    im.paste((255, 170, 60), (0, 0), g.filter(ImageFilter.GaussianBlur(120 * S)))
    d = ImageDraw.Draw(im)
    R = 200 * S
    # bulb glass
    d.ellipse((cx - R, cy - R, cx + R, cy + R), fill=(255, 250, 235), outline=WHITE, width=10 * S)
    d.polygon([(cx - R * .62, cy + R * .78), (cx + R * .62, cy + R * .78), (cx + R * .42, cy + R * 1.22), (cx - R * .42, cy + R * 1.22)], fill=(255, 250, 235))
    # screw base (gold bands)
    by = cy + R * 1.2
    for i in range(4):
        c = (230, 175, 70) if i % 2 == 0 else (190, 130, 40)
        d.rounded_rectangle((cx - R * .45, by + i * 34 * S, cx + R * .45, by + (i + 1) * 34 * S), 12 * S, fill=c)
    d.chord((cx - R * .25, by + 120 * S, cx + R * .25, by + 190 * S), 0, 180, fill=(120, 80, 20))
    # diya inside (bowl + flame) instead of a filament
    dy = cy + 70 * S
    d.chord((cx - 120 * S, dy - 56 * S, cx + 120 * S, dy + 88 * S), 0, 180, fill=(214, 120, 40))
    d.ellipse((cx - 120 * S, dy - 6 * S, cx + 120 * S, dy + 27 * S), fill=(240, 160, 70))
    pts = []
    for i in range(80):
        t = i / 79 * 2 * math.pi; x = math.sin(t) * (0.5 - 0.5 * math.cos(t)) ** .9; y = -math.cos(t)
        pts.append((cx + x * 56 * S, dy - 96 * S + y * 96 * S))
    d.polygon(pts, fill=(255, 150, 30))
    d.polygon([(cx + (x - cx) * .5, dy - 68 * S + (y - (dy - 96 * S)) * .5) for x, y in pts], fill=(255, 235, 150))
    # rays
    for k in range(9):
        a = math.pi + k * math.pi / 8
        r0, r1 = R + 40 * S, R + 110 * S
        d.line([(cx + math.cos(a) * r0, cy + math.sin(a) * r0), (cx + math.cos(a) * r1, cy + math.sin(a) * r1)], fill=YEL, width=18 * S)
    ctext(d, A / 2, 760 * S, "KYA BAAT!", mont(112 * S), WHITE)
    ctext(d, A / 2, 885 * S, "F A C T S", mont(48 * S, "ExtraBold"), YEL)
    return done(im)


# ---------------------------------------------------------------- 5. Dak Ticket (a postage stamp, with a postmark: "ROZ EK FACT")
def opt5():
    im = Image.new("RGB", (A, A), (196, 44, 52)); d = ImageDraw.Draw(im)
    # stamp with perforated edge
    m = 120 * S; x0, y0, x1, y1 = m, m, A - m, A - m
    sh = Image.new("L", (A, A), 0); ImageDraw.Draw(sh).rectangle((x0 + 20 * S, y0 + 30 * S, x1 + 20 * S, y1 + 30 * S), fill=120)
    im.paste((90, 10, 20), (0, 0), sh.filter(ImageFilter.GaussianBlur(25 * S)))
    d = ImageDraw.Draw(im)
    d.rectangle((x0, y0, x1, y1), fill=CREAM)
    hole = 26 * S; step = 70 * S
    for t in range(int(x0), int(x1) + 1, step):
        for yy in (y0, y1): d.ellipse((t - hole, yy - hole, t + hole, yy + hole), fill=(196, 44, 52))
    for t in range(int(y0), int(y1) + 1, step):
        for xx in (x0, x1): d.ellipse((xx - hole, t - hole, xx + hole, t + hole), fill=(196, 44, 52))
    # inner frame + art
    f0 = 80 * S
    d.rectangle((x0 + f0, y0 + f0, x1 - f0, y1 - f0), fill=(24, 60, 110))
    ix0, iy0, ix1, iy1 = x0 + f0, y0 + f0, x1 - f0, y1 - f0
    # little sun + hills scene
    d.ellipse((ix1 - 250 * S, iy0 + 60 * S, ix1 - 90 * S, iy0 + 220 * S), fill=(255, 190, 70))
    d.polygon([(ix0, iy1), (ix0, iy1 - 160 * S), (ix0 + 220 * S, iy1 - 260 * S), (ix0 + 470 * S, iy1 - 140 * S), (ix1, iy1 - 230 * S), (ix1, iy1)], fill=(18, 40, 80))
    cx = A / 2
    ctext(d, cx, iy0 + 150 * S, "KYA", mont(190 * S), CREAM)
    ctext(d, cx, iy0 + 330 * S, "BAAT!", mont(190 * S), YEL)
    ctext(d, cx, iy0 + 545 * S, "FACTS", mont(70 * S, "ExtraBold"), CREAM)
    # denomination + hindi
    d.text((ix0 + 30 * S, iy0 + 30 * S), "1 FACT", font=mont(52 * S), fill=YEL)
    hf = hindi(46 * S)
    d.text((ix0 + 32 * S, iy0 + 88 * S), "क्या बात!", font=hf, fill=CREAM)
    # postmark (circle + wavy lines) overlapping the corner
    P = Image.new("RGBA", (A, A), (0, 0, 0, 0)); pd = ImageDraw.Draw(P)
    pc = (x1 - 60 * S, y0 + 110 * S); pr = 150 * S; ink = (20, 18, 58, 170)
    pd.ellipse((pc[0] - pr, pc[1] - pr, pc[0] + pr, pc[1] + pr), outline=ink, width=10 * S)
    pd.ellipse((pc[0] - pr * .72, pc[1] - pr * .72, pc[0] + pr * .72, pc[1] + pr * .72), outline=ink, width=6 * S)
    ff = mont(40 * S, "ExtraBold")
    for j, t in enumerate(["ROZ EK", "FACT"]):
        w = pd.textlength(t, font=ff); pd.text((pc[0] - w / 2, pc[1] - 50 * S + j * 50 * S), t, font=ff, fill=ink)
    for j in range(4):
        yy = pc[1] - 90 * S + j * 60 * S
        pd.line([(pc[0] - pr - 40 * S - k * 0, yy + 15 * S * math.sin(k)) for k in range(1)] + [(pc[0] - pr - 360 * S + k * 20 * S, yy + 14 * S * math.sin(k * .6)) for k in range(16)], fill=ink, width=8 * S)
    P = P.rotate(-12, center=pc, resample=Image.BICUBIC)
    im.paste(P, (0, 0), P)
    return done(im)


OPTS = [
    ("1", "Hairaan Aankhen", "The 'AA' in BAAT become wide, surprised eyes", opt1),
    ("2", "Truck Art", "Desi truck painting: bunting, flowers, 'FACT OK PLEASE'", opt2),
    ("3", "Bollywood Title", "Retro film-poster letters on a sunburst + cinema ticket", opt3),
    ("4", "Bulb-Diya", "A light bulb whose filament is a diya flame", opt4),
    ("5", "Dak Ticket", "A postage stamp with a 'ROZ EK FACT' postmark", opt5),
]
imgs = []
for n, name, desc, fn in OPTS:
    im = fn(); im.save(f"{OUT}/option{n}_{name.lower().replace(' ', '_').replace('-', '_')}.png"); imgs.append(im)

# comparison sheet: square + circle crop + tiny (how it looks in a feed)
W = 5 * 560 + 60
sheet = Image.new("RGB", (W, 1100), (250, 246, 238)); d = ImageDraw.Draw(sheet)
d.text((40, 30), "KYA BAAT FACTS  -  5 logo options", font=mont(64), fill=INK)
mask = Image.new("L", (1080, 1080), 0); ImageDraw.Draw(mask).ellipse((0, 0, 1080, 1080), fill=255)
for i, ((n, name, desc, _), im) in enumerate(zip(OPTS, imgs)):
    x = 40 + i * 560
    sheet.paste(im.resize((520, 520), Image.LANCZOS), (x, 140))
    c = Image.new("RGB", (1080, 1080), (250, 246, 238)); c.paste(im, (0, 0), mask)
    sheet.paste(c.resize((220, 220), Image.LANCZOS), (x, 690))
    sheet.paste(c.resize((90, 90), Image.LANCZOS), (x + 250, 820))
    d.text((x + 250, 700), "circle crop\n+ feed size", font=mont(26, "SemiBold"), fill=(110, 105, 130))
    d.text((x, 940), f"{n}. {name}", font=mont(40), fill=INK)
    # wrap desc
    words, line, yy = desc.split(), "", 995
    for w in words:
        if d.textlength(line + " " + w, font=mont(26, "SemiBold")) > 510: d.text((x, yy), line.strip(), font=mont(26, "SemiBold"), fill=(80, 75, 100)); line, yy = "", yy + 34
        line += " " + w
    d.text((x, yy), line.strip(), font=mont(26, "SemiBold"), fill=(80, 75, 100))
sheet.save(f"{OUT}/LOGO_OPTIONS.png")
print("ok")
