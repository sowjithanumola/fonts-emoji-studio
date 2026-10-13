import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Star, 
  Layers, 
  Copy, 
  Flame, 
  Sparkles, 
  History,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EMOJIS, EMOJI_CATEGORIES } from '../../data/emojis';
import { CopyButton } from '../common/CopyButton';

export const EmojiView: React.FC = () => {
  const { 
    copyToClipboard, 
    toggleFavorite, 
    isFavorite, 
    addToStack, 
    history,
    searchQueryGlobal,
    setSearchQueryGlobal
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');

  const effectiveSearch = searchQueryGlobal || localSearch;

  // Filter emojis based on category and query
  const filteredEmojis = useMemo(() => {
    const q = effectiveSearch.toLowerCase().trim();
    return EMOJIS.filter((emoji) => {
      const matchesCat = activeCategory === 'All' || emoji.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        emoji.name.toLowerCase().includes(q) ||
        emoji.char.includes(q) ||
        emoji.keywords.some(k => k.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, effectiveSearch]);

  // Recent emojis from history
  const recentEmojis = useMemo(() => {
    return history
      .filter(item => item.type === 'emoji')
      .slice(0, 16);
  }, [history]);

  return (
    <div className="space-y-6 pb-20">
      {/* Search & Category Filter Header */}
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={effectiveSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setSearchQueryGlobal(e.target.value);
            }}
            placeholder="Search emojis by name, keyword, or emotion (e.g. fire, happy, dog, heart)..."
            className="w-full pl-11 pr-10 py-3 text-sm rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />
          {effectiveSearch && (
            <button
              onClick={() => {
                setLocalSearch('');
                setSearchQueryGlobal('');
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {EMOJI_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-white dark:bg-[#11121d] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recently Copied Emojis Row (if any exist) */}
      {recentEmojis.length > 0 && !effectiveSearch && (
        <div className="p-4 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <History className="w-3.5 h-3.5 text-purple-500" />
            <span>RECENTLY COPIED EMOJIS</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {recentEmojis.map((rec, i) => (
              <button
                key={`${rec.content}-${i}`}
                onClick={() => copyToClipboard(rec.content, rec.label, 'emoji')}
                title={`Copy ${rec.content}`}
                className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xl hover:scale-110 hover:border-purple-500/50 transition-all shrink-0 cursor-pointer"
              >
                {rec.content}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span>Showing {filteredEmojis.length} emojis</span>
        <span>Tip: Hover to favorite or add to combo stacker</span>
      </div>

      {/* Responsive Emoji Grid */}
      {filteredEmojis.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">No emojis found</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
            Try searching for another term like &quot;happy&quot;, &quot;animal&quot;, &quot;nature&quot;, or browse by category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2.5">
          {filteredEmojis.map((emoji) => {
            const fav = isFavorite(emoji.char);
            return (
              <div
                key={emoji.id}
                onClick={() => copyToClipboard(emoji.char, emoji.name, 'emoji')}
                className="group relative flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                title={`${emoji.name} (Click to copy)`}
              >
                <span className="text-2xl sm:text-3xl select-none group-hover:scale-115 transition-transform duration-150">
                  {emoji.char}
                </span>

                <span className="mt-1.5 text-[10px] text-neutral-500 dark:text-neutral-400 text-center truncate w-full px-1">
                  {emoji.name}
                </span>

                {/* Hover Quick Actions */}
                <div className="absolute top-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Add to Combo Stacker */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToStack(emoji.char);
                    }}
                    title="Add to combo stack"
                    className="w-5 h-5 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:bg-purple-600 text-neutral-600 dark:text-neutral-300 hover:text-white text-[11px] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    +
                  </button>

                  {/* Favorite Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite({
                        id: emoji.id,
                        type: 'emoji',
                        title: emoji.name,
                        content: emoji.char,
                        category: emoji.category
                      });
                    }}
                    title={fav ? 'Remove from favorites' : 'Add to favorites'}
                    className="w-5 h-5 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:bg-amber-500 text-neutral-600 dark:text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Star className={`w-3 h-3 ${fav ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
