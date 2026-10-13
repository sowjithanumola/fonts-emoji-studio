import { NameVariation } from '../types';

export const NAME_CATEGORIES = [
  'All',
  'Gaming',
  'Social',
  'Cute & Soft',
  'Aesthetic',
  'Gothic & Dark',
  'Minimalist'
] as const;

// Text transform helpers
function toSmallCaps(str: string): string {
  const map: Record<string, string> = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
    j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
    s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  };
  return str.split('').map(ch => map[ch.toLowerCase()] || ch).join('');
}

function toBoldGothic(str: string): string {
  let res = '';
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (code >= 97 && code <= 122) {
      res += String.fromCodePoint(0x1D586 + (code - 97));
    } else if (code >= 65 && code <= 90) {
      res += String.fromCodePoint(0x1D56C + (code - 65));
    } else {
      res += ch;
    }
  }
  return res;
}

function toScript(str: string): string {
  let res = '';
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (code >= 97 && code <= 122) {
      res += String.fromCodePoint(0x1D4EA + (code - 97));
    } else if (code >= 65 && code <= 90) {
      res += String.fromCodePoint(0x1D4D0 + (code - 65));
    } else {
      res += ch;
    }
  }
  return res;
}

function toDoubleStruck(str: string): string {
  let res = '';
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (code >= 97 && code <= 122) {
      res += String.fromCodePoint(0x1D552 + (code - 97));
    } else if (code >= 65 && code <= 90) {
      res += String.fromCodePoint(0x1D538 + (code - 65));
    } else {
      res += ch;
    }
  }
  return res;
}

function toBubble(str: string): string {
  let res = '';
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (code >= 97 && code <= 122) {
      res += String.fromCodePoint(0x24D0 + (code - 97));
    } else if (code >= 65 && code <= 90) {
      res += String.fromCodePoint(0x24B6 + (code - 65));
    } else {
      res += ch;
    }
  }
  return res;
}

export function generateStylishNames(input: string): NameVariation[] {
  const name = input.trim() || 'Alex';
  const small = toSmallCaps(name);
  const gothic = toBoldGothic(name);
  const script = toScript(name);
  const outline = toDoubleStruck(name);
  const bubble = toBubble(name);
  const spaced = name.split('').join(' ');

  return [
    // --- Gaming ---
    {
      id: 'g-1',
      styleName: 'Mythic Clan Emperor',
      category: 'Gaming',
      result: `꧁༺${gothic}༻꧂`
    },
    {
      id: 'g-2',
      styleName: 'Shadow Assassin Wings',
      category: 'Gaming',
      result: `⚔️ 彡[${name.toUpperCase()}]彡 ⚔️`
    },
    {
      id: 'g-3',
      styleName: 'Japanese Ronin Pro',
      category: 'Gaming',
      result: `々 ${name.toUpperCase()} 々`
    },
    {
      id: 'g-4',
      styleName: 'Sniper Crosshair Elite',
      category: 'Gaming',
      result: `━╤デ╦︻ ${name} ︻デ═一`
    },
    {
      id: 'g-5',
      styleName: 'Apex Predator Crown',
      category: 'Gaming',
      result: `👑 ꧁☬${gothic}☬꧂ 👑`
    },
    {
      id: 'g-6',
      styleName: 'Viper Strike Esports',
      category: 'Gaming',
      result: `『vPX』• ${small} •`
    },
    {
      id: 'g-7',
      styleName: 'Gamer Tag Double Bracket',
      category: 'Gaming',
      result: `【 ɢᴏᴅ 】${name.toUpperCase()} ⚡`
    },
    {
      id: 'g-8',
      styleName: 'Dark Knight Insignia',
      category: 'Gaming',
      result: `☠️ 𝕯𝖊𝖆𝖙𝖍_${gothic} ☠️`
    },

    // --- Social ---
    {
      id: 's-1',
      styleName: 'Instagram Aesthetic Sparkle',
      category: 'Social',
      result: `✧･ﾟ: * ${script} *:･ﾟ✧`
    },
    {
      id: 's-2',
      styleName: 'Verified Star Handle',
      category: 'Social',
      result: `★ ${small} ★`
    },
    {
      id: 's-3',
      styleName: 'Minimalist Influencer',
      category: 'Social',
      result: `· ${name.toLowerCase()} ·`
    },
    {
      id: 's-4',
      styleName: 'Boutique Calligraphy',
      category: 'Social',
      result: `♡ ${script} ♡`
    },
    {
      id: 's-5',
      styleName: 'TikTok Aesthetic Vibe',
      category: 'Social',
      result: `•.¸¸.• ${small} •.¸¸.•`
    },
    {
      id: 's-6',
      styleName: 'Sparkle Stardust Handle',
      category: 'Social',
      result: `⋆｡°✩ ${name} ✩°｡⋆`
    },

    // --- Cute & Soft ---
    {
      id: 'c-1',
      styleName: 'Angel Bunny Ears',
      category: 'Cute & Soft',
      result: `໒꒰ྀི ${small} ྀི꒱১`
    },
    {
      id: 'c-2',
      styleName: 'Cherry Blossom Sweet',
      category: 'Cute & Soft',
      result: `🌸 ${script} 🌸`
    },
    {
      id: 'c-3',
      styleName: 'Butterfly Blossom',
      category: 'Cute & Soft',
      result: `ʚïɞ ${small} ʚïɞ`
    },
    {
      id: 'c-4',
      styleName: 'Cute Soft Brackets',
      category: 'Cute & Soft',
      result: `꒰ ${name} ꒱ ⁺˖`
    },
    {
      id: 'c-5',
      styleName: 'Strawberry Milk',
      category: 'Cute & Soft',
      result: `🍓 𝜗𝜚 ${small} 𝜗𝜚`
    },
    {
      id: 'c-6',
      styleName: 'Little Teddy Bear',
      category: 'Cute & Soft',
      result: `ʕ•ᴥ•ʔ ${name} ʕ•ᴥ•ʔ`
    },

    // --- Aesthetic ---
    {
      id: 'ae-1',
      styleName: 'Dreamy Spaced Lettering',
      category: 'Aesthetic',
      result: `[ ${spaced} ]`
    },
    {
      id: 'ae-2',
      styleName: 'Celestial Crescent',
      category: 'Aesthetic',
      result: `☽ ${small} ☾`
    },
    {
      id: 'ae-3',
      styleName: 'Outline Architecture',
      category: 'Aesthetic',
      result: `⟦ ${outline} ⟧`
    },
    {
      id: 'ae-4',
      styleName: 'Diamond Filigree Line',
      category: 'Aesthetic',
      result: `✦ ${gothic} ✦`
    },
    {
      id: 'ae-5',
      styleName: 'Japanese Film Still',
      category: 'Aesthetic',
      result: `『 ${name} 』`
    },
    {
      id: 'ae-6',
      styleName: 'Vaporwave Horizon',
      category: 'Aesthetic',
      result: `🌊 ${spaced.toUpperCase()} 🌊`
    },

    // --- Gothic & Dark ---
    {
      id: 'go-1',
      styleName: 'Cathedral Crosses',
      category: 'Gothic & Dark',
      result: `† ${gothic} †`
    },
    {
      id: 'go-2',
      styleName: 'Double Dagger Assassin',
      category: 'Gothic & Dark',
      result: `🗡️ 𝕲𝖔𝖙𝖍𝖎𝖈_${gothic} 🗡️`
    },
    {
      id: 'go-3',
      styleName: 'Midnight Black Heart',
      category: 'Gothic & Dark',
      result: `🖤 ༒ ${gothic} ༒ 🖤`
    },
    {
      id: 'go-4',
      styleName: 'Old English Crest',
      category: 'Gothic & Dark',
      result: `⚜️ 𝔖𝔦𝔫𝔫𝔢𝔯_${gothic} ⚜️`
    },
    {
      id: 'go-5',
      styleName: 'Vampiric Throne',
      category: 'Gothic & Dark',
      result: `🦇 ༺${gothic}༻ 🦇`
    },

    // --- Minimalist ---
    {
      id: 'm-1',
      styleName: 'Clean Lowercase Dots',
      category: 'Minimalist',
      result: `. ${name.toLowerCase()} .`
    },
    {
      id: 'm-2',
      styleName: 'Clean Underscore Core',
      category: 'Minimalist',
      result: `_${small}_`
    },
    {
      id: 'm-3',
      styleName: 'Clean Corner Brackets',
      category: 'Minimalist',
      result: `「 ${name} 」`
    },
    {
      id: 'm-4',
      styleName: 'Monochrome Bubble',
      category: 'Minimalist',
      result: bubble
    },
    {
      id: 'm-5',
      styleName: 'Architectural Slash',
      category: 'Minimalist',
      result: `// ${name.toUpperCase()} //`
    },
    {
      id: 'm-6',
      styleName: 'Subtle Dash Frame',
      category: 'Minimalist',
      result: `— ${small} —`
    }
  ];
}
