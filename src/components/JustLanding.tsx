"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const filterTabs = [
  "All",
  "Fruits & Vegetables",
  "Frozen Seafoods",
  "Raw Meats",
  "Coffees & Teas",
  "Pet Foods",
  "Milks & Dairies",
];

interface LandingProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

export default function JustLanding() {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [activeTab, setActiveTab] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const landingProducts: LandingProduct[] = [
    {
      id: "jl-1",
      name: "Artisanal Gourmet Strawberry Jam Jar 350g",
      brand: "Farmart",
      price: 4.5,
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 14,
      category: "Fruits & Vegetables",
    },
    {
      id: "jl-2",
      name: "Italian Gourmet Ready Lasagna Tray 450g",
      brand: "Chef Express",
      price: 11.2,
      oldPrice: 13.5,
      discount: "-15%",
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 21,
      category: "Raw Meats",
    },
    {
      id: "jl-3",
      name: "Extra Virgin Cold Pressed Olive Oil 500ml",
      brand: "Terra Organics",
      price: 14.9,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 43,
      category: "Fruits & Vegetables",
    },
    {
      id: "jl-4",
      name: "Pure Natural Wildflower Honey Jar 500g",
      brand: "Bee Naturals",
      price: 8.4,
      oldPrice: 9.9,
      discount: "-15%",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 19,
      category: "Coffees & Teas",
    },
    {
      id: "jl-5",
      name: "Lactose Free Fresh Whole Milk 1L Pack",
      brand: "Farm Fresh",
      price: 3.8,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
      rating: 4,
      reviews: 12,
      category: "Milks & Dairies",
    },
    {
      id: "jl-6",
      name: "Crispy Whole Grain Honey Granola 400g",
      brand: "Sun Oats",
      price: 5.6,
      image: "https://images.unsplash.com/photo-1517093708453-e99d903f0b2f?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 28,
      category: "Coffees & Teas",
    },
    {
      id: "jl-7",
      name: "Artisan French Butter Croissant Box 6pcs",
      brand: "La Boulangerie",
      price: 6.2,
      oldPrice: 7.5,
      discount: "-18%",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 35,
      category: "Fruits & Vegetables",
    },
  ];

  const filtered =
    activeTab === "All"
      ? landingProducts
      : landingProducts.filter((p) => p.category === activeTab);

  const displayList = filtered.length > 0 ? filtered : landingProducts;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-[1360px] mx-auto px-4 lg:px-8 py-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-3">
        <div className="flex flex-wrap items-center gap-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Just Landing
          </h2>

          {/* Filter Tabs */}
          <div className="hidden md:flex items-center gap-5 text-xs font-semibold text-gray-400">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-1 transition-colors relative ${
                  activeTab === tab
                    ? "text-gray-900 font-bold"
                    : "hover:text-gray-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
            aria-label="Previous landing products"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
            aria-label="Next landing products"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Slider / Grid */}
      <div
        ref={scrollRef}
        className="grid grid-flow-col auto-cols-[180px] sm:auto-cols-[200px] lg:grid-flow-row lg:grid-cols-7 gap-3.5 overflow-x-auto no-scrollbar py-2"
      >
        {displayList.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-amber-300 hover:shadow-md transition-all relative"
          >
            {/* Discount Tag */}
            {product.discount && (
              <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs font-sans">
                {product.discount}
              </span>
            )}

            {/* Wishlist toggle */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 hover:bg-amber-500 hover:text-white border border-gray-100 shadow-2xs flex items-center justify-center text-gray-400 transition-colors z-10 cursor-pointer"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  wishlist.includes(product.id)
                    ? "fill-rose-500 text-rose-500"
                    : ""
                }`}
              />
            </button>

            {/* Product Image */}
            <div className="relative w-full h-32 my-2 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  {product.brand}
                </span>
                <h4 className="text-xs font-bold text-gray-900 group-hover:text-amber-600 line-clamp-2 leading-snug mb-1.5">
                  {product.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-2.5 h-2.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">
                    ({product.reviews})
                  </span>
                </div>
              </div>

              {/* Price & Quick Add Button */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-gray-900 font-mono">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[11px] text-gray-400 line-through font-mono">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#fab528] text-gray-700 hover:text-gray-950 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  title="Quick add to cart"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
