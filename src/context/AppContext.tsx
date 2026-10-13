import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { NavPage, FavoriteItem, HistoryItem, ToastMessage } from '../types';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activePage: NavPage;
  setActivePage: (page: NavPage) => void;
  favorites: FavoriteItem[];
  toggleFavorite: (item: { id: string; type: FavoriteItem['type']; title: string; content: string; category?: string }) => void;
  isFavorite: (content: string) => boolean;
  clearFavorites: () => void;
  history: HistoryItem[];
  clearHistory: () => void;
  copyToClipboard: (text: string, label?: string, type?: FavoriteItem['type']) => Promise<boolean>;
  toast: ToastMessage | null;
  showToast: (text: string, subtext?: string) => void;
  emojiStack: string[];
  addToStack: (char: string) => void;
  removeFromStack: (index: number) => void;
  clearStack: () => void;
  copyStack: () => void;
  totalCopies: number;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (v: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  searchQueryGlobal: string;
  setSearchQueryGlobal: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('studio_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'dark'; // Dark mode enabled by default
  });

  // Navigation state
  const [activePage, setActivePage] = useState<NavPage>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQueryGlobal, setSearchQueryGlobal] = useState<string>('');

  // Favorites state
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem('studio_favorites');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 'fav-sample-1', type: 'font', title: 'Serif Bold', content: '𝗘𝗺𝗼𝗷𝗶 & 𝗙𝗼𝗻𝘁𝘀 𝗦𝘁𝘂𝗱𝗶𝗼', category: 'Fonts', savedAt: Date.now() - 10000 },
      { id: 'fav-sample-2', type: 'emoji', title: 'Sparkles', content: '✨', category: 'Smileys', savedAt: Date.now() - 8000 },
      { id: 'fav-sample-3', type: 'symbol', title: 'Aesthetic Butterfly', content: 'ʚïɞ', category: 'Symbols', savedAt: Date.now() - 6000 },
      { id: 'fav-sample-4', type: 'kaomoji', title: 'Kawaii Hug', content: '(づ｡◕‿‿◕｡)づ', category: 'Kaomoji', savedAt: Date.now() - 4000 }
    ];
  });

  // History state
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('studio_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Total copies count
  const [totalCopies, setTotalCopies] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('studio_total_copies');
      if (saved) return parseInt(saved, 10) || 0;
    } catch {}
    return 14;
  });

  // Toast state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Emoji stacker
  const [emojiStack, setEmojiStack] = useState<string[]>(['✨', '🔥', '🚀']);

  // Update theme class on HTML element
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('studio_theme', theme);
    } catch {}
  }, [theme]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('studio_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Persist history
  useEffect(() => {
    try {
      localStorage.setItem('studio_history', JSON.stringify(history));
    } catch {}
  }, [history]);

  // Persist copy counter
  useEffect(() => {
    try {
      localStorage.setItem('studio_total_copies', totalCopies.toString());
    } catch {}
  }, [totalCopies]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const showToast = useCallback((text: string, subtext?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, text, subtext });
    setTimeout(() => {
      setToast(curr => (curr?.id === id ? null : curr));
    }, 2400);
  }, []);

  const copyToClipboard = useCallback(async (
    text: string, 
    label?: string, 
    type: FavoriteItem['type'] = 'font'
  ): Promise<boolean> => {
    if (!text) return false;
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      } else {
        // Fallback for non-secure / iframe environments
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (e) {
      console.warn('Clipboard write error, attempting fallback:', e);
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        success = false;
      }
    }

    if (success) {
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        type,
        content: text,
        label: label || text.slice(0, 30),
        timestamp: Date.now()
      };
      setHistory(prev => [newHistoryItem, ...prev.filter(i => i.content !== text).slice(0, 49)]);
      setTotalCopies(c => c + 1);
      showToast('Copied to clipboard!', text.length > 35 ? text.slice(0, 32) + '...' : text);
      return true;
    } else {
      showToast('Could not copy', 'Please copy manually');
      return false;
    }
  }, [showToast]);

  const toggleFavorite = useCallback((item: { 
    id: string; 
    type: FavoriteItem['type']; 
    title: string; 
    content: string; 
    category?: string 
  }) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.content === item.content);
      if (exists) {
        showToast('Removed from favorites', item.title);
        return prev.filter(f => f.content !== item.content);
      } else {
        showToast('Saved to favorites! ★', item.title);
        return [{
          id: item.id || Math.random().toString(36).substring(2, 9),
          type: item.type,
          title: item.title,
          content: item.content,
          category: item.category,
          savedAt: Date.now()
        }, ...prev];
      }
    });
  }, [showToast]);

  const isFavorite = useCallback((content: string) => {
    return favorites.some(f => f.content === content);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    showToast('Favorites cleared');
  }, [showToast]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    showToast('History cleared');
  }, [showToast]);

  // Emoji stack actions
  const addToStack = useCallback((char: string) => {
    setEmojiStack(prev => [...prev, char]);
    showToast('Added to combo collection', char);
  }, [showToast]);

  const removeFromStack = useCallback((index: number) => {
    setEmojiStack(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearStack = useCallback(() => {
    setEmojiStack([]);
  }, []);

  const copyStack = useCallback(() => {
    if (emojiStack.length === 0) return;
    const combined = emojiStack.join('');
    copyToClipboard(combined, 'Emoji Collection', 'emoji');
  }, [emojiStack, copyToClipboard]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activePage,
        setActivePage,
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        history,
        clearHistory,
        copyToClipboard,
        toast,
        showToast,
        emojiStack,
        addToStack,
        removeFromStack,
        clearStack,
        copyStack,
        totalCopies,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        searchQueryGlobal,
        setSearchQueryGlobal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
