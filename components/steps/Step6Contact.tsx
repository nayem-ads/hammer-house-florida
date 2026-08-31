import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { formatPhoneNumber, isValidUSPhone } from '@/lib/validations';
import { ArrowLeft, Check, Loader2, Lock } from 'lucide-react';

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
    <div className="animate-fade-in text-center">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Green Circular Checkmark Icon */}
      <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mt-6 mb-3 shadow-sm">
        <Check className="w-7 h-7 stroke-[3]" />
      </div>

      {/* Headlines */}
      <h2 className="font-sans text-[22px] sm:text-[26px] font-bold text-[#0F172A] leading-snug mb-1">
        We have matching Pros in {city}, FL!
      </h2>
      <p className="text-sm font-medium text-[#64748B] mb-6">
        Where should we send your matches?
      </p>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 text-left">
        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="w-full h-[52px] text-center text-base text-[#0F172A] bg-white border border-[#CBD5E1] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />

          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Cell Number"
            className="w-full h-[52px] text-center text-base text-[#0F172A] bg-white border border-[#CBD5E1] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
          />
        </div>

        {/* Micro-Trust Note */}
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#64748B] pt-0.5">
          <Lock className="w-3.5 h-3.5 text-[#8B1122]" />
          <span>Zero-spam guarantee. Your information is protected.</span>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[11px] text-[#64748B] font-normal leading-relaxed text-center pt-1 px-1">
          By clicking “Get Results,” I am providing my electronic signature and expressed written consent to permit <strong>Hammer House</strong> and up to <strong>four home improvement companies</strong> to contact me at the number provided for marketing purposes, including the use of automated technology and text messages. I acknowledge my consent is not required to obtain any good or service.{' '}
          <a href="#terms" className="underline hover:text-[#0F172A] font-medium">Terms of Service</a> and <a href="#privacy" className="underline hover:text-[#0F172A] font-medium">Privacy Policy</a>
        </p>

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
            disabled={isSubmitting}
            className="w-11 h-11 rounded-full border border-[#CBD5E1] text-[#94A3B8] hover:text-[#0F172A] hover:border-[#0F172A] transition-colors flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-50"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-[52px] bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none text-white font-sans font-bold text-[15px] tracking-wide rounded-xl transition-all flex items-center justify-center cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              <span>GET RESULTS</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
