import React, { useState } from 'react';

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
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="chemicalInput" className="text-gray-700 font-semibold text-lg flex items-center gap-2">
          <span>🧪</span>
          ورودی ماده یا واکنش
        </label>
        <textarea
          id="chemicalInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="مثال: واکنش استریفیکاسیون، یا ترکیب H2SO4 + NaOH"
          className="w-full h-32 p-4 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none placeholder:text-gray-400"
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white shadow-md transition-all
              ${isLoading || !input.trim() 
                ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'
              }
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                در حال پردازش...
              </>
            ) : (
              <>
                <span>🚀</span>
                تحلیل و شبیه‌سازی
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};