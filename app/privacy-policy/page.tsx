import React from 'react';
import Link from 'next/link';
import { HammerHouseLogo } from '@/components/Logo';
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Hammer House Florida',
  description:
    'Hammer House Privacy Policy. Learn how we collect, protect, and handle your information in compliance with Google Ads, Meta Ads, TCPA, and Florida privacy standards.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-slate-200/80">
        {/* Header */}
        <div className="text-center pb-8 border-b border-slate-100">
          <HammerHouseLogo size="lg" align="center" />
          <h1 className="mt-6 font-sans text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm font-medium text-[#64748B]">
            Last Updated: September 13, 2026 • Compliant with Florida FSS 501.059, TCPA, Google & Meta Ads Policy
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8 text-sm sm:text-[15px] leading-relaxed text-[#334155]">
          {/* Section 1: Introduction */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#8B1122]" />
              1. Introduction & Overview
            </h2>
            <p>
              Welcome to <strong>Hammer House</strong> ("we," "us," or "our"). Hammer House operates an online quote comparison and contractor matching network connecting Florida property owners with verified, DBPR-licensed roofing contractors (CCC License holders).
            </p>
            <p>
              We are committed to safeguarding your privacy and ensuring transparency regarding how your data is collected, utilized, stored, and protected. This Privacy Policy applies to our website, mobile funnels, and associated matching services.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#8B1122]" />
              2. Information We Collect
            </h2>
            <p>When you submit a quote request or interact with our web platform, we may collect the following information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#334155]">
              <li><strong>Contact Information:</strong> Full name, telephone/cell number, and email address.</li>
              <li><strong>Property & Project Details:</strong> Florida property street address, city, state, zip code, homeownership status, roof service type (replacement vs. repair), and estimated roof age.</li>
              <li><strong>Technical & Usage Data:</strong> IP address, browser type, device specifications, operating system, referrer URL, timestamps, and interaction logs.</li>
              <li><strong>Marketing & Advertising Identifiers:</strong> Cookies, web beacons, Google Analytics client IDs, Google Click ID (GCLID), and Meta Pixel click IDs (FBCLID) to measure advertising campaign effectiveness and prevent click fraud.</li>
            </ul>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#8B1122]" />
              3. How We Use Your Information
            </h2>
            <p>We process your information for legitimate business purposes, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#334155]">
              <li>Matching your roofing inquiry with up to three or four qualified, DBPR-licensed Florida roofing contractors in your local jurisdiction.</li>
              <li>Facilitating scheduled appointments, roof measurement inspections, and price guarantee delivery.</li>
              <li>Verifying property roof geometry via public satellite pitch records and storm zone codes.</li>
              <li>Communicating appointment confirmations, quote updates, and customer support messages via email, SMS, or telephone.</li>
              <li>Auditing lead quality, preventing automated spam submissions, and enforcing network terms.</li>
            </ul>
          </section>

          {/* Section 4: TCPA & Florida Telemarketing Act Compliance */}
          <section className="space-y-3 bg-[#FFF5F6] border border-red-200 rounded-2xl p-5">
            <h2 className="text-base font-extrabold text-[#8B1122] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#8B1122]" />
              4. Telephone Consumer Protection Act (TCPA) & Florida Mini-TCPA (F.S. § 501.059)
            </h2>
            <p className="text-xs sm:text-sm text-[#0F172A]">
              By clicking "GET RESULTS," "NEXT," or "GET MY FREE ESTIMATES" on our funnel, you provide your express written consent authorizing Hammer House and up to four home improvement / roofing contractors to contact you at the phone number provided. Communications may include live calls, autodialed calls, pre-recorded messages, and SMS text messages concerning roofing estimate requests and appointment confirmation.
            </p>
            <p className="text-xs sm:text-sm text-[#0F172A]">
              <strong>Consent is not a condition of purchase:</strong> You are not required to provide consent as a condition of purchasing any property, goods, or services. You may revoke consent or opt out at any time by replying <strong>STOP</strong> to any SMS message or emailing <a href="mailto:privacy@hammerhouse.com" className="font-bold underline text-[#8B1122]">privacy@hammerhouse.com</a>.
            </p>
          </section>

          {/* Section 5: Third-Party Advertising (Google & Meta) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A]">
              5. Third-Party Analytics & Advertising Disclosures (Google & Meta)
            </h2>
            <p>
              We utilize third-party tracking technologies including <strong>Google Tag Manager, Google Analytics 4, Google Ads Conversion Tracking, and Meta Pixel (Facebook Ads)</strong>. These tools deploy first-party and third-party cookies to record user sessions, analyze conversion events, and deliver tailored advertising.
            </p>
            <p>
              <strong>Opting Out of Targeted Advertising:</strong> You can manage cookie preferences or opt out of interest-based advertising via the following consumer choice portals:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#334155]">
              <li><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#8B1122] font-semibold underline">Google Ad Settings</a></li>
              <li><a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer" className="text-[#8B1122] font-semibold underline">Meta (Facebook) Ad Preferences</a></li>
              <li><a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#8B1122] font-semibold underline">Digital Advertising Alliance (DAA) Opt-Out</a></li>
              <li><a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-[#8B1122] font-semibold underline">Network Advertising Initiative (NAI) Opt-Out</a></li>
            </ul>
          </section>

          {/* Section 6: Data Sharing & Non-Sale of Personal Info */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A]">
              6. How Information Is Shared (We Do Not Sell Personal Lists)
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personally identifiable information to unauthorized data brokers or bulk marketing lists. Your project details are shared strictly with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#334155]">
              <li><strong>Matched Roofing Contractors:</strong> Up to 4 vetted Florida licensed roofing professionals serving your specific county to deliver your requested estimates.</li>
              <li><strong>Technology Service Providers:</strong> Trusted infrastructure providers (such as CRM routing engines, secure database hosting on Railway/PostgreSQL, and transactional notification gateways like Brevo) under strict data protection agreements.</li>
              <li><strong>Legal & Compliance Authorities:</strong> When required by court order, subpoena, or to protect property and public safety.</li>
            </ul>
          </section>

          {/* Section 7: Data Security */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A]">
              7. Data Security & Encryption
            </h2>
            <p>
              We implement industry-standard administrative, physical, and technical safeguards—including TLS/SSL 256-bit encryption in transit, strict database access controls, rate limiting, and automated security scans—to protect your personal information against unauthorized access, loss, or alteration.
            </p>
          </section>

          {/* Section 8: Your Rights & Contact */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A]">
              8. Your Privacy Rights & Contact Information
            </h2>
            <p>
              Depending on your location, you may have the right to request access to, correction of, or deletion of your personal data. To exercise any of these rights or ask questions regarding this policy, please contact our Data Protection Officer:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1">
              <p><strong>Hammer House Privacy Compliance Team</strong></p>
              <p>Email: <a href="mailto:privacy@hammerhouse.com" className="text-[#8B1122] font-bold underline">privacy@hammerhouse.com</a></p>
              <p>Jurisdiction: State of Florida, United States</p>
            </div>
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
