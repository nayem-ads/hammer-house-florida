import React, { useEffect } from 'react';
import { HammerHouseLogo } from '../Logo';

interface Step3Props {
  city: string;
  county: string;
  onComplete: () => void;
}

export function Step3SearchingMatcher({ city, onComplete }: Step3Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="py-6 space-y-6 sm:space-y-8 text-center animate-fade-in">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Main Title & Subtitle */}
      <div className="space-y-2 pt-2">
        <h2 className="font-sans text-2xl sm:text-[28px] font-bold text-[#1E3944] tracking-tight">
          Searching...
        </h2>
        <p className="text-sm sm:text-base font-normal text-[#64748B]">
          Matching you with pros in {city}, FL.
        </p>
      </div>

      {/* Cost Guide Style Radial Petal Spinner with Dollar Magnifying Glass */}
      <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
        {/* 12 Radial Cyan Petals */}
        <div className="absolute inset-0 animate-spin-slow">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-8 rounded-full bg-[#7DD3FC] origin-[50%_72px]"
              style={{
                transform: `rotate(${i * 30}deg)`,
                opacity: (i + 1) / 12,
              }}
            />
          ))}
        </div>

        {/* Centerpiece: Dollar Magnifying Glass Icon */}
        <div className="relative z-10 w-12 h-12 rounded-full bg-white flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#0284C7] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            $
          </div>
        </div>
      </div>
    </div>
  );
}
