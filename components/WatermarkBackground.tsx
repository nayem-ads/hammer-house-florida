import React from 'react';

export function WatermarkBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#FAF8F5]">
      {/* Subtle warm ambient lighting */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-burgundy-100/40 via-linen-200/20 to-transparent blur-3xl rounded-full" />
      
      {/* Architectural blueprint faint linework watermark */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] stroke-burgundy-900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="arch-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arch-grid)" />
      </svg>

      {/* Large Centered Watermark Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] opacity-[0.035] transition-opacity duration-700">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-burgundy-900"
        >
          {/* Roof */}
          <path d="M50 8L8 38H18L50 16L82 38H92L50 8Z" fill="currentColor" />
          <rect x="76" y="16" width="9" height="15" fill="currentColor" />
          {/* Pillars */}
          <rect x="18" y="38" width="11" height="54" fill="currentColor" />
          <rect x="71" y="38" width="11" height="54" fill="currentColor" />
          {/* Hammer */}
          <rect x="45" y="47" width="10" height="45" rx="1.5" fill="currentColor" />
          <path
            d="M32 36C38 31 46 31 53 31C61 31 68 33 71 36L69 44C66 42 61 41 53 41C45 41 39 43 32 44L32 36Z"
            fill="currentColor"
          />
          <rect x="29" y="62" width="16" height="8" fill="currentColor" />
          <rect x="55" y="62" width="16" height="8" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
