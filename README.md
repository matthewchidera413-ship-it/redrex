# Us 🌙 — Long Distance Love App

A private, romantic space for long-distance couples to stay connected across the miles. Works as a mobile app (PWA) — install it to your home screen and use it offline.

## Files

| File | Purpose |
|------|---------|
| `index.html` | App structure — all sections |
| `style.css` | Dark romantic theme with glow effects |
| `script.js` | All logic, games, quotes, and data storage |
| `manifest.json` | "Add to Home Screen" install support |
| `service-worker.js` | Offline support |
| `icon-192.svg`, `icon-512.svg` | App icons |
| `preview-day.html` | Day-mode preview |
| `README.md` | This file |

## Features

- **Home** — Partner greeting, streak counter, quick links, daily love quote
- **Us Stats** — Side-by-side counters for both of you (photos, messages, notes, games won, "thinking of you")
- **Love Meter** — Monthly points race; declares who loves more at month-end
- **Gallery** — Upload and share photos of things you like
- **Countdowns** — Birthdays, anniversaries, celebrations with live timers
- **Chat** — Share feelings and messages (+ "Thinking of You" button)
- **Games** — 7 games: Tic-Tac-Toe, Love Calculator, Question of the Day, Couple Trivia, Love Dice, Rock Paper Scissors, Memory Match
- **Our Song** — Set a song title, artist, and audio URL to play together
- **Our Weather** — Share your city, weather emoji, and temperature side by side
- **Love Notes** — Send sweet notes to each other

## How to Use

1. Open `index.html` in any mobile browser (Chrome on Android, Safari on iPhone).
2. Tap **"Add to Home Screen"** when the prompt appears (or use browser menu → "Add to Home Screen").
3. Open it from your home screen — it launches full-screen like a real app.
4. Tap **✏️ Names** in the top header to set your name and your partner's name.
5. Start using any section — all data saves automatically in your browser.

## Day / Night

The app automatically switches between:
- **Day (6 AM – 6 PM):** `☀️❤️` sun icon
- **Night (6 PM – 6 AM):** `🌙❤️` moon icon

## Data Privacy

All data is stored locally in your browser (localStorage). Nothing is uploaded to any server. If you clear your browser data, the app data will be cleared too.

## Customizing Quotes

Edit the `DAILY_QUOTES` array in `script.js` to add your own favorite love quotes.

---

Made with ❤️ for long-distance love.
