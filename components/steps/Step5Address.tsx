import React, { useState, useEffect, useRef } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, Check, MapPin } from 'lucide-react';

interface Step5Props {
  city: string;
  zipCode: string;
  initialAddress?: string;
  initialIsHomeowner?: boolean;
  onBack: () => void;
  onNext: (data: { streetAddress: string; isHomeowner: boolean }) => void;
}

export function Step5Address({
  city,
  zipCode,
  initialAddress = '',
  initialIsHomeowner = true,
  onBack,
  onNext,
}: Step5Props) {
  const [address, setAddress] = useState(initialAddress);
  const [isHomeowner, setIsHomeowner] = useState(initialIsHomeowner);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (address.trim().length >= 2) {
      const query = address.toLowerCase();
      const sampleStreets = [
        'Coble Ave', 'Ocean Dr', 'Biscayne Blvd', 'Palmetto Way', 'Magnolia St', 'Palm Beach Lakes', 'Orange Ave'
      ];
      const numbers = ['1037', '136', '137', '304', '310', '314', '315', '403', '405', '411'];

      const matches = numbers.map((num) => `${num} ${sampleStreets[0]}`);

      if (query.includes('co') || query.includes('c')) {
        setSuggestions(matches);
        setShowDropdown(true);
      } else {
        setSuggestions([
          `1037 ${address.trim()} Ave`,
          `136 ${address.trim()} Ave`,
          `137 ${address.trim()} St`,
          `304 ${address.trim()} Blvd`,
        ]);
        setShowDropdown(true);
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [address]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (selectedAddr: string) => {
    setAddress(selectedAddr);
    setShowDropdown(false);
    if (error) setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[highlightedIndex]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim().length < 4) {
      setError('Please enter your street address.');
      return;
    }

    if (!isHomeowner) {
      setError('You must be the homeowner to continue.');
      return;
    }

    onNext({
      streetAddress: address.trim(),
      isHomeowner,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in text-center">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Headline */}
      <div className="space-y-2 pt-1 max-w-sm mx-auto">
        <h2 className="font-sans text-[22px] sm:text-[26px] font-bold text-[#1E3944] tracking-tight leading-snug">
          What is your street address?
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto text-left">
        {/* Street Address Input with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (error) setError(null);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowDropdown(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Street Address"
            className="w-full h-14 px-5 text-base font-semibold text-[#0F172A] bg-white border-2 border-[#8BA3A8] rounded-xl focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
          />

          {/* Autocomplete Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-[#8BA3A8] rounded-xl shadow-xl overflow-hidden animate-fade-in divide-y divide-slate-100 max-h-56 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                    highlightedIndex === idx
                      ? 'bg-[#0284C7] text-white font-bold'
                      : 'hover:bg-slate-100 text-[#0F172A]'
                  }`}
                >
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* I'm the Home Owner Checkbox */}
        <div className="flex items-center justify-center pt-2">
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isHomeowner}
              onChange={(e) => {
                setIsHomeowner(e.target.checked);
                if (error) setError(null);
              }}
              className="sr-only"
            />
            <div
              className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                isHomeowner
                  ? 'border-[#0D9488] bg-white text-[#0D9488]'
                  : 'border-[#8BA3A8] bg-white'
              }`}
            >
              {isHomeowner && <Check className="w-5 h-5 stroke-[3] text-[#0D9488]" />}
            </div>
            <span className="text-base font-semibold text-[#1E3944]">
              I'm the Home Owner
            </span>
          </label>
        </div>

        {error && (
          <p className="text-xs font-bold text-rose-600 text-center animate-fade-in">
            {error}
          </p>
        )}

        {/* Symmetrical Bottom Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-12 h-12 rounded-full border-2 border-[#8BA3A8] text-[#8BA3A8] hover:text-[#1E3944] hover:border-[#1E3944] transition-colors flex items-center justify-center cursor-pointer shadow-sm shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="flex-1 h-14 bg-[#FBBF77] hover:bg-[#F5A647] active:scale-[0.98] text-white font-sans font-extrabold text-base tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer"
          >
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
