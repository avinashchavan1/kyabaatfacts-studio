"""Kya Baat Facts - draft brand kit. python3 kb_brand.py <fonts dir> <out dir>"""
import math, os, random, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONTS, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

# palette
INK = (20, 18, 58)        # deep navy  #14123A
INK2 = (38, 34, 96)       # lighter navy #262260
YEL = (255, 200, 61)      # bubble yellow #FFC83D
RED = (255, 75, 62)       # punch red #FF4B3E
WHITE = (255, 255, 255)
CREAM = (255, 246, 228)

CATS = [  # name, hindi, colour, symbol
    ("SCIENCE WALA SACH", "Science", (46, 196, 182), "⚗"),
    ("ITIHAAS KE RAAZ", "History", (214, 140, 69), "♔"),
    ("JAANWARON KI DUNIYA", "Animals", (122, 201, 67), "✿"),
    ("ANTRIKSH", "Space", (124, 92, 255), "★"),
    ("DESH KE AJOOBE", "Wonders", (255, 128, 64), "▲"),
    ("MYTH OR FACT?", "Fri show", RED, "?"),
    ("KHAANE KA ITIHAAS", "Food", (240, 90, 140), "●"),
    ("PAISE KI KAHANI", "Money", (60, 170, 90), "₹"),
    ("SHABDON KI KAHANI", "Words", (70, 150, 230), "Aa"),
]


def mont(size, w="Black"):
    f = ImageFont.truetype(os.path.join(FONTS, "Montserrat.ttf"), size)
    f.set_variation_by_name(w)
    return f


def hindi(size):
    return ImageFont.truetype(os.path.join(FONTS, "Mukta-Bold.ttf"), size, layout_engine=ImageFont.Layout.RAQM)


def ctext(d, cx, y, text, font, fill, **kw):
    w = d.textlength(text, font=font)
    d.text((cx - w / 2, y), text, font=font, fill=fill, **kw)


def bubble(scale=1.0, tilt=-6, hindi_line=True):
    """The logo: a yellow speech bubble (sticker style, navy outline + hard shadow) saying KYA BAAT!, red FACTS ribbon."""
    S = 4  # supersample
    W, H = int(1600 * scale), int(1100 * scale)
    im = Image.new("RGBA", (W * S, H * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    k = scale * S
    bx0, by0, bx1, by1 = 120 * k, 90 * k, 1480 * k, 760 * k
    r = 170 * k
    tail = [(380 * k, 700 * k), (560 * k, 740 * k), (300 * k, 960 * k)]
    sh = 34 * k  # shadow offset
    ol = 34 * k  # outline width

    def shape(dx, dy, grow, fill):
        d.rounded_rectangle((bx0 - grow + dx, by0 - grow + dy, bx1 + grow + dx, by1 + grow + dy), r + grow, fill=fill)
        t = [(x + dx, y + dy) for x, y in tail]
        if grow:
            cx = sum(p[0] for p in t) / 3; cy = sum(p[1] for p in t) / 3
            t = [(cx + (x - cx) * 1.35, cy + (y - cy) * 1.35) for x, y in t]
        d.polygon(t, fill=fill)

    shape(sh, sh, ol, INK)      # hard shadow
    shape(0, 0, ol, INK)        # outline
    shape(0, 0, 0, YEL)         # bubble
    # shine
    d.rounded_rectangle((bx0 + 60 * k, by0 + 40 * k, bx0 + 420 * k, by0 + 80 * k), 20 * k, fill=(255, 226, 140))
    # words
    f = mont(int(300 * k))
    ctext(d, (bx0 + bx1) / 2, by0 + 70 * k, "KYA", f, INK)
    ctext(d, (bx0 + bx1) / 2, by0 + 330 * k, "BAAT!", f, INK)
    # FACTS ribbon
    rx0, ry0, rx1, ry1 = 760 * k, 800 * k, 1500 * k, 1010 * k
    d.rounded_rectangle((rx0 + sh * .6, ry0 + sh * .6, rx1 + sh * .6, ry1 + sh * .6), 40 * k, fill=INK)
    d.rounded_rectangle((rx0 - ol * .7, ry0 - ol * .7, rx1 + ol * .7, ry1 + ol * .7), 50 * k, fill=INK)
    d.rounded_rectangle((rx0, ry0, rx1, ry1), 40 * k, fill=RED)
    ctext(d, (rx0 + rx1) / 2, ry0 + 22 * k, "FACTS", mont(int(150 * k)), WHITE)
    if hindi_line:
        ctext(d, 470 * k, 830 * k, "", hindi(int(10 * k)), INK)
    im = im.rotate(tilt, resample=Image.BICUBIC, expand=True)
    return im.resize((im.width // S, im.height // S), Image.LANCZOS)


def sparkles(d, W, H, n, seed, colors, sizes=(10, 26)):
    random.seed(seed)
    for _ in range(n):
        x, y = random.randrange(W), random.randrange(H)
        s = random.randint(*sizes); c = random.choice(colors)
        kind = random.random()
        if kind < .45:  # 4-point star
            d.polygon([(x, y - s), (x + s * .28, y - s * .28), (x + s, y), (x + s * .28, y + s * .28),
                       (x, y + s), (x - s * .28, y + s * .28), (x - s, y), (x - s * .28, y - s * .28)], fill=c)
        elif kind < .7:
            d.ellipse((x - s * .3, y - s * .3, x + s * .3, y + s * .3), fill=c)
        else:
            d.text((x, y), random.choice("?!"), font=mont(int(s * 2.2)), fill=c)


def bg(W, H, seed=1):
    im = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(im)
    # soft radial
    g = Image.new("L", (W, H), 0); gd = ImageDraw.Draw(g)
    gd.ellipse((W * .15, H * .1, W * .85, H * .9), fill=120); g = g.filter(ImageFilter.GaussianBlur(min(W, H) / 5))
    im.paste(Image.new("RGB", (W, H), INK2), (0, 0), g)
    d = ImageDraw.Draw(im)
    sparkles(d, W, H, int(W * H / 60000), seed, [(70, 64, 140), (90, 80, 170), (200, 160, 60)])
    return im


def paste_center(base, im, cx, cy):
    base.paste(im, (int(cx - im.width / 2), int(cy - im.height / 2)), im)


# 1. logo (transparent)
logo = bubble(1.0)
logo.save(f"{OUT}/logo_transparent.png")

# 2. avatar 1080 (circle-safe)
A = 1080
av = bg(A, A, 3)
lg = bubble(0.54, tilt=-6)
paste_center(av, lg, A / 2 + 10, A / 2 + 10)
av.save(f"{OUT}/avatar_1080.png")
# circle preview (how IG/YT crop it)
m = Image.new("L", (A, A), 0); ImageDraw.Draw(m).ellipse((0, 0, A, A), fill=255)
circ = Image.new("RGBA", (A, A), (0, 0, 0, 0)); circ.paste(av, (0, 0), m)
circ.save(f"{OUT}/avatar_circle_preview.png")

# 3. YouTube banner 2560x1440 (safe area 1546x423 in the centre)
W, H = 2560, 1440
ban = bg(W, H, 7)
d = ImageDraw.Draw(ban)
cx, cy = W / 2, H / 2
lg = bubble(0.31, tilt=-6)
paste_center(ban, lg, cx - 500, cy)
ctext(d, cx + 230, cy - 150, "Har fact pe bologe:", mont(70, "ExtraBold"), WHITE)
ctext(d, cx + 230, cy - 65, "KYA BAAT!", mont(120), YEL)
ctext(d, cx + 230, cy + 85, "Science · History · Animals · Space · Desh Ke Ajoobe", mont(36, "Bold"), CREAM)
ctext(d, cx + 230, cy + 140, "New reels Mon–Sat  ·  Myth or Fact? every Friday", mont(36, "SemiBold"), (190, 185, 230))
ban.save(f"{OUT}/youtube_banner_2560x1440.jpg", quality=92)
# safe-area guide copy
g = ban.copy(); gd = ImageDraw.Draw(g)
gd.rectangle((cx - 773, cy - 211.5, cx + 773, cy + 211.5), outline=(255, 0, 0), width=6)
g.resize((1280, 720)).save(f"{OUT}/youtube_banner_SAFE_AREA_guide.jpg", quality=85)

# 4. watermark 300 (transparent)
wm = bubble(0.25, tilt=-6, hindi_line=False); wm.thumbnail((290, 290), Image.LANCZOS)
canvas = Image.new("RGBA", (300, 300), (0, 0, 0, 0)); paste_center(canvas, wm, 150, 150)
canvas.save(f"{OUT}/youtube_watermark_300.png")


# 5. category badges
def badge(name, color, sym, h=110):
    f = mont(int(h * .42)); tmp = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    w = int(tmp.textlength(name, font=f) + h * 1.55)
    im = Image.new("RGBA", (w + 14, h + 14), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((10, 10, w + 10, h + 10), h / 2, fill=INK)
    d.rounded_rectangle((0, 0, w, h), h / 2, fill=color, outline=INK, width=6)
    d.ellipse((12, 12, h - 12, h - 12), fill=WHITE)
    sf = mont(int(h * .42)) if sym not in "⚗♔✿★▲●" else ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(h * .46))
    sw = d.textlength(sym, font=sf); bb = d.textbbox((0, 0), sym, font=sf)
    d.text((h / 2 - sw / 2, h / 2 - (bb[1] + bb[3]) / 2), sym, font=sf, fill=color)
    d.text((h * 1.05, h / 2 - h * .27), name, font=f, fill=WHITE)
    return im


badges = [badge(n, c, s) for n, _, c, s in CATS]
for (n, _, _, _), b in zip(CATS, badges):
    b.save(f"{OUT}/badge_{n.lower().replace(' ', '_').replace('?', '')}.png")
sheet = Image.new("RGB", (1500, 140 * len(badges) + 60), CREAM)
for i, b in enumerate(badges):
    sheet.paste(b, (60, 40 + i * 140), b)
sheet.save(f"{OUT}/category_badges_sheet.png")


# 6. sample reel cover 1080x1920
def cover(path, cat_i, line1, line2, hook):
    Wc, Hc = 1080, 1920
    c = bg(Wc, Hc, 11 + cat_i)
    d = ImageDraw.Draw(c)
    b = badges[cat_i]; c.paste(b, (int(Wc / 2 - b.width / 2), 230), b)
    # big hook text, white with navy stroke
    def fit(t, size=150):
        while d.textlength(t, font=mont(size)) > Wc - 120: size -= 4
        return mont(size)
    ctext(d, Wc / 2, 520, line1, fit(line1), WHITE, stroke_width=10, stroke_fill=INK)
    ctext(d, Wc / 2, 690, line2, fit(line2), YEL, stroke_width=10, stroke_fill=INK)
    # art placeholder
    d.rounded_rectangle((120, 920, Wc - 120, 1500), 50, fill=(48, 44, 110), outline=(90, 84, 170), width=6)
    ctext(d, Wc / 2, 1180, "[ painted art here ]", mont(44, "SemiBold"), (150, 145, 210))
    ctext(d, Wc / 2, 1560, hook, mont(56, "ExtraBold"), WHITE)
    lg = bubble(0.16, tilt=-6, hindi_line=False); c.paste(lg, (Wc - lg.width - 50, Hc - lg.height - 80), lg)
    c.save(path)
    return c


cv1 = cover(f"{OUT}/sample_cover_octopus.png", 2, "3 DIL,", "NEELA KHOON!", "Octopus ka raaz 🐙".replace(" 🐙", ""))
cv2 = cover(f"{OUT}/sample_cover_myth.png", 5, "SIRF 10%", "DIMAAG?", "Myth or Fact?")


# 7. end cards (YouTube SUBSCRIBE / Instagram FOLLOW)
def endcard(path, verb, platform):
    Wc, Hc = 1080, 1920
    c = bg(Wc, Hc, 21)
    d = ImageDraw.Draw(c)
    paste_center(c, bubble(0.55), Wc / 2, 620)
    ctext(d, Wc / 2, 1080, "Aisi aur facts ke liye", mont(64, "ExtraBold"), WHITE)
    d.rounded_rectangle((170, 1200, Wc - 170, 1380), 90, fill=INK, outline=INK)
    d.rounded_rectangle((160, 1190, Wc - 180, 1370), 90, fill=RED, outline=INK, width=8)
    ctext(d, Wc / 2 - 10, 1225, verb, mont(100), WHITE)
    ctext(d, Wc / 2, 1460, f"{platform}  @kyabaatfacts", mont(56, "Bold"), YEL)
    c.save(path)
    return c


e1 = endcard(f"{OUT}/endcard_youtube.png", "SUBSCRIBE", "YouTube")
e2 = endcard(f"{OUT}/endcard_instagram.png", "FOLLOW", "Instagram")

# 8. one-page brand sheet
BS = Image.new("RGB", (2400, 2000), CREAM)
d = ImageDraw.Draw(BS)
d.text((80, 60), "KYA BAAT FACTS  —  brand kit (draft)", font=mont(80), fill=INK)
lg = bubble(0.55); BS.paste(lg, (60, 200), lg)
avs = circ.resize((420, 420)); BS.paste(avs, (1050, 230), avs)
d.text((1050, 670), "Avatar (circle crop)", font=mont(34, "Bold"), fill=INK)
wms = canvas.resize((200, 200)); BS.paste(wms, (1550, 300), wms)
d.text((1520, 520), "Watermark", font=mont(34, "Bold"), fill=INK)
# palette
pal = [("Ink #14123A", INK), ("Bubble #FFC83D", YEL), ("Punch #FF4B3E", RED), ("White #FFFFFF", WHITE), ("Cream #FFF6E4", CREAM)]
for i, (n, col) in enumerate(pal):
    x = 1050 + (i % 3) * 450; y = 760 + (i // 3) * 170
    d.rounded_rectangle((x, y, x + 120, y + 120), 24, fill=col, outline=INK, width=4)
    d.text((x + 135, y + 42), n, font=mont(28, "Bold"), fill=INK)
d.text((1050, 1110), "Fonts: Montserrat Black (titles) · Montserrat Bold (text) · Mukta (Hindi)", font=mont(30, "SemiBold"), fill=INK)
d.text((1050, 1160), "हिंदी टेक्स्ट: क्या बात!", font=hindi(48), fill=INK)
for i, b in enumerate(badges):
    bb = b.resize((int(b.width * .55), int(b.height * .55)))
    BS.paste(bb, (80 + (i % 3) * 760 if False else 80, 900 + i * 75), bb) if False else None
col_x = [80, 80]
for i, b in enumerate(badges):
    bb = b.resize((int(b.width * .6), int(b.height * .6)))
    BS.paste(bb, (80, 1000 + i * 100) if i < 9 else (0, 0), bb)
for j, im in enumerate([cv1, cv2, e1, e2]):
    t = im.resize((270, 480)); BS.paste(t, (1050 + j * 330, 1260))
d.text((1050, 1760), "Covers + end cards (9:16)", font=mont(34, "Bold"), fill=INK)
BS.save(f"{OUT}/BRAND_SHEET.png")
print("done")
