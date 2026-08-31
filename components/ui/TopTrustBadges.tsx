import React from 'react';

export function TopTrustBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 pb-3 ${className}`}>
      {/* Google 5-Star Rating Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
        {/* Google Logo */}
        <div className="flex items-center">
          <svg className="w-16 h-5" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="19" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700">
              <tspan fill="#4285F4">G</tspan>
              <tspan fill="#EA4335">o</tspan>
              <tspan fill="#FBBC05">o</tspan>
              <tspan fill="#4285F4">g</tspan>
              <tspan fill="#34A853">l</tspan>
              <tspan fill="#EA4335">e</tspan>
            </text>
          </svg>
        </div>

        {/* 5 Gold Stars */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <span className="text-xs font-bold text-[#0F172A]">4.9</span>
      </div>

      {/* Trustpilot 5-Star Rating Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
        {/* Trustpilot Star & Text */}
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#00B67A] fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs font-bold text-[#0F172A] tracking-tight">Trustpilot</span>
        </div>

        {/* 5 Green Squares with White Star inside */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 bg-[#00B67A] rounded-[2px] flex items-center justify-center">
              <svg className="w-2.5 h-2.5 fill-white text-white" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          ))}
        </div>
        <span className="text-xs font-bold text-[#0F172A]">4.8</span>
      </div>
    </div>
  );
}
