import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft } from 'lucide-react';

interface Step2Props {
  onBack: () => void;
  onSelect: (serviceType: 'Replacement' | 'Repair') => void;
  selectedType?: 'Replacement' | 'Repair';
  city: string;
}

export function Step2ProjectScope({ onBack, onSelect, selectedType }: Step2Props) {
  const [selected, setSelected] = useState<'Replacement' | 'Repair' | undefined>(
    selectedType === 'Replacement' || selectedType === 'Repair' ? selectedType : undefined
  );

  const handleCardClick = (type: 'Replacement' | 'Repair') => {
    setSelected(type);
    setTimeout(() => {
      onSelect(type);
    }, 180);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-center">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Main Headline */}
      <div className="space-y-2 pt-1 max-w-md mx-auto">
        <h2 className="font-sans text-[22px] sm:text-[26px] font-bold text-[#1E3944] tracking-tight leading-snug">
          Do you need to replace or repair an existing roof?
        </h2>
      </div>

      {/* Symmetrical 2-Card Selection (Replace vs Repair) */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto pt-1">
        {/* Replace Card */}
        <button
          type="button"
          onClick={() => handleCardClick('Replacement')}
          className={`p-6 sm:p-8 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center group ${
            selected === 'Replacement'
              ? 'border-[#0D9488] bg-[#F0FDFA] shadow-md ring-2 ring-[#0D9488]/20'
              : 'border-[#8BA3A8] bg-white hover:border-[#0D9488] hover:shadow-sm'
          }`}
        >
          {/* Circular Icon Container */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E0F2FE] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <svg className="w-12 h-12 text-[#0284C7]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 8L8 20H14V38H34V20H40L24 8Z" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="white" />
              <path d="M19 24C19 21.2386 21.2386 19 24 19C26.1 19 27.8 20.3 28.6 22" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M29 19V22H26" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M29 29C29 31.7614 26.7614 34 24 34C21.9 34 20.2 32.7 19.4 31" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M19 34V31H22" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <span className="font-sans font-bold text-base sm:text-lg text-[#1E3944]">
            Replace
          </span>
        </button>

        {/* Repair Card */}
        <button
          type="button"
          onClick={() => handleCardClick('Repair')}
          className={`p-6 sm:p-8 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center group ${
            selected === 'Repair'
              ? 'border-[#0D9488] bg-[#F0FDFA] shadow-md ring-2 ring-[#0D9488]/20'
              : 'border-[#8BA3A8] bg-white hover:border-[#0D9488] hover:shadow-sm'
          }`}
        >
          {/* Circular Icon Container */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E0F2FE] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <svg className="w-12 h-12 text-[#0284C7]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 8L8 20H14V38H34V20H40L24 8Z" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="white" />
              <path d="M24 16L22 22L26 25L24 30" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
              <path d="M19 15L23 20" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M23 18L32 10L35 13L26 21" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <span className="font-sans font-bold text-base sm:text-lg text-[#1E3944]">
            Repair
          </span>
        </button>
      </div>

      {/* Symmetrical Bottom Navigation */}
      <div className="flex items-center justify-center gap-4 max-w-sm mx-auto pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-12 h-12 rounded-full border-2 border-[#8BA3A8] text-[#8BA3A8] hover:text-[#1E3944] hover:border-[#1E3944] transition-colors flex items-center justify-center cursor-pointer shadow-sm shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          className="flex-1 h-14 bg-[#FBBF77] hover:bg-[#F5A647] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-extrabold text-base tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
