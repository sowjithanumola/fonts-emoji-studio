import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Trash2, ChevronDown, ChevronUp, Layers, Check } from 'lucide-react';

export const EmojiStacker: React.FC = () => {
  const { emojiStack, removeFromStack, clearStack, copyStack } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  if (emojiStack.length === 0) return null;

  const handleCopy = () => {
    copyStack();
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto">
      <div className="bg-neutral-900/95 dark:bg-[#12131c]/95 border border-purple-500/30 text-white shadow-2xl shadow-purple-950/40 rounded-2xl backdrop-blur-xl p-3 px-4 transition-all duration-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-neutral-300">
              Combo Stacker ({emojiStack.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/20 cursor-pointer transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[2.5]" />
                  <span>Copied Combo</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All</span>
                </>
              )}
            </button>

            <button
              onClick={clearStack}
              title="Clear all stacked emojis"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsExpanded(v => !v)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto py-1 max-w-md">
            {emojiStack.map((char, index) => (
              <div
                key={`${char}-${index}`}
                className="group relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-lg shrink-0 border border-white/5 transition-all"
              >
                <span>{char}</span>
                <button
                  onClick={() => removeFromStack(index)}
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-[9px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
            <span className="text-[11px] text-neutral-400 pl-2 shrink-0 select-none">
              Tap any emoji to add more
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
