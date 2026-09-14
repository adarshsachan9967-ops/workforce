"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Check, X, ChevronDown, Sparkles, Building2 } from "lucide-react";
import { searchConstituencies, ConstituencyItem, popularUPConstituencies } from "@/lib/constituencies";

interface ConstituencySelectorProps {
  selectedAssembly: string;
  selectedDistrict: string;
  onSelect: (item: { assembly: string; district: string; state: string; parliament?: string }) => void;
  onAssemblyChange?: (val: string) => void;
  onDistrictChange?: (val: string) => void;
  assemblyLabel?: string;
  districtLabel?: string;
  required?: boolean;
  theme?: "dark" | "light";
}

export default function ConstituencySelector({
  selectedAssembly,
  selectedDistrict,
  onSelect,
  onAssemblyChange,
  onDistrictChange,
  assemblyLabel = "विधानसभा (Assembly) *",
  districtLabel = "जिला (District) *",
  required = true,
  theme = "dark"
}: ConstituencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ConstituencyItem[]>(popularUPConstituencies);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualMode, setIsManualMode] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter constituencies on search term change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults(popularUPConstituencies);
    } else {
      const matches = searchConstituencies(searchTerm, 15);
      setResults(matches);
    }
    setActiveIndex(0);
  }, [searchTerm]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (item: ConstituencyItem) => {
    onSelect({
      assembly: item.assembly,
      district: item.district,
      state: item.state,
      parliament: item.parliament
    });
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    onSelect({
      assembly: "",
      district: "",
      state: ""
    });
    setSearchTerm("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className="space-y-3" ref={containerRef}>
      {/* Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? "text-slate-300" : "text-navy-900"}`}>
          <MapPin className="w-3.5 h-3.5 text-accent-orange" />
          <span>विधानसभा एवं जिला चयन (Constituency & District)</span>
          {required && <span className="text-accent-orange">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setIsManualMode(!isManualMode)}
          className="text-[11px] text-accent-orange hover:underline font-medium transition cursor-pointer"
        >
          {isManualMode ? "← सर्च ड्रॉपडाउन का उपयोग करें" : "मैन्युअल रूप से टाइप करें"}
        </button>
      </div>

      {!isManualMode ? (
        <div className="relative">
          {/* Selected Preview or Search Trigger */}
          {selectedAssembly ? (
            <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition ${
              isDark
                ? "bg-navy-900/90 border-accent-orange/40 text-white shadow-lg shadow-navy-950/40"
                : "bg-orange-50/70 border-orange-200 text-slate-900 shadow-sm"
            }`}>
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-accent-orange/15 border border-accent-orange/30 flex items-center justify-center text-accent-orange flex-shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm tracking-wide text-accent-gold">
                      {selectedAssembly}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy-800 border border-navy-700 text-slate-300">
                      विधानसभा
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>जिला: <strong className="text-slate-200">{selectedDistrict || "N/A"}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 transition"
                  title="बदलें (Change)"
                >
                  बदलें
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-navy-800 transition"
                  title="हटाएं (Clear)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsOpen(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="विधानसभा या जिला टाइप करें (उदा. Kalyanpur, Kanpur, Varanasi, Lucknow, Agra...)"
                  className={`w-full pl-11 pr-10 py-3.5 rounded-xl text-sm font-medium outline-none transition ${
                    isDark
                      ? "bg-navy-950/80 border border-navy-700 text-white placeholder-slate-500 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange shadow-inner"
                      : "bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange shadow-sm"
                  }`}
                  aria-expanded={isOpen}
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          )}

          {/* Dropdown Results Menu */}
          {isOpen && (
            <div className={`absolute z-50 left-0 right-0 mt-2 rounded-xl border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 ${
              isDark
                ? "bg-navy-900 border-navy-700 divide-y divide-navy-800/80"
                : "bg-white border-slate-200 divide-y divide-slate-100"
            }`}>
              {/* Dropdown Header */}
              <div className={`px-4 py-2.5 flex items-center justify-between text-[11px] font-semibold ${
                isDark ? "bg-navy-950/90 text-slate-400" : "bg-slate-50 text-slate-600"
              }`}>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                  {!searchTerm ? "प्रमुख विधानसभाएं (त्वरित सुझाव)" : `खोज परिणाम (${results.length})`}
                </span>
                <span className="text-[10px] text-slate-500">
                  4,120+ निर्वाचन क्षेत्र (संपूर्ण भारत)
                </span>
              </div>

              {/* Scrollable Results List */}
              <div className="max-h-64 overflow-y-auto divide-y divide-navy-800/50">
                {results.length > 0 ? (
                  results.map((item, index) => {
                    const isSelected = selectedAssembly === item.assembly && selectedDistrict === item.district;
                    const isActive = index === activeIndex;

                    return (
                      <div
                        key={`${item.state}-${item.assembly}-${item.id}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`px-4 py-3 cursor-pointer transition flex items-center justify-between gap-3 ${
                          isActive
                            ? isDark
                              ? "bg-navy-800 text-white"
                              : "bg-orange-50 text-slate-900"
                            : isDark
                            ? "hover:bg-navy-800/70 text-slate-200"
                            : "hover:bg-slate-50 text-slate-700"
                        } ${isSelected ? "border-l-4 border-accent-orange" : ""}`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm tracking-wide text-accent-gold">
                              {item.assembly}
                            </span>
                            {item.code && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-navy-950 border border-navy-800 text-slate-400 font-mono">
                                #{item.code}
                              </span>
                            )}
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 font-medium">
                              {item.state}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-accent-orange" />
                              <span>जिला: <strong className="text-slate-300">{item.district}</strong></span>
                            </span>
                            {item.parliament && item.parliament !== item.district && (
                              <span className="text-[11px] text-slate-500 hidden sm:inline">
                                • लोकसभा: {item.parliament}
                              </span>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-accent-orange flex items-center justify-center text-white flex-shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center space-y-2">
                    <p className="text-xs text-slate-400">
                      &quot;{searchTerm}&quot; के लिए कोई विधानसभा नहीं मिली।
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsManualMode(true);
                        setIsOpen(false);
                      }}
                      className="text-xs text-accent-orange hover:underline font-semibold"
                    >
                      मैन्युअल रूप से नाम दर्ज करें →
                    </button>
                  </div>
                )}
              </div>

              {/* Dropdown Footer Helper */}
              <div className={`px-4 py-2 text-[10px] flex items-center justify-between ${
                isDark ? "bg-navy-950/80 text-slate-500" : "bg-slate-50 text-slate-400"
              }`}>
                <span>चुनने के लिए क्लिक करें या Enter दबाएं</span>
                <span className="text-accent-gold">UP विधानसभा चुनाव 2027</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Manual Fallback Inputs */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-slate-300" : "text-navy-900"}`}>
              {assemblyLabel}
            </label>
            <input
              type="text"
              required={required}
              value={selectedAssembly}
              onChange={(e) => onAssemblyChange && onAssemblyChange(e.target.value)}
              placeholder="उदा. कल्याणपुर (Kalyanpur)"
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition ${
                isDark
                  ? "bg-navy-950/80 border border-navy-700 text-white placeholder-slate-500 focus:border-accent-orange"
                  : "bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-accent-orange"
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-slate-300" : "text-navy-900"}`}>
              {districtLabel}
            </label>
            <input
              type="text"
              required={required}
              value={selectedDistrict}
              onChange={(e) => onDistrictChange && onDistrictChange(e.target.value)}
              placeholder="उदा. कानपुर नगर (Kanpur Nagar)"
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition ${
                isDark
                  ? "bg-navy-950/80 border border-navy-700 text-white placeholder-slate-500 focus:border-accent-orange"
                  : "bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-accent-orange"
              }`}
            />
          </div>
        </div>
      )}

      {/* Hidden inputs to guarantee standard HTML form submission validation */}
      <input type="hidden" name="assembly" value={selectedAssembly} />
      <input type="hidden" name="district" value={selectedDistrict} />
    </div>
  );
}
