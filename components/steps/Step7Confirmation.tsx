import React from 'react';
import { HammerHouseLogo } from '../Logo';
import { CheckCircle, ShieldCheck, PhoneCall, Calendar, Check, Copy } from 'lucide-react';

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
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(leadData.leadCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in text-left max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <HammerHouseLogo size="md" align="center" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Estimate Request Confirmed</span>
        </div>
      </div>

      {/* The Hammer House Promise / Next Steps */}
      <div className="space-y-3 bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200">
        <h2 className="font-sans text-xl sm:text-2xl font-black text-[#0F172A] tracking-[-0.03em]">
          Here's What Happens Next:
        </h2>

        <div className="space-y-3 text-xs sm:text-sm font-medium text-[#334155] leading-relaxed">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-white border border-slate-200 text-[#8B1122] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-sm">
              1
            </div>
            <p>
              <strong className="text-[#0F172A]">Instant Confirmation:</strong> You will receive a quick call or text from our certified team in {leadData.city} to confirm your preferred estimate time.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-white border border-slate-200 text-[#8B1122] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-sm">
              2
            </div>
            <p>
              <strong className="text-[#0F172A]">On-Site Measurement & Samples:</strong> A licensed estimator will measure your roof dimensions and present code-compliant material options (Shingle, Tile, Metal).
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-white border border-slate-200 text-[#8B1122] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-sm">
              3
            </div>
            <p>
              <strong className="text-[#0F172A]">1-Year Price Guarantee:</strong> Receive an exact written quote locked for 12 months with zero pressure to buy.
            </p>
          </div>
        </div>
      </div>

      {/* Structured Project Details */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="font-sans text-lg font-black text-[#0F172A] tracking-tight">
            Your Project Summary:
          </h3>
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-xs font-bold text-[#0F172A] transition-colors cursor-pointer border border-slate-200 shadow-sm"
            title="Copy Reference Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>Ref: {leadData.leadCode}</span>
          </button>
        </div>

        <div className="space-y-3 divide-y divide-slate-100 text-sm bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Service Type:</p>
            <p className="text-base font-black text-[#8B1122]">
              {leadData.serviceType === 'Replacement' ? 'Full Roof Replacement' : 'Roof Repair & Patch'}
            </p>
          </div>

          <div className="pt-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Homeowner / Decision Maker:</p>
            <p className="text-base font-extrabold text-[#0F172A]">
              {leadData.fullName}
            </p>
          </div>

          <div className="pt-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Property Address:</p>
            <p className="text-base font-extrabold text-[#0F172A]">
              {leadData.streetAddress}, {leadData.city}, {leadData.state} {leadData.zipCode}
            </p>
          </div>

          <div className="pt-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Phone & Email:</p>
            <p className="text-base font-extrabold text-[#0F172A]">
              {leadData.phone} • {leadData.email}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-[#475569] hover:text-[#8B1122] transition-colors underline cursor-pointer"
        >
          Submit another project location
        </button>
      </div>
    </div>
  );
}
