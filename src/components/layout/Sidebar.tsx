import React from 'react';
import { 
  Home, 
  Smile, 
  Type, 
  Sparkles, 
  Laugh, 
  Crown, 
  FileText, 
  Star, 
  PanelLeftClose, 
  PanelLeft, 
  X,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavPage } from '../../types';

interface NavItem {
  id: NavPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home Dashboard', icon: Home },
  { id: 'emojis', label: 'Emoji Explorer', icon: Smile, badge: '500+' },
  { id: 'fonts', label: 'Fancy Fonts', icon: Type, badge: '40 Styles' },
  { id: 'symbols', label: 'Symbols Library', icon: Sparkles, badge: '100+' },
  { id: 'kaomoji', label: 'Kaomoji & Text Art', icon: Laugh },
  { id: 'names', label: 'Stylish Names', icon: Crown, badge: 'Gaming' },
  { id: 'bios', label: 'Bio Studio', icon: FileText },
  { id: 'favorites', label: 'Favorites & History', icon: Star },
];

export const Sidebar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    isSidebarCollapsed, 
    setIsSidebarCollapsed, 
    mobileMenuOpen, 
    setMobileMenuOpen,
    favorites,
    emojiStack
  } = useApp();

  const handleNavClick = (page: NavPage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col transition-all duration-300 ease-in-out border-r
          bg-white dark:bg-[#0c0d14] border-neutral-200 dark:border-neutral-800/80
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-800/80 shrink-0">
          <div 
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-3 cursor-pointer overflow-hidden ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
              <span className="text-white font-black text-lg select-none">✨</span>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-neutral-900 dark:text-white tracking-tight truncate">
                  Emoji & Fonts
                </span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium tracking-wider uppercase">
                  Studio v2.0
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 px-3 mb-2 select-none">
            {!isSidebarCollapsed ? 'Creative Tools' : '•••'}
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            const isFav = item.id === 'favorites';
            const favCount = favorites.length;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer group text-left
                  ${isActive 
                    ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 shadow-sm border border-purple-200/50 dark:border-purple-800/40' 
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                  }
                  ${isSidebarCollapsed ? 'justify-center px-0' : ''}
                `}
              >
                <div className={`p-1 rounded-lg transition-colors shrink-0 ${
                  isActive 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-neutral-400 group-hover:text-neutral-700 dark:text-neutral-500 dark:group-hover:text-neutral-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                {!isSidebarCollapsed && (
                  <span className="flex-1 truncate">
                    {item.label}
                  </span>
                )}

                {!isSidebarCollapsed && isFav && favCount > 0 && (
                  <span className="text-[11px] font-mono text-amber-500 font-semibold">
                    {favCount}
                  </span>
                )}

                {!isSidebarCollapsed && item.badge && !isFav && (
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800/80 shrink-0 space-y-2">
          {/* Quick Combo Status if items exist */}
          {emojiStack.length > 0 && !isSidebarCollapsed && (
            <div 
              onClick={() => handleNavClick('emojis')}
              className="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-950/30 border border-purple-500/20 text-xs cursor-pointer hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <Layers className="w-3.5 h-3.5" />
                  Combo Stacker
                </span>
                <span className="text-neutral-400 text-[10px]">{emojiStack.length} items</span>
              </div>
              <div className="text-sm truncate font-mono">
                {emojiStack.join(' ')}
              </div>
            </div>
          )}

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors text-xs font-medium cursor-pointer"
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
