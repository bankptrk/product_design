"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  itemsCount: number;
  icon: React.ReactNode;
  isActive?: boolean;
}

export default function CategorySlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Breads & Sweets");

  const categories: Category[] = [
    {
      id: "fruits",
      name: "Fruits &\nVegetables",
      itemsCount: 124,
      icon: (
        <svg className="w-10 h-10 text-amber-500" viewBox="0 0 48 48" fill="none">
          {/* Fresh citrus / apple */}
          <circle cx="24" cy="26" r="14" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
          <path d="M24 12C24 9 27 7 30 7C30 10 27 12 24 12Z" fill="#10B981" stroke="#059669" strokeWidth="2" strokeLinejoin="round" />
          <path d="M24 12V16" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 25C19 23 21 21 24 21" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "breads",
      name: "Breads &\nSweets",
      itemsCount: 86,
      icon: (
        <svg className="w-10 h-10 text-amber-600" viewBox="0 0 48 48" fill="none">
          {/* French baguette / loaf */}
          <path
            d="M10 32C8 28 9 22 13 18L30 10C34 8 39 10 40 14C41 18 39 23 35 27L18 35C14 37 11 35 10 32Z"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="18" y1="21" x2="22" y2="28" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="18" x2="29" y2="25" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
          <line x1="31" y1="15" x2="35" y2="22" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      isActive: true,
    },
    {
      id: "seafood",
      name: "Frozen\nSeafoods",
      itemsCount: 54,
      icon: (
        <svg className="w-10 h-10 text-sky-500" viewBox="0 0 48 48" fill="none">
          {/* Crab / Seafood */}
          <ellipse cx="24" cy="26" rx="10" ry="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="21" cy="23" r="1.5" fill="#0369A1" />
          <circle cx="27" cy="23" r="1.5" fill="#0369A1" />
          <path d="M15 22C11 18 9 13 13 10C16 7 19 12 17 15" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <path d="M33 22C37 18 39 13 35 10C32 7 29 12 31 15" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 27L9 29M14 30L10 34" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 27L39 29M34 30L38 34" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "meats",
      name: "Raw\nMeats",
      itemsCount: 68,
      icon: (
        <svg className="w-10 h-10 text-rose-500" viewBox="0 0 48 48" fill="none">
          {/* Raw steak meat */}
          <path
            d="M13 28C10 24 10 18 15 14C20 10 32 10 36 15C40 20 38 29 32 33C26 37 16 33 13 28Z"
            fill="#FFE4E6"
            stroke="#E11D48"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="22" cy="21" r="3.5" fill="#FFFFFF" stroke="#BE123C" strokeWidth="2" />
          <path d="M27 23C29 25 32 26 34 25" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "wines",
      name: "Wines &\nAlcohol Drinks",
      itemsCount: 92,
      icon: (
        <svg className="w-10 h-10 text-amber-700" viewBox="0 0 48 48" fill="none">
          {/* Wine bottle & glass */}
          <rect x="15" y="16" width="7" height="18" rx="2" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
          <rect x="17" y="10" width="3" height="6" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
          <path d="M26 21H33C33 25 31 28 29.5 28C28 28 26 25 26 21Z" fill="#FEE2E2" stroke="#B91C1C" strokeWidth="2" />
          <line x1="29.5" y1="28" x2="29.5" y2="34" stroke="#B91C1C" strokeWidth="2" />
          <line x1="27" y1="34" x2="32" y2="34" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "coffees",
      name: "Coffees\nand Teas",
      itemsCount: 74,
      icon: (
        <svg className="w-10 h-10 text-amber-800" viewBox="0 0 48 48" fill="none">
          {/* Coffee cup */}
          <path
            d="M13 18H29V26C29 30 26 33 21 33C16 33 13 30 13 26V18Z"
            fill="#FEF3C7"
            stroke="#92400E"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M29 20H32C34 20 35 22 35 24C35 26 34 28 32 28H29" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
          <line x1="11" y1="35" x2="31" y2="35" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 12C17 14 19 14 19 16" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M23 12C23 14 25 14 25 16" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "milks",
      name: "Milks and\nDairies",
      itemsCount: 110,
      icon: (
        <svg className="w-10 h-10 text-amber-500" viewBox="0 0 48 48" fill="none">
          {/* Milk carton & cheese */}
          <rect x="14" y="16" width="10" height="18" rx="1.5" fill="#F0FDF4" stroke="#15803D" strokeWidth="2" />
          <path d="M14 16L19 11L24 16H14Z" fill="#DCFCE7" stroke="#15803D" strokeWidth="2" strokeLinejoin="round" />
          <path d="M27 27L36 24V34H27V27Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="31" cy="29" r="1" fill="#B45309" />
        </svg>
      ),
    },
    {
      id: "petfood",
      name: "Pet\nFoods",
      itemsCount: 42,
      icon: (
        <svg className="w-10 h-10 text-amber-600" viewBox="0 0 48 48" fill="none">
          {/* Pet bowl / paw */}
          <path
            d="M13 26H35L33 34H15L13 26Z"
            fill="#FEF3C7"
            stroke="#B45309"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="18" r="2.5" fill="#D97706" />
          <circle cx="19" cy="19" r="1.8" fill="#D97706" />
          <circle cx="29" cy="19" r="1.8" fill="#D97706" />
          <circle cx="24" cy="23" r="3" fill="#D97706" />
        </svg>
      ),
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-[1360px] mx-auto px-4 lg:px-8 py-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Browse by Category
        </h2>

        <div className="flex items-center gap-4">
          <a
            href="#all-categories"
            className="text-xs font-semibold text-gray-400 hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <span>All Categories</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
              aria-label="Previous categories"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
              aria-label="Next categories"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Grid */}
      <div
        ref={scrollContainerRef}
        className="grid grid-flow-col auto-cols-[140px] sm:auto-cols-[150px] lg:grid-flow-row lg:grid-cols-8 gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2 px-1"
      >
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.name;

          return (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name.replace("\n", " "))}`}
              onClick={() => setActiveCategory(cat.name)}
              className={`group cursor-pointer rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-200 bg-white ${
                isSelected
                  ? "border border-transparent ring-2 ring-amber-400 shadow-md -translate-y-1"
                  : "border border-gray-100 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {/* Icon Container */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-50/70 group-hover:bg-amber-50/80 transition-colors mb-3">
                {cat.icon}
              </div>

              {/* Category Name */}
              <div className="min-h-[38px] flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-700 group-hover:text-amber-600 leading-tight whitespace-pre-line">
                  {cat.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
