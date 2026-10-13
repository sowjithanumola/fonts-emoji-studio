/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Toast } from './components/common/Toast';
import { EmojiStacker } from './components/common/EmojiStacker';
import { HomeView } from './components/views/HomeView';
import { EmojiView } from './components/views/EmojiView';
import { FontsView } from './components/views/FontsView';
import { SymbolsView } from './components/views/SymbolsView';
import { KaomojiView } from './components/views/KaomojiView';
import { NameGeneratorView } from './components/views/NameGeneratorView';
import { BioStudioView } from './components/views/BioStudioView';
import { FavoritesView } from './components/views/FavoritesView';
import { Sparkles, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activePage, isSidebarCollapsed } = useApp();

  const renderActiveView = () => {
    switch (activePage) {
      case 'home':
        return <HomeView />;
      case 'emojis':
        return <EmojiView />;
      case 'fonts':
        return <FontsView />;
      case 'symbols':
        return <SymbolsView />;
      case 'kaomoji':
        return <KaomojiView />;
      case 'names':
        return <NameGeneratorView />;
      case 'bios':
        return <BioStudioView />;
      case 'favorites':
        return <FavoritesView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#090a10] text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      <Sidebar />
      <Header />

      {/* Main Content Area */}
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8
          ${isSidebarCollapsed ? 'lg:pl-24' : 'lg:pl-[17rem]'}
        `}
      >
        <div className="max-w-7xl mx-auto">
          {renderActiveView()}
        </div>
      </main>

      {/* Footer */}
      <footer 
        className={`border-t border-neutral-200 dark:border-neutral-800/80 py-6 px-4 sm:px-8 text-xs text-neutral-500 dark:text-neutral-400 transition-all duration-300
          ${isSidebarCollapsed ? 'lg:pl-24' : 'lg:pl-[17rem]'}
        `}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              Emoji & Fonts Studio
            </span>
            <span>·</span>
            <span>Express More. Copy Instantly.</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
            <span>Native Unicode Alphanumerics &amp; Diacritics</span>
            <span>·</span>
            <span>100% Client-Side Privacy</span>
          </div>
        </div>
      </footer>

      {/* Global Components */}
      <EmojiStacker />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
