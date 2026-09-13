import React, { useState, useEffect, useRef } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

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

  // Generate realistic Florida address suggestions only when user types
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddress(val);
    if (error) setError(null);

    if (val.trim().length >= 2) {
      const sampleStreets = [
        'Coble Ave', 'Ocean Dr', 'Biscayne Blvd', 'Palmetto Way', 'Magnolia St', 'Palm Beach Lakes Blvd', 'Orange Ave', 'Sunshine Blvd', 'Gulf to Bay Blvd', 'Atlantic Ave'
      ];
      const numbers = ['1037', '136', '137', '304', '310', '314', '315', '403', '405', '411'];
      
      const query = val.toLowerCase().trim();
      const filtered = sampleStreets.filter((s) => s.toLowerCase().includes(query));
      const streetsToUse = filtered.length > 0 ? filtered : sampleStreets;
      
      const generated = numbers.slice(0, 5).map((num, i) => `${num} ${streetsToUse[i % streetsToUse.length]}`);
      setSuggestions(generated);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Instant single-click selection (with onMouseDown to prevent blur race conditions)
  const handleSelectSuggestion = (selectedAddr: string) => {
    setAddress(selectedAddr);
    setSuggestions([]);
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
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
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
    <div className="animate-fade-in text-center">
      {/* Brand Header */}
      <HammerHouseLogo size="md" align="center" />

      {/* Headline */}
      <h2 className="mt-8 mb-6 font-sans text-[24px] sm:text-[28px] font-bold text-[#0F172A] leading-snug">
        What is your street address?
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-5 text-left">
        {/* Street Address Input with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            onFocus={() => {
              if (address.trim().length >= 2 && suggestions.length > 0) {
                setShowDropdown(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Street Address"
            className="w-full h-[52px] text-center text-base text-[#0F172A] bg-white border border-[#CBD5E1] rounded-xl focus:border-[#8B1122] focus:ring-2 focus:ring-[#8B1122]/10 transition-all outline-none placeholder:text-[#94A3B8]"
            autoFocus
            autoComplete="street-address"
          />

          {/* Autocomplete Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-[#CBD5E1] rounded-xl shadow-lg overflow-hidden animate-fade-in divide-y divide-slate-100 max-h-56 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevents input blur before click
                    handleSelectSuggestion(item);
                  }}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer select-none ${
                    highlightedIndex === idx
                      ? 'bg-[#8B1122] text-white font-bold'
                      : 'hover:bg-slate-100 text-[#0F172A]'
                  }`}
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* I'm the Home Owner Checkbox */}
        <div className="flex items-center justify-center pt-1 pb-1">
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
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                isHomeowner
                  ? 'border-[#8B1122] bg-[#8B1122] text-white shadow-sm'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {isHomeowner && <Check className="w-4 h-4 stroke-[3] text-white" />}
            </div>
            <span className="text-sm sm:text-base font-semibold text-[#0F172A]">
              I'm the Home Owner
            </span>
          </label>
        </div>

        {error && (
          <p className="text-xs font-medium text-rose-600 text-center animate-fade-in">
            {error}
          </p>
        )}

        {/* Symmetrical Bottom Controls */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-11 h-11 rounded-full border border-[#CBD5E1] text-[#94A3B8] hover:text-[#0F172A] hover:border-[#0F172A] transition-colors flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>

          <button
            type="submit"
            className="flex-1 h-[52px] bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] text-white font-sans font-bold text-[15px] tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>NEXT</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
