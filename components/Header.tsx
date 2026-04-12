import React from 'react';
import { Search, Bell, Mail, ChevronDown } from 'lucide-react';
import { ApiKeySettings } from './ApiKeySettings';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 ml-16 sticky top-0 z-40">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="جستجو در عناصر، واکنش‌ها و آزمایشگاه..." 
            className="w-full bg-gray-50 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-gray-600"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-gray-400">
          <div className="relative cursor-pointer hover:text-blue-500 transition-colors">
            <Mail className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">7</span>
          </div>
          <div className="cursor-pointer hover:text-blue-500 transition-colors">
            <Bell className="w-5 h-5" />
          </div>
        </div>
        
        <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20">
            CM
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">پویا بلخی</span>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
        
        <div className="ml-4">
          <ApiKeySettings />
        </div>
      </div>
    </header>
  );
};
