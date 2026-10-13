export type NavPage = 
  | 'home' 
  | 'emojis' 
  | 'fonts' 
  | 'symbols' 
  | 'kaomoji' 
  | 'names' 
  | 'bios' 
  | 'favorites';

export interface EmojiItem {
  id: string;
  char: string;
  name: string;
  category: string;
  keywords: string[];
}

export interface FontStyleDefinition {
  id: string;
  name: string;
  category: 'Serif & Sans' | 'Script & Gothic' | 'Decorated & Shapes' | 'Novelty & Fun' | 'Special & Accents';
  transform: (text: string) => string;
  sampleText?: string;
  badge?: string;
}

export interface SymbolItem {
  id: string;
  char: string;
  name: string;
  category: string;
  tags?: string[];
}

export interface KaomojiItem {
  id: string;
  art: string;
  name: string;
  category: string;
  description?: string;
}

export interface TextArtItem {
  id: string;
  title: string;
  category: string;
  art: string;
}

export interface NameVariation {
  id: string;
  styleName: string;
  category: 'Gaming' | 'Social' | 'Cute & Soft' | 'Aesthetic' | 'Gothic & Dark' | 'Minimalist';
  result: string;
}

export interface BioTemplate {
  id: string;
  title: string;
  platform: 'Instagram' | 'Gaming' | 'TikTok' | 'Creator' | 'Minimalist' | 'Aesthetic';
  template: string;
  tags: string[];
}

export interface FavoriteItem {
  id: string;
  type: 'emoji' | 'font' | 'symbol' | 'kaomoji' | 'name' | 'bio';
  title: string;
  content: string;
  category?: string;
  savedAt: number;
}

export interface HistoryItem {
  id: string;
  type: 'emoji' | 'font' | 'symbol' | 'kaomoji' | 'name' | 'bio';
  content: string;
  label?: string;
  timestamp: number;
}

export interface ToastMessage {
  id: string;
  text: string;
  subtext?: string;
}
