import React from 'react';

export function WatermarkBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#F8F9FA]">
      {/* Subtle clean radial ambient depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-red-100/30 via-slate-100/40 to-transparent blur-3xl rounded-full" />

      {/* Single, Clean Centered Hammer House Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.032] transition-opacity duration-500">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#8B1122]"
        >
          {/* Roof Peak */}
          <path d="M50 8L8 38H18L50 16L82 38H92L50 8Z" fill="currentColor" />
          <rect x="76" y="16" width="9" height="15" fill="currentColor" />
          {/* Side Pillars */}
          <rect x="18" y="38" width="11" height="54" fill="currentColor" />
          <rect x="71" y="38" width="11" height="54" fill="currentColor" />
          {/* Center Hammer */}
          <rect x="45" y="47" width="10" height="45" rx="1.5" fill="currentColor" />
          <path
            d="M32 36C38 31 46 31 53 31C61 31 68 33 71 36L69 44C66 42 61 41 53 41C45 41 39 43 32 44L32 36Z"
            fill="currentColor"
          />
          {/* Crossbars */}
          <rect x="29" y="62" width="16" height="8" fill="currentColor" />
          <rect x="55" y="62" width="16" height="8" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
