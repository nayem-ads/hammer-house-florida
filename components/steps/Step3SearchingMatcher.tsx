import React, { useEffect, useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { CheckCircle2, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="py-5 space-y-6 sm:space-y-7 text-center animate-fade-in">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Main Title & Subtitle */}
      <div className="space-y-1.5 pt-1">
        <h2 className="font-sans text-2xl sm:text-[28px] font-black text-[#0F172A] tracking-[-0.03em] leading-tight">
          Scanning Florida Network...
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-[#475569]">
          <MapPin className="w-4 h-4 text-[#8B1122]" />
          <span>
            Locating DBPR-certified pros in <strong className="text-[#0F172A]">{city}, FL</strong> ({county} County)
          </span>
        </div>
      </div>

      {/* Radial Petal Spinner */}
      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
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

        {/* Centerpiece Icon */}
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-white border-2 border-[#8B1122] shadow-md flex items-center justify-center">
          <ShieldCheck className="w-7 h-7 text-[#8B1122]" />
        </div>
      </div>

      {/* Dynamic Status Checklist */}
      <div className="max-w-md mx-auto bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 text-left space-y-3 shadow-sm">
        {/* Checkpoint 1 */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#0F172A] transition-all duration-300">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
          <span>
            Connecting to DBPR verified contractor network in {city}...
          </span>
        </div>

        {/* Checkpoint 2 */}
        <div
          className={`flex items-center gap-3 text-xs sm:text-sm font-bold transition-all duration-300 ${
            stage >= 2 ? 'opacity-100 text-[#0F172A]' : 'opacity-40 text-slate-400'
          }`}
        >
          {stage >= 2 ? (
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
          ) : (
            <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-300 border-t-[#8B1122] animate-spin shrink-0" />
          )}
          <span>
            Checking 130+ MPH hurricane code & insurance compliance...
          </span>
        </div>

        {/* Checkpoint 3 */}
        <div
          className={`flex items-center gap-3 text-xs sm:text-sm font-bold transition-all duration-300 ${
            stage >= 3 ? 'opacity-100 text-[#0F172A]' : 'opacity-40 text-slate-400'
          }`}
        >
          {stage >= 3 ? (
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
          ) : (
            <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-300 shrink-0" />
          )}
          <span>
            Match Found! 3 top-rated contractors ready with guaranteed bids.
          </span>
        </div>
      </div>
    </div>
  );
}
