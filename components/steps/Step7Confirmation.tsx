import React from 'react';
import { HammerHouseLogo } from '../Logo';
import { CheckCircle, Check, Copy } from 'lucide-react';

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
    roofAge?: string;
  };
  onReset: () => void;
}

export function Step7Confirmation({ leadData, onReset }: Step7Props) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(leadData.leadCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <HammerHouseLogo size="md" align="center" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Estimate Request Confirmed</span>
        </div>
      </div>

      {/* What Happens Next Section */}
      <div className="space-y-3 bg-[#F8FAFC] p-4.5 sm:p-5 rounded-2xl border border-slate-200">
        <h2 className="font-sans text-xl font-bold text-[#0F172A]">
          What Happens Next:
        </h2>

        <ul className="space-y-3 text-xs sm:text-sm text-[#475569] leading-relaxed list-disc list-outside pl-4">
          <li>
            You <strong className="text-[#0F172A]">MAY</strong> receive calls and/or text messages to confirm your scheduled appointments.
          </li>
          <li>
            During your appointment, each estimator will take measurements, review your options, and show you samples so you can see what works best for your home. If you like what you see, they will provide you with an exact price that's <strong className="text-[#0F172A]">guaranteed for one full year</strong>. No pressure, just clear options and pricing when you're ready.
          </li>
        </ul>
      </div>

      {/* Project Details Section (Fully Responsive) */}
      <div className="space-y-3 pt-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-sans text-lg font-bold text-[#0F172A]">
            Your Project Details:
          </h3>
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-xs font-bold text-[#0F172A] transition-colors cursor-pointer border border-slate-200 shadow-sm shrink-0"
            title="Copy Reference Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>Ref: {leadData.leadCode}</span>
          </button>
        </div>

        <div className="space-y-3 divide-y divide-slate-100 text-sm bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Request:</p>
            <p className="text-base font-bold text-[#0D9488] break-words">
              Free Roofing Estimate ({leadData.serviceType === 'Replacement' ? 'Full Replacement' : 'Roof Repair'})
            </p>
          </div>

          {leadData.roofAge && (
            <div className="pt-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Roof Age:</p>
              <p className="text-base font-bold text-[#0D9488]">
                {leadData.roofAge}
              </p>
            </div>
          )}

          <div className="pt-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Homeowner / Decision Maker:</p>
            <p className="text-base font-bold text-[#0D9488] break-words">
              {leadData.fullName}
            </p>
          </div>

          <div className="pt-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Property Address:</p>
            <p className="text-base font-bold text-[#0D9488] break-words">
              {leadData.streetAddress}, {leadData.city}, {leadData.state} {leadData.zipCode}
            </p>
          </div>

          <div className="pt-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Phone Number:</p>
            <p className="text-base font-bold text-[#0D9488]">
              {leadData.phone}
            </p>
          </div>

          <div className="pt-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Email Address:</p>
            <p className="text-base font-bold text-[#0D9488] break-all">
              {leadData.email}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-[#64748B] hover:text-[#8B1122] transition-colors underline cursor-pointer"
        >
          Submit another project location
        </button>
      </div>
    </div>
  );
}
