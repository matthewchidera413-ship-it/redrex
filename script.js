/* ── Us 🌙 — Long Distance Love Site (Supabase Synced + Bubbles + Reminders) ── */

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
  notifications: 'lusso_notifications',
  lastStreakReminder: 'lusso_last_streak_reminder',
};

const SUPABASE_URL = 'https://uymtyekjqyfscijqvprm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5bXR5ZWtqcXlmc2NpanF2cHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwODYyMTAsImV4cCI6MjEwNzY2MjIxMH0.hH_9_cCigjM7yRYF36pmzhbIo--sktaN39RP3CSZEfg';

let supabaseClient = null;
let state = { me: 'You', partner: 'Love' };

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
    setTimeout(() => { if (b.parentNode) b.parentNode.removeChild(b); }, 2600);
  }
}

// ── Celebration toast ──
function showCelebrationToast(message) {
  const toast = document.getElementById('celebrationToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

// ── Streak reminder toast ──
function showStreakReminder() {
  const reminder = document.getElementById('streakReminder');
  const text = document.getElementById('streakReminderText');
  if (!reminder || !text) return;
  const streak = parseInt(localGet(STORAGE_KEYS.streak) || '0', 10) || 0;
  text.textContent = streak > 0 ? `🔥 Your streak is ${streak} nights! Keep it going ❤️` : `🔥 Start your streak today! Send a message to ${state.partner} 💕`;
  reminder.style.display = 'block';
}

// ── Notification permission ──
let notificationsEnabled = false;

async function enableNotifications() {
  if (!('Notification' in window)) {
    alert('Notifications not supported in this browser.');
    return;
  }
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    notificationsEnabled = true;
    localSet(STORAGE_KEYS.notifications, 'true');
    document.getElementById('notifPrompt').style.display = 'none';
    showCelebrationToast('✅ Streak reminders enabled!');
  } else {
    alert('Notifications blocked. You can still see streak reminders inside the app.');
    document.getElementById('notifPrompt').style.display = 'none';
  }
}

function checkNotificationPrompt() {
  const prompt = document.getElementById('notifPrompt');
  const enabled = localGet(STORAGE_KEYS.notifications);
  if (!prompt || enabled === 'true') return;
  // Show prompt after 2 seconds on home page
  setTimeout(() => {
    if (document.getElementById('home').classList.contains('active')) {
      prompt.style.display = 'flex';
    }
  }, 2000);
}

function sendStreakNotification() {
  if (!notificationsEnabled) return;
  const streak = parseInt(localGet(STORAGE_KEYS.streak) || '0', 10) || 0;
  if (streak === 0) return;
  const title = streak === 1 ? '🔥 1-night streak!' : `🔥 ${streak}-night streak!`;
  const body = `Don't break it! Send a message to ${state.partner} today ❤️`;
  try {
    new Notification(title, { body, icon: 'icon-192.svg', badge: 'icon-192.svg' });
  } catch (e) {}
}

// ── localStorage helpers ──
function localGet(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function localSet(key, value) {
  localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
}
function localRemove(key) {
  localStorage.removeItem(key);
}

// ── Supabase helpers ──
async function supabaseGet() {
  if (!supabaseClient) return {};
  try {
    const { data, error } = await supabaseClient
      .from('app_data')
      .select('data')
      .eq('id', 1)
      .single();
    if (error || !data) return {};
    return data.data || {};
  } catch (e) { return {}; }
}

async function supabaseSet(updates) {
  if (!supabaseClient) return;
  try {
    const current = await supabaseGet();
    const next = { ...current, ...updates };
    await supabaseClient.from('app_data').upsert({
      id: 1,
      data: next,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {}
}

async function saveAllToSupabase() {
  if (!supabaseClient) return;
  const payload = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('lusso_')) {
      payload[key] = localGet(key);
    }
  }
  payload.names_state = JSON.stringify(state);
  await supabaseSet(payload);
}

// ── init ──
document.addEventListener('DOMContentLoaded', async () => {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.log('Supabase init failed, using local only');
  }

  // Load from Supabase into localStorage
  const remote = await supabaseGet();
  if (remote && Object.keys(remote).length > 0) {
    for (const [key, val] of Object.entries(remote)) {
      if (key === 'names_state') {
        try { state = JSON.parse(val); } catch {}
        localSet(STORAGE_KEYS.names, val);
      } else {
        localSet(key, typeof val === 'string' ? val : JSON.stringify(val));
      }
    }
  } else {
    const savedNames = localGet(STORAGE_KEYS.names);
    if (savedNames) {
      try { state = JSON.parse(savedNames); } catch {}
    }
  }

  // Real-time listener
  try {
    supabaseClient
      .channel('app-changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'app_data' }, async () => {
        const remote2 = await supabaseGet();
        if (remote2 && Object.keys(remote2).length > 0) {
          for (const [key, val] of Object.entries(remote2)) {
            if (key === 'names_state') {
              try { state = JSON.parse(val); } catch {}
              localSet(STORAGE_KEYS.names, val);
            } else {
              localSet(key, typeof val === 'string' ? val : JSON.stringify(val));
            }
          }
          renderAll();
        }
      })
      .subscribe();
  } catch (e) {}

  updateDayNightIcon();
  updateStreak();
  renderAll();
  startHeartBackground();
  setInterval(renderCountdowns, 1000);
  setInterval(updateDayNightIcon, 60000);
  loadOurSong();
  loadWeather();
  loadQotd();
  loadDailyQuote();
  loadTrivia();
  renderDice();
  renderRPS();
  renderMemory();

  // Streak reminder when opening app
  checkStreakReminder();
  checkNotificationPrompt();

  // ── Wire up header icon click (bubbles + home) ──
  const headerIcon = document.getElementById('headerIcon');
  if (headerIcon) {
    headerIcon.addEventListener('click', (e) => {
      e.preventDefault();
      spawnLoveBubbles(headerIcon, 10);
      showSection('home');
    });
  }

  // ── Wire up chat send button (bubbles on send) ──
  const chatSendBtn = document.getElementById('chatSendBtn');
  if (chatSendBtn) {
    chatSendBtn.onclick = (e) => {
      sendMessage();
      spawnLoveBubbles(chatSendBtn, 6);
    };
  }
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
  checkStreakReminder();
  checkNotificationPrompt();
}

// ── names ──
function setNames() {
  const me = prompt("Your name:", state.me);
  if (me === null) return;
  const partner = prompt("Your partner's name:", state.partner);
  if (partner === null) return;
  state.me = me.trim() || 'You';
  state.partner = partner.trim() || 'Love';
  localSet(STORAGE_KEYS.names, JSON.stringify(state));
  saveAllToSupabase();
  renderAll();
}

// ── streak ──
function updateStreak() {
  const today = new Date().toDateString();
  const last = localGet(STORAGE_KEYS.lastActive);
  let streak = parseInt(localGet(STORAGE_KEYS.streak) || '0', 10) || 0;
  if (last !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    streak = (last === yesterday) ? streak + 1 : 1;
    localSet(STORAGE_KEYS.lastActive, today);
    localSet(STORAGE_KEYS.streak, streak);
  }
  const elHome = document.getElementById('homeStreak');
  if (elHome) elHome.textContent = streak;
  const elStat = document.getElementById('statStreak');
  if (elStat) elStat.textContent = streak;
  const elLm = document.getElementById('lmStreak');
  if (elLm) elLm.textContent = streak;
  const elChat = document.getElementById('chatStreak');
  if (elChat) elChat.textContent = streak;
  return streak;
}

function touchStreak() {
  updateStreak();
  renderAll();
  saveAllToSupabase();
  checkStreakReminder();
}

// ── Check streak reminder once per day ──
function checkStreakReminder() {
  const today = new Date().toDateString();
  const lastReminder = localGet(STORAGE_KEYS.lastStreakReminder);
  if (lastReminder === today) return;
  localSet(STORAGE_KEYS.lastStreakReminder, today);
  showStreakReminder();
}

// ── monthly love points ──
function getMonthlyLove() {
  const now = new Date();
  const monthKey = now.getFullYear() + '-' + now.getMonth();
  let data = { month: monthKey, me: 0, partner: 0 };
  const raw = localGet(STORAGE_KEYS.monthlyLove);
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
  localSet(STORAGE_KEYS.monthlyLove, d);
  saveAllToSupabase();
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
  renderMusic();
  renderWeather();
}

function updateHome() {
  const photos = localGet(STORAGE_KEYS.photos) || [];
  const messages = localGet(STORAGE_KEYS.messages) || [];
  const notes = localGet(STORAGE_KEYS.notes) || [];
  const events = localGet(STORAGE_KEYS.events) || [];

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
  const photos = localGet(STORAGE_KEYS.photos) || [];
  const messages = localGet(STORAGE_KEYS.messages) || [];
  const notes = localGet(STORAGE_KEYS.notes) || [];
  const events = localGet(STORAGE_KEYS.events) || [];
  const ttt = localGet(STORAGE_KEYS.ttt) || { scoreX: 0, scoreO: 0 };
  const rps = localGet(STORAGE_KEYS.rps) || { me: 0, partner: 0 };

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
    const heartBtn = document.getElementById('headerIcon');
    if (heartBtn) spawnLoveBubbles(heartBtn, 15);
    showCelebrationToast(`🏆 Month Winner: ${ml.me > ml.partner ? state.me : ml.partner > ml.me ? state.partner : 'Tie!'}`);
  } else {
    if (ml.me > ml.partner) winnerEl.textContent = `❤️ ${state.me} is leading this month`;
    else if (ml.partner > ml.me) winnerEl.textContent = `❤️ ${state.partner} is leading this month`;
    else winnerEl.textContent = `🤝 It's a tie so far this month`;
    winnerEl.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#c3b1e1';
  }
}

// ── Daily Love Quote ──
let dailyQuoteIndex = 0;

function loadDailyQuote() {
  try {
    const now = new Date();
    const dayIndex = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    dailyQuoteIndex = dayIndex % DAILY_QUOTES.length;
    renderDailyQuote();
  } catch (e) {
    const textEl = document.getElementById('dailyQuote');
    const authorEl = document.getElementById('dailyQuoteAuthor');
    if (textEl) textEl.textContent = "Distance means so little when someone means so much.";
    if (authorEl) authorEl.textContent = "— Us";
  }
}

function renderDailyQuote() {
  try {
    const quote = DAILY_QUOTES[dailyQuoteIndex % DAILY_QUOTES.length];
    const textEl = document.getElementById('dailyQuote');
    const authorEl = document.getElementById('dailyQuoteAuthor');
    if (textEl) textEl.textContent = quote.q;
    if (authorEl) authorEl.textContent = quote.a;
  } catch (e) {
    const textEl = document.getElementById('dailyQuote');
    const authorEl = document.getElementById('dailyQuoteAuthor');
    if (textEl) textEl.textContent = "Distance means so little when someone means so much.";
    if (authorEl) authorEl.textContent = "— Us";
  }
}

window.newDailyQuote = function () {
  try {
    dailyQuoteIndex = Math.floor(Math.random() * DAILY_QUOTES.length);
    renderDailyQuote();
    touchStreak();
    saveAllToSupabase();
  } catch (e) {}
};

// ── Gallery ──
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const empty = document.getElementById('galleryEmpty');
  const photos = localGet(STORAGE_KEYS.photos) || [];
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

window.addPhoto = async function () {
  const input = document.getElementById('photoInput');
  const files = Array.from(input.files || []);
  if (files.length === 0) return;
  const photos = localGet(STORAGE_KEYS.photos) || [];
  let pending = files.length;
  files.forEach((file, idx) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      photos.push({ id: Date.now() + idx, name: file.name, data: e.target.result, added: Date.now(), owner: 'me' });
      pending--;
      if (pending === 0) {
        localSet(STORAGE_KEYS.photos, photos);
        input.value = '';
        renderGallery();
        updateHome();
        renderStats();
        renderLoveMeter();
        addLovePoints('me', 2);
        touchStreak();
        saveAllToSupabase();
      }
    };
    reader.readAsDataURL(file);
  });
};

window.removePhoto = function (i) {
  if (!confirm('Remove this photo?')) return;
  const photos = localGet(STORAGE_KEYS.photos) || [];
  photos.splice(i, 1);
  localSet(STORAGE_KEYS.photos, photos);
  renderGallery();
  updateHome();
  renderStats();
  saveAllToSupabase();
};

window.clearGallery = function () {
  if (!confirm('Clear all photos? This cannot be undone.')) return;
  localRemove(STORAGE_KEYS.photos);
  renderGallery();
  updateHome();
  renderStats();
  saveAllToSupabase();
};

// ── Countdowns ──
function renderCountdowns() {
  const list = document.getElementById('countdownList');
  const empty = document.getElementById('countdownEmpty');
  const events = localGet(STORAGE_KEYS.events) || [];
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

window.addCountdown = async function () {
  const name = document.getElementById('eventName').value.trim();
  const date = document.getElementById('eventDate').value;
  if (!name || !date) {
    alert('Please enter both a name and a date.');
    return;
  }
  const events = localGet(STORAGE_KEYS.events) || [];
  events.push({ id: Date.now(), name, date });
  localSet(STORAGE_KEYS.events, events);
  document.getElementById('eventName').value = '';
  document.getElementById('eventDate').value = '';
  renderCountdowns();
  updateHome();
  renderStats();
  addLovePoints('me', 1);
  touchStreak();
  saveAllToSupabase();
  showCelebrationToast(`🎉 Celebration added: ${name}!`);
};

window.removeEvent = function (i) {
  if (!confirm('Remove this celebration?')) return;
  const events = localGet(STORAGE_KEYS.events) || [];
  events.splice(i, 1);
  localSet(STORAGE_KEYS.events, events);
  renderCountdowns();
  updateHome();
  renderStats();
  saveAllToSupabase();
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Chat ──
function renderChat() {
  const container = document.getElementById('chatMessages');
  const empty = document.getElementById('chatEmpty');
  const messages = localGet(STORAGE_KEYS.messages) || [];
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

window.sendMessage = async function () {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const messages = localGet(STORAGE_KEYS.messages) || [];
  messages.push({ id: Date.now(), sender: state.me, text, time: Date.now() });
  localSet(STORAGE_KEYS.messages, messages);
  input.value = '';
  renderChat();
  updateHome();
  renderStats();
  renderLoveMeter();
  addLovePoints('me', 2);
  touchStreak();
  saveAllToSupabase();
};

window.sendThinkingOfYou = async function () {
  const messages = localGet(STORAGE_KEYS.messages) || [];
  const text = "💭 Just thinking of you… I miss you and love you!";
  messages.push({ id: Date.now(), sender: state.me, text, time: Date.now(), think: true });
  localSet(STORAGE_KEYS.messages, messages);
  renderChat();
  updateHome();
  renderStats();
  renderLoveMeter();
  addLovePoints('me', 5);
  touchStreak();
  saveAllToSupabase();
  showSection('chat');
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
  const notes = localGet(STORAGE_KEYS.notes) || [];
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

window.addLoveNote = async function () {
  const author = document.getElementById('noteAuthor').value.trim() || state.me;
  const text = document.getElementById('noteText').value.trim();
  if (!text) {
    alert('Write something sweet first!');
    return;
  }
  const notes = localGet(STORAGE_KEYS.notes) || [];
  notes.push({ id: Date.now(), author, text, time: Date.now() });
  localSet(STORAGE_KEYS.notes, notes);
  document.getElementById('noteAuthor').value = '';
  document.getElementById('noteText').value = '';
  renderNotes();
  updateHome();
  renderStats();
  renderLoveMeter();
  if (author === state.me) addLovePoints('me', 3);
  else addLovePoints('partner', 3);
  touchStreak();
  saveAllToSupabase();
};

window.removeNote = function (i) {
  if (!confirm('Remove this note?')) return;
  const notes = localGet(STORAGE_KEYS.notes) || [];
  notes.splice(i, 1);
  localSet(STORAGE_KEYS.notes, notes);
  renderNotes();
  updateHome();
  renderStats();
  saveAllToSupabase();
};

// ── Tic Tac Toe ──
let ttt = { board: Array(9).fill(null), turn: 'X', scoreX: 0, scoreO: 0, gameOver: false, winner: null };

function renderTicTacToe() {
  const saved = localGet(STORAGE_KEYS.ttt);
  if (saved) ttt = saved;
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

window.handleTttMove = async function (i) {
  if (ttt.board[i] || ttt.gameOver) return;
  const player = ttt.turn;
  ttt.board[i] = player;
  if (checkWin(ttt.board, player)) {
    ttt.gameOver = true;
    ttt.winner = player === 'X' ? '❌' : '⭕';
    if (player === 'X') ttt.scoreX++; else ttt.scoreO++;
    addLovePoints(player === 'X' ? 'me' : 'partner', 5);
    const headerIcon = document.getElementById('headerIcon');
    if (headerIcon) spawnLoveBubbles(headerIcon, 12);
    showCelebrationToast(`🎉 ${ttt.winner} wins!`);
  } else if (ttt.board.every(c => c)) {
    ttt.gameOver = true;
    ttt.winner = null;
    showCelebrationToast("🤝 It's a draw!");
  } else {
    ttt.turn = player === 'X' ? 'O' : 'X';
  }
  localSet(STORAGE_KEYS.ttt, ttt);
  renderTicTacToe();
  touchStreak();
  saveAllToSupabase();
};

window.resetTicTacToe = function () {
  ttt.board = Array(9).fill(null);
  ttt.turn = 'X';
  ttt.gameOver = false;
  ttt.winner = null;
  localSet(STORAGE_KEYS.ttt, ttt);
  renderTicTacToe();
  saveAllToSupabase();
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
  saveAllToSupabase();
};

// ── Question of the Day ──
function loadQotd() {
  try {
    const now = new Date();
    const dayIndex = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const q = QOTD_QUESTIONS[dayIndex % QOTD_QUESTIONS.length];
    document.getElementById('qotdText').textContent = q;

    const answers = localGet(STORAGE_KEYS.qotdAnswers) || {};
    const key = now.toDateString();
    if (answers[key]) {
      document.getElementById('qotdSaved').textContent = 'Your answer: ' + escapeHtml(answers[key]);
      document.getElementById('qotdInput').value = answers[key];
    } else {
      document.getElementById('qotdSaved').textContent = '';
      document.getElementById('qotdInput').value = '';
    }
  } catch (e) {}
}

window.saveQotdAnswer = async function () {
  const input = document.getElementById('qotdInput');
  const text = input.value.trim();
  if (!text) {
    alert('Type your answer first!');
    return;
  }
  const now = new Date();
  const key = now.toDateString();
  const answers = localGet(STORAGE_KEYS.qotdAnswers) || {};
  answers[key] = text;
  localSet(STORAGE_KEYS.qotdAnswers, answers);
  document.getElementById('qotdSaved').textContent = 'Your answer saved!';
  touchStreak();
  saveAllToSupabase();
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

window.answerTrivia = async function (i) {
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
    const headerIcon = document.getElementById('headerIcon');
    if (headerIcon) spawnLoveBubbles(headerIcon, 8);
  } else {
    result.textContent = `Not quite. The answer was: ${trivia.current.options[trivia.current.answer]}.`;
    result.className = 'trivia-result wrong';
  }
  touchStreak();
  saveAllToSupabase();
};

// ── Love Dice ──
function renderDice() {
  document.getElementById('diceDisplay').textContent = '❓ ❓';
  document.getElementById('diceMeaning').textContent = '';
}

window.rollDice = async function () {
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const diceEls = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' };
  document.getElementById('diceDisplay').textContent = diceEls[d1] + ' ' + diceEls[d2];
  const action = LOVE_DICE_ACTIONS[Math.floor(Math.random() * LOVE_DICE_ACTIONS.length)];
  document.getElementById('diceMeaning').textContent = action;
  addLovePoints('me', 1);
  touchStreak();
  saveAllToSupabase();
};

// ── Rock Paper Scissors ──
let rps = { me: 0, partner: 0, waiting: false };

function renderRPS() {
  const saved = localGet(STORAGE_KEYS.rps);
  if (saved) rps = saved;
  document.getElementById('rpsScore').textContent = `You: ${rps.me} | ${state.partner}: ${rps.partner}`;
  document.getElementById('rpsResult').textContent = '';
  document.getElementById('rpsStatus').textContent = 'Pick your move!';
}

window.playRPS = async function (playerMove) {
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
    const headerIcon = document.getElementById('headerIcon');
    if (headerIcon) spawnLoveBubbles(headerIcon, 8);
  } else {
    result = `${state.partner} wins this round! 💕`;
    rps.partner++;
    addLovePoints('partner', 3);
  }

  const resultEl = document.getElementById('rpsResult');
  resultEl.textContent = result;
  resultEl.className = 'rps-result';
  resultEl.offsetHeight;
  resultEl.classList.add('animate');
  document.getElementById('rpsScore').textContent = `You: ${rps.me} | ${state.partner}: ${rps.partner}`;
  localSet(STORAGE_KEYS.rps, rps);

  setTimeout(() => { rps.waiting = false; }, 1200);
  touchStreak();
  saveAllToSupabase();
};

window.resetRPS = function () {
  rps.me = 0;
  rps.partner = 0;
  localSet(STORAGE_KEYS.rps, rps);
  renderRPS();
  saveAllToSupabase();
};

// ── Memory Match ──
let memory = { cards: [], flipped: [], matched: 0, moves: 0, locked: false };

function renderMemory() {
  const saved = localGet(STORAGE_KEYS.memory);
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
  localSet(STORAGE_KEYS.memory, memory);
  renderMemory();
  saveAllToSupabase();
};

window.flipMemory = function (i) {
  if (memory.locked) return;
  const card = memory.cards[i];
  if (card.flipped || card.matched) return;

  card.flipped = true;
  memory.flipped.push(i);
  localSet(STORAGE_KEYS.memory, memory);
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
      localSet(STORAGE_KEYS.memory, memory);
      renderMemory();
      if (memory.matched === 8) {
        setTimeout(() => alert('🎉 You found all the pairs!'), 300);
        addLovePoints('me', 5);
        const headerIcon = document.getElementById('headerIcon');
        if (headerIcon) spawnLoveBubbles(headerIcon, 12);
        showCelebrationToast('🎉 All pairs found!');
        saveAllToSupabase();
      }
    } else {
      setTimeout(() => {
        memory.cards[a].flipped = false;
        memory.cards[b].flipped = false;
        memory.flipped = [];
        memory.locked = false;
        localSet(STORAGE_KEYS.memory, memory);
        renderMemory();
      }, 1000);
    }
    localSet(STORAGE_KEYS.memory, memory);
  }
  touchStreak();
  saveAllToSupabase();
};

// ── Our Song ──
function loadOurSong() {
  const raw = localGet(STORAGE_KEYS.ourSong);
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
  const raw = localGet(STORAGE_KEYS.ourSong);
  if (!raw) {
    document.getElementById('musicTitle').textContent = 'No song yet';
    document.getElementById('musicArtist').textContent = 'Set your song below';
  }
}

window.saveOurSong = async function () {
  const title = document.getElementById('musicTitleInput').value.trim();
  const artist = document.getElementById('musicArtistInput').value.trim();
  const url = document.getElementById('musicUrlInput').value.trim();
  if (!title && !artist && !url) {
    alert('Fill in at least one field.');
    return;
  }
  const song = { title, artist, url };
  localSet(STORAGE_KEYS.ourSong, song);
  document.getElementById('musicTitle').textContent = title || 'Our Song';
  document.getElementById('musicArtist').textContent = artist || '—';
  const audio = document.getElementById('musicAudio');
  audio.src = url || '';
  touchStreak();
  saveAllToSupabase();
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
  saveAllToSupabase();
};

// ── Weather ──
function loadWeather() {
  const meRaw = localGet(STORAGE_KEYS.weatherMe);
  const partnerRaw = localGet(STORAGE_KEYS.weatherPartner);
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

window.saveWeather = async function () {
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
  localSet(STORAGE_KEYS.weatherMe, me);
  localSet(STORAGE_KEYS.weatherPartner, partner);
  renderWeatherSide('me');
  renderWeatherSide('partner');
  touchStreak();
  saveAllToSupabase();
};

window.renderWeatherSide = renderWeatherSide;

// ── Export / Import ──
window.exportData = function () {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('lusso_')) {
      data[key] = localGet(key);
    }
  }
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

      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('lusso_')) keysToRemove.push(key);
      }
      keysToRemove.forEach((key) => localRemove(key));

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'names_state') {
          state = typeof value === 'string' ? JSON.parse(value) : value;
          localSet(STORAGE_KEYS.names, JSON.stringify(state));
        } else {
          localSet(key, value);
        }
      });

      renderAll();
      saveAllToSupabase();
      alert('✅ Data imported successfully!');
    } catch (err) {
      alert('❌ Invalid file. Please select a valid export file.');
    }
  };
  reader.readAsText(file);
};

document.getElementById('importFile').addEventListener('change', importData);

// ── persistence ──
function saveState() {
  localSet(STORAGE_KEYS.names, JSON.stringify(state));
  saveAllToSupabase();
}

function loadState() {
  const saved = localGet(STORAGE_KEYS.names);
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

// ── day / night icon ──
function updateDayNightIcon() {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 18;

  const headerBtn = document.getElementById('headerIcon');
  const heroVisual = document.querySelector('.couple-placeholder');

  if (headerBtn) {
    headerBtn.textContent = isNight ? '🌙❤️' : '☀️❤️';
    headerBtn.setAttribute('aria-label', isNight ? 'Night mode' : 'Day mode');
  }
  if (heroVisual) {
    heroVisual.textContent = isNight ? '🌙' : '☀️';
  }

  const homeTitle = document.getElementById('homeTitle');
  if (homeTitle) {
    homeTitle.innerHTML = `Missing you, <span id="homePartnerName">${state.partner}</span> ${isNight ? '🌙' : '☀️'}`;
  }
}

// ── Games: Love Run ──
let loveRun = { mePos: 0, partnerPos: 0, finished: false };

function renderLoveRun() {
  document.getElementById('runnerMe').style.left = loveRun.mePos + 'px';
  document.getElementById('runnerPartner').style.left = loveRun.partnerPos + 'px';
  const result = document.getElementById('runResult');
  if (loveRun.finished) {
    if (loveRun.mePos >= 280 && loveRun.partnerPos >= 280) {
      result.textContent = '🤝 You both finished — group hug! 🤗';
    } else if (loveRun.mePos >= 280) {
      result.textContent = '👨 You won! Hug your partner! 🤗';
    } else if (loveRun.partnerPos >= 280) {
      result.textContent = '👩 Your partner won! Give them a hug! 🤗';
    }
  } else {
    result.textContent = '';
  }
}

window.runMe = function () {
  if (loveRun.finished) return;
  loveRun.mePos += 40;
  if (loveRun.mePos >= 280) {
    loveRun.mePos = 280;
    loveRun.finished = true;
    addLovePoints('me', 5);
    const headerIcon = document.getElementById('headerIcon');
    if (headerIcon) spawnLoveBubbles(headerIcon, 15);
    showCelebrationToast('👨 You reached the finish — hug time! 🤗');
  }
  renderLoveRun();
  saveAllToSupabase();
};

window.runPartner = function () {
  if (loveRun.finished) return;
  loveRun.partnerPos += 40;
  if (loveRun.partnerPos >= 280) {
    loveRun.partnerPos = 280;
    loveRun.finished = true;
    addLovePoints('partner', 5);
    const headerIcon = document.getElementById('headerIcon');
    if (headerIcon) spawnLoveBubbles(headerIcon, 15);
    showCelebrationToast('👩 Your partner reached the finish — hug them! 🤗');
  }
  renderLoveRun();
  saveAllToSupabase();
};

window.resetLoveRun = function () {
  loveRun = { mePos: 0, partnerPos: 0, finished: false };
  renderLoveRun();
  saveAllToSupabase();
};

// ── Games: Heart Popper ──
let heartPopper = { score: 0, active: false };

function startHeartPopper() {
  const board = document.getElementById('heartPopperBoard');
  board.innerHTML = '';
  heartPopper = { score: 0, active: true };
  document.getElementById('popperScore').textContent = 'Score: 0';

  for (let i = 0; i < 8; i++) {
    const h = document.createElement('div');
    h.className = 'popper-heart';
    h.textContent = ['💕','💖','💗','💘','💞','💟'][Math.floor(Math.random()*6)];
    h.style.left = (Math.random() * 85) + '%';
    h.style.top = (Math.random() * 80) + '%';
    h.onclick = () => {
      if (!heartPopper.active) return;
      heartPopper.score++;
      document.getElementById('popperScore').textContent = 'Score: ' + heartPopper.score;
      h.remove();
      spawnLoveBubbles(h, 4);
      saveAllToSupabase();
    };
    board.appendChild(h);
  }

  setTimeout(() => { heartPopper.active = false; }, 10000);
}

// ── Games: Cupid's Arrow ──
let cupid = { targetX: 80, targetY: 50, hits: 0 };

function renderCupid() {
  const target = document.getElementById('cupidTarget');
  const arrow = document.getElementById('cupidArrow');
  target.style.left = cupid.targetX + '%';
  target.style.top = cupid.targetY + '%';
  arrow.style.left = '5%';
  arrow.style.top = '50%';
  document.getElementById('cupidResult').textContent = '';
}

window.shootCupidArrow = function () {
  const arrow = document.getElementById('cupidArrow');
  const target = document.getElementById('cupidTarget');
  const result = document.getElementById('cupidResult');

  arrow.style.transition = 'left 0.6s ease-out, top 0.6s ease-out';
  arrow.style.left = cupid.targetX + '%';
  arrow.style.top = cupid.targetY + '%';

  setTimeout(() => {
    const rectArrow = arrow.getBoundingClientRect();
    const rectTarget = target.getBoundingClientRect();
    const dx = Math.abs((rectArrow.left + rectArrow.width/2) - (rectTarget.left + rectTarget.width/2));
    const dy = Math.abs((rectArrow.top + rectArrow.height/2) - (rectTarget.top + rectTarget.height/2));

    if (dx < 40 && dy < 40) {
      cupid.hits++;
      result.textContent = '❤️ Bullseye! Cupid approves!';
      result.style.color = '#34d399';
      addLovePoints('me', 5);
      const headerIcon = document.getElementById('headerIcon');
      if (headerIcon) spawnLoveBubbles(headerIcon, 12);
      showCelebrationToast('❤️ Cupid hit the heart!');
    } else {
      result.textContent = '🏹 Missed! Try again.';
      result.style.color = '#f87171';
    }

    cupid.targetX = 20 + Math.random() * 60;
    cupid.targetY = 20 + Math.random() * 60;
    renderCupid();
  }, 600);

  saveAllToSupabase();
};
