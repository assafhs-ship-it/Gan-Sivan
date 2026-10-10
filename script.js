const APP_VERSION = '0.9';

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

function loadDone() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []); }
  catch { return new Set(); }
}

function markDone(idx) {
  const done = loadDone();
  done.add(idx);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...done])); } catch {}
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
  const board = $('board');
  const banner = $('name-banner');

  board.querySelector('svg')?.remove();
  board.classList.remove('done');
  banner.hidden = true;
  banner.textContent = letter.name;
  $('trace-title').textContent = `האות ${letter.ch}`;
  $('prev-btn').href = idx > 0 ? `#letter-${idx}` : '#letters';
  $('next-btn').href = idx < LETTERS.length - 1 ? `#letter-${idx + 2}` : '#letters';
  $('next-btn').classList.remove('pulse');

  trace = { idx, current: 0, drawing: false, finished: false, ...buildLetter(board, letter) };
  preload(letterAudio(idx));
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
  const letter = LETTERS[mine.idx];
  mine.finished = true;
  mine.head.setAttribute('visibility', 'hidden');
  markDone(mine.idx);

  $('board').classList.add('done');
  $('name-banner').hidden = false;
  $('next-btn').classList.add('pulse');
  play(letterAudio(mine.idx), letter.name);
  confetti();
  setTimeout(() => { if (trace === mine) play('bravo', 'כל הכבוד'); }, 1200);
}

// ---------- Letter order ----------

const ORDER_ROUNDS = 5;   // rounds in one game
const ORDER_RUN = 4;      // consecutive letters shown in a round
const ORDER_CHOICES = 4;  // letters offered in the clouds

let order = null;

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

// `level` is how many letters of the run are missing.
function startOrder(level) {
  order = { level, round: 0, lastStart: -1, left: 0, locked: false };
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
  let start;
  do { start = Math.floor(Math.random() * (LETTERS.length - ORDER_RUN + 1)); } while (start === o.lastStart);
  o.lastStart = start;

  const run = Array.from({ length: ORDER_RUN }, (_, i) => start + i);
  const missing = shuffle([...run]).slice(0, o.level);
  const others = shuffle(LETTERS.map((_, i) => i).filter(i => !run.includes(i)));
  const choices = shuffle([...missing, ...others.slice(0, ORDER_CHOICES - o.level)]);
  o.left = missing.length;
  o.locked = false;
  renderDots('order-dots', o.round, ORDER_ROUNDS);

  $('order-seq').innerHTML = run.map(idx => missing.includes(idx)
    ? `<div class="ring slot" data-idx="${idx}">?</div>`
    : `<div class="ring">${LETTERS[idx].ch}</div>`).join('');
  $('order-options').innerHTML = choices.map(idx =>
    `<button class="cloud" type="button" data-idx="${idx}" aria-label="${LETTERS[idx].name}"><span>${LETTERS[idx].ch}</span></button>`).join('');

  choices.forEach(idx => preload(letterAudio(idx)));
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
  const home = document.querySelector(`#order-seq .slot[data-idx="${idx}"]`);

  if (!home || (dragged && slot !== home)) {
    boop();
    void el.offsetWidth;          // restart the shake if it is already running
    el.classList.add('shake');
    return;
  }

  home.textContent = LETTERS[idx].ch;
  home.classList.replace('slot', 'filled');
  el.classList.add('used');
  play(letterAudio(idx), LETTERS[idx].name);
  if (--order.left === 0) finishOrderRound();
}

function finishOrderRound() {
  const mine = order;
  mine.locked = true;
  mine.round++;
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

// ---------- Letter names ----------

const NAMES_ROUNDS = 5;

let names = null;

// `level` is how many letters there are to choose from.
function startNames(level) {
  names = { level, round: 0, used: [], letter: -1, locked: false };
  $('names-done').hidden = true;
  $('names-play').hidden = false;
  preload('bravo');
  nextNamesRound();
}

function nextNamesRound() {
  const n = names;
  const all = LETTERS.map((_, i) => i);
  n.letter = pickOne(all.filter(i => !n.used.includes(i)));
  n.used.push(n.letter);
  n.locked = false;

  const others = shuffle(all.filter(i => i !== n.letter)).slice(0, n.level - 1);
  const choices = shuffle([n.letter, ...others]);

  renderDots('names-dots', n.round, NAMES_ROUNDS);
  $('names-cards').innerHTML = choices.map(i =>
    `<button class="namecard" type="button" data-letter="${i}">${LETTERS[i].ch}<span aria-hidden="true">${WORDS[i][0][1]}</span></button>`).join('');

  choices.forEach(i => preload(letterAudio(i)));
  setTimeout(() => { if (names === n && !n.locked) sayName(); }, 400);
}

function sayName() {
  if (names) play(letterAudio(names.letter), LETTERS[names.letter].name);
}

function pickName(btn) {
  const n = names;
  if (!n || n.locked || btn.classList.contains('off')) return;

  if (+btn.dataset.letter !== n.letter) {
    boop();
    btn.classList.add('shake', 'off');   // a wrong letter is taken out of the round
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

// ---------- Find the letter ----------

const FIND_ROUNDS = 5;
const FIND_TILES = 8;
const FINAL_LETTERS = ['ך', 'ם', 'ן', 'ף', 'ץ'];   // only ever shown as wrong tiles
// Letters that look alike; a couple of them are mixed in among the wrong tiles.
const LOOK_ALIKE = ['בכפ', 'דרך', 'החת', 'וז', 'גנ', 'סם', 'עצץ', 'טמ', 'יו', 'פף', 'כך', 'נן', 'מם'];
// Pairs too close to tell apart in the site's rounded font; never shown together.
const TOO_ALIKE = ['ון'];

let find = null;

function startFind() {
  find = { round: 0, used: [], letter: -1, left: 0, total: 0, locked: false };
  $('find-done').hidden = true;
  $('find-play').hidden = false;
  preload('bravo');
  nextFindRound();
}

function nextFindRound() {
  const f = find;
  f.letter = pickOne(LETTERS.map((_, i) => i).filter(i => !f.used.includes(i)));
  f.used.push(f.letter);
  f.total = f.left = pickOne([3, 4]);
  f.locked = false;

  const ch = LETTERS[f.letter].ch;
  const alike = [...new Set(LOOK_ALIKE.filter(g => g.includes(ch)).join(''))].filter(c => c !== ch);
  const banned = TOO_ALIKE.filter(pair => pair.includes(ch)).join('');
  const rest = [...LETTERS.map(l => l.ch), ...FINAL_LETTERS]
    .filter(c => c !== ch && !alike.includes(c) && !banned.includes(c));
  const wrong = [...shuffle(alike).slice(0, 2), ...shuffle(rest)].slice(0, FIND_TILES - f.total);
  const tiles = shuffle([...Array(f.total).fill(ch), ...wrong]);

  renderDots('find-dots', f.round, FIND_ROUNDS);
  renderDots('find-marks', 0, f.total);
  $('find-letter').textContent = ch;
  $('find-tiles').classList.remove('cheer');
  $('find-tiles').innerHTML = tiles.map(c => `<button class="findtile" type="button">${c}</button>`).join('');

  preload(letterAudio(f.letter));
  setTimeout(() => { if (find === f && !f.locked) sayFindLetter(); }, 400);
}

function sayFindLetter() {
  if (find) play(letterAudio(find.letter), LETTERS[find.letter].name);
}

function pickFind(btn) {
  const f = find;
  if (!f || f.locked || btn.classList.contains('found')) return;

  if (btn.textContent !== LETTERS[f.letter].ch) {
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
}

function show(id) {
  document.querySelectorAll('.screen').forEach(s => { s.hidden = s.id !== id; });
  window.scrollTo(0, 0);
}

function route() {
  const hash = location.hash.slice(1);
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
  if (speed) {
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
    startFind();
  } else if (letters) {
    show('names-game');
    startNames(+letters[1]);
  } else if (hash === 'names') {
    show('names');
  } else if (pictures) {
    show('first-game');
    startFirst(+pictures[1]);
  } else if (hash === 'first') {
    show('first');
  } else if (level) {
    show('order-game');
    startOrder(+level[1]);
  } else if (hash === 'order') {
    show('order');
  } else if (m && LETTERS[m[1] - 1]) {
    show('trace');
    openLetter(m[1] - 1);
  } else if (hash === 'letters') {
    renderGrid();
    show('letters');
  } else if (hash === 'abc' || hash === 'numbers') {
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
$('erase-btn').addEventListener('click', () => { if (trace) openLetter(trace.idx); });
$('order-again').addEventListener('click', () => { if (order) startOrder(order.level); });
$('first-again').addEventListener('click', () => { if (first) startFirst(first.level); });
$('first-speak').addEventListener('click', sayFirstLetter);
$('first-letter').addEventListener('click', sayFirstLetter);
$('first-choices').addEventListener('click', e => {
  const btn = e.target.closest('.pic');
  if (btn) pickFirst(btn);
});
$('names-again').addEventListener('click', () => { if (names) startNames(names.level); });
$('names-speak').addEventListener('click', sayName);
$('names-cards').addEventListener('click', e => {
  const btn = e.target.closest('.namecard');
  if (btn) pickName(btn);
});
$('find-again').addEventListener('click', () => { if (find) startFind(); });
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
$('speak-btn').addEventListener('click', () => {
  if (trace) play(letterAudio(trace.idx), LETTERS[trace.idx].name);
});
window.addEventListener('hashchange', route);
route();
