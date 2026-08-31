import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

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
    // No auto-advance; waits for user to click NEXT button
  };

  const handleNext = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="animate-fade-in text-center">
      <HammerHouseLogo size="md" align="center" />

      <h2 className="mt-8 mb-2 font-sans text-[24px] sm:text-[28px] font-bold text-[#0F172A] leading-snug">
        Do you need to replace or repair an existing roof?
      </h2>
      <p className="text-sm font-medium text-[#64748B] mb-8">
        Select an option to see pricing in <strong className="text-[#0F172A]">{city}, FL</strong>
      </p>

      {/* Two side-by-side cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          type="button"
          onClick={() => handleCardClick('Replacement')}
          className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-150 cursor-pointer flex flex-col items-center group ${
            selected === 'Replacement'
              ? 'border-[#8B1122] bg-[#FFF5F6] shadow-md ring-2 ring-[#8B1122]/15'
              : 'border-slate-200 bg-white hover:border-[#8B1122]/50 hover:shadow-sm'
          }`}
        >
          {selected === 'Replacement' && (
            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#8B1122] text-white flex items-center justify-center shadow-sm">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div className="py-7 px-4 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#EEF7FA] flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
                <path d="M32 10L10 28H16V50H48V28H54L32 10Z" stroke="#7EC8D9" strokeWidth="2" fill="#F0F9FB" />
                <circle cx="36" cy="32" r="5" stroke="#7EC8D9" strokeWidth="2" />
                <path d="M28 26L32 31" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
                <path d="M39 36L44 40" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className={`w-full py-3.5 text-center transition-colors ${selected === 'Replacement' ? 'bg-[#8B1122]' : 'bg-[#F1F5F9]'}`}>
            <span className={`text-sm sm:text-base font-bold ${selected === 'Replacement' ? 'text-white' : 'text-[#0F172A]'}`}>
              Replace
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleCardClick('Repair')}
          className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-150 cursor-pointer flex flex-col items-center group ${
            selected === 'Repair'
              ? 'border-[#8B1122] bg-[#FFF5F6] shadow-md ring-2 ring-[#8B1122]/15'
              : 'border-slate-200 bg-white hover:border-[#8B1122]/50 hover:shadow-sm'
          }`}
        >
          {selected === 'Repair' && (
            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#8B1122] text-white flex items-center justify-center shadow-sm">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div className="py-7 px-4 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#EEF7FA] flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
                <path d="M32 10L10 28H16V50H48V28H54L32 10Z" stroke="#7EC8D9" strokeWidth="2" fill="#F0F9FB" />
                <path d="M28 20L25 30" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
                <path d="M35 16L38 22" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" />
                <path d="M34 30L42 22L46 26L38 34" stroke="#7EC8D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className={`w-full py-3.5 text-center transition-colors ${selected === 'Repair' ? 'bg-[#8B1122]' : 'bg-[#F1F5F9]'}`}>
            <span className={`text-sm sm:text-base font-bold ${selected === 'Repair' ? 'text-white' : 'text-[#0F172A]'}`}>
              Repair
            </span>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-11 h-11 rounded-full border border-[#CBD5E1] text-[#94A3B8] hover:text-[#0F172A] hover:border-[#0F172A] transition-colors flex items-center justify-center cursor-pointer shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selected}
          className="flex-1 h-[52px] bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none text-white font-sans font-bold text-[15px] tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>NEXT</span>
          <ArrowRight className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
}
