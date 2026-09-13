'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Step1ZipHook } from './steps/Step1ZipHook';
import { Step2ProjectScope } from './steps/Step2ProjectScope';
import { Step3RoofAge } from './steps/Step3RoofAge';
import { Step3SearchingMatcher } from './steps/Step3SearchingMatcher';
import { Step4Name } from './steps/Step4Name';
import { Step5Address } from './steps/Step5Address';
import { Step6Contact } from './steps/Step6Contact';
import { Step7Confirmation } from './steps/Step7Confirmation';

// Declare global types for GTM/GA4/Meta Pixel
declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

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
  // Meta & UTM attribution parameters
  fbclid?: string;
  fbc?: string;
  fbp?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
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

  // Extract Meta Click ID, cookies, and UTM tracking parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const fbclid = urlParams.get('fbclid') || '';
      const utm_source = urlParams.get('utm_source') || '';
      const utm_medium = urlParams.get('utm_medium') || '';
      const utm_campaign = urlParams.get('utm_campaign') || '';
      const utm_content = urlParams.get('utm_content') || '';
      const utm_term = urlParams.get('utm_term') || '';

      // Read Meta Pixel first-party cookies
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
        return '';
      };

      const fbp = getCookie('_fbp');
      const fbc = getCookie('_fbc') || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : '');

      setFormData((prev) => ({
        ...prev,
        fbclid,
        fbc,
        fbp,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
      }));
    }
  }, []);

  // Track step progression in GTM / Google Analytics
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      const stepNames = [
        '',
        'Step 1: Zip Code',
        'Step 2: Service Scope',
        'Step 3: Roof Age',
        'Step 4: Contractor Matcher',
        'Step 5: Full Name',
        'Step 6: Street Address',
        'Step 7: Contact Info',
        'Step 8: Estimate Confirmed',
      ];
      window.dataLayer.push({
        event: 'funnel_step_view',
        step_number: currentStep,
        step_name: stepNames[currentStep] || `Step ${currentStep}`,
      });
    }
  }, [currentStep]);

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

      const assignedLeadCode = json.leadCode || `HH-FL-${Math.floor(10000 + Math.random() * 90000)}`;

      setFormData((prev) => ({
        ...prev,
        ...fullPayload,
        leadCode: assignedLeadCode,
      }));

      // Conversion Tracking: Google Tag Manager DataLayer Push
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'lead_submitted',
          lead_id: assignedLeadCode,
          service_type: fullPayload.serviceType,
          roof_age: fullPayload.roofAge,
          city: fullPayload.city,
          state: fullPayload.state,
          zip_code: fullPayload.zipCode,
          value: 150.00,
          currency: 'USD',
        });

        // Meta Pixel Lead Event with Advanced Matching parameters
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', {
            content_name: 'Florida Roofing Estimate',
            content_category: fullPayload.serviceType,
            value: 150.00,
            currency: 'USD',
            status: 'Lead Created',
          });
        }

        // Google Analytics 4 generate_lead Event
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            transaction_id: assignedLeadCode,
            value: 150.00,
            currency: 'USD',
          });
        }
      }

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

      {/* Global Footer Links with valid routing */}
      <footer className="mt-8 text-center text-xs text-[#64748B] space-y-2">
        <div className="flex items-center justify-center gap-4 font-medium">
          <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B1122] hover:underline transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B1122] hover:underline transition-colors">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/pro" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B1122] hover:underline transition-colors">
            I'm a Florida Pro
          </Link>
        </div>
        <p className="text-[11px] text-[#94A3B8]">
          © {new Date().getFullYear()} Hammer House. All Rights Reserved. Licensed Florida Roofing Appointment Network.
        </p>
      </footer>
    </div>
  );
}
