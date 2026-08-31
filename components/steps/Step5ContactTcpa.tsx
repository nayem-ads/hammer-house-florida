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
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <HammerHouseLogo size="sm" align="center" />
        
        {/* Verified Shield */}
        <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-500/80 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight leading-[1.2]">
            We Have Matching Pros in {city}, FL!
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
            Where should we send your certified estimate package?
          </p>
        </div>
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
            Email Address <span className="text-burgundy-700">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
              <Mail className="w-4 h-4 text-burgundy-700" />
            </div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="e.g. name@example.com"
              className="w-full h-12 pl-10 pr-4 text-base text-charcoal-900 bg-white border-2 border-charcoal-200 rounded-xl focus:border-burgundy-700 focus:ring-4 focus:ring-burgundy-700/10 transition-all outline-none placeholder:text-charcoal-400 shadow-sm"
              autoFocus
            />
          </div>

          {typoSuggestion && (
            <button
              type="button"
              onClick={applyTypoSuggestion}
              className="text-xs text-burgundy-700 hover:text-burgundy-900 font-semibold underline text-left block cursor-pointer animate-fade-in"
            >
              Did you mean <span className="font-bold">{typoSuggestion}</span>? Click to fix.
            </button>
          )}

          {errors.email && (
            <p className="text-xs font-medium text-rose-600 animate-fade-in">{errors.email}</p>
          )}
        </div>

        {/* Phone Input */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
            Cell Number (For Instant Match & Confirmation) <span className="text-burgundy-700">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
              <Phone className="w-4 h-4 text-burgundy-700" />
            </div>
            <input
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="e.g. (305) 555-0192"
              className="w-full h-12 pl-10 pr-4 text-base text-charcoal-900 bg-white border-2 border-charcoal-200 rounded-xl focus:border-burgundy-700 focus:ring-4 focus:ring-burgundy-700/10 transition-all outline-none placeholder:text-charcoal-400 shadow-sm"
            />
          </div>
          {errors.phone && (
            <p className="text-xs font-medium text-rose-600 animate-fade-in">{errors.phone}</p>
          )}
        </div>

        {/* Micro-Trust Shield */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-charcoal-500 pt-1">
          <Lock className="w-3.5 h-3.5 text-burgundy-700" />
          <span>Zero-spam guarantee. Your information is protected & encrypted.</span>
        </div>

        {/* Florida Mini-TCPA & Legal Disclaimer */}
        <div className="text-[11px] text-charcoal-500 leading-relaxed text-left bg-linen-50 p-3 rounded-xl border border-linen-200/60 space-y-1">
          <p>
            By clicking “Get Results,” I am providing my electronic signature and expressed written consent to permit <strong>Hammer House</strong> and up to <strong>three Florida DBPR-certified home improvement companies</strong> to contact me at the number provided for quote & appointment scheduling purposes, including the use of automated technology and text messages. I acknowledge my consent is not required to obtain any good or service.
          </p>
          <p className="font-semibold text-charcoal-600">
            <a href="#privacy" className="hover:underline text-burgundy-800">Terms of Service</a> and <a href="#privacy" className="hover:underline text-burgundy-800">Privacy Policy</a>
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-12 h-12 rounded-full border border-charcoal-200 bg-white text-charcoal-600 hover:text-burgundy-700 hover:border-burgundy-300 transition-colors flex items-center justify-center cursor-pointer shadow-sm disabled:opacity-50"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 ml-4 h-13 bg-burgundy-700 hover:bg-burgundy-800 active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none text-white font-sans font-bold text-sm sm:text-base tracking-wide rounded-xl shadow-lg shadow-burgundy-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>MATCHING CERTIFIED PROS...</span>
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
