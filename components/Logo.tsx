import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center';
}

export function HammerHouseLogo({
  className = '',
  size = 'md',
  align = 'center',
}: LogoProps) {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 30;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl sm:text-[22px]';

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${
        align === 'center' ? 'justify-center' : 'justify-start'
      } ${className}`}
    >
      {/* SVG Vector of Hammer House */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path d="M50 8L8 38H18L50 16L82 38H92L50 8Z" fill="#8B1122" />
        <rect x="76" y="16" width="9" height="15" fill="#8B1122" />
        <rect x="18" y="38" width="11" height="54" fill="#8B1122" />
        <rect x="71" y="38" width="11" height="54" fill="#8B1122" />
        <rect x="45" y="47" width="10" height="45" rx="1.5" fill="#8B1122" />
        <path
          d="M32 36C38 31 46 31 53 31C61 31 68 33 71 36L69 44C66 42 61 41 53 41C45 41 39 43 32 44L32 36Z"
          fill="#8B1122"
        />
        <rect x="29" y="62" width="16" height="8" fill="#8B1122" />
        <rect x="55" y="62" width="16" height="8" fill="#8B1122" />
      </svg>

      <span className={`font-sans font-extrabold text-[#111827] tracking-tight leading-none ${textSize}`}>
        Hammer House
      </span>
    </div>
  );
}
