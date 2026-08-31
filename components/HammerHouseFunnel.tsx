'use client';

import React, { useState } from 'react';
import { Step1ZipHook } from './steps/Step1ZipHook';
import { Step2ProjectScope } from './steps/Step2ProjectScope';
import { Step3SearchingMatcher } from './steps/Step3SearchingMatcher';
import { Step4Name } from './steps/Step4Name';
import { Step5Address } from './steps/Step5Address';
import { Step6Contact } from './steps/Step6Contact';
import { Step7Confirmation } from './steps/Step7Confirmation';

export interface FunnelState {
  zipCode: string;
  city: string;
  state: string;
  county: string;
  serviceType: 'Replacement' | 'Repair';
  firstName: string;
  lastName: string;
  fullName: string;
  streetAddress: string;
  isHomeowner: boolean;
  phone: string;
  email: string;
  tcpaConsent: boolean;
  leadCode?: string;
}

export function HammerHouseFunnel() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FunnelState>({
    zipCode: '', city: 'Miami', state: 'FL', county: 'Miami-Dade',
    serviceType: 'Replacement', firstName: '', lastName: '', fullName: '',
    streetAddress: '', isHomeowner: true, phone: '', email: '', tcpaConsent: true,
  });

  const handleStep1 = (loc: { zipCode: string; city: string; state: string; county: string }) => {
    setFormData((p) => ({ ...p, ...loc }));
    setStep(2);
  };

  const handleStep2 = (serviceType: 'Replacement' | 'Repair') => {
    setFormData((p) => ({ ...p, serviceType }));
    setStep(3);
  };

  const handleStep3 = () => setStep(4);

  const handleStep4 = (data: { firstName: string; lastName: string; fullName: string }) => {
    setFormData((p) => ({ ...p, ...data }));
    setStep(5);
  };

  const handleStep5 = (data: { streetAddress: string; isHomeowner: boolean }) => {
    setFormData((p) => ({ ...p, ...data }));
    setStep(6);
  };

  const handleStep6 = async (data: { email: string; phone: string; tcpaConsent: boolean }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    const payload = { ...formData, ...data };

    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Submission failed.');
      setFormData((p) => ({ ...p, ...payload, leadCode: json.leadCode || `HH-FL-${Math.floor(10000 + Math.random() * 90000)}` }));
      setStep(7);
    } catch (err: any) {
      setSubmitError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ zipCode: '', city: 'Miami', state: 'FL', county: 'Miami-Dade', serviceType: 'Replacement', firstName: '', lastName: '', fullName: '', streetAddress: '', isHomeowner: true, phone: '', email: '', tcpaConsent: true });
    setStep(1);
    setSubmitError(null);
  };

  return (
    <div className="relative z-10 w-full max-w-[580px] mx-auto px-4 py-8 sm:py-14">
      {/* Card — generous padding, very subtle shadow, thin border like Cost Guide */}
      <div className="bg-white rounded-2xl px-8 py-12 sm:px-14 sm:py-16 shadow-[0_4px_40px_-8px_rgba(0,0,0,0.06)] border border-slate-100/80">
        {submitError && (
          <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium text-center">
            {submitError}
          </div>
        )}

        {step === 1 && <Step1ZipHook onSuccess={handleStep1} initialZip={formData.zipCode} />}
        {step === 2 && <Step2ProjectScope onBack={() => setStep(1)} onSelect={handleStep2} selectedType={formData.serviceType} city={formData.city} />}
        {step === 3 && <Step3SearchingMatcher city={formData.city} county={formData.county} onComplete={handleStep3} />}
        {step === 4 && <Step4Name initialFirstName={formData.firstName} initialLastName={formData.lastName} onBack={() => setStep(2)} onNext={handleStep4} />}
        {step === 5 && <Step5Address city={formData.city} zipCode={formData.zipCode} initialAddress={formData.streetAddress} initialIsHomeowner={formData.isHomeowner} onBack={() => setStep(4)} onNext={handleStep5} />}
        {step === 6 && <Step6Contact city={formData.city} initialEmail={formData.email} initialPhone={formData.phone} isSubmitting={isSubmitting} onBack={() => setStep(5)} onSubmit={handleStep6} />}
        {step === 7 && <Step7Confirmation leadData={{ leadCode: formData.leadCode || 'HH-FL-00000', fullName: formData.fullName, streetAddress: formData.streetAddress, city: formData.city, state: formData.state, zipCode: formData.zipCode, phone: formData.phone, email: formData.email, serviceType: formData.serviceType }} onReset={handleReset} />}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-[#94A3B8] space-y-1">
        <div className="flex items-center justify-center gap-6 font-normal">
          <a href="#privacy" className="hover:text-[#1E3A3A] underline transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-[#1E3A3A] underline transition-colors">Terms of Service</a>
          <a href="#pro" className="hover:text-[#1E3A3A] underline transition-colors">I'm a Pro</a>
        </div>
      </footer>
    </div>
  );
}
