"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
  icon?: React.ElementType;
}

interface CustomDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}

export default function CustomDropdown({ value, onChange, options }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-white/50 bg-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-accent backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          {selectedOption.icon && (
            <selectedOption.icon className="w-5 h-5 opacity-70" />
          )}
          <span>{selectedOption.label}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-2xl border border-white/60 rounded-xl shadow-xl overflow-hidden p-1">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-3 transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-accent hover:bg-white/80"
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {Icon && <Icon className="w-4 h-4 opacity-70" />}
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
