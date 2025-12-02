import React from 'react';
import { LayoutGrid, Database, LogOut, User, Cpu, Settings, BookOpen } from 'lucide-react';
import { useStore } from '../store';
import { useLanguage } from '../i18n/LanguageContext';
import { AuthView } from '../views/Auth';
import { TutorialOverlay } from './TutorialOverlay';
import { LanguageSwitcher } from './LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
  currentView: 'library' | 'myspace' | 'profile';
  onViewChange: (view: 'library' | 'myspace' | 'profile') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const { user, logout, startTutorial } = useStore();
  const { t } = useLanguage();

  if (!user) {
    return <AuthView />;
  }

  return (
    <div className="flex h-screen w-full text-stone-200 overflow-hidden selection:bg-white/20 selection:text-white">
      <TutorialOverlay />
      {/* Dark Sidebar with Glass Effect */}
      <aside className="w-20 lg:w-72 bg-[#09090b]/40 backdrop-blur-2xl border-r border-white/5 flex flex-col justify-between py-8 px-4 z-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-12 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-stone-400 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Cpu size={20} />
            </div>
            <div className="hidden lg:block">
              <span className="text-xl font-bold tracking-tight text-white block">{t.appName}</span>
              <span className="text-[10px] text-stone-500 font-mono uppercase tracking-widest">{t.version}</span>
            </div>
          </div>

          <nav className="space-y-3">
            <button
              id="nav-myspace"
              onClick={() => onViewChange('myspace')}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group border ${currentView === 'myspace' ? 'bg-white/10 border-white/10 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]' : 'border-transparent text-stone-500 hover:bg-white/5 hover:text-stone-300'}`}
            >
              <LayoutGrid size={20} className={currentView === 'myspace' ? 'text-white' : 'text-stone-500 group-hover:text-stone-300'} />
              <span className="hidden lg:block font-medium tracking-wide">{t.mySpace}</span>
              {currentView === 'myspace' && <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>}
            </button>
            <button
              id="nav-library"
              onClick={() => onViewChange('library')}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group border ${currentView === 'library' ? 'bg-white/10 border-white/10 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]' : 'border-transparent text-stone-500 hover:bg-white/5 hover:text-stone-300'}`}
            >
              <Database size={20} className={currentView === 'library' ? 'text-white' : 'text-stone-500 group-hover:text-stone-300'} />
              <span className="hidden lg:block font-medium tracking-wide">{t.nexusLibrary}</span>
            </button>
          </nav>
        </div>

        <div className="relative z-10">

          <div className="border-t border-white/10 pt-6 px-1">
            <div className="mb-4">
              <button
                onClick={startTutorial}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-xl text-stone-500 hover:text-white hover:bg-white/5 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                  <BookOpen size={18} className="text-blue-400" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-stone-200 group-hover:text-white">{t.tutorial}</p>
                  <p className="text-[10px] text-stone-500">{t.tutorialSubtitle}</p>
                </div>
              </button>
            </div>

            <div
              onClick={() => onViewChange('profile')}
              className="flex items-center gap-3 mb-6 cursor-pointer group hover:bg-white/5 p-2 rounded-xl transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors relative overflow-hidden">
                {user.avatar_url ? (
                  <img src={user.avatar_url} className="w-full h-full object-cover" alt="User" />
                ) : (
                  <User size={16} className="text-stone-400 group-hover:text-white" />
                )}
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-bold text-stone-200 group-hover:text-white transition-colors">{user.full_name || 'Operator'}</p>
                <p className="text-[10px] text-stone-500 uppercase tracking-wider">{user.email?.split('@')[0]}</p>
              </div>
              <div className="ml-auto hidden lg:flex items-center gap-2">
                <LanguageSwitcher />
                <div className="text-stone-600 group-hover:text-white">
                  <Settings size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-transparent perspective-1000">
        {children}
      </main>
    </div>
  );
};