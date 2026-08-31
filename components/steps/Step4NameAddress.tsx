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
      const streetTypes = ['Ave', 'St', 'Blvd', 'Dr', 'Way', 'Lane', 'Court'];
      const numbers = ['1037', '2509', '412', '780', '1240'];
      
      const sampleStreets = [
        'Biscayne', 'Ocean', 'Palmetto', 'Coble', 'Magnolia', 'Cypress', 'Palm Beach', 'Orange', 'Sunshine', 'Gulf'
      ];

      const matches = sampleStreets
        .filter((s) => s.toLowerCase().includes(query) || query.includes(s.toLowerCase().slice(0, 2)))
        .flatMap((s) => [
          `${numbers[0]} ${s} ${streetTypes[0]}`,
          `${numbers[1]} ${s} ${streetTypes[1]}`,
          `${numbers[2]} ${s} ${streetTypes[2]}`,
        ])
        .slice(0, 5);

      if (matches.length > 0) {
        setSuggestions(matches);
        setShowDropdown(true);
      } else {
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
    <div className="space-y-6 animate-fade-in">
      {/* Brand Header */}
      <div className="text-center space-y-2.5">
        <HammerHouseLogo size="sm" align="center" />
        <div className="pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1122] bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Step 2 of 4 • Property & Identity
          </span>
          <h2 className="font-sans text-2xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-tight mt-3">
            Who and where is this estimate for?
          </h2>
          <p className="text-sm font-medium text-[#1E293B] max-w-md mx-auto leading-normal pt-1">
            Required to verify satellite roof dimensions in <span className="font-bold text-[#0F172A]">{city}, FL</span>
          </p>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="bg-slate-100 border border-slate-300 rounded-xl p-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center shrink-0 shadow-sm">
          <Bell className="w-4 h-4 text-[#8B1122]" />
        </div>
        <p className="text-xs sm:text-sm font-bold text-[#0F172A]">
          Your matches are almost ready! 3 verified contractors found in {city}.
        </p>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
            Full Name <span className="text-[#8B1122]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <User className="w-4 h-4 text-[#8B1122]" />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
              }}
              placeholder="e.g. John Smith"
              className="w-full h-13 pl-10 pr-4 text-base font-semibold text-[#0F172A] bg-white border-2 border-slate-300 rounded-xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              autoFocus
            />
          </div>
          {errors.fullName && (
            <p className="text-xs font-bold text-rose-600 animate-fade-in">{errors.fullName}</p>
          )}
        </div>

        {/* Street Address Field with Autocomplete Dropdown */}
        <div className="space-y-1.5 text-left relative" ref={dropdownRef}>
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
            Street Address <span className="text-[#8B1122]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Home className="w-4 h-4 text-[#8B1122]" />
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
              className="w-full h-13 pl-10 pr-4 text-base font-semibold text-[#0F172A] bg-white border-2 border-slate-300 rounded-xl focus:border-[#8B1122] focus:ring-4 focus:ring-[#8B1122]/15 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              autoComplete="street-address"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-white border-2 border-slate-300 rounded-xl shadow-xl overflow-hidden animate-fade-in divide-y divide-slate-100 max-h-56 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                    highlightedIndex === idx
                      ? 'bg-blue-600 text-white font-bold'
                      : 'hover:bg-slate-100 text-[#0F172A]'
                  }`}
                >
                  <MapPin className={`w-4 h-4 shrink-0 ${highlightedIndex === idx ? 'text-white' : 'text-[#8B1122]'}`} />
                  <span className="truncate">{item}</span>
                </button>
              ))}
            </div>
          )}

          {errors.address && (
            <p className="text-xs font-bold text-rose-600 animate-fade-in">{errors.address}</p>
          )}
        </div>

        {/* Homeowner Checkbox */}
        <div className="pt-1">
          <label className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-slate-300 bg-white hover:border-[#8B1122] transition-colors cursor-pointer select-none">
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
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                isHomeowner
                  ? 'bg-[#8B1122] border-[#8B1122] text-white'
                  : 'bg-white border-slate-400'
              }`}
            >
              {isHomeowner && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span className="text-sm font-bold text-[#0F172A]">
              I'm the Home Owner
            </span>
          </label>
          {errors.isHomeowner && (
            <p className="text-xs font-bold text-rose-600 mt-1 text-left animate-fade-in">
              {errors.isHomeowner}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-12 h-12 rounded-full border border-slate-300 bg-white text-[#0F172A] hover:text-[#8B1122] hover:border-[#8B1122] transition-colors flex items-center justify-center cursor-pointer shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="flex-1 ml-4 h-13 bg-[#8B1122] hover:bg-[#730C1A] active:scale-[0.98] text-white font-sans font-bold text-sm sm:text-base tracking-wide rounded-xl shadow-btn transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>NEXT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
