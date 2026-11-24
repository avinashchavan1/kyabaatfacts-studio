# This channel: Kya Baat Facts (mixed facts, Hindi/Hinglish narration, English on screen)
- Instagram @kyabaatfacts · YouTube @kyabaatfacts (handle pending). Series folder: `studio/series/kyabaatfacts/`
  (CHANNEL.md = decisions, PLAN.md = 100 reels + 10 long videos + 400-reel roadmap, LONGFORM.md).
- 9 categories with a weekly rhythm (`channel.json → categories`, `calendar.json → weekly`).
- **Sources instead of verses:** this is a mixed facts channel with no single base text. Wherever the rules below say
  "verse", "base text" or `source_verse.py`, read: every claim lists its own source (publisher, title, URL) and is verified by
  reading that source, never from memory. Disputed or legendary claims are framed honestly or dropped. The opening-verse and
  quote-card rules become: show the source on screen when a claim is surprising (per-reel source links are enforced by `make_reel.py check`).
- **Proof shots:** 1-2 real photos per reel (2-3 s, `kbProof` in `series/art/brand.js`), openly licensed (Wikimedia Commons / public domain preferred), no logos, text or identifiable people; record each in `script.json → media` + research notes and credit it on screen and in the caption.
- **Narrator (overrides the calm-narrator rule below):** Bunty (ElevenLabs, eleven_v4, stability 0.5), excited, chatty Hinglish like
  telling a friend; every reveal ends on the fixed clip `cast/signature/kya_baat_hai.mp3` ("क्या बात है!"). See `cast/cast.json`.
- **v2 reel rules (owner-approved):** claim-first hook (no "अरे, एक बात बताऊँ?"), easy everyday Hinglish words, loop ending that echoes the hook,
  safe-zone layout (`KB_SAFE`, `SUB_STYLE` in shots.js), caption first line ≤125 chars. Details: `studio/series/kyabaatfacts/STYLE_GUIDE.md`.
- Brand: "Hairaan Aankhen" logo (googly eyes over the AA of BAAT), yellow #FFC83D / ink #14123A / punch #FF4B3E, Montserrat + Mukta.
  Kit in `brand/kit/`, regenerate with `python3 brand/make_kyabaat_brand.py brand brand/kit`; upload with `python3 scripts/brand.py --no-render`.

# Storyreel Studio: rules for every session

This repo makes short story reels (9:16, ~60–120 s) for ONE channel, described in `channel.json` (name, handles, language,
base text, infrastructure) and `studio/series/<series id>/series.json` (cast lock, looks, address rule, CTA).
Rules learned the hard way are in `PLAYBOOK.md`: read it; they are not optional.
If `channel.json` still says "example", run `bash scripts/setup.sh` first.

## Start of every session (~1 min)
1. `bash scripts/bootstrap.sh` (engine Python deps; ffmpeg/Playwright preinstalled in cloud sessions).
2. Read `PLAYBOOK.md`, `channel.json`, `studio/series/<id>/series.json` and the series plan (`plan_file`, default `PLAN.md`); research notes in `research/`.
3. Where things stand: the app's Timeline page, or `studio/series/<id>/reels/stages.json`.
4. To change an OLD reel: restore its recorded audio first, `python3 scripts/audiopack.py pull <ID>` (never re-record).
5. Make a reel with the **make-reel** skill (`.claude/skills/make-reel/SKILL.md`).

## Non-negotiable rules (details in PLAYBOOK.md)
- Accuracy first: every claim cites the base text, read in the text (`scripts/source_verse.py`); unsure → drop it.
- Show the actual words: quote cards for the popular version AND the base-text verse; open every reel with one verse (shot 2).
- Length follows the information; split long stories into parts (`"follows"`), never cut quotes or citations.
- Ask the owner before choosing a MAJOR character's look or voice (`series.json → major_characters`); minor ones: choose and say so.
- Calm narrator tags only; never chop a voice; every voice is ElevenLabs (`cast/cast.json`).
- English on screen (cards, subtitles, titles, covers, captions); narration in `channel.json → language.narration`.
- Endings: FOLLOW on Instagram/Facebook, SUBSCRIBE on YouTube.
- Never post or publish yourself; the owner posts from the app.
- Secrets: never ask for keys in chat; they are network secrets on the cloud environment; code uses the placeholder `proxy-injected`.
- Keep everything updated in git: commit AND push after every meaningful step, never leave untracked or unpushed work; shared changes go to the template right away.
- Merging: when the owner allows it (see the channel's CLAUDE.md), Claude opens a PR from its session branch, checks it is clean/green, merges it to `main`, and reports what was merged.
- No model IDs in commits or code. Keep the owner updated (chat + `python3 scripts/status.py set --reel <ID> --step N`).

## Layout
- `channel.json` (identity + infra), `calendar.json` (posting calendar; presets in `presets/`), `PLAYBOOK.md`.
- `studio/`: the reel engine; `studio/make_reel.py` is the CLI (new, check, narration, pick, audio, draft-timeline, stills, render, thumb, sheet, desk).
  - `engine/js` renderer (Playwright canvas), `engine/py` audio (ElevenLabs TTS + music, take picker, mixing, covers).
  - `engine/art/{rigs,sets,templates}.js`: the shared art library (figures, sets, cards). Load order per reel: reel/src > series/art > engine/art > engine/js.
  - `series/<id>/`: series.json, plan, cast/, art/ (series characters on top of the library), research/, reels/<ID>/src/{script.json,shots.js,timeline.json}.
- `src/`: the studio app (React + Vite + Tailwind; Supabase). Deploy: `bash scripts/deploy.sh` (Netlify).
- `supabase/`: migrations + edge functions (studio, job, oauth); function secrets: APP_URL, GITHUB_REPO, HF_MASTERS_REPO, IG_HANDLE.
- `scripts/`: sync.py (studio → app DB), media.py, masters.py (HF masters repo), audiopack.py, cast_media.py, status.py, publish_job.py,
  source_verse.py, setup.sh (new channel), channel.py (loads channel.json).

## Full-length videos
- Full-length videos (16:9, ~10–12 min) are NEW productions, never stitched from old reels; 4–6 reels are DERIVED from each
  (self-contained beats, one drawing for both frames). Rules 22–28 in `PLAYBOOK.md`; the channel's plan and pilot go in `studio/series/<id>/LONGFORM.md`.

## Sessions
- Up to 3 reels per session (4 when they share sets/characters). Start a new session when it gets long; nothing is lost.

## Keep the template in sync (owner's rule)
- This channel repo and the `storyreel-studio` template share the engine, art library, app, backend, scripts, skills and PLAYBOOK.
  After ANY change to those (a new technique, a fix, a feature), run
  `python3 scripts/template_sync.py <storyreel-studio checkout> --commit` and push the template.
  Channel details never go to the template: they live in channel.json, calendar.json and studio/series/ (the script refuses to commit leaks).
