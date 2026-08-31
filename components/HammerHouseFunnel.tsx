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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FunnelState>({
    zipCode: '',
    city: 'Miami',
    state: 'FL',
    county: 'Miami-Dade',
    serviceType: 'Replacement',
    firstName: '',
    lastName: '',
    fullName: '',
    streetAddress: '',
    isHomeowner: true,
    phone: '',
    email: '',
    tcpaConsent: true,
  });

  // Step 1 -> Step 2
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

  // Step 2 -> Step 3
  const handleStep2Select = (serviceType: 'Replacement' | 'Repair') => {
    setFormData((prev) => ({ ...prev, serviceType }));
    setCurrentStep(3);
  };

  // Step 3 -> Step 4
  const handleStep3Complete = () => {
    setCurrentStep(4);
  };

  // Step 4 -> Step 5
  const handleStep4Next = (data: { firstName: string; lastName: string; fullName: string }) => {
    setFormData((prev) => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: data.fullName,
    }));
    setCurrentStep(5);
  };

  // Step 5 -> Step 6
  const handleStep5Next = (data: { streetAddress: string; isHomeowner: boolean }) => {
    setFormData((prev) => ({
      ...prev,
      streetAddress: data.streetAddress,
      isHomeowner: data.isHomeowner,
    }));
    setCurrentStep(6);
  };

  // Step 6 -> Submit -> Step 7
  const handleStep6Submit = async (data: { email: string; phone: string; tcpaConsent: boolean }) => {
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
        throw new Error(json?.error || 'Failed to submit estimate request.');
      }

      setFormData((prev) => ({
        ...prev,
        ...fullPayload,
        leadCode: json.leadCode || `HH-FL-${Math.floor(10000 + Math.random() * 90000)}`,
      }));

      setCurrentStep(7);
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
      firstName: '',
      lastName: '',
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

  return (
    <div className="relative z-10 w-full max-w-[560px] mx-auto px-4 py-8 sm:py-12">
      {/* Clean White Rounded Card Container */}
      <div className="relative bg-white rounded-[28px] p-7 sm:p-11 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100">
        {submitError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center animate-fade-in">
            {submitError}
          </div>
        )}

        {/* Step 1: Zip */}
        {currentStep === 1 && (
          <Step1ZipHook onSuccess={handleStep1Success} initialZip={formData.zipCode} />
        )}

        {/* Step 2: Replace vs Repair */}
        {currentStep === 2 && (
          <Step2ProjectScope
            onBack={() => setCurrentStep(1)}
            onSelect={handleStep2Select}
            selectedType={formData.serviceType}
            city={formData.city}
          />
        )}

        {/* Step 3: Searching... */}
        {currentStep === 3 && (
          <Step3SearchingMatcher
            city={formData.city}
            county={formData.county}
            onComplete={handleStep3Complete}
          />
        )}

        {/* Step 4: Name */}
        {currentStep === 4 && (
          <Step4Name
            initialFirstName={formData.firstName}
            initialLastName={formData.lastName}
            onBack={() => setCurrentStep(2)}
            onNext={handleStep4Next}
          />
        )}

        {/* Step 5: Street Address & Homeowner */}
        {currentStep === 5 && (
          <Step5Address
            city={formData.city}
            zipCode={formData.zipCode}
            initialAddress={formData.streetAddress}
            initialIsHomeowner={formData.isHomeowner}
            onBack={() => setCurrentStep(4)}
            onNext={handleStep5Next}
          />
        )}

        {/* Step 6: Email & Phone */}
        {currentStep === 6 && (
          <Step6Contact
            city={formData.city}
            initialEmail={formData.email}
            initialPhone={formData.phone}
            isSubmitting={isSubmitting}
            onBack={() => setCurrentStep(5)}
            onSubmit={handleStep6Submit}
          />
        )}

        {/* Step 7: Confirmation & Project Details */}
        {currentStep === 7 && (
          <Step7Confirmation
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

      {/* Global Footer Links */}
      <footer className="mt-8 text-center text-xs text-[#64748B] space-y-2">
        <div className="flex items-center justify-center gap-4 font-normal">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <span>Terms of Service</span>
          <span>I'm a Pro</span>
        </div>
      </footer>
    </div>
  );
}
