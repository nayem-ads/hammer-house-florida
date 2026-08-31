import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft } from 'lucide-react';

interface Step4Props {
  initialFirstName?: string;
  initialLastName?: string;
  onBack: () => void;
  onNext: (data: { firstName: string; lastName: string; fullName: string }) => void;
}

export function Step4Name({ initialFirstName = '', initialLastName = '', onBack, onNext }: Step4Props) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both your first and last name.');
      return;
    }
    onNext({ firstName: firstName.trim(), lastName: lastName.trim(), fullName: `${firstName.trim()} ${lastName.trim()}` });
  };

  return (
    <div className="text-center animate-fade-in">
      <HammerHouseLogo size="md" align="center" />

      <h2 className="mt-10 mb-8 text-[24px] sm:text-[28px] font-bold text-[#1E3A3A] leading-tight italic">
        Please enter your full name
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value); if (error) setError(null); }}
          placeholder="First Name"
          className="w-full h-14 text-center text-base font-normal text-[#1E3A3A] bg-white border border-[#A3B8B0] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
          autoFocus
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => { setLastName(e.target.value); if (error) setError(null); }}
          placeholder="Last Name"
          className="w-full h-14 text-center text-base font-normal text-[#1E3A3A] bg-white border border-[#A3B8B0] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
        />

        {/* Notification banner */}
        <div className="bg-[#F1F5F3] rounded-xl p-5 flex items-center justify-center gap-3 mt-4">
          <svg className="w-7 h-7 text-[#7EC8D9] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <path d="M8 2s.5 1 4 1 4-1 4-1" />
          </svg>
          <span className="font-bold text-sm sm:text-base text-[#1E3A3A]">
            Your matches are almost ready!
          </span>
        </div>

        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

        {/* Navigation */}
        <div className="flex items-center gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="w-12 h-12 rounded-full border border-[#A3B8B0] text-[#A3B8B0] hover:text-[#1E3A3A] hover:border-[#1E3A3A] transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="flex-1 h-14 bg-[#F5C882] hover:bg-[#EDB960] active:scale-[0.98] text-white font-sans font-bold text-base tracking-widest rounded-xl transition-all flex items-center justify-center cursor-pointer"
          >
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
