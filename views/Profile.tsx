import React, { useState } from 'react';
import { useStore } from '../store';
import { User, Mail, Shield, BarChart3, Zap, Database, Edit2, LogOut, Cpu, Fingerprint } from 'lucide-react';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const ProfileView: React.FC = () => {
  const { user, logout, prompts, clearUsageCounts, resetUserData, updateUserProfile } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.full_name || '');
  const [isSaving, setIsSaving] = useState(false);
  
  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmTitle, setConfirmTitle] = useState('Confirm Action');
  const [confirmMessage, setConfirmMessage] = useState('Are you sure you want to proceed?');
  const [confirmDanger, setConfirmDanger] = useState(false);

  // Stats Calculation
  const totalPrompts = prompts.filter(p => p.author === 'user').length;
  const totalUsage = user?.total_usage || prompts.reduce((acc, curr) => acc + curr.usageCount, 0);
  const favoriteModel = prompts.length > 0 
    ? prompts.sort((a,b) => {
        // Calculate total usage for each model
        const usageA = prompts.filter(p => p.model === a.model).reduce((acc, curr) => acc + curr.usageCount, 0);
        const usageB = prompts.filter(p => p.model === b.model).reduce((acc, curr) => acc + curr.usageCount, 0);
        return usageB - usageA;
      })[0]?.model 
    : 'None';

  return (
    <div className="w-full h-full bg-transparent p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-md">Operator Profile</h2>
            <p className="text-stone-500 font-light flex items-center gap-2">
                <Shield size={14} className="text-green-500" />
                Secure Session Active
            </p>
        </div>

        {/* Identity Card */}
        <div className="bg-[#0e0e11]/60 backdrop-blur-xl rounded-3xl border border-white/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full pointer-events-none opacity-50"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-black border-2 border-white/10 flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        {user?.avatar_url ? (
                            <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center">
                                <span className="text-4xl font-bold text-stone-700 select-none">{user?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}</span>
                            </div>
                        )}
                        {/* Scan Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-[20%] w-full animate-[scan_3s_ease-in-out_infinite]"></div>
                    </div>
                    <div className="absolute bottom-0 right-2 w-8 h-8 bg-[#0e0e11] rounded-full flex items-center justify-center border border-white/10">
                         <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        {isEditing ? (
                            <div className="flex items-center gap-3">
                                <input 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-black/50 border border-white/20 rounded px-2 py-1 text-2xl font-bold text-white focus:outline-none"
                                    autoFocus
                                />
                                <button 
                                    onClick={async () => {
                                        setIsSaving(true);
                                        // Save the name change
                                        try {
                                            if (user && name.trim()) {
                                                await updateUserProfile({ full_name: name.trim() });
                                            }
                                        } catch (error) {
                                            console.error('Error saving name:', error);
                                            alert('Failed to save name. Please try again.');
                                        } finally {
                                            setIsEditing(false);
                                            setIsSaving(false);
                                        }
                                    }}
                                    className="p-2 text-green-500 hover:text-green-400 transition-colors"
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsEditing(false);
                                        setName(user?.full_name || '');
                                    }}
                                    className="p-2 text-stone-600 hover:text-white transition-colors"
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <h3 className="text-3xl font-bold text-white tracking-tight">{user?.full_name || 'Unknown Operator'}</h3>
                                <button onClick={() => {
                                    setName(user?.full_name || '');
                                    setIsEditing(true);
                                }} className="p-2 text-stone-600 hover:text-white transition-colors">
                                    <Edit2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-stone-500 font-mono mt-2">
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            {user?.email}
                        </div>
                        <div className="flex items-center gap-2">
                            <Fingerprint size={14} />
                            ID: {user?.id.substring(0, 8).toUpperCase()}
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase font-bold tracking-wider">
                                {user?.subscription_tier || 'Free'} Tier
                             </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0e0e11]/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:text-blue-300 transition-colors">
                        <Database size={20} />
                    </div>
                    <span className="text-[10px] text-stone-600 uppercase tracking-widest font-bold">Protocol Count</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">{totalPrompts}</div>
                <div className="text-xs text-stone-500">Stored Instructions</div>
            </div>

            <div className="bg-[#0e0e11]/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:text-purple-300 transition-colors">
                        <Zap size={20} />
                    </div>
                    <span className="text-[10px] text-stone-600 uppercase tracking-widest font-bold">Total Executions</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">{totalUsage}</div>
                <div className="text-xs text-stone-500">API Interactions</div>
            </div>

            <div className="bg-[#0e0e11]/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:text-orange-300 transition-colors">
                        <Cpu size={20} />
                    </div>
                    <span className="text-[10px] text-stone-600 uppercase tracking-widest font-bold">Preferred Core</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">{favoriteModel}</div>
                <div className="text-xs text-stone-500">Most Utilized Model</div>
            </div>
        </div>



        {/* Data Management Section */}
        <div className="bg-[#0e0e11]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 size={18} className="text-stone-400" />
                Data Management
            </h4>
            
            <div className="space-y-4">
                <button 
                    onClick={() => {
                        setConfirmTitle('Clear Usage Counts');
                        setConfirmMessage('Are you sure you want to clear all usage counts? This action cannot be undone.');
                        setConfirmAction(() => clearUsageCounts());
                        setConfirmDanger(false);
                        setShowConfirmModal(true);
                    }}
                    className="w-full py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
                >
                    <BarChart3 size={16} />
                    Clear Usage Counts
                </button>

                <button 
                    onClick={() => {
                        setConfirmTitle('Reset All User Data');
                        setConfirmMessage('Are you sure you want to reset all your data? This will delete all your saved prompts. This action cannot be undone.');
                        setConfirmAction(() => resetUserData());
                        setConfirmDanger(true);
                        setShowConfirmModal(true);
                    }}
                    className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
                >
                    <Database size={16} />
                    Reset All User Data
                </button>
            </div>
        </div>

        <button 
            onClick={logout}
            className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
        >
            <LogOut size={16} />
            Terminate Session
        </button>

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
    </div>
  );
};