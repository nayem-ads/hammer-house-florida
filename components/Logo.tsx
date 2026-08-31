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
    sm: { w: 26, h: 26 },
    md: { w: 34, h: 34 },
    lg: { w: 44, h: 44 },
    xl: { w: 64, h: 64 },
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-4xl',
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${
        align === 'center' ? 'justify-center' : 'justify-start'
      } ${className}`}
    >
      {/* SVG Vector of Hammer House */}
      <svg
        width={iconDimensions.w}
        height={iconDimensions.h}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Roof Peak */}
        <path d="M50 8L8 38H18L50 16L82 38H92L50 8Z" fill="#8B1122" />
        <rect x="76" y="16" width="9" height="15" fill="#8B1122" />
        {/* Side Pillars */}
        <rect x="18" y="38" width="11" height="54" fill="#8B1122" />
        <rect x="71" y="38" width="11" height="54" fill="#8B1122" />
        {/* Center Hammer */}
        <rect x="45" y="47" width="10" height="45" rx="1.5" fill="#8B1122" />
        <path
          d="M32 36C38 31 46 31 53 31C61 31 68 33 71 36L69 44C66 42 61 41 53 41C45 41 39 43 32 44L32 36Z"
          fill="#8B1122"
        />
        {/* Crossbars */}
        <rect x="29" y="62" width="16" height="8" fill="#8B1122" />
        <rect x="55" y="62" width="16" height="8" fill="#8B1122" />
      </svg>

      {showWordmark && (
        <span
          className={`font-sans font-black text-[#0F172A] tracking-[-0.03em] leading-none ${textSize}`}
        >
          Hammer House
        </span>
      )}
    </div>
  );
}
