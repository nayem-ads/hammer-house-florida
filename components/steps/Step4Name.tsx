import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, Bell } from 'lucide-react';

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
    <div className="space-y-6 sm:space-y-7 animate-fade-in text-center">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Headline */}
      <div className="space-y-2 pt-1 max-w-sm mx-auto">
        <h2 className="font-sans text-[22px] sm:text-[26px] font-bold text-[#1E3944] tracking-tight leading-snug">
          Please enter your full name
        </h2>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto text-left">
        <div className="space-y-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="First Name"
            className="w-full h-14 px-5 text-base font-semibold text-[#0F172A] bg-white border-2 border-[#8BA3A8] rounded-xl focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all outline-none placeholder:text-[#94A3B8]"
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
            className="w-full h-14 px-5 text-base font-semibold text-[#0F172A] bg-white border-2 border-[#8BA3A8] rounded-xl focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all outline-none placeholder:text-[#94A3B8]"
          />
        </div>

        {/* Bell Notification Banner */}
        <div className="bg-[#F1F5F9] rounded-2xl p-4 sm:p-5 flex items-center justify-center gap-3.5 shadow-sm">
          <Bell className="w-6 h-6 text-[#0284C7] shrink-0" />
          <span className="font-bold text-sm sm:text-base text-[#0F172A]">
            Your matches are almost ready!
          </span>
        </div>

        {error && (
          <p className="text-xs font-bold text-rose-600 text-center animate-fade-in">
            {error}
          </p>
        )}

        {/* Symmetrical Bottom Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-12 h-12 rounded-full border-2 border-[#8BA3A8] text-[#8BA3A8] hover:text-[#1E3944] hover:border-[#1E3944] transition-colors flex items-center justify-center cursor-pointer shadow-sm shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="flex-1 h-14 bg-[#FBBF77] hover:bg-[#F5A647] active:scale-[0.98] text-white font-sans font-extrabold text-base tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer"
          >
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
