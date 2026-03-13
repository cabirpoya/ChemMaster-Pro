import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ElementSelection } from './components/ElementSelection';
import { ExtractionLab } from './components/ExtractionLab';
import { MoleculeBuilder } from './components/MoleculeBuilder';
import { ResultDisplay } from './components/ResultDisplay';
import { QuickRecipes } from './components/QuickRecipes';
import { Auth } from './components/Auth';
import { analyzeChemicalQuery } from './services/geminiService';
import { auth } from './services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const App: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 mt-8 space-y-8">
        {user ? (
          <>
            <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
              <p>Logged in as: {user.email}</p>
              <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </div>
            
            <div className="bg-blue-50 border-r-4 border-blue-600 p-4 rounded-md shadow-sm">
              <p className="text-blue-900 font-medium leading-7">
                به **ChemMaster Pro** خوش آمدید. اگر با شیمی آشنایی ندارید، از **آزمایشگاه مجازی** برای ترکیب مواد روزمره استفاده کنید. در غیر این صورت، نام عنصر، ترکیب یا معادله واکنش مورد نظر خود را وارد کنید تا تحلیل جامع دکترا شامل **شبیه‌سازی گام‌به‌گام مراحل واکنش**، ایمنی و امکان‌سنجی صنعتی را دریافت کنید.
              </p>
            </div>

            <QuickRecipes onAnalyze={handleAnalyze} isLoading={isLoading} />

            <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
            
            <MoleculeBuilder onAnalyze={handleAnalyze} isLoading={isLoading} />
            
            <ElementSelection onAnalyze={handleAnalyze} isLoading={isLoading} />
            
            <ExtractionLab onAnalyze={handleAnalyze} isLoading={isLoading} />

            {error && (
              <div className="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm animate-pulse">
                <p className="font-bold mb-1">خطا در پردازش</p>
                <p>{error}</p>
              </div>
            )}

            <ResultDisplay result={result} isLoading={isLoading} />
          </>
        ) : (
          <div className="flex justify-center mt-20">
            <Auth />
          </div>
        )}
      </main>
      
      <footer className="mt-20 text-center text-gray-400 text-sm py-6">
        <p>ChemMaster Pro &copy; {new Date().getFullYear()} - Powered by Gemini 3 Flash</p>
      </footer>
    </div>
  );
};

export default App;