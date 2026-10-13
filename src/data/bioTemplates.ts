import { BioTemplate } from '../types';

export const BIO_CATEGORIES = [
  'All',
  'Instagram',
  'Gaming',
  'TikTok',
  'Creator',
  'Minimalist',
  'Aesthetic'
] as const;

export const BIO_TEMPLATES: BioTemplate[] = [
  // --- Instagram ---
  {
    id: 'bio-ig-1',
    title: 'Aesthetic Dreamer Profile',
    platform: 'Instagram',
    tags: ['Aesthetic', 'Soft', 'Curated'],
    template: `✧ {NAME} ✧
☁️ living in moments, not memories
📍 {LOCATION}
☕ latte lover · design enthusiast
💌 dm for collabs ↓`
  },
  {
    id: 'bio-ig-2',
    title: 'Clean Minimalist Bio',
    platform: 'Instagram',
    tags: ['Minimal', 'Clean'],
    template: `{NAME}
— creating things that inspire
📷 visual diary
✦ {INTERESTS}
🔗 explore below`
  },
  {
    id: 'bio-ig-3',
    title: 'Golden Hour Storyteller',
    platform: 'Instagram',
    tags: ['Warm', 'Story', 'Travel'],
    template: `❝ romanticizing ordinary days ❞
✨ {NAME} | {TITLE}
🌿 plant mom & slow morning seeker
✈️ next stop: {LOCATION}
👇 latest stories`
  },

  // --- Gaming ---
  {
    id: 'bio-gm-1',
    title: 'Esports Pro / Twitch Streamer',
    platform: 'Gaming',
    tags: ['Esports', 'Twitch', 'Pro'],
    template: `⚔️ {NAME} | Esports Competitor ⚔️
🎮 Main: Valorant / Apex Legends
🏆 Top 500 Radiant
🔴 LIVE on Twitch Tue / Thu 8PM EST
👇 join the Discord squad`
  },
  {
    id: 'bio-gm-2',
    title: 'Casual Cozy Gamer',
    platform: 'Gaming',
    tags: ['Cozy', 'Steam', 'Nintendo'],
    template: `👾 {NAME} 👾
🍓 cozy gaming & pixel art
🎮 Stardew Valley & Animal Crossing enthusiast
☕ sip coffee · roll dice · have fun
twitch.tv/{NAME}`
  },
  {
    id: 'bio-gm-3',
    title: 'Clan Leader Tactical',
    platform: 'Gaming',
    tags: ['Clan', 'FPS', 'Dark'],
    template: `꧁༺ {NAME} ༻꧂
⚡ In-Game Leader @ CyberClan
🎯 Accuracy > Volume
💀 Ranked grinder
linktr.ee/gaming`
  },

  // --- TikTok ---
  {
    id: 'bio-tt-1',
    title: 'Viral Trend Creator',
    platform: 'TikTok',
    tags: ['Short', 'Punchy', 'Trendy'],
    template: `✨ {NAME} | {TITLE} ✨
humor + honest reviews 🎬
100k+ family 💖
collaboration: contact@{NAME}.com ↓`
  },
  {
    id: 'bio-tt-2',
    title: 'Vibe & POV Creator',
    platform: 'TikTok',
    tags: ['Aesthetic', 'POV'],
    template: `daily dose of aesthetic povs ☁️
{NAME} 𝜗𝜚
📍 {LOCATION}
new video every day 12pm 💫`
  },

  // --- Creator ---
  {
    id: 'bio-cr-1',
    title: 'Digital Builder & Developer',
    platform: 'Creator',
    tags: ['Tech', 'Builder', 'Indie'],
    template: `👨‍💻 {NAME}
Building digital products & creative tools
💡 {TITLE}
🚀 Sharing learnings & open source
👇 read my newsletter`
  },
  {
    id: 'bio-cr-2',
    title: 'Photographer & Visual Artist',
    platform: 'Creator',
    tags: ['Art', 'Photography', 'Portfolio'],
    template: `🎞️ {NAME} | Visual Arts
Capturing shadows & natural light
📍 Based in {LOCATION}
Available for worldwide commissions
portfolio & prints ↓`
  },
  {
    id: 'bio-cr-3',
    title: 'Fitness & Lifestyle Coach',
    platform: 'Creator',
    tags: ['Fitness', 'Wellness', 'Motivation'],
    template: `💪 {NAME} | Certified Trainer
Transforming mindsets, one day at a time
🥗 Fuel right · Lift heavy · Stay humble
👇 Start your free 7-day guide`
  },

  // --- Aesthetic ---
  {
    id: 'bio-ae-1',
    title: 'Celestial Butterfly',
    platform: 'Aesthetic',
    tags: ['Kawaii', 'Fairy', 'Cute'],
    template: `ʚïɞ {NAME} ʚïɞ
⋆｡°✩ whispering to the stars ✩°｡⋆
🌸 softness is my strength
🎧 listening to dream-pop
໒꒰ྀི welcome to my sanctuary ྀི꒱১`
  },
  {
    id: 'bio-ae-2',
    title: 'Vintage Dark Academia',
    platform: 'Aesthetic',
    tags: ['Academia', 'Poetry', 'Books'],
    template: `📜 {NAME}
old books · black coffee · rainy windows
❝ in a world of dust, seek gold ❞
🏛️ art history & timeless prose`
  },

  // --- Minimalist ---
  {
    id: 'bio-mi-1',
    title: 'Ultra Minimalist Line',
    platform: 'Minimalist',
    tags: ['Simplicity', 'Clean', 'Modern'],
    template: `{NAME}
{TITLE}
📍 {LOCATION}
{INTERESTS}`
  },
  {
    id: 'bio-mi-2',
    title: 'Dots & Coordinates',
    platform: 'Minimalist',
    tags: ['Coordinates', 'Spatial'],
    template: `· {NAME} ·
design / code / repeat
37.7749° N, 122.4194° W
say hi ↓`
  }
];
