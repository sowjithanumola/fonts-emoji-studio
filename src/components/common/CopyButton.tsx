import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FavoriteItem } from '../../types';

interface CopyButtonProps {
  text: string;
  label?: string;
  type?: FavoriteItem['type'];
  size?: 'sm' | 'md' | 'icon';
  variant?: 'subtle' | 'primary' | 'ghost';
  className?: string;
  showText?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  type = 'font',
  size = 'sm',
  variant = 'subtle',
  className = '',
  showText = false
}) => {
  const { copyToClipboard } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(text, label, type);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer';

  let variantStyles = 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white dark:bg-white/5 dark:hover:bg-white/10 dark:text-neutral-300 dark:hover:text-white border border-neutral-700/50 dark:border-white/10';
  if (variant === 'primary') {
    variantStyles = 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/20';
  } else if (variant === 'ghost') {
    variantStyles = 'text-neutral-400 hover:text-neutral-100 hover:bg-white/5';
  }

  const sizeStyles = size === 'icon' 
    ? 'p-2 w-8 h-8' 
    : size === 'md' 
    ? 'px-3.5 py-1.5 text-xs gap-1.5' 
    : 'px-2.5 py-1 text-xs gap-1';

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      aria-label={`Copy ${label || text}`}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[2.5]" />
          {showText && <span className="text-emerald-400">Copied</span>}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 shrink-0" />
          {showText && <span>Copy</span>}
        </>
      )}
    </button>
  );
};
