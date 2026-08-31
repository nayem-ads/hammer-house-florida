import React, { useState, useEffect, useRef } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, Check } from 'lucide-react';

interface Step5Props {
  city: string;
  zipCode: string;
  initialAddress?: string;
  initialIsHomeowner?: boolean;
  onBack: () => void;
  onNext: (data: { streetAddress: string; isHomeowner: boolean }) => void;
}

export function Step5Address({ initialAddress = '', initialIsHomeowner = true, onBack, onNext }: Step5Props) {
  const [address, setAddress] = useState(initialAddress);
  const [isHomeowner, setIsHomeowner] = useState(initialIsHomeowner);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (address.trim().length >= 2) {
      const numbers = ['1037', '136', '137', '304', '310', '314', '315', '403', '405', '411'];
      setSuggestions(numbers.map((n) => `${n} Coble Ave`));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [address]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (addr: string) => {
    setAddress(addr);
    setShowDropdown(false);
    if (error) setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || !suggestions.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightedIndex((p) => (p < suggestions.length - 1 ? p + 1 : 0)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightedIndex((p) => (p > 0 ? p - 1 : suggestions.length - 1)); }
    else if (e.key === 'Enter' && highlightedIndex >= 0) { e.preventDefault(); handleSelect(suggestions[highlightedIndex]); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim().length < 4) { setError('Please enter your street address.'); return; }
    if (!isHomeowner) { setError('You must be the homeowner to continue.'); return; }
    onNext({ streetAddress: address.trim(), isHomeowner });
  };

  return (
    <div className="text-center animate-fade-in">
      <HammerHouseLogo size="md" align="center" />

      <h2 className="mt-10 mb-8 text-[24px] sm:text-[28px] font-bold text-[#1E3A3A] leading-tight italic">
        What is your street address?
      </h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* Address input with dropdown */}
        <div className="relative mb-6" ref={dropdownRef}>
          <input
            type="text"
            value={address}
            onChange={(e) => { setAddress(e.target.value); if (error) setError(null); }}
            onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
            onKeyDown={handleKeyDown}
            placeholder="Street Address"
            className="w-full h-14 text-center text-base font-normal text-[#1E3A3A] bg-white border border-[#A3B8B0] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />

          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-[#A3B8B0] rounded-xl shadow-lg overflow-hidden divide-y divide-slate-100 max-h-64 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors cursor-pointer ${
                    highlightedIndex === idx ? 'bg-[#2563EB] text-white' : 'hover:bg-slate-50 text-[#1E3A3A]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Homeowner checkbox */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={isHomeowner} onChange={(e) => { setIsHomeowner(e.target.checked); if (error) setError(null); }} className="sr-only" />
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
              isHomeowner ? 'border-[#7EC8D9] bg-white text-[#7EC8D9]' : 'border-[#A3B8B0] bg-white'
            }`}>
              {isHomeowner && <Check className="w-5 h-5 stroke-[2.5]" />}
            </div>
            <span className="text-base font-normal text-[#1E3A3A]">I'm the Home Owner</span>
          </label>
        </div>

        {error && <p className="text-sm font-medium text-rose-600 mb-4">{error}</p>}

        {/* Navigation */}
        <div className="flex items-center gap-4 pt-4">
          <button type="button" onClick={onBack} className="w-12 h-12 rounded-full border border-[#A3B8B0] text-[#A3B8B0] hover:text-[#1E3A3A] hover:border-[#1E3A3A] transition-colors flex items-center justify-center cursor-pointer shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button type="submit" className="flex-1 h-14 bg-[#F5C882] hover:bg-[#EDB960] active:scale-[0.98] text-white font-sans font-bold text-base tracking-widest rounded-xl transition-all flex items-center justify-center cursor-pointer">
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
