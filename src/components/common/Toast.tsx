import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none transition-all duration-300 ease-out transform translate-y-0 opacity-100">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md bg-neutral-900/90 dark:bg-neutral-950/95 text-white border-neutral-800 dark:border-purple-500/30">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="flex flex-col text-left max-w-xs">
          <span className="text-xs font-semibold text-neutral-100">{toast.text}</span>
          {toast.subtext && (
            <span className="text-[11px] text-neutral-400 font-mono truncate">{toast.subtext}</span>
          )}
        </div>
      </div>
    </div>
  );
};
