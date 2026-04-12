import React, { useState } from 'react';
import { ELEMENT_GROUPS, ElementItem } from '../data/elements';
import { Atom, Check, Search, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ElementSelectionProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const ElementSelection: React.FC<ElementSelectionProps> = ({ onAnalyze, isLoading }) => {
  const [selectedElements, setSelectedElements] = useState<ElementItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleElement = (element: ElementItem) => {
    const isSelected = selectedElements.some(e => e.symbol === element.symbol);
    
    if (isSelected) {
      setSelectedElements(prev => prev.filter(e => e.symbol !== element.symbol));
    } else {
      if (selectedElements.length >= 5) {
        return;
      }
      setSelectedElements(prev => [...prev, element]);
    }
  };

  const handleAnalyzeSelected = () => {
    if (selectedElements.length === 0) return;
    
    const elementNames = selectedElements.map(e => `${e.name} (${e.symbol})`).join(', ');
    const query = `بررسی و تحلیل تعامل شیمیایی بین عناصر زیر:\n${elementNames}\n\nلطفاً واکنش احتمالی، پایداری، ایمنی و کاربردها را بررسی کنید.`;
    onAnalyze(query);
  };

  return (
    <div className="bg-[#2b2e4a] rounded-2xl shadow-2xl border border-white/5 flex flex-col transition-all duration-300">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 hover:bg-white/5 transition-colors text-right cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Atom className="text-purple-400 w-6 h-6" />
          <h2 className="text-xl font-bold text-white">جدول تناوبی هوشمند</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            {selectedElements.length} / 5 انتخاب شده
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
            <div className="px-8 pb-8 pt-0 flex flex-col h-[500px]">
              <div className="flex justify-end mb-6">
                <button
                  onClick={handleAnalyzeSelected}
                  disabled={isLoading || selectedElements.length === 0}
                  className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  تحلیل نهایی
                </button>
              </div>

              <div className="relative mb-6">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجوی عنصر..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
                {ELEMENT_GROUPS.map((group) => {
                  const filteredElements = group.elements.filter(e => 
                    e.name.includes(searchTerm) || e.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                  );

                  if (filteredElements.length === 0) return null;

                  return (
                    <div key={group.groupName}>
                      <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        {group.groupName}
                      </h3>
                      <div className="grid grid-cols-4 gap-3">
                        {filteredElements.map((element) => {
                          const isSelected = selectedElements.some(e => e.symbol === element.symbol);
                          return (
                            <button
                              key={element.symbol}
                              onClick={() => toggleElement(element)}
                              className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all group ${
                                isSelected 
                                  ? 'border-purple-500 bg-purple-500/10 scale-95' 
                                  : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-0.5 shadow-lg">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                              <span className="text-lg font-bold text-white">{element.symbol}</span>
                              <span className="text-[8px] text-gray-400 mt-1 truncate w-full text-center">{element.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

