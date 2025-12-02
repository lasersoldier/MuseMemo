import React from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../i18n/LanguageContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  danger = false
}) => {
  const { t } = useLanguage();
  const finalConfirmText = confirmText || t.confirm;
  const finalCancelText = cancelText || t.cancel;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-stone-300 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-stone-500 hover:text-stone-300 transition-colors"
          >
            {finalCancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-all font-bold shadow-lg ${danger ? 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-white text-black hover:bg-blue-50 shadow-[0_0_15px_rgba(255,255,255,0.2)]'}`}
          >
            {finalConfirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};