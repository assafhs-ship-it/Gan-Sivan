const APP_VERSION = '2.9';

// Each letter is drawn on a 200x200 board. `strokes` are SVG paths, in the
// order the child writes them; each path runs in the writing direction.
const LETTERS = [
  { ch: 'א', name: 'אלף',  strokes: ['M55,45 L150,160', 'M148,42 L113,112', 'M82,80 L62,160'] },
  { ch: 'ב', name: 'בית',  strokes: ['M55,50 L125,50 Q145,50 145,70 L145,155', 'M40,155 L165,155'] },
  { ch: 'ג', name: 'גימל', strokes: ['M72,50 L122,50 L130,155', 'M127,118 L72,155'] },
  { ch: 'ד', name: 'דלת',  strokes: ['M45,50 L160,50', 'M140,50 L140,155'] },
  { ch: 'ה', name: 'הא',   strokes: ['M50,50 L135,50 Q150,50 150,65 L150,155', 'M60,92 L60,155'] },
  { ch: 'ו', name: 'וו',   strokes: ['M82,50 L108,50 L108,155'] },
  { ch: 'ז', name: 'זין',  strokes: ['M68,50 L135,50', 'M102,50 L102,155'] },
  { ch: 'ח', name: 'חית',  strokes: ['M55,50 L135,50 Q150,50 150,65 L150,155', 'M55,50 L55,155'] },
  { ch: 'ט', name: 'טית',  strokes: ['M60,50 L60,140 Q60,155 75,155 L135,155 Q150,155 150,140 L150,65 Q150,50 135,50 L105,50 L105,78'] },
  { ch: 'י', name: 'יוד',  strokes: ['M85,50 L112,50 L112,100'] },
  { ch: 'כ', name: 'כף',   strokes: ['M55,50 L125,50 Q150,50 150,75 L150,130 Q150,155 125,155 L55,155'] },
  { ch: 'ל', name: 'למד',  strokes: ['M72,28 L72,78 L140,78 L140,108 L100,160'] },
  { ch: 'מ', name: 'מם',   strokes: ['M88,50 L135,50 Q150,50 150,65 L150,155 L100,155', 'M88,50 L60,85 L60,155'] },
  { ch: 'נ', name: 'נון',  strokes: ['M78,50 L125,50 L125,155 L62,155'] },
  { ch: 'ס', name: 'סמך',  strokes: ['M60,50 L150,50 L150,120 Q150,155 105,155 Q60,155 60,120 L60,50'] },
  { ch: 'ע', name: 'עין',  strokes: ['M145,50 L145,110 Q145,155 95,155 L50,155', 'M80,50 L95,150'] },
  { ch: 'פ', name: 'פא',   strokes: ['M55,50 L125,50 Q150,50 150,75 L150,130 Q150,155 125,155 L55,155', 'M55,50 L55,100 L100,100'] },
  { ch: 'צ', name: 'צדי',  strokes: ['M60,50 L145,155 L55,155', 'M140,50 L108,108'] },
  { ch: 'ק', name: 'קוף',  strokes: ['M55,50 L150,50 L150,100 L110,135', 'M65,88 L65,180'] },
  { ch: 'ר', name: 'ריש',  strokes: ['M50,50 L130,50 Q150,50 150,70 L150,155'] },
  { ch: 'ש', name: 'שין',  strokes: ['M50,50 L50,125 Q50,155 80,155 L120,155 Q150,155 150,125 L150,50', 'M100,50 L80,150'] },
  { ch: 'ת', name: 'תו',   strokes: ['M50,50 L135,50 Q150,50 150,65 L150,155', 'M80,50 L80,155 L50,155'] },
];

// The five final letters, written like LETTERS. `base` is the index in LETTERS of the
// regular form; `audio` is the file with the spoken name.
const FINALS = [
  { ch: 'ך', name: 'כף סופית',  base: 10, audio: 'final-1', strokes: ['M50,50 L130,50 Q150,50 150,70 L150,182'] },
  { ch: 'ם', name: 'מם סופית',  base: 12, audio: 'final-2', strokes: ['M60,50 L150,50 L150,155 L60,155 L60,50'] },
  { ch: 'ן', name: 'נון סופית', base: 13, audio: 'final-3', strokes: ['M86,50 L108,50 L108,182'] },
  { ch: 'ף', name: 'פא סופית',  base: 16, audio: 'final-4', strokes: ['M55,50 L125,50 Q150,50 150,75 L150,182', 'M55,50 L55,100 L100,100'] },
  { ch: 'ץ', name: 'צדי סופית', base: 17, audio: 'final-5', strokes: ['M62,50 L100,105 L100,182', 'M140,50 L108,100'] },
];

// Number names 0-20, as spoken when counting; the sound of n is audio/numbers/<nn>.m4a.
const NUMBERS = ['אפס', 'אחת', 'שתיים', 'שלוש', 'ארבע', 'חמש', 'שש', 'שבע', 'שמונה', 'תשע', 'עשר',
  'אחת עשרה', 'שתים עשרה', 'שלוש עשרה', 'ארבע עשרה', 'חמש עשרה', 'שש עשרה', 'שבע עשרה', 'שמונה עשרה', 'תשע עשרה', 'עשרים'];

// The digits 0-9 for tracing, written like LETTERS.
const DIGITS = [
  { ch: '0', strokes: ['M100,40 C68,40 56,70 56,100 C56,130 68,160 100,160 C132,160 144,130 144,100 C144,70 132,40 100,40'] },
  { ch: '1', strokes: ['M72,68 L106,40 L106,160'] },
  { ch: '2', strokes: ['M62,72 C62,30 140,30 138,74 C137,100 92,124 60,160 L146,160'] },
  { ch: '3', strokes: ['M62,56 C80,32 138,34 136,68 C135,90 116,98 96,98 C120,98 142,108 142,130 C142,166 80,170 58,142'] },
  { ch: '4', strokes: ['M118,40 L56,124 L150,124', 'M118,40 L118,160'] },
  { ch: '5', strokes: ['M72,40 L66,92 C86,78 140,80 140,120 C140,166 80,168 58,142', 'M72,40 L138,40'] },
  { ch: '6', strokes: ['M130,48 C96,34 58,74 58,116 C58,150 80,162 100,162 C124,162 142,146 142,122 C142,98 122,86 100,86 C80,86 62,98 58,118'] },
  { ch: '7', strokes: ['M58,40 L145,40 L92,160'] },
  { ch: '8', strokes: ['M132,58 C125,34 70,34 66,62 C64,84 136,112 138,138 C138,168 62,168 62,138 C62,112 136,84 132,58'] },
  { ch: '9', strokes: ['M138,75 C138,50 122,38 100,38 C78,38 62,54 62,76 C62,98 78,112 100,112 C122,112 138,98 138,75 L134,160'] },
].map((d, n) => ({ ...d, name: NUMBERS[n] }));

// Picture words for "מה מתחיל ב", one row per letter in LETTERS order. Each is
// [word, picture, vocalized word]; its sound is audio/words/<letter>-<n>.m4a.
const WORDS = [
  [['אריה', '🦁', 'אַרְיֵה'], ['אבטיח', '🍉', 'אֲבַטִּיחַ'], ['אננס', '🍍', 'אֲנָנָס'], ['אוזן', '👂', 'אֹזֶן'], ['אף', '👃', 'אַף']],  // א
  [['בלון', '🎈', 'בָּלוֹן'], ['בננה', '🍌', 'בָּנָנָה'], ['בית', '🏠', 'בַּיִת'], ['ברווז', '🦆', 'בַּרְוָז']],  // ב
  [['גזר', '🥕', 'גֶּזֶר'], ['גלידה', '🍦', 'גְּלִידָה'], ['גמל', '🐫', 'גָּמָל'], ['גיטרה', '🎸', 'גִּיטָרָה']],  // ג
  [['דג', '🐟', 'דָּג'], ['דבורה', '🐝', 'דְּבוֹרָה'], ['דוב', '🐻', 'דֹּב'], ['דלת', '🚪', 'דֶּלֶת']],  // ד
  [['הר', '⛰️', 'הַר'], ['היפופוטם', '🦛', 'הִיפּוֹפּוֹטָם']],  // ה
  [['ורד', '🌹', 'וֶרֶד'], ['וופל', '🧇', 'וָפֶל']],  // ו
  [['זברה', '🦓', 'זֶבְּרָה'], ['זאב', '🐺', 'זְאֵב'], ['זחל', '🐛', 'זַחַל']],  // ז
  [['חתול', '🐱', 'חָתוּל'], ['חילזון', '🐌', 'חִלָּזוֹן'], ['חזיר', '🐷', 'חֲזִיר'], ['חציל', '🍆', 'חָצִיל']],  // ח
  [['טלפון', '☎️', 'טֶלֶפוֹן'], ['טרקטור', '🚜', 'טְרַקְטוֹר'], ['טווס', '🦚', 'טַוָּס']],  // ט
  [['יד', '✋', 'יָד'], ['ירח', '🌙', 'יָרֵחַ'], ['ינשוף', '🦉', 'יַנְשׁוּף']],  // י
  [['כלב', '🐶', 'כֶּלֶב'], ['כדור', '⚽', 'כַּדּוּר'], ['כובע', '🎩', 'כּוֹבַע'], ['כוכב', '⭐', 'כּוֹכָב']],  // כ
  [['לב', '❤️', 'לֵב'], ['לימון', '🍋', 'לִימוֹן'], ['לחם', '🍞', 'לֶחֶם'], ['לווייתן', '🐳', 'לִוְיָתָן']],  // ל
  [['מטוס', '✈️', 'מָטוֹס'], ['מפתח', '🔑', 'מַפְתֵּחַ'], ['מטרייה', '☂️', 'מִטְרִיָּה'], ['מספריים', '✂️', 'מִסְפָּרַיִם']],  // מ
  [['נחש', '🐍', 'נָחָשׁ'], ['נמלה', '🐜', 'נְמָלָה'], ['נר', '🕯️', 'נֵר'], ['נעל', '👟', 'נַעַל']],  // נ
  [['סוס', '🐴', 'סוּס'], ['סירה', '⛵', 'סִירָה'], ['ספר', '📕', 'סֵפֶר'], ['סוכרייה', '🍭', 'סֻכָּרִיָּה']],  // ס
  [['עץ', '🌳', 'עֵץ'], ['עוגה', '🎂', 'עוּגָה'], ['עכבר', '🐭', 'עַכְבָּר'], ['ענבים', '🍇', 'עֲנָבִים'], ['עיפרון', '✏️', 'עִפָּרוֹן']],  // ע
  [['פיל', '🐘', 'פִּיל'], ['פרח', '🌸', 'פֶּרַח'], ['פרפר', '🦋', 'פַּרְפַּר'], ['פרה', '🐄', 'פָּרָה'], ['פיצה', '🍕', 'פִּיצָה']],  // פ
  [['צב', '🐢', 'צָב'], ['ציפור', '🐦', 'צִפּוֹר'], ['צפרדע', '🐸', 'צְפַרְדֵּעַ']],  // צ
  [['קוף', '🐵', 'קוֹף'], ['קשת', '🌈', 'קֶשֶׁת'], ['קיפוד', '🦔', 'קִפּוֹד'], ['קובייה', '🎲', 'קֻבִּיָּה']],  // ק
  [['רכבת', '🚂', 'רַכֶּבֶת'], ['רובוט', '🤖', 'רוֹבּוֹט'], ['רדיו', '📻', 'רַדְיוֹ']],  // ר
  [['שמש', '☀️', 'שֶׁמֶשׁ'], ['שעון', '⏰', 'שָׁעוֹן'], ['שועל', '🦊', 'שׁוּעָל'], ['שוקולד', '🍫', 'שׁוֹקוֹלָד']],  // ש
  [['תפוח', '🍎', 'תַּפּוּחַ'], ['תות', '🍓', 'תּוּת'], ['תרנגול', '🐓', 'תַּרְנְגוֹל'], ['תינוק', '👶', 'תִּינוֹק']],  // ת
];

// Letters that sound alike at the start of a word are never offered against each other.
const SOUND_ALIKE = ['אעה', 'כק', 'טת'];

const STEP = 2;        // precision of the paint, in board units
const LOOKAHEAD = 30;  // how far along the line one finger movement can carry the paint
const TOLERANCE = 24;  // how far from the line the finger may wander
const END_SNAP = 8;    // a stroke counts as finished this close to its end
const STORAGE_KEY = 'gan-letters-v1';

const $ = id => document.getElementById(id);

// ---------- Progress ----------

function loadDone(key = STORAGE_KEY) {
  try { return new Set(JSON.parse(localStorage.getItem(key)) || []); }
  catch { return new Set(); }
}

function markDone(idx, key = STORAGE_KEY) {
  const done = loadDone(key);
  done.add(idx);
  try { localStorage.setItem(key, JSON.stringify([...done])); } catch {}
}

// ---------- Sound ----------

let audioCtx = null;
const buffers = {};

function getAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

// Browsers only allow sound after a touch or click, so wake the audio on every one.
['pointerdown', 'pointerup', 'touchend', 'click'].forEach(type =>
  document.addEventListener(type, getAudio, { capture: true, passive: true }));

const audioUrl = name => `audio/${name}.m4a`;
const letterAudio = idx => String(idx + 1).padStart(2, '0');

function preload(name) {
  const ctx = getAudio();
  if (!ctx || name in buffers) return;
  buffers[name] = null;
  fetch(audioUrl(name))
    .then(r => r.arrayBuffer())
    .then(data => new Promise((ok, fail) => ctx.decodeAudioData(data, ok, fail)))
    .then(buf => { buffers[name] = buf; })
    .catch(() => {});
}

function speak(text) {
  if (!text || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'he-IL';
  u.rate = 0.8;
  speechSynthesis.speak(u);
}

function play(name, fallbackText) {
  const ctx = getAudio();
  if (ctx && buffers[name]) {
    const src = ctx.createBufferSource();
    src.buffer = buffers[name];
    src.connect(ctx.destination);
    src.start();
    return;
  }
  new Audio(audioUrl(name)).play().catch(() => speak(fallbackText));
}

function ding() {
  cheerTick();
  const ctx = getAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);
}

function boop() {
  const ctx = getAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  osc.type = 'sine';
  osc.frequency.setValueAtTime(240, now);
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.18);
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.25);
}

// A short burst of noise for a popping balloon.
function popSound() {
  const ctx = getAudio();
  if (!ctx) return;
  const length = Math.floor(ctx.sampleRate * 0.09);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  const src = ctx.createBufferSource();
  const gain = ctx.createGain();
  src.buffer = buffer;
  gain.gain.value = 0.5;
  src.connect(gain).connect(ctx.destination);
  src.start();
}

// ---------- Confetti ----------

function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#ff7a59', '#3aa0e8', '#4cc38a', '#ffd23f', '#9b7bea', '#ff8fb8'];
  const box = document.createElement('div');
  box.className = 'confetti';
  for (let i = 0; i < 44; i++) {
    const piece = document.createElement('i');
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    box.appendChild(piece);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3800);
}

// ---------- Letter drawing ----------

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(name, attrs, parent) {
  const e = document.createElementNS(SVG_NS, name);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

function starPoints(outer, inner) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? inner : outer;
    const a = Math.PI * i / 5 - Math.PI / 2;
    pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

function tangentAt(path, len, total) {
  const a = path.getPointAtLength(Math.max(0, len - 0.5));
  const b = path.getPointAtLength(Math.min(total, len + 0.5));
  const d = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  return { x: (b.x - a.x) / d, y: (b.y - a.y) / d };
}

// A small red arrow beside the start of a stroke, showing which way to go.
// It stops before the stroke bends so it never cuts a corner.
function drawArrow(path, total, parent) {
  const OFFSET = 7.5;
  const from = Math.min(13, total * 0.2);
  const to = Math.min(58, total * 0.6);
  const first = tangentAt(path, from, total);
  const pts = [];
  for (let len = from; len <= to; len += 3) {
    const t = tangentAt(path, len, total);
    if (t.x * first.x + t.y * first.y < 0.9) break;
    const p = path.getPointAtLength(len);
    pts.push({ x: p.x - t.y * OFFSET, y: p.y + t.x * OFFSET, t });
  }
  if (pts.length < 2) return;
  svgEl('polyline', { points: pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') }, parent);
  const tip = pts[pts.length - 1];
  const deg = Math.atan2(tip.t.y, tip.t.x) * 180 / Math.PI;
  svgEl('polygon', {
    class: 'arrowhead',
    points: '4,0 -3,-3.2 -3,3.2',
    transform: `translate(${tip.x.toFixed(1)} ${tip.y.toFixed(1)}) rotate(${deg.toFixed(1)})`,
  }, parent);
}

// Builds the letter inside `container` and returns what the tracing needs.
function buildLetter(container, letter) {
  const svg = svgEl('svg', { viewBox: '0 0 200 200', class: 'letter-svg', role: 'img', 'aria-label': letter.name });
  container.appendChild(svg);

  const layer = cls => svgEl('g', { class: cls }, svg);
  const outline = layer('outline');
  const channel = layer('channel');
  const dash = layer('dash');
  const arrows = layer('arrows');
  const marks = layer('marks');
  const paint = layer('paint');

  const strokes = letter.strokes.map((d, i) => {
    svgEl('path', { d }, outline);
    svgEl('path', { d }, channel);
    svgEl('path', { d }, dash);
    const path = svgEl('path', { d, visibility: 'hidden' }, paint);
    const len = path.getTotalLength();
    path.style.strokeDasharray = `0 ${len + 30}`;
    drawArrow(path, len, arrows);

    const start = path.getPointAtLength(0);
    const badge = svgEl('g', { class: 'badge', transform: `translate(${start.x} ${start.y})` }, marks);
    svgEl('circle', { r: 6.5 }, badge);
    svgEl('text', {}, badge).textContent = i + 1;

    return { path, len, progress: 0 };
  });

  const last = strokes[strokes.length - 1];
  const end = last.path.getPointAtLength(last.len);
  svgEl('circle', { class: 'end-dot', cx: end.x, cy: end.y, r: 6 }, marks);

  const head = svgEl('g', { class: 'head' }, svg);
  svgEl('polygon', { class: 'star', points: starPoints(11, 4.8) }, head);
  const first = strokes[0].path.getPointAtLength(0);
  head.setAttribute('transform', `translate(${first.x} ${first.y})`);

  return { svg, strokes, head };
}

// ---------- Tracing ----------

let trace = null;

function openLetter(idx) {
  const letter = LETTERS[idx];
  $('trace-title').textContent = `האות ${letter.ch}`;
  $('trace-back').href = '#letters';
  $('prev-btn').href = idx > 0 ? `#letter-${idx}` : '#letters';
  $('next-btn').href = idx < LETTERS.length - 1 ? `#letter-${idx + 2}` : '#letters';
  startTrace(letter, letterAudio(idx), { reopen: () => openLetter(idx), mark: () => markDone(idx) });
}

// Puts `letter` (from LETTERS or FINALS) on the board. `extra` joins the trace state:
// `reopen` starts the same letter again, `mark` records it as done, `onDone` replaces the usual ending.
function startTrace(letter, audio, extra) {
  const board = $('board');
  const banner = $('name-banner');

  board.querySelector('svg')?.remove();
  board.classList.remove('done');
  banner.hidden = true;
  banner.textContent = letter.name;
  $('next-btn').classList.remove('pulse');

  trace = { letter, audio, current: 0, drawing: false, finished: false, ...extra, ...buildLetter(board, letter) };
  preload(audio);
  preload('bravo');

  const mine = trace;
  const svg = mine.svg;
  svg.addEventListener('pointerdown', e => {
    e.preventDefault();
    svg.setPointerCapture?.(e.pointerId);
    mine.drawing = true;
    if (trace === mine) follow(e);
  });
  svg.addEventListener('pointermove', e => { if (mine.drawing && trace === mine) follow(e); });
  const stop = () => { mine.drawing = false; };
  svg.addEventListener('pointerup', stop);
  svg.addEventListener('pointercancel', stop);
}

function boardPoint(e) {
  const svg = trace.svg;
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

// Moves the paint along the current stroke to the point nearest the finger,
// but only forwards and only a short way, so the child has to follow the line.
function follow(e) {
  if (trace.finished) return;
  const stroke = trace.strokes[trace.current];
  const p = boardPoint(e);
  const distAt = len => {
    const q = stroke.path.getPointAtLength(len);
    return Math.hypot(q.x - p.x, q.y - p.y);
  };

  // Look a little ahead rather than one step, so a sharp corner can't trap the paint.
  let best = stroke.progress;
  let bestDist = distAt(best);
  const limit = Math.min(stroke.progress + LOOKAHEAD, stroke.len);
  for (let len = stroke.progress + STEP; len <= limit; len += STEP) {
    const d = distAt(len);
    if (d < bestDist) { best = len; bestDist = d; }
  }
  if (bestDist <= TOLERANCE) stroke.progress = best;
  if (stroke.len - stroke.progress <= END_SNAP) stroke.progress = stroke.len;

  if (stroke.progress > 0) {
    stroke.path.style.strokeDasharray = `${stroke.progress} ${stroke.len + 30}`;
    stroke.path.setAttribute('visibility', 'visible');
  }
  moveHead(stroke.path.getPointAtLength(stroke.progress));

  if (stroke.progress >= stroke.len) finishStroke();
}

function moveHead(pt) {
  trace.head.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
}

function finishStroke() {
  trace.current++;
  if (trace.current < trace.strokes.length) {
    ding();
    moveHead(trace.strokes[trace.current].path.getPointAtLength(0));
    return;
  }
  finishLetter();
}

function finishLetter() {
  const mine = trace;
  mine.finished = true;
  mine.head.setAttribute('visibility', 'hidden');
  mine.mark?.();

  $('board').classList.add('done');
  $('name-banner').hidden = false;
  $('next-btn').classList.add('pulse');
  play(mine.audio, mine.letter.name);
  if (mine.onDone) { mine.onDone(); return; }
  confetti();
  setTimeout(() => { if (trace === mine) play('bravo', 'כל הכבוד'); }, 1200);
}

// ---------- Symbol sets ----------

// Several letter games also run with numbers. They are given `items`, each
// { ch, name, audio, hint? }, instead of reaching for LETTERS themselves.
const numAudio = n => `numbers/${String(n).padStart(2, '0')}`;
const LETTER_ITEMS = LETTERS.map((l, i) => ({ ch: l.ch, name: l.name, audio: letterAudio(i), hint: WORDS[i][0][1] }));
const NUMBER_ITEMS = NUMBERS.map((name, n) => ({ ch: String(n), name, audio: numAudio(n) }));

// ---------- Completing the order ----------

const ORDER_ROUNDS = 5;   // rounds in one game
const ORDER_RUN = 4;      // consecutive symbols shown in a round
const ORDER_CHOICES = 4;  // symbols offered in the clouds

let order = null;

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

// cfg: { items, missing, title, back, ltr }. `missing` is how many of the run are hidden;
// `ltr` lays the run out left to right, as numbers are read.
function startOrder(cfg) {
  order = { cfg, round: 0, lastStart: -1, left: 0, locked: false };
  $('order-title').textContent = cfg.title;
  $('order-back').href = cfg.back;
  $('order-seq').dir = cfg.ltr ? 'ltr' : 'rtl';
  $('order-done').hidden = true;
  $('order-play').hidden = false;
  preload('bravo');
  nextOrderRound();
}

function renderDots(id, done, total) {
  $(id).innerHTML = Array.from({ length: total }, (_, i) =>
    `<i${i < done ? ' class="on"' : ''}></i>`).join('');
}

function nextOrderRound() {
  const o = order;
  const items = o.cfg.items;
  let start;
  do { start = Math.floor(Math.random() * (items.length - ORDER_RUN + 1)); } while (start === o.lastStart);
  o.lastStart = start;

  const run = Array.from({ length: ORDER_RUN }, (_, i) => start + i);
  const missing = shuffle([...run]).slice(0, o.cfg.missing);
  const others = shuffle(items.map((_, i) => i).filter(i => !run.includes(i)));
  const choices = shuffle([...missing, ...others.slice(0, ORDER_CHOICES - o.cfg.missing)]);
  o.left = missing.length;
  o.locked = false;
  renderDots('order-dots', o.round, ORDER_ROUNDS);

  $('order-seq').innerHTML = run.map(idx => missing.includes(idx)
    ? `<div class="ring slot" data-idx="${idx}">?</div>`
    : `<div class="ring">${items[idx].ch}</div>`).join('');
  $('order-options').innerHTML = choices.map(idx =>
    `<button class="cloud" type="button" data-idx="${idx}" aria-label="${items[idx].name}"><span>${items[idx].ch}</span></button>`).join('');

  choices.forEach(idx => preload(items[idx].audio));
  $('order-options').querySelectorAll('.cloud').forEach(makeDraggable);
}

// A cloud can be dragged onto a "?" or simply tapped.
function makeDraggable(el) {
  let startX = 0, startY = 0, moved = false, active = false;

  el.addEventListener('pointerdown', e => {
    if (!order || order.locked) return;
    active = true;
    moved = false;
    startX = e.clientX;
    startY = e.clientY;
    el.setPointerCapture?.(e.pointerId);
    el.classList.remove('shake');
    el.classList.add('dragging');
  });
  el.addEventListener('pointermove', e => {
    if (!active) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (Math.hypot(dx, dy) > 8) moved = true;
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.08)`;
  });
  const release = (e, dropped) => {
    if (!active) return;
    active = false;
    const slot = dropped && moved ? slotUnder(e.clientX, e.clientY) : null;
    el.classList.remove('dragging');
    el.style.transform = '';
    if (dropped) dropChoice(el, moved, slot);
  };
  el.addEventListener('pointerup', e => release(e, true));
  el.addEventListener('pointercancel', e => release(e, false));
}

// The "?" the finger is over, with a generous margin around it.
function slotUnder(x, y) {
  return [...document.querySelectorAll('#order-seq .slot')].find(slot => {
    const b = slot.getBoundingClientRect();
    const pad = b.width * 0.3;
    return x > b.left - pad && x < b.right + pad && y > b.top - pad && y < b.bottom + pad;
  }) || null;
}

function dropChoice(el, dragged, slot) {
  if (!order || order.locked) return;
  if (dragged && !slot) return;   // let go away from any "?": the cloud just floats back
  const idx = +el.dataset.idx;
  const item = order.cfg.items[idx];
  const home = document.querySelector(`#order-seq .slot[data-idx="${idx}"]`);

  if (!home || (dragged && slot !== home)) {
    boop();
    void el.offsetWidth;          // restart the shake if it is already running
    el.classList.add('shake');
    return;
  }

  home.textContent = item.ch;
  home.classList.replace('slot', 'filled');
  el.classList.add('used');
  play(item.audio, item.name);
  if (--order.left === 0) finishOrderRound();
}

function finishOrderRound() {
  const mine = order;
  mine.locked = true;
  mine.round++;
  cheerTick();
  renderDots('order-dots', mine.round, ORDER_ROUNDS);
  $('order-seq').classList.add('cheer');
  setTimeout(() => {
    $('order-seq').classList.remove('cheer');
    if (order !== mine) return;
    if (mine.round >= ORDER_ROUNDS) finishOrder();
    else nextOrderRound();
  }, 1600);
}

function finishOrder() {
  $('order-play').hidden = true;
  $('order-done').hidden = false;
  confetti();
  play('bravo', 'כל הכבוד');
}

// ---------- First letter ----------

const FIRST_ROUNDS = 5;

let first = null;

const wordAudio = (letter, word) => `words/${letterAudio(letter)}-${word + 1}`;
const pickOne = list => list[Math.floor(Math.random() * list.length)];

function soundsAlike(a, b) {
  return SOUND_ALIKE.some(group => group.includes(LETTERS[a].ch) && group.includes(LETTERS[b].ch));
}

// `level` is how many pictures there are to choose from.
function startFirst(level) {
  first = { level, round: 0, used: [], letter: -1, locked: false };
  $('first-done').hidden = true;
  $('first-play').hidden = false;
  preload('bravo');
  nextFirstRound();
}

function nextFirstRound() {
  const f = first;
  const all = LETTERS.map((_, i) => i);
  f.letter = pickOne(all.filter(i => !f.used.includes(i)));
  f.used.push(f.letter);
  f.locked = false;

  const others = shuffle(all.filter(i => i !== f.letter && !soundsAlike(i, f.letter))).slice(0, f.level - 1);
  const choices = shuffle([f.letter, ...others]).map(letter =>
    ({ letter, word: Math.floor(Math.random() * WORDS[letter].length) }));

  renderDots('first-dots', f.round, FIRST_ROUNDS);
  $('first-title').textContent = `מה מתחיל ב־${LETTERS[f.letter].ch}?`;
  $('first-letter').textContent = LETTERS[f.letter].ch;
  $('first-slot').textContent = '';
  $('first-slot').classList.remove('filled');
  $('first-choices').innerHTML = choices.map(c => {
    const [word, picture] = WORDS[c.letter][c.word];
    return `<button class="pic" type="button" data-letter="${c.letter}" data-word="${c.word}" aria-label="${word}">${picture}</button>`;
  }).join('');

  preload(letterAudio(f.letter));
  choices.forEach(c => preload(wordAudio(c.letter, c.word)));
  setTimeout(() => { if (first === f && !f.locked) sayFirstLetter(); }, 400);
}

function sayFirstLetter() {
  if (first) play(letterAudio(first.letter), LETTERS[first.letter].name);
}

function pickFirst(btn) {
  const f = first;
  if (!f || f.locked) return;
  const letter = +btn.dataset.letter, word = +btn.dataset.word;
  const [text, picture] = WORDS[letter][word];
  play(wordAudio(letter, word), text);   // hearing the word is the clue, right or wrong

  if (letter !== f.letter) {
    btn.classList.remove('shake');
    void btn.offsetWidth;
    btn.classList.add('shake');
    return;
  }

  f.locked = true;
  f.round++;
  btn.classList.add('used');
  $('first-slot').textContent = picture;
  $('first-slot').classList.add('filled');
  ding();
  renderDots('first-dots', f.round, FIRST_ROUNDS);
  setTimeout(() => {
    if (first !== f) return;
    if (f.round >= FIRST_ROUNDS) finishFirst();
    else nextFirstRound();
  }, 2000);
}

function finishFirst() {
  $('first-play').hidden = true;
  $('first-done').hidden = false;
  confetti();
  play('bravo', 'כל הכבוד');
}

// ---------- Names ----------

const NAMES_ROUNDS = 5;

let names = null;

// cfg: { items, level, title, back }. `level` is how many cards there are to choose from.
function startNames(cfg) {
  names = { cfg, round: 0, used: [], target: -1, locked: false };
  $('names-title').textContent = cfg.title;
  $('names-back').href = cfg.back;
  $('names-done').hidden = true;
  $('names-play').hidden = false;
  preload('bravo');
  nextNamesRound();
}

function nextNamesRound() {
  const n = names;
  const items = n.cfg.items;
  const all = items.map((_, i) => i);
  n.target = pickOne(all.filter(i => !n.used.includes(i)));
  n.used.push(n.target);
  n.locked = false;

  const others = shuffle(all.filter(i => i !== n.target)).slice(0, n.cfg.level - 1);
  const choices = shuffle([n.target, ...others]);

  renderDots('names-dots', n.round, NAMES_ROUNDS);
  $('names-cards').innerHTML = choices.map(i =>
    `<button class="namecard" type="button" data-item="${i}">${items[i].ch}` +
    `${items[i].hint ? `<span aria-hidden="true">${items[i].hint}</span>` : ''}</button>`).join('');

  choices.forEach(i => preload(items[i].audio));
  setTimeout(() => { if (names === n && !n.locked) sayName(); }, 400);
}

function sayName() {
  if (!names) return;
  const item = names.cfg.items[names.target];
  play(item.audio, item.name);
}

function pickName(btn) {
  const n = names;
  if (!n || n.locked || btn.classList.contains('off')) return;

  if (+btn.dataset.item !== n.target) {
    boop();
    btn.classList.add('shake', 'off');   // a wrong card is taken out of the round
    setTimeout(() => { if (names === n && !n.locked) sayName(); }, 700);
    return;
  }

  n.locked = true;
  n.round++;
  btn.classList.add('right');
  $('names-cards').querySelectorAll('.namecard:not(.right)').forEach(card => card.classList.add('off'));
  ding();
  setTimeout(() => { if (names === n) sayName(); }, 350);
  renderDots('names-dots', n.round, NAMES_ROUNDS);
  setTimeout(() => {
    if (names !== n) return;
    if (n.round >= NAMES_ROUNDS) finishNames();
    else nextNamesRound();
  }, 2000);
}

function finishNames() {
  $('names-play').hidden = true;
  $('names-done').hidden = false;
  confetti();
  play('bravo', 'כל הכבוד');
}

// ---------- Find it ----------

const FIND_ROUNDS = 5;
const FIND_TILES = 8;
// Letters that look alike; a couple of them are mixed in among the wrong tiles.
const LOOK_ALIKE = ['בכפ', 'דרך', 'החת', 'וז', 'גנ', 'סם', 'עצץ', 'טמ', 'יו', 'פף', 'כך', 'נן', 'מם'];
// Pairs too close to tell apart in the site's rounded font; never shown together.
const TOO_ALIKE = ['ון'];
const DIGITS_ALIKE = ['69', '17', '38', '25', '06'];

let find = null;

// cfg: { items, pool, alike, tooAlike, title, back }. `items` can be the one to find;
// `pool` is every symbol that may appear as a wrong tile.
function startFind(cfg) {
  find = { cfg, round: 0, used: [], target: -1, left: 0, total: 0, locked: false };
  $('find-title').textContent = cfg.title;
  $('find-back').href = cfg.back;
  $('find-tiles').dir = cfg.ltr ? 'ltr' : 'rtl';
  $('find-done').hidden = true;
  $('find-play').hidden = false;
  preload('bravo');
  nextFindRound();
}

function nextFindRound() {
  const f = find;
  const { items, pool, alike: groups, tooAlike } = f.cfg;
  f.target = pickOne(items.map((_, i) => i).filter(i => !f.used.includes(i)));
  f.used.push(f.target);
  f.total = f.left = pickOne([3, 4]);
  f.locked = false;

  const ch = items[f.target].ch;
  const alike = [...new Set(groups.filter(g => g.includes(ch)).join(''))].filter(c => c !== ch);
  const banned = tooAlike.filter(pair => pair.includes(ch)).join('');
  const rest = pool.filter(c => c !== ch && !alike.includes(c) && !banned.includes(c));
  const wrong = [...shuffle(alike).slice(0, 2), ...shuffle(rest)].slice(0, FIND_TILES - f.total);
  const tiles = shuffle([...Array(f.total).fill(ch), ...wrong]);

  renderDots('find-dots', f.round, FIND_ROUNDS);
  renderDots('find-marks', 0, f.total);
  $('find-letter').textContent = ch;
  $('find-tiles').classList.remove('cheer');
  $('find-tiles').innerHTML = tiles.map(c => `<button class="findtile" type="button">${c}</button>`).join('');

  preload(items[f.target].audio);
  setTimeout(() => { if (find === f && !f.locked) sayFindLetter(); }, 400);
}

function sayFindLetter() {
  if (!find) return;
  const item = find.cfg.items[find.target];
  play(item.audio, item.name);
}

function pickFind(btn) {
  const f = find;
  if (!f || f.locked || btn.classList.contains('found')) return;

  if (btn.textContent !== f.cfg.items[f.target].ch) {
    boop();
    btn.classList.remove('shake');
    void btn.offsetWidth;
    btn.classList.add('shake');
    return;
  }

  btn.classList.add('found');
  f.left--;
  ding();
  renderDots('find-marks', f.total - f.left, f.total);
  if (f.left > 0) return;

  f.locked = true;
  f.round++;
  renderDots('find-dots', f.round, FIND_ROUNDS);
  $('find-tiles').classList.add('cheer');
  setTimeout(() => { if (find === f) sayFindLetter(); }, 350);
  setTimeout(() => {
    if (find !== f) return;
    if (f.round >= FIND_ROUNDS) finishFind();
    else nextFindRound();
  }, 2000);
}

function finishFind() {
  $('find-play').hidden = true;
  $('find-done').hidden = false;
  confetti();
  play('bravo', 'כל הכבוד');
}

// ---------- Memory ----------

const MEMORY_COLS = { 6: 3, 8: 4, 12: 4 };   // cards in the game -> cards in a row

let memory = null;

function startMemory(cards) {
  const pairs = cards / 2;
  const letters = shuffle(LETTERS.map((_, i) => i)).slice(0, pairs);
  const deck = shuffle([...letters, ...letters]);
  memory = { cards, pairs, found: 0, open: [], locked: false };

  $('memory-done').hidden = true;
  $('memory-play').hidden = false;
  renderDots('memory-dots', 0, pairs);
  const grid = $('memory-grid');
  grid.style.setProperty('--cols', MEMORY_COLS[cards]);
  grid.style.setProperty('--rows', cards / MEMORY_COLS[cards]);
  grid.innerHTML = deck.map(i =>
    `<button class="memcard" type="button" data-letter="${i}" aria-label="קלף"><span class="memcard-inner">` +
    `<span class="memcard-back" aria-hidden="true">⭐</span><span class="memcard-front">${LETTERS[i].ch}</span></span></button>`).join('');

  letters.forEach(i => preload(letterAudio(i)));
  preload('bravo');
}

function flipCard(btn) {
  const m = memory;
  if (!m || m.locked || btn.classList.contains('open')) return;
  const letter = +btn.dataset.letter;
  btn.classList.add('open');
  play(letterAudio(letter), LETTERS[letter].name);
  m.open.push(btn);
  if (m.open.length < 2) return;

  const [a, b] = m.open;
  m.open = [];
  if (a.dataset.letter !== b.dataset.letter) {
    m.locked = true;          // give the child a moment to look, then turn both back
    setTimeout(() => {
      if (memory !== m) return;
      a.classList.remove('open');
      b.classList.remove('open');
      m.locked = false;
    }, 1200);
    return;
  }

  a.classList.add('matched');
  b.classList.add('matched');
  m.found++;
  renderDots('memory-dots', m.found, m.pairs);
  setTimeout(() => { if (memory === m) ding(); }, 450);
  if (m.found < m.pairs) return;

  m.locked = true;
  setTimeout(() => {
    if (memory !== m) return;
    $('memory-play').hidden = true;
    $('memory-done').hidden = false;
    confetti();
    play('bravo', 'כל הכבוד');
  }, 1500);
}

// ---------- Balloons ----------

const POP_ROUNDS = 5;
const POP_NEED = 3;        // right balloons to pop in a round
const POP_LANES = 5;       // columns the balloons rise in
const POP_SPEEDS = {       // level -> seconds to cross the sky, ms between balloons
  1: { rise: 11, every: 1400 },
  2: { rise: 7, every: 900 },
};

let pop = null;

function startPop(level) {
  if (pop) clearInterval(pop.timer);
  const p = pop = { level, round: 0, used: [], letter: -1, got: 0, locked: false, sinceRight: 0, lanes: [], timer: 0 };
  $('pop-done').hidden = true;
  $('pop-play').hidden = false;
  preload('bravo');
  p.timer = setInterval(() => {
    if (pop !== p) clearInterval(p.timer);   // the child left the game
    else spawnBalloon();
  }, POP_SPEEDS[level].every);
  nextPopRound();
}

function nextPopRound() {
  const p = pop;
  p.letter = pickOne(LETTERS.map((_, i) => i).filter(i => !p.used.includes(i)));
  p.used.push(p.letter);
  p.got = 0;
  p.sinceRight = 3;          // so the first balloon up is a right one
  p.locked = false;
  $('pop-sky').innerHTML = '';
  renderDots('pop-dots', p.round, POP_ROUNDS);
  renderDots('pop-marks', 0, POP_NEED);
  preload(letterAudio(p.letter));
  spawnBalloon();
  setTimeout(() => { if (pop === p && !p.locked) sayPopLetter(); }, 400);
}

function sayPopLetter() {
  if (pop) play(letterAudio(pop.letter), LETTERS[pop.letter].name);
}

function spawnBalloon() {
  const p = pop;
  if (!p || p.locked || document.hidden) return;
  const sky = $('pop-sky');

  // A right balloon about one time in three, and never more than three wrong ones in a row.
  const right = p.sinceRight >= 3 || Math.random() < 0.25;
  p.sinceRight = right ? 0 : p.sinceRight + 1;
  const letter = right ? p.letter : pickOne(LETTERS.map((_, i) => i).filter(i => i !== p.letter));

  // Keep clear of the lanes the last two balloons used, so they don't overlap.
  const lane = pickOne([...Array(POP_LANES).keys()].filter(l => !p.lanes.includes(l)));
  p.lanes = [lane, ...p.lanes].slice(0, 2);

  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'balloon';
  b.dataset.letter = letter;
  b.style.left = `${(lane + 0.5) * 100 / POP_LANES}%`;
  b.style.setProperty('--hue', Math.floor(Math.random() * 6));
  b.style.setProperty('--travel', `${sky.clientHeight}px`);
  b.style.animationDuration = `${POP_SPEEDS[p.level].rise}s`;
  b.innerHTML = `<span class="balloon-body">${LETTERS[letter].ch}</span>`;
  b.addEventListener('animationend', e => { if (e.target === b) b.remove(); });
  sky.appendChild(b);
}

function hitBalloon(b) {
  const p = pop;
  if (!p || p.locked || b.classList.contains('popped')) return;

  if (+b.dataset.letter !== p.letter) {
    boop();
    b.classList.remove('wobble');
    void b.offsetWidth;
    b.classList.add('wobble');
    setTimeout(() => { if (pop === p && !p.locked) sayPopLetter(); }, 700);
    return;
  }

  b.classList.add('popped');
  setTimeout(() => b.remove(), 250);
  popSound();
  cheerTick();
  p.got++;
  renderDots('pop-marks', p.got, POP_NEED);
  if (p.got < POP_NEED) return;

  p.locked = true;
  p.round++;
  renderDots('pop-dots', p.round, POP_ROUNDS);
  $('pop-sky').querySelectorAll('.balloon:not(.popped)').forEach(other => other.classList.add('away'));
  setTimeout(() => { if (pop === p) sayPopLetter(); }, 350);
  setTimeout(() => {
    if (pop !== p) return;
    if (p.round < POP_ROUNDS) { nextPopRound(); return; }
    clearInterval(p.timer);
    $('pop-sky').innerHTML = '';
    $('pop-play').hidden = true;
    $('pop-done').hidden = false;
    confetti();
    play('bravo', 'כל הכבוד');
  }, 2000);
}

// ---------- My name ----------

const NAMES_KEY = 'gan-names-v1';
const NAME_MAX = 12;

let myName = null;   // { text, pos } while a name is being traced

// What to trace for a character, or null if it is not a Hebrew letter.
function glyphFor(ch) {
  const i = LETTERS.findIndex(l => l.ch === ch);
  if (i >= 0) return { letter: LETTERS[i], audio: letterAudio(i) };
  const final = FINALS.find(f => f.ch === ch);
  return final ? { letter: final, audio: final.audio } : null;
}

const cleanName = text => [...text].filter(glyphFor).slice(0, NAME_MAX).join('');

function loadNames() {
  try { return (JSON.parse(localStorage.getItem(NAMES_KEY)) || []).map(cleanName).filter(Boolean); }
  catch { return []; }
}

function saveNames(names) {
  try { localStorage.setItem(NAMES_KEY, JSON.stringify(names)); } catch {}
}

function renderNames() {
  const names = loadNames();
  $('name-chips-hint').hidden = names.length === 0;
  $('name-chips').innerHTML = names.map(n =>
    `<span class="name-chip"><button class="name-chip-go" type="button" data-name="${n}">${n}</button>` +
    `<button class="name-chip-x" type="button" data-remove="${n}" aria-label="מחיקת השם ${n}">×</button></span>`).join('');
}

function startName(text) {
  const name = cleanName(text);
  if (!name) return false;
  saveNames([name, ...loadNames().filter(n => n !== name)].slice(0, 40));
  myName = { text: name, pos: 0 };
  location.hash = 'name-trace';
  return true;
}

function openNameLetter(pos) {
  const chars = [...myName.text];
  const glyph = glyphFor(chars[pos]);
  myName.pos = pos;
  renderNameTitle(pos);
  $('trace-back').href = '#name';
  $('prev-btn').href = $('next-btn').href = '#name-trace';   // stepping is handled by stepName()
  startTrace(glyph.letter, glyph.audio, {
    inName: true,
    reopen: () => openNameLetter(pos),
    onDone: () => nameLetterDone(pos),
  });
}

// The whole name in the title: letters already written, the current one, the rest.
function renderNameTitle(pos) {
  $('trace-title').innerHTML = [...myName.text].map((c, i) =>
    `<span class="${i < pos ? 'name-done' : i === pos ? 'name-now' : 'name-todo'}">${c}</span>`).join('');
}

function nameLetterDone(pos) {
  const mine = trace;
  const last = pos === [...myName.text].length - 1;
  if (!last) {
    setTimeout(() => { if (trace === mine) openNameLetter(pos + 1); }, 1800);
    return;
  }
  renderNameTitle(pos + 1);
  $('name-banner').textContent = myName.text;
  confetti();
  setTimeout(() => { if (trace === mine) play('bravo', 'כל הכבוד'); }, 1200);
}

function stepName(by) {
  const pos = myName.pos + by;
  if (pos < 0 || pos >= [...myName.text].length) location.hash = 'name';
  else openNameLetter(pos);
}

// ---------- Final letters ----------

let finals = null;

function startFinals() {
  finals = { queue: shuffle(FINALS.map((_, i) => i)), round: 0, target: -1, locked: false };
  $('final-done').hidden = true;
  $('final-play').hidden = false;
  preload('bravo');
  nextFinalsRound();
}

function nextFinalsRound() {
  const f = finals;
  f.target = f.queue[f.round];
  f.locked = false;
  const final = FINALS[f.target];

  renderDots('final-dots', f.round, FINALS.length);
  $('final-letter').textContent = LETTERS[final.base].ch;
  $('final-slot').textContent = '';
  $('final-slot').classList.remove('filled');
  $('final-choices').innerHTML = shuffle(FINALS.map((_, i) => i)).map(i =>
    `<button class="pic final-pic" type="button" data-final="${i}" aria-label="${FINALS[i].name}">${FINALS[i].ch}</button>`).join('');

  preload(letterAudio(final.base));
  preload(final.audio);
  setTimeout(() => { if (finals === f && !f.locked) sayFinalBase(); }, 400);
}

function sayFinalBase() {
  if (!finals) return;
  const base = FINALS[finals.target].base;
  play(letterAudio(base), LETTERS[base].name);
}

function pickFinal(btn) {
  const f = finals;
  if (!f || f.locked) return;

  if (+btn.dataset.final !== f.target) {
    boop();
    btn.classList.remove('shake');
    void btn.offsetWidth;
    btn.classList.add('shake');
    return;
  }

  const final = FINALS[f.target];
  f.locked = true;
  f.round++;
  btn.classList.add('used');
  $('final-slot').textContent = final.ch;
  $('final-slot').classList.add('filled');
  ding();
  setTimeout(() => { if (finals === f) play(final.audio, final.name); }, 350);
  renderDots('final-dots', f.round, FINALS.length);
  setTimeout(() => {
    if (finals !== f) return;
    if (f.round < FINALS.length) { nextFinalsRound(); return; }
    $('final-play').hidden = true;
    $('final-done').hidden = false;
    confetti();
    play('bravo', 'כל הכבוד');
  }, 2200);
}

// ---------- Writing numbers ----------

const DIGITS_KEY = 'gan-digits-v1';

function renderDigitGrid() {
  const done = loadDone(DIGITS_KEY);
  $('digit-grid').innerHTML = DIGITS.map((d, n) =>
    `<a class="tile${done.has(n) ? ' done' : ''}" href="#digit-${n}" aria-label="${d.name}">${d.ch}</a>`).join('');
}

function openDigit(n) {
  $('trace-title').textContent = `המספר ${n}`;
  $('trace-back').href = '#digits';
  $('prev-btn').href = n > 0 ? `#digit-${n - 1}` : '#digits';
  $('next-btn').href = n < DIGITS.length - 1 ? `#digit-${n + 1}` : '#digits';
  startTrace(DIGITS[n], numAudio(n), { reopen: () => openDigit(n), mark: () => markDone(n, DIGITS_KEY) });
}

// ---------- Number games: shared pieces ----------

const NUM_ROUNDS = 5;
const OBJECTS = ['🍎', '🎈', '⭐', '🐟', '🌸', '🚗', '🐶', '⚽', '🍓', '🦋'];

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

// Fills `box` with n pictures. As buttons they can be tapped to count them aloud.
function fillObjects(box, n, picture, tappable) {
  const tag = tappable ? 'button type="button"' : 'span';
  box.innerHTML = Array(n).fill(`<${tag} class="obj">${picture}</${tag.split(' ')[0]}>`).join('');
}

// Counts a tapped picture: it gets the next number, which is also spoken.
// `tally` is shared by every box of a round, so counting carries on from one box to the next.
function countObject(btn, tally) {
  if (!btn || btn.classList.contains('counted')) return;
  tally.n++;
  btn.classList.add('counted');
  btn.dataset.n = tally.n;
  play(numAudio(tally.n), NUMBERS[tally.n]);
}

// Three answers in rising order: the right one and two of its neighbours.
function nearChoices(n, min, max) {
  const near = shuffle([n - 2, n - 1, n + 1, n + 2].filter(v => v >= min && v <= max));
  return [n, ...near.slice(0, 2)].sort((a, b) => a - b);
}

function numberCards(id, values) {
  $(id).innerHTML = values.map(v => `<button class="namecard" type="button" data-value="${v}">${v}</button>`).join('');
}

// Marks the tapped answer card. Returns true when it was the right one.
function answerCard(btn, right, boxId) {
  if (+btn.dataset.value !== right) {
    boop();
    btn.classList.add('shake', 'off');
    return false;
  }
  btn.classList.add('right');
  $(boxId).querySelectorAll('.namecard:not(.right)').forEach(card => card.classList.add('off'));
  ding();
  return true;
}

function finishGame(prefix) {
  $(`${prefix}-play`).hidden = true;
  $(`${prefix}-done`).hidden = false;
  confetti();
  play('bravo', 'כל הכבוד');
}

// ---------- How many ----------

let count = null;

// `max` is the largest group, 5 or 10.
function startCount(max) {
  count = { max, round: 0, used: [], n: 0, tally: null, locked: false };
  $('count-done').hidden = true;
  $('count-play').hidden = false;
  preload('bravo');
  preload('q-count');
  nextCountRound();
}

function nextCountRound() {
  const c = count;
  if (c.used.length >= c.max) c.used = [];
  c.n = pickOne(range(1, c.max).filter(v => !c.used.includes(v)));
  c.used.push(c.n);
  c.tally = { n: 0 };
  c.locked = false;

  renderDots('count-dots', c.round, NUM_ROUNDS);
  fillObjects($('count-box'), c.n, pickOne(OBJECTS), true);
  numberCards('count-cards', nearChoices(c.n, 1, c.max));
  range(1, c.n).forEach(v => preload(numAudio(v)));
  setTimeout(() => { if (count === c && !c.locked) play('q-count', 'כמה יש?'); }, 400);
}

function pickCount(btn) {
  const c = count;
  if (!c || c.locked || btn.classList.contains('off')) return;
  if (!answerCard(btn, c.n, 'count-cards')) return;

  c.locked = true;
  c.round++;
  renderDots('count-dots', c.round, NUM_ROUNDS);
  setTimeout(() => { if (count === c) play(numAudio(c.n), NUMBERS[c.n]); }, 350);
  setTimeout(() => {
    if (count !== c) return;
    if (c.round >= NUM_ROUNDS) finishGame('count');
    else nextCountRound();
  }, 2000);
}

// ---------- Which is more ----------

let more = null;

function startMore(max) {
  more = { max, round: 0, locked: false };
  $('more-done').hidden = true;
  $('more-play').hidden = false;
  preload('bravo');
  preload('q-more');
  nextMoreRound();
}

function nextMoreRound() {
  const m = more;
  const a = pickOne(range(1, m.max));
  const b = pickOne(range(1, m.max).filter(v => v !== a));
  const picture = pickOne(OBJECTS);
  m.locked = false;

  renderDots('more-dots', m.round, NUM_ROUNDS);
  [['more-a', a], ['more-b', b]].forEach(([id, n]) => {
    const panel = $(id);
    panel.className = 'more-panel';
    panel.dataset.n = n;
    panel.setAttribute('aria-label', NUMBERS[n]);
    fillObjects(panel, n, picture, false);
  });
  preload(numAudio(Math.max(a, b)));
  setTimeout(() => { if (more === m && !m.locked) play('q-more', 'איפה יש יותר?'); }, 400);
}

function pickMore(panel) {
  const m = more;
  if (!m || m.locked) return;
  const n = +panel.dataset.n;
  const other = +$(panel.id === 'more-a' ? 'more-b' : 'more-a').dataset.n;

  if (n < other) {
    boop();
    panel.classList.remove('shake');
    void panel.offsetWidth;
    panel.classList.add('shake');
    return;
  }

  m.locked = true;
  m.round++;
  panel.classList.add('right');
  ding();
  renderDots('more-dots', m.round, NUM_ROUNDS);
  setTimeout(() => { if (more === m) play(numAudio(n), NUMBERS[n]); }, 350);
  setTimeout(() => {
    if (more !== m) return;
    if (m.round >= NUM_ROUNDS) finishGame('more');
    else nextMoreRound();
  }, 2000);
}

// ---------- Adding with pictures ----------

let add = null;

// `max` is the largest sum, 5 or 10.
function startAdd(max) {
  add = { max, round: 0, sum: 0, tally: null, locked: false };
  $('add-done').hidden = true;
  $('add-play').hidden = false;
  preload('bravo');
  preload('q-add');
  nextAddRound();
}

function nextAddRound() {
  const a = add;
  a.sum = pickOne(range(2, a.max).filter(v => v !== a.sum));
  const left = pickOne(range(1, a.sum - 1));
  const right = a.sum - left;
  const picture = pickOne(OBJECTS);
  a.tally = { n: 0 };
  a.locked = false;

  renderDots('add-dots', a.round, NUM_ROUNDS);
  fillObjects($('add-a'), left, picture, true);
  fillObjects($('add-b'), right, picture, true);
  $('add-a-num').textContent = left;
  $('add-b-num').textContent = right;
  $('add-slot').textContent = '?';
  $('add-slot').classList.remove('filled');
  numberCards('add-cards', nearChoices(a.sum, 1, a.max));
  range(1, a.sum).forEach(v => preload(numAudio(v)));
  setTimeout(() => { if (add === a && !a.locked) play('q-add', 'כמה יש ביחד?'); }, 400);
}

function pickAdd(btn) {
  const a = add;
  if (!a || a.locked || btn.classList.contains('off')) return;
  if (!answerCard(btn, a.sum, 'add-cards')) return;

  a.locked = true;
  a.round++;
  $('add-slot').textContent = a.sum;
  $('add-slot').classList.add('filled');
  renderDots('add-dots', a.round, NUM_ROUNDS);
  setTimeout(() => { if (add === a) play(numAudio(a.sum), NUMBERS[a.sum]); }, 350);
  setTimeout(() => {
    if (add !== a) return;
    if (a.round >= NUM_ROUNDS) finishGame('add');
    else nextAddRound();
  }, 2000);
}

// ---------- How many sounds ----------

// Words from WORDS sorted by how many sounds (צלילים) they have, as taught in kindergarten:
// every consonant with its vowel is one sound — כֶּ-לֶ-ב is 3, אֲ-נָ-נָ-ס is 4. A ו or י that
// is only a vowel and a silent final ה don't count (בָּ-לוֹ-ן is 3, בָּ-נָ-נָה is 3).
const BEATS = {
  2: 'אף דג דוב הר יד לב נר סוס סירה עץ עוגה פיל פרה פיצה צב קוף תות',
  3: 'אריה אוזן בלון בננה בית גזר גלידה גמל גיטרה דבורה דלת ורד וופל זברה זאב זחל חתול חזיר חציל טווס ירח ' +
     'כלב כדור כובע כוכב לימון לחם מטוס נחש נמלה נעל ספר פרח ציפור קשת קיפוד קובייה רובוט רדיו שמש שעון שועל תפוח תינוק',
  4: 'אבטיח אננס ברווז חילזון טלפון ינשוף מפתח מטרייה סוכרייה עכבר ענבים עיפרון פרפר רכבת שוקולד',
  5: 'היפופוטם טרקטור לווייתן צפרדע תרנגול',
};
const BEAT_WORDS = Object.entries(BEATS).flatMap(([beats, words]) => words.split(' ').map(text => {
  const letter = LETTERS.findIndex(l => l.ch === text[0]);
  return { beats: +beats, text, letter, word: WORDS[letter].findIndex(w => w[0] === text) };
}));
const BEATS_MIN = 2;
const BEATS_MAX = 5;

let beats = null;

function startBeats() {
  beats = { round: 0, used: [], item: null, locked: false };
  $('beats-done').hidden = true;
  $('beats-play').hidden = false;
  preload('bravo');
  nextBeatsRound();
}

function nextBeatsRound() {
  const b = beats;
  // A different number of sounds from last time, so the answer keeps changing.
  const count = pickOne(range(BEATS_MIN, BEATS_MAX).filter(n => n !== b.item?.beats));
  b.item = pickOne(BEAT_WORDS.filter(w => w.beats === count && !b.used.includes(w.text)));
  b.used.push(b.item.text);
  b.locked = false;

  renderDots('beats-dots', b.round, NUM_ROUNDS);
  $('beats-pic').textContent = WORDS[b.item.letter][b.item.word][1];
  $('beats-pic').setAttribute('aria-label', `להשמיע: ${b.item.text}`);
  $('beats-claps').innerHTML = '';
  $('beats-cards').innerHTML = range(BEATS_MIN, BEATS_MAX).map(n =>
    `<button class="namecard clap-card" type="button" data-value="${n}" aria-label="${NUMBERS[n]}">${n}` +
    `<span aria-hidden="true">${'●'.repeat(n)}</span></button>`).join('');

  preload(wordAudio(b.item.letter, b.item.word));
  setTimeout(() => { if (beats === b && !b.locked) sayBeatsWord(); }, 400);
}

function sayBeatsWord() {
  if (beats) play(wordAudio(beats.item.letter, beats.item.word), beats.item.text);
}

function pickBeats(btn) {
  const b = beats;
  if (!b || b.locked || btn.classList.contains('off')) return;
  if (!answerCard(btn, b.item.beats, 'beats-cards')) {
    setTimeout(() => { if (beats === b && !b.locked) sayBeatsWord(); }, 700);
    return;
  }

  // Count the word out: the word once more, then one dot and one tap sound per צליל.
  b.locked = true;
  b.round++;
  renderDots('beats-dots', b.round, NUM_ROUNDS);
  setTimeout(() => { if (beats === b) sayBeatsWord(); }, 350);
  for (let k = 0; k < b.item.beats; k++) {
    setTimeout(() => {
      if (beats !== b) return;
      $('beats-claps').insertAdjacentHTML('beforeend', '<i></i>');
      popSound();
    }, 1400 + k * 450);
  }
  setTimeout(() => {
    if (beats !== b) return;
    if (b.round >= NUM_ROUNDS) finishGame('beats');
    else nextBeatsRound();
  }, 2600 + b.item.beats * 450);
}

// ---------- Spell the picture ----------

// A picture is shown and its word spoken; its letters lie shuffled below a row of empty boxes.
// The child taps them in order (right to left) and each one jumps into the next box, saying
// its name. Level 1: words of 2-3 letters, level 2: 4-5 letters, all from WORDS.
let spell = null;

function startSpell(level) {
  const [min, max] = level === 1 ? [2, 3] : [4, 5];
  spell = {
    level, round: 0, used: [], word: null, pos: 0, locked: false,
    pool: WORDS.flatMap((ws, letter) => ws.map((w, word) => ({ text: w[0], pic: w[1], letter, word })))
      .filter(w => w.text.length >= min && w.text.length <= max),
  };
  $('spell-done').hidden = true;
  $('spell-play').hidden = false;
  preload('bravo');
  nextSpellRound();
}

function nextSpellRound() {
  const s = spell;
  s.word = pickOne(s.pool.filter(w => !s.used.includes(w.text)));
  s.used.push(s.word.text);
  s.pos = 0;
  s.locked = false;
  const chars = [...s.word.text];

  renderDots('spell-dots', s.round, NUM_ROUNDS);
  $('spell-pic').textContent = s.word.pic;
  $('spell-pic').setAttribute('aria-label', `להשמיע: ${s.word.text}`);
  $('spell-slots').innerHTML = chars.map(() => '<i></i>').join('');
  // Shuffle until the letters are out of order, so the word isn't already spelled.
  let order;
  do { order = shuffle(chars.map((_, k) => k)); } while (chars.length > 1 && order.every((k, i) => chars[k] === chars[i]));
  $('spell-tiles').innerHTML = order.map(k =>
    `<button class="namecard spell-tile" type="button">${chars[k]}</button>`).join('');

  preload(wordAudio(s.word.letter, s.word.word));
  chars.forEach(c => { const g = glyphFor(c); if (g) preload(g.audio); });
  setTimeout(() => { if (spell === s && !s.locked) saySpellWord(); }, 400);
}

function saySpellWord() {
  if (spell) play(wordAudio(spell.word.letter, spell.word.word), spell.word.text);
}

function pickSpell(btn) {
  const s = spell;
  if (!s || s.locked || btn.classList.contains('used')) return;
  const chars = [...s.word.text];

  if (btn.textContent !== chars[s.pos]) {
    boop();
    restartAnimation(btn, 'shake');
    return;
  }

  btn.classList.add('used');
  const slot = $('spell-slots').children[s.pos];
  slot.textContent = chars[s.pos];
  slot.classList.add('filled');
  const g = glyphFor(chars[s.pos]);
  if (g) play(g.audio, g.letter.name);
  s.pos++;
  if (s.pos < chars.length) return;

  // The whole word: cheer, then say it.
  s.locked = true;
  s.round++;
  renderDots('spell-dots', s.round, NUM_ROUNDS);
  $('spell-slots').classList.add('cheer');
  setTimeout(() => { if (spell === s) { ding(); saySpellWord(); } }, 700);
  setTimeout(() => {
    $('spell-slots').classList.remove('cheer');
    if (spell !== s) return;
    if (s.round >= NUM_ROUNDS) finishGame('spell');
    else nextSpellRound();
  }, 2600);
}

// ---------- Find the hidden letters ----------

// A black-and-white colouring-page scene (a park or a beach) with letters scattered through it.
// One letter is hidden several times; the boxes above the picture show how many. Each one the
// child finds turns colour and says its name; when all are found the whole scene is coloured in.
// Tapping a different letter is a mistake: it shakes, with a boop().

// Line drawings on a 100 x 100 box, standing on y = 100. Shapes with class "s" are filled with
// their --fill colour when the scene is coloured in.
const ART = {
  tree: '<path class="s" style="--fill:#cdeccf" d="M50,8 C80,8 94,32 82,50 C96,64 80,84 60,76 C54,88 40,88 36,76 C18,84 4,62 18,50 C6,32 22,8 50,8 Z"/><path class="s" style="--fill:#e0b98a" d="M44,78 L41,100 H59 L56,78"/>',
  house: '<path class="s" style="--fill:#ffd6c9" d="M20,48 V100 H80 V48"/><path class="s" style="--fill:#f4978e" d="M10,50 L50,14 L90,50 Z"/><path class="s" style="--fill:#fff3b0" d="M42,100 V74 H58 V100"/><rect class="s" style="--fill:#cfe8ff" x="26" y="58" width="12" height="12"/><rect class="s" style="--fill:#cfe8ff" x="62" y="58" width="12" height="12"/><path class="s" style="--fill:#f4978e" d="M66,30 V16 H76 V39"/>',
  sun: '<circle class="s" style="--fill:#ffe066" cx="50" cy="50" r="18"/><path d="M50,22 V8 M50,78 V92 M22,50 H8 M78,50 H92 M30,30 L20,20 M70,70 L80,80 M30,70 L20,80 M70,30 L80,20"/>',
  cloud: '<path class="s" style="--fill:#f1f8ff" d="M22,72 a15,15 0 0,1 4,-29 a19,19 0 0,1 36,-6 a16,16 0 0,1 18,35 Z"/>',
  bird: '<path d="M28,50 q11,-12 22,0 q11,-12 22,0"/>',
  flower: '<circle class="s" style="--fill:#ffc8dd" cx="50" cy="28" r="10"/><circle class="s" style="--fill:#ffc8dd" cx="36" cy="40" r="10"/><circle class="s" style="--fill:#ffc8dd" cx="64" cy="40" r="10"/><circle class="s" style="--fill:#ffc8dd" cx="42" cy="56" r="10"/><circle class="s" style="--fill:#ffc8dd" cx="58" cy="56" r="10"/><circle class="s" style="--fill:#ffe066" cx="50" cy="44" r="8"/><path d="M50,66 V100 M50,86 q-12,-4 -16,-14"/>',
  mushroom: '<path class="s" style="--fill:#ff8fa3" d="M14,62 Q50,14 86,62 Z"/><path class="s" style="--fill:#fff1e6" d="M38,62 V100 H62 V62"/><circle cx="36" cy="46" r="4"/><circle cx="60" cy="38" r="5"/>',
  butterfly: '<path class="s" style="--fill:#e2c6ff" d="M50,42 C30,14 10,32 22,48 C10,62 30,78 50,58 C70,78 90,62 78,48 C90,32 70,14 50,42 Z"/><path d="M50,32 V76 M44,24 l6,8 l6,-8"/>',
  cat: '<circle class="s" style="--fill:#ffe5a0" cx="50" cy="60" r="28"/><path class="s" style="--fill:#ffe5a0" d="M28,44 L24,20 L44,34 Z M72,44 L76,20 L56,34 Z"/><circle cx="40" cy="56" r="3"/><circle cx="60" cy="56" r="3"/><path d="M44,68 q6,6 12,0 M22,64 H6 M24,70 L8,76 M78,64 H94 M76,70 L92,76"/>',
  ball: '<circle class="s" style="--fill:#a0c4ff" cx="50" cy="70" r="28"/><path d="M22,70 q28,-18 56,0 M50,42 q-14,28 0,56"/>',
  fish: '<path class="s" style="--fill:#ffd6a5" d="M16,50 Q42,24 70,50 Q42,76 16,50 Z"/><path class="s" style="--fill:#ffd6a5" d="M70,50 L88,36 V64 Z"/><circle cx="30" cy="46" r="3"/>',
  grass: '<path d="M30,100 L35,82 L40,100 L46,76 L52,100 L58,84 L63,100 L68,88 L72,100"/>',
  boat: '<path class="s" style="--fill:#ffb4a2" d="M14,72 H86 L74,90 H26 Z"/><path class="s" style="--fill:#ffffff" d="M50,12 V68 H24 Z"/><path class="s" style="--fill:#ffe066" d="M54,22 V68 H76 Z"/>',
  umbrella: '<path class="s" style="--fill:#ff8fa3" d="M10,44 Q50,4 90,44 Q80,36 70,44 Q60,36 50,44 Q40,36 30,44 Q20,36 10,44 Z"/><path d="M50,44 V100"/>',
  bucket: '<path class="s" style="--fill:#a0c4ff" d="M28,52 H72 L66,100 H34 Z"/><path d="M28,52 Q50,24 72,52"/>',
  starfish: '<path class="s" style="--fill:#ffb347" d="M50,40 L58,62 L82,62 L62,76 L70,98 L50,84 L30,98 L38,76 L18,62 L42,62 Z"/>',
  shell: '<path class="s" style="--fill:#ffd6e0" d="M50,98 C18,98 14,58 50,48 C86,58 82,98 50,98 Z"/><path d="M50,98 L38,54 M50,98 L50,48 M50,98 L62,54"/>',
  crab: '<ellipse class="s" style="--fill:#ff8c69" cx="50" cy="76" rx="24" ry="16"/><path d="M28,80 L14,90 M28,74 L12,76 M72,80 L86,90 M72,74 L88,76 M38,64 L30,48 M62,64 L70,48"/><circle class="s" style="--fill:#ff8c69" cx="28" cy="44" r="7"/><circle class="s" style="--fill:#ff8c69" cx="72" cy="44" r="7"/><circle cx="44" cy="70" r="2"/><circle cx="56" cy="70" r="2"/>',
  palm: '<path class="s" style="--fill:#e0b98a" d="M46,100 Q44,60 52,30 L58,30 Q52,60 56,100 Z"/><path class="s" style="--fill:#b9fbc0" d="M55,30 Q30,8 8,26 Q32,18 55,30 Z M55,30 Q80,6 98,24 Q76,18 55,30 Z M55,30 Q38,34 24,58 Q44,40 55,30 Z M55,30 Q72,38 84,60 Q66,40 55,30 Z"/>',
};

const SCENE_W = 900, SCENE_H = 560;
const HIDDEN_LEVELS = {
  1: { targets: 3, decoys: 5, size: 66 },
  2: { targets: 5, decoys: 12, size: 52 },
};

const rand = (a, b) => a + Math.random() * (b - a);

// Places a drawing so that its bottom centre stands at (x, y).
function art(name, x, y, scale, turn = 0) {
  return `<g transform="translate(${(x - 50 * scale).toFixed(0)} ${(y - 100 * scale).toFixed(0)}) rotate(${turn} ${50 * scale} ${100 * scale}) scale(${scale.toFixed(2)})">${ART[name]}</g>`;
}

// A wavy line from x0 to x1 at height y.
function wave(x0, x1, y, step = 30, h = 8) {
  let d = `M${x0},${y}`;
  for (let x = x0; x < x1; x += step) d += ` q${step / 2},${-h} ${step},0`;
  return `<path d="${d}"/>`;
}

// The park: sky, hills, trees and a house, a pond with fish, flowers and grass.
function parkScene() {
  const p = [];
  const pondX = rand(220, 680), pondY = rand(440, 480);
  const inPond = (x, y) => ((x - pondX) / 150) ** 2 + ((y - pondY) / 70) ** 2 < 1;
  p.push('<rect class="s" style="--fill:#e3f5ff" width="900" height="560"/>');
  p.push('<path class="s" style="--fill:#e2f4d6" d="M0,250 Q150,190 300,240 T600,230 T900,245 V560 H0 Z"/>');
  const sunLeft = Math.random() < 0.5;
  p.push(art('sun', sunLeft ? 90 : 810, 150, 1.3));
  for (let k = 0; k < 3; k++) p.push(art('cloud', rand(200, 700) + (k - 1) * 120, rand(90, 140), rand(0.9, 1.3)));
  for (let k = 0; k < 4; k++) p.push(art('bird', rand(180, 720), rand(70, 190), rand(0.5, 0.8)));
  shuffle([120, 300, 640, 790]).slice(0, 3).forEach(x => p.push(art('tree', x + rand(-30, 30), rand(250, 270), rand(1.6, 2))));
  p.push(art('house', rand(400, 520), 262, 1.5));
  p.push(`<ellipse class="s" style="--fill:#bde0fe" cx="${pondX.toFixed(0)}" cy="${pondY.toFixed(0)}" rx="150" ry="70"/>`);
  p.push(wave(pondX - 90, pondX + 60, pondY - 18, 24, 6), wave(pondX - 40, pondX + 90, pondY + 26, 24, 6));
  p.push(art('fish', pondX - 60, pondY + 20, 0.55), art('fish', pondX + 50, pondY + 5, 0.5, 10));
  const spot = () => { let x, y; do { x = rand(30, 870); y = rand(300, 550); } while (inPond(x, y)); return [x, y]; };
  ['flower', 'flower', 'flower', 'flower', 'mushroom', 'mushroom', 'cat', 'ball', 'butterfly', 'butterfly'].forEach(name => {
    const [x, y] = spot();
    p.push(art(name, x, y, name === 'cat' ? 1.1 : rand(0.6, 0.85), name === 'butterfly' ? Math.round(rand(-20, 20)) : 0));
  });
  for (let k = 0; k < 34; k++) { const [x, y] = spot(); p.push(art('grass', x, y, rand(0.35, 0.6))); }
  return p.join('');
}

// The beach: sky, the sea with boats and fish, the sand with an umbrella, a bucket and shells.
function beachScene() {
  const p = [];
  p.push('<rect class="s" style="--fill:#e3f5ff" width="900" height="560"/>');
  let sea = 'M0,215';
  for (let x = 0; x < 900; x += 50) sea += ' q25,-12 50,0';
  p.push(`<path class="s" style="--fill:#bde0fe" d="${sea} V420 H0 Z"/>`);
  p.push('<path class="s" style="--fill:#ffe8b0" d="M0,410 Q220,385 450,405 T900,400 V560 H0 Z"/>');
  const sunLeft = Math.random() < 0.5;
  p.push(art('sun', sunLeft ? 90 : 810, 150, 1.2));
  for (let k = 0; k < 3; k++) p.push(art('cloud', rand(200, 700) + (k - 1) * 120, rand(80, 130), rand(0.8, 1.2)));
  for (let k = 0; k < 4; k++) p.push(art('bird', rand(180, 720), rand(60, 170), rand(0.5, 0.8)));
  p.push(art('boat', rand(150, 380), 235, 1.2), art('boat', rand(520, 760), 228, 0.9));
  for (let k = 0; k < 7; k++) { const x = rand(20, 760); p.push(wave(x, x + rand(80, 160), rand(260, 395), 22, 5)); }   // little waves
  for (let k = 0; k < 5; k++) p.push(art('fish', rand(60, 840), rand(300, 400), rand(0.45, 0.65), Math.round(rand(-15, 15))));
  p.push(art('palm', Math.random() < 0.5 ? 60 : 840, 470, 2.1));
  ['umbrella', 'bucket', 'starfish', 'starfish', 'shell', 'shell', 'crab', 'ball'].forEach(name =>
    p.push(art(name, rand(120, 780), rand(450, 550), name === 'umbrella' ? 1.5 : rand(0.55, 0.8), Math.round(rand(-10, 10)))));
  for (let k = 0; k < 40; k++) p.push(`<circle cx="${rand(0, 900).toFixed(0)}" cy="${rand(420, 556).toFixed(0)}" r="1.6"/>`);
  return p.join('');
}

let hidden = null;

function startHidden(level) {
  hidden = { level, round: 0, used: [], letter: -1, found: 0, total: 0, locked: false, hint: 0, lastScene: -1 };
  $('hidden-done').hidden = true;
  $('hidden-play').hidden = false;
  preload('bravo');
  nextHiddenRound();
}

function nextHiddenRound() {
  const h = hidden;
  const cfg = HIDDEN_LEVELS[h.level];
  const all = LETTERS.map((_, i) => i);
  h.letter = pickOne(all.filter(i => !h.used.includes(i)));
  h.used.push(h.letter);
  h.found = 0;
  h.total = cfg.targets;
  h.locked = false;
  h.lastScene = h.lastScene === 0 ? 1 : 0;
  const ch = LETTERS[h.letter].ch;

  // Other letters to confuse: never ones too close to the target in this font.
  const banned = TOO_ALIKE.filter(pair => pair.includes(ch)).join('');
  const others = all.filter(i => i !== h.letter && !banned.includes(LETTERS[i].ch));
  const letters = [...Array(cfg.targets).fill(h.letter), ...Array.from({ length: cfg.decoys }, () => pickOne(others))];

  // Spread the letters out: each keeps a letter's width away from the others.
  const spots = [];
  letters.forEach(() => {
    let x, y, tries = 0;
    do { x = rand(50, SCENE_W - 50); y = rand(50, SCENE_H - 45); tries++; }
    while (tries < 200 && spots.some(([a, b]) => Math.hypot(a - x, b - y) < cfg.size * 1.5));
    spots.push([x, y]);
  });
  const marks = letters.map((i, k) => {
    const [x, y] = spots[k];
    const size = cfg.size * rand(0.8, 1.15);
    return `<g class="hidden-letter ${i === h.letter ? 'target' : 'decoy'}" transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${Math.round(rand(-30, 30))})">` +
      `<circle class="hidden-hit" r="${(size * 0.62).toFixed(0)}"/>` +
      `<text font-size="${size.toFixed(0)}" text-anchor="middle" dominant-baseline="central">${LETTERS[i].ch}</text></g>`;
  });

  renderDots('hidden-dots', h.round, NUM_ROUNDS);
  $('hidden-target').textContent = ch;
  $('hidden-boxes').innerHTML = Array(cfg.targets).fill('<i></i>').join('');
  $('hidden-scene').innerHTML =
    `<svg viewBox="0 0 ${SCENE_W} ${SCENE_H}" class="hidden-svg" role="img" aria-label="תמונה שמסתתרות בה אותיות">` +
    `<g class="hidden-drawing">${h.lastScene === 0 ? parkScene() : beachScene()}</g>${marks.join('')}</svg>`;
  preload(letterAudio(h.letter));
  armHiddenHint();
}

// If the child is stuck for a while, one of the letters still hidden starts to glow.
function armHiddenHint() {
  const h = hidden;
  clearTimeout(h.hint);
  h.hint = setTimeout(() => {
    if (hidden === h && !h.locked) document.querySelector('#hidden-scene .target:not(.found)')?.classList.add('hint');
  }, 25000);
}

function pickHidden(g) {
  const h = hidden;
  if (!h || h.locked || !g || g.classList.contains('found')) return;

  if (!g.classList.contains('target')) {
    boop();
    restartAnimation(g.querySelector('text'), 'shake');
    return;
  }

  // One more found: colour it, tick a box, say the letter.
  g.classList.remove('hint');
  g.classList.add('found');
  const box = $('hidden-boxes').children[h.found];
  box.textContent = LETTERS[h.letter].ch;
  box.classList.add('on');
  h.found++;
  ding();
  play(letterAudio(h.letter), LETTERS[h.letter].name);
  armHiddenHint();
  if (h.found < h.total) return;

  // All found: the whole picture is coloured in.
  h.locked = true;
  h.round++;
  clearTimeout(h.hint);
  $('hidden-scene').querySelector('svg').classList.add('colored');
  renderDots('hidden-dots', h.round, NUM_ROUNDS);
  setTimeout(() => {
    if (hidden !== h) return;
    if (h.round >= NUM_ROUNDS) finishGame('hidden');
    else nextHiddenRound();
  }, 3000);
}

// ---------- Rhymes ----------

// A picture is shown and its word spoken; the child picks, from three more pictures, the one
// whose word rhymes with it. The children can't read, so every answer is a picture: each card
// says its word from its own 🔊, and tapping the card chooses it.
// RHYME_GROUPS are rhyme families, every member a picture [emoji, word]. The sound of the
// n-th picture overall (counting through the families in order) is audio/rhymes/<nn>.m4a.
const RHYME_GROUPS = [
  [['🎈', 'בלון'], ['🍋', 'לימון'], ['⏰', 'שעון'], ['☎️', 'טלפון'], ['🏰', 'ארמון'], ['🧼', 'סבון'], ['🥒', 'מלפפון'], ['✏️', 'עיפרון']],
  [['🚲', 'אופניים'], ['✂️', 'מספריים'], ['🧦', 'גרביים'], ['👓', 'משקפיים'], ['👀', 'עיניים'], ['👖', 'מכנסיים']],
  [['🌙', 'ירח'], ['🌸', 'פרח'], ['🍎', 'תפוח'], ['🔑', 'מפתח'], ['🍉', 'אבטיח'], ['🧊', 'קרח']],
  [['🥚', 'ביצה'], ['🍕', 'פיצה']],
  [['🐜', 'נמלה'], ['👗', 'שמלה']],
  [['🐔', 'תרנגולת'], ['🚪', 'דלת']],
  [['📕', 'ספר'], ['🐆', 'נמר'], ['🕯️', 'נר']],
  [['🐢', 'צב'], ['🐰', 'ארנב'], ['⭐', 'כוכב']],
  [['🐵', 'קוף'], ['🥁', 'תוף']],
  [['🐶', 'כלב'], ['❤️', 'לב']],
  [['🦵', 'רגל'], ['🚩', 'דגל']],
  [['☀️', 'שמש'], ['5️⃣', 'חמש']],
  [['👃', 'אף'], ['🥄', 'כף']],
  [['🐴', 'סוס'], ['🚌', 'אוטובוס']],
  [['🧀', 'גבינה'], ['🚢', 'ספינה']],
];
const RHYME_ITEMS = RHYME_GROUPS.flatMap((members, group) => members.map(([pic, word]) => ({ pic, word, group })));
RHYME_ITEMS.forEach((item, n) => { item.audio = `rhymes/${String(n + 1).padStart(2, '0')}`; });

let rhyme = null;

function startRhyme() {
  rhyme = { round: 0, used: [], item: null, answer: null, locked: false };
  $('rhyme-done').hidden = true;
  $('rhyme-play').hidden = false;
  preload('bravo');
  nextRhymeRound();
}

function nextRhymeRound() {
  const r = rhyme;
  // A picture from a family not used yet in this game, and another member of its family.
  r.item = pickOne(RHYME_ITEMS.filter(it => !r.used.includes(it.group)));
  r.used.push(r.item.group);
  r.answer = pickOne(RHYME_ITEMS.filter(it => it.group === r.item.group && it !== r.item));
  r.locked = false;

  // Two wrong pictures, each from a different other family, so nothing else rhymes.
  const others = shuffle(RHYME_GROUPS.map((_, g) => g).filter(g => g !== r.item.group)).slice(0, 2);
  const choices = shuffle([r.answer, ...others.map(g => pickOne(RHYME_ITEMS.filter(it => it.group === g)))]);

  renderDots('rhyme-dots', r.round, NUM_ROUNDS);
  $('rhyme-pic').textContent = r.item.pic;
  $('rhyme-pic').setAttribute('aria-label', `להשמיע: ${r.item.word}`);
  $('rhyme-cards').innerHTML = choices.map(it => {
    const n = RHYME_ITEMS.indexOf(it);
    return `<div class="rhyme-card" data-n="${n}">` +
      `<button class="rhyme-pick" type="button" data-n="${n}" aria-label="${it.word}">${it.pic}</button>` +
      `<button class="rhyme-say" type="button" data-say="${n}" aria-label="להשמיע: ${it.word}">🔊</button></div>`;
  }).join('');

  [r.item, ...choices].forEach(it => preload(it.audio));
  setTimeout(() => { if (rhyme === r && !r.locked) sayRhymeWord(); }, 400);
}

function sayRhymeWord() {
  if (rhyme) play(rhyme.item.audio, rhyme.item.word);
}

function sayRhymeItem(n) {
  const it = RHYME_ITEMS[n];
  play(it.audio, it.word);
}

function pickRhyme(btn) {
  const r = rhyme;
  const card = btn.closest('.rhyme-card');
  if (!r || r.locked || card.classList.contains('off')) return;

  if (RHYME_ITEMS[+btn.dataset.n] !== r.answer) {
    boop();
    restartAnimation(card, 'shake');
    card.classList.add('off');
    setTimeout(() => { if (rhyme === r && !r.locked) sayRhymeWord(); }, 700);
    return;
  }

  // Right: say the pair, the picture's word and then its rhyme.
  r.locked = true;
  r.round++;
  card.classList.add('right');
  $('rhyme-cards').querySelectorAll('.rhyme-card:not(.right)').forEach(c => c.classList.add('off'));
  ding();
  renderDots('rhyme-dots', r.round, NUM_ROUNDS);
  setTimeout(() => { if (rhyme === r) sayRhymeWord(); }, 400);
  setTimeout(() => { if (rhyme === r) play(r.answer.audio, r.answer.word); }, 1300);
  setTimeout(() => {
    if (rhyme !== r) return;
    if (r.round >= NUM_ROUNDS) finishGame('rhyme');
    else nextRhymeRound();
  }, 2900);
}

// ---------- Letter road ----------

// The car drives through the letters in alphabet order (no final letters). At each stop three
// letter bubbles wait in the three lanes; the child taps the next letter. Right: the car drives
// into it, it bursts and its name is spoken. Wrong: the car bumps it and backs up to try again.
// The car stays put on screen: the road, the trees and the bubbles move under it.

const ROAD_LANES = 3;

let road = null;

function startRoad() {
  road = { next: 0, lane: 1, locked: true };
  $('road-done').hidden = true;
  $('road-play').hidden = false;
  $('road-car').style.setProperty('--lane', 1);
  preload('bravo');
  renderRoadMap();
  placeGates(true);
}

// The whole alphabet along the top, so the child sees where the car is on its trip.
function renderRoadMap() {
  $('road-map').innerHTML = LETTERS.map((l, i) =>
    `<i class="${i < road.next ? 'done' : i === road.next ? 'now' : ''}">${l.ch}</i>`).join('');
}

// Three bubbles: the next letter and two of its neighbours in the alphabet, which makes the
// choice about order. They drive in from the far side of the road.
function placeGates(first) {
  const r = road;
  const n = r.next;
  const near = shuffle(range(Math.max(0, n - 3), Math.min(LETTERS.length - 1, n + 3)).filter(i => i !== n)).slice(0, ROAD_LANES - 1);
  const letters = shuffle([n, ...near]);
  const world = $('road-world');

  world.style.transition = 'none';
  world.style.transform = first ? 'translateX(0)' : 'translateX(-70%)';
  world.innerHTML = letters.map((i, lane) =>
    `<button class="gate" type="button" data-letter="${i}" style="--lane: ${lane}; --hue: ${(n + lane) % 6}" aria-label="${LETTERS[i].name}">${LETTERS[i].ch}</button>`).join('');
  preload(letterAudio(n));

  if (first) { r.locked = false; return; }
  void world.offsetWidth;
  drive(world, 'translateX(0)', 900, 'ease-out');
  setTimeout(() => { if (road === r) r.locked = false; }, 900);
}

// Moves the bubbles (and with them the road) under the car for `ms`; reversed when backing up.
function drive(world, transform, ms, easing, reverse) {
  const scene = $('road-scene');
  world.style.transition = `transform ${ms}ms ${easing}`;
  world.style.transform = transform;
  scene.classList.add('driving');
  scene.classList.toggle('reversing', !!reverse);
  engine(ms, reverse);
  clearTimeout(drive.stop);
  drive.stop = setTimeout(() => scene.classList.remove('driving', 'reversing'), ms);
}

function pickGate(gate) {
  const r = road;
  if (!r || r.locked || gate.classList.contains('off')) return;
  r.locked = true;

  // Change lane first, then drive up to the bubble's edge.
  const lane = +gate.style.getPropertyValue('--lane');
  const car = $('road-car');
  const world = $('road-world');
  const laneDelay = lane === r.lane ? 0 : 400;
  r.lane = lane;
  car.style.setProperty('--lane', lane);

  setTimeout(() => {
    if (road !== r) return;
    const gap = car.getBoundingClientRect().left - gate.getBoundingClientRect().right + 4;
    const right = +gate.dataset.letter === r.next;
    drive(world, `translateX(${gap}px)`, 1000, 'ease-in');

    setTimeout(() => {
      if (road !== r) return;
      if (!right) {
        // Bump, then back up a little for another try; that bubble is out of the race.
        boop();
        car.classList.add('bump');
        gate.classList.add('off');
        setTimeout(() => {
          car.classList.remove('bump');
          if (road !== r) return;
          drive(world, 'translateX(0)', 900, 'ease-out', true);
          setTimeout(() => { if (road === r) r.locked = false; }, 900);
        }, 450);
        return;
      }

      gate.classList.add('popped');
      ding();
      play(letterAudio(r.next), LETTERS[r.next].name);
      r.next++;
      renderRoadMap();
      if (r.next >= LETTERS.length) { setTimeout(() => { if (road === r) finishGame('road'); }, 1600); return; }
      // Drive on past the stop; the next bubbles arrive.
      setTimeout(() => {
        if (road !== r) return;
        world.querySelectorAll('.gate:not(.popped)').forEach(g => g.classList.add('gone'));
        drive(world, `translateX(calc(${gap}px + 40%))`, 700, 'linear');
        setTimeout(() => { if (road === r) placeGates(false); }, 700);
      }, 900);
    }, 1000);
  }, laneDelay);
}

// A soft engine hum while the car moves; lower when backing up.
function engine(ms, reverse) {
  const ctx = getAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  const now = ctx.currentTime, end = now + ms / 1000;
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(reverse ? 95 : 70, now);
  osc.frequency.linearRampToValueAtTime(reverse ? 65 : 115, end);
  filter.type = 'lowpass';
  filter.frequency.value = 420;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.07, now + 0.12);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(end);
}

// ---------- Games: shared pieces ----------

const GAME_ROUNDS = 5;

// Plays the names of a run of items one after another.
function sayInTurn(items, gap) {
  items.forEach((item, k) => setTimeout(() => play(item.audio, item.name), k * gap));
}

// A two-note train whistle.
function toot() {
  const ctx = getAudio();
  if (!ctx) return;
  [0, 0.32].forEach(start => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t = ctx.currentTime + start;
    osc.type = 'square';
    osc.frequency.setValueAtTime(start ? 523 : 659, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.08, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.3);
  });
}

function restartAnimation(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

// ---------- Train (letters or numbers) ----------

// A train arrives with empty wagons; the child taps the items from the pile in order and each
// one jumps into the next wagon. A full train whistles and leaves. The engine always leads:
// letters fill right to left and the train leaves to the right, numbers the other way round.
const TRAIN_ROUNDS = 4;

let train = null;

// cfg: { items, run, ltr, title, hint }
function startTrain(cfg) {
  train = { cfg, round: 0, lastStart: -1, run: [], pos: 0, locked: true };
  $('train-title').textContent = cfg.title;
  $('train-hint').textContent = cfg.hint;
  $('train-scene').dir = $('train-pile').dir = cfg.ltr ? 'ltr' : 'rtl';
  $('train-done').hidden = true;
  $('train-play').hidden = false;
  preload('bravo');
  nextTrainRound();
}

function nextTrainRound() {
  const t = train;
  const { items, run } = t.cfg;
  let start;
  do { start = Math.floor(Math.random() * (items.length - run + 1)); } while (start === t.lastStart && items.length > run);
  t.lastStart = start;
  t.run = range(start, start + run - 1);
  t.pos = 0;
  t.locked = true;

  renderDots('train-dots', t.round, TRAIN_ROUNDS);
  $('train-wagons').innerHTML = t.run.map(() => '<div class="wagon"><span></span></div>').join('');
  $('train-pile').innerHTML = shuffle([...t.run]).map(i =>
    `<button class="namecard pile-tile" type="button" data-item="${i}" aria-label="${items[i].name}">${items[i].ch}</button>`).join('');
  t.run.forEach(i => preload(items[i].audio));

  const el = $('train');
  el.className = 'train arriving';
  setTimeout(() => {
    if (train !== t) return;
    el.className = 'train';
    t.locked = false;
  }, 1300);
}

function pickTrain(btn) {
  const t = train;
  if (!t || t.locked || btn.classList.contains('used')) return;
  const idx = +btn.dataset.item;
  const item = t.cfg.items[idx];

  if (idx !== t.run[t.pos]) {
    boop();
    restartAnimation(btn, 'shake');
    return;
  }

  btn.classList.add('used');
  const wagon = $('train-wagons').children[t.pos];
  wagon.firstChild.textContent = item.ch;
  wagon.classList.add('full');
  play(item.audio, item.name);
  t.pos++;
  if (t.pos < t.run.length) return;

  t.locked = true;
  t.round++;
  cheerTick();
  renderDots('train-dots', t.round, TRAIN_ROUNDS);
  setTimeout(() => {
    if (train !== t) return;
    toot();
    $('train').className = 'train leaving';
  }, 700);
  setTimeout(() => {
    if (train !== t) return;
    if (t.round >= TRAIN_ROUNDS) finishGame('train');
    else nextTrainRound();
  }, 2600);
}

// ---------- Monkey and bananas ----------

// The voice names a letter; the child taps the banana that carries it, and it drops to the monkey.
const BANANA_SPOTS = [[12, 18], [34, 8], [58, 10], [80, 20], [24, 40], [68, 38]];

let monkey = null;

function startMonkey() {
  monkey = { round: 0, used: [], letter: -1, locked: false };
  $('monkey-done').hidden = true;
  $('monkey-play').hidden = false;
  preload('bravo');
  nextMonkeyRound();
}

function nextMonkeyRound() {
  const m = monkey;
  const all = LETTERS.map((_, i) => i);
  m.letter = pickOne(all.filter(i => !m.used.includes(i)));
  m.used.push(m.letter);
  m.locked = false;
  const letters = shuffle([m.letter, ...shuffle(all.filter(i => i !== m.letter)).slice(0, BANANA_SPOTS.length - 1)]);

  renderDots('monkey-dots', m.round, GAME_ROUNDS);
  $('monkey').className = 'monkey';
  $('monkey-bananas').innerHTML = letters.map((i, k) =>
    `<button class="banana" type="button" data-letter="${i}" style="left: ${BANANA_SPOTS[k][0]}%; top: ${BANANA_SPOTS[k][1]}%" aria-label="${LETTERS[i].name}">` +
    `<span class="banana-fruit" aria-hidden="true">🍌</span><b>${LETTERS[i].ch}</b></button>`).join('');
  preload(letterAudio(m.letter));
  setTimeout(() => { if (monkey === m && !m.locked) sayMonkey(); }, 400);
}

function sayMonkey() {
  if (monkey) play(letterAudio(monkey.letter), LETTERS[monkey.letter].name);
}

function pickBanana(btn) {
  const m = monkey;
  if (!m || m.locked) return;
  const face = $('monkey');

  if (+btn.dataset.letter !== m.letter) {
    boop();
    restartAnimation(btn, 'shake');
    restartAnimation(face, 'no');
    setTimeout(() => { if (monkey === m && !m.locked) sayMonkey(); }, 700);
    return;
  }

  // The banana drops into the monkey's hands, then the monkey eats it happily.
  m.locked = true;
  m.round++;
  renderDots('monkey-dots', m.round, GAME_ROUNDS);
  const from = btn.getBoundingClientRect(), to = face.getBoundingClientRect();
  btn.style.transition = 'transform 0.7s cubic-bezier(0.5, 0, 0.9, 0.6)';
  btn.style.transform = `translate(${to.left + to.width / 2 - from.left - from.width / 2}px, ${to.top + to.height * 0.3 - from.top - from.height / 2}px)`;
  btn.classList.add('falling');
  ding();
  sayMonkey();
  setTimeout(() => {
    if (monkey !== m) return;
    btn.classList.add('eaten');
    face.className = 'monkey yum';
    popSound();
  }, 700);
  setTimeout(() => {
    if (monkey !== m) return;
    if (m.round >= GAME_ROUNDS) finishGame('monkey');
    else nextMonkeyRound();
  }, 2200);
}

// ---------- The hungry fish ----------

// The big fish shows (and says) the letter it wants; small fish carrying letters swim past.
// Tapping a right one sends it into the big fish's mouth. FISH_NEED right fish end a round.
const FISH_NEED = 2;
const FISH_KINDS = ['🐟', '🐠', '🐡'];

let fish = null;

function startFish() {
  if (fish) clearInterval(fish.timer);
  const f = fish = { round: 0, used: [], letter: -1, got: 0, sinceRight: 3, locked: false, timer: 0 };
  $('fish-done').hidden = true;
  $('fish-play').hidden = false;
  preload('bravo');
  f.timer = setInterval(() => {
    if (fish !== f) clearInterval(f.timer);   // the child left the game
    else spawnFish();
  }, 1500);
  nextFishRound();
}

function nextFishRound() {
  const f = fish;
  f.letter = pickOne(LETTERS.map((_, i) => i).filter(i => !f.used.includes(i)));
  f.used.push(f.letter);
  f.got = 0;
  f.sinceRight = 3;
  f.locked = false;
  $('fish-swim').innerHTML = '';
  $('fish-target').textContent = LETTERS[f.letter].ch;
  renderDots('fish-dots', f.round, GAME_ROUNDS);
  renderDots('fish-marks', 0, FISH_NEED);
  preload(letterAudio(f.letter));
  spawnFish();
  setTimeout(() => { if (fish === f && !f.locked) sayFish(); }, 400);
}

function sayFish() {
  if (fish) play(letterAudio(fish.letter), LETTERS[fish.letter].name);
}

function spawnFish() {
  const f = fish;
  if (!f || f.locked || document.hidden) return;
  const right = f.sinceRight >= 2 || Math.random() < 0.35;
  f.sinceRight = right ? 0 : f.sinceRight + 1;
  const letter = right ? f.letter : pickOne(LETTERS.map((_, i) => i).filter(i => i !== f.letter));
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'swimmer';
  el.dataset.letter = letter;
  el.style.top = `${8 + Math.floor(Math.random() * 3) * 20}%`;
  el.innerHTML = `<span class="swimmer-fish" aria-hidden="true">${pickOne(FISH_KINDS)}</span><b>${LETTERS[letter].ch}</b>`;
  el.addEventListener('animationend', e => { if (e.target === el && e.animationName === 'swim') el.remove(); });
  $('fish-swim').appendChild(el);
}

function hitFish(el) {
  const f = fish;
  if (!f || f.locked || el.classList.contains('caught')) return;

  if (+el.dataset.letter !== f.letter) {
    boop();
    restartAnimation(el, 'flip');
    setTimeout(() => { if (fish === f && !f.locked) sayFish(); }, 700);
    return;
  }

  // Freeze it where it is, then let it swim into the big fish's mouth.
  const tank = $('fish-tank').getBoundingClientRect();
  const box = el.getBoundingClientRect();
  const mouth = $('big-fish').getBoundingClientRect();
  el.classList.add('caught');
  el.style.left = `${box.left - tank.left}px`;
  el.style.top = `${box.top - tank.top}px`;
  void el.offsetWidth;
  el.style.left = `${mouth.left - tank.left + mouth.width * 0.15}px`;
  el.style.top = `${mouth.top - tank.top + mouth.height * 0.25}px`;
  ding();
  sayFish();
  setTimeout(() => {
    el.remove();
    popSound();
    restartAnimation($('big-fish'), 'chomp');
  }, 650);

  f.got++;
  renderDots('fish-marks', f.got, FISH_NEED);
  if (f.got < FISH_NEED) return;
  f.locked = true;
  f.round++;
  renderDots('fish-dots', f.round, GAME_ROUNDS);
  $('fish-swim').querySelectorAll('.swimmer:not(.caught)').forEach(s => s.classList.add('away'));
  setTimeout(() => {
    if (fish !== f) return;
    if (f.round < GAME_ROUNDS) { nextFishRound(); return; }
    clearInterval(f.timer);
    $('fish-swim').innerHTML = '';
    finishGame('fish');
  }, 1800);
}

// ---------- Letter tower ----------

// Three blocks float above the tower: the next letter and two of its neighbours. The right one
// drops onto the top of the tower. After ת a rocket lands on top and takes off.
const TOWER_SHOWN = 4;   // blocks of the tower kept on screen; the rest have scrolled down

let tower = null;

function startTower() {
  tower = { next: 0, locked: false };
  $('tower-done').hidden = true;
  $('tower-play').hidden = false;
  $('tower-stack').innerHTML = '';
  preload('bravo');
  renderDots('tower-dots', 0, 0);
  nextTowerChoices();
}

function nextTowerChoices() {
  const t = tower;
  const n = t.next;
  const near = shuffle(range(Math.max(0, n - 3), Math.min(LETTERS.length - 1, n + 3)).filter(i => i !== n)).slice(0, 2);
  $('tower-choices').innerHTML = shuffle([n, ...near]).map(i =>
    `<button class="block" type="button" data-letter="${i}" style="--hue: ${i % 6}" aria-label="${LETTERS[i].name}">${LETTERS[i].ch}</button>`).join('');
  preload(letterAudio(n));
  t.locked = false;
}

function pickBlock(btn) {
  const t = tower;
  if (!t || t.locked) return;
  const letter = +btn.dataset.letter;

  if (letter !== t.next) {
    boop();
    restartAnimation(btn, 'shake');
    return;
  }

  t.locked = true;
  const stack = $('tower-stack');
  const block = document.createElement('div');
  block.className = 'block placed';
  block.style.setProperty('--hue', letter % 6);
  block.textContent = LETTERS[letter].ch;
  stack.appendChild(block);
  while (stack.children.length > TOWER_SHOWN) stack.firstChild.remove();
  $('tower-choices').innerHTML = '';
  ding();
  play(letterAudio(letter), LETTERS[letter].name);
  t.next++;

  if (t.next < LETTERS.length) {
    setTimeout(() => { if (tower === t) nextTowerChoices(); }, 700);
    return;
  }
  const rocket = document.createElement('div');
  rocket.className = 'block-rocket';
  rocket.textContent = '🚀';
  stack.appendChild(rocket);
  setTimeout(() => { if (tower === t) { rocket.classList.add('launch'); toot(); } }, 900);
  setTimeout(() => { if (tower === t) finishGame('tower'); }, 2600);
}

// ---------- Frog and stones ----------

// Stones numbered 1-10 lie scattered in the river. The frog jumps from stone to stone in order;
// a wrong stone makes a splash and the frog climbs back onto the last one.
let frog = null;

function startFrog() {
  frog = { next: 1, at: null, locked: false };
  $('frog-done').hidden = true;
  $('frog-play').hidden = false;
  preload('bravo');
  range(1, 10).forEach(n => preload(numAudio(n)));

  // Ten places on a 5 x 2 grid across the river, shaken a little, numbers in random places.
  const spots = shuffle(range(0, 9)).map(k => [20 + (k % 5) * 15 + (Math.random() * 6 - 3), (k < 5 ? 30 : 70) + (Math.random() * 12 - 6)]);
  $('frog-stones').innerHTML = range(1, 10).map(n =>
    `<button class="stone" type="button" data-n="${n}" style="left: ${spots[n - 1][0]}%; top: ${spots[n - 1][1]}%" aria-label="${NUMBERS[n]}">${n}</button>`).join('');
  moveFrog(6, 50, false);
  renderDots('frog-dots', 0, 0);
}

function moveFrog(x, y, hop) {
  const el = $('frog');
  frog.at = [x, y];
  el.style.left = `${x}%`;
  el.style.top = `${y}%`;
  if (hop) restartAnimation(el, 'hop');
}

function pickStone(stone) {
  const f = frog;
  if (!f || f.locked || stone.classList.contains('visited')) return;
  const n = +stone.dataset.n;
  const x = parseFloat(stone.style.left), y = parseFloat(stone.style.top);
  f.locked = true;

  if (n !== f.next) {
    // Jump at it, splash, and climb back.
    const back = f.at;
    moveFrog(x, y, true);
    setTimeout(() => {
      if (frog !== f) return;
      boop();
      popSound();
      restartAnimation(stone, 'splash');
      $('frog').classList.add('wet');
    }, 450);
    setTimeout(() => {
      if (frog !== f) return;
      $('frog').classList.remove('wet');
      moveFrog(back[0], back[1], true);
      f.locked = false;
    }, 1150);
    return;
  }

  moveFrog(x, y, true);
  setTimeout(() => {
    if (frog !== f) return;
    stone.classList.add('visited');
    ding();
    play(numAudio(n), NUMBERS[n]);
    f.next++;
    if (f.next <= 10) { f.locked = false; return; }
    setTimeout(() => {
      if (frog !== f) return;
      moveFrog(94, 50, true);
      $('frog').classList.add('happy');
    }, 700);
    setTimeout(() => { if (frog === f) finishGame('frog'); }, 2200);
  }, 450);
}

// ---------- Feeding the animals ----------

// An animal holds a number and wants that much food. The child moves food from the pile to
// the plate (each piece is counted aloud; a piece on the plate can be taken back) and taps ✔.
const ANIMALS = [['🐰', '🥕'], ['🐻', '🍯'], ['🐶', '🦴'], ['🐵', '🍌'], ['🐭', '🧀'], ['🐼', '🎋']];
const FEED_PILE = 12;

let feed = null;

function startFeed() {
  feed = { round: 0, used: [], n: 0, animal: null, locked: false };
  $('feed-done').hidden = true;
  $('feed-play').hidden = false;
  preload('bravo');
  range(1, 10).forEach(n => preload(numAudio(n)));
  nextFeedRound();
}

function nextFeedRound() {
  const f = feed;
  f.n = pickOne(range(1, 10).filter(v => !f.used.includes(v)));
  f.used.push(f.n);
  f.animal = pickOne(ANIMALS.filter(a => a !== f.animal));
  f.locked = false;

  renderDots('feed-dots', f.round, GAME_ROUNDS);
  $('feed-face').textContent = f.animal[0];
  $('feed-face').className = 'feed-face';
  $('feed-sign').textContent = f.n;
  $('feed-plate').innerHTML = '';
  $('feed-pile').innerHTML = Array(FEED_PILE).fill(`<button class="food" type="button" aria-label="אוכל">${f.animal[1]}</button>`).join('');
  setTimeout(() => { if (feed === f && !f.locked) sayFeed(); }, 400);
}

function sayFeed() {
  if (feed) play(numAudio(feed.n), NUMBERS[feed.n]);
}

function moveFood(btn) {
  const f = feed;
  if (!f || f.locked) return;
  const toPlate = btn.parentElement.id === 'feed-pile';
  (toPlate ? $('feed-plate') : $('feed-pile')).appendChild(btn);
  restartAnimation(btn, 'land');
  const count = $('feed-plate').children.length;
  if (toPlate) play(numAudio(count), NUMBERS[count]);
}

function checkFeed() {
  const f = feed;
  if (!f || f.locked) return;
  const count = $('feed-plate').children.length;
  const face = $('feed-face');

  if (count !== f.n) {
    boop();
    restartAnimation(face, 'no');
    setTimeout(() => { if (feed === f && !f.locked) sayFeed(); }, 700);
    return;
  }

  f.locked = true;
  f.round++;
  renderDots('feed-dots', f.round, GAME_ROUNDS);
  ding();
  sayFeed();
  face.className = 'feed-face yum';
  setTimeout(() => {
    if (feed !== f) return;
    if (f.round >= GAME_ROUNDS) finishGame('feed');
    else nextFeedRound();
  }, 2200);
}

// ---------- The lift ----------

// The voice says "קומה" and a number; the child presses that button. The lift travels floor by
// floor, saying each floor, and opens its doors on arrival.
const LIFT_FLOORS = 10;

let lift = null;

function startLift() {
  lift = { round: 0, floor: 1, target: 0, locked: false };
  $('lift-done').hidden = true;
  $('lift-play').hidden = false;
  preload('bravo');
  preload('q-floor');
  range(1, LIFT_FLOORS).forEach(n => preload(numAudio(n)));
  // Each floor: its number, then a window on each side of the shaft (the <b> keeps the shaft's place).
  $('lift-floors').innerHTML = range(1, LIFT_FLOORS).reverse().map(n =>
    `<div class="lift-floor"><span>${n}</span><i></i><b></b><i></i></div>`).join('');
  // Buttons in two columns, low floors at the bottom, as in a real lift.
  const rows = range(0, LIFT_FLOORS / 2 - 1).reverse();
  $('lift-panel').innerHTML = rows.map(r => [2 * r + 1, 2 * r + 2].map(n =>
    `<button class="lift-btn" type="button" data-n="${n}" aria-label="${NUMBERS[n]}">${n}</button>`).join('')).join('');
  placeLift(1);
  $('lift-car').classList.add('open');
  nextLiftRound();
}

// Moves the car to a floor and shows it on the display; `dir` is the arrow while riding.
function placeLift(floor, dir) {
  $('lift-car').style.bottom = `${(floor - 1) * 100 / LIFT_FLOORS}%`;
  $('lift-now').textContent = floor;
  $('lift-arrow').textContent = dir > 0 ? '▲' : dir < 0 ? '▼' : '';
}

function nextLiftRound() {
  const l = lift;
  l.target = pickOne(range(1, LIFT_FLOORS).filter(n => n !== l.floor));
  l.locked = false;
  renderDots('lift-dots', l.round, GAME_ROUNDS);
  document.querySelectorAll('.lift-btn').forEach(b => b.classList.remove('lit', 'wrong'));
  setTimeout(() => { if (lift === l && !l.locked) sayLift(); }, 400);
}

function sayLift() {
  if (!lift) return;
  const n = lift.target;
  play('q-floor', 'קומה');
  setTimeout(() => { if (lift && lift.target === n) play(numAudio(n), NUMBERS[n]); }, 700);
}

function pickLift(btn) {
  const l = lift;
  if (!l || l.locked) return;
  const n = +btn.dataset.n;

  if (n !== l.target) {
    boop();
    restartAnimation(btn, 'wrong');
    setTimeout(() => { if (lift === l && !l.locked) sayLift(); }, 700);
    return;
  }

  // Close the doors, ride one floor at a time saying each floor, then open up.
  l.locked = true;
  btn.classList.add('lit');
  const car = $('lift-car');
  car.classList.remove('open');
  const step = n > l.floor ? 1 : -1;
  $('lift-arrow').textContent = step > 0 ? '▲' : '▼';
  const floors = range(Math.min(l.floor, n), Math.max(l.floor, n)).filter(v => v !== l.floor);
  if (step < 0) floors.reverse();
  floors.forEach((floor, k) => setTimeout(() => {
    if (lift !== l) return;
    placeLift(floor, floor === n ? 0 : step);
    play(numAudio(floor), NUMBERS[floor]);
  }, 600 + k * 650));
  const ride = 600 + floors.length * 650;
  setTimeout(() => {
    if (lift !== l) return;
    l.floor = n;
    car.classList.add('open');
    ding();
    l.round++;
    renderDots('lift-dots', l.round, GAME_ROUNDS);
  }, ride);
  setTimeout(() => {
    if (lift !== l) return;
    if (l.round >= GAME_ROUNDS) finishGame('lift');
    else nextLiftRound();
  }, ride + 1500);
}

// ---------- Celebration ----------

// Every few right answers (a random number from CHEER_MIN to CHEER_MAX, counted across all the
// exercises) Sivan appears with a thumbs-up and says "כל הכבוד!" or "עבודה טובה!", in one of
// three animations picked at random: peeking from the corner, in a spotlight with sun rays, or
// on a gold medal. It never blocks a tap. Right answers are counted where ding() plays, plus the
// few games that celebrate with another sound; tracing (which dings per stroke) doesn't count.
const CHEER_MIN = 3, CHEER_MAX = 6;
const CHEER_MS = 5200;                 // how long it stays on screen
const CHEER_KINDS = ['peek', 'spotlight', 'medal'];

let cheerCount = 0;
let cheerAt = CHEER_MIN + Math.floor(Math.random() * (CHEER_MAX - CHEER_MIN + 1));
let cheerTimer = 0;

function cheerTick() {
  if (trace) return;
  if (++cheerCount < cheerAt) return;
  cheerCount = 0;
  cheerAt = CHEER_MIN + Math.floor(Math.random() * (CHEER_MAX - CHEER_MIN + 1));
  setTimeout(celebrate, 900);          // after the answer's own feedback
}

function celebrate() {
  const kind = pickOne(CHEER_KINDS);
  const good = Math.random() < 0.5;
  const text = good ? 'עבודה טובה!' : 'כל הכבוד!';
  const sivan = '<img class="cheer-sivan" src="images/sivan.png" alt="">';
  const parts = {
    peek: `<div class="cheer-who">${sivan}<span class="cheer-thumb">👍</span></div><div class="cheer-bubble cheer-say">${text}</div>`,
    spotlight: `<div class="cheer-shade"></div><div class="cheer-rays"></div><div class="cheer-disc">${sivan}</div><span class="cheer-thumb">👍</span><div class="cheer-say">${text}</div>`,
    medal: `<div class="cheer-medal"><div class="cheer-ribbon l"></div><div class="cheer-ribbon r"></div><div class="cheer-star"></div><div class="cheer-face">${sivan}</div>` +
      `<span class="cheer-thumb">👍</span><div class="cheer-say">${text}</div>` +
      '<span class="cheer-spark" style="left:-12%;top:-6%">✨</span><span class="cheer-spark" style="right:-10%;top:4%;animation-delay:-.5s">⭐</span><span class="cheer-spark" style="right:-4%;top:70%;animation-delay:-.2s">✨</span></div>',
  };
  const el = $('cheer');
  el.className = 'cheer';
  void el.offsetWidth;                 // restart the animation if one is still showing
  el.innerHTML = parts[kind];
  el.className = `cheer cheer-${kind}`;
  jingle();
  if (kind !== 'peek') confetti();
  setTimeout(() => play(good ? 'good-job' : 'bravo', text), 700);
  clearTimeout(cheerTimer);
  cheerTimer = setTimeout(() => { el.className = 'cheer'; el.innerHTML = ''; }, CHEER_MS);
}

// A bright rising arpeggio with a shimmer on top: the "you did it" sound.
function jingle() {
  const ctx = getAudio();
  if (!ctx) return;
  const now = ctx.currentTime;
  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, k) => {
    const t = now + k * 0.09;
    [1, 2.01].forEach((mult, h) => {       // a bell-like tone: the note and a soft overtone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = h ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f * mult, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(h ? 0.04 : 0.16, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + (k === 4 ? 1.2 : 0.5));
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 1.3);
    });
  });
  // shimmer: quick high sparkles after the arpeggio
  for (let k = 0; k < 6; k++) {
    const t = now + 0.5 + k * 0.06;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000 + Math.random() * 1500, t);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.16);
  }
}

// ---------- Song ----------

// The kindergarten's song plays on the landing page only, so it never talks over an exercise.
// It is streamed by an <audio> element rather than decoded like the short clips.
const song = new Audio('audio/song.m4a');
song.preload = 'none';

function showSong(playing) {
  const btn = $('song-btn');
  btn.classList.toggle('playing', playing);
  btn.setAttribute('aria-pressed', playing);
  btn.setAttribute('aria-label', playing ? 'לעצור את השיר' : 'לנגן את השיר של הגן');
}

function stopSong() {
  song.pause();
  try { song.currentTime = 0; } catch {}
  showSong(false);
}

function toggleSong() {
  if (!song.paused) { stopSong(); return; }
  showSong(true);
  song.play().catch(() => showSong(false));
}

song.addEventListener('ended', () => showSong(false));

// ---------- Screens ----------

function renderGrid() {
  const done = loadDone();
  $('letter-grid').innerHTML = LETTERS.map((l, i) =>
    `<a class="tile${done.has(i) ? ' done' : ''}" href="#letter-${i + 1}" aria-label="${l.name}">${l.ch}</a>`).join('');
}

function renderAll() {
  const grid = $('all-grid');
  grid.innerHTML = '';
  LETTERS.forEach((letter, i) => {
    const cell = document.createElement('a');
    cell.href = `#letter-${i + 1}`;
    grid.appendChild(cell);
    buildLetter(cell, letter);
  });
  [...FINALS, ...DIGITS].forEach(glyph => buildLetter(grid.appendChild(document.createElement('a')), glyph));
}

function show(id) {
  document.querySelectorAll('.screen').forEach(s => { s.hidden = s.id !== id; });
  window.scrollTo(0, 0);
}

function route() {
  const hash = location.hash.slice(1);
  if (hash && !song.paused) stopSong();
  const m = hash.match(/^letter-(\d+)$/);
  const level = hash.match(/^order-([12])$/);
  const pictures = hash.match(/^first-([234])$/);
  const letters = hash.match(/^names-([234])$/);
  trace = null;
  order = null;
  first = null;
  names = null;
  const cards = hash.match(/^memory-(6|8|12)$/);
  find = null;
  const speed = hash.match(/^pop-([12])$/);
  memory = null;
  pop = null;
  finals = null;
  count = null;
  more = null;
  add = null;
  const digit = hash.match(/^digit-(\d)$/);
  const countTo = hash.match(/^count-(5|10)$/);
  const moreTo = hash.match(/^more-(5|10)$/);
  const addTo = hash.match(/^add-(5|10)$/);
  const numNames = hash.match(/^numnames-([234])$/);
  const numOrder = hash.match(/^numorder-(10|20)$/);
  beats = null;
  road = null;
  rhyme = null;
  spell = null;
  if (hidden) clearTimeout(hidden.hint);
  hidden = null;
  train = null;
  monkey = null;
  fish = null;
  tower = null;
  frog = null;
  feed = null;
  lift = null;
  const spellLevel = hash.match(/^spell-([12])$/);
  const hiddenLevel = hash.match(/^hidden-([12])$/);
  if (spellLevel) {
    show('spell-game');
    startSpell(+spellLevel[1]);
  } else if (hiddenLevel) {
    show('hidden-game');
    startHidden(+hiddenLevel[1]);
  } else if (hash === 'spell' || hash === 'hidden') {
    show(hash);
  } else if (hash === 'rhyme') {
    show('rhyme');
    startRhyme();
  } else if (hash === 'train' || hash === 'numtrain') {
    show('train-game');
    startTrain(hash === 'train'
      ? { items: LETTER_ITEMS, run: 4, ltr: false, title: 'רכבת האותיות', hint: 'לוחצים על האותיות לפי הסדר כדי למלא את הקרונות' }
      : { items: NUMBER_ITEMS.slice(1, 11), run: 5, ltr: true, title: 'רכבת המספרים', hint: 'לוחצים על המספרים לפי הסדר כדי למלא את הקרונות' });
  } else if (hash === 'monkey') {
    show('monkey-game');
    startMonkey();
  } else if (hash === 'fish') {
    show('fish-game');
    startFish();
  } else if (hash === 'tower') {
    show('tower-game');
    startTower();
  } else if (hash === 'frog') {
    show('frog-game');
    startFrog();
  } else if (hash === 'feed') {
    show('feed-game');
    startFeed();
  } else if (hash === 'lift') {
    show('lift-game');
    startLift();
  } else if (hash === 'road') {
    show('road');
    startRoad();
  } else if (hash === 'beats') {
    show('beats');
    startBeats();
  } else if (digit) {
    show('trace');
    openDigit(+digit[1]);
  } else if (hash === 'digits') {
    renderDigitGrid();
    show('digits');
  } else if (countTo) {
    show('count-game');
    startCount(+countTo[1]);
  } else if (moreTo) {
    show('more-game');
    startMore(+moreTo[1]);
  } else if (addTo) {
    show('add-game');
    startAdd(+addTo[1]);
  } else if (numNames) {
    show('names-game');
    startNames({ items: NUMBER_ITEMS.slice(0, 11), level: +numNames[1], title: 'שמות המספרים', back: '#numnames' });
  } else if (numOrder) {
    show('order-game');
    startOrder({
      items: NUMBER_ITEMS.slice(1, +numOrder[1] + 1), missing: numOrder[1] === '10' ? 1 : 2,
      title: 'השלמת סדר מספרים', back: '#numorder', ltr: true,
    });
  } else if (hash === 'numfind') {
    show('find');
    startFind({
      items: NUMBER_ITEMS.slice(0, 10), pool: range(0, 9).map(String), alike: DIGITS_ALIKE, tooAlike: [],
      title: 'מצא את המספר', back: '#numbers', ltr: true,
    });
  } else if (['count', 'more', 'add', 'numnames', 'numorder'].includes(hash)) {
    show(hash);
  } else if (hash === 'name-trace' && myName) {
    show('trace');
    openNameLetter(0);
  } else if (hash === 'name' || hash === 'name-trace') {
    myName = null;
    renderNames();
    show('name');
  } else if (hash === 'final') {
    show('final');
    startFinals();
  } else if (speed) {
    show('pop-game');
    startPop(+speed[1]);
  } else if (hash === 'pop') {
    show('pop');
  } else if (cards) {
    show('memory-game');
    startMemory(+cards[1]);
  } else if (hash === 'memory') {
    show('memory');
  } else if (hash === 'find') {
    show('find');
    startFind({
      items: LETTER_ITEMS, pool: [...LETTERS, ...FINALS].map(l => l.ch),   // final letters only ever appear as wrong tiles
      alike: LOOK_ALIKE, tooAlike: TOO_ALIKE, title: 'מצא את האות', back: '#abc',
    });
  } else if (letters) {
    show('names-game');
    startNames({ items: LETTER_ITEMS, level: +letters[1], title: 'שמות האותיות', back: '#names' });
  } else if (hash === 'names') {
    show('names');
  } else if (pictures) {
    show('first-game');
    startFirst(+pictures[1]);
  } else if (hash === 'first') {
    show('first');
  } else if (level) {
    show('order-game');
    startOrder({ items: LETTER_ITEMS, missing: +level[1], title: 'השלמת סדר אותיות', back: '#order' });
  } else if (hash === 'order') {
    show('order');
  } else if (m && LETTERS[m[1] - 1]) {
    show('trace');
    openLetter(m[1] - 1);
  } else if (hash === 'letters') {
    renderGrid();
    show('letters');
  } else if (hash === 'abc' || hash === 'numbers' || hash === 'games') {
    show(hash);
  } else if (hash === 'all') {
    show('all');
    renderAll();
  } else {
    show('home');
  }
}

// ---------- Init ----------

$('version').textContent = APP_VERSION;
$('erase-btn').addEventListener('click', () => { if (trace) trace.reopen(); });
$('prev-btn').addEventListener('click', e => { if (trace?.inName) { e.preventDefault(); stepName(-1); } });
$('next-btn').addEventListener('click', e => { if (trace?.inName) { e.preventDefault(); stepName(1); } });
$('name-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = $('name-input');
  if (startName(input.value)) { input.value = ''; return; }
  input.classList.remove('shake');
  void input.offsetWidth;
  input.classList.add('shake');
});
$('name-chips').addEventListener('click', e => {
  const { name, remove } = e.target.dataset;
  if (name) startName(name);
  if (remove) { saveNames(loadNames().filter(n => n !== remove)); renderNames(); }
});
$('final-again').addEventListener('click', () => { if (finals) startFinals(); });
$('final-speak').addEventListener('click', sayFinalBase);
$('final-letter').addEventListener('click', sayFinalBase);
$('final-choices').addEventListener('click', e => {
  const btn = e.target.closest('.pic');
  if (btn) pickFinal(btn);
});
$('order-again').addEventListener('click', () => { if (order) startOrder(order.cfg); });
$('first-again').addEventListener('click', () => { if (first) startFirst(first.level); });
$('first-speak').addEventListener('click', sayFirstLetter);
$('first-letter').addEventListener('click', sayFirstLetter);
$('first-choices').addEventListener('click', e => {
  const btn = e.target.closest('.pic');
  if (btn) pickFirst(btn);
});
$('names-again').addEventListener('click', () => { if (names) startNames(names.cfg); });
$('names-speak').addEventListener('click', sayName);
$('names-cards').addEventListener('click', e => {
  const btn = e.target.closest('.namecard');
  if (btn) pickName(btn);
});
$('find-again').addEventListener('click', () => { if (find) startFind(find.cfg); });
$('find-speak').addEventListener('click', sayFindLetter);
$('find-letter').addEventListener('click', sayFindLetter);
$('find-tiles').addEventListener('click', e => {
  const btn = e.target.closest('.findtile');
  if (btn) pickFind(btn);
});
$('memory-again').addEventListener('click', () => { if (memory) startMemory(memory.cards); });
$('memory-grid').addEventListener('click', e => {
  const btn = e.target.closest('.memcard');
  if (btn) flipCard(btn);
});
$('pop-again').addEventListener('click', () => { if (pop) startPop(pop.level); });
$('pop-speak').addEventListener('click', sayPopLetter);
$('pop-sky').addEventListener('pointerdown', e => {
  const b = e.target.closest('.balloon');
  if (b) hitBalloon(b);
});
$('count-again').addEventListener('click', () => { if (count) startCount(count.max); });
$('count-speak').addEventListener('click', () => play('q-count', 'כמה יש?'));
$('count-box').addEventListener('click', e => { if (count && !count.locked) countObject(e.target.closest('.obj'), count.tally); });
$('count-cards').addEventListener('click', e => {
  const btn = e.target.closest('.namecard');
  if (btn) pickCount(btn);
});
$('more-again').addEventListener('click', () => { if (more) startMore(more.max); });
$('more-speak').addEventListener('click', () => play('q-more', 'איפה יש יותר?'));
['more-a', 'more-b'].forEach(id => $(id).addEventListener('click', () => pickMore($(id))));
$('add-again').addEventListener('click', () => { if (add) startAdd(add.max); });
$('add-speak').addEventListener('click', () => play('q-add', 'כמה יש ביחד?'));
['add-a', 'add-b'].forEach(id => $(id).addEventListener('click', e => {
  if (add && !add.locked) countObject(e.target.closest('.obj'), add.tally);
}));
$('add-cards').addEventListener('click', e => {
  const btn = e.target.closest('.namecard');
  if (btn) pickAdd(btn);
});
$('beats-again').addEventListener('click', () => { if (beats) startBeats(); });
$('beats-pic').addEventListener('click', sayBeatsWord);
$('beats-cards').addEventListener('click', e => {
  const btn = e.target.closest('.namecard');
  if (btn) pickBeats(btn);
});
$('road-again').addEventListener('click', () => { if (road) startRoad(); });
$('road-world').addEventListener('click', e => {
  const gate = e.target.closest('.gate');
  if (gate) pickGate(gate);
});
$('train-again').addEventListener('click', () => { if (train) startTrain(train.cfg); });
$('train-pile').addEventListener('click', e => {
  const btn = e.target.closest('.pile-tile');
  if (btn) pickTrain(btn);
});
$('monkey-again').addEventListener('click', startMonkey);
$('monkey-speak').addEventListener('click', sayMonkey);
$('monkey-bananas').addEventListener('click', e => {
  const btn = e.target.closest('.banana');
  if (btn) pickBanana(btn);
});
$('fish-again').addEventListener('click', startFish);
$('fish-speak').addEventListener('click', sayFish);
$('big-fish').addEventListener('click', sayFish);
$('fish-swim').addEventListener('pointerdown', e => {
  const el = e.target.closest('.swimmer');
  if (el) hitFish(el);
});
$('tower-again').addEventListener('click', startTower);
$('tower-choices').addEventListener('click', e => {
  const btn = e.target.closest('.block');
  if (btn) pickBlock(btn);
});
$('frog-again').addEventListener('click', startFrog);
$('frog-stones').addEventListener('click', e => {
  const stone = e.target.closest('.stone');
  if (stone) pickStone(stone);
});
$('feed-again').addEventListener('click', startFeed);
$('feed-speak').addEventListener('click', sayFeed);
$('feed-sign').addEventListener('click', sayFeed);
$('feed-check').addEventListener('click', checkFeed);
['feed-pile', 'feed-plate'].forEach(id => $(id).addEventListener('click', e => {
  const btn = e.target.closest('.food');
  if (btn) moveFood(btn);
}));
$('lift-again').addEventListener('click', startLift);
$('lift-speak').addEventListener('click', sayLift);
$('lift-panel').addEventListener('click', e => {
  const btn = e.target.closest('.lift-btn');
  if (btn) pickLift(btn);
});
$('rhyme-again').addEventListener('click', startRhyme);
$('rhyme-pic').addEventListener('click', sayRhymeWord);
$('rhyme-cards').addEventListener('click', e => {
  const say = e.target.closest('.rhyme-say');
  if (say) { sayRhymeItem(+say.dataset.say); return; }
  const pick = e.target.closest('.rhyme-pick');
  if (pick) pickRhyme(pick);
});
$('spell-again').addEventListener('click', () => { if (spell) startSpell(spell.level); });
$('spell-pic').addEventListener('click', saySpellWord);
$('spell-tiles').addEventListener('click', e => {
  const btn = e.target.closest('.spell-tile');
  if (btn) pickSpell(btn);
});
$('hidden-again').addEventListener('click', () => { if (hidden) startHidden(hidden.level); });
$('hidden-scene').addEventListener('click', e => pickHidden(e.target.closest('.hidden-letter')));
$('song-btn').addEventListener('click', toggleSong);
$('speak-btn').addEventListener('click', () => {
  if (trace) play(trace.audio, trace.letter.name);
});
window.addEventListener('hashchange', route);
route();
