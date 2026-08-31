import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { TrustBadges } from '../ui/TrustBadges';
import { isFloridaZip, lookupFloridaZip } from '@/lib/florida-zips';
import { ArrowRight, MapPin, AlertCircle, ArrowLeft } from 'lucide-react';

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
      <div className="space-y-6 sm:space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <HammerHouseLogo size="md" align="center" />
          <div className="pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-3">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Florida Properties Only</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight leading-[1.2]">
              Looks like we're unable to locate that Florida zip code.
            </h1>
            <p className="text-sm sm:text-base text-charcoal-600 max-w-md mx-auto leading-relaxed pt-1">
              Hammer House currently matches licensed roofing pros across all 67 Florida counties. What is the property's Florida zip code?
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="space-y-1.5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal-400">
                <MapPin className="w-5 h-5 text-burgundy-700" />
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                value={zip}
                onChange={handleZipChange}
                placeholder="Enter 5-Digit FL Zip Code (32004 - 34997)"
                className="w-full h-14 pl-12 pr-4 text-center text-lg font-medium text-charcoal-900 bg-white border-2 border-charcoal-200 rounded-xl focus:border-burgundy-700 focus:ring-4 focus:ring-burgundy-700/10 transition-all outline-none placeholder:text-charcoal-400 shadow-sm"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-xs font-medium text-rose-600 text-center animate-fade-in">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || zip.length < 5}
            className="w-full h-14 bg-burgundy-700 hover:bg-burgundy-800 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-bold text-base tracking-wide rounded-xl shadow-lg shadow-burgundy-900/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
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
            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-charcoal-500 hover:text-burgundy-700 transition-colors pt-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go back to home</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Brand Header */}
      <div className="text-center space-y-4">
        <HammerHouseLogo size="md" align="center" />

        <div className="space-y-2 pt-1">
          <h1 className="font-serif text-2xl sm:text-[32px] font-bold text-charcoal-900 tracking-tight leading-[1.18]">
            Protect Your Home & Lower Your Florida Insurance with a Certified Roof.
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 max-w-lg mx-auto leading-relaxed">
            Skip the endless calls. Compare free quotes from Florida DBPR-licensed pros in 60 seconds.
          </p>
        </div>
      </div>

      {/* Main Zip Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div className="space-y-1.5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal-400">
              <MapPin className="w-5 h-5 text-burgundy-700" />
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              value={zip}
              onChange={handleZipChange}
              placeholder="Enter Florida Zip Code (e.g. 33101)"
              className="w-full h-14 pl-12 pr-4 text-center text-lg font-medium text-charcoal-900 bg-white border-2 border-charcoal-200 rounded-xl focus:border-burgundy-700 focus:ring-4 focus:ring-burgundy-700/10 transition-all outline-none placeholder:text-charcoal-400 shadow-sm"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-xs font-medium text-rose-600 text-center animate-fade-in">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || zip.length < 5}
          className="w-full h-14 bg-burgundy-700 hover:bg-burgundy-800 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-white font-sans font-bold text-base tracking-wide rounded-xl shadow-lg shadow-burgundy-900/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>GET FREE CERTIFIED QUOTES</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-[11px] text-charcoal-500 text-center tracking-normal">
          ⚡ 100% Free & No Obligation • Instant Local Contractor Matching
        </p>
      </form>

      {/* Trust Badges */}
      <TrustBadges variant="horizontal" />
    </div>
  );
}
