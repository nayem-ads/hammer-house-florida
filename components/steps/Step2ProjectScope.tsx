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
    setTimeout(() => {
      onSelect(type);
    }, 180);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-center">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Main Headline */}
      <div className="space-y-1.5 pt-1 max-w-md mx-auto">
        <h2 className="font-sans text-2xl sm:text-[28px] font-black text-[#0F172A] tracking-[-0.03em] leading-tight">
          What type of roofing service do you need?
        </h2>
        <p className="text-sm font-medium text-[#475569]">
          Select one to calculate accurate pricing in <strong className="text-[#0F172A]">{city}, FL</strong>
        </p>
      </div>

      {/* 2-Tone High-Converting Quiz Cards (Reference Style) */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 max-w-md mx-auto pt-1">
        {/* Replace Card */}
        <button
          type="button"
          onClick={() => handleCardClick('Replacement')}
          className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 cursor-pointer flex flex-col items-stretch group text-left ${
            selected === 'Replacement'
              ? 'border-[#8B1122] ring-4 ring-[#8B1122]/15 shadow-lg scale-[1.02]'
              : 'border-slate-200 hover:border-[#8B1122] hover:shadow-md active:scale-[0.98]'
          }`}
        >
          {/* Top Neutral Area with Icon */}
          <div className="bg-[#F8FAFC] py-6 sm:py-8 flex items-center justify-center group-hover:bg-[#F1F5F9] transition-colors">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#8B1122]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8L8 20H14V38H34V20H40L24 8Z" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#FFF1F2" />
                <path d="M19 24C19 21.2386 21.2386 19 24 19C26.1 19 27.8 20.3 28.6 22" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M29 19V22H26" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M29 29C29 31.7614 26.7614 34 24 34C21.9 34 20.2 32.7 19.4 31" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M19 34V31H22" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Bottom Solid Action Bar */}
          <div className="bg-[#8B1122] py-3.5 px-4 text-center">
            <span className="font-sans font-extrabold text-sm sm:text-base text-white tracking-tight">
              Full Replacement
            </span>
          </div>
        </button>

        {/* Repair Card */}
        <button
          type="button"
          onClick={() => handleCardClick('Repair')}
          className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 cursor-pointer flex flex-col items-stretch group text-left ${
            selected === 'Repair'
              ? 'border-[#8B1122] ring-4 ring-[#8B1122]/15 shadow-lg scale-[1.02]'
              : 'border-slate-200 hover:border-[#8B1122] hover:shadow-md active:scale-[0.98]'
          }`}
        >
          {/* Top Neutral Area with Icon */}
          <div className="bg-[#F8FAFC] py-6 sm:py-8 flex items-center justify-center group-hover:bg-[#F1F5F9] transition-colors">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#8B1122]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8L8 20H14V38H34V20H40L24 8Z" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#FFF1F2" />
                <path d="M24 16L22 22L26 25L24 30" stroke="#8B1122" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 15L23 20" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M23 18L32 10L35 13L26 21" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Bottom Solid Action Bar */}
          <div className="bg-[#8B1122] py-3.5 px-4 text-center">
            <span className="font-sans font-extrabold text-sm sm:text-base text-white tracking-tight">
              Roof Repair
            </span>
          </div>
        </button>
      </div>

      {/* Symmetrical Bottom Navigation */}
      <div className="flex items-center justify-center gap-4 max-w-sm mx-auto pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-13 h-13 rounded-2xl border-2 border-slate-300 text-slate-600 hover:text-[#0F172A] hover:border-[#0F172A] transition-colors flex items-center justify-center cursor-pointer shadow-sm shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          className="flex-1 h-13 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-extrabold text-base tracking-wide rounded-2xl shadow-btn transition-all flex items-center justify-center cursor-pointer"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
