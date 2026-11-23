"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Phone,
  User,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  Flame,
  Tag,
  Clock,
  Check,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const categories = [
  "All Categories",
  "Fruits & Vegetables",
  "Breads & Sweets",
  "Frozen Seafoods",
  "Raw Meats",
  "Wines & Alcohol Drinks",
  "Coffees and Teas",
  "Milks and Dairies",
  "Pet Foods",
];

export default function Header() {
  const router = useRouter();
  const { cartCount, cartTotal, wishlistCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("ALL CATEGORIES");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isShopCategoryOpen, setIsShopCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    if (selectedCategory !== "ALL CATEGORIES") {
      params.set("category", selectedCategory);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] sticky top-0 z-40">
      {/* Top Main Navigation Bar */}
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-500 shadow-sm border border-amber-300/40 group-hover:scale-105 transition-transform">
            {/* Custom Farmart grocery icon */}
            <svg
              className="w-6 h-6 fill-amber-500 text-amber-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
            </svg>
          </div>
          <div className="leading-none">
            <span className="text-2xl font-black tracking-tight text-gray-900 block font-sans">
              Farmart
            </span>
            <span className="text-[9px] font-bold tracking-widest text-gray-400 block uppercase mt-0.5">
              GROCERY
            </span>
          </div>
        </Link>

        {/* Search Bar with Categories */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-2 relative">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full border-2 border-gray-100 rounded-lg bg-gray-50/70 focus-within:border-amber-400 focus-within:bg-white transition-all overflow-visible shadow-sm"
          >
            {/* Category Dropdown Toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:text-gray-900 shrink-0 uppercase tracking-wide border-r border-gray-200 cursor-pointer"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-1.5 z-50 text-xs font-medium">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.toUpperCase());
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      {cat}
                      {selectedCategory === cat.toUpperCase() && (
                        <Check className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="I'm shopping for..."
              className="flex-1 bg-transparent px-4 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none"
            />

            {/* Search Icon Button */}
            <button
              type="submit"
              className="px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </form>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Support Phone */}
          <div className="hidden lg:flex items-center gap-3 border-r border-gray-100 pr-5">
            <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
              <Phone className="w-4 h-4 fill-amber-400/20" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-gray-900 tracking-tight">
                8 800 332 65 66
              </p>
              <p className="text-[11px] text-gray-400 font-medium">
                Support 24/7
              </p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Account */}
            <button
              type="button"
              className="flex items-center gap-1.5 text-gray-700 hover:text-amber-500 transition-colors p-1"
              title="My Account"
            >
              <User className="w-5 h-5 text-gray-600 hover:text-amber-500" />
            </button>

            {/* Wishlist */}
            <button
              type="button"
              className="relative flex items-center gap-1.5 text-gray-700 hover:text-amber-500 transition-colors p-1"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-600 hover:text-amber-500" />
              <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] rounded-full bg-[#fab528] text-gray-900 text-[10px] font-bold font-mono flex items-center justify-center px-1 shadow-2xs">
                {wishlistCount}
              </span>
            </button>

            {/* Cart */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="relative p-1">
                <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-amber-500 transition-colors" />
                <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] rounded-full bg-[#fab528] text-gray-900 text-[10px] font-bold font-mono flex items-center justify-center px-1 shadow-2xs">
                  {cartCount}
                </span>
              </div>
              <div className="hidden sm:block leading-tight text-left">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Your Cart
                </span>
                <span className="text-xs font-bold font-mono text-gray-900 group-hover:text-amber-600 transition-colors">
                  ${cartTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Row */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Shop By Category Yellow Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsShopCategoryOpen(!isShopCategoryOpen)}
              className="flex items-center gap-3 bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-3 text-xs tracking-wider transition-all select-none shadow-sm"
            >
              <Menu className="w-4 h-4 stroke-[2.5]" />
              <span className="uppercase">Shop By Category</span>
              <ChevronDown className="w-3.5 h-3.5 stroke-[2.5] ml-1" />
            </button>

            {/* Mega / Category Menu Dropdown */}
            {isShopCategoryOpen && (
              <div className="absolute left-0 top-full w-64 bg-white border border-gray-100 rounded-b-xl shadow-2xl py-2 z-50 text-xs font-semibold text-gray-700 divide-y divide-gray-50">
                {categories.slice(1).map((cat) => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setIsShopCategoryOpen(false)}
                    className="px-4 py-2.5 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center justify-between"
                  >
                    <span>{cat}</span>
                    <span className="text-gray-300">›</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-gray-800">
            <Link
              href="/products?onSale=true"
              className="flex items-center gap-1.5 text-gray-900 hover:text-amber-600 transition-colors py-3"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>Deals Today</span>
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-gray-800 hover:text-amber-600 transition-colors py-3"
            >
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span>Special Prices</span>
            </Link>
            <Link
              href="/products?category=Fruits%20%26%20Vegetables"
              className="flex items-center gap-1 hover:text-amber-600 transition-colors py-3 group"
            >
              <span>Fresh</span>
            </Link>
            <Link
              href="/products?category=Frozen%20Seafoods"
              className="flex items-center gap-1 hover:text-amber-600 transition-colors py-3 group"
            >
              <span>Frozen</span>
            </Link>
            <Link
              href="/products?category=Coffees%20and%20Teas"
              className="flex items-center gap-1 hover:text-amber-600 transition-colors py-3 group"
            >
              <span>Drinks</span>
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-1 hover:text-amber-600 transition-colors py-3 group"
            >
              <span>Shop</span>
            </Link>
          </nav>

          {/* Right Action Links */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/overview"
              className="flex items-center gap-1.5 text-xs font-bold text-gray-900 bg-gray-100 hover:bg-amber-100 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
            >
              <span>UI Flow</span>
            </Link>

            <Link
              href="/design"
              className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-400/20 hover:bg-amber-400/30 px-3 py-1.5 rounded-full transition-colors border border-amber-300/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
              <span>Design System</span>
            </Link>

            {/* Recently Viewed */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer py-3">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>Recently Viewed</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
