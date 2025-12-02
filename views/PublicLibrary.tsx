import React, { useState } from 'react';
import { useStore, TUTORIAL_PROMPT_ID } from '../store';
import { Prompt } from '../types';
import { Search, Plus, Eye, Command } from 'lucide-react';
import { Modal } from '../components/Modal';
import { useLanguage } from '../i18n/LanguageContext';

export const PublicLibrary: React.FC = () => {
    const { prompts, savePublicPrompt } = useStore();
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(t.all);
    const [previewPrompt, setPreviewPrompt] = useState<Prompt | null>(null);

    const publicPrompts = prompts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const tabs = [t.all, t.work, t.study, t.creative, t.coding];

    return (
        <div className="w-full h-full bg-transparent p-4 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{t.publicDatabase}</h2>
                    <p className="text-stone-500 font-light">{t.publicDatabaseSubtitle}</p>
                </div>

                {/* Search Bar & Tabs */}
                <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-10 sticky top-0 z-20 py-4 -mx-4 px-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-white transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={t.searchQuery}
                            className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm text-stone-200 placeholder-stone-600 font-medium"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <Command size={12} className="text-stone-600" />
                            <span className="text-xs text-stone-600 font-mono">K</span>
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-1 scrollbar-hide">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap border ${activeTab === tab ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-transparent border-white/5 text-stone-500 hover:border-white/20 hover:text-stone-300'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                    {publicPrompts.map((prompt, idx) => (
                        // Card with staggered animation
                        <div
                            key={prompt.id}
                            id={prompt.id === TUTORIAL_PROMPT_ID ? "tutorial-first-prompt-card" : undefined}
                            className="group relative bg-[#0e0e11]/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/5 hover:bg-zinc-800/40 transition-all duration-300 flex flex-col h-60 hover:-translate-y-1"
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            {/* Top Colored Line */}
                            <div className={`absolute top-0 left-6 right-6 h-[2px] opacity-50 bg-gradient-to-r from-transparent via-${prompt.model === 'ChatGPT' ? 'blue' : prompt.model === 'Midjourney' ? 'green' : 'purple'}-500 to-transparent`}></div>

                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border bg-opacity-10
                            ${prompt.model === 'ChatGPT' ? 'bg-blue-500 border-blue-500/30 text-blue-400' :
                                        prompt.model === 'Midjourney' ? 'bg-green-500 border-green-500/30 text-green-400' :
                                            prompt.model === 'Gemini' ? 'bg-purple-500 border-purple-500/30 text-purple-400' : 'bg-orange-500 border-orange-500/30 text-orange-400'
                                    }`}
                                >
                                    {prompt.model}
                                </span>
                                {prompt.isFavorite ? (
                                    <span className="text-[10px] text-stone-600 font-bold uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 bg-stone-600 rounded-full"></span>{t.saved}</span>
                                ) : (
                                    <button
                                        id={prompt.id === TUTORIAL_PROMPT_ID ? "tutorial-add-prompt-btn" : undefined}
                                        onClick={() => savePublicPrompt(prompt.id)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white text-stone-400 hover:text-black transition-all"
                                        title="Acquire"
                                    >
                                        <Plus size={16} />
                                    </button>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-stone-200 mb-2 line-clamp-1 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all">{prompt.title}</h3>
                            <p className="text-xs text-stone-500 mb-6 line-clamp-2 leading-relaxed">{prompt.description || prompt.content}</p>

                            <div className="mt-auto flex flex-col gap-3">
                                <div className="flex gap-2 flex-wrap">
                                    {prompt.tags.map(tag => (
                                        <span key={tag} className="text-[10px] text-stone-500 font-mono">#{tag}</span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center w-full">
                                    <span className="text-[10px] text-stone-600 font-mono">
                                        By: {prompt.author === 'system' ? t.bySystem : prompt.creatorName || t.byUser}
                                    </span>
                                    <button
                                        id={prompt.id === TUTORIAL_PROMPT_ID ? "tutorial-view-btn" : undefined}
                                        onClick={() => setPreviewPrompt(prompt)}
                                        className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 border border-white/5 rounded-lg hover:border-white/20 hover:text-white transition-colors bg-black/20"
                                    >
                                        <Eye size={12} /> {t.view}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={previewPrompt !== null}
                onClose={() => setPreviewPrompt(null)}
                title={t.simulatedOutput}
                closeButtonId={previewPrompt?.id === TUTORIAL_PROMPT_ID ? "tutorial-preview-modal-close" : undefined}
            >
                <div className="bg-black/80 p-5 rounded-xl border border-white/10 font-mono text-sm text-stone-300 leading-relaxed max-h-80 overflow-y-auto shadow-inner relative">
                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
                    <div className="relative z-10">
                        {previewPrompt?.content}
                    </div>
                </div>
                <div className="mt-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{t.aiResponsePrediction}</p>
                    </div>
                    {previewPrompt?.sampleResponse && (
                        <div className="bg-black/40 p-4 rounded-lg font-mono text-sm text-stone-300 leading-relaxed">
                            {previewPrompt.sampleResponse}
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};