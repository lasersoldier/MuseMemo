import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="bg-[#121214] w-full max-w-lg rounded-2xl shadow-2xl border border-white/10 p-6 m-4 relative animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
          <h3 className="text-xl font-medium text-stone-200 tracking-tight">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-white/10 text-stone-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div>
            {children}
        </div>
      </div>
    </div>
  );
};