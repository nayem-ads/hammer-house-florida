import React, { useEffect } from 'react';
import { HammerHouseLogo } from '../Logo';

interface Step3Props {
  city: string;
  county: string;
  onComplete: () => void;
}

export function Step3SearchingMatcher({ city, onComplete }: Step3Props) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="py-10 text-center animate-fade-in">
      <HammerHouseLogo size="md" align="center" />

      <h2 className="mt-12 mb-3 text-[26px] sm:text-[30px] font-bold text-[#1E3A3A] leading-tight italic">
        Searching...
      </h2>

      <p className="text-base font-normal text-[#6B7F7F] mb-12">
        Matching you with pros in {city}, FL.
      </p>

      {/* Radial petal spinner */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 animate-spin-slow">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-6 rounded-full bg-[#B8E0E8] origin-[50%_48px]"
              style={{ transform: `rotate(${i * 36}deg)`, opacity: (i + 1) / 10 }}
            />
          ))}
        </div>

        {/* Center dollar icon */}
        <div className="relative z-10 w-10 h-10 rounded-full bg-[#7EC8D9] text-white flex items-center justify-center text-sm font-bold shadow-sm">
          $
        </div>
      </div>
    </div>
  );
}
