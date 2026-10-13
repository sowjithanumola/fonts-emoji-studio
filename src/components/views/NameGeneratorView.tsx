import React, { useState, useMemo } from 'react';
import { 
  Crown, 
  RefreshCw, 
  Copy, 
  Star, 
  Gamepad2, 
  Sparkles, 
  Heart, 
  Check, 
  Wand2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateStylishNames, NAME_CATEGORIES } from '../../data/nameStyles';
import { CopyButton } from '../common/CopyButton';

export const NameGeneratorView: React.FC = () => {
  const { copyToClipboard, toggleFavorite, isFavorite } = useApp();
  const [nameInput, setNameInput] = useState('Viper');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [seed, setSeed] = useState(0);

  // Generate names
  const allGenerated = useMemo(() => {
    // seed triggers fresh generation if needed
    return generateStylishNames(nameInput);
  }, [nameInput, seed]);

  const filteredNames = useMemo(() => {
    if (activeCategory === 'All') return allGenerated;
    return allGenerated.filter(n => n.category === activeCategory);
  }, [allGenerated, activeCategory]);

  const handleRandomize = () => {
    const samples = ['Shadow', 'Phoenix', 'Nova', 'Cyber', 'Aura', 'Frost', 'Kira', 'Echo', 'Drift', 'Ghost', 'Zenith', 'Luna'];
    const randomPick = samples[Math.floor(Math.random() * samples.length)];
    setNameInput(randomPick);
    setSeed(s => s + 1);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Input & Control Card */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-purple-950/10 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <span>Stylish Nickname & Tag Generator</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Enter your name or clan handle to generate high-ranking gaming tags, aesthetic social handles, and stylized banners.
            </p>
          </div>

          <button
            onClick={handleRandomize}
            className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold cursor-pointer transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Random Handle</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name or handle..."
              maxLength={24}
              className="w-full px-4 py-3 text-base sm:text-lg font-bold rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            />
          </div>
          <button
            onClick={() => setSeed(s => s + 1)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-600/25 cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <Wand2 className="w-4 h-4" />
            <span>Regenerate Styles</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 scrollbar-none">
          {NAME_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800/80 hover:bg-neutral-200/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>Generated {filteredNames.length} stylish variations for &quot;{nameInput || 'Alex'}&quot;</span>
          <span>Click any card to copy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredNames.map((item) => {
            const fav = isFavorite(item.result);
            return (
              <div
                key={item.id}
                onClick={() => copyToClipboard(item.result, item.styleName, 'name')}
                className="group p-4 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/15 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                      {item.styleName}
                    </span>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">
                      · {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite({
                          id: item.id,
                          type: 'name',
                          title: item.styleName,
                          content: item.result,
                          category: item.category
                        });
                      }}
                      className="p-1 text-neutral-400 hover:text-amber-500 cursor-pointer"
                      title={fav ? 'Remove favorite' : 'Add favorite'}
                    >
                      <Star className={`w-3.5 h-3.5 ${fav ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                    <CopyButton text={item.result} label={item.styleName} type="name" size="icon" variant="ghost" />
                  </div>
                </div>

                <div className="p-3 my-1 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/60 flex items-center justify-center min-h-[52px]">
                  <span className="text-base sm:text-lg font-mono text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-center break-all">
                    {item.result}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
