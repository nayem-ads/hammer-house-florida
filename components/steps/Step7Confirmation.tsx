import React from 'react';
import { HammerHouseLogo } from '../Logo';

interface Step7Props {
  leadData: {
    leadCode: string;
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
    serviceType: string;
  };
  onReset: () => void;
}

export function Step7Confirmation({ leadData, onReset }: Step7Props) {
  return (
    <div className="space-y-8 animate-fade-in text-left max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center">
        <HammerHouseLogo size="md" align="center" />
      </div>

      {/* What Happens Next Section */}
      <div className="space-y-4">
        <h2 className="font-sans text-2xl font-bold text-[#1E3944] text-center tracking-tight">
          What Happens Next:
        </h2>

        <ul className="space-y-3 text-sm text-[#334155] leading-relaxed list-disc list-outside pl-5">
          <li>
            You <strong>MAY</strong> receive calls and/or text messages to confirm your scheduled appointments.
          </li>
          <li>
            During your appointment, each estimator will take measurements, review your options, and show you samples so you can see what works best for your home. If you like what you see, they will provide you with an exact price that’s <strong>guaranteed for one full year</strong>. No pressure, just clear options and pricing when you’re ready.
          </li>
        </ul>
      </div>

      {/* Your Project Details Section */}
      <div className="space-y-4 pt-2">
        <h3 className="font-sans text-2xl font-bold text-[#1E3944] text-center tracking-tight">
          Your Project Details:
        </h3>

        <div className="space-y-4 text-left pt-2">
          <div>
            <p className="text-sm font-normal text-[#334155]">Request:</p>
            <p className="text-lg font-bold text-[#0D9488]">
              Free Roofing Estimate
            </p>
          </div>

          <div>
            <p className="text-sm font-normal text-[#334155]">Homeowner/Decision Maker:</p>
            <p className="text-lg font-bold text-[#0D9488]">
              {leadData.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm font-normal text-[#334155]">Home Address:</p>
            <p className="text-lg font-bold text-[#0D9488]">
              {leadData.streetAddress}
            </p>
          </div>

          <div>
            <p className="text-sm font-normal text-[#334155]">Phone Number:</p>
            <p className="text-lg font-bold text-[#0D9488]">
              {leadData.phone}
            </p>
          </div>

          <div>
            <p className="text-sm font-normal text-[#334155]">Email Address:</p>
            <p className="text-lg font-bold text-[#0D9488]">
              {leadData.email}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-[#64748B] hover:text-[#0D9488] transition-colors underline cursor-pointer"
        >
          Submit another project location
        </button>
      </div>
    </div>
  );
}
