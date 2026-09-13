import React from 'react';
import Link from 'next/link';
import { HammerHouseLogo } from '@/components/Logo';
import { ArrowLeft, HardHat, ShieldCheck, Zap, PhoneCall } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Florida Roofing Pro Partner Network | Hammer House',
  description:
    'Join the Hammer House Florida Roofing Network. Receive qualified, exclusive homeowner roofing appointments in your Florida service area.',
};

export default function ProNetworkPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-slate-200/80">
        <div className="text-center pb-8 border-b border-slate-100">
          <HammerHouseLogo size="lg" align="center" />
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#8B1122] text-xs font-bold">
            <HardHat className="w-4 h-4" />
            <span>DBPR Licensed Contractors Only</span>
          </div>
          <h1 className="mt-4 font-sans text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Grow Your Florida Roofing Business
          </h1>
          <p className="mt-2 text-sm font-medium text-[#64748B]">
            Exclusive homeowner appointments in your Florida county. Zero shared lead auctions.
          </p>
        </div>

        <div className="mt-8 space-y-6 text-sm sm:text-[15px] leading-relaxed text-[#334155]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
              <ShieldCheck className="w-6 h-6 text-[#8B1122] mx-auto mb-2" />
              <h3 className="font-bold text-[#0F172A] text-sm">Verified Homeowners</h3>
              <p className="text-xs text-[#64748B] mt-1">100% address & phone validated leads</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
              <Zap className="w-6 h-6 text-[#8B1122] mx-auto mb-2" />
              <h3 className="font-bold text-[#0F172A] text-sm">Real-Time Routing</h3>
              <p className="text-xs text-[#64748B] mt-1">Direct CRM / SMS lead delivery in seconds</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
              <PhoneCall className="w-6 h-6 text-[#8B1122] mx-auto mb-2" />
              <h3 className="font-bold text-[#0F172A] text-sm">Strict Territory Lock</h3>
              <p className="text-xs text-[#64748B] mt-1">Capped at 3 contractors per county</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <h2 className="text-base font-bold text-[#0F172A]">Contractor Requirements</h2>
            <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto">
              Must hold an active Florida <strong>CCC (Certified Roofing Contractor)</strong> license in good standing with DBPR and carry minimum \$1M general liability and workers' compensation coverage.
            </p>
            <div className="pt-2">
              <a
                href="mailto:partners@hammerhouse.com?subject=Contractor%20Network%20Application"
                className="inline-block px-6 py-3 bg-[#8B1122] hover:bg-[#730C1A] text-white font-bold text-sm rounded-xl shadow-btn transition-all"
              >
                Apply to Join Network (partners@hammerhouse.com)
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-[#0F172A] font-bold text-sm transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Funnel</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
