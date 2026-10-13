import React, { useState } from 'react';
import { 
  Smile, 
  Type, 
  Sparkles, 
  Laugh, 
  Crown, 
  FileText, 
  Star, 
  ArrowRight, 
  CopyCheck, 
  Flame, 
  Zap,
  Layers,
  Sparkle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CopyButton } from '../common/CopyButton';
import { POPULAR_EMOJIS } from '../../data/emojis';
import { FONT_STYLES } from '../../data/fonts';
import { SYMBOLS } from '../../data/symbols';
import { NavPage } from '../../types';

export const HomeView: React.FC = () => {
  const { setActivePage, addToStack, copyToClipboard } = useApp();
  const [heroInput, setHeroInput] = useState('Emoji & Fonts Studio');

  // Pick top 6 trending fonts for live demo
  const trendingFontIds = ['bold-serif', 'script-cursive', 'double-struck', 'small-caps', 'white-bubble', 'fraktur-gothic'];
  const trendingStyles = FONT_STYLES.filter(f => trendingFontIds.includes(f.id));

  // Feature cards
  const features: {
    id: NavPage;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
    sample: string;
  }[] = [
    {
      id: 'fonts',
      title: 'Fancy Fonts Generator',
      description: 'Convert text into 40+ mathematical, gothic, cursive, bubble, and inverted Unicode styles.',
      icon: Type,
      accent: 'from-purple-500/20 to-indigo-500/10 text-purple-400',
      sample: '𝔈𝔵𝔭𝔯𝔢𝔰𝔰 𝔜𝔬𝔲𝔯 𝔖𝔱𝔶𝔩𝔢'
    },
    {
      id: 'emojis',
      title: 'Emoji Explorer',
      description: 'Search 500+ categorized emojis, combine them into custom combos, and copy with one click.',
      icon: Smile,
      accent: 'from-amber-500/20 to-orange-500/10 text-amber-400',
      sample: '✨ 🪐 🦋 🚀 💖'
    },
    {
      id: 'symbols',
      title: 'Symbols Library',
      description: 'Discover aesthetic dividers, hearts, stars, arrows, currency, brackets, and math symbols.',
      icon: Sparkles,
      accent: 'from-blue-500/20 to-cyan-500/10 text-blue-400',
      sample: '─── ⋆⋅☆⋅⋆ ───'
    },
    {
      id: 'names',
      title: 'Stylish Name Generator',
      description: 'Generate pro gaming clan tags, aesthetic TikTok handles, and cute Discord nicknames.',
      icon: Crown,
      accent: 'from-emerald-500/20 to-teal-500/10 text-emerald-400',
      sample: '꧁༺ 𝕬𝖑𝖊𝖝 ༻꧂'
    },
    {
      id: 'kaomoji',
      title: 'Kaomoji & Text Art',
      description: 'Copy expressive Japanese faces like (◕‿◕) and (╥﹏╥), plus ASCII banners and borders.',
      icon: Laugh,
      accent: 'from-pink-500/20 to-rose-500/10 text-pink-400',
      sample: '(づ｡◕‿‿◕｡)づ'
    },
    {
      id: 'bios',
      title: 'Bio Studio',
      description: 'Craft high-converting, aesthetic bios for Instagram, Twitch, TikTok, and creator portfolios.',
      icon: FileText,
      accent: 'from-violet-500/20 to-fuchsia-500/10 text-violet-400',
      sample: '☁️ visual diary · {NAME}'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-neutral-200 dark:border-neutral-800/80 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-[#0d0e17] dark:via-[#090a10] dark:to-[#090a10]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 -z-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <Sparkle className="w-4 h-4" />
            <span>EXPRESS MORE. COPY INSTANTLY.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
            Your Text.{' '}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Your Style.
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Generate 40+ fancy Unicode fonts, search hundreds of categorized emojis, grab aesthetic symbols, build gaming gamer tags, and create unforgettable social media bios.
          </p>

          {/* Interactive Live Hero Transformation Demo */}
          <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-purple-950/10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={heroInput}
                  onChange={(e) => setHeroInput(e.target.value)}
                  placeholder="Type anything to test styles..."
                  className="w-full px-4 py-3 text-sm sm:text-base font-medium rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700/80 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={() => setActivePage('fonts')}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-600/25 cursor-pointer transition-all active:scale-95 shrink-0"
              >
                <span>View All 40+ Fonts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Live Transformer Preview Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {trendingStyles.map((style) => {
                const transformed = style.transform(heroInput || 'Studio');
                return (
                  <div
                    key={style.id}
                    onClick={() => copyToClipboard(transformed, style.name, 'font')}
                    className="group flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-300 dark:hover:border-purple-700/50 transition-all cursor-pointer"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
                        {style.name}
                      </div>
                      <div className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                        {transformed}
                      </div>
                    </div>
                    <CopyButton
                      text={transformed}
                      label={style.name}
                      type="font"
                      size="icon"
                      variant="ghost"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Emojis Quick Tray */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
              Trending Emojis of the Day
            </h2>
            <span className="text-xs text-neutral-400">· Click to copy or add to combo</span>
          </div>
          <button
            onClick={() => setActivePage('emojis')}
            className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium cursor-pointer"
          >
            Explore all 500+ →
          </button>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-16 gap-2">
          {POPULAR_EMOJIS.map((emoji, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center justify-center p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/50 hover:scale-110 transition-all cursor-pointer shadow-sm"
              onClick={() => copyToClipboard(emoji, 'Emoji', 'emoji')}
            >
              <span className="text-xl select-none">{emoji}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToStack(emoji);
                }}
                title="Add to combo stack"
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-[10px] items-center justify-center opacity-0 group-hover:flex transition-opacity shadow-sm"
              >
                +
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
            Creative Toolset
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Everything you need for gaming handles, social media aesthetics, and styled communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={() => setActivePage(feature.id)}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-[#11121c] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/20 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.accent} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-neutral-400 group-hover:text-purple-500 transition-colors">
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-600/80 dark:text-purple-400/80 truncate">
                    {feature.sample}
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-400 group-hover:text-neutral-200">
                    Open
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Aesthetic Dividers Preview */}
      <section className="p-6 rounded-2xl bg-white dark:bg-[#11121c] border border-neutral-200 dark:border-neutral-800/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
              Featured Aesthetic Dividers
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              One-click aesthetic text lines for Instagram captions, Discord channels, and bios.
            </p>
          </div>
          <button
            onClick={() => setActivePage('symbols')}
            className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium cursor-pointer"
          >
            All symbols →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SYMBOLS.filter(s => s.category === 'Aesthetic Dividers').slice(0, 6).map((sym) => (
            <div
              key={sym.id}
              onClick={() => copyToClipboard(sym.char, sym.name, 'symbol')}
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-800 transition-all cursor-pointer"
            >
              <div className="font-mono text-xs text-neutral-800 dark:text-neutral-200 truncate pr-2">
                {sym.char}
              </div>
              <CopyButton text={sym.char} label={sym.name} type="symbol" size="icon" variant="ghost" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
