# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**הגן של סיון** — a Hebrew (RTL) site of exercises for kindergarten children, used on a PC (mouse) or an iPad (finger). Static site, no build step, no framework, no dependencies (Google Fonts only). Meant to be deployed with GitHub Pages from the `main` branch root.

The children can't read: keep text minimal, targets big, and feedback visual and spoken.

**When changing `styles.css` or `script.js`, bump the `?v=` number on both in `index.html`, and bump `APP_VERSION` at the top of `script.js`** (shown on the landing page). GitHub Pages caches for 10 minutes and iPad Safari will otherwise pair a fresh page with a stale script.

## Files

- `index.html` — the screens, switched by URL hash in `route()`: `#home` (landing page with the two subjects, אותיות and מספרים, and the version), `#abc` (menu of the letter exercises), `#numbers` (menu of the number exercises), `#letters` (letter picker), `#trace` (the tracing exercise, `#letter-1` … `#letter-22`), `#order` (letter-order level picker), `#order-game` (`#order-1`, `#order-2`), `#first` (first-letter level picker), `#first-game` (`#first-2` … `#first-4`), `#names` (letter-names level picker), `#names-game` (`#names-2` … `#names-4`), `#find` (find-the-letter game, no level picker), `#memory` (memory level picker), `#memory-game` (`#memory-6`, `#memory-8`, `#memory-12`), `#pop` (balloons speed picker), `#pop-game` (`#pop-1` slow, `#pop-2` fast), `#name` (name entry; `#name-trace` reuses the `#trace` screen), `#final` (final-letters game), the number screens (see Numbers below) and `#all` (unlinked review sheet showing every letter's stroke order).
- `script.js` — `LETTERS` data at the top, the `WORDS` picture words, then progress, sound, confetti, letter drawing, tracing, letter order, first letter, letter names, find the letter, memory, balloons, my name, final letters, screens. `FINALS` (the five final letters, with strokes), `NUMBERS` (names 0–20) and `DIGITS` (0–9 with strokes) sit under `LETTERS`.
- `styles.css` — design tokens on `:root`.
- `images/sivan.png` — Sivan's cartoon portrait with a transparent background, shown on the landing page in front of the rainbow (`.hero-avatar`): a round frame clips her shoulders while her head rises above it. It was cut out of `Sivan.JPG` (kept locally, git-ignored), whose "transparent" checkerboard was baked into the picture.
- `images/bg.svg` — seamless 520px tile of line-art doodles (clouds, stars, pencils, kites, letter blocks) shown faintly behind every screen by `body::before`; its opacity is set there.
- `audio/song.m4a` — the kindergarten's song (2:02), played and stopped by the round `#song-btn` in the corner of the landing page. It plays on the landing page only (`route()` stops it on leaving) so it never talks over an exercise, and it is streamed with an `<audio>` element, not preloaded. The original file in the project root is Opus audio, which older iPads can't play; `song.m4a` is its AAC conversion (`ffmpeg -i <original> -vn -c:a aac -b:a 128k -movflags +faststart audio/song.m4a`). Root-level `.m4a` files are git-ignored.
- `audio/` — `01.m4a` … `22.m4a` are the letter names, `final-1.m4a` … `final-5.m4a` are the final-letter names ("כף סופית" …) in `FINALS` order, `numbers/00.m4a` … `numbers/20.m4a` are the number names as used in counting (אחת, שתיים …), `q-count.m4a`, `q-more.m4a` and `q-add.m4a` are the spoken questions of the number games, `bravo.m4a` is "כל הכבוד". Recorded with the Google Translate Hebrew voice through the `gTTS` Python package (unofficial client, needs internet): `gTTS("אָלֶף", lang="iw").save("x.mp3")` then `afconvert -f m4af -d aac -b 48000 x.mp3 01.m4a`. The letter names are written with nikud so they are pronounced correctly. Exception: `02.m4a` (ב) is recorded from "בֶּת", because the voice misread "בֵּית". `bravo.m4a` is the exception: Microsoft's neural voice through the `edge-tts` package, plain spelling — `edge-tts --voice he-IL-HilaNeural --rate=-10% --text "כל הכבוד!" --write-media x.mp3`.

## Adding an exercise

The exercise menus (`.menu-grid`) are centred flex rows of three cards (two on phones), so a short last row sits in the middle. Pick the column count so no row is left with a single card: the numbers menu has seven cards and uses `.menu-cols-4` (four and three). Add a `.menu-card` link to the subject's menu screen (`#abc` or `#numbers`), a new `<section class="screen">`, and a branch in `route()`. The games share `.level-menu`/`.level-card` (level picker), `.dots` + `renderDots()` (round progress), `.order-play` and `.order-done` (finish panel).

## Letters (`LETTERS`)

Each letter is `{ ch, name, strokes }` on a 200×200 board. `strokes` are SVG path strings in writing order, and each path runs in the writing direction — that alone decides the numbers, arrows, star and end dot. To change how a letter is written, edit only its paths and check the result at `#all`.

## Tracing notes

- `buildLetter()` draws the layers (blue outline, white channel, dashed guide, arrows, number badges, paint, star). The paint is the stroke path itself, revealed with `stroke-dasharray`.
- `follow()` moves the paint to the point of the current stroke nearest the pointer, forwards only, at most `LOOKAHEAD` ahead and only within `TOLERANCE`. The look-ahead is what gets it round sharp corners; a plain step-by-step check stalls there.
- Sound goes through Web Audio, unlocked by any tap, because a letter is finished during a drag and iPad Safari won't start an `<audio>` element from a drag. Fallbacks: `<audio>` (when opened as a local file), then the browser's speech synthesis.
- `openLetter(idx)` is the letter-picker entry; it and the name game both go through `startTrace(letter, audio, extra)`. `trace.reopen` restarts the current letter (🧽), `trace.onDone` replaces the normal ending.
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

## My name (השם שלי)

- On `#name` the teacher types a name, or taps a saved one; the child then traces its letters one after another on the normal tracing screen (`#name-trace`, `openNameLetter(pos)`), including final letters. The title shows the whole name: written letters green, the current one large, the rest grey.
- Finishing a letter says its name and moves on by itself after 1.8s; the arrows step back and forth inside the name (`stepName`). After the last letter: confetti, "כל הכבוד", and the banner shows the whole name. Nothing speaks the name itself — there is no recording for arbitrary names.
- `cleanName()` keeps only Hebrew letters (so the text is safe to put in HTML) and at most `NAME_MAX` (12). Names are saved on the device only, in `localStorage` (`gan-names-v1`, newest first, up to 40); the × on a chip removes one. Reloading `#name-trace` returns to `#name`, since the name being traced lives only in memory.

## Final letters (אות סופית)

- Five rounds, one per pair in random order: a regular letter (כ מ נ פ צ) is shown and named, and the child taps its final form among all five final letters. Right: it lands in the slot and "… סופית" is spoken. Wrong: it shakes with a `boop()`.
- The screen reuses the first-letter board and `.pic` tiles.

## Numbers (מספרים)

Seven exercises. Three are the letter games run with numbers; four are their own.

- **Shared games.** `startOrder(cfg)`, `startNames(cfg)` and `startFind(cfg)` take the symbols to play with as `cfg.items` (`LETTER_ITEMS` or a slice of `NUMBER_ITEMS`, each `{ ch, name, audio, hint? }`), plus the screen `title` and `back` link; `route()` builds the cfg. `ltr: true` lays numbers out left to right. So `#numnames-2…4` (שמות המספרים, 0–10), `#numfind` (מצא את המספר, 0–9, look-alikes in `DIGITS_ALIKE`) and `#numorder-10` / `#numorder-20` (השלמת סדר מספרים: 1–10 with one missing, 1–20 with two) reuse the `#names-game`, `#find` and `#order-game` screens. Their level pickers are `#numnames` and `#numorder`.
- **כתיבת מספרים** — `#digits` picker, `#digit-0` … `#digit-9` on the `#trace` screen via `openDigit()`. Done stars are kept in `gan-digits-v1`. The digit shapes are also on the `#all` sheet.
- **כמה יש?** — `#count-5` / `#count-10`: a box of 1–max pictures and three number cards (`nearChoices`: the answer and two neighbours, in rising order). Tapping a picture counts it aloud and badges it (`countObject`).
- **מה יותר?** — `#more-5` / `#more-10`: two panels of the same picture in different amounts; the child taps the bigger. The winning amount is spoken.
- **חיבור** — `#add-5` / `#add-10` (the largest sum): two boxes of pictures with their numerals, `+`, `=` and a slot; three number cards. Counting by tapping carries on from the first box into the second (one shared `tally`).
- The four own games share `fillObjects`, `countObject`, `numberCards`, `answerCard`, `finishGame`, the `.num-game` screen class and `NUM_ROUNDS` (5). Each asks its question aloud at the start of a round and from 🔊. A wrong number card fades out for the rest of the round.
