export interface ContentBlock {
  id: string;
  title?: string;
  content: string; // This text will be parsed for keywords
}

export interface InteractiveKeyword {
  word: string;
  responses: string[];
}

export interface Memory {
  id: string;
  date: string;
  title: string;
  text: string;
  imageUrl?: string;
}

export interface AppState {
  introQuote: string;
  middleSections: ContentBlock[];
  outroQuote: string;
  isLetterRevealed: boolean;
}