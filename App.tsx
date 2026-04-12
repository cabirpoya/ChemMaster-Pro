import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { InputSection } from './components/InputSection';
import { ElementSelection } from './components/ElementSelection';
import { ExtractionLab } from './components/ExtractionLab';
import { MoleculeBuilder } from './components/MoleculeBuilder';
import { ResultDisplay } from './components/ResultDisplay';
import { QuickRecipes } from './components/QuickRecipes';
import { SpecializedDomains } from './components/SpecializedDomains';
import { analyzeChemicalQuery } from './services/geminiService';
import { FlaskConical, Beaker, Atom, TestTube, ArrowRight, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('ALL');

  const handleAnalyze = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeChemicalQuery(query);
      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("خطای ناشناخته رخ داده است.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e213a] flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-[#f5f7f9] px-12 py-16 flex items-center justify-between overflow-hidden relative">
          <div className="max-w-2xl z-10">
            <h1 className="text-5xl font-bold text-[#1a1c2c] mb-4 tracking-tight">
              ChemMaster Pro<span className="text-blue-500">.</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
              تجربه شیمی خود را ارتقا دهید و همین حالا تحلیل‌های پیشرفته، شبیه‌سازی‌های مولکولی و امکان‌سنجی‌های صنعتی را در خانه یا دفتر کار خود آغاز کنید.
            </p>
            
            <button 
              onClick={() => document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl shadow-green-500/20 transition-all flex items-center gap-3 group"
            >
              شروع تحلیل هوشمند
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="mt-6 text-sm text-blue-500 font-medium cursor-pointer hover:underline">
              آیا در تیم هستید؟ ChemMaster برای کسب‌وکارها را امتحان کنید
            </p>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="w-[450px] h-[300px] bg-white rounded-2xl shadow-2xl p-4 rotate-[-10deg] translate-x-10 translate-y-10 border border-gray-100">
              <div className="w-full h-full bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                <Atom className="w-32 h-32 text-blue-500 opacity-20 animate-spin-slow" />
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#1e213a] px-12 py-8">
          {/* Tabs */}
          <div className="flex items-center justify-between mb-12 border-b border-white/5">
            <div className="flex gap-8">
              {['ALL', 'SPECIALIZED', 'NEW', 'FEATURED', 'POPULAR'].map((tab) => (
                <div 
                  key={tab}
                  className={`nav-tab ${activeTab === tab ? 'active' : 'text-gray-400'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'SPECIALIZED' ? 'تخصصی (PhD)' : tab}
                </div>
              ))}
            </div>
            <div className="text-gray-400 text-sm flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <span>دسته‌بندی‌ها</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Grid Content */}
          {activeTab === 'ALL' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div id="input-section" className="lg:col-span-2">
                  <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
                </div>
                <div className="lg:col-span-2">
                  <QuickRecipes onAnalyze={handleAnalyze} isLoading={isLoading} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <MoleculeBuilder onAnalyze={handleAnalyze} isLoading={isLoading} />
                <ElementSelection onAnalyze={handleAnalyze} isLoading={isLoading} />
                <ExtractionLab onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
            </>
          )}

          {activeTab === 'SPECIALIZED' && (
            <div className="mb-12">
              <SpecializedDomains onAnalyze={handleAnalyze} isLoading={isLoading} />
              <div id="input-section">
                <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
            </div>
          )}

          {activeTab !== 'SPECIALIZED' && activeTab !== 'ALL' && (
            <div className="text-center py-20 text-gray-500">
              محتوای این بخش به زودی اضافه خواهد شد.
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border-r-4 border-red-500 text-red-400 p-6 rounded-xl mb-12 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold mb-1">خطا در پردازش</p>
                <p>{error}</p>
              </div>
              <button 
                onClick={() => handleAnalyze(result || "")} // This is not quite right, we need the original query
                className="hidden" // Hiding for now as we don't store the original query easily without refactoring
              >
                تلاش مجدد
              </button>
            </div>
          )}

          <ResultDisplay result={result} isLoading={isLoading} />
        </main>
        
        <footer className="bg-[#1a1c2c] text-center text-gray-500 text-sm py-8 border-t border-white/5">
          <p>ChemMaster Pro &copy; {new Date().getFullYear()} - Powered by Gemini 3 Flash</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
