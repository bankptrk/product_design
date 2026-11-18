"use client";

import React from "react";
import { Star, RotateCcw, Check, Sparkles } from "lucide-react";
import { FilterState } from "@/types/product";

export interface CategoryCount {
  name: string;
  count: number;
}

export interface BrandCount {
  name: string;
  count: number;
}

export interface ProductFiltersProps {
  categories: CategoryCount[];
  brands: BrandCount[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  className?: string;
}

export default function ProductFilters({
  categories,
  brands,
  filters,
  onFilterChange,
  onResetFilters,
  className = "",
}: ProductFiltersProps) {
  // Check if any filter is active
  const hasActiveFilters =
    filters.category !== "All" ||
    filters.searchTerm !== "" ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100 ||
    filters.brands.length > 0 ||
    filters.minRating !== null ||
    filters.inStockOnly ||
    filters.onSaleOnly;

  const handleCategorySelect = (cat: string) => {
    onFilterChange({
      ...filters,
      category: cat,
    });
  };

  const handleBrandToggle = (brand: string) => {
    const isSelected = filters.brands.includes(brand);
    const newBrands = isSelected
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];

    onFilterChange({
      ...filters,
      brands: newBrands,
    });
  };

  const handleRatingSelect = (rating: number | null) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? null : rating,
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({
      ...filters,
      priceRange: [Math.max(0, min), Math.max(min, max)],
    });
  };

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Header bar with Reset action */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Filters</span>
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-amber-600 hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
          Department
        </h4>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => handleCategorySelect(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                  isSelected
                    ? "bg-amber-100 text-amber-950 font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                }`}
              >
                <span className="truncate pr-2">{cat.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isSelected
                      ? "bg-amber-400 text-gray-900"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Filter */}
      <div className="space-y-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
            Price Range
          </h4>
          <span className="text-xs font-bold text-amber-600">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>

        {/* Min / Max inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-gray-400 block mb-1">Min ($)</label>
            <input
              type="number"
              min={0}
              max={filters.priceRange[1]}
              value={filters.priceRange[0]}
              onChange={(e) =>
                handlePriceChange(Number(e.target.value), filters.priceRange[1])
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-hidden focus:border-amber-400"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 block mb-1">Max ($)</label>
            <input
              type="number"
              min={filters.priceRange[0]}
              max={100}
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceChange(filters.priceRange[0], Number(e.target.value))
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-hidden focus:border-amber-400"
            />
          </div>
        </div>

        {/* Quick price tier pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { label: "Under $5", min: 0, max: 5 },
            { label: "$5 - $10", min: 5, max: 10 },
            { label: "$10 - $20", min: 10, max: 20 },
            { label: "$20+", min: 20, max: 100 },
          ].map((tier) => {
            const isTierActive =
              filters.priceRange[0] === tier.min &&
              filters.priceRange[1] === tier.max;
            return (
              <button
                key={tier.label}
                type="button"
                onClick={() => handlePriceChange(tier.min, tier.max)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer border ${
                  isTierActive
                    ? "bg-amber-400 text-gray-900 border-amber-500 font-bold"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-900"
                }`}
              >
                {tier.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Availability & Deals */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
          Special Offers
        </h4>
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-700 py-1 hover:text-gray-900 select-none">
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, onSaleOnly: e.target.checked })
            }
            className="w-4 h-4 rounded text-amber-500 border-gray-300 focus:ring-amber-400 accent-[#fab528]"
          />
          <span className="font-medium">On Sale / Discounted</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-700 py-1 hover:text-gray-900 select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="w-4 h-4 rounded text-amber-500 border-gray-300 focus:ring-amber-400 accent-[#fab528]"
          />
          <span className="font-medium">In Stock Only</span>
        </label>
      </div>

      {/* 4. Brand Filter */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
          Brands
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => {
            const isChecked = filters.brands.includes(brand.name);
            return (
              <label
                key={brand.name}
                className="flex items-center justify-between text-xs text-gray-700 py-1 px-1.5 rounded hover:bg-gray-50 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandToggle(brand.name)}
                    className="w-4 h-4 rounded text-amber-500 border-gray-300 focus:ring-amber-400 accent-[#fab528]"
                  />
                  <span className={`truncate ${isChecked ? "font-bold text-gray-900" : ""}`}>
                    {brand.name}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  ({brand.count})
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Rating Filter */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
          Customer Rating
        </h4>
        <div className="space-y-1">
          {[5, 4, 3].map((star) => {
            const isSelected = filters.minRating === star;
            return (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingSelect(star)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-amber-50 text-amber-900 font-bold border border-amber-200"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < star
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700">
                    {star === 5 ? "5.0 only" : `${star}.0 & above`}
                  </span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
