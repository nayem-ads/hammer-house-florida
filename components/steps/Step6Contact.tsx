import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { formatPhoneNumber, isValidUSPhone } from '@/lib/validations';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Step6Props {
  city: string;
  initialEmail?: string;
  initialPhone?: string;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (data: { email: string; phone: string; tcpaConsent: boolean }) => void;
}

export function Step6Contact({ city, initialEmail = '', initialPhone = '', isSubmitting, onBack, onSubmit }: Step6Props) {
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) { setError('Please enter a valid email address.'); return; }
    if (!isValidUSPhone(phone)) { setError('Please enter a valid 10-digit phone number.'); return; }
    onSubmit({ email: cleanEmail, phone, tcpaConsent: true });
  };

  return (
    <div className="text-center animate-fade-in">
      <HammerHouseLogo size="md" align="center" />

      {/* Green checkmark circle */}
      <div className="w-14 h-14 rounded-full bg-[#22C55E] text-white flex items-center justify-center mx-auto mt-8 mb-4">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="mb-2 text-[24px] sm:text-[28px] font-bold text-[#1E3A3A] leading-tight italic">
        We have matching Pros in {city}, FL!
      </h2>

      <p className="text-base font-normal text-[#6B7F7F] mb-8">
        Where should we send your matches?
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
          placeholder="Email"
          className="w-full h-14 text-center text-base font-normal text-[#1E3A3A] bg-white border border-[#A3B8B0] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
          autoFocus
        />

        <input
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Cell Number"
          className="w-full h-14 text-center text-base font-normal text-[#1E3A3A] bg-white border border-[#A3B8B0] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
        />

        {/* TCPA legal */}
        <p className="text-[12px] text-[#6B7F7F] leading-relaxed text-center pt-2 px-2">
          By clicking "Get Results," I am providing my electronic signature and expressed written consent to permit <strong className="text-[#1E3A3A]">Hammer House</strong> and <strong className="text-[#1E3A3A]">up to <u>four home improvement companies</u></strong> to contact me at the number provided for marketing purposes, including the use of automated technology and text messages. I acknowledge my consent is not required to obtain any good or service.{' '}
          <a href="#terms" className="underline text-[#1E3A3A] hover:text-[#8B1122]">Terms of Service</a> and <a href="#privacy" className="underline text-[#1E3A3A] hover:text-[#8B1122]">Privacy Policy</a>
        </p>

        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

        {/* Navigation */}
        <div className="flex items-center gap-4 pt-6">
          <button type="button" onClick={onBack} disabled={isSubmitting} className="w-12 h-12 rounded-full border border-[#A3B8B0] text-[#A3B8B0] hover:text-[#1E3A3A] hover:border-[#1E3A3A] transition-colors flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-50">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-[#F5C882] hover:bg-[#EDB960] active:scale-[0.98] disabled:opacity-70 text-white font-sans font-bold text-base tracking-widest rounded-xl transition-all flex items-center justify-center cursor-pointer">
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'GET RESULTS'}
          </button>
        </div>
      </form>
    </div>
  );
}
