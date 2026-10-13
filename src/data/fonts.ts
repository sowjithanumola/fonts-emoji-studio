import { FontStyleDefinition } from '../types';

// Helper to map characters with an offset
function mapChar(str: string, lowerStart: number, upperStart: number, digitStart?: number): string {
  let res = '';
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (code >= 97 && code <= 122) { // a-z
      res += String.fromCodePoint(lowerStart + (code - 97));
    } else if (code >= 65 && code <= 90) { // A-Z
      res += String.fromCodePoint(upperStart + (code - 65));
    } else if (digitStart !== undefined && code >= 48 && code <= 57) { // 0-9
      res += String.fromCodePoint(digitStart + (code - 48));
    } else {
      res += ch;
    }
  }
  return res;
}

// Map using character lookup dictionary
function mapDict(str: string, dict: Record<string, string>): string {
  return str.split('').map(ch => dict[ch] || dict[ch.toLowerCase()] || ch).join('');
}

// Small caps dictionary
const smallCapsMap: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
  j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
  s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ', I: 'ɪ',
  J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ',
  S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ',
};

// Upside down dictionary
const upsideDownMap: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
  j: 'ɾ', k: 'ʞ', l: 'ן', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
  s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
  J: 'ſ', K: '⋊', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ',
  S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
  '?': '¿', '!': '¡', '.': '˙', ',': '\'', '(': ')', ')': '(', '[': ']', ']': '[',
};

// Superscript dictionary
const superscriptMap: Record<string, string> = {
  a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ',
  j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ',
  t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
  A: 'ᴬ', B: 'ᴮ', C: 'ᶜ', D: 'ᴰ', E: 'ᴱ', F: 'ᶠ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ',
  J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ', O: 'ᴼ', P: 'ᴾ', R: 'ᴿ', T: 'ᵀ',
  U: 'ᵁ', V: 'ⱽ', W: 'ᵂ',
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
};

// Subscript dictionary
const subscriptMap: Record<string, string> = {
  a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ',
  o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎'
};

// Leet speak
const leetMap: Record<string, string> = {
  a: '4', A: '4', e: '3', E: '3', i: '1', I: '1', o: '0', O: '0', s: '5', S: '5', t: '7', T: '7'
};

// Diacritics
function combineDiacritic(str: string, mark: string): string {
  return str.split('').map(ch => (ch === ' ' ? ' ' : ch + mark)).join('');
}

// Zalgo generator
function zalgo(text: string): string {
  const marks = ['\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', '\u0308', '\u030A', '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317', '\u0318', '\u0319', '\u031A', '\u031B', '\u0320', '\u0324', '\u0325', '\u0326', '\u0327', '\u0328', '\u032D', '\u032E', '\u0330', '\u0334', '\u0335', '\u0336', '\u0337', '\u0338'];
  return text.split('').map(ch => {
    if (ch === ' ') return ' ';
    const m1 = marks[Math.floor(Math.random() * marks.length)];
    const m2 = marks[Math.floor(Math.random() * marks.length)];
    return ch + m1 + m2;
  }).join('');
}

// Mathematical script exceptions handling
const scriptLower: Record<string, string> = {
  a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: 'ℯ', f: '𝒻', g: 'ℊ', h: '𝒽', i: '𝒾',
  j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: 'ℴ', p: '𝓅', q: '𝓆', r: '𝓇',
  s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏'
};
const scriptUpper: Record<string, string> = {
  A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ',
  J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ',
  S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵'
};

const boldScriptLower = 0x1D4EA;
const boldScriptUpper = 0x1D4D0;

// Fraktur / Gothic
const frakturLower: Record<string, string> = {
  a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦',
  j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯',
  s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷'
};
const frakturUpper: Record<string, string> = {
  A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ',
  J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ',
  S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ'
};

// Double-struck exceptions
const doubleStruckExceptions: Record<string, string> = {
  C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ'
};

export const FONT_STYLES: FontStyleDefinition[] = [
  // 1. Serif Bold
  {
    id: 'bold-serif',
    name: 'Serif Bold',
    category: 'Serif & Sans',
    badge: 'Popular',
    transform: (t) => mapChar(t, 0x1D41A, 0x1D400, 0x1D7CE)
  },
  // 2. Serif Italic
  {
    id: 'italic-serif',
    name: 'Serif Italic',
    category: 'Serif & Sans',
    transform: (t) => {
      // 'h' is 0x210E in standard italic
      let res = '';
      for (const ch of t) {
        if (ch === 'h') res += 'ℎ';
        else res += mapChar(ch, 0x1D44E, 0x1D434);
      }
      return res;
    }
  },
  // 3. Serif Bold Italic
  {
    id: 'bold-italic-serif',
    name: 'Serif Bold Italic',
    category: 'Serif & Sans',
    transform: (t) => mapChar(t, 0x1D482, 0x1D468)
  },
  // 4. Sans-Serif Regular
  {
    id: 'sans-regular',
    name: 'Sans-Serif Clean',
    category: 'Serif & Sans',
    transform: (t) => mapChar(t, 0x1D586, 0x1D56C, 0x1D7E2)
  },
  // 5. Sans-Serif Bold
  {
    id: 'sans-bold',
    name: 'Sans-Serif Bold',
    category: 'Serif & Sans',
    badge: 'Trending',
    transform: (t) => mapChar(t, 0x1D5EE, 0x1D5D4, 0x1D7EC)
  },
  // 6. Sans-Serif Italic
  {
    id: 'sans-italic',
    name: 'Sans-Serif Italic',
    category: 'Serif & Sans',
    transform: (t) => mapChar(t, 0x1D622, 0x1D608)
  },
  // 7. Sans-Serif Bold Italic
  {
    id: 'sans-bold-italic',
    name: 'Sans Bold Italic',
    category: 'Serif & Sans',
    transform: (t) => mapChar(t, 0x1D656, 0x1D63C)
  },
  // 8. Monospace / Typewriter
  {
    id: 'monospace',
    name: 'Monospace / Code',
    category: 'Serif & Sans',
    transform: (t) => mapChar(t, 0x1D68A, 0x1D670, 0x1D7F6)
  },
  // 9. Double-Struck / Blackboard
  {
    id: 'double-struck',
    name: 'Double-Struck (Outline)',
    category: 'Serif & Sans',
    badge: 'Aesthetic',
    transform: (t) => {
      let res = '';
      for (const ch of t) {
        if (doubleStruckExceptions[ch]) {
          res += doubleStruckExceptions[ch];
        } else {
          res += mapChar(ch, 0x1D552, 0x1D538, 0x1D7D8);
        }
      }
      return res;
    }
  },
  // 10. Cursive / Mathematical Script
  {
    id: 'script-cursive',
    name: 'Cursive / Script',
    category: 'Script & Gothic',
    badge: 'Popular',
    transform: (t) => {
      return t.split('').map(ch => scriptLower[ch] || scriptUpper[ch] || ch).join('');
    }
  },
  // 11. Bold Script / Cursive Bold
  {
    id: 'bold-script',
    name: 'Bold Calligraphy',
    category: 'Script & Gothic',
    transform: (t) => mapChar(t, boldScriptLower, boldScriptUpper)
  },
  // 12. Fraktur / Gothic
  {
    id: 'fraktur-gothic',
    name: 'Gothic / Old English',
    category: 'Script & Gothic',
    badge: 'Gothic',
    transform: (t) => {
      return t.split('').map(ch => frakturLower[ch] || frakturUpper[ch] || ch).join('');
    }
  },
  // 13. Bold Fraktur
  {
    id: 'bold-fraktur',
    name: 'Bold Gothic',
    category: 'Script & Gothic',
    transform: (t) => mapChar(t, 0x1D586, 0x1D56C) // falls into bold gothic
  },
  // 14. Small Caps
  {
    id: 'small-caps',
    name: 'Small Capitals',
    category: 'Script & Gothic',
    badge: 'Trending',
    transform: (t) => mapDict(t, smallCapsMap)
  },
  // 15. White Bubble / Circled
  {
    id: 'white-bubble',
    name: 'Bubble / Circled',
    category: 'Decorated & Shapes',
    badge: 'Cute',
    transform: (t) => {
      let res = '';
      for (const ch of t) {
        const code = ch.charCodeAt(0);
        if (code >= 97 && code <= 122) { // a-z: 0x24D0 - 0x24E9
          res += String.fromCodePoint(0x24D0 + (code - 97));
        } else if (code >= 65 && code <= 90) { // A-Z: 0x24B6 - 0x24CF
          res += String.fromCodePoint(0x24B6 + (code - 65));
        } else if (code >= 49 && code <= 57) { // 1-9: 0x2460 - 0x2468
          res += String.fromCodePoint(0x2460 + (code - 49));
        } else if (code === 48) { // 0: 0x24EA
          res += '⓪';
        } else {
          res += ch;
        }
      }
      return res;
    }
  },
  // 16. Black Bubble / Inverted Circled
  {
    id: 'black-bubble',
    name: 'Inverted Bubble',
    category: 'Decorated & Shapes',
    transform: (t) => {
      let res = '';
      for (const ch of t) {
        const code = ch.toUpperCase().charCodeAt(0);
        if (code >= 65 && code <= 90) { // A-Z in negative circled: 0x1F150
          res += String.fromCodePoint(0x1F150 + (code - 65));
        } else if (ch >= '1' && ch <= '9') {
          res += String.fromCodePoint(0x2776 + (Number(ch) - 1));
        } else if (ch === '0') {
          res += '⓿';
        } else {
          res += ch;
        }
      }
      return res;
    }
  },
  // 17. Square Framed
  {
    id: 'squared',
    name: 'Squared Letters',
    category: 'Decorated & Shapes',
    transform: (t) => {
      let res = '';
      for (const ch of t) {
        const code = ch.toUpperCase().charCodeAt(0);
        if (code >= 65 && code <= 90) {
          res += String.fromCodePoint(0x1F130 + (code - 65));
        } else {
          res += ch;
        }
      }
      return res;
    }
  },
  // 18. Negative Squared
  {
    id: 'negative-squared',
    name: 'Negative Squared Box',
    category: 'Decorated & Shapes',
    transform: (t) => {
      let res = '';
      for (const ch of t) {
        const code = ch.toUpperCase().charCodeAt(0);
        if (code >= 65 && code <= 90) {
          res += String.fromCodePoint(0x1F170 + (code - 65));
        } else {
          res += ch;
        }
      }
      return res;
    }
  },
  // 19. Vaporwave / Fullwidth
  {
    id: 'vaporwave',
    name: 'Vaporwave / Wide',
    category: 'Novelty & Fun',
    badge: 'Aesthetic',
    transform: (t) => {
      let res = '';
      for (const ch of t) {
        const code = ch.charCodeAt(0);
        if (code >= 33 && code <= 126) {
          res += String.fromCodePoint(0xFF01 + (code - 33));
        } else if (code === 32) {
          res += '　';
        } else {
          res += ch;
        }
      }
      return res;
    }
  },
  // 20. Upside Down / Inverted
  {
    id: 'upside-down',
    name: 'Upside Down / Inverted',
    category: 'Novelty & Fun',
    transform: (t) => {
      return t.split('').reverse().map(ch => upsideDownMap[ch] || ch).join('');
    }
  },
  // 21. Superscript
  {
    id: 'superscript',
    name: 'Superscript Tiny',
    category: 'Special & Accents',
    transform: (t) => mapDict(t, superscriptMap)
  },
  // 22. Subscript
  {
    id: 'subscript',
    name: 'Subscript Lower',
    category: 'Special & Accents',
    transform: (t) => mapDict(t, subscriptMap)
  },
  // 23. Strikethrough
  {
    id: 'strikethrough',
    name: 'Strikethrough',
    category: 'Special & Accents',
    transform: (t) => combineDiacritic(t, '\u0336')
  },
  // 24. Single Underline
  {
    id: 'underline-single',
    name: 'Single Underline',
    category: 'Special & Accents',
    transform: (t) => combineDiacritic(t, '\u0332')
  },
  // 25. Double Underline
  {
    id: 'underline-double',
    name: 'Double Underline',
    category: 'Special & Accents',
    transform: (t) => combineDiacritic(t, '\u0333')
  },
  // 26. Slash Through
  {
    id: 'slash-through',
    name: 'Slash Through',
    category: 'Special & Accents',
    transform: (t) => combineDiacritic(t, '\u0337')
  },
  // 27. Wavy Tilde Strike
  {
    id: 'wavy-strike',
    name: 'Wavy Tilde Strike',
    category: 'Special & Accents',
    transform: (t) => combineDiacritic(t, '\u0334')
  },
  // 28. Overline
  {
    id: 'overline',
    name: 'Overline Bar',
    category: 'Special & Accents',
    transform: (t) => combineDiacritic(t, '\u0305')
  },
  // 29. Zalgo / Glitch
  {
    id: 'zalgo-glitch',
    name: 'Glitch / Zalgo Cursed',
    category: 'Novelty & Fun',
    badge: 'Cyber',
    transform: (t) => zalgo(t)
  },
  // 30. Leet Speak
  {
    id: 'leet-speak',
    name: '1337 / Leet Gamer',
    category: 'Novelty & Fun',
    transform: (t) => mapDict(t, leetMap)
  },
  // 31. Spaced Aesthetic
  {
    id: 'spaced-aesthetic',
    name: 'Spaced Out Dreamy',
    category: 'Decorated & Shapes',
    transform: (t) => t.split('').join('  ')
  },
  // 32. Sparkle Star Adorned
  {
    id: 'sparkle-stars',
    name: 'Sparkle Adorned',
    category: 'Decorated & Shapes',
    badge: 'Kawaii',
    transform: (t) => `✧･ﾟ: * ${mapChar(t, boldScriptLower, boldScriptUpper)} *:･ﾟ✧`
  },
  // 33. Heart Adorned
  {
    id: 'heart-adorned',
    name: 'Heart Romantic',
    category: 'Decorated & Shapes',
    transform: (t) => `♡ ${mapChar(t, 0x1D482, 0x1D468)} ♡`
  },
  // 34. Angel Wings
  {
    id: 'angel-wings',
    name: 'Angel Wings',
    category: 'Decorated & Shapes',
    transform: (t) => `໒꒰ྀི ${mapDict(t, smallCapsMap)} ྀི꒱১`
  },
  // 35. Japanese Brackets
  {
    id: 'japanese-brackets',
    name: 'Japanese Brackets 【 】',
    category: 'Decorated & Shapes',
    transform: (t) => `【 ${mapChar(t, 0x1D5EE, 0x1D5D4, 0x1D7EC)} 】`
  },
  // 36. Japanese Quotations
  {
    id: 'japanese-quotes',
    name: 'Corner Quotes 『 』',
    category: 'Decorated & Shapes',
    transform: (t) => `『 ${mapChar(t, 0x1D41A, 0x1D400)} 』`
  },
  // 37. Arrow Adorned
  {
    id: 'arrow-adorned',
    name: 'Hunting Arrows ➳',
    category: 'Decorated & Shapes',
    transform: (t) => `➳ ${mapChar(t, 0x1D5EE, 0x1D5D4)} ➳`
  },
  // 38. Crosshair Clan
  {
    id: 'crosshair-clan',
    name: 'Sniper Crosshair',
    category: 'Novelty & Fun',
    badge: 'Gaming',
    transform: (t) => `⊹ ࣪ ˖ ╾━ ${mapChar(t, 0x1D586, 0x1D56C)} ━╼ ˖ ࣪ ⊹`
  },
  // 39. Shooting Star
  {
    id: 'shooting-star',
    name: 'Shooting Star ★彡',
    category: 'Decorated & Shapes',
    transform: (t) => `★彡 ${mapDict(t, smallCapsMap)} 彡★`
  },
  // 40. Butterfly Aesthetic
  {
    id: 'butterfly-aesthetic',
    name: 'Butterfly Blossom ʚïɞ',
    category: 'Decorated & Shapes',
    transform: (t) => `ʚïɞ ⁺˖ ${mapChar(t, 0x1D482, 0x1D468)} ˖⁺ ʚïɞ`
  }
];
