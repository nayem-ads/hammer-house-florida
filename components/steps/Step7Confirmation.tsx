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
    <div className="animate-fade-in">
      <div className="text-center">
        <HammerHouseLogo size="md" align="center" />
      </div>

      {/* What Happens Next */}
      <h2 className="mt-10 mb-5 text-[22px] sm:text-[26px] font-bold text-[#1E3A3A] leading-tight italic text-center">
        What Happens Next:
      </h2>

      <ul className="space-y-3 text-sm text-[#4A5E5E] leading-relaxed list-disc list-outside pl-5 mb-10">
        <li>
          You <strong className="text-[#1E3A3A]">MAY</strong> receive calls and/or text messages to confirm your scheduled appointments.
        </li>
        <li>
          During your appointment, each estimator will take measurements, review your options, and show you samples so you can see what works best for your home. If you like what you see, they will provide you with an exact price that's <strong className="text-[#1E3A3A]">guaranteed for one full year</strong>. No pressure, just clear options and pricing when you're ready.
        </li>
      </ul>

      {/* Project Details */}
      <h3 className="mb-5 text-[22px] sm:text-[26px] font-bold text-[#1E3A3A] leading-tight italic text-center">
        Your Project Details:
      </h3>

      <div className="space-y-4 text-left">
        <div>
          <p className="text-sm font-normal text-[#6B7F7F]">Request:</p>
          <p className="text-lg font-bold text-[#0D9488]">Free Roofing Estimate</p>
        </div>

        <div>
          <p className="text-sm font-normal text-[#6B7F7F]">Homeowner/Decision Maker:</p>
          <p className="text-lg font-bold text-[#0D9488]">{leadData.fullName}</p>
        </div>

        <div>
          <p className="text-sm font-normal text-[#6B7F7F]">Home Address:</p>
          <p className="text-lg font-bold text-[#0D9488]">{leadData.streetAddress}</p>
        </div>

        <div>
          <p className="text-sm font-normal text-[#6B7F7F]">Phone Number:</p>
          <p className="text-lg font-bold text-[#0D9488]">{leadData.phone}</p>
        </div>

        <div>
          <p className="text-sm font-normal text-[#6B7F7F]">Email Address:</p>
          <p className="text-lg font-bold text-[#0D9488]">{leadData.email}</p>
        </div>
      </div>

      <div className="pt-8 text-center">
        <button type="button" onClick={onReset} className="text-sm font-medium text-[#6B7F7F] hover:text-[#1E3A3A] transition-colors underline cursor-pointer">
          Submit another project location
        </button>
      </div>
    </div>
  );
}
