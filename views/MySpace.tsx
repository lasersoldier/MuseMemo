import React, { useState, useMemo } from 'react';
import { useStore, TUTORIAL_PROMPT_ID } from '../store';
import { NavLevel, NavState, BubbleNode, Prompt, AiModel } from '../types';
import { BubbleCanvas } from '../components/BubbleCanvas';
import { ArrowLeft, Plus, Copy, Trash2, Edit2, ExternalLink, Sparkles, Hash } from 'lucide-react';
import { Modal } from '../components/Modal';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const MySpace: React.FC = () => {
  const { savedPrompts, updatePrompt, deletePrompt, incrementUsage, addPrompt, unsubscribePrompt, user } = useStore();
  const [navState, setNavState] = useState<NavState>({
    level: 'models',
    selectedModel: null,
    selectedCategory: null
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Partial<Prompt> | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => { });
  const [confirmTitle, setConfirmTitle] = useState('Confirm Action');
  const [confirmMessage, setConfirmMessage] = useState('Are you sure you want to proceed?');
  const [confirmDanger, setConfirmDanger] = useState(false);

  const getModelColor = (model: string) => {
    switch (model) {
      case 'ChatGPT': return '#3B82F6';
      case 'Midjourney': return '#10B981';
      case 'Gemini': return '#8B5CF6';
      case 'Claude': return '#F59E0B';
      default: return '#64748B';
    }
  };

  const modelNodes: BubbleNode[] = useMemo(() => {
    const counts: Record<string, number> = {};
    savedPrompts.forEach(p => {
      counts[p.model] = (counts[p.model] || 0) + p.usageCount + 1;
    });

    return Object.keys(counts).map(model => ({
      id: model,
      name: model,
      value: counts[model],
      type: 'model',
      color: getModelColor(model)
    }));
  }, [savedPrompts]);

  const categoryNodes: BubbleNode[] = useMemo(() => {
    if (!navState.selectedModel) return [];

    const relevantPrompts = savedPrompts.filter(p => p.model === navState.selectedModel);
    const tagCounts: Record<string, number> = {};

    relevantPrompts.forEach(p => {
      p.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + p.usageCount + 1;
      });
    });

    return Object.keys(tagCounts).map(tag => ({
      id: tag,
      name: tag,
      value: tagCounts[tag],
      type: 'category',
      color: getModelColor(navState.selectedModel!)
    }));
  }, [savedPrompts, navState.selectedModel]);

  const filteredPrompts = useMemo(() => {
    return savedPrompts.filter(p =>
      p.model === navState.selectedModel &&
      p.tags.includes(navState.selectedCategory || '')
    );
  }, [savedPrompts, navState]);

  const handleNodeClick = (node: BubbleNode) => {
    if (navState.level === 'models') {
      setNavState({
        level: 'categories',
        selectedModel: node.id as AiModel,
        selectedCategory: null
      });
    } else if (navState.level === 'categories') {
      setNavState({
        ...navState,
        level: 'list',
        selectedCategory: node.id
      });
    }
  };

  const handleBack = () => {
    if (navState.level === 'list') {
      setNavState({ ...navState, level: 'categories', selectedCategory: null });
    } else if (navState.level === 'categories') {
      setNavState({ ...navState, level: 'models', selectedModel: null });
    }
  };

  const handleCopy = (prompt: Prompt) => {
    navigator.clipboard.writeText(prompt.content);
    setCopiedId(prompt.id);
    incrementUsage(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openAiLink = (model: AiModel) => {
    const urls = {
      'ChatGPT': 'https://chat.openai.com',
      'Midjourney': 'https://discord.com/channels/@me',
      'Gemini': 'https://gemini.google.com',
      'Claude': 'https://claude.ai'
    };
    window.open(urls[model], '_blank');
  };

  const handleSaveEdit = () => {
    if (editingPrompt && editingPrompt.title && editingPrompt.content) {
      if ((editingPrompt as any).id) {
        updatePrompt((editingPrompt as any).id, editingPrompt);
      } else {
        addPrompt({
          title: editingPrompt.title!,
          content: editingPrompt.content!,
          model: (editingPrompt.model || 'ChatGPT') as AiModel,
          tags: editingPrompt.tags || ['General'],
          isFavorite: true,
          description: editingPrompt.description
        });
      }
      setShowEditModal(false);
      setEditingPrompt(null);
    }
  };

  const renderBreadcrumb = () => (
    <div className="absolute top-6 left-6 z-10 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
      {navState.level !== 'models' && (
        <button
          onClick={handleBack}
          className="p-3 bg-zinc-900/40 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10 hover:bg-white/10 hover:border-white/30 text-white transition-all backdrop-blur-md group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      )}
      <div className="flex flex-col">
        <span className="text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase mb-1 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">My Space</span>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-400">
          {navState.level === 'models' && 'Select Neural Core'}
          {navState.level === 'categories' && navState.selectedModel}
          {navState.level === 'list' && `${navState.selectedModel} / ${navState.selectedCategory}`}
        </h2>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full bg-transparent">
      {renderBreadcrumb()}

      {/* Quick Access Orb */}
      <div className="absolute top-6 right-6 z-10">
        {/* Container to keep menu open when hovering over either icon or menu */}
        <div className="relative group">
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] flex items-center justify-center cursor-pointer hover:bg-white/5 hover:border-white/30 transition-all overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Sparkles size={18} className="text-stone-300 group-hover:text-white relative z-10" />
          </div>
          {/* Dropdown menu with no gap between icon and menu */}
          <div className="hidden group-hover:block absolute right-0 mt-0 w-80 bg-[#0A0A0B]/90 backdrop-blur-2xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] border border-white/10 p-1 z-50 ring-1 ring-white/5">
            <p className="text-[10px] font-bold text-stone-500 px-4 py-3 uppercase tracking-wider border-b border-white/5">Recent Usage</p>
            <div className="p-1">
              {savedPrompts.sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()).slice(0, 3).map(p => (
                <div key={p.id} className="px-3 py-2.5 hover:bg-white/5 rounded-xl cursor-pointer flex flex-col gap-0.5 group/item transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-stone-300 group-hover/item:text-white truncate flex-1">{p.title}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(p.content);
                        setCopiedId(p.id);
                        incrementUsage(p.id);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className={`ml-2 p-1.5 rounded-lg text-xs font-bold transition-all ${copiedId === p.id ? 'bg-white text-black' : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/20'}`}
                    >
                      {copiedId === p.id ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-stone-600 font-mono group-hover/item:text-stone-500">{p.model}</span>
                    <span className="text-[9px] text-stone-700 font-mono border border-stone-800 rounded px-1 group-hover/item:border-stone-600">{p.shortId || 'LOC-00'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full pt-16 pb-6 px-4">
        {/* VIEW: Models or Categories Canvas */}
        {(navState.level === 'models' || navState.level === 'categories') && (
          <>
            {/* New Prompt Button for Initial Interface */}
            {navState.level === 'models' && (
              <div className="absolute top-6 right-40 z-10 animate-in fade-in slide-in-from-top-4 duration-500">
                <button
                  onClick={() => {
                    setEditingPrompt({ model: 'ChatGPT', tags: ['General'] });
                    setShowEditModal(true);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl text-sm hover:bg-stone-200 transition-all font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Plus size={16} /> New Prompt
                </button>
              </div>
            )}
            <BubbleCanvas
              data={navState.level === 'models' ? modelNodes : categoryNodes}
              onNodeClick={handleNodeClick}
            />
          </>
        )}

        {/* VIEW: Prompt List */}
        {navState.level === 'list' && (
          <div className="max-w-5xl mx-auto h-full overflow-y-auto pt-4 pr-2 scrollbar-thin">
            <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-zinc-900/0 via-zinc-900/0 to-zinc-900/0">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                <span className="text-sm text-stone-400 font-mono tracking-wider">{filteredPrompts.length} SYSTEMS ACTIVE</span>
              </div>
              <button
                onClick={() => {
                  setEditingPrompt({ model: navState.selectedModel!, tags: [navState.selectedCategory!] });
                  setShowEditModal(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl text-sm hover:bg-stone-200 transition-all font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Plus size={16} /> New Prompt
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {filteredPrompts.map((prompt, idx) => (
                // CARD: Liquid Glass Style
                <div key={prompt.id} className="group relative bg-[#0e0e11]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
                  {/* Gradient Border Effect via pseudo-element */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-white/10 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h3 className="text-lg font-bold text-stone-100 mb-2 tracking-tight group-hover:text-blue-200 transition-colors">{prompt.title}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-black/40 border border-white/10 text-stone-400 shadow-inner"
                          style={{ color: getModelColor(prompt.model), borderColor: `${getModelColor(prompt.model)}30`, backgroundColor: `${getModelColor(prompt.model)}10` }}
                        >
                          {prompt.model}
                        </span>
                        {/* Short ID Badge */}
                        <span className="text-[10px] font-mono tracking-wider px-2 py-1 rounded bg-stone-900 border border-stone-800 text-stone-500 flex items-center gap-1">
                          <Hash size={10} /> {prompt.shortId || 'N/A'}
                        </span>
                        {/* Creator Badge */}
                        <span className="text-[10px] font-mono tracking-wider px-2 py-1 rounded bg-blue-900/30 border border-blue-800 text-blue-400 flex items-center gap-1">
                          {prompt.author === 'system' ? 'SYSTEM' : prompt.creatorName || 'USER'}
                        </span>
                        {prompt.tags.map(t => <span key={t} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-black/40 border border-white/5 text-stone-500">#{t}</span>)}
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                      {(user?.subscription_tier === 'admin' || (prompt.author === 'user' && prompt.userId === user?.id)) && (
                        <button onClick={() => {
                          setEditingPrompt(prompt);
                          setShowEditModal(true);
                        }} className="p-2 text-stone-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                      )}
                      {user?.subscription_tier === 'admin' || (prompt.author === 'user' && prompt.userId === user?.id) ? (
                        <button
                          onClick={() => {
                            setConfirmTitle('Delete Prompt');
                            setConfirmMessage('Are you sure you want to delete this prompt? This action cannot be undone.');
                            setConfirmAction(() => deletePrompt(prompt.id));
                            setConfirmDanger(true);
                            setShowConfirmModal(true);
                          }}
                          className="p-2 text-stone-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setConfirmTitle('Unsubscribe Prompt');
                            setConfirmMessage('Are you sure you want to unsubscribe from this prompt?');
                            setConfirmAction(() => unsubscribePrompt(prompt.id));
                            setConfirmDanger(false);
                            setShowConfirmModal(true);
                          }}
                          className="p-2 text-stone-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                          <span className="text-xs font-bold">UNSUB</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="relative bg-black/40 rounded-xl p-4 mb-4 font-mono text-sm text-stone-400 leading-relaxed border border-white/5 shadow-inner">
                    {prompt.content}
                    {/* Code block shine */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5"></div>
                  </div>

                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[10px] text-stone-600 font-bold uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
                      Uses: {prompt.usageCount}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openAiLink(prompt.model)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-stone-500 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <ExternalLink size={14} /> LINK
                      </button>
                      <button
                        id={prompt.id === TUTORIAL_PROMPT_ID ? "tutorial-copy-prompt-btn" : undefined}
                        onClick={() => handleCopy(prompt)}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg ${copiedId === prompt.id ? 'bg-white text-black scale-95' : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/20'}`}
                      >
                        {copiedId === prompt.id ? 'COPIED' : <><Copy size={14} /> COPY</>}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={editingPrompt && (editingPrompt as any).id ? 'Edit Prompt' : 'New Prompt'}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">Title</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-stone-200 transition-all placeholder-stone-700 text-sm font-medium"
              placeholder="Operation Name"
              value={editingPrompt?.title || ''}
              onChange={e => setEditingPrompt({ ...editingPrompt, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">Target Core</label>
              <select
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-stone-300 focus:outline-none focus:border-blue-500/50 appearance-none"
                value={editingPrompt?.model || 'ChatGPT'}
                onChange={e => setEditingPrompt({ ...editingPrompt, model: e.target.value as AiModel })}
              >
                <option value="ChatGPT">ChatGPT</option>
                <option value="Midjourney">Midjourney</option>
                <option value="Gemini">Gemini</option>
                <option value="Claude">Claude</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">Sector Tag</label>
              <select
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-stone-300 focus:outline-none focus:border-blue-500/50 appearance-none"
                value={editingPrompt?.tags?.[0] || 'General'}
                onChange={e => setEditingPrompt({ ...editingPrompt, tags: [e.target.value] })}
              >
                <option value="General">General</option>
                <option value="Creative">Creative</option>
                <option value="Design">Design</option>
                <option value="Code">Code</option>
                <option value="React">React</option>
                <option value="Writing">Writing</option>
                <option value="Content">Content</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">Instruction Set</label>
            <textarea
              className="w-full h-40 px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 text-stone-300 transition-all font-mono text-sm resize-none placeholder-stone-700 leading-relaxed"
              placeholder="Input system parameters..."
              value={editingPrompt?.content || ''}
              onChange={e => setEditingPrompt({ ...editingPrompt, content: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">Sample AI Response</label>
            <textarea
              className="w-full h-32 px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 text-stone-300 transition-all font-mono text-sm resize-none placeholder-stone-700 leading-relaxed"
              placeholder="Input pre-written AI response example..."
              value={editingPrompt?.sampleResponse || ''}
              onChange={e => setEditingPrompt({ ...editingPrompt, sampleResponse: e.target.value })}
            />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-2">
            <button onClick={() => setShowEditModal(false)} className="px-5 py-2.5 text-sm font-medium text-stone-500 hover:text-stone-300 transition-colors">Abort</button>
            <button onClick={handleSaveEdit} className="px-6 py-2.5 bg-white text-black rounded-xl text-sm hover:bg-blue-50 transition-all font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]">Confirm Entry</button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          try {
            confirmAction();
          } catch (error) {
            console.error('Error in confirm action:', error);
          } finally {
            setShowConfirmModal(false);
          }
        }}
        title={confirmTitle}
        message={confirmMessage}
        danger={confirmDanger}
      />
    </div>
  );
};