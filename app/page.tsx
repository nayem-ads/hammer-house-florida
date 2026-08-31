import { WatermarkBackground } from '@/components/WatermarkBackground';
import { HammerHouseFunnel } from '@/components/HammerHouseFunnel';

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen min-h-[100dvh] flex items-center justify-center py-4 sm:py-8">
      {/* Background Watermark and Ambient Glow Canvas */}
      <WatermarkBackground />

      {/* Main Multi-Step Lead & Appointment Funnel */}
      <HammerHouseFunnel />
    </main>
  );
}
