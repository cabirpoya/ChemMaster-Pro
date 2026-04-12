import React, { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input);
    }
  };

  return (
    <div className="bg-[#2b2e4a] rounded-2xl shadow-2xl p-8 border border-white/5 h-full flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
        <div className="flex items-center justify-between">
          <label htmlFor="chemicalInput" className="text-white font-bold text-xl flex items-center gap-3">
            <Sparkles className="text-blue-400 w-6 h-6" />
            تحلیل هوشمند ماده یا واکنش
          </label>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold bg-white/5 px-2 py-1 rounded">AI Powered</div>
        </div>
        
        <textarea
          id="chemicalInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="مثال: واکنش استریفیکاسیون، یا ترکیب H2SO4 + NaOH"
          className="w-full flex-1 p-6 text-white bg-[#1a1c2c] border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none resize-none placeholder:text-gray-500 text-lg leading-relaxed"
          disabled={isLoading}
        />
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`
              flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-white shadow-xl transition-all group
              ${isLoading || !input.trim() 
                ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/20 active:scale-95'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                در حال پردازش...
              </>
            ) : (
              <>
                تحلیل و شبیه‌سازی
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
