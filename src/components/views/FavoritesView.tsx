import React, { useState, useMemo } from 'react';
import { 
  Star, 
  History, 
  Trash2, 
  Copy, 
  Download, 
  Clock, 
  Check, 
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CopyButton } from '../common/CopyButton';

type TabMode = 'favorites' | 'history';
type FilterType = 'all' | 'emoji' | 'font' | 'symbol' | 'kaomoji' | 'name' | 'bio';

export const FavoritesView: React.FC = () => {
  const { 
    favorites, 
    clearFavorites, 
    history, 
    clearHistory, 
    copyToClipboard, 
    toggleFavorite,
    setActivePage,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabMode>('favorites');
  const [filterType, setFilterType] = useState<FilterType>('all');

  const filteredFavorites = useMemo(() => {
    if (filterType === 'all') return favorites;
    return favorites.filter(f => f.type === filterType);
  }, [favorites, filterType]);

  const filteredHistory = useMemo(() => {
    if (filterType === 'all') return history;
    return history.filter(h => h.type === filterType);
  }, [history, filterType]);

  const handleExportJSON = () => {
    if (favorites.length === 0) {
      showToast('No favorites to export');
      return;
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'emoji-fonts-favorites.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Export downloaded successfully!');
  };

  const filterOptions: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'emoji', label: 'Emojis' },
    { id: 'font', label: 'Fonts' },
    { id: 'symbol', label: 'Symbols' },
    { id: 'kaomoji', label: 'Kaomoji' },
    { id: 'name', label: 'Names' },
    { id: 'bio', label: 'Bios' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Controls: Switch between Favorites and History */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center p-1 rounded-2xl bg-neutral-100 dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-white dark:bg-neutral-800 text-amber-500 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Saved Favorites ({favorites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-white dark:bg-neutral-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Clipboard History ({history.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'favorites' && favorites.length > 0 && (
            <>
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold cursor-pointer transition-colors"
                title="Download backup JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={clearFavorites}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-semibold cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Favorites</span>
              </button>
            </>
          )}

          {activeTab === 'history' && history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter by Type Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filterOptions.map((opt) => {
          const isActive = filterType === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setFilterType(opt.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-white dark:bg-[#11121d] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Favorites Content */}
      {activeTab === 'favorites' && (
        <>
          {filteredFavorites.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800">
              <Star className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                No favorites saved yet
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
                Click the star icon (★) on any font style, emoji, symbol, kaomoji, or name tag to save it here for instant access!
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={() => setActivePage('fonts')}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md cursor-pointer"
                >
                  Browse Fonts →
                </button>
                <button
                  onClick={() => setActivePage('emojis')}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                >
                  Browse Emojis →
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredFavorites.map((fav) => (
                <div
                  key={fav.id}
                  onClick={() => copyToClipboard(fav.content, fav.title, fav.type)}
                  className="group p-4 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/40 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[150px]">
                          {fav.title}
                        </span>
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">
                          · {fav.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(fav);
                          }}
                          className="p-1 text-amber-500 hover:text-rose-500 cursor-pointer"
                          title="Remove favorite"
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        </button>
                        <CopyButton text={fav.content} label={fav.title} type={fav.type} size="icon" variant="ghost" />
                      </div>
                    </div>

                    <div className="p-3 my-1 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/60 flex items-center justify-center min-h-[52px]">
                      <span className="text-base sm:text-lg font-mono text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-center break-words max-w-full">
                        {fav.content}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-neutral-400 text-right">
                    Saved {new Date(fav.savedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* History Content */}
      {activeTab === 'history' && (
        <>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800">
              <History className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Clipboard history is empty
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
                Whenever you copy fonts, emojis, kaomojis, or symbols anywhere in the app, your recent clips are saved here automatically!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => copyToClipboard(item.content, item.label, item.type)}
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/40 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-4">
                    <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-xs font-mono text-purple-600 dark:text-purple-400 shrink-0">
                      {item.type.slice(0, 3).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-mono text-neutral-900 dark:text-white truncate">
                        {item.content}
                      </div>
                      <div className="text-[10px] text-neutral-400 flex items-center gap-2">
                        {item.label && <span>{item.label}</span>}
                        <span>·</span>
                        <Clock className="w-3 h-3 inline" />
                        <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  <CopyButton text={item.content} label={item.label} type={item.type} size="sm" variant="subtle" showText={true} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
