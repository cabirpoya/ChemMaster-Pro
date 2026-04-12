import React from 'react';
import { Sparkles, Wind, Droplets, Flame, Star } from 'lucide-react';

interface QuickRecipesProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const QuickRecipes: React.FC<QuickRecipesProps> = ({ onAnalyze, isLoading }) => {
  const recipes = [
    {
      title: 'ساخت صابون',
      icon: <Droplets className="w-8 h-8 text-emerald-400" />,
      query: 'چطور در خانه با روغن و سود سوزآور صابون بسازم؟',
      rating: 5
    },
    {
      title: 'عطر خانگی',
      icon: <Wind className="w-8 h-8 text-pink-400" />,
      query: 'چطور با الکل سفید و اسانس معطر یک عطر خوشبو بسازم؟',
      rating: 4
    },
    {
      title: 'شوینده قوی',
      icon: <Droplets className="w-8 h-8 text-blue-400" />,
      query: 'چطور یک شوینده قوی برای چربی‌های آشپزخانه بسازم؟',
      rating: 5
    },
    {
      title: 'آتشفشان خانگی',
      icon: <Flame className="w-8 h-8 text-orange-400" />,
      query: 'ترکیب جوش شیرین و سرکه چه واکنشی دارد؟ (آتشفشان خانگی)',
      rating: 4
    }
  ];

  return (
    <div className="bg-[#2b2e4a] rounded-2xl shadow-2xl p-8 border border-white/5 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <Sparkles className="text-yellow-400 w-6 h-6" />
          شیمی روزمره (دستورالعمل‌های سریع)
        </h2>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {recipes.map((recipe, index) => (
          <button
            key={index}
            onClick={() => onAnalyze(recipe.query)}
            disabled={isLoading}
            className={`chem-card group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="mb-4 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              {recipe.icon}
            </div>
            <span className="font-bold text-white mb-2">{recipe.title}</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < recipe.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

