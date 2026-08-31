import React, { useState, useEffect, useRef } from 'react';
import { HammerHouseLogo } from '../Logo';
import { ArrowLeft, ArrowRight, User, Home, Check, Bell, MapPin } from 'lucide-react';

interface Step4Props {
  city: string;
  zipCode: string;
  initialFullName?: string;
  initialAddress?: string;
  initialIsHomeowner?: boolean;
  onBack: () => void;
  onNext: (data: { fullName: string; streetAddress: string; isHomeowner: boolean }) => void;
}

export function Step4NameAddress({
  city,
  zipCode,
  initialFullName = '',
  initialAddress = '',
  initialIsHomeowner = true,
  onBack,
  onNext,
}: Step4Props) {
  const [fullName, setFullName] = useState(initialFullName);
  const [address, setAddress] = useState(initialAddress);
  const [isHomeowner, setIsHomeowner] = useState(initialIsHomeowner);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [errors, setErrors] = useState<{ fullName?: string; address?: string; isHomeowner?: string }>({});

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Address suggestions generation based on Florida city/streets
  useEffect(() => {
    if (address.trim().length >= 2) {
      const query = address.toLowerCase();
      // Realistic Florida address pattern generator
      const streetTypes = ['Ave', 'St', 'Blvd', 'Dr', 'Way', 'Lane', 'Court', 'Circle', 'Ocean Dr', 'Palmetto Way'];
      const numbers = ['1037', '2509', '412', '780', '1240', '350', '8820', '510', '1904', '620'];
      
      const sampleStreets = [
        'Biscayne', 'Ocean', 'Palmetto', 'Coble', 'Magnolia', 'Cypress', 'Palm Beach', 'Orange', 'Sunshine', 'Gulf'
      ];

      const matches = sampleStreets
        .filter((s) => s.toLowerCase().includes(query) || query.includes(s.toLowerCase().slice(0, 2)))
        .flatMap((s) => [
          `${numbers[0]} ${s} ${streetTypes[0]}`,
          `${numbers[1]} ${s} ${streetTypes[1]}`,
          `${numbers[2]} ${s} ${streetTypes[2]}`,
          `${numbers[3]} ${s} ${streetTypes[3]}`,
        ])
        .slice(0, 5);

      if (matches.length > 0) {
        setSuggestions(matches);
        setShowDropdown(true);
      } else {
        // Fallback realistic suggestions matching what user types
        setSuggestions([
          `${address.trim()} Ave, ${city}, FL ${zipCode}`,
          `${address.trim()} St, ${city}, FL ${zipCode}`,
          `${address.trim()} Blvd, ${city}, FL ${zipCode}`,
        ]);
        setShowDropdown(true);
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [address, city, zipCode]);

  // Click outside listener for dropdown
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
    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
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
    const newErrors: { fullName?: string; address?: string; isHomeowner?: string } = {};

    const nameParts = fullName.trim().split(' ').filter(Boolean);
    if (nameParts.length < 2 || fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter both your first and last name.';
    }

    if (address.trim().length < 5) {
      newErrors.address = 'Please enter a valid street address.';
    }

    if (!isHomeowner) {
      newErrors.isHomeowner = 'You must be the homeowner or decision maker to request an estimate.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({
      fullName: fullName.trim(),
      streetAddress: address.trim(),
      isHomeowner,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <HammerHouseLogo size="sm" align="center" />
        <div className="pt-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-burgundy-700 bg-burgundy-50 px-3 py-1 rounded-full border border-burgundy-200/50">
            Step 2 of 4 • Property & Identity
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight leading-[1.2] mt-3">
            Who and where is this estimate for?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed pt-1">
            Required to verify satellite roof dimensions & local service radius in <span className="font-semibold text-charcoal-800">{city}, FL</span>
          </p>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="bg-linen-100/90 border border-linen-200/80 rounded-xl p-3 sm:p-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-burgundy-50 border border-burgundy-200 flex items-center justify-center shrink-0">
          <Bell className="w-4 h-4 text-burgundy-700 animate-pulse" />
        </div>
        <p className="text-xs sm:text-sm font-semibold text-charcoal-800">
          Great news! 3 certified contractors are currently available in {city}.
        </p>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
            Full Name <span className="text-burgundy-700">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
              <User className="w-4 h-4 text-burgundy-700" />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
              }}
              placeholder="e.g. John Smith"
              className="w-full h-12 pl-10 pr-4 text-base text-charcoal-900 bg-white border-2 border-charcoal-200 rounded-xl focus:border-burgundy-700 focus:ring-4 focus:ring-burgundy-700/10 transition-all outline-none placeholder:text-charcoal-400 shadow-sm"
              autoFocus
            />
          </div>
          {errors.fullName && (
            <p className="text-xs font-medium text-rose-600 animate-fade-in">{errors.fullName}</p>
          )}
        </div>

        {/* Street Address Field with Autocomplete Dropdown */}
        <div className="space-y-1.5 text-left relative" ref={dropdownRef}>
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
            Street Address <span className="text-burgundy-700">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
              <Home className="w-4 h-4 text-burgundy-700" />
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
              }}
              onFocus={() => {
                if (suggestions.length > 0) setShowDropdown(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Start typing your street address..."
              className="w-full h-12 pl-10 pr-4 text-base text-charcoal-900 bg-white border-2 border-charcoal-200 rounded-xl focus:border-burgundy-700 focus:ring-4 focus:ring-burgundy-700/10 transition-all outline-none placeholder:text-charcoal-400 shadow-sm"
              autoComplete="street-address"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-charcoal-200 rounded-xl shadow-xl overflow-hidden animate-fade-in divide-y divide-charcoal-100 max-h-56 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors cursor-pointer ${
                    highlightedIndex === idx
                      ? 'bg-blue-600 text-white font-medium'
                      : 'hover:bg-linen-100 text-charcoal-800'
                  }`}
                >
                  <MapPin className={`w-4 h-4 shrink-0 ${highlightedIndex === idx ? 'text-white' : 'text-burgundy-700'}`} />
                  <span className="truncate">{item}</span>
                </button>
              ))}
            </div>
          )}

          {errors.address && (
            <p className="text-xs font-medium text-rose-600 animate-fade-in">{errors.address}</p>
          )}
        </div>

        {/* Homeowner Checkbox */}
        <div className="pt-2">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-charcoal-200 bg-white/70 hover:bg-white hover:border-charcoal-300 transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isHomeowner}
              onChange={(e) => {
                setIsHomeowner(e.target.checked);
                if (errors.isHomeowner) setErrors((prev) => ({ ...prev, isHomeowner: undefined }));
              }}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                isHomeowner
                  ? 'bg-burgundy-700 border-burgundy-700 text-white'
                  : 'bg-white border-charcoal-300'
              }`}
            >
              {isHomeowner && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-charcoal-800">
              I am the homeowner or authorized decision-maker
            </span>
          </label>
          {errors.isHomeowner && (
            <p className="text-xs font-medium text-rose-600 mt-1 text-left animate-fade-in">
              {errors.isHomeowner}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-3">
          <button
            type="button"
            onClick={onBack}
            className="w-12 h-12 rounded-full border border-charcoal-200 bg-white text-charcoal-600 hover:text-burgundy-700 hover:border-burgundy-300 transition-colors flex items-center justify-center cursor-pointer shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="flex-1 ml-4 h-12 bg-burgundy-700 hover:bg-burgundy-800 active:scale-[0.99] text-white font-sans font-bold text-sm tracking-wide rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>CONTINUE TO FINAL STEP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
