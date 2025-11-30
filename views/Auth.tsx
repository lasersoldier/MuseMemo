import React, { useState } from 'react';
import { Cpu, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store';

export const AuthView: React.FC = () => {
  const { login, isLoading } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 基本验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('请输入有效的邮箱地址');
      return;
    }
    
    if (!password.trim()) {
      alert('请输入密码');
      return;
    }
    
    await login(email, password);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-[#050505]">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] animate-pulse"></div>
             <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')] opacity-20 brightness-100 contrast-150"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-md p-8">
            <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-black rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/10 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Cpu size={36} className="text-stone-200 relative z-10" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter">MuseMemo</h1>
                <p className="text-stone-500 font-mono text-xs uppercase tracking-[0.2em]">Neural Interface Access</p>
            </div>

            <div className="bg-[#0e0e11]/80 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl p-8 animate-in zoom-in duration-300">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">Operator ID (Email)</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-white transition-colors" size={16} />
                            <input 
                                type="email" 
                                required
                                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 text-stone-200 transition-all font-mono text-sm"
                                placeholder="enter.email@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">Access Code (Password)</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-white transition-colors" size={16} />
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="w-full pl-12 pr-12 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 text-stone-200 transition-all font-mono text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-600 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading || !email || !password}
                        className="w-full py-4 bg-white text-black rounded-xl font-bold tracking-wide hover:bg-stone-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isLoading ? 'Processing...' : 
                            <>SECURE ACCESS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                        }
                    </button>
                </form>
            </div>
            
            <div className="mt-8 text-center">
                <p className="text-[10px] text-stone-600 font-mono">SECURE CONNECTION // ENCRYPTED END-TO-END</p>
            </div>
        </div>
    </div>
  );
};