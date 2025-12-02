import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-500 hover:text-white hover:bg-white/5 transition-all">
                <Globe size={16} />
                <span className="text-xs font-bold uppercase">{language === 'en' ? 'EN' : '中文'}</span>
            </button>

            {/* Dropdown */}
            <div className="hidden group-hover:block absolute top-0 right-full ml-2 w-32 bg-[#0A0A0B]/95 backdrop-blur-2xl rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] border border-white/10 p-1 z-50">
                <button
                    onClick={() => setLanguage('en')}
                    className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${language === 'en'
                            ? 'bg-white/10 text-white'
                            : 'text-stone-400 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage('zh')}
                    className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${language === 'zh'
                            ? 'bg-white/10 text-white'
                            : 'text-stone-400 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    中文
                </button>
            </div>
        </div>
    );
};
