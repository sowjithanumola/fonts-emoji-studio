import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Star, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  X,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SYMBOLS, SYMBOL_CATEGORIES } from '../../data/symbols';
import { CopyButton } from '../common/CopyButton';

export const SymbolsView: React.FC = () => {
  const { 
    copyToClipboard, 
    toggleFavorite, 
    isFavorite,
    searchQueryGlobal,
    setSearchQueryGlobal
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [builderString, setBuilderString] = useState<string>('');
  const [copiedBuilder, setCopiedBuilder] = useState(false);

  const effectiveSearch = searchQueryGlobal || localSearch;

  const filteredSymbols = useMemo(() => {
    const q = effectiveSearch.toLowerCase().trim();
    return SYMBOLS.filter((sym) => {
      const matchesCat = activeCategory === 'All' || sym.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return sym.name.toLowerCase().includes(q) || sym.char.includes(q);
    });
  }, [activeCategory, effectiveSearch]);

  const handleAppendToBuilder = (char: string) => {
    setBuilderString(prev => prev + char);
  };

  const handleCopyBuilder = async () => {
    if (!builderString) return;
    const ok = await copyToClipboard(builderString, 'Custom Symbols Combo', 'symbol');
    if (ok) {
      setCopiedBuilder(true);
      setTimeout(() => setCopiedBuilder(false), 1600);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Symbols Stacker & Quick Builder Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-500" />
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
              Symbol Accumulator & Builder
            </h3>
            <span className="text-[11px] text-neutral-400">· Tap any symbol to append</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setBuilderString('')}
              disabled={!builderString}
              className="p-1.5 text-xs text-neutral-400 hover:text-rose-500 disabled:opacity-30 cursor-pointer"
              title="Clear builder"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyBuilder}
              disabled={!builderString}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 cursor-pointer transition-all shadow-md shadow-purple-600/20"
            >
              {copiedBuilder ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy String</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center min-h-[46px]">
          <span className="text-base sm:text-lg font-mono text-neutral-900 dark:text-white break-all">
            {builderString || (
              <span className="text-xs text-neutral-400 font-sans">
                Click symbols below to string together custom text dividers and patterns...
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={effectiveSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setSearchQueryGlobal(e.target.value);
            }}
            placeholder="Search symbols (e.g. star, arrow, heart, divider, bracket, music, moon)..."
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

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SYMBOL_CATEGORIES.map((cat) => {
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

      {/* Grid Display: aesthetic dividers are wider, individual characters are square */}
      <div className="space-y-4">
        {/* Dividers Section if active category is All or Aesthetic Dividers */}
        {(activeCategory === 'All' || activeCategory === 'Aesthetic Dividers') && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Aesthetic Dividers & Borders
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SYMBOLS.filter(s => s.category === 'Aesthetic Dividers').map((sym) => {
                const fav = isFavorite(sym.char);
                return (
                  <div
                    key={sym.id}
                    onClick={() => {
                      copyToClipboard(sym.char, sym.name, 'symbol');
                      handleAppendToBuilder(sym.char);
                    }}
                    className="group p-3.5 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/50 hover:shadow-lg transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] text-neutral-400 block truncate">{sym.name}</span>
                      <span className="text-xs sm:text-sm font-mono text-neutral-900 dark:text-white block truncate">
                        {sym.char}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite({
                            id: sym.id,
                            type: 'symbol',
                            title: sym.name,
                            content: sym.char,
                            category: sym.category
                          });
                        }}
                        className="p-1 text-neutral-400 hover:text-amber-500 cursor-pointer"
                        title={fav ? 'Remove favorite' : 'Add favorite'}
                      >
                        <Star className={`w-3.5 h-3.5 ${fav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <CopyButton text={sym.char} label={sym.name} type="symbol" size="icon" variant="ghost" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Individual Symbols Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {activeCategory === 'All' ? 'Individual Symbols & Glyphs' : `${activeCategory} (${filteredSymbols.length})`}
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2.5">
            {filteredSymbols
              .filter(s => s.category !== 'Aesthetic Dividers' || activeCategory === 'Aesthetic Dividers')
              .map((sym) => {
                const fav = isFavorite(sym.char);
                return (
                  <div
                    key={sym.id}
                    onClick={() => {
                      copyToClipboard(sym.char, sym.name, 'symbol');
                      handleAppendToBuilder(sym.char);
                    }}
                    className="group relative flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer text-center"
                    title={`${sym.name} (Click to copy & append)`}
                  >
                    <span className="text-xl sm:text-2xl font-mono text-neutral-900 dark:text-white select-none group-hover:scale-120 transition-transform">
                      {sym.char}
                    </span>

                    <span className="mt-1 text-[10px] text-neutral-400 truncate w-full px-1">
                      {sym.name}
                    </span>

                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite({
                            id: sym.id,
                            type: 'symbol',
                            title: sym.name,
                            content: sym.char,
                            category: sym.category
                          });
                        }}
                        className="p-1 rounded-md text-neutral-400 hover:text-amber-500 cursor-pointer"
                        title="Favorite"
                      >
                        <Star className={`w-3 h-3 ${fav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
