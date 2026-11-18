"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BrandCard {
  id: string;
  tag: string;
  title: string;
  bgColor: string;
  image: string;
}

export default function FeaturedBrands() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const brandOffers: BrandCard[] = [
    {
      id: "brand-1",
      tag: "FOOD POUCH",
      title: "New Snacks Release",
      bgColor: "bg-[#e8e4f8]", // soft lavender
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "brand-2",
      tag: "TEA 100%",
      title: "Happy Tea 100% Organic, From $29.9",
      bgColor: "bg-[#eee9df]", // soft sand beige
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "brand-3",
      tag: "SODA DRINKS",
      title: "Soda Can Box 24 Pieces - 30% OFF",
      bgColor: "bg-[#d8eef5]", // soft sky blue
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "brand-4",
      tag: "PREMIUM",
      title: "Fresh Meat Sausage, BUY 2 GET 1!",
      bgColor: "bg-[#d9ede2]", // soft mint sage
      image: "https://images.unsplash.com/photo-1588347818036-558601350947?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-[1360px] mx-auto px-4 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Featured Brands
        </h2>

        <div className="flex items-center gap-4">
          <a
            href="#all-offers"
            className="text-xs font-semibold text-gray-400 hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <span>All Offers</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-7 h-7 rounded border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
              aria-label="Previous brand"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-7 h-7 rounded border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
              aria-label="Next brand"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 4 Promo Cards */}
      <div
        ref={scrollContainerRef}
        className="grid grid-flow-col auto-cols-[280px] sm:auto-cols-[300px] lg:grid-flow-row lg:grid-cols-4 gap-4 overflow-x-auto no-scrollbar py-1"
      >
        {brandOffers.map((card) => (
          <div
            key={card.id}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100/90 hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Top Color Box with product image */}
            <div
              className={`relative ${card.bgColor} h-48 w-full flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-[1.02]`}
            >
              <div className="relative w-40 h-36">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Bottom Info text */}
            <div className="p-4 bg-white flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-1">
                  {card.tag}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-amber-600 line-clamp-2 leading-snug">
                  {card.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
