import React, { useState } from 'react';
import { HammerHouseLogo } from '../Logo';
import { formatPhoneNumber, isValidUSPhone, suggestEmailDomainCorrection } from '@/lib/validations';
import { ArrowLeft, Mail, Phone, ShieldCheck, Lock, Loader2, ArrowRight } from 'lucide-react';

interface Step5Props {
  city: string;
  initialEmail?: string;
  initialPhone?: string;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (data: { email: string; phone: string; tcpaConsent: boolean }) => void;
}

export function Step5ContactTcpa({
  city,
  initialEmail = '',
  initialPhone = '',
  isSubmitting,
  onBack,
  onSubmit,
}: Step5Props) {
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [typoSuggestion, setTypoSuggestion] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));

    const suggestion = suggestEmailDomainCorrection(val);
    setTypoSuggestion(suggestion);
  };

  const applyTypoSuggestion = () => {
    if (typoSuggestion) {
      setEmail(typoSuggestion);
      setTypoSuggestion(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; phone?: string } = {};

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!isValidUSPhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number (e.g. 305-555-0192).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      email: cleanEmail,
      phone,
      tcpaConsent: true,
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Brand Header */}
      <div className="text-center space-y-2.5">
        <HammerHouseLogo size="sm" align="center" />
        
        {/* Verified Shield */}
        <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h2 className="font-sans text-2xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-tight">
            We Have Matching Pros in {city}, FL!
          </h2>
          <p className="text-sm font-medium text-[#1E293B] max-w-md mx-auto leading-normal">
            Where should we send your matches?
          </p>
        </div>
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
            Email Address <span className="text-[#8B1122]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4 text-[#8B1122]" />
            </div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="e.g. name@example.com"
              className="w-full h-13 pl-10 pr-4 text-base font-semibold text-[#0F172A] bg-white border-2 border-slate-300 rounded-xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              autoFocus
            />
          </div>

          {typoSuggestion && (
            <button
              type="button"
              onClick={applyTypoSuggestion}
              className="text-xs text-[#8B1122] hover:underline font-bold text-left block cursor-pointer animate-fade-in"
            >
              Did you mean <span className="underline">{typoSuggestion}</span>? Click to fix.
            </button>
          )}

          {errors.email && (
            <p className="text-xs font-bold text-rose-600 animate-fade-in">{errors.email}</p>
          )}
        </div>

        {/* Phone Input */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
            Cell Number <span className="text-[#8B1122]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Phone className="w-4 h-4 text-[#8B1122]" />
            </div>
            <input
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="e.g. (305) 555-0192"
              className="w-full h-13 pl-10 pr-4 text-base font-semibold text-[#0F172A] bg-white border-2 border-slate-300 rounded-xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
            />
          </div>
          {errors.phone && (
            <p className="text-xs font-bold text-rose-600 animate-fade-in">{errors.phone}</p>
          )}
        </div>

        {/* Micro-Trust Shield */}
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0F172A]">
          <Lock className="w-3.5 h-3.5 text-[#8B1122]" />
          <span>Zero-spam guarantee. Your information is protected & encrypted.</span>
        </div>

        {/* Florida Mini-TCPA & Legal Disclaimer */}
        <div className="text-[11px] text-[#1E293B] font-medium leading-relaxed text-left bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
          <p>
            By clicking “Get Results,” I am providing my electronic signature and expressed written consent to permit <strong>Hammer House</strong> and up to <strong>four home improvement companies</strong> to contact me at the number provided for marketing purposes, including the use of automated technology and text messages. I acknowledge my consent is not required to obtain any good or service.
          </p>
          <p className="font-bold text-[#0F172A] pt-0.5">
            <a href="#privacy" className="hover:underline text-[#8B1122]">Terms of Service</a> and <a href="#privacy" className="hover:underline text-[#8B1122]">Privacy Policy</a>
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-12 h-12 rounded-full border border-slate-300 bg-white text-[#0F172A] hover:text-[#8B1122] hover:border-[#8B1122] transition-colors flex items-center justify-center cursor-pointer shadow-sm disabled:opacity-50"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 ml-4 h-13 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none text-white font-sans font-bold text-sm sm:text-base tracking-wide rounded-xl shadow-btn transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>GETTING RESULTS...</span>
              </>
            ) : (
              <>
                <span>GET RESULTS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
