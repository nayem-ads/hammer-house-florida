import React from 'react';
import { HammerHouseLogo } from '../Logo';
import { CheckCircle, PhoneCall, Ruler, ShieldCheck, Copy, Check } from 'lucide-react';

interface Step6Props {
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

export function Step6Confirmation({ leadData, onReset }: Step6Props) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(leadData.leadCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-left">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <HammerHouseLogo size="md" align="center" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Appointment Request Confirmed</span>
        </div>
      </div>

      {/* What Happens Next Section */}
      <div className="space-y-3 bg-linen-50 p-4 sm:p-5 rounded-2xl border border-linen-200/80">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 tracking-tight">
          What Happens Next:
        </h2>
        
        <ul className="space-y-3 text-xs sm:text-sm text-charcoal-700 leading-relaxed list-disc list-outside pl-4">
          <li>
            You <strong>MAY</strong> receive calls and/or text messages to confirm your scheduled appointments with DBPR-licensed Florida contractors.
          </li>
          <li>
            During your appointment, each estimator will take measurements, review your options, and show you samples so you can see what works best for your home. If you like what you see, they will provide you with an exact price that’s <strong>guaranteed for one full year</strong>. No pressure, just clear options and pricing when you’re ready.
          </li>
        </ul>
      </div>

      {/* Your Project Details Section */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-charcoal-900 tracking-tight">
            Your Project Details:
          </h3>
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-linen-100 hover:bg-linen-200 text-[11px] font-semibold text-charcoal-700 transition-colors cursor-pointer border border-linen-300/60"
            title="Copy Reference Code"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-charcoal-500" />}
            <span>Ref: {leadData.leadCode}</span>
          </button>
        </div>

        <div className="space-y-3 divide-y divide-linen-200/80 text-sm">
          <div className="pt-2">
            <p className="text-xs font-semibold text-charcoal-500">Request:</p>
            <p className="text-base font-bold text-burgundy-800">
              Free Roofing Estimate ({leadData.serviceType})
            </p>
          </div>

          <div className="pt-3">
            <p className="text-xs font-semibold text-charcoal-500">Homeowner / Decision Maker:</p>
            <p className="text-base font-bold text-burgundy-800">
              {leadData.fullName}
            </p>
          </div>

          <div className="pt-3">
            <p className="text-xs font-semibold text-charcoal-500">Home Address:</p>
            <p className="text-base font-bold text-burgundy-800">
              {leadData.streetAddress}, {leadData.city}, {leadData.state} {leadData.zipCode}
            </p>
          </div>

          <div className="pt-3">
            <p className="text-xs font-semibold text-charcoal-500">Phone Number:</p>
            <p className="text-base font-bold text-burgundy-800">
              {leadData.phone}
            </p>
          </div>

          <div className="pt-3">
            <p className="text-xs font-semibold text-charcoal-500">Email Address:</p>
            <p className="text-base font-bold text-burgundy-800">
              {leadData.email}
            </p>
          </div>
        </div>
      </div>

      {/* Start New Action */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-charcoal-500 hover:text-burgundy-700 transition-colors underline cursor-pointer"
        >
          Submit another project location
        </button>
      </div>
    </div>
  );
}
