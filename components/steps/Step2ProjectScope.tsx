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
    <div className="animate-fade-in text-center">
      <HammerHouseLogo size="md" align="center" />

      <h2 className="mt-10 mb-8 font-sans text-[24px] sm:text-[28px] font-bold text-[#0F172A] leading-snug">
        Do you need to replace or repair an existing roof?
      </h2>

      {/* Two side-by-side cards */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <button type="button" onClick={() => handleCardClick('Replacement')}
          className={`rounded-xl border overflow-hidden transition-all duration-150 cursor-pointer flex flex-col items-center ${
            selected === 'Replacement'
              ? 'border-[#8B1122] bg-[#FFF5F6] shadow-md ring-1 ring-[#8B1122]/20'
              : 'border-[#E2E8F0] bg-white hover:border-[#8B1122]/40 hover:shadow-sm'
          }`}
        >
          <div className="py-7 px-4 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#EEF7FA] flex items-center justify-center">
              <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
                <path d="M32 10L10 28H16V50H48V28H54L32 10Z" stroke="#7EC8D9" strokeWidth="2" fill="#F0F9FB" />
                <circle cx="36" cy="32" r="5" stroke="#7EC8D9" strokeWidth="2" />
                <path d="M28 26L32 31" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
                <path d="M39 36L44 40" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className={`w-full py-3 text-center ${selected === 'Replacement' ? 'bg-[#8B1122]' : 'bg-[#F1F5F9]'}`}>
            <span className={`text-sm font-bold ${selected === 'Replacement' ? 'text-white' : 'text-[#0F172A]'}`}>Replace</span>
          </div>
        </button>

        <button type="button" onClick={() => handleCardClick('Repair')}
          className={`rounded-xl border overflow-hidden transition-all duration-150 cursor-pointer flex flex-col items-center ${
            selected === 'Repair'
              ? 'border-[#8B1122] bg-[#FFF5F6] shadow-md ring-1 ring-[#8B1122]/20'
              : 'border-[#E2E8F0] bg-white hover:border-[#8B1122]/40 hover:shadow-sm'
          }`}
        >
          <div className="py-7 px-4 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#EEF7FA] flex items-center justify-center">
              <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
                <path d="M32 10L10 28H16V50H48V28H54L32 10Z" stroke="#7EC8D9" strokeWidth="2" fill="#F0F9FB" />
                <path d="M28 20L25 30" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
                <path d="M35 16L38 22" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
                <path d="M34 30L42 22L46 26L38 34" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`w-full py-3 text-center ${selected === 'Repair' ? 'bg-[#8B1122]' : 'bg-[#F1F5F9]'}`}>
            <span className={`text-sm font-bold ${selected === 'Repair' ? 'text-white' : 'text-[#0F172A]'}`}>Repair</span>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button type="button" onClick={onBack}
          className="w-11 h-11 rounded-full border border-[#CBD5E1] text-[#94A3B8] hover:text-[#0F172A] hover:border-[#0F172A] transition-colors flex items-center justify-center cursor-pointer shrink-0">
          <ArrowLeft className="w-4.5 h-4.5" />
        </button>
        <button type="button" onClick={() => selected && onSelect(selected)} disabled={!selected}
          className="flex-1 h-[52px] bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-40 text-white font-sans font-bold text-[15px] tracking-wide rounded-xl transition-all flex items-center justify-center cursor-pointer">
          NEXT
        </button>
      </div>
    </div>
  );
}
