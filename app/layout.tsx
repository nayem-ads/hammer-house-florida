import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF8F5',
};

export const metadata: Metadata = {
  title: 'Hammer House | Florida Certified Roofing Appointments & Estimates',
  description:
    'Skip the endless calls. Connect with Florida DBPR-licensed, insured roofing contractors for 130+ MPH hurricane-code replacements, repairs, and wind mitigation estimates.',
  keywords: [
    'Florida roofing',
    'roof replacement Florida',
    'wind mitigation inspection',
    'DBPR licensed roofer',
    'hurricane proof roofing',
    'Hammer House appointments',
  ],
  authors: [{ name: 'Hammer House' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Hammer House | Florida Certified Roofing Appointments',
    description:
      'Compare free quotes from Florida DBPR-licensed pros in 60 seconds. 100% no obligation.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Hammer House',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="bg-[#FAF8F5] text-charcoal-900 min-h-screen min-h-[100dvh] flex flex-col justify-center items-center antialiased selection:bg-burgundy-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
