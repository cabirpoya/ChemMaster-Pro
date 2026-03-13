import React, { useState, useEffect } from 'react';

export const ApiKeySettings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } else {
      localStorage.removeItem('gemini_api_key');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-white bg-blue-800/50 px-3 py-1.5 rounded-lg transition-colors border border-blue-700/50"
      >
        <span>⚙️</span>
        تنظیمات API
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-fade-in-up">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">تنظیمات Gemini API</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            برای استفاده از برنامه در سایت‌های دیگر یا به صورت آفلاین (Local)، کلید API خود را اینجا وارد کنید. این کلید فقط در مرورگر شما ذخیره می‌شود.
          </p>

          <div className="space-y-3">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              dir="ltr"
            />
            
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors text-sm"
            >
              {isSaved ? 'ذخیره شد! ✅' : 'ذخیره کلید'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
