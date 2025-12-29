
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<Props> = ({ currentLang, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(currentLang === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors text-sm"
    >
      <span className="text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </span>
      {TRANSLATIONS[currentLang].languageName}
    </button>
  );
};
