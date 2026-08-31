'use client';

import React, { useState } from 'react';
import { Step1ZipHook } from './steps/Step1ZipHook';
import { Step2ProjectScope } from './steps/Step2ProjectScope';
import { Step3SearchingMatcher } from './steps/Step3SearchingMatcher';
import { Step4NameAddress } from './steps/Step4NameAddress';
import { Step5ContactTcpa } from './steps/Step5ContactTcpa';
import { Step6Confirmation } from './steps/Step6Confirmation';

export interface FunnelState {
  zipCode: string;
  city: string;
  state: string;
  county: string;
  serviceType: 'Replacement' | 'Repair' | 'Inspection';
  fullName: string;
  streetAddress: string;
  isHomeowner: boolean;
  phone: string;
  email: string;
  tcpaConsent: boolean;
  leadCode?: string;
}

export function HammerHouseFunnel() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FunnelState>({
    zipCode: '',
    city: 'Miami',
    state: 'FL',
    county: 'Miami-Dade',
    serviceType: 'Replacement',
    fullName: '',
    streetAddress: '',
    isHomeowner: true,
    phone: '',
    email: '',
    tcpaConsent: true,
  });

  const handleStep1Success = (location: { zipCode: string; city: string; state: string; county: string }) => {
    setFormData((prev) => ({
      ...prev,
      zipCode: location.zipCode,
      city: location.city,
      state: location.state,
      county: location.county,
    }));
    setCurrentStep(2);
  };

  const handleStep2Select = (serviceType: 'Replacement' | 'Repair' | 'Inspection') => {
    setFormData((prev) => ({ ...prev, serviceType }));
    setCurrentStep(3);
  };

  const handleStep3Complete = () => {
    setCurrentStep(4);
  };

  const handleStep4Next = (data: { fullName: string; streetAddress: string; isHomeowner: boolean }) => {
    setFormData((prev) => ({
      ...prev,
      fullName: data.fullName,
      streetAddress: data.streetAddress,
      isHomeowner: data.isHomeowner,
    }));
    setCurrentStep(5);
  };

  const handleStep5Submit = async (data: { email: string; phone: string; tcpaConsent: boolean }) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const fullPayload = {
      ...formData,
      email: data.email,
      phone: data.phone,
      tcpaConsent: data.tcpaConsent,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || 'Failed to submit appointment request.');
      }

      setFormData((prev) => ({
        ...prev,
        ...fullPayload,
        leadCode: json.leadCode || `HH-FL-${Math.floor(10000 + Math.random() * 90000)}`,
      }));

      setCurrentStep(6);
    } catch (err: any) {
      console.error('[Submission Error]', err);
      setSubmitError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      zipCode: '',
      city: 'Miami',
      state: 'FL',
      county: 'Miami-Dade',
      serviceType: 'Replacement',
      fullName: '',
      streetAddress: '',
      isHomeowner: true,
      phone: '',
      email: '',
      tcpaConsent: true,
    });
    setCurrentStep(1);
    setSubmitError(null);
  };

  const progressPercent = Math.min(100, Math.round(((currentStep - 1) / 4) * 100));

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-6 sm:py-10">
      {/* Floating Card Container with Crisp Border & Shadow */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-10 md:p-11 shadow-card border border-slate-200">
        {/* Top Progress Bar (Visible during active form steps 2-5) */}
        {currentStep > 1 && currentStep < 6 && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 rounded-t-3xl overflow-hidden">
            <div
              className="h-full bg-[#8B1122] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {submitError && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold text-center animate-fade-in">
            {submitError}
          </div>
        )}

        {/* Step Views */}
        {currentStep === 1 && (
          <Step1ZipHook onSuccess={handleStep1Success} initialZip={formData.zipCode} />
        )}

        {currentStep === 2 && (
          <Step2ProjectScope
            onBack={() => setCurrentStep(1)}
            onSelect={handleStep2Select}
            selectedType={formData.serviceType}
            city={formData.city}
          />
        )}

        {currentStep === 3 && (
          <Step3SearchingMatcher
            city={formData.city}
            county={formData.county}
            onComplete={handleStep3Complete}
          />
        )}

        {currentStep === 4 && (
          <Step4NameAddress
            city={formData.city}
            zipCode={formData.zipCode}
            initialFullName={formData.fullName}
            initialAddress={formData.streetAddress}
            initialIsHomeowner={formData.isHomeowner}
            onBack={() => setCurrentStep(2)}
            onNext={handleStep4Next}
          />
        )}

        {currentStep === 5 && (
          <Step5ContactTcpa
            city={formData.city}
            initialEmail={formData.email}
            initialPhone={formData.phone}
            isSubmitting={isSubmitting}
            onBack={() => setCurrentStep(4)}
            onSubmit={handleStep5Submit}
          />
        )}

        {currentStep === 6 && (
          <Step6Confirmation
            leadData={{
              leadCode: formData.leadCode || 'HH-FL-89210',
              fullName: formData.fullName,
              streetAddress: formData.streetAddress,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              phone: formData.phone,
              email: formData.email,
              serviceType: formData.serviceType,
            }}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs font-medium text-[#1E293B] space-y-2">
        <div className="flex items-center justify-center gap-4 font-semibold">
          <a href="#privacy" className="hover:text-[#8B1122] transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#terms" className="hover:text-[#8B1122] transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#pro" className="hover:text-[#8B1122] transition-colors">I'm a Florida Pro</a>
        </div>
        <p className="text-[11px] text-[#334155] font-normal">
          © {new Date().getFullYear()} Hammer House. All Rights Reserved. Licensed Florida Roofing Appointment Network.
        </p>
      </footer>
    </div>
  );
}
