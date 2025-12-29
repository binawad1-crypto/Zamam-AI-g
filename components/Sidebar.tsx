
import React from 'react';
import { Language, View } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  lang: Language;
  currentView: View;
  setView: (view: View) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<Props> = ({ lang, currentView, setView, onLogout }) => {
  const t = TRANSLATIONS[lang];
  
  const menuItems = [
    { id: View.DASHBOARD, label: t.dashboard, icon: 'grid' },
    { id: View.PROJECTS, label: t.projects, icon: 'folder' },
    { id: View.PLANS, label: t.plans, icon: 'credit-card' },
    { id: View.TOOLS, label: t.tools, icon: 'tool' },
    { id: View.CHAT, label: t.chat, icon: 'message-circle' },
    { id: View.SAVED, label: t.saved, icon: 'bookmark' },
    { id: View.SETTINGS, label: t.settings, icon: 'settings' },
  ];

  return (
    <aside className="w-64 border-l border-purple-800/20 flex flex-col h-full bg-[#120f1d] hidden md:flex">
      <div className="p-6 text-right">
        <div className="flex items-center gap-3 flex-row-reverse">
          <div className="w-10 h-10 card-gradient-purple rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-900/20">Z</div>
          <div>
            <h1 className="font-bold text-lg text-white">{t.appName}</h1>
            <p className="text-[10px] text-purple-400 uppercase tracking-wider font-bold">{t.tagline}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 text-right">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all flex-row-reverse ${
              currentView === item.id 
                ? 'bg-purple-600/20 text-purple-200 border border-purple-600/30' 
                : 'text-purple-300/40 hover:bg-purple-900/20 hover:text-purple-200'
            }`}
          >
             <span className="opacity-70">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon === 'grid' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
                  {item.icon === 'folder' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />}
                  {item.icon === 'credit-card' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />}
                  {item.icon === 'tool' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />}
                  {item.icon === 'message-circle' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />}
                  {item.icon === 'bookmark' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />}
                  {item.icon === 'settings' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                </svg>
             </span>
            <span className="font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-purple-800/20 text-right">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/80 hover:bg-red-500/10 transition-all flex-row-reverse"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-bold">{t.logout}</span>
        </button>
      </div>
    </aside>
  );
};
