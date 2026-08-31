import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, ArrowRight, Bell } from 'lucide-react';

interface Step4Props {
  initialFirstName?: string;
  initialLastName?: string;
  onBack: () => void;
  onNext: (data: { firstName: string; lastName: string; fullName: string }) => void;
}

export function Step4Name({
  initialFirstName = '',
  initialLastName = '',
  onBack,
  onNext,
}: Step4Props) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both your first and last name.');
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    onNext({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName,
    });
  };

  return (
    <div className="animate-fade-in text-center">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Headline */}
      <h2 className="mt-8 mb-6 font-sans text-[24px] sm:text-[28px] font-bold text-[#0F172A] leading-snug">
        Please enter your full name
      </h2>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 text-left">
        <div className="space-y-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="First Name"
            className="w-full h-[52px] text-center text-base text-[#0F172A] bg-white border border-[#CBD5E1] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Last Name"
            className="w-full h-[52px] text-center text-base text-[#0F172A] bg-white border border-[#CBD5E1] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
          />
        </div>

        {/* Bell Notification Banner */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm">
          <Bell className="w-5 h-5 text-[#8B1122] shrink-0 animate-pulse" />
          <span className="font-bold text-sm sm:text-base text-[#0F172A]">
            Your matches are almost ready!
          </span>
        </div>

        {error && (
          <p className="text-xs font-medium text-rose-600 text-center animate-fade-in">
            {error}
          </p>
        )}

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
