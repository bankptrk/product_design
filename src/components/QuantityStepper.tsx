"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

export interface QuantityStepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const sizeConfig = {
  sm: {
    container: "p-0.5 rounded-md",
    button: "w-6 h-6 rounded text-gray-700",
    icon: "w-2.5 h-2.5",
    counter: "w-7 text-xs",
  },
  md: {
    container: "p-0.5 sm:p-1 rounded-lg",
    button: "w-7 h-7 rounded text-gray-700",
    icon: "w-3 h-3",
    counter: "w-8 sm:w-9 text-xs sm:text-sm",
  },
  lg: {
    container: "p-1 rounded-xl",
    button: "w-9 h-9 rounded-lg text-gray-800",
    icon: "w-4 h-4",
    counter: "w-12 text-sm sm:text-base",
  },
};

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  disabled = false,
  ariaLabel = "Quantity",
  className = "",
}: QuantityStepperProps) {
  const currentSize = sizeConfig[size];

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || value <= min) return;
    onChange(Math.max(min, value - 1));
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || value >= max) return;
    onChange(Math.min(max, value + 1));
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`inline-flex items-center border border-gray-200 bg-gray-50/70 select-none ${currentSize.container} ${className}`}
    >
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={handleDecrement}
        className={`${currentSize.button} bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-2xs cursor-pointer active:scale-95`}
        aria-label="Decrease quantity"
      >
        <Minus className={currentSize.icon} />
      </button>

      <span
        className={`${currentSize.counter} font-mono font-bold text-center text-gray-900 tracking-tight tabular-nums`}
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={handleIncrement}
        className={`${currentSize.button} bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-2xs cursor-pointer active:scale-95`}
        aria-label="Increase quantity"
      >
        <Plus className={currentSize.icon} />
      </button>
    </div>
  );
}
