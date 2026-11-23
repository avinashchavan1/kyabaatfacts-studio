"""Kya Baat Facts - brand kit v2 ("Hairaan Aankhen": googly eyes peeking over the AA of BAAT).
python3 make_kyabaat_brand.py <fonts dir> <out dir>"""
import math, os, random, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONTS, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
S = 3

INK = (20, 18, 58); YEL = (255, 200, 61); DOT = (245, 186, 40); RED = (255, 75, 62)
WHITE = (255, 255, 255); CREAM = (255, 246, 228)

CATS = [  # badge text, colour, icon (DejaVu glyph or text)
    ("SCIENCE WALA SACH", (32, 178, 166), "⚗"),
    ("ITIHAAS KE RAAZ", (196, 120, 50), "♔"),
    ("JAANWARON KI DUNIYA", (88, 170, 50), "✿"),
    ("ANTRIKSH", (110, 80, 240), "★"),
    ("DESH KE AJOOBE", (240, 110, 40), "▲"),
    ("MYTH OR FACT?", RED, "?"),
    ("KHAANE KA ITIHAAS", (226, 70, 130), "●"),
    ("PAISE KI KAHANI", (40, 150, 80), "₹"),
    ("SHABDON KI KAHANI", (50, 130, 220), "Aa"),
]
DEJAVU = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def mont(size, w="Black"):
    f = ImageFont.truetype(os.path.join(FONTS, "Montserrat.ttf"), int(size)); f.set_variation_by_name(w); return f


def hindi(size):
    return ImageFont.truetype(os.path.join(FONTS, "Mukta-Bold.ttf"), int(size), layout_engine=ImageFont.Layout.RAQM)


def ctext(d, cx, y, t, f, fill, **kw):
    d.text((cx - d.textlength(t, font=f) / 2, y), t, font=f, fill=fill, **kw)


def fit(d, t, size, maxw, w="Black"):
    while d.textlength(t, font=mont(size, w)) > maxw: size -= 2
    return mont(size, w)


def eyes(d, cx, cy, r, look=(1, -1), brows=True, ink=INK, lid=False, raise_=0.0, pupil=.44):
    """one googly eye centred at cx,cy (radius r), pupil looking in direction `look`;
    lid=True half-closes it (Hmm...), raise_ lifts the brow (surprise), pupil sets pupil size"""
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE, outline=ink, width=max(2, int(r * .2)))
    pr = r * pupil; px, py = cx + look[0] * r * .28, cy + look[1] * r * .28
    d.ellipse((px - pr, py - pr, px + pr, py + pr), fill=ink)
    d.ellipse((px + pr * .1, py - pr * .72, px + pr * .58, py - pr * .24), fill=WHITE)
    if lid:
        d.chord((cx - r, cy - r, cx + r, cy + r), 180, 360, fill=YEL, outline=ink, width=max(2, int(r * .2)))
        d.line((cx - r, cy, cx + r, cy), fill=ink, width=max(2, int(r * .2)))
    if brows:
        o = r * raise_
        d.arc((cx - r * .9, cy - r * 2.1 - o, cx + r * .9, cy - r * 1.0 - o), 205, 335, fill=ink, width=max(2, int(r * .23)))


def halftone(im, step, rad, col=DOT):
    d = ImageDraw.Draw(im)
    for y in range(0, im.height + step, step):
        off = step / 2 if (y // step) % 2 else 0
        for x in range(0, im.width + step, step):
            d.ellipse((x + off - rad, y - rad, x + off + rad, y + rad), fill=col)


def logo(width, facts=True, ink=INK):
    """Stacked logo on transparent: KYA / BAAT! (eyes over the AA) / FACTS pill. Returns RGBA ~width wide."""
    W = 1000 * S; H = (1080 if facts else 820) * S
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    cx = W / 2
    ctext(d, cx, 0, "KYA", mont(250 * S), ink)
    f = mont(320 * S); word = "BAAT!"; y = 430 * S
    x0 = cx - d.textlength(word, font=f) / 2
    d.text((x0, y), word, font=f, fill=ink)
    for i in (1, 2):
        ax = x0 + d.textlength(word[:i], font=f) + d.textlength("A", font=f) / 2
        eyes(d, ax, y + 30 * S, 86 * S, ink=ink)
    if facts:
        fw = mont(115 * S); tw = d.textlength("FACTS", font=fw)
        bx0, by0 = cx - tw / 2 - 55 * S, 870 * S
        d.rounded_rectangle((bx0, by0, bx0 + tw + 110 * S, by0 + 160 * S), 80 * S, fill=ink)
        ctext(d, cx, by0 + 13 * S, "FACTS", fw, YEL)
    im = im.crop(im.getbbox())
    return im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)


def wordmark(height, ink=INK):
    """One-line logo: KYA BAAT! (eyes) + FACTS pill, transparent."""
    H = 400 * S
    f = mont(300 * S); fw = mont(110 * S)
    tmp = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    word = "KYA BAAT!"; ww = tmp.textlength(word, font=f); pw = tmp.textlength("FACTS", font=fw) + 110 * S
    im = Image.new("RGBA", (int(ww + pw + 120 * S), H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    y = 80 * S; d.text((20 * S, y), word, font=f, fill=ink)
    for i in (5, 6):
        ax = 20 * S + d.textlength(word[:i], font=f) + d.textlength("A", font=f) / 2
        eyes(d, ax, y + 30 * S, 80 * S, ink=ink)
    bx = 20 * S + ww + 50 * S; by = y + 120 * S
    d.rounded_rectangle((bx, by, bx + pw, by + 155 * S), 78 * S, fill=ink)
    d.text((bx + 55 * S, by + 12 * S), "FACTS", font=fw, fill=YEL)
    im = im.crop(im.getbbox())
    return im.resize((int(im.width * height / im.height), height), Image.LANCZOS)


def yellow(W, H, dots=True):
    im = Image.new("RGB", (W, H), YEL)
    if dots: halftone(im, max(28, W // 36), max(3, W // 360))
    return im


def paste_c(base, im, cx, cy):
    base.paste(im, (int(cx - im.width / 2), int(cy - im.height / 2)), im)


# ---- logos
logo(2000).save(f"{OUT}/logo_stacked_transparent.png")
logo(2000, ink=WHITE).save(f"{OUT}/logo_stacked_white.png")
wordmark(400).save(f"{OUT}/logo_wordmark_transparent.png")

# ---- avatar
A = 1080
av = yellow(A, A); paste_c(av, logo(760), A / 2, A / 2 + 10)
av.save(f"{OUT}/avatar_1080.png"); av.resize((800, 800), Image.LANCZOS).save(f"{OUT}/youtube_profile_800.png")
mask = Image.new("L", (A, A), 0); ImageDraw.Draw(mask).ellipse((0, 0, A, A), fill=255)
circ = Image.new("RGBA", (A, A), (0, 0, 0, 0)); circ.paste(av, (0, 0), mask); circ.save(f"{OUT}/avatar_circle_preview.png")

# ---- YouTube banner (safe area 1546x423 centred)
W, H = 2560, 1440; cx, cy = W / 2, H / 2
ban = yellow(W, H); d = ImageDraw.Draw(ban)
# big decorative eyes peeking from the edges (outside the safe area = extra on TV/desktop)
for (ex, ey, lk) in [(260, 260, (1, 1)), (470, 300, (1, 1)), (2100, 1180, (-1, -1)), (2310, 1140, (-1, -1))]:
    eyes(d, ex, ey, 95, look=lk)
lg = logo(330); paste_c(ban, lg, cx - 540, cy)
d.text((cx - 220, cy - 175), "Har fact pe bologe:", font=mont(66, "ExtraBold"), fill=INK)
d.text((cx - 220, cy - 100), "KYA BAAT!", font=mont(140), fill=INK)
d.rounded_rectangle((cx - 220, cy + 70, cx + 745, cy + 125), 28, fill=INK)
d.text((cx - 195, cy + 78), "Science · History · Animals · Space · Desh Ke Ajoobe", font=mont(31, "Bold"), fill=YEL)
d.text((cx - 220, cy + 145), "New reels Mon–Sat  ·  Myth or Fact? every Friday", font=mont(34, "Bold"), fill=INK)
ban.save(f"{OUT}/youtube_banner_2560x1440.jpg", quality=92)
g = ban.copy(); ImageDraw.Draw(g).rectangle((cx - 773, cy - 211.5, cx + 773, cy + 211.5), outline=(255, 0, 0), width=6)
g.resize((1280, 720)).save(f"{OUT}/youtube_banner_SAFE_AREA_guide.jpg", quality=85)

# ---- watermark (yellow rounded tile so it reads on any video)
wm = Image.new("RGBA", (300, 300), (0, 0, 0, 0)); wd = ImageDraw.Draw(wm)
wd.rounded_rectangle((6, 6, 294, 294), 60, fill=YEL, outline=INK, width=8)
paste_c(wm, logo(220), 150, 152); wm.save(f"{OUT}/youtube_watermark_300.png")


# ---- category badges
def badge(name, color, sym, h=110):
    f = mont(h * .42); tmp = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    w = int(tmp.textlength(name, font=f) + h * 1.55)
    im = Image.new("RGBA", (w + 14, h + 14), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((10, 10, w + 10, h + 10), h / 2, fill=INK)
    d.rounded_rectangle((0, 0, w, h), h / 2, fill=color, outline=INK, width=6)
    d.ellipse((12, 12, h - 12, h - 12), fill=WHITE)
    sf = ImageFont.truetype(DEJAVU, int(h * .46)) if sym in "⚗♔✿★▲●" else mont(h * .42)
    sw = d.textlength(sym, font=sf); bb = d.textbbox((0, 0), sym, font=sf)
    d.text((h / 2 - sw / 2, h / 2 - (bb[1] + bb[3]) / 2), sym, font=sf, fill=color)
    d.text((h * 1.05, h / 2 - h * .27), name, font=f, fill=WHITE)
    return im


badges = [badge(*c) for c in CATS]
for c, b in zip(CATS, badges):
    b.save(f"{OUT}/badge_{c[0].lower().replace(' ', '_').replace('?', '')}.png")
sheet = Image.new("RGB", (1300, 140 * len(badges) + 60), CREAM)
for i, b in enumerate(badges): sheet.paste(b, (60, 40 + i * 140), b)
sheet.save(f"{OUT}/category_badges_sheet.png")


# ---- reel cover 1080x1920
def cover(path, ci, l1, l2, sub):
    Wc, Hc = 1080, 1920
    c = yellow(Wc, Hc); d = ImageDraw.Draw(c)
    b = badges[ci]; c.paste(b, (int(Wc / 2 - b.width / 2), 210), b)
    ctext(d, Wc / 2, 380, l1, fit(d, l1, 150, Wc - 120), INK)
    ctext(d, Wc / 2, 550, l2, fit(d, l2, 150, Wc - 120), WHITE, stroke_width=12, stroke_fill=INK)
    # art window (navy frame + hard shadow)
    d.rounded_rectangle((126, 806, Wc - 94, 1526), 50, fill=INK)
    d.rounded_rectangle((110, 790, Wc - 110, 1510), 50, fill=(48, 44, 110), outline=INK, width=12)
    ctext(d, Wc / 2, 1130, "[ painted art here ]", mont(44, "SemiBold"), (150, 145, 210))
    # peeking eyes on the frame edge
    eyes(d, Wc - 230, 790, 52, look=(-1, 1), brows=False); eyes(d, Wc - 120 - 0, 790, 52, look=(-1, 1), brows=False)
    ctext(d, Wc / 2, 1570, sub, mont(58, "ExtraBold"), INK)
    wm_ = wordmark(70); c.paste(wm_, (int(Wc / 2 - wm_.width / 2), Hc - 170), wm_)
    c.save(path); return c


cv1 = cover(f"{OUT}/sample_cover_octopus.png", 2, "3 DIL,", "NEELA KHOON!", "Octopus ka raaz")
cv2 = cover(f"{OUT}/sample_cover_myth.png", 5, "SIRF 10%", "DIMAAG?", "Myth or Fact?")


# ---- end cards
def endcard(path, verb, platform):
    Wc, Hc = 1080, 1920
    c = yellow(Wc, Hc); d = ImageDraw.Draw(c)
    paste_c(c, logo(720), Wc / 2, 640)
    ctext(d, Wc / 2, 1080, "Aise aur facts ke liye", mont(64, "ExtraBold"), INK)
    d.rounded_rectangle((176, 1206, Wc - 164, 1386), 90, fill=INK)
    d.rounded_rectangle((160, 1190, Wc - 180, 1370), 90, fill=RED, outline=INK, width=10)
    ctext(d, Wc / 2 - 10, 1225, verb, fit(d, verb, 100, 640), WHITE)
    ctext(d, Wc / 2, 1460, f"{platform}  @kyabaatfacts", mont(56, "ExtraBold"), INK)
    c.save(path); return c


e1 = endcard(f"{OUT}/endcard_youtube.png", "SUBSCRIBE", "YouTube")
e2 = endcard(f"{OUT}/endcard_instagram.png", "FOLLOW", "Instagram")

# ---- eye expressions (for animated intros / reactions)
EX = Image.new("RGB", (1800, 440), YEL); ed = ImageDraw.Draw(EX)
looks = [("Kya baat!", dict(look=(1, -1)), dict(look=(1, -1))),
         ("Hmm...", dict(look=(-1, .4), lid=True, raise_=-.25), dict(look=(-1, .4), lid=True, raise_=-.25)),
         ("Sach mein?", dict(look=(0, 0)), dict(look=(0, 0), raise_=.45)),
         ("Wow!", dict(look=(0, 0), pupil=.22, raise_=.5), dict(look=(0, 0), pupil=.22, raise_=.5))]
for i, (lab, l, r_) in enumerate(looks):
    x = 120 + i * 430
    eyes(ed, x + 60, 200, 70, **l); eyes(ed, x + 220, 200, 70, **r_)
    ctext(ed, x + 140, 330, lab, mont(44, "ExtraBold"), INK)
EX.save(f"{OUT}/eye_expressions.png")

# ---- brand sheet
BS = Image.new("RGB", (2400, 2150), CREAM); d = ImageDraw.Draw(BS)
d.text((80, 60), "KYA BAAT FACTS  —  brand kit v2 (Hairaan Aankhen)", font=mont(66), fill=INK)
BS.paste(av.resize((520, 520)), (80, 180))
d.text((80, 715), "Avatar", font=mont(34, "Bold"), fill=INK)
cs = circ.resize((240, 240)); BS.paste(cs, (650, 180), cs); d.text((650, 430), "Circle crop", font=mont(28, "Bold"), fill=INK)
fs = circ.resize((90, 90)); BS.paste(fs, (650, 490), fs); d.text((760, 515), "Feed size", font=mont(28, "Bold"), fill=INK)
wms = wm.resize((170, 170)); BS.paste(wms, (650, 600), wms); d.text((840, 660), "Watermark", font=mont(28, "Bold"), fill=INK)
wmk = wordmark(110); BS.paste(wmk, (1100, 200), wmk); d.text((1100, 330), "Wordmark (one line)", font=mont(28, "Bold"), fill=INK)
pal = [("Ink #14123A", INK), ("Yellow #FFC83D", YEL), ("Punch #FF4B3E", RED), ("White #FFFFFF", WHITE), ("Dots #F5BA28", DOT)]
for i, (n, col) in enumerate(pal):
    x = 1100 + (i % 3) * 420; y = 420 + (i // 3) * 150
    d.rounded_rectangle((x, y, x + 110, y + 110), 24, fill=col, outline=INK, width=4)
    d.text((x + 128, y + 38), n, font=mont(28, "Bold"), fill=INK)
d.text((1100, 730), "Fonts: Montserrat Black / Bold  ·  Mukta (Hindi):", font=mont(30, "SemiBold"), fill=INK)
d.text((1100 + d.textlength("Fonts: Montserrat Black / Bold  ·  Mukta (Hindi): ", font=mont(30, "SemiBold")), 718), "क्या बात!", font=hindi(40), fill=INK)
for i, b in enumerate(badges):
    bb = b.resize((int(b.width * .6), int(b.height * .6))); BS.paste(bb, (80 + (i // 5) * 560, 820 + (i % 5) * 85), bb)
ex = EX.resize((1080, 264)); BS.paste(ex, (1250, 830)); d.text((1250, 1095), "Eye expressions (intros / reactions)", font=mont(28, "Bold"), fill=INK)
for j, im in enumerate([cv1, cv2, e1, e2]):
    BS.paste(im.resize((300, 533)), (80 + j * 340, 1290))
bs = ban.resize((880, 495)); BS.paste(bs, (1450, 1290))
d.text((80, 1850), "Covers + end cards (9:16)", font=mont(32, "Bold"), fill=INK)
d.text((1450, 1800), "YouTube banner", font=mont(32, "Bold"), fill=INK)
BS.save(f"{OUT}/BRAND_SHEET.png")
print("ok")

# ---- app icon (studio web app + browser tab): eyes on a yellow rounded tile, readable at 16-36 px
I = 512 * S
ic = Image.new("RGBA", (I, I), (0, 0, 0, 0)); idr = ImageDraw.Draw(ic)
idr.rounded_rectangle((0, 0, I - 1, I - 1), 110 * S, fill=YEL)
eyes(idr, 158 * S, 300 * S, 92 * S, look=(1, -1)); eyes(idr, 354 * S, 300 * S, 92 * S, look=(1, -1))
ic.resize((512, 512), Image.LANCZOS).save(f"{OUT}/app_icon.png")
print("app icon ok")
