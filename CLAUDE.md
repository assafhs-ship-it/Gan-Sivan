# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**הגן של סיון** — a Hebrew (RTL) site of exercises for kindergarten children, used on a PC (mouse) or an iPad (finger). Static site, no build step, no framework, no dependencies (Google Fonts only). Meant to be deployed with GitHub Pages from the `main` branch root.

The children can't read: keep text minimal, targets big, and feedback visual and spoken.

**When changing `styles.css` or `script.js`, bump the `?v=` number on both in `index.html`, and bump `APP_VERSION` at the top of `script.js`** (shown on the landing page). GitHub Pages caches for 10 minutes and iPad Safari will otherwise pair a fresh page with a stale script.

## Files

- `index.html` — the screens, switched by URL hash in `route()`: `#home` (landing page, menu of exercises, version), `#letters` (letter picker), `#trace` (the tracing exercise, `#letter-1` … `#letter-22`), `#order` (letter-order level picker), `#order-game` (`#order-1`, `#order-2`), `#first` (first-letter level picker), `#first-game` (`#first-2` … `#first-4`) and `#all` (unlinked review sheet showing every letter's stroke order).
- `script.js` — `LETTERS` data at the top, the `WORDS` picture words, then progress, sound, confetti, letter drawing, tracing, letter order, first letter, screens.
- `styles.css` — design tokens on `:root`.
- `images/bg.svg` — seamless 520px tile of line-art doodles (clouds, stars, pencils, kites, letter blocks) shown faintly behind every screen by `body::before`; its opacity is set there.
- `audio/` — `01.m4a` … `22.m4a` are the letter names, `bravo.m4a` is "כל הכבוד". Recorded with the Google Translate Hebrew voice through the `gTTS` Python package (unofficial client, needs internet): `gTTS("אָלֶף", lang="iw").save("x.mp3")` then `afconvert -f m4af -d aac -b 48000 x.mp3 01.m4a`. The letter names are written with nikud so they are pronounced correctly. `bravo.m4a` is the exception: Microsoft's neural voice through the `edge-tts` package, plain spelling — `edge-tts --voice he-IL-HilaNeural --rate=-10% --text "כל הכבוד!" --write-media x.mp3`.

## Adding an exercise

Add a `.menu-card` link on the landing page, a new `<section class="screen">`, and a branch in `route()`. The games share `.level-menu`/`.level-card` (level picker), `.dots` + `renderDots()` (round progress), `.order-play` and `.order-done` (finish panel).

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
