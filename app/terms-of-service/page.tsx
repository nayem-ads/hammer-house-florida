import React from 'react';
import Link from 'next/link';
import { HammerHouseLogo } from '@/components/Logo';
import { ArrowLeft, FileCheck, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Hammer House Florida',
  description:
    'Hammer House Terms of Service. Understand the rules, disclosures, and warranties for using the Hammer House Florida contractor matching network.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-slate-200/80">
        {/* Header */}
        <div className="text-center pb-8 border-b border-slate-100">
          <HammerHouseLogo size="lg" align="center" />
          <h1 className="mt-6 font-sans text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm font-medium text-[#64748B]">
            Effective Date: September 13, 2026 • Governing Law: State of Florida
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8 text-sm sm:text-[15px] leading-relaxed text-[#334155]">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#8B1122]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or submitting project information via the Hammer House website or associated landing pages, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A]">
              2. Nature of Our Matching Service
            </h2>
            <p>
              Hammer House is an online lead referral and contractor matching platform. <strong>Hammer House is not a general contracting company, direct roofer, or insurance adjuster.</strong> We connect homeowners seeking roofing work with independent, third-party Florida Certified Roofing Contractors (CCC Licensed via Florida DBPR).
            </p>
            <p>
              Any estimates, quotes, warranties, inspections, contracts, or agreements entered into are solely between you (the homeowner) and the matched contractor.
            </p>
          </section>

          <section className="space-y-3 bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
            <h2 className="text-base font-extrabold text-amber-950 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700" />
              3. Independent Contractor Relationship & Estimates
            </h2>
            <p className="text-xs sm:text-sm text-amber-900">
              The 1-year price guarantee and sample assessments referenced in appointment confirmations are fulfilled directly by the licensed estimating contractor present during your inspection. Hammer House does not guarantee contractor pricing schedules, completion dates, or specific insurance claim approvals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A]">
              4. User Representations & Accuracy
            </h2>
            <p>You represent and warrant that:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#334155]">
              <li>You are at least 18 years of age and the legal owner or authorized decision-maker for the property entered.</li>
              <li>All information provided (including phone number and address) is accurate and belongs to you.</li>
              <li>You will not submit fake phone numbers, spam, or automated bot requests.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A]">
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted under applicable Florida law, Hammer House and its officers, directors, and affiliates shall not be liable for any indirect, punitive, incidental, or consequential damages resulting from your interactions with matched roofing contractors, property inspections, or material installations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A]">
              6. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the <strong>State of Florida</strong>, without giving effect to conflict of law principles. Any legal action shall be filed in state or federal courts located in Florida.
            </p>
          </section>
        </div>

        {/* Footer Back Link */}
        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B1122] hover:bg-[#730C1A] text-white font-bold text-sm transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Hammer House Funnel</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
