import React from 'react';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Props {
  explanation: string | null;
  isLoading: boolean;
  onClose: () => void;
}

export const AiAssistant: React.FC<Props> = ({ explanation, isLoading, onClose }) => {
  if (!explanation && !isLoading) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden z-50 animate-fade-in-up">
      <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-medium">
           <SparklesIcon className="w-4 h-4" />
           <span>AI 助手解释</span>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
           <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 min-h-[100px] max-h-[300px] overflow-y-auto">
        {isLoading ? (
           <div className="flex flex-col items-center justify-center h-24 space-y-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <span className="text-xs text-slate-500">Gemini 正在思考...</span>
           </div>
        ) : (
           <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
             {explanation}
           </p>
        )}
      </div>
    </div>
  );
};
