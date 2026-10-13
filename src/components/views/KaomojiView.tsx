import React, { useState, useMemo } from 'react';
import { 
  Laugh, 
  Search, 
  Star, 
  Copy, 
  Sparkles, 
  Image as ImageIcon,
  X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { KAOMOJIS, KAOMOJI_CATEGORIES, TEXT_ART_ITEMS } from '../../data/kaomoji';
import { CopyButton } from '../common/CopyButton';

export const KaomojiView: React.FC = () => {
  const { 
    copyToClipboard, 
    toggleFavorite, 
    isFavorite,
    searchQueryGlobal,
    setSearchQueryGlobal
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'kaomoji' | 'textart'>('kaomoji');

  const effectiveSearch = searchQueryGlobal || localSearch;

  const filteredKaomojis = useMemo(() => {
    const q = effectiveSearch.toLowerCase().trim();
    return KAOMOJIS.filter((k) => {
      const matchCat = activeCategory === 'All' || k.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        k.name.toLowerCase().includes(q) ||
        k.art.includes(q) ||
        (k.description && k.description.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, effectiveSearch]);

  const filteredTextArt = useMemo(() => {
    const q = effectiveSearch.toLowerCase().trim();
    if (!q) return TEXT_ART_ITEMS;
    return TEXT_ART_ITEMS.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.art.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [effectiveSearch]);

  return (
    <div className="space-y-6 pb-20">
      {/* Switch between Kaomoji Faces & Text Art Banners */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab('kaomoji')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'kaomoji'
                ? 'bg-white dark:bg-neutral-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Laugh className="w-3.5 h-3.5" />
            <span>Kaomoji Faces ({KAOMOJIS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('textart')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'textart'
                ? 'bg-white dark:bg-neutral-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>ASCII Text Art & Frames</span>
          </button>
        </div>

        <span className="text-xs text-neutral-400">
          Click any face or art block to copy instantly
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={effectiveSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            setSearchQueryGlobal(e.target.value);
          }}
          placeholder="Search kaomojis (e.g. hug, shrug, tears, table flip, happy, cat)..."
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

      {activeTab === 'kaomoji' && (
        <>
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {KAOMOJI_CATEGORIES.map((cat) => {
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

          {/* Kaomoji Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredKaomojis.map((kao) => {
              const fav = isFavorite(kao.art);
              return (
                <div
                  key={kao.id}
                  onClick={() => copyToClipboard(kao.art, kao.name, 'kaomoji')}
                  className="group p-4 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/15 transition-all cursor-pointer flex flex-col justify-between min-h-[110px]"
                >
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                    <span className="font-semibold text-neutral-600 dark:text-neutral-300 truncate pr-2">
                      {kao.name}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite({
                            id: kao.id,
                            type: 'kaomoji',
                            title: kao.name,
                            content: kao.art,
                            category: kao.category
                          });
                        }}
                        className="p-1 text-neutral-400 hover:text-amber-500 transition-colors cursor-pointer"
                        title={fav ? 'Remove favorite' : 'Add favorite'}
                      >
                        <Star className={`w-3.5 h-3.5 ${fav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <CopyButton text={kao.art} label={kao.name} type="kaomoji" size="icon" variant="ghost" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center my-auto py-2">
                    <span className="text-base sm:text-lg font-mono font-medium text-neutral-900 dark:text-white group-hover:scale-105 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all text-center">
                      {kao.art}
                    </span>
                  </div>

                  {kao.description && (
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 truncate mt-1">
                      {kao.description}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'textart' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTextArt.map((art) => {
            const fav = isFavorite(art.art);
            return (
              <div
                key={art.id}
                className="group p-5 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {art.title}
                    </h3>
                    <span className="text-[11px] text-neutral-400">{art.category}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        toggleFavorite({
                          id: art.id,
                          type: 'kaomoji',
                          title: art.title,
                          content: art.art,
                          category: art.category
                        });
                      }}
                      className="p-1 text-neutral-400 hover:text-amber-500 transition-colors cursor-pointer"
                      title={fav ? 'Remove favorite' : 'Add favorite'}
                    >
                      <Star className={`w-3.5 h-3.5 ${fav ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                    <CopyButton text={art.art} label={art.title} type="kaomoji" showText={true} variant="primary" />
                  </div>
                </div>

                <pre 
                  onClick={() => copyToClipboard(art.art, art.title, 'kaomoji')}
                  className="p-4 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed border border-neutral-800 cursor-pointer hover:border-purple-500/50 transition-colors"
                >
                  {art.art}
                </pre>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
