'use client';

import React, { useState } from 'react';
import { Step1ZipHook } from './steps/Step1ZipHook';
import { Step2ProjectScope } from './steps/Step2ProjectScope';
import { Step3RoofAge } from './steps/Step3RoofAge';
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
  roofAge: string;
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
    roofAge: 'Not sure',
    fullName: '',
    streetAddress: '',
    isHomeowner: true,
    phone: '',
    email: '',
    tcpaConsent: true,
  });

  // Step 1 (Zip) -> Step 2 (Scope)
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

  // Step 2 (Scope) -> Step 3 (Roof Age)
  const handleStep2Select = (serviceType: 'Replacement' | 'Repair') => {
    setFormData((prev) => ({ ...prev, serviceType }));
    setCurrentStep(3);
  };

  // Step 3 (Roof Age) -> Step 4 (Searching Matcher)
  const handleStep3AgeSelect = (roofAge: string) => {
    setFormData((prev) => ({ ...prev, roofAge }));
    setCurrentStep(4);
  };

  // Step 4 (Searching Matcher) -> Step 5 (Name)
  const handleStep4SearchingComplete = () => {
    setCurrentStep(5);
  };

  // Step 5 (Name) -> Step 6 (Address)
  const handleStep5NameNext = (data: { fullName: string }) => {
    setFormData((prev) => ({
      ...prev,
      fullName: data.fullName,
    }));
    setCurrentStep(6);
  };

  // Step 6 (Address) -> Step 7 (Contact)
  const handleStep6AddressNext = (data: { streetAddress: string; isHomeowner: boolean }) => {
    setFormData((prev) => ({
      ...prev,
      streetAddress: data.streetAddress,
      isHomeowner: data.isHomeowner,
    }));
    setCurrentStep(7);
  };

  // Step 7 (Contact) -> Submit -> Step 8 (Confirmation)
  const handleStep7ContactSubmit = async (data: { email: string; phone: string; tcpaConsent: boolean }) => {
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

      setCurrentStep(8);
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
      roofAge: 'Not sure',
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
      <div className="relative bg-white rounded-[28px] p-7 sm:p-11 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-slate-100">
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

        {/* Step 3: Roof Age Query */}
        {currentStep === 3 && (
          <Step3RoofAge
            onBack={() => setCurrentStep(2)}
            onSelect={handleStep3AgeSelect}
            selectedAge={formData.roofAge}
            city={formData.city}
          />
        )}

        {/* Step 4: Searching Florida Network */}
        {currentStep === 4 && (
          <Step3SearchingMatcher
            city={formData.city}
            county={formData.county}
            onComplete={handleStep4SearchingComplete}
          />
        )}

        {/* Step 5: Full Name */}
        {currentStep === 5 && (
          <Step4Name
            initialFullName={formData.fullName}
            onBack={() => setCurrentStep(3)}
            onNext={handleStep5NameNext}
          />
        )}

        {/* Step 6: Street Address & Homeowner */}
        {currentStep === 6 && (
          <Step5Address
            city={formData.city}
            zipCode={formData.zipCode}
            initialAddress={formData.streetAddress}
            initialIsHomeowner={formData.isHomeowner}
            onBack={() => setCurrentStep(5)}
            onNext={handleStep6AddressNext}
          />
        )}

        {/* Step 7: Email & Phone */}
        {currentStep === 7 && (
          <Step6Contact
            city={formData.city}
            initialEmail={formData.email}
            initialPhone={formData.phone}
            isSubmitting={isSubmitting}
            onBack={() => setCurrentStep(6)}
            onSubmit={handleStep7ContactSubmit}
          />
        )}

        {/* Step 8: Confirmation & Project Details */}
        {currentStep === 8 && (
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
              roofAge: formData.roofAge,
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
