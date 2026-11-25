"""Kya Baat Facts - Facebook Page + Instagram profile assets, drawn with the brand kit's own helpers.
python3 brand/make_social_kit.py brand brand/kit/social
  facebook_cover_1640x924.jpg (+ SAFE guide)   desktop shows the middle 1640x624, phones the full 1640x924
  ig_highlight_<name>.png (1080x1920)          story-highlight covers: 9 categories + START HERE + SOURCES
  intro_post_1080x1350.png                     a first post to pin on Instagram and Facebook
  highlights_preview.png                       how the highlight circles look on the profile"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

FONTS, OUT = sys.argv[1], sys.argv[2]
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "make_kyabaat_brand.py")).read()
helpers = src.split("# ---- logos")[0].replace("FONTS, OUT = sys.argv[1], sys.argv[2]", "").replace("os.makedirs(OUT, exist_ok=True)", "")
badge_src = src[src.index("def badge("):src.index("badges = [badge(*c)")]
exec(helpers + "\n" + badge_src + "\n" + src[src.index("def yellow("):src.index("# ---- logos")], globals())
FONTS = sys.argv[1]
os.makedirs(OUT, exist_ok=True)


def sym_font(sym, size):
    return ImageFont.truetype(DEJAVU, int(size)) if sym in "⚗♔✿★▲●✓" else mont(size)


# ---- Facebook cover: 1640x924, content kept inside the desktop band (middle 1640x624) and clear of the
#      profile picture that sits over the bottom-left on desktop
W, H = 1640, 924; cy = H / 2
fb = yellow(W, H); d = ImageDraw.Draw(fb)
for (ex, ey, lk) in [(150, 120, (1, 1)), (290, 150, (1, 1)), (1360, 800, (-1, -1)), (1500, 770, (-1, -1))]:
    eyes(d, ex, ey, 62, look=lk)
paste_c(fb, logo(300), 470, cy - 10)
x0 = 700
d.text((x0, cy - 170), "Har fact pe bologe:", font=mont(54, "ExtraBold"), fill=INK)
d.text((x0, cy - 110), "KYA BAAT!", font=mont(118), fill=INK)
tag = "Science · History · Animals · Space · Desh Ke Ajoobe"
tf = mont(26, "Bold"); tw = d.textlength(tag, font=tf)
d.rounded_rectangle((x0, cy + 40, x0 + tw + 44, cy + 88), 24, fill=INK)
d.text((x0 + 22, cy + 48), tag, font=tf, fill=YEL)
d.text((x0, cy + 108), "Hindi facts, every fact sourced  ·  Myth or Fact? every Friday", font=mont(27, "Bold"), fill=INK)
fb.save(f"{OUT}/facebook_cover_1640x924.jpg", quality=92)
g = fb.copy(); gd = ImageDraw.Draw(g)
gd.rectangle((0, (H - 624) / 2, W - 1, (H + 624) / 2), outline=(255, 0, 0), width=6)          # desktop crop
gd.ellipse((40, (H + 624) / 2 - 150, 300, (H + 624) / 2 + 110), outline=(0, 90, 255), width=6)  # where the desktop profile picture lands (approx.)
g.resize((820, 462)).save(f"{OUT}/facebook_cover_SAFE_AREA_guide.jpg", quality=85)


# ---- Instagram highlight covers (Instagram shows the centre as a circle)
HL = [(c[0], c[1], c[2]) for c in CATS] + [("START HERE", INK, "eyes"), ("SOURCES", (32, 178, 166), "✓")]
SHORT = {"SCIENCE WALA SACH": "SCIENCE", "ITIHAAS KE RAAZ": "ITIHAAS", "JAANWARON KI DUNIYA": "JAANWAR", "ANTRIKSH": "ANTRIKSH",
         "DESH KE AJOOBE": "AJOOBE", "MYTH OR FACT?": "MYTH?", "KHAANE KA ITIHAAS": "KHAANA", "PAISE KI KAHANI": "PAISA",
         "SHABDON KI KAHANI": "SHABD", "START HERE": "START", "SOURCES": "SOURCES"}
circles = []
for name, col, sym in HL:
    im = yellow(1080, 1920); d = ImageDraw.Draw(im); cx, cy, r = 540, 960, 330
    d.ellipse((cx - r + 14, cy - r + 14, cx + r + 14, cy + r + 14), fill=INK)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=col, outline=INK, width=16)
    if sym == "eyes": eyes(d, cx - 120, cy + 40, 105, look=(1, -1), ink=INK); eyes(d, cx + 120, cy + 40, 105, look=(1, -1), ink=INK)
    else:
        f = sym_font(sym, 300 if len(sym) == 1 else 230); bb = d.textbbox((0, 0), sym, font=f)
        d.text((cx - (bb[0] + bb[2]) / 2, cy - (bb[1] + bb[3]) / 2), sym, font=f, fill=WHITE)
    fn = name.lower().replace(" ", "_").replace("?", "")
    im.save(f"{OUT}/ig_highlight_{fn}.png")
    circles.append((SHORT[name], im.crop((540 - 420, 960 - 420, 540 + 420, 960 + 420)).resize((150, 150), Image.LANCZOS)))
# preview: how they sit on the profile (circle-masked, with Instagram's labels under them)
pv = Image.new("RGB", (40 + 185 * 6, 2 * 230 + 40), WHITE); pd = ImageDraw.Draw(pv)
m = Image.new("L", (150, 150), 0); ImageDraw.Draw(m).ellipse((0, 0, 149, 149), fill=255)
for i, (lab, c) in enumerate(circles):
    x, y = 40 + (i % 6) * 185, 30 + (i // 6) * 230
    pd.ellipse((x - 6, y - 6, x + 156, y + 156), outline=(200, 200, 200), width=3); pv.paste(c, (x, y), m)
    lf = mont(22, "SemiBold"); pd.text((x + 75 - pd.textlength(lab, font=lf) / 2, y + 168), lab, font=lf, fill=(30, 30, 30))
pv.save(f"{OUT}/highlights_preview.png")


# ---- intro post 1080x1350 (pin it first on both profiles)
W, H = 1080, 1350
ip = yellow(W, H); d = ImageDraw.Draw(ip)
paste_c(ip, logo(400), W / 2, 250)
ctext(d, W / 2, 470, "Har fact pe bologe: KYA BAAT!", fit(d, "Har fact pe bologe: KYA BAAT!", 62, W - 120, "ExtraBold"), INK)
ctext(d, W / 2, 545, "9 categories · Hindi narration · every fact sourced", mont(32, "Bold"), INK)
bs = [badge(*c, h=74) for c in CATS]
y = 600
for i in range(0, len(bs), 2):
    row = bs[i:i + 2]; tw = sum(b.width for b in row) + 24 * (len(row) - 1); x = (W - tw) / 2
    for b in row: ip.paste(b, (int(x), y), b); x += b.width + 24
    y += 92
d.rounded_rectangle((90, y + 20, W - 90, y + 120), 40, fill=INK)
ctext(d, W / 2, y + 44, "Mon–Sat new reels  ·  Myth or Fact? every Friday", mont(34, "Bold"), YEL)
ctext(d, W / 2 - 60, y + 168, "Follow for daily facts", mont(44, "ExtraBold"), INK)
eyes(d, W / 2 + 290, y + 192, 32, look=(-1, 0), brows=False); eyes(d, W / 2 + 360, y + 192, 32, look=(-1, 0), brows=False)
ip.save(f"{OUT}/intro_post_1080x1350.png")
print("wrote", sorted(os.listdir(OUT)))
