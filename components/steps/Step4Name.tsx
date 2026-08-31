import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, ArrowRight, Bell } from 'lucide-react';

interface Step4Props {
  initialFullName?: string;
  onBack: () => void;
  onNext: (data: { fullName: string }) => void;
}

export function Step4Name({
  initialFullName = '',
  onBack,
  onNext,
}: Step4Props) {
  const [fullName, setFullName] = useState(initialFullName);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim().replace(/\s+/g, ' ');
    if (cleanName.length < 3 || cleanName.split(' ').length < 2) {
      setError('Please enter your first and last name.');
      return;
    }

    onNext({
      fullName: cleanName,
    });
  };

  return (
    <div className="animate-fade-in text-center">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Headline */}
      <h2 className="mt-8 mb-2 font-sans text-[24px] sm:text-[28px] font-bold text-[#0F172A] leading-snug">
        Please enter your full name
      </h2>
      <p className="text-sm font-medium text-[#64748B] mb-8">
        We'll prepare your personalized contractor estimate package
      </p>

      {/* Single Full Name Form Field */}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 text-left">
        <div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Full Name"
            className="w-full h-[52px] text-center text-base font-semibold text-[#0F172A] bg-white border border-[#CBD5E1] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />
          {error && (
            <p className="mt-1.5 text-xs font-medium text-rose-600 text-center animate-fade-in">
              {error}
            </p>
          )}
        </div>

        {/* Bell Notification Banner */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm">
          <Bell className="w-5 h-5 text-[#8B1122] shrink-0 animate-pulse" />
          <span className="font-bold text-sm sm:text-base text-[#0F172A]">
            Your matches are almost ready!
          </span>
        </div>

        {/* Symmetrical Bottom Controls */}
        <div className="flex items-center gap-4 pt-3">
          <button
            type="button"
            onClick={onBack}
            className="w-11 h-11 rounded-full border border-[#CBD5E1] text-[#94A3B8] hover:text-[#0F172A] hover:border-[#0F172A] transition-colors flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>

          <button
            type="submit"
            className="flex-1 h-[52px] bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] text-white font-sans font-bold text-[15px] tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>NEXT</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
