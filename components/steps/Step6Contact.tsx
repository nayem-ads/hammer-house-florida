import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { formatPhoneNumber, isValidUSPhone } from '@/lib/validations';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';

interface Step6Props {
  city: string;
  initialEmail?: string;
  initialPhone?: string;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (data: { email: string; phone: string; tcpaConsent: boolean }) => void;
}

export function Step6Contact({
  city,
  initialEmail = '',
  initialPhone = '',
  isSubmitting,
  onBack,
  onSubmit,
}: Step6Props) {
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (error) setError(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isValidUSPhone(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    onSubmit({
      email: cleanEmail,
      phone,
      tcpaConsent: true,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in text-center">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Green Circular Checkmark Icon */}
      <div className="w-14 h-14 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto shadow-sm">
        <Check className="w-8 h-8 stroke-[3]" />
      </div>

      {/* Headlines */}
      <div className="space-y-1.5 pt-1 max-w-sm mx-auto">
        <h2 className="font-sans text-[22px] sm:text-[26px] font-bold text-[#1E3944] tracking-tight leading-snug">
          We have matching Pros in {city}, FL!
        </h2>
        <p className="text-sm sm:text-base font-normal text-[#64748B]">
          Where should we send your matches?
        </p>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto text-left">
        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="w-full h-14 px-5 text-base font-semibold text-[#0F172A] bg-white border-2 border-[#8BA3A8] rounded-xl focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />

          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Cell Number"
            className="w-full h-14 px-5 text-base font-semibold text-[#0F172A] bg-white border-2 border-[#8BA3A8] rounded-xl focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all outline-none placeholder:text-[#94A3B8]"
          />
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[11px] text-[#64748B] leading-relaxed text-center pt-1 px-1">
          By clicking “Get Results,” I am providing my electronic signature and expressed written consent to permit <strong>Hammer House</strong> and up to <strong>four home improvement companies</strong> to contact me at the number provided for marketing purposes, including the use of automated technology and text messages. I acknowledge my consent is not required to obtain any good or service.{' '}
          <a href="#terms" className="underline hover:text-[#1E3944]">Terms of Service</a> and <a href="#privacy" className="underline hover:text-[#1E3944]">Privacy Policy</a>
        </p>

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
            disabled={isSubmitting}
            className="w-12 h-12 rounded-full border-2 border-[#8BA3A8] text-[#8BA3A8] hover:text-[#1E3944] hover:border-[#1E3944] transition-colors flex items-center justify-center cursor-pointer shadow-sm shrink-0 disabled:opacity-50"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-14 bg-[#FBBF77] hover:bg-[#F5A647] active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none text-white font-sans font-extrabold text-base tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            ) : (
              <span>GET RESULTS</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
