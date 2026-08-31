import React, { useEffect, useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { CheckCircle2, MapPin } from 'lucide-react';

interface Step3Props {
  city: string;
  county: string;
  onComplete: () => void;
}

export function Step3SearchingMatcher({ city, county, onComplete }: Step3Props) {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(2);
    }, 750);

    const timer2 = setTimeout(() => {
      setStage(3);
    }, 1600);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="py-4 sm:py-6 space-y-6 sm:space-y-7 text-center animate-fade-in">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Main Title & Subtitle */}
      <div className="space-y-1.5">
        <h2 className="font-sans text-2xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-tight">
          Searching Florida Network...
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-[#1E293B]">
          <MapPin className="w-4 h-4 text-[#8B1122]" />
          <span>
            Matching you with verified pros in <strong className="text-[#0F172A]">{city}, FL</strong> ({county} County)
          </span>
        </div>
      </div>

      {/* High-End Radial Petal Spinner */}
      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
        {/* Animated Radial Petals */}
        <div className="absolute inset-0 animate-spin-slow">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-7 rounded-full bg-[#8B1122] origin-[50%_64px]"
              style={{
                transform: `rotate(${i * 30}deg)`,
                opacity: (i + 1) / 12,
              }}
            />
          ))}
        </div>

        {/* Central Hammer House Centerpiece */}
        <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#8B1122] shadow-md flex items-center justify-center">
          <svg
            className="w-7 h-7 text-[#8B1122]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 8L8 38H18L50 16L82 38H92L50 8Z" fill="#8B1122" />
            <rect x="45" y="47" width="10" height="45" rx="1.5" fill="#8B1122" />
            <path
              d="M32 36C38 31 46 31 53 31C61 31 68 33 71 36L69 44C66 42 61 41 53 41C45 41 39 43 32 44L32 36Z"
              fill="#8B1122"
            />
          </svg>
        </div>
      </div>

      {/* Dynamic Status Checklist */}
      <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2.5 shadow-sm">
        {/* Checkpoint 1 */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0F172A] transition-all duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Locating DBPR-certified roofers in {city}...
          </span>
        </div>

        {/* Checkpoint 2 */}
        <div
          className={`flex items-center gap-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
            stage >= 2 ? 'opacity-100 text-[#0F172A]' : 'opacity-40 text-slate-400'
          }`}
        >
          {stage >= 2 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-[#8B1122] animate-spin shrink-0" />
          )}
          <span>
            Verifying active CCC license & wind mitigation certs...
          </span>
        </div>

        {/* Checkpoint 3 */}
        <div
          className={`flex items-center gap-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
            stage >= 3 ? 'opacity-100 text-[#0F172A]' : 'opacity-40 text-slate-400'
          }`}
        >
          {stage >= 3 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
          )}
          <span>
            Match Found! 3 top-rated contractors ready for quotes.
          </span>
        </div>
      </div>
    </div>
  );
}
