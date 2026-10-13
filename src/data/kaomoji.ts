import { KaomojiItem, TextArtItem } from '../types';

export const KAOMOJI_CATEGORIES = [
  'All',
  'Cute & Kawaii',
  'Happy & Joy',
  'Love & Affection',
  'Sad & Crying',
  'Angry & Rage',
  'Shrug & Whatever',
  'Gaming & Battle',
  'Animals',
  'Surprised & Shock'
] as const;

export const KAOMOJIS: KaomojiItem[] = [
  // --- Cute & Kawaii ---
  { id: 'kao-c1', art: '(◕‿◕)', name: 'Sweet Smile', category: 'Cute & Kawaii', description: 'Gentle joyful cute face' },
  { id: 'kao-c2', art: '(づ｡◕‿‿◕｡)づ', name: 'Kawaii Hug', category: 'Cute & Kawaii', description: 'Reaching out for a cuddle' },
  { id: 'kao-c3', art: 'ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧', name: 'Wink Thumbs Up', category: 'Cute & Kawaii', description: 'Approved with a sparkle' },
  { id: 'kao-c4', art: '( ˶ˆ꒳ˆ˵ )', name: 'Flushed Happiness', category: 'Cute & Kawaii', description: 'Rosy cheeks smiling' },
  { id: 'kao-c5', art: '(*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ', name: 'Polite Bow with Flower', category: 'Cute & Kawaii', description: 'Soft respectful gratitude' },
  { id: 'kao-c6', art: '໒꒰ྀི´ ˘ ` ྀི꒱১', name: 'Sleeping Angel Pup', category: 'Cute & Kawaii', description: 'Angelic peaceful nap' },
  { id: 'kao-c7', art: '(੭ˊᵕˋ)੭', name: 'Cheering Cheerleader', category: 'Cute & Kawaii', description: 'Waving hands in joy' },
  { id: 'kao-c8', art: '(｡♥‿♥｡)', name: 'Heart Eyes Darling', category: 'Cute & Kawaii', description: 'Eyes filled with love' },
  { id: 'kao-c9', art: '₍ᐢ. ̫.ᐢ₎', name: 'Little Bunny Face', category: 'Cute & Kawaii', description: 'Small curious rabbit' },
  { id: 'kao-c10', art: '( ˶• ֊ •˶ )', name: 'Bashful Delight', category: 'Cute & Kawaii', description: 'Cute shy warm smile' },
  { id: 'kao-c11', art: '꒰ ˵ •̀ з •́ ˵ ꒱', name: 'Pouting Baby', category: 'Cute & Kawaii', description: 'Cute playful pout' },
  { id: 'kao-c12', art: '(⑅˘͈ ᵕ ˘͈ )', name: 'Soft Sigh of Joy', category: 'Cute & Kawaii', description: 'Contented peaceful sigh' },

  // --- Happy & Joy ---
  { id: 'kao-h1', art: '(≧◡≦)', name: 'Squeal of Joy', category: 'Happy & Joy', description: 'Pure delight' },
  { id: 'kao-h2', art: '＼(＾▽＾)／', name: 'Hooray Celebration', category: 'Happy & Joy', description: 'Hands up cheering' },
  { id: 'kao-h3', art: '(´ ∀ ` *)', name: 'Warm Grin', category: 'Happy & Joy', description: 'Friendly and content' },
  { id: 'kao-h4', art: '(*¯︶¯*)', name: 'Pure Satisfaction', category: 'Happy & Joy', description: 'Everything is fine' },
  { id: 'kao-h5', art: '(o´▽`o)', name: 'Wide Grinning Chum', category: 'Happy & Joy', description: 'Good vibes' },
  { id: 'kao-h6', art: '٩(◕‿◕｡)۶', name: 'Dancing Joy', category: 'Happy & Joy', description: 'Jumping for happiness' },
  { id: 'kao-h7', art: 'ヽ(・∀・)ﾉ', name: 'Casual Yay', category: 'Happy & Joy', description: 'Greeting friends' },
  { id: 'kao-h8', art: '(⌒‿⌒)', name: 'Quiet Bliss', category: 'Happy & Joy', description: 'Peaceful heart' },
  { id: 'kao-h9', art: '٩(ˊᗜˋ*)و', name: 'Pumped Up Excited', category: 'Happy & Joy', description: 'Let\'s go win!' },
  { id: 'kao-h10', art: '(b ᵔ▽ᵔ)b', name: 'Double Thumbs Up', category: 'Happy & Joy', description: 'Super good job' },

  // --- Love & Affection ---
  { id: 'kao-l1', art: '(♡°▽°♡)', name: 'In Love Radiance', category: 'Love & Affection', description: 'Blushing romance' },
  { id: 'kao-l2', art: '(｡・//ε//・｡)', name: 'Super Flustered Kiss', category: 'Love & Affection', description: 'Blushing red with kiss' },
  { id: 'kao-l3', art: '( ˘ ³˘)♥', name: 'Blowing a Kiss', category: 'Love & Affection', description: 'Heart kiss delivery' },
  { id: 'kao-l4', art: '(人´З`)', name: 'Puckered Smooch', category: 'Love & Affection', description: 'Puckered lips for you' },
  { id: 'kao-l5', art: '(づ￣ ³￣)づ', name: 'Kiss Hug Combo', category: 'Love & Affection', description: 'Sending sweet hugs' },
  { id: 'kao-l6', art: '╰(*´︶`*)╯♡', name: 'Warm Embrace with Heart', category: 'Love & Affection', description: 'Deep cozy love' },
  { id: 'kao-l7', art: '(ღ˘⌣˘ღ)', name: 'Cherishing Soulmate', category: 'Love & Affection', description: 'Holding precious memories' },
  { id: 'kao-l8', art: '♡＼(￣▽￣)／♡', name: 'Heart Dance', category: 'Love & Affection', description: 'Full of love' },
  { id: 'kao-l9', art: '(´ε｀ )♡', name: 'Little Side Kiss', category: 'Love & Affection', description: 'Sweet romantic wink' },

  // --- Sad & Crying ---
  { id: 'kao-s1', art: '(╥﹏╥)', name: 'Rivers of Tears', category: 'Sad & Crying', description: 'Devastated and weeping' },
  { id: 'kao-s2', art: '( ; ω ; )', name: 'Wiping Tears Away', category: 'Sad & Crying', description: 'Sniffling softly' },
  { id: 'kao-s3', art: '(T_T)', name: 'Classic Anime Tears', category: 'Sad & Crying', description: 'Streams flowing down' },
  { id: 'kao-s4', art: '(つω`｡)', name: 'Rubbing Red Eyes', category: 'Sad & Crying', description: 'Tired and weeping' },
  { id: 'kao-s5', art: '(｡╯︵╰｡)', name: 'Heartbroken Frown', category: 'Sad & Crying', description: 'Downcast sorrow' },
  { id: 'kao-s6', art: '(っ˘̩╭╮˘̩)っ', name: 'Needing a Consoling Hug', category: 'Sad & Crying', description: 'Seeking comfort' },
  { id: 'kao-s7', art: '(ノ_<。)', name: 'Hiding Sad Face', category: 'Sad & Crying', description: 'Shielding eyes from embarrassment' },
  { id: 'kao-s8', art: '｡ﾟ(ﾟ´(00)`ﾟ)ﾟ｡', name: 'Bawling Aloud', category: 'Sad & Crying', description: 'Loud crying sob' },
  { id: 'kao-s9', art: '(◞‸◟)', name: 'Dejected Downward Glance', category: 'Sad & Crying', description: 'Disappointed with self' },

  // --- Angry & Rage ---
  { id: 'kao-a1', art: '(ノ°益°)ノ', name: 'Furious Scream', category: 'Angry & Rage', description: 'Fists clenched in wrath' },
  { id: 'kao-a2', art: '(╯°□°)╯︵ ┻━┻', name: 'Table Flip (Classic)', category: 'Angry & Rage', description: 'Rage quitting rage flip' },
  { id: 'kao-a3', art: '┬─┬ノ( º _ ºノ)', name: 'Respectfully Putting Table Back', category: 'Angry & Rage', description: 'Calming down' },
  { id: 'kao-a4', art: '(ノಠ益ಠ)ノ彡┻━┻', name: 'Menacing Double Table Flip', category: 'Angry & Rage', description: 'Total volcanic fury' },
  { id: 'kao-a5', art: '凸(￣ヘ￣)', name: 'Unimpressed Rejection', category: 'Angry & Rage', description: 'Not having any of it' },
  { id: 'kao-a6', art: '(‡▼益▼)', name: 'Bloodthirsty Villain', category: 'Angry & Rage', description: 'Dark menace glare' },
  { id: 'kao-a7', art: '(；¬д¬)', name: 'Stern Skeptical Scowl', category: 'Angry & Rage', description: 'Judging harshly' },
  { id: 'kao-a8', art: '٩(ఠ益ఠ)۶', name: 'Steam Coming Out of Ears', category: 'Angry & Rage', description: 'Fuming mad' },

  // --- Shrug & Whatever ---
  { id: 'kao-sh1', art: '¯\\_(ツ)_/¯', name: 'Classic Shrug Guy', category: 'Shrug & Whatever', description: 'Whatever, who knows' },
  { id: 'kao-sh2', art: '┐(￣∀￣)┌', name: 'Amused Shrug', category: 'Shrug & Whatever', description: 'Not my problem haha' },
  { id: 'kao-sh3', art: '╮(︶▽︶)╭', name: 'Serene Shrug', category: 'Shrug & Whatever', description: 'Peace with the situation' },
  { id: 'kao-sh4', art: '┐( ´ д ` )┌', name: 'Helpless Shrug', category: 'Shrug & Whatever', description: 'I have no clue honestly' },
  { id: 'kao-sh5', art: '╮( ˘ ､ ˘ )╭', name: 'Unbothered Shrug', category: 'Shrug & Whatever', description: 'Couldn\'t care less' },
  { id: 'kao-sh6', art: '┐(￣ヮ￣)┌', name: 'Cheerful Whatever', category: 'Shrug & Whatever', description: 'Oh well! Life goes on' },

  // --- Gaming & Battle ---
  { id: 'kao-g1', art: '⚔️ (ง\'̀-\'́)ง ⚔️', name: 'Ready to Box / Duel', category: 'Gaming & Battle', description: 'Put up your dukes' },
  { id: 'kao-g2', art: '(ง •̀_•́)ง', name: 'Determination Stance', category: 'Gaming & Battle', description: 'Never back down' },
  { id: 'kao-g3', art: '̿̿ ̿̿ ̿̿ ̿\'̿\'\\̵͇̿̿\\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/\'̿\'̿ ̿ ̿̿ ̿̿', name: 'Dual Pistol Hitman', category: 'Gaming & Battle', description: 'Action movie protagonist' },
  { id: 'kao-g4', art: 'ᕦ(ò_óˇ)ᕤ', name: 'Berserker Muscle Rage', category: 'Gaming & Battle', description: 'Maximum power' },
  { id: 'kao-g5', art: '(☞ﾟヮﾟ)☞ 🎮', name: 'Player 2 Ready', category: 'Gaming & Battle', description: 'Pick up the controller' },
  { id: 'kao-g6', art: '꧁༺(•̀ᴗ•́)و༻꧂', name: 'Mythic Champion', category: 'Gaming & Battle', description: 'Gold rank aura' },
  { id: 'kao-g7', art: '(⌐■_■)', name: 'Deal With It Glasses', category: 'Gaming & Battle', description: 'Pro victory dance' },
  { id: 'kao-g8', art: 'ᕦ( ͡° ͜ʖ ͡°)ᕤ', name: 'Flexing Lenny', category: 'Gaming & Battle', description: 'Flexing confidence' },

  // --- Animals ---
  { id: 'kao-an1', art: '(=^･ω･^=)', name: 'Curious Cat', category: 'Animals', description: 'Soft kitty whiskers' },
  { id: 'kao-an2', art: '(=^･ｪ･^=)', name: 'Gentle Kitten', category: 'Animals', description: 'Purring kitten' },
  { id: 'kao-an3', art: '(^._.^)ﾉ', name: 'Cat Paw Wave', category: 'Animals', description: 'Reaching out with a paw' },
  { id: 'kao-an4', art: '( ´(00)`)', name: 'Cute Piglet', category: 'Animals', description: 'Oink oink snoot' },
  { id: 'kao-an5', art: 'ʕ•ᴥ•ʔ', name: 'Teddy Bear', category: 'Animals', description: 'Snuggly soft bear' },
  { id: 'kao-an6', art: 'ʕノ•ᴥ•ʔノ ︵ ┻━┻', name: 'Bear Flipping Table', category: 'Animals', description: 'Wild bear table flip' },
  { id: 'kao-an7', art: '(=⌒‿‿⌒=)', name: 'Smiling Cheshire Cat', category: 'Animals', description: 'Grinning from ear to ear' },
  { id: 'kao-an8', art: '(・ω・)', name: 'Playful Puppy', category: 'Animals', description: 'Waiting for a treat' },
  { id: 'kao-an9', art: '₍ᐢ. ̫.ᐢ₎', name: 'Cottontail Bunny', category: 'Animals', description: 'Wiggling nose' },

  // --- Surprised & Shock ---
  { id: 'kao-su1', art: '(⊙_⊙)', name: 'Wide Eyed Stare', category: 'Surprised & Shock', description: 'In complete disbelief' },
  { id: 'kao-su2', art: '(°ロ°) !', name: 'Gasping in Shock', category: 'Surprised & Shock', description: 'Jaw dropped' },
  { id: 'kao-su3', art: '(・・;)ゞ', name: 'Scratches Head Nervous', category: 'Surprised & Shock', description: 'Caught off guard' },
  { id: 'kao-su4', art: 'Σ(°Д°)', name: 'Anime Heart Attack Shock', category: 'Surprised & Shock', description: 'Mind exploded' },
  { id: 'kao-su5', art: '( ; ﾟДﾟ)', name: 'Sweating Bullets', category: 'Surprised & Shock', description: 'Terrified realization' },
  { id: 'kao-su6', art: '(°o°)', name: 'Astonished', category: 'Surprised & Shock', description: 'Astonished gasp' }
];

export const TEXT_ART_ITEMS: TextArtItem[] = [
  {
    id: 'art-1',
    title: 'Sparkle Cloud Banner',
    category: 'Aesthetic Borders',
    art: ` ｡ﾟﾟ･｡･ﾟﾟ｡
 ﾟ。    ｡ﾟ
  ﾟ･｡･ﾟ
  🌸 𝓁 ℴ 𝓋 ℯ 🌸`
  },
  {
    id: 'art-2',
    title: 'Cyber Gaming Frame',
    category: 'Gaming Banners',
    art: `╔══════════════════════╗
   ⚔️ VICTORY ROYALE ⚔️  
╚══════════════════════╝`
  },
  {
    id: 'art-3',
    title: 'Teddy Bear Hug',
    category: 'Cute Art',
    art: `  (\\__/)
  (•ㅅ•)  Don't give up!
  / づ♡`
  },
  {
    id: 'art-4',
    title: 'Floating Aesthetic Moon',
    category: 'Cosmic & Space',
    art: `   *   .                  .
       .   ☾  ˚  .     *   .
  .  *     .  °  .       *
      dream without fear`
  },
  {
    id: 'art-5',
    title: 'Cat in a Box',
    category: 'Cute Art',
    art: `   /\\_/\\
  ( o.o )
   > ^ <
 [_______]`
  },
  {
    id: 'art-6',
    title: 'Sword Clan Insignia',
    category: 'Gaming Banners',
    art: `       |\\                     /)
     /\\_\\\\__               (_//
    |   \`>\\-=-=-=-=-=-=-=-=-/<<
     \\/_//¯¯               (\\?\\
       |/                     \\)`
  },
  {
    id: 'art-7',
    title: 'Love Letters Envelope',
    category: 'Aesthetic Borders',
    art: `  +--------------+
  |  to: someone |
  |   special    |
  |     ♡        |
  +--------------+`
  },
  {
    id: 'art-8',
    title: 'Starry Constellation',
    category: 'Cosmic & Space',
    art: `       .  *  ✦  .
  *  ✧  .  ˚  .  ★  *
   .  *  ✦  .  ✧  .
   glow in the dark`
  }
];
