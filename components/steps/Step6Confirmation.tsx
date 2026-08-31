import React from 'react';
import { HammerHouseLogo } from '../Logo';
import { CheckCircle, Copy, Check } from 'lucide-react';

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
    <div className="space-y-6 animate-fade-in text-left">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <HammerHouseLogo size="md" align="center" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Estimate Request Confirmed</span>
        </div>
      </div>

      {/* What Happens Next Section */}
      <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-[-0.03em]">
          What Happens Next:
        </h2>
        
        <ul className="space-y-3 text-xs sm:text-sm font-medium text-[#1E293B] leading-relaxed list-disc list-outside pl-4">
          <li>
            You <strong>MAY</strong> receive calls and/or text messages to confirm your scheduled appointments.
          </li>
          <li>
            During your appointment, each estimator will take measurements, review your options, and show you samples so you can see what works best for your home. If you like what you see, they will provide you with an exact price that’s <strong>guaranteed for one full year</strong>. No pressure, just clear options and pricing when you’re ready.
          </li>
        </ul>
      </div>

      {/* Your Project Details Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="font-sans text-xl font-extrabold text-[#0F172A] tracking-tight">
            Your Project Details:
          </h3>
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-xs font-bold text-[#0F172A] transition-colors cursor-pointer border border-slate-300 shadow-sm"
            title="Copy Reference Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>Ref: {leadData.leadCode}</span>
          </button>
        </div>

        <div className="space-y-3 divide-y divide-slate-200 text-sm">
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#334155]">Request:</p>
            <p className="text-base font-extrabold text-[#008080]">
              Free Roofing Estimate ({leadData.serviceType})
            </p>
          </div>

          <div className="pt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#334155]">Homeowner / Decision Maker:</p>
            <p className="text-base font-extrabold text-[#008080]">
              {leadData.fullName}
            </p>
          </div>

          <div className="pt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#334155]">Home Address:</p>
            <p className="text-base font-extrabold text-[#008080]">
              {leadData.streetAddress}, {leadData.city}, {leadData.state} {leadData.zipCode}
            </p>
          </div>

          <div className="pt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#334155]">Phone Number:</p>
            <p className="text-base font-extrabold text-[#008080]">
              {leadData.phone}
            </p>
          </div>

          <div className="pt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#334155]">Email Address:</p>
            <p className="text-base font-extrabold text-[#008080]">
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
          className="text-xs font-bold text-[#0F172A] hover:text-[#8B1122] transition-colors underline cursor-pointer"
        >
          Submit another project location
        </button>
      </div>
    </div>
  );
}
