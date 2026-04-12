import React, { useState } from 'react';
import { COMMON_SUBSTANCES, Substance } from '../data/commonSubstances';
import { Beaker, Plus, X, Sparkles, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoleculeBuilderProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const MoleculeBuilder: React.FC<MoleculeBuilderProps> = ({ onAnalyze, isLoading }) => {
  const [selectedSubstances, setSelectedSubstances] = useState<Substance[]>([]);
  const [customInput, setCustomInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubstance = (substance: Substance) => {
    const isSelected = selectedSubstances.some(s => s.id === substance.id);
    if (isSelected) {
      setSelectedSubstances(prev => prev.filter(s => s.id !== substance.id));
    } else {
      if (selectedSubstances.length >= 4) {
        return;
      }
      setSelectedSubstances(prev => [...prev, substance]);
    }
  };

  const handleMix = () => {
    if (selectedSubstances.length === 0 && !customInput.trim()) return;
    
    let query = '';
    
    if (customInput.trim() && selectedSubstances.length === 0) {
      query = `
      *** حالت کاربر مبتدی (بدون دانش شیمی) ***
      کاربر می‌خواهد بداند چطور می‌تواند ماده‌ای مثل "${customInput}" را بسازد.
      لطفاً به صورت حرفه‌ای، جذاب و داستان‌گونه توضیح بده:
      ۱. 🧪 **مواد لازم**
      ۲. 👨‍🔬 **شبیه‌سازی ترکیب**
      ۳. ✨ **نتیجه نهایی**
      ۴. ⚠️ **نکات ایمنی**
      `;
    } else {
      const substanceNames = selectedSubstances.map(s => `${s.name} (${s.formula})`).join(' + ');
      const allMaterials = customInput.trim() ? `${substanceNames} + ${customInput}` : substanceNames;
      
      query = `
      *** حالت کاربر مبتدی (بدون دانش شیمی) ***
      کاربر این مواد را با هم ترکیب کرده است: ${allMaterials}
      لطفاً به صورت حرفه‌ای، جذاب و داستان‌گونه توضیح بده:
      ۱. 🌪️ **شبیه‌سازی ترکیب**
      ۲. 🎁 **نتیجه نهایی**
      ۳. 💡 **کاربرد**
      ۴. ⚠️ **نکات ایمنی**
      `;
    }
    
    onAnalyze(query);
  };

  const handleClear = () => {
    setSelectedSubstances([]);
    setCustomInput('');
  };

  return (
    <div className="bg-[#2b2e4a] rounded-2xl shadow-2xl border border-white/5 transition-all duration-300">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 hover:bg-white/5 transition-colors text-right cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Beaker className="text-blue-400 w-6 h-6" />
          <h2 className="text-xl font-bold text-white">آزمایشگاه مجازی (ترکیب مواد)</h2>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors"
            title="پاک کردن"
          >
            <Trash2 className="w-5 h-5" />
          </button>
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
            <div className="px-8 pb-8 pt-0 space-y-6">
              {/* Custom Input */}
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="چه چیزی می‌خواهید بسازید؟ (مثلاً: عطر، صابون...)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pr-12 pl-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>

              {/* The Beaker Area */}
              <div className="relative min-h-[160px] rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center overflow-hidden">
                {selectedSubstances.length === 0 && !customInput.trim() ? (
                  <div className="text-center space-y-2 opacity-40">
                    <Beaker className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-400">مواد را برای ترکیب انتخاب کنید</p>
                  </div>
                ) : (
                  <div className="w-full flex flex-wrap justify-center items-center gap-3">
                    {selectedSubstances.map((substance, index) => (
                      <React.Fragment key={substance.id}>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 animate-in fade-in zoom-in duration-300">
                          <span className="text-xl">{substance.icon}</span>
                          <span className="font-bold">{substance.name}</span>
                          <button onClick={() => toggleSubstance(substance)} className="hover:text-red-400">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {(index < selectedSubstances.length - 1 || customInput.trim()) && (
                          <Plus className="w-4 h-4 text-gray-600" />
                        )}
                      </React.Fragment>
                    ))}
                    {customInput.trim() && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 animate-in fade-in zoom-in duration-300">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-bold">{customInput}</span>
                        <button onClick={() => setCustomInput('')} className="hover:text-red-400">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                <button
                  onClick={handleMix}
                  disabled={isLoading || (selectedSubstances.length === 0 && !customInput.trim())}
                  className="mt-8 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  {isLoading ? 'در حال پردازش...' : 'مشاهده نتیجه'}
                </button>
              </div>

              {/* Available Substances */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">مواد آماده:</h3>
                <div className="grid grid-cols-4 gap-3">
                  {COMMON_SUBSTANCES.map((substance) => {
                    const isSelected = selectedSubstances.some(s => s.id === substance.id);
                    return (
                      <button
                        key={substance.id}
                        onClick={() => toggleSubstance(substance)}
                        disabled={isLoading}
                        className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-500/10 scale-95' 
                            : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-2xl mb-1">{substance.icon}</span>
                        <span className="text-[10px] font-bold text-white truncate w-full text-center">{substance.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


