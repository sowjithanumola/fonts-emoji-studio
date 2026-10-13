import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Copy, 
  Smartphone, 
  Sparkles, 
  Star, 
  Check, 
  RefreshCw, 
  MapPin, 
  Briefcase, 
  Heart,
  Instagram,
  Gamepad,
  User,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BIO_TEMPLATES, BIO_CATEGORIES } from '../../data/bioTemplates';
import { CopyButton } from '../common/CopyButton';

export const BioStudioView: React.FC = () => {
  const { copyToClipboard, toggleFavorite, isFavorite } = useApp();

  // Customizer fields
  const [name, setName] = useState('Elena');
  const [title, setTitle] = useState('Creative Director');
  const [location, setLocation] = useState('Tokyo / London');
  const [interests, setInterests] = useState('design · 35mm film · matcha');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Currently active bio in the live editor
  const [activeBioText, setActiveBioText] = useState<string>(() => {
    return BIO_TEMPLATES[0].template
      .replace(/{NAME}/g, 'Elena')
      .replace(/{TITLE}/g, 'Creative Director')
      .replace(/{LOCATION}/g, 'Tokyo / London')
      .replace(/{INTERESTS}/g, 'design · 35mm film · matcha');
  });

  // Filter templates
  const filteredTemplates = useMemo(() => {
    if (selectedCategory === 'All') return BIO_TEMPLATES;
    return BIO_TEMPLATES.filter(b => b.platform === selectedCategory);
  }, [selectedCategory]);

  const loadTemplateIntoEditor = (tplStr: string) => {
    const populated = tplStr
      .replace(/{NAME}/g, name || 'Your Name')
      .replace(/{TITLE}/g, title || 'Your Title')
      .replace(/{LOCATION}/g, location || 'Your City')
      .replace(/{INTERESTS}/g, interests || 'Your Passions');
    setActiveBioText(populated);
  };

  // Quick decorators
  const insertTextAtEnd = (text: string) => {
    setActiveBioText(prev => prev + '\n' + text);
  };

  // Character limit calculations
  const charCount = activeBioText.length;
  const igLimit = 150;
  const twitterLimit = 160;
  const tiktokLimit = 80;

  return (
    <div className="space-y-8 pb-20">
      {/* Top Customizer & Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Variables & Bio Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Personalization Inputs */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-purple-950/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Personalize Variables</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 block mb-1">
                  Name / Nickname
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena"
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 block mb-1">
                  Title / Role
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Creative Director"
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 block mb-1">
                  Location / Base
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Tokyo / London"
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 block mb-1">
                  Interests / Keywords
                </label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="design · film · coffee"
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Active Bio Editor */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-purple-950/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Live Bio Editor
              </span>

              <CopyButton
                text={activeBioText}
                label="Custom Bio"
                type="bio"
                showText={true}
                variant="primary"
              />
            </div>

            <textarea
              value={activeBioText}
              onChange={(e) => setActiveBioText(e.target.value)}
              rows={6}
              className="w-full p-4 text-sm font-sans rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y leading-relaxed"
            />

            {/* Quick Symbol & Divider Insertion Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              <span className="text-[10px] text-neutral-400 shrink-0 font-medium mr-1">Insert:</span>
              {[
                '─── ⋆⋅☆⋅⋆ ───',
                '✦ ⋆ ✧ ⋆ ✦',
                'ʚïɞ',
                '✨ 🌸 💫',
                '⚔️ 🎮 ⚡',
                '☕ · 📷 · 🌿',
                '👇 link below'
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => insertTextAtEnd(item)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-mono shrink-0 cursor-pointer transition-colors"
                >
                  +{item}
                </button>
              ))}
            </div>

            {/* Platform Limit Meters */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <span className="text-[10px] text-neutral-400 block font-semibold">Instagram (150)</span>
                <span className={`text-xs font-mono font-bold ${charCount > igLimit ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {charCount} / {igLimit}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <span className="text-[10px] text-neutral-400 block font-semibold">Twitter/X (160)</span>
                <span className={`text-xs font-mono font-bold ${charCount > twitterLimit ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {charCount} / {twitterLimit}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <span className="text-[10px] text-neutral-400 block font-semibold">TikTok (80)</span>
                <span className={`text-xs font-mono font-bold ${charCount > tiktokLimit ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {charCount} / {tiktokLimit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Phone Live Profile Mockup (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="mx-auto max-w-sm rounded-[2.5rem] p-3 bg-neutral-900 border-4 border-neutral-800 shadow-2xl shadow-purple-950/20 text-white">
              {/* Notch */}
              <div className="w-24 h-4 bg-neutral-800 rounded-b-xl mx-auto mb-3" />

              {/* Profile Card Header Mockup */}
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-tight">@{name.toLowerCase().replace(/\s+/g, '_') || 'username'}</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-400 p-0.5 shrink-0">
                    <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-xl font-bold">
                      {name.charAt(0) || 'E'}
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-3 text-center gap-1">
                    <div>
                      <div className="text-xs font-bold font-mono">142</div>
                      <div className="text-[10px] text-neutral-400">posts</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold font-mono">18.4k</div>
                      <div className="text-[10px] text-neutral-400">followers</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold font-mono">512</div>
                      <div className="text-[10px] text-neutral-400">following</div>
                    </div>
                  </div>
                </div>

                {/* Profile Bio Render */}
                <div className="space-y-1 text-left">
                  <div className="text-xs font-bold text-neutral-100">{name || 'Your Name'}</div>
                  <pre className="text-xs font-sans text-neutral-300 whitespace-pre-wrap leading-relaxed break-words font-normal">
                    {activeBioText}
                  </pre>
                </div>

                {/* Mock Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button className="py-1.5 rounded-lg bg-white text-neutral-950 text-xs font-semibold text-center pointer-events-none">
                    Follow
                  </button>
                  <button className="py-1.5 rounded-lg bg-neutral-800 text-white text-xs font-semibold text-center pointer-events-none">
                    Message
                  </button>
                </div>
              </div>

              {/* Bottom home bar */}
              <div className="w-28 h-1 bg-neutral-700 rounded-full mx-auto mt-4 mb-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Preset Bio Templates Library */}
      <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              Ready-to-Use Bio Templates
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Click &quot;Load into Editor&quot; or copy directly to your clipboard.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {BIO_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white dark:bg-[#11121d] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((item) => {
            const populated = item.template
              .replace(/{NAME}/g, name || 'Elena')
              .replace(/{TITLE}/g, title || 'Creative Director')
              .replace(/{LOCATION}/g, location || 'Tokyo')
              .replace(/{INTERESTS}/g, interests || 'design · art');
            const fav = isFavorite(populated);

            return (
              <div
                key={item.id}
                className="group p-5 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/40 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">
                      {item.platform}
                    </span>
                  </div>

                  <pre className="p-3 my-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800 text-xs font-sans text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
                    {populated}
                  </pre>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
                  <button
                    onClick={() => loadTemplateIntoEditor(item.template)}
                    className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                  >
                    Load into Editor →
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        toggleFavorite({
                          id: item.id,
                          type: 'bio',
                          title: item.title,
                          content: populated,
                          category: item.platform
                        });
                      }}
                      className="p-1 text-neutral-400 hover:text-amber-500 cursor-pointer"
                      title={fav ? 'Remove favorite' : 'Add favorite'}
                    >
                      <Star className={`w-3.5 h-3.5 ${fav ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                    <CopyButton text={populated} label={item.title} type="bio" size="sm" variant="subtle" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
