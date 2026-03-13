import React from 'react';
import { ApiKeySettings } from './ApiKeySettings';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-l from-blue-700 to-indigo-800 text-white p-6 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start text-center md:text-right">
          <div className="flex items-center gap-3 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            <h1 className="text-3xl font-bold tracking-tight">ChemMaster Pro</h1>
          </div>
          <p className="text-blue-100 text-sm md:text-base font-light opacity-90">
            موتور تحلیل شیمیایی پیشرفته | شبیه‌سازی، ایمنی و امکان‌سنجی صنعتی
          </p>
        </div>
        <ApiKeySettings />
      </div>
    </header>
  );
};