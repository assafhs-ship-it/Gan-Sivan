# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**הגן של סיון** — a Hebrew (RTL) site of exercises for kindergarten children, used on a PC (mouse) or an iPad (finger). Static site, no build step, no framework, no dependencies (Google Fonts only). Meant to be deployed with GitHub Pages from the `main` branch root.

The children can't read: keep text minimal, targets big, and feedback visual and spoken.

**Every change request bumps the version by 0.1**, even one that only touches `index.html`: bump `APP_VERSION` at the top of `script.js` (shown on the landing page) and the `?v=` number on `styles.css` and `script.js` in `index.html`. GitHub Pages caches for 10 minutes and iPad Safari will otherwise pair a fresh page with a stale script.

## Files

- `index.html` — the screens, switched by URL hash in `route()`: `#home` (landing page with the two sections, אותיות and מספרים, and the version), `#abc` (menu of the letter exercises, games included), `#numbers` (menu of the number exercises, games included), `#letters` (letter picker), `#trace` (the tracing exercise, `#letter-1` … `#letter-22`), `#order` (letter-order level picker), `#order-game` (`#order-1`, `#order-2`), `#first` (first-letter level picker), `#first-game` (`#first-2` … `#first-4`), `#names` (letter-names level picker), `#names-game` (`#names-2` … `#names-4`), `#find` (find-the-letter game, no level picker), `#memory` (memory level picker), `#memory-game` (`#memory-6`, `#memory-8`, `#memory-12`), `#pop` (balloons speed picker), `#pop-game` (`#pop-1` slow, `#pop-2` fast), `#name` (name entry; `#name-trace` reuses the `#trace` screen), `#final` (final-letters game), `#beats` (כמה צלילים?), `#rhyme` (חרוזים), `#spell` / `#spell-1`, `#spell-2` (בונים מילה), `#hidden` / `#hidden-1`, `#hidden-2` (האות המסתתרת), `#road` (מסלול האותיות) and the other games (see Games below), the number screens (see Numbers below) and `#all` (unlinked review sheet showing every letter's stroke order).
- `script.js` — `LETTERS` data at the top, the `WORDS` picture words, then progress, sound, confetti, letter drawing, tracing, letter order, first letter, letter names, find the letter, memory, balloons, my name, final letters, screens. `FINALS` (the five final letters, with strokes), `NUMBERS` (names 0–20) and `DIGITS` (0–9 with strokes) sit under `LETTERS`.
- `styles.css` — design tokens on `:root`. Everything is in Varela Round except the landing-page title "הגן של סיון", which is Playpen Sans Hebrew 800 (a child's-handwriting font); `index.html` loads it with Google Fonts' `text=` parameter for just those letters, so changing the title text means updating that link too.
- The landing page's three section tiles have a soft top-corner light, a white hill along the bottom, two sparkles and an icon; the sparkles twinkle and the icon floats only while the tile is hovered or focused (`#home .menu-card`, "Landing page tiles" in `styles.css`).
- `images/sivan.png` — Sivan's cartoon portrait with a transparent background, shown on the landing page in front of the rainbow (`.hero-avatar`): a round frame clips her shoulders while her head rises above it. It was cut out of `Sivan.JPG` (kept locally, git-ignored), whose "transparent" checkerboard was baked into the picture.
- `images/bg.svg` — seamless 520px tile of line-art doodles (clouds, stars, pencils, kites, letter blocks) shown faintly behind every screen by `body::before`; its opacity is set there.
- `audio/song.m4a` — the kindergarten's song (2:02), played and stopped by the round `#song-btn` in the corner of the landing page. It plays on the landing page only (`route()` stops it on leaving) so it never talks over an exercise, and it is streamed with an `<audio>` element, not preloaded. The original file in the project root is Opus audio, which older iPads can't play; `song.m4a` is its AAC conversion (`ffmpeg -i <original> -vn -c:a aac -b:a 128k -movflags +faststart audio/song.m4a`). Root-level `.m4a` files are git-ignored.
- `audio/rhymes/` — the words of the rhyme pictures, numbered per word as given in `RHYME_GROUPS` (removed words leave gaps; new words take the next numbers, up to 70 so far); recorded with the same Google voice from vocalized text.
- `audio/` — `01.m4a` … `22.m4a` are the letter names, `final-1.m4a` … `final-5.m4a` are the final-letter names ("כף סופית" …) in `FINALS` order, `numbers/00.m4a` … `numbers/20.m4a` are the number names as used in counting (אחת, שתיים …), `q-count.m4a`, `q-more.m4a` and `q-add.m4a` are the spoken questions of the number games, `bravo.m4a` is "כל הכבוד", `good-job.m4a` is "עבודה טובה" (Google voice). Recorded with the Google Translate Hebrew voice through the `gTTS` Python package (unofficial client, needs internet): `gTTS("אָלֶף", lang="iw").save("x.mp3")` then `afconvert -f m4af -d aac -b 48000 x.mp3 01.m4a`. The letter names are written with nikud so they are pronounced correctly. Exception: `02.m4a` (ב) is recorded from "בֶּת", because the voice misread "בֵּית". `bravo.m4a` is the exception: Microsoft's neural voice through the `edge-tts` package, plain spelling — `edge-tts --voice he-IL-HilaNeural --rate=-10% --text "כל הכבוד!" --write-media x.mp3`.

## Adding an exercise

The exercise menus are coloured `.menu-card` tiles in a centred `.menu-grid`, ordered by topic (writing, recognising, sounds and words, then the games). Pick the column count so the rows come out even: the letters menu has eighteen tiles in the default three columns (six rows, icon above the name, the page scrolls); the numbers menu has eleven and uses `.menu-cols-4` (four, four and three). Add a `.menu-card` link to the subject's menu, a new `<section class="screen">`, and a branch in `route()`. The games share `.level-menu`/`.level-card` (level picker), `.dots` + `renderDots()` (round progress), `.order-play` and `.order-done` (finish panel). Every finish goes through `finishGame(prefix)` (see Finish screen below).

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

## How many sounds (כמה צלילים?)

- A picture is shown and its word spoken (tap it to hear it again); the child picks how many צלילים the word has, from cards 2–5 that also show that many dots. After a right answer the word is said again and counted out with one dot and a tap sound per צליל.
- A צליל is a consonant with its vowel, as taught in kindergarten: כֶּ-לֶ-ב is 3, אֲ-נָ-נָ-ס is 4. A ו or י that is only a vowel and a silent final ה don't count (בָּ-לוֹ-ן 3, בָּ-נָ-נָה 3). The words and their counts are in `BEATS`, drawn from `WORDS` so their recordings already exist; מספריים (6) is left out. Each round has a different count from the one before.
- It uses the number games' shared pieces (`answerCard`, `finishGame`, `NUM_ROUNDS`, the `.num-game` screen) and the `.picture-card` button.

## Letter road (מסלול האותיות)

- A cartoon car (inline SVG in `index.html`) drives through the whole alphabet א→ת in order, without final letters. At each stop three letter bubbles (`.gate`) wait in the three lanes: the next letter and two of its alphabet neighbours. The strip along the top (`#road-map`) shows the trip: done letters green, the next one yellow.
- Tapping a bubble moves the car to that lane and drives up to it. Right: it bursts, `ding()` and the letter's name, the map advances, and the car drives on while new bubbles arrive. Wrong: the car bumps it with a `boop()`, backs up to where it was, and that bubble fades out; the child tries again.
- The car never moves sideways on screen: `drive()` slides `#road-world` (the bubbles) under it with a CSS transition, and the `.driving` / `.reversing` classes on `.road-scene` run or reverse the scrolling trees, lane lines, spinning wheels and exhaust puffs for the same time. `engine()` plays a soft synthesized hum. Taps are ignored while the car moves (`road.locked`).

## Games (משחקים)

Nine games, listed with the exercises of their subject (letter games under אותיות, number games under מספרים; there is no separate games menu): the letter road above and eight more. Each screen has a one-line `.game-hint` under its title saying how to play (the train's comes from `cfg.hint`). Games that repeat their question have a big pulsing `.scene-speak` 🔊 inside the game picture rather than in the top bar (top-right; top-left in the monkey and feeding games, where the right side is busy). Each game is on its own `#<id>-game` screen (`.game-screen`, play area `.game-play`, finish via `finishGame`). Shared helpers: `GAME_ROUNDS` (5), `toot()` (train whistle), `restartAnimation(el, cls)`, plus the number games' `range`, `renderDots` and `popSound`. The lift also uses `audio/q-floor.m4a` ("קומה").

- **רכבת האותיות / רכבת המספרים** (`#train`, `#numtrain`, one shared `#train-game` screen via `startTrain(cfg)`): a train arrives with empty wagons; the child taps the pile in order and each item jumps into the next wagon; a full train whistles and leaves. Letters: runs of 4, train faces and leaves to the right (fills right to left). Numbers 1–10: runs of 5, train faces and leaves to the left. `TRAIN_ROUNDS` (4).
- **הקוף והבננות** (`#monkey`): the letter is spoken; six bananas with letters hang in a tree (`BANANA_SPOTS`); the right one drops into the monkey's hands and he eats it; a wrong one makes him shake his head.
- **הדג הרעב** (`#fish`): the whale shows and says the letter it wants; fish carrying letters swim across (one `setInterval` per game, like the balloons; taps on `pointerdown`). A right fish swims into the whale's mouth; `FISH_NEED` (2) per round. `.swimmer` is excluded from the reduced-motion rule.
- **מגדל האותיות** (`#tower`): three floating blocks (the next letter and two neighbours); the right one drops onto the tower, which keeps its top `TOWER_SHOWN` (4) blocks on screen. After ת a rocket lands on top and launches. One game is the whole alphabet.
- **הצפרדע והאבנים** (`#frog`): stones 1–10 scattered over the river (`dir="ltr"`: start bank left, flag right). The frog hops to each stone in order; a wrong stone splashes and the frog climbs back to where it was.
- **האכלת החיות** (`#feed`): an animal holds a number 1–10 (`ANIMALS`: animal and its food). Tapping food moves it to the plate (counted aloud) or back to the pile; ✔ checks the count — right: a happy dance, wrong: the animal shakes its head.
- **המעלית** (`#lift`): "קומה" and a number are spoken; the child presses that button on the panel (two columns, 1 at the bottom). The lift closes its doors, rides floor by floor saying each floor, and opens. It is drawn as a cut-away building: roof with the lift motor, ten floors with windows, a dark shaft down the middle with the car hanging on its cable (steel doors, warm light inside, Sivan riding in it — `images/sivan.png`). The panel has a red floor display with ▲/▼ while riding (`placeLift(floor, dir)`).

## Rhymes (חרוזים)

- The children can't read, so every word here is a picture. `RHYME_GROUPS` are rhyme families (בלון/לימון/שעון…, אופניים/מספריים/גרביים…, ביצה/פיצה…, ילדים/ורדים/פרחים…), 60 pictures in 20 families, each `{ sound, words: [[picture, word, file], …] }` (`file` is the recording's number in `audio/rhymes/`, fixed per word); a picture is an emoji, two emoji (🌹🌹 ורדים, shown a little smaller), or `img:<name>` for a drawing in `images/rhymes/<name>.svg` (feather נוצה, comb כרבולת, back גב, freckles נמש, nail מסמר, flipflops כפכף, roof גג (only the roof drawn bold, the house a faint hint, an arrow pointing at it) — words with no emoji older computers can show); the n-th picture overall has its sound in `audio/rhymes/<nn>.m4a`, so adding or reordering pictures means re-recording.
- A round shows a big picture and says its word (tap it to hear again); three picture cards follow: another member of its family (the answer) and one picture from each of two other families. Families with the same `sound` tag (all the "-ָה" endings; "-ִים" with "-ַיִם"; the two "-ַח" families פרח/קרח and ירח/מפתח; the two "-ָב" families כוכב/ארנב and צב/גב) are never used together, so no wrong card even sounds like a rhyme. Each family is used at most once per game.
- Each card has its own small 🔊 that says its word; tapping the card chooses it. Right: the card turns green and the pair is said. Wrong: the card shakes, fades out, and the big picture's word is said again.

## Spell the picture (בונים מילה)

- A picture from `WORDS` is shown and its word spoken (tap it to hear again). Its letters lie shuffled under a row of empty boxes; the child taps them in order (right to left) and each jumps into the next box, saying its name (`glyphFor`, so final letters are named too). A full word cheers and is said. Wrong letter: shake and `boop()`.
- Level 1: words of 2–3 letters; level 2: 4–5 letters. The shuffle never leaves the word already in order.

## Find the hidden letters (האות המסתתרת)

- A black-and-white colouring-page scene, built fresh each round and alternating between `parkScene()` (sky, hills, trees, a house, a pond with fish, flowers, grass) and `beachScene()` (sea with boats and fish, sand with an umbrella, bucket, shells, crab, palm). Drawings come from `ART` (100 × 100, standing on y = 100, placed with `art(name, x, y, scale, turn)`); shapes with class `s` hold their colour in `--fill`.
- Letters are scattered over the scene, spaced apart: the target letter several times and other letters as decoys (never a `TOO_ALIKE` partner). The target and a row of boxes (one per hidden copy) are shown above the picture.
- Tapping a target copy (a generous invisible circle) colours it, ticks a box and says the letter's name. When all are found the whole scene is coloured in. Tapping a decoy shakes it with a `boop()`. After 25 s without progress one unfound copy glows (`hint`).
- `HIDDEN_LEVELS`: easy — 3 copies among 5 other letters, bigger; hard — 5 copies among 12 others, smaller.

## Celebration (Sivan's "כל הכבוד")

- Every few right answers — a random number from `CHEER_MIN` (3) to `CHEER_MAX` (6), counted across all exercises and games — `celebrate()` shows Sivan with a 👍 saying "כל הכבוד!" or "עבודה טובה!" (shown and spoken), in one of three animations picked at random: `peek` (up from the bottom corner with a speech bubble), `spotlight` (dimmed screen, turning sun rays) or `medal` (a gold star with ribbons spins in, with confetti). A synthesized chime (`jingle()`) opens it; it stays `CHEER_MS` (5.2 s) in the fixed `#cheer` layer, which never catches taps.
- Right answers are counted by `cheerTick()`, called from `ding()` (so every exercise that dings counts) and from the balloons, letter-order and train games, which celebrate with other sounds. Nothing counts while tracing (`trace` set), since tracing dings per stroke. It appears 0.9 s after the answer, so the answer's own feedback comes first.

## Finish screen

- Every exercise and game ends through `finishGame(prefix)`: it hides `#<prefix>-play`, shows `#<prefix>-done`, and stops any celebration in progress (`stopCheer()`; `celebrate()` also stays quiet while a finish panel is showing).
- `buildFinishStages()` (run once at start-up) replaces each panel's `.done-stars` with a stage: five gold stars in an arc (`.fin-star`, one per round) and Sivan on a purple podium. CSS animations land the stars one at a time (0.4 s apart, each with a sparkle burst), then "כל הכבוד!" pops in at 2.5 s and the buttons at 3.1 s; Sivan bounces from 2.5 s. They replay whenever the panel is shown. `finishGame()` times the sounds to match: a rising `starDing(k)` per star, `jingle()` and confetti at 2.5 s, the spoken "כל הכבוד" at 3.1 s.
- Under reduced motion the pieces are shown outright (they would otherwise stay invisible).

## Navigation

- Every exercise screen has ✖ (back) and 🏠 (landing page) side by side; `addHomeButtons()` adds the 🏠 at start-up and wraps both sides of the `.topbar` in equal-width `.topbar-side` boxes so the title stays centred. Menus keep their single 🏠.
- Each game's ✖ returns to its subject's menu (the shared train screen sets it from `cfg.ltr`).
