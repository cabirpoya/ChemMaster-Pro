import React, { useState } from 'react';

interface ExtractionLabProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const ExtractionLab: React.FC<ExtractionLabProps> = ({ onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Wrapper to frame the request as an Extraction/Reverse synthesis task
      const extractionQuery = `
      *** حالت ویژه: استخراج و تولید عنصر (Reverse Synthesis) ***
      
      ورودی کاربر: ${input}
      
      مأموریت:
      بررسی کن آیا ترکیب یا واکنش مواد ورودی بالا، منجر به **تولید، آزادسازی یا استخراج یک عنصر خالص** (Element) از جدول تناوبی می‌شود؟ (مثلاً استخراج فلز از سنگ معدن، یا تجزیه یک ترکیب به عناصر سازنده).
      
      اگر بله:
      1. نام عنصر(های) استخراج شده را مشخص کن.
      2. فرآیند را دقیق شبیه‌سازی کن.
      3. درصد خلوص و امکان‌پذیری را بررسی کن.
      
      اگر خیر (هیچ عنصر خالصی تولید نمی‌شود):
      توضیح بده چرا و چه ترکیب جدیدی ساخته می‌شود.
      `;
      onAnalyze(extractionQuery);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md border border-indigo-100 p-6 mt-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-200 rounded-br-full opacity-20 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <h2 className="text-indigo-900 font-bold text-lg flex items-center gap-2">
            <span>⚗️</span>
            آزمایشگاه استخراج (برعکس جدول تناوبی)
          </h2>
          <p className="text-sm text-indigo-700 mt-1 opacity-80">
            ترکیب مواد برای تولید یک عنصر خالص. (مثال: اکسید آهن + کربن ⬅️ آهن)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="مثال: الکترولیز آب، یا واکنش آلومینیوم با اکسید کروم..."
            className="flex-1 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`
              whitespace-nowrap px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center gap-2
              ${isLoading || !input.trim()
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95'
              }
            `}
          >
            {isLoading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <>
                <span>⛏️</span>
                استخراج عنصر
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};