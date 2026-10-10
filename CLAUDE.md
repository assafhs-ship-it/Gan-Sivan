# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**הגן של סיון** — a Hebrew (RTL) site of exercises for kindergarten children, used on a PC (mouse) or an iPad (finger). Static site, no build step, no framework, no dependencies (Google Fonts only). Meant to be deployed with GitHub Pages from the `main` branch root.

The children can't read: keep text minimal, targets big, and feedback visual and spoken.

**When changing `styles.css` or `script.js`, bump the `?v=` number on both in `index.html`, and bump `APP_VERSION` at the top of `script.js`** (shown on the landing page). GitHub Pages caches for 10 minutes and iPad Safari will otherwise pair a fresh page with a stale script.

## Files

- `index.html` — the screens, switched by URL hash in `route()`: `#home` (landing page with the two subjects, אותיות and מספרים, and the version), `#abc` (menu of the letter exercises), `#numbers` (menu of the number exercises — only a "בקרוב" card so far), `#letters` (letter picker), `#trace` (the tracing exercise, `#letter-1` … `#letter-22`), `#order` (letter-order level picker), `#order-game` (`#order-1`, `#order-2`), `#first` (first-letter level picker), `#first-game` (`#first-2` … `#first-4`), `#names` (letter-names level picker), `#names-game` (`#names-2` … `#names-4`), `#find` (find-the-letter game, no level picker), `#memory` (memory level picker), `#memory-game` (`#memory-6`, `#memory-8`, `#memory-12`), `#pop` (balloons speed picker), `#pop-game` (`#pop-1` slow, `#pop-2` fast) and `#all` (unlinked review sheet showing every letter's stroke order).
- `script.js` — `LETTERS` data at the top, the `WORDS` picture words, then progress, sound, confetti, letter drawing, tracing, letter order, first letter, letter names, find the letter, memory, balloons, screens.
- `styles.css` — design tokens on `:root`.
- `images/sivan.png` — Sivan's cartoon portrait with a transparent background, shown on the landing page in front of the rainbow (`.hero-avatar`): a round frame clips her shoulders while her head rises above it. It was cut out of `Sivan.JPG` (kept locally, git-ignored), whose "transparent" checkerboard was baked into the picture.
- `images/bg.svg` — seamless 520px tile of line-art doodles (clouds, stars, pencils, kites, letter blocks) shown faintly behind every screen by `body::before`; its opacity is set there.
- `audio/` — `01.m4a` … `22.m4a` are the letter names, `bravo.m4a` is "כל הכבוד". Recorded with the Google Translate Hebrew voice through the `gTTS` Python package (unofficial client, needs internet): `gTTS("אָלֶף", lang="iw").save("x.mp3")` then `afconvert -f m4af -d aac -b 48000 x.mp3 01.m4a`. The letter names are written with nikud so they are pronounced correctly. `bravo.m4a` is the exception: Microsoft's neural voice through the `edge-tts` package, plain spelling — `edge-tts --voice he-IL-HilaNeural --rate=-10% --text "כל הכבוד!" --write-media x.mp3`.

## Adding an exercise

Add a `.menu-card` link to the subject's menu screen (`#abc` or `#numbers`; in `#numbers` replace the "בקרוב" card), a new `<section class="screen">`, and a branch in `route()`. The games share `.level-menu`/`.level-card` (level picker), `.dots` + `renderDots()` (round progress), `.order-play` and `.order-done` (finish panel).

## Letters (`LETTERS`)

Each letter is `{ ch, name, strokes }` on a 200×200 board. `strokes` are SVG path strings in writing order, and each path runs in the writing direction — that alone decides the numbers, arrows, star and end dot. To change how a letter is written, edit only its paths and check the result at `#all`.

## Tracing notes

- `buildLetter()` draws the layers (blue outline, white channel, dashed guide, arrows, number badges, paint, star). The paint is the stroke path itself, revealed with `stroke-dasharray`.
- `follow()` moves the paint to the point of the current stroke nearest the pointer, forwards only, at most `LOOKAHEAD` ahead and only within `TOLERANCE`. The look-ahead is what gets it round sharp corners; a plain step-by-step check stalls there.
- Sound goes through Web Audio, unlocked by any tap, because a letter is finished during a drag and iPad Safari won't start an `<audio>` element from a drag. Fallbacks: `<audio>` (when opened as a local file), then the browser's speech synthesis.
- Finished letters are remembered per device in `localStorage` (`gan-letters-v1`) and get a star in the picker.

## Letter order (השלמת סדר אותיות)

- A round shows `ORDER_RUN` (4) consecutive letters on rings with 1 or 2 replaced by "?" — the level is the number of missing letters — and `ORDER_CHOICES` (4) clouds: the missing letters plus distractors from outside the run. A game is `ORDER_ROUNDS` (5) rounds, shown as dots.
- A cloud can be dragged onto its "?" or just tapped (`makeDraggable` → `dropChoice`). Each letter fits exactly one slot, so a tap is never ambiguous. The drop target is found from the finger position, not the cloud's box, because a cloud can be grabbed while it is still gliding back.
- Right: the letter lands and its name is spoken. Wrong: the cloud shakes and returns, with a low `boop()`.

## First letter (מה מתחיל ב)

- A round shows a letter and 2, 3 or 4 pictures (the level); the child taps the picture whose word starts with that letter. A game is `FIRST_ROUNDS` (5) rounds with a different letter each round.
- `WORDS` has one row per letter, in `LETTERS` order: `[word, picture emoji, vocalized word]`. The sound of word `n` of letter `k` is `audio/words/<kk>-<n>.m4a`, recorded from the vocalized form with the same Google voice as the letter names. Adding or reordering words means recording the matching files.
- Pictures are emoji, so they look a little different on iPad and Windows. Keep to emoji from 2019 or earlier so older Windows PCs can show them.
- Distractors come from other letters, never one in the same `SOUND_ALIKE` group (א/ע/ה, כ/ק, ט/ת), since the children go by sound. For the same reason every word must start with its letter's usual sound (no שׂ words under ש).
- Tapping any picture says its word, right or wrong; a wrong one also shakes. The letter name is spoken when a round starts and from 🔊.

## Letter names (שמות האותיות)

- A round speaks a letter's name and shows 2, 3 or 4 letter cards (the level); the child taps the letter that was named. A game is `NAMES_ROUNDS` (5) rounds with a different letter each round.
- The big 🔊 button repeats the name as often as the child likes. Nothing on screen shows the answer.
- Each card carries a small picture — the first `WORDS` entry of its letter — as a memory aid, the same on every round.
- Wrong: the card shakes, fades out for the rest of the round, and the name is spoken again. Right: the card turns green and grows, and the name is spoken once more.

## Find the letter (מצא את האות)

- A round shows one large letter and `FIND_TILES` (8) letter tiles; 3 or 4 of them (picked at random) are that letter and the child taps them all. A game is `FIND_ROUNDS` (5) rounds with a different letter each round.
- The marks under the large letter show how many there are to find and fill in as they are found.
- The wrong tiles are all different. Up to two are look-alikes of the target (`LOOK_ALIKE`), the rest random; final letters (`FINAL_LETTERS`) appear only as wrong tiles. `TOO_ALIKE` pairs (ו/ן, nearly identical in Varela Round) are never shown together.
- Right: the tile is circled in red. Wrong: it shakes with a `boop()`. The letter's name is spoken when a round starts, when it ends, and from 🔊 or the large letter.

## Memory (זיכרון אותיות)

- The level is the number of cards: 6, 8 or 12, i.e. 3, 4 or 6 pairs of the same letter, laid out by `MEMORY_COLS`. The letters are picked at random each game.
- Tapping a card flips it and says its letter. Two different letters stay open for 1.2s and turn back (taps are ignored meanwhile); a pair stays open and turns green. The dots show pairs found out of the total.
- The grid sizes its cards from both the screen width and height (`--size` in `.memory-grid`, driven by `--cols`/`--rows` set in `startMemory`), so 12 cards still fit a landscape iPad without scrolling.

## Balloons (פוצצו את הבלונים)

- A round names a letter; balloons with letters rise through `#pop-sky` and the child pops `POP_NEED` (3) balloons carrying that letter. A game is `POP_ROUNDS` (5) rounds. The level is the speed (`POP_SPEEDS`: seconds to cross the sky and ms between balloons).
- Only the voice gives the letter; the small 🔊 repeats it. The marks next to it show how many are left to pop.
- One `setInterval` per game calls `spawnBalloon()`; it clears itself when `pop` no longer points at its game, so leaving the screen needs no cleanup. About one balloon in three is a right one (never more than three wrong in a row), and a balloon avoids the lanes of the previous two.
- A balloon is a `<button>` that rises with the `rise` animation (`--travel` is the sky's height, set when it is created) and removes itself on `animationend`; the inner `.balloon-body` sways. Pops are taken on `pointerdown`, not `click`, because the target is moving.
- Right: it bursts with `popSound()`. Wrong: it wobbles with a `boop()`, stays, and the name is spoken again. A missed right balloon just floats away; more keep coming.
- The reduced-motion rule in `styles.css` excludes `.balloon`, since the game cannot work without the rise.
