import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { TopTrustBadges } from '../ui/TopTrustBadges';
import { isFloridaZip, lookupFloridaZip } from '@/lib/florida-zips';

interface Step1Props {
  onSuccess: (data: { zipCode: string; city: string; state: string; county: string }) => void;
  initialZip?: string;
}

export function Step1ZipHook({ onSuccess, initialZip = '' }: Step1Props) {
  const [zip, setZip] = useState(initialZip);
  const [error, setError] = useState<string | null>(null);
  const [isOutOfStateMode, setIsOutOfStateMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZip(value);
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length !== 5) {
      setError('Please enter a valid 5-digit zip code.');
      return;
    }

    setIsSubmitting(true);

    if (!isFloridaZip(zip)) {
      setIsSubmitting(false);
      setIsOutOfStateMode(true);
      setError('We currently serve Florida properties. Please enter a valid Florida zip code.');
      return;
    }

    const location = lookupFloridaZip(zip);
    if (!location) {
      setIsSubmitting(false);
      setError('Unable to verify this Florida zip code. Please double-check.');
      return;
    }

    onSuccess({
      zipCode: location.zip,
      city: location.city,
      state: 'FL',
      county: location.county,
    });
  };

  if (isOutOfStateMode) {
    return (
      <div className="space-y-6 animate-fade-in text-center">
        <HammerHouseLogo size="md" align="center" />

        <div className="space-y-2 pt-2">
          <h1 className="font-sans text-2xl sm:text-[26px] font-bold text-[#1E3944] tracking-tight leading-snug">
            Looks like we're unable to find that zipcode. What's the property's zipcode?
          </h1>
          <p className="text-sm text-[#475569] font-medium max-w-sm mx-auto">
            Please enter a 5-digit Florida zip code (32004 - 34997)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
          <div className="space-y-1.5">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              value={zip}
              onChange={handleZipChange}
              placeholder="Zip Code"
              className="w-full h-14 text-center text-lg font-semibold text-[#0F172A] bg-white border-2 border-[#8BA3A8] rounded-xl focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all outline-none placeholder:text-[#94A3B8]"
              autoFocus
            />
            {error && (
              <p className="text-xs font-bold text-rose-600 text-center animate-fade-in">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || zip.length < 5}
            className="w-full h-14 bg-[#FBBF77] hover:bg-[#F5A647] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-extrabold text-base tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer"
          >
            GET RESULTS
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOutOfStateMode(false);
              setError(null);
            }}
            className="text-xs font-bold text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            ← Back to start
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Brand Header & Top Badges */}
      <div className="text-center space-y-3">
        <HammerHouseLogo size="md" align="center" />
        <TopTrustBadges />

        <div className="space-y-1.5 pt-1">
          <h1 className="font-sans text-[26px] sm:text-[30px] font-bold text-[#1E3944] tracking-tight leading-[1.2]">
            Let's find you local Florida Roofing Pros
          </h1>
          <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed">
            Enter the location of your project
          </p>
        </div>
      </div>

      {/* Main Zip Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div className="space-y-1.5">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            value={zip}
            onChange={handleZipChange}
            placeholder="Zip Code"
            className="w-full h-14 text-center text-lg font-semibold text-[#0F172A] bg-white border-2 border-[#8BA3A8] rounded-xl focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />
          {error && (
            <p className="text-xs font-bold text-rose-600 text-center animate-fade-in">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || zip.length < 5}
          className="w-full h-14 bg-[#FBBF77] hover:bg-[#F5A647] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-extrabold text-base tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer"
        >
          NEXT
        </button>
      </form>
    </div>
  );
}
