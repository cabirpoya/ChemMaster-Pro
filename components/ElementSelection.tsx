import React, { useState } from 'react';
import { ELEMENT_GROUPS, ElementItem } from '../data/elements';

interface ElementSelectionProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const ElementSelection: React.FC<ElementSelectionProps> = ({ onAnalyze, isLoading }) => {
  const [selectedElements, setSelectedElements] = useState<ElementItem[]>([]);

  const toggleElement = (element: ElementItem) => {
    const isSelected = selectedElements.some(e => e.symbol === element.symbol);
    
    if (isSelected) {
      setSelectedElements(prev => prev.filter(e => e.symbol !== element.symbol));
    } else {
      if (selectedElements.length >= 5) {
        alert("حداکثر می‌توانید ۵ عنصر را انتخاب کنید.");
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
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mt-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="text-gray-800 font-bold text-lg flex items-center gap-2">
          <span>🧬</span>
          انتخاب از جدول تناوبی
        </h2>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {selectedElements.length} / 5 انتخاب شده
          </span>
          <button
            onClick={handleAnalyzeSelected}
            disabled={isLoading || selectedElements.length === 0}
            className={`
              text-sm px-4 py-2 rounded-lg font-bold text-white transition-all
              ${isLoading || selectedElements.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg active:scale-95'
              }
            `}
          >
            {isLoading ? '...' : 'تحلیل موارد انتخاب شده'}
          </button>
        </div>
      </div>

      <div className="space-y-6 h-96 overflow-y-auto pr-2 custom-scrollbar border-t border-gray-200 pt-4">
        {ELEMENT_GROUPS.map((group) => (
          <div key={group.groupName}>
            <h3 className="text-blue-800 font-semibold text-sm mb-3 sticky top-0 bg-white/95 backdrop-blur-sm py-2 border-b border-blue-100 z-10">
              {group.groupName}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {group.elements.map((element) => {
                const isSelected = selectedElements.some(e => e.symbol === element.symbol);
                return (
                  <button
                    key={element.symbol}
                    onClick={() => toggleElement(element)}
                    type="button"
                    className={`
                      relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                      ${isSelected 
                        ? 'border-green-500 bg-green-50 text-green-900 shadow-sm' 
                        : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-300 hover:bg-blue-50'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-1 right-1 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className="text-lg font-bold">{element.symbol}</span>
                    <span className="text-xs mt-1">{element.name}</span>
                    <span className="text-[10px] text-gray-400 mt-0.5 opacity-80">{element.number}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};