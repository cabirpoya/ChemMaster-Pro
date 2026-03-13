import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResultDisplayProps {
  result: string | null;
  isLoading?: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8 p-8 flex flex-col items-center justify-center min-h-[300px] animate-pulse">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-3xl">🧪</div>
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">در حال تحلیل شیمیایی...</h3>
        <p className="text-gray-500 text-sm">لطفاً چند لحظه منتظر بمانید. موتور ChemMaster در حال پردازش واکنش‌ها است.</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8 animate-fade-in-up">
      <div className="bg-gradient-to-l from-blue-50 to-indigo-50 px-6 py-5 border-b border-blue-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
          <span>📋</span>
          گزارش نهایی
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-sm bg-white text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg font-medium border border-indigo-200 shadow-sm transition-colors"
            title="کپی متن گزارش"
          >
            {isCopied ? (
              <>
                <span>✅</span>
                کپی شد
              </>
            ) : (
              <>
                <span>📋</span>
                کپی گزارش
              </>
            )}
          </button>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full font-bold border border-indigo-200 shadow-sm hidden sm:inline-block">
            تولید شده توسط AI
          </span>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <div className="prose prose-lg prose-indigo max-w-none text-gray-800 leading-relaxed font-sans">
          <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
        </div>
      </div>
    </div>
  );
};