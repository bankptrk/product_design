"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Minus,
  Plus,
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

interface Product {
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

export default function BestSeller() {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [activeTab, setActiveTab] = useState("All");

  // Featured deal card quantity
  const [featuredQty, setFeaturedQty] = useState(1);
  const featuredPrice = 18.25;

  const featuredProduct = {
    id: "bestseller-featured",
    name: "Pure Green Seaweed Snack Pack",
    brand: "Brand Name",
    price: 18.25,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    rating: 5,
    reviews: 11,
    category: "Fruits & Vegetables",
  };

  const products: Product[] = [
    {
      id: "bs-1",
      name: "British Beef Mince (Leanest 5% Fat)",
      brand: "Farmart",
      price: 9.99,
      discount: "-15%",
      image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 18,
      category: "Raw Meats",
    },
    {
      id: "bs-2",
      name: "US Watermelon Yellow Organic Sweet",
      brand: "MartFury",
      price: 6.9,
      oldPrice: 8.5,
      discount: "-20%",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 9,
      category: "Fruits & Vegetables",
    },
    {
      id: "bs-3",
      name: "Special Snacks Crispy Salted Pepper",
      brand: "Farmart",
      price: 2.19,
      oldPrice: 2.5,
      discount: "-10%",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 25,
      category: "Coffees & Teas",
    },
    {
      id: "bs-4",
      name: "Gourmet Creamy Salted Caramel Ice Cream",
      brand: "Farmart",
      price: 9.12,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 34,
      category: "Milks & Dairies",
    },
    {
      id: "bs-5",
      name: "Canned Soup with Turkey & Vegetables",
      brand: "Brand Name",
      price: 10.74,
      oldPrice: 12.0,
      discount: "-10%",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
      rating: 4,
      reviews: 15,
      category: "Pet Foods",
    },
  ];

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((p) => p.category === activeTab);

  const displayList =
    filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <section className="max-w-[1360px] mx-auto px-4 lg:px-8 py-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-3">
        <div className="flex flex-wrap items-center gap-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Best Seller
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
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-7 h-7 rounded border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
            aria-label="Previous best sellers"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
            aria-label="Next best sellers"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Layout: 1 Featured Card on Left + 5 Grid Products on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Featured Card (approx 3 cols / 25%) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between relative group hover:border-gray-200 transition-all">
          {/* Wishlist toggle */}
          <button
            type="button"
            onClick={() => toggleWishlist(featuredProduct.id)}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-50 text-gray-400 hover:text-rose-500 transition-colors z-10"
          >
            <Heart
              className={`w-4 h-4 ${
                wishlist.includes(featuredProduct.id)
                  ? "fill-rose-500 text-rose-500"
                  : ""
              }`}
            />
          </button>

          {/* Image */}
          <div className="relative w-full h-44 mb-3 flex items-center justify-center">
            <Image
              src={featuredProduct.image}
              alt={featuredProduct.name}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Details */}
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              {featuredProduct.brand}
            </span>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-2">
              {featuredProduct.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-[11px] text-gray-400">
                ({featuredProduct.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="text-xl font-black text-gray-900 mb-4">
              ${featuredProduct.price.toFixed(2)}
            </div>
          </div>

          {/* Stepper & Full-Width Add To Cart */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-3">
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50/50">
                <button
                  type="button"
                  onClick={() => setFeaturedQty(Math.max(1, featuredQty - 1))}
                  className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2.5 py-1 text-xs font-semibold text-gray-900 min-w-[24px] text-center">
                  {featuredQty}
                </span>
                <button
                  type="button"
                  onClick={() => setFeaturedQty(featuredQty + 1)}
                  className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-gray-400 mr-1 font-normal">
                  Total:
                </span>
                <span className="font-extrabold text-gray-900 text-sm">
                  ${(featuredPrice * featuredQty).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                addToCart(
                  {
                    id: featuredProduct.id,
                    name: featuredProduct.name,
                    price: featuredProduct.price,
                    image: featuredProduct.image,
                  },
                  featuredQty
                )
              }
              className="w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-extrabold text-xs uppercase tracking-wider py-3 rounded-md transition-all shadow-xs hover:shadow active:scale-[0.99]"
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Right 5 Product Cards Grid (9 cols) */}
        <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {displayList.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-gray-200 hover:shadow-md transition-all relative"
            >
              {/* Discount Tag */}
              {product.discount && (
                <span className="absolute top-2.5 left-2.5 bg-[#ea4335] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  {product.discount}
                </span>
              )}

              {/* Wishlist toggle */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2.5 right-2.5 p-1 rounded-full text-gray-300 hover:text-rose-500 transition-colors z-10"
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
                    <span className="text-sm font-black text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
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
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-[#fab528] text-gray-700 hover:text-gray-950 transition-colors"
                    title="Quick add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
