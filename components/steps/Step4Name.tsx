import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, Bell, User } from 'lucide-react';

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
        <h2 className="font-sans text-2xl sm:text-[28px] font-black text-[#0F172A] tracking-[-0.03em] leading-tight">
          Please enter your full name
        </h2>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto text-left">
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="First Name"
              className="w-full h-15 pl-12 pr-4 text-base font-semibold text-[#0F172A] bg-white border-2 border-slate-200 rounded-2xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              autoFocus
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Last Name"
              className="w-full h-15 pl-12 pr-4 text-base font-semibold text-[#0F172A] bg-white border-2 border-slate-200 rounded-2xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* Bell Notification Banner */}
        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 flex items-center justify-center gap-3.5 shadow-sm">
          <Bell className="w-6 h-6 text-[#8B1122] shrink-0" />
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
            className="w-13 h-13 rounded-2xl border-2 border-slate-300 text-slate-600 hover:text-[#0F172A] hover:border-[#0F172A] transition-colors flex items-center justify-center cursor-pointer shadow-sm shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="flex-1 h-13 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] text-white font-sans font-extrabold text-base tracking-wider rounded-2xl shadow-btn transition-all flex items-center justify-center cursor-pointer"
          >
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
