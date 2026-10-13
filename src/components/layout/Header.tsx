import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  home: { title: 'Studio Dashboard', subtitle: 'Your Text. Your Style.' },
  emojis: { title: 'Emoji Explorer', subtitle: 'Search, combine, and copy 500+ Unicode emojis' },
  fonts: { title: 'Fancy Fonts Generator', subtitle: 'Instant 40+ mathematical & decorative Unicode styles' },
  symbols: { title: 'Symbols Library', subtitle: 'Aesthetic dividers, hearts, stars, arrows & math' },
  kaomoji: { title: 'Kaomoji & Text Art', subtitle: 'Japanese expressive faces and ASCII text banners' },
  names: { title: 'Stylish Name Generator', subtitle: 'Gamer clan tags, aesthetic handles, and gamer nicknames' },
  bios: { title: 'Social Media Bio Studio', subtitle: 'Curated bio templates with live profile preview' },
  favorites: { title: 'Favorites & History', subtitle: 'Manage your saved styles and clipboard history' },
};

export const Header: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    activePage, 
    setMobileMenuOpen, 
    isSidebarCollapsed
  } = useApp();

  const currentMeta = PAGE_TITLES[activePage] || PAGE_TITLES.home;

  return (
    <header 
      className={`sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6 border-b transition-all duration-300
        bg-white/80 dark:bg-[#090a10]/80 backdrop-blur-md border-neutral-200 dark:border-neutral-800/80
        ${isSidebarCollapsed ? 'lg:pl-24' : 'lg:pl-[17rem]'}
      `}
    >
      {/* Left: Mobile trigger & Page Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
              {currentMeta.title}
            </h1>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-purple-500/60" />
            <span className="hidden sm:inline-block text-xs text-neutral-500 dark:text-neutral-400 font-normal">
              {currentMeta.subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Only Dark and Light mode toggle */}
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/80 border border-neutral-300 dark:border-neutral-700/80 cursor-pointer transition-all duration-200 active:scale-95 shadow-xs"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-purple-600 stroke-[2.2]" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
