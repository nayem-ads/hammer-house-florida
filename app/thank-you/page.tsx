import React, { Suspense } from 'react';
import Link from 'next/link';
import { HammerHouseLogo } from '@/components/Logo';
import { CheckCircle2, ArrowLeft, PhoneCall, Calendar, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appointment Request Confirmed | Hammer House Florida',
  description:
    'Your Florida roofing estimate request has been received. Our certified team will confirm your measurement window.',
};

function ThankYouContent() {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-slate-200/80 text-center">
      <HammerHouseLogo size="lg" align="center" />

      <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-sm">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Estimate Request Confirmed</span>
      </div>

      <h1 className="mt-4 font-sans text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
        Thank You! We're Matching Your Florida Roof.
      </h1>

      <p className="mt-2 text-sm text-[#475569] leading-relaxed max-w-md mx-auto">
        Your request has been routed to top-rated, DBPR-licensed roofing contractors in your county.
      </p>

      <div className="mt-6 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-left space-y-3 text-xs sm:text-sm text-[#334155]">
        <h2 className="font-bold text-[#0F172A] text-sm">Next Steps:</h2>
        <div className="flex items-start gap-2.5">
          <PhoneCall className="w-4 h-4 text-[#8B1122] shrink-0 mt-0.5" />
          <span>Expect a quick call or text from our verified local team to confirm your roof measurement appointment.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <Calendar className="w-4 h-4 text-[#8B1122] shrink-0 mt-0.5" />
          <span>Your estimator will provide exact written pricing backed by a 1-year price lock guarantee.</span>
        </div>
      </div>

      <div className="mt-8 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8B1122] hover:bg-[#730C1A] text-white font-bold text-sm rounded-xl shadow-btn transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Page</span>
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#0F172A] py-12 px-4 sm:px-6 flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <ThankYouContent />
      </Suspense>
    </main>
  );
}
