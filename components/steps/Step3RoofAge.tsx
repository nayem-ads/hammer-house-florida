import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface Step3RoofAgeProps {
  onBack: () => void;
  onSelect: (roofAge: string) => void;
  selectedAge?: string;
  city: string;
}

export function Step3RoofAge({ onBack, onSelect, selectedAge, city }: Step3RoofAgeProps) {
  const [selected, setSelected] = useState<string | undefined>(selectedAge);

  const handleCardClick = (age: string) => {
    setSelected(age);
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
        How old is your roof?
      </h2>
      <p className="text-sm font-medium text-[#64748B] mb-8">
        Helps our contractors determine warranty eligibility in <strong className="text-[#0F172A]">{city}, FL</strong>
      </p>

      {/* 3-Card Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
        {/* Option 1: Less than 10 years */}
        <button
          type="button"
          onClick={() => handleCardClick('Less than 10 years')}
          className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-150 cursor-pointer flex flex-col items-center group ${
            selected === 'Less than 10 years'
              ? 'border-[#8B1122] bg-[#FFF5F6] shadow-md ring-2 ring-[#8B1122]/15'
              : 'border-slate-200 bg-white hover:border-[#8B1122]/50 hover:shadow-sm'
          }`}
        >
          {selected === 'Less than 10 years' && (
            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#8B1122] text-white flex items-center justify-center shadow-sm">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div className="py-6 px-3 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#EEF7FA] flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-9 h-9 text-[#0284C7]" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="10" width="32" height="30" rx="3" stroke="#7EC8D9" strokeWidth="2.5" fill="#F0F9FB" />
                <path d="M8 18H40" stroke="#7EC8D9" strokeWidth="2.5" />
                <path d="M16 6V12" stroke="#7EC8D9" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M32 6V12" stroke="#7EC8D9" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M18 28L22 32L30 24" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className={`w-full py-3 px-2 text-center transition-colors ${selected === 'Less than 10 years' ? 'bg-[#8B1122]' : 'bg-[#F1F5F9]'}`}>
            <span className={`text-xs sm:text-sm font-bold ${selected === 'Less than 10 years' ? 'text-white' : 'text-[#0F172A]'}`}>
              Less than 10 years
            </span>
          </div>
        </button>

        {/* Option 2: More than 10 years */}
        <button
          type="button"
          onClick={() => handleCardClick('More than 10 years')}
          className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-150 cursor-pointer flex flex-col items-center group ${
            selected === 'More than 10 years'
              ? 'border-[#8B1122] bg-[#FFF5F6] shadow-md ring-2 ring-[#8B1122]/15'
              : 'border-slate-200 bg-white hover:border-[#8B1122]/50 hover:shadow-sm'
          }`}
        >
          {selected === 'More than 10 years' && (
            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#8B1122] text-white flex items-center justify-center shadow-sm">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div className="py-6 px-3 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#EEF7FA] flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-9 h-9 text-[#0284C7]" viewBox="0 0 48 48" fill="none">
                <path d="M24 6L6 20H12V38H36V20H42L24 6Z" stroke="#7EC8D9" strokeWidth="2.5" fill="#F0F9FB" />
                <circle cx="24" cy="27" r="7" stroke="#7EC8D9" strokeWidth="2" />
                <path d="M24 23V27L27 29" stroke="#8B1122" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className={`w-full py-3 px-2 text-center transition-colors ${selected === 'More than 10 years' ? 'bg-[#8B1122]' : 'bg-[#F1F5F9]'}`}>
            <span className={`text-xs sm:text-sm font-bold ${selected === 'More than 10 years' ? 'text-white' : 'text-[#0F172A]'}`}>
              More than 10 years
            </span>
          </div>
        </button>

        {/* Option 3: Not sure */}
        <button
          type="button"
          onClick={() => handleCardClick('Not sure')}
          className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-150 cursor-pointer flex flex-col items-center group ${
            selected === 'Not sure'
              ? 'border-[#8B1122] bg-[#FFF5F6] shadow-md ring-2 ring-[#8B1122]/15'
              : 'border-slate-200 bg-white hover:border-[#8B1122]/50 hover:shadow-sm'
          }`}
        >
          {selected === 'Not sure' && (
            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#8B1122] text-white flex items-center justify-center shadow-sm">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div className="py-6 px-3 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#EEF7FA] flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-9 h-9 text-[#0284C7]" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="16" stroke="#7EC8D9" strokeWidth="2.5" fill="#F0F9FB" />
                <path d="M20 18C20 15.7909 21.7909 14 24 14C26.2091 14 28 15.7909 28 18C28 19.8 26.8 21.2 25.2 21.7C24.4 22 24 22.8 24 23.5V25" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="24" cy="31" r="1.5" fill="#8B1122" />
              </svg>
            </div>
          </div>

          <div className={`w-full py-3 px-2 text-center transition-colors ${selected === 'Not sure' ? 'bg-[#8B1122]' : 'bg-[#F1F5F9]'}`}>
            <span className={`text-xs sm:text-sm font-bold ${selected === 'Not sure' ? 'text-white' : 'text-[#0F172A]'}`}>
              Not sure
            </span>
          </div>
        </button>
      </div>

      {/* Navigation Controls */}
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
