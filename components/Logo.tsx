import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  align?: 'left' | 'center';
}

export function HammerHouseLogo({
  className = '',
  size = 'md',
  showWordmark = true,
  align = 'center',
}: LogoProps) {
  const iconDimensions = {
    sm: { w: 28, h: 28 },
    md: { w: 38, h: 38 },
    lg: { w: 52, h: 52 },
    xl: { w: 80, h: 80 },
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${
        align === 'center' ? 'justify-center' : 'justify-start'
      } ${className}`}
    >
      {/* Precise SVG Vector of Hammer House: House Silhouette + Central Hammer forming HH */}
      <svg
        width={iconDimensions.w}
        height={iconDimensions.h}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Roof Peak / Gables */}
        <path
          d="M50 8L8 38H18L50 16L82 38H92L50 8Z"
          fill="#8B1E2D"
        />
        {/* Chimney */}
        <rect x="76" y="16" width="9" height="15" fill="#8B1E2D" />

        {/* Left 'H' Vertical Pillar */}
        <rect x="18" y="38" width="11" height="54" fill="#8B1E2D" />

        {/* Right 'H' Vertical Pillar */}
        <rect x="71" y="38" width="11" height="54" fill="#8B1E2D" />

        {/* Central Hammer Handle (forms center vertical) */}
        <rect x="45" y="47" width="10" height="45" rx="1.5" fill="#8B1E2D" />

        {/* Central Hammer Head (horizontal curved claw & strike face) */}
        <path
          d="M32 36C38 31 46 31 53 31C61 31 68 33 71 36L69 44C66 42 61 41 53 41C45 41 39 43 32 44L32 36Z"
          fill="#8B1E2D"
        />

        {/* Left Crossbar */}
        <rect x="29" y="62" width="16" height="8" fill="#8B1E2D" />

        {/* Right Crossbar */}
        <rect x="55" y="62" width="16" height="8" fill="#8B1E2D" />
      </svg>

      {showWordmark && (
        <span
          className={`font-serif font-bold text-burgundy-900 tracking-tight leading-none ${textSize}`}
        >
          Hammer House
        </span>
      )}
    </div>
  );
}
