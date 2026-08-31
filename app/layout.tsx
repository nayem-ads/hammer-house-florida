import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F8F9FA',
};

export const metadata: Metadata = {
  title: 'Hammer House | Florida Certified Roofing Quotes & Appointments',
  description:
    'Compare free quotes from Florida DBPR-certified roofing contractors. 130+ MPH hurricane-code replacements, repairs, and wind mitigation estimates in 60 seconds.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans bg-[#F8F9FA] text-[#0F172A] min-h-screen min-h-[100dvh] flex flex-col justify-center items-center antialiased selection:bg-[#8B1122] selection:text-white">
        {children}
      </body>
    </html>
  );
}
