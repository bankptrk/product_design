"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

export default function HeroBanners() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      title: "Active Summer With Juice Milk 300ml",
      description:
        "New arrivals with delicious organic fruits, juice, milk... whatever the season.",
      buttonText: "Shop Now",
      bgGradient: "from-[#eef3f7] via-[#e8eff5] to-[#f4f7f9]",
      tag: "Active Summer",
      imageUrl:
        "https://images.unsplash.com/photo-1622484214532-6a3f9e9a4f48?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Fresh Cold-Pressed Organic Smoothies",
      description:
        "100% natural, no added sugar, picked from local sun-drenched orchards daily.",
      buttonText: "Discover Flavors",
      bgGradient: "from-[#eef7f2] via-[#e2f1ea] to-[#f1f9f5]",
      tag: "Organic Pure",
      imageUrl:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80",
    },
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="max-w-[1360px] mx-auto px-4 lg:px-8 pt-5 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Big Hero Banner (approx 65% / 8 cols) */}
        <div
          className={`lg:col-span-8 relative rounded-2xl overflow-hidden bg-gradient-to-r ${currentSlide.bgGradient} p-8 md:p-12 flex flex-col justify-between min-h-[380px] md:min-h-[420px] shadow-sm border border-gray-100/80 transition-all duration-500`}
        >
          {/* Background decorative packaging / 3D mockup */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 md:w-3/5 pointer-events-none flex items-center justify-end overflow-hidden pr-4 md:pr-10">
            <div className="relative w-full h-[85%] max-h-[340px] transition-transform duration-700 hover:scale-105">
              <Image
                src={currentSlide.imageUrl}
                alt="Active Summer Juice Milk"
                fill
                className="object-contain object-right drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Left Text Content */}
          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-900 text-xs font-bold mb-4 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{currentSlide.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-4">
              {currentSlide.title}
            </h1>

            <p className="text-sm md:text-base text-gray-500 mb-8 leading-relaxed max-w-sm">
              {currentSlide.description}
            </p>

            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-white hover:bg-gray-900 text-gray-900 hover:text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <span>{currentSlide.buttonText}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="relative z-10 flex items-center gap-2 pt-6">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx
                    ? "w-7 bg-amber-500"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Promo Banner (approx 35% / 4 cols) */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden bg-[#fab528] p-7 md:p-9 flex flex-col justify-between min-h-[380px] md:min-h-[420px] shadow-sm text-gray-900 group">
          {/* Background subtle leaf / pattern texture */}
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />

          {/* Text Content */}
          <div className="relative z-10">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-800/80 block mb-1">
              Weekend Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none mb-2">
              20% SALE OFF
            </h2>
            <p className="text-sm font-semibold text-gray-800/90 mb-6">
              Synthetic seeds <span className="opacity-70 font-normal">Net 2.0 OZ</span>
            </p>

            <Link
              href="/products?onSale=true"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-md bg-white text-gray-900 font-bold text-xs uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all shadow-sm"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Image Mockup */}
          <div className="relative z-10 w-full h-44 mt-4 transition-transform duration-500 group-hover:scale-105">
            <Image
              src="https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=500&q=80"
              alt="Food Box Sale Mockup"
              fill
              className="object-contain object-bottom drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
