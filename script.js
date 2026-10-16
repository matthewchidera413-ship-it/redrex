/* ── Us 🌙 — Long Distance Love Site (Dark + More Games) ── */

const STORAGE_KEYS = {
  names: 'lusso_names',
  photos: 'lusso_photos',
  events: 'lusso_events',
  messages: 'lusso_messages',
  notes: 'lusso_notes',
  ttt: 'lusso_ttt',
  streak: 'lusso_streak',
  lastActive: 'lusso_last_active',
  monthlyLove: 'lusso_monthly_love',
  ourSong: 'lusso_our_song',
  weatherMe: 'lusso_weather_me',
  weatherPartner: 'lusso_weather_partner',
  qotdAnswers: 'lusso_qotd_answers',
  rps: 'lusso_rps',
  memory: 'lusso_memory',
};

let state = {
  me: 'You',
  partner: 'Love',
};

const QOTD_QUESTIONS = [
  "What's your favorite memory of us so far?",
  "If I could visit you tomorrow, what's the first thing we'd do?",
  "What song reminds you of me?",
  "What do you miss most about me?",
  "Where do you want us to travel together someday?",
  "What's something you've never told me but want to now?",
  "Describe me in three words.",
  "What's your dream date with me?",
  "When did you first realize you liked me?",
  "What's one thing you're grateful for about me today?",
];

const DAILY_QUOTES = [
  { q: "Distance means so little when someone means so much.", a: "— Us" },
  { q: "I carry your heart with me, wherever I go.", a: "— E.E. Cummings" },
  { q: "Love knows no distance; it hath no continent; its eyes are for the stars.", a: "— Gilbert Parker" },
  { q: "Missing you is my heart's way of reminding me that I love you.", a: "— Us" },
  { q: "Every mile between us is worth it when I get to see you.", a: "— Us" },
  { q: "Love is missing someone whenever you're apart, but feeling warm inside because you're close in heart.", a: "— Kay Knudsen" },
  { q: "True love doesn't mean being inseparable; it means being separated and nothing changes.", a: "— Us" },
  { q: "The scariest thing about distance is that you don't know if they'll miss you or forget you.", a: "— Nicholas Sparks" },
  { q: "I fall in love with you a little more every day, even from afar.", a: "— Us" },
  { q: "Absence sharpens love, presence strengthens it.", a: "— Thomas Fuller" },
  { q: "I miss you in waves and tonight I'm drowning.", a: "— Us" },
  { q: "Love is the bridge between you and everything.", a: "— Rumi" },
  { q: "No matter the distance, you're always in my thoughts and in my heart.", a: "— Us" },
  { q: "Being far apart doesn't mean loving any less; it means loving more deeply.", a: "— Us" },
  { q: "A thousand miles means nothing when we're connected at the heart.", a: "— Us" },
];

const TRIVIA_QUESTIONS = [
  { q: "What's my favorite color?", options: ["Pink", "Blue", "Purple", "Red"], answer: 0 },
  { q: "What's my go-to comfort food?", options: ["Pizza", "Ice cream", "Chocolate", "Pasta"], answer: 1 },
  { q: "Where did we first meet?", options: ["Online", "School", "Work", "A café"], answer: 0 },
  { q: "What's my favorite season?", options: ["Winter", "Spring", "Summer", "Autumn"], answer: 2 },
  { q: "What's my hidden talent?", options: ["Singing", "Drawing", "Cooking", "Dancing"], answer: 0 },
  { q: "What's my dream travel destination?", options: ["Paris", "Tokyo", "Bali", "New York"], answer: 1 },
  { q: "What's my favorite movie genre?", options: ["Romance", "Horror", "Action", "Comedy"], answer: 0 },
  { q: "What time do I usually wake up?", options: ["6 AM", "8 AM", "10 AM", "12 PM"], answer: 1 },
  { q: "What's my favorite drink?", options: ["Coffee", "Tea", "Smoothie", "Water"], answer: 0 },
  { q: "What's my love language?", options: ["Words", "Touch", "Gifts", "Time"], answer: 0 },
];

const LOVE_DICE_ACTIONS = [
  "Send a voice message saying 'I miss you'",
  "Plan your next virtual date night",
  "Share a photo of what you're doing right now",
  "Write a love letter (even a short one)",
  "Watch the same movie at the same time",
  "Tell each other one thing you love about the other",
  "Send a selfie with a funny face",
  "Share a song that reminds you of them",
  "Say 'good morning' with a heart emoji",
  "Share your favorite memory of us",
];

const MEMORY_SYMBOLS = ['❤️', '🌙', '⭐', '💋', '💌', '🎁', '🌹', '🔑'];

const SECTION_TITLES = {
  home: 'Home',
  stats: 'Our Stats',
  lovemeter: 'Love Meter',
  gallery: 'Gallery',
  countdown: 'Celebrations',
  chat: 'Chat',
  games: 'Games',
  music: 'Our Song',
  weather: 'Weather',
  notes: 'Love Notes',
  more: 'More',
};

// ── Love bubbles from an element ──
function spawnLoveBubbles(element, count = 8) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  const hearts = ['💕', '💖', '💗', '💘', '💞', '💟'];
  const container = document.getElementById('loveBubbles');
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'love-bubble';
    b.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    b.style.left = startX + 'px';
    b.style.top = startY + 'px';
    const tx = (Math.random() - 0.5) * 120;
    b.style.setProperty('--tx', tx + 'px');
    b.style.animationDelay = (i * 0.08) + 's';
    container.appendChild(b);
    setTimeout(() => b.remove(), 2600);
  }
}

// ── day / night icon ──
function updateDayNightIcon() {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 18; // 6pm–6am

  const headerBtn = document.querySelector('.header-left .icon-btn');
  const heroVisual = document.querySelector('.couple-placeholder');

  if (headerBtn) {
    headerBtn.textContent = isNight ? '🌙❤️' : '☀️❤️';
    headerBtn.setAttribute('aria-label', isNight ? 'Night mode' : 'Day mode');
    headerBtn.onclick = (e) => {
      e.preventDefault();
      spawnLoveBubbles(headerBtn, 10);
      showSection('home');
    };
  }
  if (heroVisual) {
    heroVisual.textContent = isNight ? '🌙' : '☀️';
  }

  // Update greeting emoji on Home
  const homeTitle = document.getElementById('homeTitle');
  if (homeTitle) {
    homeTitle.innerHTML = `Missing you, <span id="homePartnerName">${state.partner}</span> ${isNight ? '🌙' : '☀️'}`;
  }
}

// ── init ──
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateDayNightIcon();
  updateStreak();
  renderAll();
  startHeartBackground();
  setInterval(renderCountdowns, 1000);
  setInterval(updateDayNightIcon, 60000); // re-check every minute
  loadOurSong();
  loadWeather();
  loadQotd();
  loadDailyQuote();
  loadTrivia();
  renderDice();
  renderRPS();
  renderMemory();
});

// ── navigation ──
function showSection(id) {
  document.querySelectorAll('.page').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  const section = document.getElementById(id);
  const tab = document.querySelector(`.tab[data-section="${id}"]`);
  if (section) section.classList.add('active');
  if (tab) tab.classList.add('active');

  const titleEl = document.getElementById('headerTitle');
  if (titleEl) titleEl.textContent = SECTION_TITLES[id] || id;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── names ──
function setNames() {
  const me = prompt("Your name:", state.me);
  if (me === null) return;
  const partner = prompt("Your partner's name:", state.partner);
  if (partner === null) return;
  state.me = me.trim() || 'You';
  state.partner = partner.trim() || 'Love';
  saveState();
  renderAll();
}

// ── streak ──
function updateStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem(STORAGE_KEYS.lastActive);
  let streak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10) || 0;
  if (last !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    streak = (last === yesterday) ? streak + 1 : 1;
    localStorage.setItem(STORAGE_KEYS.lastActive, today);
    localStorage.setItem(STORAGE_KEYS.streak, streak);
  }
  const elHome = document.getElementById('homeStreak');
  if (elHome) elHome.textContent = streak;
  const elStat = document.getElementById('statStreak');
  if (elStat) elStat.textContent = streak;
  const elLm = document.getElementById('lmStreak');
  if (elLm) elLm.textContent = streak;
  return streak;
}

function touchStreak() {
  updateStreak();
  renderAll();
}

// ── monthly love points ──
function getMonthlyLove() {
  const now = new Date();
  const monthKey = now.getFullYear() + '-' + now.getMonth();
  let data = { month: monthKey, me: 0, partner: 0 };
  const raw = localStorage.getItem(STORAGE_KEYS.monthlyLove);
  if (raw) {
    try { data = JSON.parse(raw); } catch {}
    if (data.month !== monthKey) data = { month: monthKey, me: 0, partner: 0 };
  }
  return data;
}

function addLovePoints(who, pts = 1) {
  const d = getMonthlyLove();
  if (who === 'me') d.me += pts;
  else d.partner += pts;
  localStorage.setItem(STORAGE_KEYS.monthlyLove, JSON.stringify(d));
}

function isLastDayOfMonth() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.getMonth() !== now.getMonth();
}

// ── render everything ──
function renderAll() {
  updateHome();
  renderStats();
  renderLoveMeter();
  renderGallery();
  renderCountdowns();
  renderChat();
  renderNotes();
  renderTicTacToe();
  renderDailyQuote();
  renderMusic();
  renderWeather();
}

function updateHome() {
  const photos = JSON.parse(localStorage.getItem(STORAGE_KEYS.photos) || '[]');
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.messages) || '[]');
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]');
  const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.events) || '[]');

  document.getElementById('statPhotos').textContent = photos.length;
  document.getElementById('statMessages').textContent = messages.length;
  document.getElementById('statNotes').textContent = notes.length;
  document.getElementById('statCountdowns').textContent = events.length;

  document.getElementById('homePartnerName').textContent = state.partner;

  const nextEventEl = document.getElementById('nextEvent');
  const now = Date.now();
  let upcoming = null;
  events.forEach(e => {
    const d = new Date(e.date).getTime();
    if (d >= now && (!upcoming || d < upcoming.date)) upcoming = { ...e, date: d };
  });
  if (upcoming) {
    const days = Math.ceil((upcoming.date - now) / (1000 * 60 * 60 * 24));
    nextEventEl.textContent = days === 0 ? "Today is " + upcoming.name : `in ${days} nights — ${upcoming.name}`;
  } else {
    nextEventEl.textContent = "Add your first date";
  }
}

// ── Us Stats ──
function renderStats() {
  const photos = JSON.parse(localStorage.getItem(STORAGE_KEYS.photos) || '[]');
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.messages) || '[]');
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]');
  const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.events) || '[]');
  const ttt = JSON.parse(localStorage.getItem(STORAGE_KEYS.ttt) || null) || { scoreX: 0, scoreO: 0 };
  const rps = JSON.parse(localStorage.getItem(STORAGE_KEYS.rps) || null) || { me: 0, partner: 0 };

  const mePhotos = photos.filter(p => p.owner === 'me').length;
  const partnerPhotos = photos.filter(p => p.owner === 'partner').length;
  const meMessages = messages.filter(m => m.sender === state.me).length;
  const partnerMessages = messages.filter(m => m.sender === state.partner).length;
  const meNotes = notes.filter(n => n.author === state.me).length;
  const partnerNotes = notes.filter(n => n.author === state.partner).length;

  document.getElementById('statMeName').textContent = state.me;
  document.getElementById('statPartnerName').textContent = state.partner;

  document.getElementById('statMePhotos').textContent = mePhotos;
  document.getElementById('statPartnerPhotos').textContent = partnerPhotos;
  document.getElementById('statMeMessages').textContent = meMessages;
  document.getElementById('statPartnerMessages').textContent = partnerMessages;
  document.getElementById('statMeNotes').textContent = meNotes;
  document.getElementById('statPartnerNotes').textContent = partnerNotes;
  document.getElementById('statMeGames').textContent = (ttt.scoreX || 0) + (rps.me || 0);
  document.getElementById('statPartnerGames').textContent = (ttt.scoreO || 0) + (rps.partner || 0);

  const ml = getMonthlyLove();
  document.getElementById('statMeThink').textContent = ml.me;
  document.getElementById('statPartnerThink').textContent = ml.partner;

  document.getElementById('statTogetherEvents').textContent = events.length;
}

// ── Love Meter ──
function renderLoveMeter() {
  const ml = getMonthlyLove();
  const total = ml.me + ml.partner || 1;
  const mePct = Math.round((ml.me / total) * 100);
  const partnerPct = Math.round((ml.partner / total) * 100);

  document.getElementById('lmMeName').textContent = state.me;
  document.getElementById('lmPartnerName').textContent = state.partner;
  document.getElementById('lmMePoints').textContent = ml.me;
  document.getElementById('lmPartnerPoints').textContent = ml.partner;
  document.getElementById('lmMeBar').style.width = mePct + '%';
  document.getElementById('lmPartnerBar').style.width = partnerPct + '%';

  const winnerEl = document.getElementById('lmWinner');
  const endOfMonth = isLastDayOfMonth();
  if (ml.me === 0 && ml.partner === 0) {
    winnerEl.textContent = 'No points yet this month — start sharing!';
    winnerEl.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#c3b1e1';
  } else if (endOfMonth) {
    if (ml.me > ml.partner) winnerEl.textContent = `🏆 ${state.me} loves more this month!`;
    else if (ml.partner > ml.me) winnerEl.textContent = `🏆 ${state.partner} loves more this month!`;
    else winnerEl.textContent = `🤝 It's a tie this month — you're perfectly matched!`;
    winnerEl.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ec4899';
  } else {
    if (ml.me > ml.partner) winnerEl.textContent = `❤️ ${state.me} is leading this month`;
    else if (ml.partner > ml.me) winnerEl.textContent = `❤️ ${state.partner} is leading this month`;
    else winnerEl.textContent = `🤝 It's a tie so far this month`;
    winnerEl.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#c3b1e1';
  }
}

// ── Gallery ──
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const empty = document.getElementById('galleryEmpty');
  const photos = JSON.parse(localStorage.getItem(STORAGE_KEYS.photos) || '[]');
  grid.innerHTML = '';
  if (photos.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  photos.forEach((p, i) => {
    const ownerLabel = p.owner === 'partner' ? ' • ' + state.partner : ' • ' + state.me;
    const div = document.createElement('div');
    div.className = 'photo-item';
    div.innerHTML = `
      <img src="${p.data}" alt="${escapeHtml(p.name || 'Photo')}">
      <div class="photo-owner">${ownerLabel}</div>
      <div class="photo-remove" onclick="removePhoto(${i})" title="Remove">×</div>
    `;
    grid.appendChild(div);
  });
}

window.addPhoto = function () {
  const input = document.getElementById('photoInput');
  const files = Array.from(input.files || []);
  if (files.length === 0) return;
  const photos = JSON.parse(localStorage.getItem(STORAGE_KEYS.photos) || '[]');
  let pending = files.length;
  files.forEach((file, idx) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      photos.push({ id: Date.now() + idx, name: file.name, data: e.target.result, added: Date.now(), owner: 'me' });
      pending--;
      if (pending === 0) {
        localStorage.setItem(STORAGE_KEYS.photos, JSON.stringify(photos));
        input.value = '';
        renderGallery();
        updateHome();
        renderStats();
        renderLoveMeter();
        addLovePoints('me', 2);
        touchStreak();
      }
    };
    reader.readAsDataURL(file);
  });
};

window.removePhoto = function (i) {
  if (!confirm('Remove this photo?')) return;
  const photos = JSON.parse(localStorage.getItem(STORAGE_KEYS.photos) || '[]');
  photos.splice(i, 1);
  localStorage.setItem(STORAGE_KEYS.photos, JSON.stringify(photos));
  renderGallery();
  updateHome();
  renderStats();
};

window.clearGallery = function () {
  if (!confirm('Clear all photos? This cannot be undone.')) return;
  localStorage.removeItem(STORAGE_KEYS.photos);
  renderGallery();
  updateHome();
  renderStats();
};

// ── Countdowns ──
function renderCountdowns() {
  const list = document.getElementById('countdownList');
  const empty = document.getElementById('countdownEmpty');
  const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.events) || '[]');
  list.innerHTML = '';
  if (events.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  const now = Date.now();
  events.forEach((e, i) => {
    const d = new Date(e.date).getTime();
    const diff = d - now;
    const done = diff < 0;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const div = document.createElement('div');
    div.className = 'countdown-item';
    div.innerHTML = `
      <div class="countdown-info">
        <h4>${escapeHtml(e.name)}</h4>
        <p>${done ? 'Celebrated on ' + formatDate(e.date) : formatDate(e.date)}</p>
      </div>
      <div class="countdown-timer">
        ${done ? '✨ Celebrated!' : days + 'd ' + hours + 'h ' + mins + 'm ' + secs + 's'}
      </div>
      <button class="btn-outline" style="padding:0.4rem 0.8rem;font-size:0.8rem" onclick="removeEvent(${i})">Remove</button>
    `;
    list.appendChild(div);
  });
}

window.addCountdown = function () {
  const name = document.getElementById('eventName').value.trim();
  const date = document.getElementById('eventDate').value;
  if (!name || !date) {
    alert('Please enter both a name and a date.');
    return;
  }
  const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.events) || '[]');
  events.push({ id: Date.now(), name, date });
  localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
  document.getElementById('eventName').value = '';
  document.getElementById('eventDate').value = '';
  renderCountdowns();
  updateHome();
  renderStats();
  addLovePoints('me', 1);
  touchStreak();
};

window.removeEvent = function (i) {
  if (!confirm('Remove this celebration?')) return;
  const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.events) || '[]');
  events.splice(i, 1);
  localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
  renderCountdowns();
  updateHome();
  renderStats();
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Chat ──
function renderChat() {
  const container = document.getElementById('chatMessages');
  const empty = document.getElementById('chatEmpty');
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.messages) || '[]');
  container.innerHTML = '';
  if (messages.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  const { me, partner } = state;
  messages.forEach(m => {
    const div = document.createElement('div');
    div.className = 'msg ' + (m.sender === me ? 'me' : 'them');
    div.textContent = escapeHtml(m.text);
    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = (m.sender === me ? 'You' : partner) + ' • ' + formatTime(m.time) + (m.think ? ' 💭' : '');
    div.appendChild(meta);
    container.appendChild(div);
  });
  container.scrollTop = container.scrollHeight;
}

window.sendMessage = function () {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.messages) || '[]');
  messages.push({ id: Date.now(), sender: state.me, text, time: Date.now() });
  localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
  input.value = '';
  renderChat();
  updateHome();
  renderStats();
  renderLoveMeter();
  addLovePoints('me', 2);
  touchStreak();
  const sendBtn = document.querySelector('.chat-input-area .btn-primary');
  spawnLoveBubbles(sendBtn, 6);
};

window.sendThinkingOfYou = function () {
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.messages) || '[]');
  const text = "💭 Just thinking of you… I miss you and love you!";
  messages.push({ id: Date.now(), sender: state.me, text, time: Date.now(), think: true });
  localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
  renderChat();
  updateHome();
  renderStats();
  renderLoveMeter();
  addLovePoints('me', 5);
  touchStreak();
  showSection('chat');
  const sendBtn = document.querySelector('.chat-input-area .btn-primary');
  spawnLoveBubbles(sendBtn, 10);
};

document.getElementById('chatInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

// ── Love Notes ──
function renderNotes() {
  const list = document.getElementById('notesList');
  const empty = document.getElementById('notesEmpty');
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]');
  list.innerHTML = '';
  if (notes.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  notes.forEach((n, i) => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `
      <div class="note-header">
        <span class="note-author">${escapeHtml(n.author || 'Someone')}</span>
        <span class="note-date">${formatTime(n.time)}</span>
      </div>
      <div class="note-body">${escapeHtml(n.text)}</div>
      <button class="note-delete" onclick="removeNote(${i})" title="Remove">×</button>
    `;
    list.appendChild(div);
  });
}

window.addLoveNote = function () {
  const author = document.getElementById('noteAuthor').value.trim() || state.me;
  const text = document.getElementById('noteText').value.trim();
  if (!text) {
    alert('Write something sweet first!');
    return;
  }
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]');
  notes.push({ id: Date.now(), author, text, time: Date.now() });
  localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes));
  document.getElementById('noteAuthor').value = '';
  document.getElementById('noteText').value = '';
  renderNotes();
  updateHome();
  renderStats();
  renderLoveMeter();
  if (author === state.me) addLovePoints('me', 3);
  else addLovePoints('partner', 3);
  touchStreak();
};

window.removeNote = function (i) {
  if (!confirm('Remove this note?')) return;
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]');
  notes.splice(i, 1);
  localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes));
  renderNotes();
  updateHome();
  renderStats();
};

// ── Tic Tac Toe ──
let ttt = { board: Array(9).fill(null), turn: 'X', scoreX: 0, scoreO: 0, gameOver: false, winner: null };

function renderTicTacToe() {
  const saved = localStorage.getItem(STORAGE_KEYS.ttt);
  if (saved) ttt = JSON.parse(saved);
  const board = document.getElementById('tttBoard');
  board.innerHTML = '';
  ttt.board.forEach((cell, i) => {
    const div = document.createElement('div');
    div.className = 'ttt-cell ' + (cell ? (cell === 'X' ? 'x' : 'o') : '') + (cell ? ' taken' : '');
    div.textContent = cell || '';
    if (!cell && !ttt.gameOver) div.onclick = () => handleTttMove(i);
    board.appendChild(div);
  });
  document.getElementById('tttTurn').textContent = ttt.gameOver ? 'Game over' : ttt.turn;
  document.getElementById('tttStatus').textContent = ttt.gameOver
    ? (ttt.winner ? '🎉 ' + ttt.winner + ' wins!' : "It's a draw!")
    : `Your turn, ${ttt.turn === 'X' ? '❌' : '⭕'}`;
  document.getElementById('scoreX').textContent = ttt.scoreX;
  document.getElementById('scoreO').textContent = ttt.scoreO;
}

window.handleTttMove = function (i) {
  if (ttt.board[i] || ttt.gameOver) return;
  const player = ttt.turn;
  ttt.board[i] = player;
  if (checkWin(ttt.board, player)) {
    ttt.gameOver = true;
    ttt.winner = player === 'X' ? '❌' : '⭕';
    if (player === 'X') ttt.scoreX++; else ttt.scoreO++;
    addLovePoints(player === 'X' ? 'me' : 'partner', 5);
  } else if (ttt.board.every(c => c)) {
    ttt.gameOver = true;
    ttt.winner = null;
  } else {
    ttt.turn = player === 'X' ? 'O' : 'X';
  }
  localStorage.setItem(STORAGE_KEYS.ttt, JSON.stringify(ttt));
  renderTicTacToe();
  touchStreak();
};

window.resetTicTacToe = function () {
  ttt.board = Array(9).fill(null);
  ttt.turn = 'X';
  ttt.gameOver = false;
  ttt.winner = null;
  localStorage.setItem(STORAGE_KEYS.ttt, JSON.stringify(ttt));
  renderTicTacToe();
};

function checkWin(b, p) {
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  return wins.some(w => w.every(i => b[i] === p));
}

// ── Love Calculator ──
window.calcLove = function () {
  const n1 = document.getElementById('lcName1').value.trim() || state.me;
  const n2 = document.getElementById('lcName2').value.trim() || state.partner;
  const resultEl = document.getElementById('lcResult');
  if (!n1 || !n2) {
    resultEl.textContent = 'Enter both names first!';
    return;
  }
  let sum = 0;
  const combined = (n1 + n2).toLowerCase();
  for (let i = 0; i < combined.length; i++) sum += combined.charCodeAt(i);
  const score = (sum % 101);

  let message = '';
  if (score >= 90) message = 'Soulmates! 💍';
  else if (score >= 75) message = 'Very strong love 💖';
  else if (score >= 60) message = 'Great match 💕';
  else if (score >= 40) message = 'Good potential 💗';
  else message = 'Opposites attract! 🌙';

  resultEl.innerHTML = `<strong>${escapeHtml(n1)} + ${escapeHtml(n2)}</strong><br>${score}% — ${message}`;
  touchStreak();
};

// ── Question of the Day ──
function loadQotd() {
  const now = new Date();
  const dayIndex = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const q = QOTD_QUESTIONS[dayIndex % QOTD_QUESTIONS.length];
  document.getElementById('qotdText').textContent = q;

  const answers = JSON.parse(localStorage.getItem(STORAGE_KEYS.qotdAnswers) || '{}');
  const key = now.toDateString();
  if (answers[key]) {
    document.getElementById('qotdSaved').textContent = 'Your answer: ' + escapeHtml(answers[key]);
    document.getElementById('qotdInput').value = answers[key];
  } else {
    document.getElementById('qotdSaved').textContent = '';
    document.getElementById('qotdInput').value = '';
  }
}

window.saveQotdAnswer = function () {
  const input = document.getElementById('qotdInput');
  const text = input.value.trim();
  if (!text) {
    alert('Type your answer first!');
    return;
  }
  const now = new Date();
  const key = now.toDateString();
  const answers = JSON.parse(localStorage.getItem(STORAGE_KEYS.qotdAnswers) || '{}');
  answers[key] = text;
  localStorage.setItem(STORAGE_KEYS.qotdAnswers, JSON.stringify(answers));
  document.getElementById('qotdSaved').textContent = 'Your answer saved!';
  touchStreak();
};

// ── Daily Love Quote ──
let dailyQuoteIndex = 0;

function loadDailyQuote() {
  const now = new Date();
  const dayIndex = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  dailyQuoteIndex = dayIndex % DAILY_QUOTES.length;
  renderDailyQuote();
}

function renderDailyQuote() {
  const quote = DAILY_QUOTES[dailyQuoteIndex];
  const textEl = document.getElementById('dailyQuote');
  const authorEl = document.getElementById('dailyQuoteAuthor');
  if (textEl) textEl.textContent = quote.q;
  if (authorEl) authorEl.textContent = quote.a;
}

window.newDailyQuote = function () {
  dailyQuoteIndex = Math.floor(Math.random() * DAILY_QUOTES.length);
  renderDailyQuote();
  touchStreak();
};

// ── Couple Trivia ──
let trivia = { current: null, answered: false };

function loadTrivia() {
  const q = TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)];
  trivia = { current: q, answered: false };
  const container = document.getElementById('triviaContainer');
  const result = document.getElementById('triviaResult');
  result.textContent = '';
  container.innerHTML = `<p style="font-weight:600;color:var(--accent-light);margin-bottom:0.75rem;">${escapeHtml(q.q)}</p>
    <div class="trivia-options">
      ${q.options.map((opt, i) => `<button class="trivia-option" onclick="answerTrivia(${i})">${escapeHtml(opt)}</button>`).join('')}
    </div>`;
}

window.answerTrivia = function (i) {
  if (trivia.answered) return;
  trivia.answered = true;
  const result = document.getElementById('triviaResult');
  const options = document.querySelectorAll('.trivia-option');
  options.forEach((opt, idx) => {
    opt.classList.add('disabled');
    if (idx === trivia.current.answer) opt.classList.add('selected');
    if (idx === i && idx !== trivia.current.answer) opt.style.color = '#f87171';
  });
  if (i === trivia.current.answer) {
    result.textContent = 'Correct! ❤️ You know them well.';
    result.className = 'trivia-result correct';
    addLovePoints('me', 3);
  } else {
    result.textContent = `Not quite. The answer was: ${trivia.current.options[trivia.current.answer]}.`;
    result.className = 'trivia-result wrong';
  }
  touchStreak();
};

// ── Love Dice ──
function renderDice() {
  document.getElementById('diceDisplay').textContent = '❓ ❓';
  document.getElementById('diceMeaning').textContent = '';
}

window.rollDice = function () {
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const diceEls = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' };
  document.getElementById('diceDisplay').textContent = diceEls[d1] + ' ' + diceEls[d2];
  const action = LOVE_DICE_ACTIONS[Math.floor(Math.random() * LOVE_DICE_ACTIONS.length)];
  document.getElementById('diceMeaning').textContent = action;
  addLovePoints('me', 1);
  touchStreak();
};

// ── Rock Paper Scissors ──
let rps = { me: 0, partner: 0, waiting: false };

function renderRPS() {
  const saved = localStorage.getItem(STORAGE_KEYS.rps);
  if (saved) rps = JSON.parse(saved);
  document.getElementById('rpsScore').textContent = `You: ${rps.me} | ${state.partner}: ${rps.partner}`;
  document.getElementById('rpsResult').textContent = '';
  document.getElementById('rpsStatus').textContent = 'Pick your move!';
}

window.playRPS = function (playerMove) {
  if (rps.waiting) return;
  rps.waiting = true;
  const moves = ['rock', 'paper', 'scissors'];
  const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
  const partnerMove = moves[Math.floor(Math.random() * moves.length)];

  document.getElementById('rpsStatus').textContent = `You: ${emojis[playerMove]}  ${state.partner}: ${emojis[partnerMove]}`;

  let result = '';
  if (playerMove === partnerMove) {
    result = "It's a tie! 🤝";
  } else if (
    (playerMove === 'rock' && partnerMove === 'scissors') ||
    (playerMove === 'paper' && partnerMove === 'rock') ||
    (playerMove === 'scissors' && partnerMove === 'paper')
  ) {
    result = 'You win this round! ❤️';
    rps.me++;
    addLovePoints('me', 3);
  } else {
    result = `${state.partner} wins this round! 💕`;
    rps.partner++;
    addLovePoints('partner', 3);
  }

  const resultEl = document.getElementById('rpsResult');
  resultEl.textContent = result;
  resultEl.className = 'rps-result';
  resultEl.offsetHeight; // trigger reflow
  resultEl.classList.add('animate');
  document.getElementById('rpsScore').textContent = `You: ${rps.me} | ${state.partner}: ${rps.partner}`;
  localStorage.setItem(STORAGE_KEYS.rps, JSON.stringify(rps));

  setTimeout(() => { rps.waiting = false; }, 1200);
  touchStreak();
};

window.resetRPS = function () {
  rps.me = 0;
  rps.partner = 0;
  localStorage.setItem(STORAGE_KEYS.rps, JSON.stringify(rps));
  renderRPS();
};

// ── Memory Match ──
let memory = { cards: [], flipped: [], matched: 0, moves: 0, locked: false };

function renderMemory() {
  const saved = localStorage.getItem(STORAGE_KEYS.memory);
  if (saved) {
    try { memory = JSON.parse(saved); } catch {}
  }
  if (!memory.cards || memory.cards.length === 0) {
    resetMemory();
    return;
  }
  const board = document.getElementById('memoryBoard');
  board.innerHTML = '';
  memory.cards.forEach((card, i) => {
    const div = document.createElement('div');
    div.className = 'memory-cell' + (card.matched ? ' matched' : '') + (card.flipped ? ' flipped' : '');
    div.textContent = (card.flipped || card.matched) ? card.symbol : '';
    if (!card.matched && !card.flipped && !memory.locked) div.onclick = () => flipMemory(i);
    board.appendChild(div);
  });
  document.getElementById('memoryStats').textContent = `Moves: ${memory.moves} | Pairs: ${memory.matched}/8`;
}

window.resetMemory = function () {
  const symbols = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS];
  symbols.sort(() => Math.random() - 0.5);
  memory = {
    cards: symbols.map(s => ({ symbol: s, flipped: false, matched: false })),
    flipped: [],
    matched: 0,
    moves: 0,
    locked: false,
  };
  localStorage.setItem(STORAGE_KEYS.memory, JSON.stringify(memory));
  renderMemory();
};

window.flipMemory = function (i) {
  if (memory.locked) return;
  const card = memory.cards[i];
  if (card.flipped || card.matched) return;

  card.flipped = true;
  memory.flipped.push(i);
  localStorage.setItem(STORAGE_KEYS.memory, JSON.stringify(memory));
  renderMemory();

  if (memory.flipped.length === 2) {
    memory.locked = true;
    memory.moves++;
    const [a, b] = memory.flipped;
    if (memory.cards[a].symbol === memory.cards[b].symbol) {
      memory.cards[a].matched = true;
      memory.cards[b].matched = true;
      memory.matched++;
      memory.flipped = [];
      memory.locked = false;
      localStorage.setItem(STORAGE_KEYS.memory, JSON.stringify(memory));
      renderMemory();
      if (memory.matched === 8) {
        setTimeout(() => alert('🎉 You found all the pairs!'), 300);
        addLovePoints('me', 5);
      }
    } else {
      setTimeout(() => {
        memory.cards[a].flipped = false;
        memory.cards[b].flipped = false;
        memory.flipped = [];
        memory.locked = false;
        localStorage.setItem(STORAGE_KEYS.memory, JSON.stringify(memory));
        renderMemory();
      }, 1000);
    }
    localStorage.setItem(STORAGE_KEYS.memory, JSON.stringify(memory));
  }
  touchStreak();
};

// ── Our Song ──
function loadOurSong() {
  const raw = localStorage.getItem(STORAGE_KEYS.ourSong);
  if (!raw) return;
  try {
    const song = JSON.parse(raw);
    document.getElementById('musicTitle').textContent = song.title || 'Our Song';
    document.getElementById('musicArtist').textContent = song.artist || '—';
    document.getElementById('musicTitleInput').value = song.title || '';
    document.getElementById('musicArtistInput').value = song.artist || '';
    document.getElementById('musicUrlInput').value = song.url || '';
    const audio = document.getElementById('musicAudio');
    if (song.url) audio.src = song.url;
  } catch {}
}

function renderMusic() {
  const raw = localStorage.getItem(STORAGE_KEYS.ourSong);
  if (!raw) {
    document.getElementById('musicTitle').textContent = 'No song yet';
    document.getElementById('musicArtist').textContent = 'Set your song below';
  }
}

window.saveOurSong = function () {
  const title = document.getElementById('musicTitleInput').value.trim();
  const artist = document.getElementById('musicArtistInput').value.trim();
  const url = document.getElementById('musicUrlInput').value.trim();
  if (!title && !artist && !url) {
    alert('Fill in at least one field.');
    return;
  }
  const song = { title, artist, url };
  localStorage.setItem(STORAGE_KEYS.ourSong, JSON.stringify(song));
  document.getElementById('musicTitle').textContent = title || 'Our Song';
  document.getElementById('musicArtist').textContent = artist || '—';
  const audio = document.getElementById('musicAudio');
  audio.src = url || '';
  touchStreak();
};

window.toggleMusic = function () {
  const audio = document.getElementById('musicAudio');
  if (!audio.src) {
    alert('Set a song URL first!');
    return;
  }
  if (audio.paused) audio.play();
  else audio.pause();
  touchStreak();
};

// ── Weather ──
function loadWeather() {
  const meRaw = localStorage.getItem(STORAGE_KEYS.weatherMe);
  const partnerRaw = localStorage.getItem(STORAGE_KEYS.weatherPartner);
  if (meRaw) {
    try {
      const w = JSON.parse(meRaw);
      document.getElementById('weatherMeCity').value = w.city || '';
      document.getElementById('weatherMeEmoji').value = w.emoji || '☀️ Sunny';
      document.getElementById('weatherMeTemp').value = w.temp || '';
      renderWeatherSide('me');
    } catch {}
  }
  if (partnerRaw) {
    try {
      const w = JSON.parse(partnerRaw);
      document.getElementById('weatherPartnerCity').value = w.city || '';
      document.getElementById('weatherPartnerEmoji').value = w.emoji || '☀️ Sunny';
      document.getElementById('weatherPartnerTemp').value = w.temp || '';
      renderWeatherSide('partner');
    } catch {}
  }
}

function renderWeatherSide(who) {
  const cityId = who === 'me' ? 'weatherMeCity' : 'weatherPartnerCity';
  const emojiId = who === 'me' ? 'weatherMeEmoji' : 'weatherPartnerEmoji';
  const tempId = who === 'me' ? 'weatherMeTemp' : 'weatherPartnerTemp';
  const displayId = who === 'me' ? 'weatherMeDisplay' : 'weatherPartnerDisplay';

  const city = document.getElementById(cityId).value.trim();
  const emoji = document.getElementById(emojiId).value.split(' ')[0];
  const temp = document.getElementById(tempId).value.trim();

  const display = document.getElementById(displayId);
  display.innerHTML = `
    <span class="weather-emoji">${emoji}</span>
    <span class="weather-city">${city || '—'}</span>
    <span class="weather-temp">${temp || '—'}</span>
  `;
}

window.saveWeather = function () {
  const me = {
    city: document.getElementById('weatherMeCity').value.trim(),
    emoji: document.getElementById('weatherMeEmoji').value,
    temp: document.getElementById('weatherMeTemp').value.trim(),
  };
  const partner = {
    city: document.getElementById('weatherPartnerCity').value.trim(),
    emoji: document.getElementById('weatherPartnerEmoji').value,
    temp: document.getElementById('weatherPartnerTemp').value.trim(),
  };
  localStorage.setItem(STORAGE_KEYS.weatherMe, JSON.stringify(me));
  localStorage.setItem(STORAGE_KEYS.weatherPartner, JSON.stringify(partner));
  renderWeatherSide('me');
  renderWeatherSide('partner');
  touchStreak();
};

window.renderWeatherSide = renderWeatherSide;

// ── Export / Import ──
window.exportData = function () {
  const data = {};
  const keysToSave = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('lusso_')) {
      keysToSave.push(key);
    }
  }
  keysToSave.forEach((key) => {
    data[key] = localStorage.getItem(key);
  });
  data.names_state = JSON.stringify(state);

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lusso-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

window.importData = function (event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!confirm('Import will replace all current data on this phone. Continue?')) return;

      // Clear existing lusso data
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('lusso_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Import new data
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'names_state') {
          state = typeof value === 'string' ? JSON.parse(value) : value;
          localStorage.setItem(STORAGE_KEYS.names, JSON.stringify(state));
        } else {
          localStorage.setItem(key, value);
        }
      });

      renderAll();
      alert('✅ Data imported successfully!');
    } catch (err) {
      alert('❌ Invalid file. Please select a valid export file.');
    }
  };
  reader.readAsText(file);
};

// Wire up the hidden file input
document.getElementById('importFile').addEventListener('change', importData);

// ── persistence ──
function saveState() {
  localStorage.setItem(STORAGE_KEYS.names, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEYS.names);
  if (saved) {
    try { state = { ...state, ...JSON.parse(saved) }; } catch {}
  }
}

function escapeHtml(text) {
  if (!text) return text;
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── floating hearts background ──
function startHeartBackground() {
  const container = document.createElement('div');
  container.className = 'hearts-bg';
  container.id = 'heartsBg';
  document.body.insertBefore(container, document.body.firstChild);

  const heartCount = 14;
  const hearts = ['💖', '💗', '💕', '💘', '💞', '💟'];
  for (let i = 0; i < heartCount; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.top = Math.random() * 100 + 'vh';
    h.style.fontSize = (0.8 + Math.random() * 1.6) + 'rem';
    h.style.animationDuration = (3 + Math.random() * 4) + 's';
    h.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(h);
  }
}
