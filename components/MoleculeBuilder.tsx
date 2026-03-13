import React, { useState } from 'react';
import { COMMON_SUBSTANCES, Substance } from '../data/commonSubstances';

interface MoleculeBuilderProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const MoleculeBuilder: React.FC<MoleculeBuilderProps> = ({ onAnalyze, isLoading }) => {
  const [selectedSubstances, setSelectedSubstances] = useState<Substance[]>([]);
  const [customInput, setCustomInput] = useState('');

  const toggleSubstance = (substance: Substance) => {
    const isSelected = selectedSubstances.some(s => s.id === substance.id);
    if (isSelected) {
      setSelectedSubstances(prev => prev.filter(s => s.id !== substance.id));
    } else {
      if (selectedSubstances.length >= 4) {
        alert("حداکثر می‌توانید ۴ ماده را برای ترکیب انتخاب کنید.");
        return;
      }
      setSelectedSubstances(prev => [...prev, substance]);
    }
  };

  const handleMix = () => {
    if (selectedSubstances.length === 0 && !customInput.trim()) return;
    
    let query = '';
    
    if (customInput.trim() && selectedSubstances.length === 0) {
      // User just typed a custom material
      query = `
      *** حالت کاربر مبتدی (بدون دانش شیمی) ***
      
      کاربر می‌خواهد بداند چطور می‌تواند ماده‌ای مثل "${customInput}" (مثلاً یک شوینده، عطر، یا ترکیب روزمره) را بسازد.
      
      لطفاً به صورت حرفه‌ای، جذاب و داستان‌گونه (بدون فرمول‌های پیچیده شیمیایی) توضیح بده:
      
      ۱. 🧪 **مواد لازم:** چه چیزهایی را باید با هم ترکیب کند؟ (مواد در دسترس و روزمره را نام ببر)
      ۲. 👨‍🔬 **شبیه‌سازی ترکیب:** وقتی این مواد با هم مخلوط می‌شوند، چه اتفاقی می‌افتد؟ (رنگ، بو، کف، تغییرات ظاهری و حس فیزیکی را بسیار زیبا و ملموس توصیف کن)
      ۳. ✨ **نتیجه نهایی:** محصول به دست آمده چه ویژگی‌هایی دارد؟
      ۴. ⚠️ **نکات ایمنی:** چه خطراتی دارد و موقع ساخت چه ایمنی‌هایی لازم است؟
      
      نکته: پاسخ باید کوتاه، سریع خوانده شود و از ایموجی‌های مرتبط استفاده شود.
      `;
    } else {
      // User selected predefined materials (and maybe typed something too)
      const substanceNames = selectedSubstances.map(s => `${s.name} (${s.formula})`).join(' + ');
      const allMaterials = customInput.trim() ? `${substanceNames} + ${customInput}` : substanceNames;
      
      query = `
      *** حالت کاربر مبتدی (بدون دانش شیمی) ***
      
      کاربر این مواد را با هم ترکیب کرده است:
      ${allMaterials}
      
      لطفاً به صورت حرفه‌ای، جذاب و داستان‌گونه (بدون فرمول‌های پیچیده شیمی) توضیح بده:
      
      ۱. 🌪️ **شبیه‌سازی ترکیب:** دقیقاً چه اتفاقی می‌افتد؟ (تغییر رنگ، جوشش، تولید گاز، بو، گرما - بسیار زیبا و ملموس توصیف کن تا کاربر حس کند در آزمایشگاه است)
      ۲. 🎁 **نتیجه نهایی:** چه ماده جدیدی خلق می‌شود؟
      ۳. 💡 **کاربرد:** این ترکیب جدید به چه دردی می‌خورد؟ (مثلاً آیا شوینده است؟ پاک‌کننده است؟)
      ۴. ⚠️ **نکات ایمنی:** آیا ترکیب این مواد با هم خطرناک است؟
      
      نکته: پاسخ باید کوتاه، سریع خوانده شود و از ایموجی‌های مرتبط استفاده شود.
      `;
    }
    
    onAnalyze(query);
  };

  const handleClear = () => {
    setSelectedSubstances([]);
    setCustomInput('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mt-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-gray-800 font-bold text-xl flex items-center gap-2">
            <span>🧪</span>
            آزمایشگاه مجازی (ترکیب مواد روزمره)
          </h2>
          <p className="text-gray-500 mt-2 leading-relaxed">
            مواد زیر را انتخاب کنید یا <span className="font-bold text-blue-600">ماده دلخواه خود را بنویسید</span> تا ببینید چطور ساخته می‌شود یا از ترکیب آن‌ها چه چیزی به دست می‌آید. (بدون نیاز به دانش شیمی)
          </p>
        </div>
      </div>

      {/* Custom Input Field */}
      <div className="mb-6">
        <label htmlFor="customMaterial" className="block text-sm font-bold text-gray-700 mb-2">
          چه چیزی می‌خواهید بسازید؟ (مثلاً: عطر، صابون، مایع ظرفشویی، یا هر ترکیب دیگر):
        </label>
        <div className="flex gap-3">
          <input
            id="customMaterial"
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="مثلاً بنویسید: چطور یک عطر خانگی بسازم؟"
            className="flex-1 p-4 text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder:text-gray-400"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Selected Substances Container (The "Beaker") */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 mb-8 min-h-[140px] flex flex-col items-center justify-center relative transition-all">
        {selectedSubstances.length === 0 && !customInput.trim() ? (
          <div className="text-slate-400 text-center">
            <span className="text-5xl block mb-3 opacity-50">⚗️</span>
            <p className="font-medium">مواد را از لیست پایین انتخاب کنید یا در کادر بالا بنویسید</p>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
              {selectedSubstances.map((substance, index) => (
                <React.Fragment key={substance.id}>
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${substance.color} shadow-sm animate-fade-in-up`}>
                    <span className="text-2xl">{substance.icon}</span>
                    <span className="font-bold text-lg">{substance.name}</span>
                    <button 
                      onClick={() => toggleSubstance(substance)}
                      className="ml-3 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  {(index < selectedSubstances.length - 1 || customInput.trim()) && (
                    <div className="flex items-center text-slate-400 font-bold text-2xl">+</div>
                  )}
                </React.Fragment>
              ))}
              
              {customInput.trim() && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border bg-indigo-50 text-indigo-800 border-indigo-200 shadow-sm animate-fade-in-up">
                  <span className="text-2xl">✨</span>
                  <span className="font-bold text-lg">{customInput}</span>
                  <button 
                    onClick={() => setCustomInput('')}
                    className="ml-3 text-indigo-300 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleMix}
                disabled={isLoading || (selectedSubstances.length === 0 && !customInput.trim())}
                className={`
                  px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center gap-3 text-lg
                  ${isLoading || (selectedSubstances.length === 0 && !customInput.trim())
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    در حال پردازش...
                  </>
                ) : (
                  <>
                    {selectedSubstances.length > 0 || (customInput.trim() && customInput.includes('+')) ? 'هم‌زدن و مشاهده نتیجه 🌪️' : 'کشف نحوه ساخت 🔍'}
                  </>
                )}
              </button>
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-all"
              >
                خالی کردن ظرف
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Available Substances */}
      <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">مواد آماده برای ترکیب:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {COMMON_SUBSTANCES.map((substance) => {
          const isSelected = selectedSubstances.some(s => s.id === substance.id);
          return (
            <button
              key={substance.id}
              onClick={() => toggleSubstance(substance)}
              disabled={isLoading}
              className={`
                flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all group
                ${isSelected 
                  ? `border-blue-500 bg-blue-50 shadow-inner opacity-60 scale-95` 
                  : `border-gray-100 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1`
                }
              `}
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{substance.icon}</span>
              <span className="font-bold text-gray-800 text-base text-center">{substance.name}</span>
              <span className="text-xs text-gray-400 mt-1.5 font-mono bg-gray-100 px-2 py-0.5 rounded" dir="ltr">{substance.formula}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
