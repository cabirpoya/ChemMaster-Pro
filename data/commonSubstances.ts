export interface Substance {
  id: string;
  name: string;
  formula: string;
  icon: string;
  color: string;
}

export const COMMON_SUBSTANCES: Substance[] = [
  { id: 'water', name: 'آب', formula: 'H2O', icon: '💧', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'salt', name: 'نمک طعام', formula: 'NaCl', icon: '🧂', color: 'bg-gray-100 text-gray-800 border-gray-300' },
  { id: 'sugar', name: 'شکر', formula: 'C12H22O11', icon: '🍬', color: 'bg-pink-100 text-pink-800 border-pink-300' },
  { id: 'baking_soda', name: 'جوش شیرین', formula: 'NaHCO3', icon: '🧁', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { id: 'vinegar', name: 'سرکه', formula: 'CH3COOH', icon: '🍷', color: 'bg-red-100 text-red-800 border-red-300' },
  { id: 'bleach', name: 'وایتکس', formula: 'NaClO', icon: '🧴', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'ammonia', name: 'آمونیاک', formula: 'NH3', icon: '💨', color: 'bg-green-100 text-green-800 border-green-300' },
  { id: 'hydrogen_peroxide', name: 'آب اکسیژنه', formula: 'H2O2', icon: '🫧', color: 'bg-teal-100 text-teal-800 border-teal-300' },
  { id: 'ethanol', name: 'الکل سفید', formula: 'C2H5OH', icon: '🧪', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { id: 'oil', name: 'روغن گیاهی', formula: 'Lipids', icon: '🫒', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'caustic_soda', name: 'سود سوزآور', formula: 'NaOH', icon: '🧼', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  { id: 'essential_oil', name: 'اسانس معطر', formula: 'Aroma', icon: '🌸', color: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300' },
];
