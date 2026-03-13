import React from 'react';

interface QuickRecipesProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const QuickRecipes: React.FC<QuickRecipesProps> = ({ onAnalyze, isLoading }) => {
  const recipes = [
    {
      title: 'ساخت صابون',
      icon: '🧼',
      query: 'چطور در خانه با روغن و سود سوزآور صابون بسازم؟',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200'
    },
    {
      title: 'عطر خانگی',
      icon: '🌸',
      query: 'چطور با الکل سفید و اسانس معطر یک عطر خوشبو بسازم؟',
      color: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200'
    },
    {
      title: 'شوینده قوی',
      icon: '🧽',
      query: 'چطور یک شوینده قوی برای چربی‌های آشپزخانه بسازم؟',
      color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
    },
    {
      title: 'آتشفشان خانگی',
      icon: '🌋',
      query: 'ترکیب جوش شیرین و سرکه چه واکنشی دارد؟ (آتشفشان خانگی)',
      color: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">✨</span>
        <h2 className="text-xl font-bold text-gray-800">شیمی روزمره (دستورالعمل‌های سریع)</h2>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        بدون نیاز به دانش شیمی، با یک کلیک دستورالعمل ساخت مواد کاربردی را ببینید:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recipes.map((recipe, index) => (
          <button
            key={index}
            onClick={() => onAnalyze(recipe.query)}
            disabled={isLoading}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${recipe.color} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'transform hover:-translate-y-1 hover:shadow-md'}`}
          >
            <span className="text-4xl mb-2">{recipe.icon}</span>
            <span className="font-bold text-sm text-center">{recipe.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
