import React, { useState } from 'react';
import { 
  Atom, 
  Thermometer, 
  Activity, 
  Waves, 
  Skull, 
  Scissors, 
  Zap, 
  Factory, 
  Leaf, 
  Microscope, 
  ZapOff, 
  Cpu, 
  Sun, 
  Layers, 
  Pill, 
  Mountain, 
  Brain,
  GraduationCap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Domain {
  title: string;
  icon: React.ReactNode;
  query: string;
  color: string;
}

interface SpecializedDomainsProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
}

export const SpecializedDomains: React.FC<SpecializedDomainsProps> = ({ onAnalyze, isLoading }) => {
  const [isOpen, setIsOpen] = useState(true);
  const domains: Domain[] = [
    {
      title: 'شیمی کوانتومی',
      icon: <Atom className="w-6 h-6" />,
      query: 'تحلیل کوانتومی و محاسبات DFT برای یک سیستم مولکولی پیچیده را انجام دهید.',
      color: 'text-blue-400'
    },
    {
      title: 'ترمودینامیک پیشرفته',
      icon: <Thermometer className="w-6 h-6" />,
      query: 'تحلیل ترمودینامیکی پتانسیل شیمیایی و فوگاسیته در یک سیستم چندفازی را بررسی کنید.',
      color: 'text-red-400'
    },
    {
      title: 'سینتیک واکنش',
      icon: <Activity className="w-6 h-6" />,
      query: 'مکانیسم سینتیکی و نظریه حالت گذار برای یک واکنش کاتالیزوری را تشریح کنید.',
      color: 'text-green-400'
    },
    {
      title: 'طیفسنجی چندبعدی',
      icon: <Waves className="w-6 h-6" />,
      query: 'تفسیر طیف‌های NMR دو بعدی (COSY/HSQC) و جرمی برای شناسایی ساختار مجهول.',
      color: 'text-purple-400'
    },
    {
      title: 'سمیتشناسی',
      icon: <Skull className="w-6 h-6" />,
      query: 'تحلیل سمیت‌شناسی فارماکوکینتیک و اثرات بیولوژیکی یک ترکیب شیمیایی خاص.',
      color: 'text-gray-400'
    },
    {
      title: 'رتروسنتز آلی',
      icon: <Scissors className="w-6 h-6" />,
      query: 'طراحی مسیر رتروسنتزی برای یک محصول طبیعی پیچیده با استفاده از سینتون‌ها.',
      color: 'text-pink-400'
    },
    {
      title: 'الکتروشیمی',
      icon: <Zap className="w-6 h-6" />,
      query: 'بررسی پتانسیل‌های اکسایش-کاهش و خوردگی در سلول‌های سوختی نسل جدید.',
      color: 'text-yellow-400'
    },
    {
      title: 'شیمی صنعتی',
      icon: <Factory className="w-6 h-6" />,
      query: 'طراحی فرآیند صنعتی و بهینه‌سازی اقتصاد اتمی در تولید مواد شیمیایی.',
      color: 'text-orange-400'
    },
    {
      title: 'شیمی سبز',
      icon: <Leaf className="w-6 h-6" />,
      query: 'ارزیابی شاخص‌های شیمی سبز و جایگزینی حلال‌های سمی با حلال‌های سبز.',
      color: 'text-emerald-400'
    },
    {
      title: 'نانوشیمی',
      icon: <Microscope className="w-6 h-6" />,
      query: 'سنتز نانوذرات و بررسی اثرات سطحی در نانوکاتالیزورها.',
      color: 'text-cyan-400'
    },
    {
      title: 'کاتالیز',
      icon: <ZapOff className="w-6 h-6" />,
      query: 'تحلیل عملکرد کاتالیزورهای ناهمگن در واکنش‌های هیدروژناسیون.',
      color: 'text-indigo-400'
    },
    {
      title: 'شیمی محاسباتی',
      icon: <Cpu className="w-6 h-6" />,
      query: 'شبیه‌سازی دینامیک مولکولی و پیش‌بینی خواص فیزیکی با نرم‌افزارهای محاسباتی.',
      color: 'text-blue-500'
    },
    {
      title: 'فوتوشیمی',
      icon: <Sun className="w-6 h-6" />,
      query: 'بررسی واکنش‌های برانگیخته نوری و انتقال انرژی در سیستم‌های فوتوولتائیک.',
      color: 'text-amber-400'
    },
    {
      title: 'شیمی پلیمر',
      icon: <Layers className="w-6 h-6" />,
      query: 'تحلیل پلیمریزاسیون رادیکالی و خواص رئولوژیکی پلیمرهای هوشمند.',
      color: 'text-violet-400'
    },
    {
      title: 'شیمی دارویی',
      icon: <Pill className="w-6 h-6" />,
      query: 'طراحی دارو بر اساس برهم‌کنش دارو-گیرنده و تحلیل QSAR.',
      color: 'text-rose-400'
    },
    {
      title: 'معادن افغانستان',
      icon: <Mountain className="w-6 h-6" />,
      query: 'تحلیل کانی‌شناسی و پتانسیل استخراج لیتیوم و عناصر کمیاب در معادن افغانستان.',
      color: 'text-stone-400'
    },
    {
      title: 'یادگیری ماشین',
      icon: <Brain className="w-6 h-6" />,
      query: 'استفاده از الگوریتم‌های یادگیری ماشین برای پیش‌بینی فعالیت بیولوژیکی مولکول‌ها.',
      color: 'text-teal-400'
    }
  ];

  return (
    <div className="bg-[#2b2e4a] rounded-2xl shadow-2xl border border-white/5 mb-12 overflow-hidden transition-all duration-300">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-8 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <GraduationCap className="text-blue-500 w-8 h-8" />
          <h2 className="text-2xl font-bold text-white">دپارتمان‌های تخصصی (PhD Level)</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30 hidden sm:block">
            فعال شده
          </div>
          {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-8 pb-8 pt-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {domains.map((domain, index) => (
                <button
                  key={index}
                  onClick={() => onAnalyze(domain.query)}
                  disabled={isLoading}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`mb-3 p-3 rounded-lg bg-white/5 group-hover:scale-110 transition-transform ${domain.color}`}>
                    {domain.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-300 text-center group-hover:text-white transition-colors">
                    {domain.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
