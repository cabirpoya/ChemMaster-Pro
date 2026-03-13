export interface ElementItem {
  name: string;
  symbol: string;
  number: number;
  details?: string;
}

export interface ElementGroup {
  groupName: string;
  elements: ElementItem[];
}

export const ELEMENT_GROUPS: ElementGroup[] = [
  {
    groupName: "گروه 1 – فلزات قلیایی (Alkali Metals)",
    elements: [
      { name: "Hydrogen", symbol: "H", number: 1, details: "Non-metal" },
      { name: "Lithium", symbol: "Li", number: 3, details: "Alkali metal" },
      { name: "Sodium", symbol: "Na", number: 11, details: "Alkali metal" },
      { name: "Potassium", symbol: "K", number: 19, details: "Alkali metal" },
      { name: "Rubidium", symbol: "Rb", number: 37, details: "Alkali metal" },
      { name: "Cesium", symbol: "Cs", number: 55, details: "Alkali metal" },
      { name: "Francium", symbol: "Fr", number: 87, details: "Alkali metal" },
    ]
  },
  {
    groupName: "گروه 2 – فلزات قلیایی خاکی (Alkaline Earth Metals)",
    elements: [
      { name: "Beryllium", symbol: "Be", number: 4 },
      { name: "Magnesium", symbol: "Mg", number: 12 },
      { name: "Calcium", symbol: "Ca", number: 20 },
      { name: "Strontium", symbol: "Sr", number: 38 },
      { name: "Barium", symbol: "Ba", number: 56 },
      { name: "Radium", symbol: "Ra", number: 88 },
    ]
  },
  {
    groupName: "گروه 3 تا 12 – فلزات واسطه (Transition Metals)",
    elements: [
      { name: "Scandium", symbol: "Sc", number: 21 },
      { name: "Titanium", symbol: "Ti", number: 22 },
      { name: "Vanadium", symbol: "V", number: 23 },
      { name: "Chromium", symbol: "Cr", number: 24 },
      { name: "Manganese", symbol: "Mn", number: 25 },
      { name: "Iron", symbol: "Fe", number: 26 },
      { name: "Cobalt", symbol: "Co", number: 27 },
      { name: "Nickel", symbol: "Ni", number: 28 },
      { name: "Copper", symbol: "Cu", number: 29 },
      { name: "Zinc", symbol: "Zn", number: 30 },
      { name: "Yttrium", symbol: "Y", number: 39 },
      { name: "Zirconium", symbol: "Zr", number: 40 },
      { name: "Niobium", symbol: "Nb", number: 41 },
      { name: "Molybdenum", symbol: "Mo", number: 42 },
      { name: "Technetium", symbol: "Tc", number: 43 },
      { name: "Ruthenium", symbol: "Ru", number: 44 },
      { name: "Rhodium", symbol: "Rh", number: 45 },
      { name: "Palladium", symbol: "Pd", number: 46 },
      { name: "Silver", symbol: "Ag", number: 47 },
      { name: "Cadmium", symbol: "Cd", number: 48 },
      { name: "Hafnium", symbol: "Hf", number: 72 },
      { name: "Tantalum", symbol: "Ta", number: 73 },
      { name: "Tungsten", symbol: "W", number: 74 },
      { name: "Rhenium", symbol: "Re", number: 75 },
      { name: "Osmium", symbol: "Os", number: 76 },
      { name: "Iridium", symbol: "Ir", number: 77 },
      { name: "Platinum", symbol: "Pt", number: 78 },
      { name: "Gold", symbol: "Au", number: 79 },
      { name: "Mercury", symbol: "Hg", number: 80 },
      { name: "Rutherfordium", symbol: "Rf", number: 104 },
      { name: "Dubnium", symbol: "Db", number: 105 },
      { name: "Seaborgium", symbol: "Sg", number: 106 },
      { name: "Bohrium", symbol: "Bh", number: 107 },
      { name: "Hassium", symbol: "Hs", number: 108 },
      { name: "Meitnerium", symbol: "Mt", number: 109 },
      { name: "Darmstadtium", symbol: "Ds", number: 110 },
      { name: "Roentgenium", symbol: "Rg", number: 111 },
      { name: "Copernicium", symbol: "Cn", number: 112 },
    ]
  },
  {
    groupName: "گروه 13 – Boron Group",
    elements: [
      { name: "Boron", symbol: "B", number: 5 },
      { name: "Aluminum", symbol: "Al", number: 13 },
      { name: "Gallium", symbol: "Ga", number: 31 },
      { name: "Indium", symbol: "In", number: 49 },
      { name: "Thallium", symbol: "Tl", number: 81 },
      { name: "Nihonium", symbol: "Nh", number: 113 },
    ]
  },
  {
    groupName: "گروه 14 – Carbon Group",
    elements: [
      { name: "Carbon", symbol: "C", number: 6 },
      { name: "Silicon", symbol: "Si", number: 14 },
      { name: "Germanium", symbol: "Ge", number: 32 },
      { name: "Tin", symbol: "Sn", number: 50 },
      { name: "Lead", symbol: "Pb", number: 82 },
      { name: "Flerovium", symbol: "Fl", number: 114 },
    ]
  },
  {
    groupName: "گروه 15 – Nitrogen Group",
    elements: [
      { name: "Nitrogen", symbol: "N", number: 7 },
      { name: "Phosphorus", symbol: "P", number: 15 },
      { name: "Sulfur", symbol: "S", number: 16 }, // Note: User listed Sulfur in both 15 and 16, keeping as per request
      { name: "Arsenic", symbol: "As", number: 33 },
      { name: "Antimony", symbol: "Sb", number: 51 },
      { name: "Bismuth", symbol: "Bi", number: 83 },
      { name: "Moscovium", symbol: "Mc", number: 115 },
    ]
  },
  {
    groupName: "گروه 16 – Chalcogens",
    elements: [
      { name: "Oxygen", symbol: "O", number: 8 },
      { name: "Sulfur", symbol: "S", number: 16 },
      { name: "Selenium", symbol: "Se", number: 34 },
      { name: "Tellurium", symbol: "Te", number: 52 },
      { name: "Polonium", symbol: "Po", number: 84 },
      { name: "Livermorium", symbol: "Lv", number: 116 },
    ]
  },
  {
    groupName: "گروه 17 – Halogens",
    elements: [
      { name: "Fluorine", symbol: "F", number: 9 },
      { name: "Chlorine", symbol: "Cl", number: 17 },
      { name: "Bromine", symbol: "Br", number: 35 },
      { name: "Iodine", symbol: "I", number: 53 },
      { name: "Astatine", symbol: "At", number: 85 },
      { name: "Tennessine", symbol: "Ts", number: 117 },
    ]
  },
  {
    groupName: "گروه 18 – گازهای نجیب (Noble Gases)",
    elements: [
      { name: "Helium", symbol: "He", number: 2 },
      { name: "Neon", symbol: "Ne", number: 10 },
      { name: "Argon", symbol: "Ar", number: 18 },
      { name: "Krypton", symbol: "Kr", number: 36 },
      { name: "Xenon", symbol: "Xe", number: 54 },
      { name: "Radon", symbol: "Rn", number: 86 },
      { name: "Oganesson", symbol: "Og", number: 118 },
    ]
  },
  {
    groupName: "لانتانایدها (Lanthanides)",
    elements: [
      { name: "Lanthanum", symbol: "La", number: 57 },
      { name: "Cerium", symbol: "Ce", number: 58 },
      { name: "Praseodymium", symbol: "Pr", number: 59 },
      { name: "Neodymium", symbol: "Nd", number: 60 },
      { name: "Promethium", symbol: "Pm", number: 61 },
      { name: "Samarium", symbol: "Sm", number: 62 },
      { name: "Europium", symbol: "Eu", number: 63 },
      { name: "Gadolinium", symbol: "Gd", number: 64 },
      { name: "Terbium", symbol: "Tb", number: 65 },
      { name: "Dysprosium", symbol: "Dy", number: 66 },
      { name: "Holmium", symbol: "Ho", number: 67 },
      { name: "Erbium", symbol: "Er", number: 68 },
      { name: "Thulium", symbol: "Tm", number: 69 },
      { name: "Ytterbium", symbol: "Yb", number: 70 },
      { name: "Lutetium", symbol: "Lu", number: 71 },
    ]
  },
  {
    groupName: "اکتینایدها (Actinides)",
    elements: [
      { name: "Actinium", symbol: "Ac", number: 89 },
      { name: "Thorium", symbol: "Th", number: 90 },
      { name: "Protactinium", symbol: "Pa", number: 91 },
      { name: "Uranium", symbol: "U", number: 92 },
      { name: "Neptunium", symbol: "Np", number: 93 },
      { name: "Plutonium", symbol: "Pu", number: 94 },
      { name: "Americium", symbol: "Am", number: 95 },
      { name: "Curium", symbol: "Cm", number: 96 },
      { name: "Berkelium", symbol: "Bk", number: 97 },
      { name: "Californium", symbol: "Cf", number: 98 },
      { name: "Einsteinium", symbol: "Es", number: 99 },
      { name: "Fermium", symbol: "Fm", number: 100 },
      { name: "Mendelevium", symbol: "Md", number: 101 },
      { name: "Nobelium", symbol: "No", number: 102 },
      { name: "Lawrencium", symbol: "Lr", number: 103 },
    ]
  }
];