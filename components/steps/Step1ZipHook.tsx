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
      setError('Please enter a complete 5-digit zip code.');
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
        
        <div className="pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold mb-3">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Florida Properties Only</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-[-0.03em] leading-tight">
            Looks like we're unable to find that zip code in Florida.
          </h1>
          <p className="text-sm font-medium text-[#1E293B] max-w-md mx-auto leading-relaxed pt-2">
            What is the property's Florida zip code?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="space-y-1.5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <MapPin className="w-5 h-5 text-[#8B1122]" />
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                value={zip}
                onChange={handleZipChange}
                placeholder="Enter 5-Digit FL Zip Code"
                className="w-full h-14 pl-12 pr-4 text-center text-lg font-bold text-[#0F172A] bg-white border-2 border-slate-300 rounded-xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
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
            className="w-full h-14 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-bold text-base tracking-wide rounded-xl shadow-btn transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>GET RESULTS</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOutOfStateMode(false);
              setError(null);
            }}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-[#8B1122] transition-colors pt-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go back to start</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <HammerHouseLogo size="md" align="center" />
        
        {/* Google & Trustpilot 5-Star Badges on Top */}
        <TopTrustBadges />

        <div className="space-y-2.5 pt-1">
          <h1 className="font-sans text-[26px] sm:text-[33px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.18]">
            Protect Your Home & Lower Your Florida Insurance with a Certified Roof.
          </h1>
          <p className="text-sm sm:text-[15px] font-medium text-[#1E293B] max-w-lg mx-auto leading-normal">
            Skip the endless calls. Compare free quotes from Florida DBPR-licensed pros in 60 seconds.
          </p>
        </div>
      </div>

      {/* Main Zip Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div className="space-y-1.5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <MapPin className="w-5 h-5 text-[#8B1122]" />
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              value={zip}
              onChange={handleZipChange}
              placeholder="Enter Florida Zip Code (e.g. 33101)"
              className="w-full h-14 pl-12 pr-4 text-center text-lg font-bold text-[#0F172A] bg-white border-2 border-slate-300 rounded-xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
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
          className="w-full h-14 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-bold text-base tracking-wide rounded-xl shadow-btn transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>GET FREE CERTIFIED QUOTES</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-xs font-semibold text-[#0F172A] text-center tracking-tight flex items-center justify-center gap-1.5 pt-0.5">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>100% Free & No Obligation • Instant Local Contractor Matching</span>
        </p>
      </form>

      {/* Redesigned High-Trust Florida Credentials Strip (Bold, High Contrast, Non-Faded) */}
      <div className="pt-4 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-5 h-5 text-[#8B1122] mx-auto mb-1" />
            <p className="text-xs font-extrabold text-[#0F172A] leading-tight">100% DBPR</p>
            <p className="text-[11px] font-bold text-[#334155] leading-tight mt-0.5">CCC Licensed</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <Wind className="w-5 h-5 text-[#8B1122] mx-auto mb-1" />
            <p className="text-xs font-extrabold text-[#0F172A] leading-tight">130+ MPH</p>
            <p className="text-[11px] font-bold text-[#334155] leading-tight mt-0.5">Wind Code</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <Zap className="w-5 h-5 text-[#8B1122] mx-auto mb-1" />
            <p className="text-xs font-extrabold text-[#0F172A] leading-tight">60-Sec Match</p>
            <p className="text-[11px] font-bold text-[#334155] leading-tight mt-0.5">No Phone Tag</p>
          </div>
        </div>
      </div>
    </div>
  );
}
