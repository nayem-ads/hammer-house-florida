import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { TopTrustBadges } from '../ui/TopTrustBadges';
import { isFloridaZip, lookupFloridaZip } from '@/lib/florida-zips';
import { ArrowRight, MapPin, AlertCircle, ArrowLeft, ShieldCheck, Wind, Zap } from 'lucide-react';

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

        <div className="space-y-2 pt-1 max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Florida Properties Only</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-[26px] font-black text-[#0F172A] tracking-[-0.03em] leading-tight">
            Looks like we're unable to find that zipcode. What's the property's zipcode?
          </h1>
          <p className="text-sm font-medium text-[#475569]">
            Please enter a 5-digit Florida zip code (32004 - 34997)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
          <div className="space-y-1.5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-5 h-5 text-[#8B1122]" />
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                value={zip}
                onChange={handleZipChange}
                placeholder="Zip Code"
                className="w-full h-15 pl-12 pr-4 text-center text-lg font-bold text-[#0F172A] bg-white border-2 border-slate-200 rounded-2xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-xs font-bold text-rose-600 text-center animate-fade-in">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || zip.length < 5}
            className="w-full h-15 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-extrabold text-base tracking-wider rounded-2xl shadow-btn transition-all flex items-center justify-center cursor-pointer"
          >
            GET RESULTS
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOutOfStateMode(false);
              setError(null);
            }}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-[#475569] hover:text-[#0F172A] transition-colors pt-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go back to start</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in">
      {/* Brand Header & Top Badges */}
      <div className="text-center space-y-3">
        <HammerHouseLogo size="md" align="center" />
        <TopTrustBadges />

        <div className="space-y-2 pt-1">
          <h1 className="font-sans text-[26px] sm:text-[32px] font-black text-[#0F172A] tracking-[-0.03em] leading-[1.2]">
            Let's find you local Florida Roofing Pros
          </h1>
          <p className="text-sm sm:text-base font-medium text-[#475569]">
            Enter the location of your project
          </p>
        </div>
      </div>

      {/* Main Zip Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div className="space-y-1.5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-5 h-5 text-[#8B1122]" />
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              value={zip}
              onChange={handleZipChange}
              placeholder="Zip Code"
              className="w-full h-15 pl-12 pr-4 text-center text-lg font-bold text-[#0F172A] bg-white border-2 border-slate-200 rounded-2xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-xs font-bold text-rose-600 text-center animate-fade-in">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || zip.length < 5}
          className="w-full h-15 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-extrabold text-base tracking-wider rounded-2xl shadow-btn transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>NEXT</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      {/* High-Trust Florida Credentials Strip */}
      <div className="pt-4 border-t border-slate-100 max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
            <ShieldCheck className="w-5 h-5 text-[#8B1122] mx-auto mb-1" />
            <p className="text-xs font-extrabold text-[#0F172A] leading-tight">100% DBPR</p>
            <p className="text-[11px] font-bold text-[#475569] leading-tight mt-0.5">CCC Licensed</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
            <Wind className="w-5 h-5 text-[#8B1122] mx-auto mb-1" />
            <p className="text-xs font-extrabold text-[#0F172A] leading-tight">130+ MPH</p>
            <p className="text-[11px] font-bold text-[#475569] leading-tight mt-0.5">Wind Code</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
            <Zap className="w-5 h-5 text-[#8B1122] mx-auto mb-1" />
            <p className="text-xs font-extrabold text-[#0F172A] leading-tight">60-Sec Match</p>
            <p className="text-[11px] font-bold text-[#475569] leading-tight mt-0.5">Free Quotes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
