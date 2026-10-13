import React, { useState, useMemo } from 'react';
import { 
  Type, 
  Copy, 
  Trash2, 
  Star, 
  Info, 
  Check, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Files
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FONT_STYLES } from '../../data/fonts';
import { CopyButton } from '../common/CopyButton';

const FONT_CATEGORIES = [
  'All',
  'Serif & Sans',
  'Script & Gothic',
  'Decorated & Shapes',
  'Novelty & Fun',
  'Special & Accents'
] as const;

export const FontsView: React.FC = () => {
  const { copyToClipboard, toggleFavorite, isFavorite, showToast } = useApp();
  const [inputText, setInputText] = useState('Type your stylish text here...');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showInfo, setShowInfo] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // Filter styles by category
  const filteredStyles = useMemo(() => {
    if (selectedCategory === 'All') return FONT_STYLES;
    return FONT_STYLES.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  const handleCopyAll = async () => {
    const textToTransform = inputText.trim() || 'Sample Text';
    const allFormatted = filteredStyles.map(s => `${s.name}:\n${s.transform(textToTransform)}`).join('\n\n');
    const success = await copyToClipboard(allFormatted, 'All Font Styles', 'font');
    if (success) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1800);
    }
  };

  const handleClear = () => {
    setInputText('');
  };

  const currentSample = inputText.trim() || 'Express More';

  return (
    <div className="space-y-6 pb-20">
      {/* Educational Unicode Explainer Banner */}
      <div className="p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-950/20 border border-purple-500/20 text-neutral-800 dark:text-neutral-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                How do these fonts work everywhere?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                These are not TTF or OTF fonts that require installation! They use standardized <strong>Unicode symbols</strong> (such as Mathematical Alphanumeric Symbols and combining diacritics). You can copy and paste them directly into Instagram, Twitter/X, TikTok, Discord, YouTube, and WhatsApp without any special app.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowInfo(v => !v)}
            className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 shrink-0 cursor-pointer font-medium"
          >
            {showInfo ? 'Less details' : 'Learn more'}
            {showInfo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showInfo && (
          <div className="mt-3 pt-3 border-t border-purple-500/20 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
            <p>
              • <strong>Mathematical Alphanumerics:</strong> Characters like 𝐚, 𝘣, and 𝔤 belong to the Unicode Plane 1 (U+1D400–U+1D7FF) designated for mathematical notations.
            </p>
            <p>
              • <strong>Combining Diacritics:</strong> Effects like strikethrough (c̶) and underlines (c̲) use combining marks (U+0336, U+0332) placed after characters.
            </p>
            <p>
              • <strong>Screen Reader Accessibility:</strong> While stylish for handles and bios, avoid writing full paragraphs in mathematical fonts, as screen readers may spell them out character-by-character.
            </p>
          </div>
        )}
      </div>

      {/* Input Field Section */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-purple-950/10">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
            <Type className="w-3.5 h-3.5 text-purple-500" />
            <span>Enter Your Text</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              disabled={!inputText}
              className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg text-neutral-500 hover:text-rose-500 hover:bg-rose-500/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Text</span>
            </button>
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied All!</span>
                </>
              ) : (
                <>
                  <Files className="w-3.5 h-3.5" />
                  <span>Copy All Styles</span>
                </>
              )}
            </button>
          </div>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste any text here..."
          rows={2}
          className="w-full px-4 py-3 text-base sm:text-lg font-medium rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-y min-h-[70px]"
        />

        <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400">
          <span>{inputText.length} characters</span>
          <span>Generating {filteredStyles.length} live Unicode styles</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {FONT_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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

      {/* Font Style Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredStyles.map((style) => {
          const transformed = style.transform(currentSample);
          const fav = isFavorite(transformed);

          return (
            <div
              key={style.id}
              className="group p-4 rounded-2xl bg-white dark:bg-[#11121d] border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-950/15 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                      {style.name}
                    </span>
                    {style.badge && (
                      <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">
                        {style.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        toggleFavorite({
                          id: style.id,
                          type: 'font',
                          title: style.name,
                          content: transformed,
                          category: style.category
                        });
                      }}
                      title={fav ? 'Remove from favorites' : 'Save style'}
                      className="p-1 rounded-lg text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Star className={`w-3.5 h-3.5 ${fav ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                    <CopyButton
                      text={transformed}
                      label={style.name}
                      type="font"
                      showText={true}
                      variant="primary"
                    />
                  </div>
                </div>

                {/* Transformed Result Preview */}
                <div 
                  onClick={() => copyToClipboard(transformed, style.name, 'font')}
                  className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/60 text-base sm:text-lg font-medium text-neutral-900 dark:text-white break-words cursor-pointer hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-colors select-all"
                  title="Click to copy"
                >
                  {transformed}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
