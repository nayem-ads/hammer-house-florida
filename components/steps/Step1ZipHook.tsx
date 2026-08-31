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
  const [isOutOfState, setIsOutOfState] = useState(false);

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

    if (!isFloridaZip(zip)) {
      setIsOutOfState(true);
      setError('We currently serve Florida properties only.');
      return;
    }

    const location = lookupFloridaZip(zip);
    if (!location) {
      setError('Unable to verify this zip code. Please try again.');
      return;
    }

    onSuccess({ zipCode: location.zip, city: location.city, state: 'FL', county: location.county });
  };

  /* Out-of-state fallback */
  if (isOutOfState) {
    return (
      <div className="text-center animate-fade-in">
        <HammerHouseLogo size="md" align="center" />

        <h1 className="mt-10 mb-3 text-[26px] sm:text-[30px] font-bold text-[#1E3A3A] leading-tight italic">
          Looks like we're unable to find that zipcode. What's the property's zipcode?
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto space-y-5">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            value={zip}
            onChange={handleZipChange}
            placeholder="Zip Code"
            className="w-full h-14 text-center text-base font-normal text-[#1E3A3A] bg-white border border-[#A3B8B0] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />

          {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={zip.length < 5}
            className="w-full h-14 bg-[#F5C882] hover:bg-[#EDB960] active:scale-[0.98] disabled:opacity-40 text-white font-sans font-bold text-base tracking-widest rounded-xl transition-all flex items-center justify-center cursor-pointer"
          >
            GET RESULTS
          </button>

          <button type="button" onClick={() => { setIsOutOfState(false); setError(null); }} className="text-sm font-medium text-[#94A3B8] hover:text-[#1E3A3A] transition-colors cursor-pointer">
            ← Go back
          </button>
        </form>
      </div>
    );
  }

  /* Main zip entry */
  return (
    <div className="text-center animate-fade-in">
      <HammerHouseLogo size="md" align="center" />

      <div className="mt-5 mb-2">
        <TopTrustBadges />
      </div>

      <h1 className="mt-8 mb-2 text-[26px] sm:text-[30px] font-bold text-[#1E3A3A] leading-tight italic">
        Let's find you local Florida Roofing Pros
      </h1>

      <p className="text-base font-normal text-[#6B7F7F] mb-10">
        Enter the location of your project
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={5}
          value={zip}
          onChange={handleZipChange}
          placeholder="Zip Code"
          className="w-full h-14 text-center text-base font-normal text-[#1E3A3A] bg-white border border-[#A3B8B0] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
          autoFocus
        />

        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={zip.length < 5}
          className="w-full h-14 bg-[#F5C882] hover:bg-[#EDB960] active:scale-[0.98] disabled:opacity-40 text-white font-sans font-bold text-base tracking-widest rounded-xl transition-all flex items-center justify-center cursor-pointer"
        >
          NEXT
        </button>
      </form>
    </div>
  );
}
