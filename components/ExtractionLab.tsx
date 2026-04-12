import React, { useState } from 'react';
import { Pickaxe, FlaskConical, Sparkles, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExtractionLabProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const ExtractionLab: React.FC<ExtractionLabProps> = ({ onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const extractionQuery = `
      *** حالت ویژه: استخراج و تولید عنصر (Reverse Synthesis) ***
      ورودی کاربر: ${input}
      مأموریت: بررسی کن آیا ترکیب یا واکنش مواد ورودی بالا، منجر به **تولید، آزادسازی یا استخراج یک عنصر خالص** (Element) از جدول تناوبی می‌شود؟
      `;
      onAnalyze(extractionQuery);
    }
  };

  return (
    <div className="bg-[#2b2e4a] rounded-2xl shadow-2xl border border-white/5 relative overflow-hidden transition-all duration-300">
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-br-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-8 hover:bg-white/5 transition-colors text-right cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <FlaskConical className="text-indigo-400 w-6 h-6" />
            <h2 className="text-xl font-bold text-white">آزمایشگاه استخراج (Reverse Synthesis)</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/20"></div>
            </div>
            {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8 pt-0">
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                  ترکیب مواد برای تولید یک عنصر خالص. (مثال: اکسید آهن + کربن ⬅️ آهن)
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="مثال: الکترولیز آب، یا واکنش آلومینیوم..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pr-12 pl-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                      <>
                        <Pickaxe className="w-5 h-5" />
                        <span>استخراج عنصر</span>
                        <Sparkles className="w-4 h-4 text-indigo-200" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

