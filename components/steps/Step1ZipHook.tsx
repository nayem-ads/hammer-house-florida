import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { TopTrustBadges } from '../ui/TopTrustBadges';
import { isFloridaZip, lookupFloridaZip } from '@/lib/florida-zips';
import { ArrowRight, ArrowLeft, ShieldCheck, Wind, Zap } from 'lucide-react';

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

    onSuccess({ zipCode: location.zip, city: location.city, state: 'FL', county: location.county });
  };

  if (isOutOfStateMode) {
    return (
      <div className="animate-fade-in text-center">
        <HammerHouseLogo size="md" align="center" />

        <h1 className="mt-10 mb-3 font-sans text-[24px] sm:text-[28px] font-bold text-[#0F172A] leading-snug">
          Looks like we're unable to find that zipcode. What's the property's zipcode?
        </h1>
        <p className="text-sm text-[#64748B] mb-10">
          Please enter a 5-digit Florida zip code (32004 – 34997)
        </p>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <input
            type="text" inputMode="numeric" pattern="[0-9]*" maxLength={5}
            value={zip} onChange={handleZipChange} placeholder="Zip Code"
            className="w-full h-[52px] text-center text-base text-[#0F172A] bg-white border border-[#CBD5E1] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />
          {error && <p className="mt-2 text-xs font-medium text-rose-600">{error}</p>}

          <button type="submit" disabled={isSubmitting || zip.length < 5}
            className="w-full h-[52px] mt-5 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-40 text-white font-sans font-bold text-[15px] tracking-wide rounded-xl transition-all flex items-center justify-center cursor-pointer">
            GET RESULTS
          </button>

          <button type="button" onClick={() => { setIsOutOfStateMode(false); setError(null); }}
            className="mt-4 text-sm text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer">
            ← Go back
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fade-in text-center">
      {/* Logo */}
      <HammerHouseLogo size="md" align="center" />

      {/* Trust Badges */}
      <div className="mt-4 mb-8">
        <TopTrustBadges />
      </div>

      {/* Headline */}
      <h1 className="font-sans text-[26px] sm:text-[30px] font-bold text-[#0F172A] leading-snug mb-2">
        Let's find you local Florida Roofing Pros
      </h1>
      <p className="text-[15px] text-[#64748B] mb-10">
        Enter the location of your project
      </p>

      {/* Zip Form */}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <input
          type="text" inputMode="numeric" pattern="[0-9]*" maxLength={5}
          value={zip} onChange={handleZipChange} placeholder="Zip Code"
          className="w-full h-[52px] text-center text-base text-[#0F172A] bg-white border border-[#CBD5E1] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
          autoFocus
        />
        {error && <p className="mt-2 text-xs font-medium text-rose-600">{error}</p>}

        <button type="submit" disabled={isSubmitting || zip.length < 5}
          className="w-full h-[52px] mt-5 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-40 text-white font-sans font-bold text-[15px] tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
          <span>NEXT</span>
          <ArrowRight className="w-4.5 h-4.5" />
        </button>
      </form>

      {/* Credentials */}
      <div className="mt-10 pt-6 border-t border-slate-100">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="py-3">
            <ShieldCheck className="w-5 h-5 text-[#8B1122] mx-auto mb-1.5" />
            <p className="text-[11px] font-bold text-[#0F172A] leading-tight">100% DBPR</p>
            <p className="text-[10px] text-[#64748B] leading-tight mt-0.5">CCC Licensed</p>
          </div>
          <div className="py-3">
            <Wind className="w-5 h-5 text-[#8B1122] mx-auto mb-1.5" />
            <p className="text-[11px] font-bold text-[#0F172A] leading-tight">130+ MPH</p>
            <p className="text-[10px] text-[#64748B] leading-tight mt-0.5">Wind Code</p>
          </div>
          <div className="py-3">
            <Zap className="w-5 h-5 text-[#8B1122] mx-auto mb-1.5" />
            <p className="text-[11px] font-bold text-[#0F172A] leading-tight">60-Sec Match</p>
            <p className="text-[10px] text-[#64748B] leading-tight mt-0.5">Free Quotes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
