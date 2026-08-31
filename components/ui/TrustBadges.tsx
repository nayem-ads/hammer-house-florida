import React from 'react';
import { ShieldCheck, Wind, Clock, Star } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'compact' | 'cards';
  className?: string;
}

export function TrustBadges({ variant = 'horizontal', className = '' }: TrustBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-charcoal-600 ${className}`}>
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-burgundy-700 shrink-0" />
          <span>FL DBPR Certified (CCC)</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-charcoal-300 hidden sm:block" />
        <div className="flex items-center gap-1.5 font-medium">
          <Wind className="w-4 h-4 text-burgundy-700 shrink-0" />
          <span>130+ MPH Wind Code</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-charcoal-300 hidden sm:block" />
        <div className="flex items-center gap-1.5 font-medium">
          <Clock className="w-4 h-4 text-burgundy-700 shrink-0" />
          <span>60-Sec Free Match</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-4 border-t border-linen-300/70 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
        {/* Badge 1 */}
        <div className="flex items-center justify-center sm:justify-start gap-2.5 px-3 py-2 rounded-xl bg-linen-100/60 border border-linen-200/80">
          <div className="w-8 h-8 rounded-lg bg-burgundy-50 border border-burgundy-200/60 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-burgundy-700" />
          </div>
          <div>
            <p className="text-xs font-bold text-charcoal-900 leading-tight">100% DBPR Verified</p>
            <p className="text-[11px] text-charcoal-500 leading-tight">Active Florida CCC License</p>
          </div>
        </div>

        {/* Badge 2 */}
        <div className="flex items-center justify-center sm:justify-start gap-2.5 px-3 py-2 rounded-xl bg-linen-100/60 border border-linen-200/80">
          <div className="w-8 h-8 rounded-lg bg-burgundy-50 border border-burgundy-200/60 flex items-center justify-center shrink-0">
            <Wind className="w-4 h-4 text-burgundy-700" />
          </div>
          <div>
            <p className="text-xs font-bold text-charcoal-900 leading-tight">130+ MPH Hurricane</p>
            <p className="text-[11px] text-charcoal-500 leading-tight">Wind Mitigation Ready</p>
          </div>
        </div>

        {/* Badge 3 */}
        <div className="flex items-center justify-center sm:justify-start gap-2.5 px-3 py-2 rounded-xl bg-linen-100/60 border border-linen-200/80">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-charcoal-900 leading-tight">4.9 / 5.0 Rating</p>
            <p className="text-[11px] text-charcoal-500 leading-tight">Florida Homeowners</p>
          </div>
        </div>
      </div>
    </div>
  );
}
