import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft } from 'lucide-react';

interface Step2Props {
  onBack: () => void;
  onSelect: (serviceType: 'Replacement' | 'Repair') => void;
  selectedType?: 'Replacement' | 'Repair';
  city: string;
}

export function Step2ProjectScope({ onBack, onSelect, selectedType, city }: Step2Props) {
  const [selected, setSelected] = useState<'Replacement' | 'Repair' | undefined>(
    selectedType === 'Replacement' || selectedType === 'Repair' ? selectedType : undefined
  );

  const handleCardClick = (type: 'Replacement' | 'Repair') => {
    setSelected(type);
    setTimeout(() => onSelect(type), 200);
  };

  return (
    <div className="text-center animate-fade-in">
      <HammerHouseLogo size="md" align="center" />

      <h2 className="mt-10 mb-8 text-[24px] sm:text-[28px] font-bold text-[#1E3A3A] leading-tight italic">
        Do you need to replace or repair an existing roof?
      </h2>

      {/* Two side-by-side cards */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {/* Replace */}
        <button
          type="button"
          onClick={() => handleCardClick('Replacement')}
          className={`rounded-xl border transition-all duration-150 cursor-pointer flex flex-col items-center pt-8 pb-5 px-4 ${
            selected === 'Replacement'
              ? 'border-[#8B1122] bg-[#FFF5F5] shadow-md'
              : 'border-[#A3B8B0] bg-white hover:border-[#8B1122]/50 hover:shadow-sm'
          }`}
        >
          {/* Illustration */}
          <div className="w-20 h-20 rounded-full bg-[#E8F4F8] flex items-center justify-center mb-4">
            <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 10L10 28H16V50H48V28H54L32 10Z" stroke="#7EC8D9" strokeWidth="2" fill="#F0F9FB" />
              <circle cx="36" cy="32" r="5" stroke="#7EC8D9" strokeWidth="2" />
              <path d="M28 26L32 31" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
              <path d="M39 36L44 40" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-base font-medium text-[#1E3A3A]">Replace</span>
        </button>

        {/* Repair */}
        <button
          type="button"
          onClick={() => handleCardClick('Repair')}
          className={`rounded-xl border transition-all duration-150 cursor-pointer flex flex-col items-center pt-8 pb-5 px-4 ${
            selected === 'Repair'
              ? 'border-[#8B1122] bg-[#FFF5F5] shadow-md'
              : 'border-[#A3B8B0] bg-white hover:border-[#8B1122]/50 hover:shadow-sm'
          }`}
        >
          {/* Illustration */}
          <div className="w-20 h-20 rounded-full bg-[#E8F4F8] flex items-center justify-center mb-4">
            <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 10L10 28H16V50H48V28H54L32 10Z" stroke="#7EC8D9" strokeWidth="2" fill="#F0F9FB" />
              <path d="M28 20L25 30" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
              <path d="M35 16L38 22" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
              <path d="M34 30L42 22L46 26L38 34" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-base font-medium text-[#1E3A3A]">Repair</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-[#A3B8B0] text-[#A3B8B0] hover:text-[#1E3A3A] hover:border-[#1E3A3A] transition-colors flex items-center justify-center cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          className="flex-1 h-14 bg-[#F5C882] hover:bg-[#EDB960] active:scale-[0.98] disabled:opacity-40 text-white font-sans font-bold text-base tracking-widest rounded-xl transition-all flex items-center justify-center cursor-pointer"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
