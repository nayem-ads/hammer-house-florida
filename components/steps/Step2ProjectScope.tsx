import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface Step2Props {
  onBack: () => void;
  onSelect: (serviceType: 'Replacement' | 'Repair' | 'Inspection') => void;
  selectedType?: 'Replacement' | 'Repair' | 'Inspection';
  city: string;
}

export function Step2ProjectScope({ onBack, onSelect, selectedType, city }: Step2Props) {
  const [selected, setSelected] = useState<'Replacement' | 'Repair' | 'Inspection' | undefined>(selectedType);

  const handleCardClick = (type: 'Replacement' | 'Repair' | 'Inspection') => {
    setSelected(type);
    setTimeout(() => {
      onSelect(type);
    }, 180);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Brand Header */}
      <div className="text-center space-y-2.5">
        <HammerHouseLogo size="sm" align="center" />
        <div className="pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1122] bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Step 1 of 4 • Project Details
          </span>
          <h2 className="font-sans text-2xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-tight mt-3">
            What type of roofing service do you need?
          </h2>
          <p className="text-sm font-medium text-[#1E293B] max-w-md mx-auto leading-normal pt-1">
            Matching certified contractors in <span className="font-bold text-[#0F172A]">{city}, FL</span>
          </p>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        {/* Card 1: Replacement */}
        <button
          type="button"
          onClick={() => handleCardClick('Replacement')}
          className={`relative p-5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between group ${
            selected === 'Replacement'
              ? 'border-[#8B1122] bg-red-50/70 shadow-md ring-2 ring-[#8B1122]/20'
              : 'border-slate-300 bg-white hover:border-[#8B1122] hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          {selected === 'Replacement' && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#8B1122] text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          {/* Replacement SVG */}
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <svg className="w-9 h-9 text-[#8B1122]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 6L6 20H12V38H36V20H42L24 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 24C18 20.6863 20.6863 18 24 18C26.5 18 28.5 19.5 29.5 21.5" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M30 18V22H26" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M30 30C30 33.3137 27.3137 36 24 36C21.5 36 19.5 34.5 18.5 32.5" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 36V32H22" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div>
            <h3 className="font-sans font-bold text-base text-[#0F172A] leading-tight">
              Full Replacement
            </h3>
            <p className="text-xs font-semibold text-[#334155] leading-snug mt-1.5">
              New roof, insurance mandate, or storm upgrade
            </p>
          </div>
        </button>

        {/* Card 2: Repair */}
        <button
          type="button"
          onClick={() => handleCardClick('Repair')}
          className={`relative p-5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between group ${
            selected === 'Repair'
              ? 'border-[#8B1122] bg-red-50/70 shadow-md ring-2 ring-[#8B1122]/20'
              : 'border-slate-300 bg-white hover:border-[#8B1122] hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          {selected === 'Repair' && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#8B1122] text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          {/* Repair SVG */}
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <svg className="w-9 h-9 text-[#8B1122]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 6L6 20H12V38H36V20H42L24 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 14L23 20" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M23 18L32 10L35 13L26 21" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div>
            <h3 className="font-sans font-bold text-base text-[#0F172A] leading-tight">
              Roof Repair
            </h3>
            <p className="text-xs font-semibold text-[#334155] leading-snug mt-1.5">
              Active leaks, missing shingles, or flashing fix
            </p>
          </div>
        </button>

        {/* Card 3: Inspection / Storm Assessment */}
        <button
          type="button"
          onClick={() => handleCardClick('Inspection')}
          className={`relative p-5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between group ${
            selected === 'Inspection'
              ? 'border-[#8B1122] bg-red-50/70 shadow-md ring-2 ring-[#8B1122]/20'
              : 'border-slate-300 bg-white hover:border-[#8B1122] hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          {selected === 'Inspection' && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#8B1122] text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          {/* Inspection SVG */}
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <svg className="w-9 h-9 text-[#8B1122]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 6L6 20H12V38H36V20H42L24 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="27" cy="27" r="6" stroke="#8B1122" strokeWidth="2.5" />
              <path d="M31.5 31.5L37 37" stroke="#8B1122" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <div>
            <h3 className="font-sans font-bold text-base text-[#0F172A] leading-tight">
              Inspection / Storm
            </h3>
            <p className="text-xs font-semibold text-[#334155] leading-snug mt-1.5">
              Wind mitigation check, insurance report, or not sure
            </p>
          </div>
        </button>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-slate-300 bg-white text-[#0F172A] hover:text-[#8B1122] hover:border-[#8B1122] transition-colors flex items-center justify-center cursor-pointer shadow-sm"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          className="flex-1 ml-4 h-13 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none text-white font-sans font-bold text-sm sm:text-base tracking-wide rounded-xl shadow-btn transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>NEXT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
