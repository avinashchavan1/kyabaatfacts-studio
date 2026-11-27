# Kya Baat Facts: style guide

*Har fact pe bologe: kya baat!* Short, true, surprising facts in Hinglish, for anyone curious.

## 1. The promise
Every reel gives one **"kya baat!" moment**: a fact that makes you stop scrolling, explained simply, and **every claim is sourced**.
Trust is the brand. One wrong fact costs more than ten good ones earn.

## 2. Truth rules
- Every claim has a source link (NASA, ISRO, NOAA, museums, government sites, peer-reviewed papers, Britannica-level references), read during research, never from memory. `make_reel.py check` refuses claims without a link.
- Compare like with like (e.g. lightning vs the Sun's **surface**, not "the Sun").
- Disputed or legendary claims are framed honestly ("kya sach mein?", "kaha jaata hai…") or dropped.
- Add an honest twist when the popular version oversimplifies (R001: the Sun's core is still the boss).
- Show the source on screen on every fact card ("SOURCE: NOAA").

## 3. The voice
- Narrator: **Bunty** (ElevenLabs), excited and chatty, like telling a friend. Hinglish in Devanagari: "अरे, एक बात बताऊँ?", "यार", "रुको!".
- Tags: `[excited]` most lines, `[curious]` questions, `[pause]` before reveals, `[amazed]` / `[laughs]` / `[playfully]` reactions.
- The reveal always ends on the fixed catchphrase clip **"क्या बात है!"** (`cast/signature/kya_baat_hai.mp3`), never re-recorded.
- Ending: "ऐसे और मज़ेदार facts के लिए… फ़ॉलो करो!" (Instagram) / "…सब्सक्राइब करो!" (YouTube).

- **Easy words, always.** Say it the way people talk at home, not textbook Hindi: "Egypt की पुरानी कब्रें" not "मिस्र के मकबरे",
  "America" not "अमेरिका महाद्वीप", "sunrise" not "सूर्योदय", "percent" not "प्रतिशत", "UNESCO World Heritage" not "यूनेस्को विश्व धरोहर".
  English words people already use are welcome. If a 12-year-old wouldn't get a word, change it.

## 4. Reel structure (45–60 s) — v2 (owner-approved, from the instagram-agent-skill pilot)
- **Hook = the claim itself, first words.** No "अरे, एक बात बताऊँ?" opener. On screen from frame 1.
- **Loop ending:** the last story line echoes a word from the hook.
- **Safe zone:** every reel sets `KB_SAFE = true` and `SUB_STYLE = { maxW: 640, bottom: 1400 }` in shots.js (nothing above y 230,
  below y 1440 or in the right 230 px).
- **Caption:** first line ≤125 characters (it is all the feed shows), no em dashes, one comment ask at the end.

### Older structure notes
1. **Hook** (first second): a question card on screen, e.g. "BIJLI vs SURAJ — KAUN ZYADA GARAM?"
2. **The common belief**, then "लेकिन रुको!"
3. **Steps**: one fact per shot, each with a fact card and its source.
4. **Reveal**: the big number or contrast, a stamp ("5X GARAM!"), then the eyes go WOW + "क्या बात है!"
5. **Bonus**: the why, or an honest twist.
6. **End card**: FOLLOW / SUBSCRIBE.

## 5. Look
- Palette: yellow `#FFC83D` (halftone dots `#F5BA28`), ink `#14123A`, punch `#FF4B3E`, white. Night scenes in ink/indigo.
- Font: Montserrat Black for titles and cards, Montserrat for subtitles, Mukta for Devanagari.
- Sticker style: flat shapes, bold ink outlines, hard offset shadows, rounded corners.
- Mascot: the googly eyes (Kya baat! · Hmm… · Sach mein? · Wow!) react in the hook and the reveal.
- Category badge on every shot, with its colour (Science teal, History copper, Animals green, Space purple, Wonders orange, Myth red, Food pink, Money green, Words blue).
- Covers: hook on top, red stamp with the answer, the strongest frame, category badge.

## 6. Category rotation (owner, 27 Nov 2026)
20 categories take turns fairly (no fixed weekdays): see PLAN.md → Fair rotation. Badge colours and highlight names: `channel.json → categories`.
"Agar Aisa Ho Toh?" (what if) reels answer only from published science and name the source on screen. Long video monthly.

## Proof photos (owner, 25 Nov 2026; more of them from 27 Nov 2026)
- Use **2-4 real photos** per reel whenever good openly licensed ones exist (R013 is the model: a real X-ray, a real skeleton zoomed to the
  detail, skeletons of every age). Search Openverse (api.openverse.org) when Wikimedia rate-limits; check each licence on its source page.
- On screen for about **4 seconds** (never a quick 2-second flash); the backdrop is solid while it shows.
- Make it interesting: slow zoom toward the detail (`focus: [x, y]`, `zoomTo` ~1.4-1.7) and **draw on it**: a hand-drawn circle or box around the
  detail, an arrow and a short label (`notes: [{ x, y, r, text: 'YE HAI DEEWAR!', tx, ty, at }]`, photo units 0..1). One or two marks per photo.

## Music (owner, 25 Nov 2026)
- A fresh score for every reel, written for its topic and story: e.g. space reels get airy synths and a wonder swell, history gets the period's
  instruments, myth-busters get a playful build and a "busted!" hit. Match the beats: quiet under the hook claim, rising through the evidence,
  a bright lift on the reveal (the "Kya baat hai!" moment), bouncy for the loop ending. 2 takes, pick the one whose energy follows the script.
- Length: at least the reel's length + 5 s (no looping). Reuse old scores only when credits are low.

## Pronunciation of English names (owner, 25 Nov 2026)
- In a Hindi line, prefer the name people actually say in Hindi ("चीन की दीवार", "चाँद"); otherwise write the English name in Devanagari ("ग्रेट वॉल").
- Latin-script names mid-sentence ("Great Wall") can come out with an odd pause or accent: after recording, check the word timings of names
  (a gap over ~0.2 s inside a name = re-record or rephrase).
