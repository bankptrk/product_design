"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Minus,
  Plus,
  Mail,
  Lock,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function TopSaverToday() {
  const { addToCart, toggleWishlist, wishlist } = useCart();

  // Deal card quantity state
  const [dealQuantity, setDealQuantity] = useState(1);
  const dealPrice = 80.0;

  // Countdown timer: 08:12:27
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 12,
    seconds: 27,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsRegistered(true);
    setTimeout(() => {
      setIsRegistered(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }, 4000);
  };

  const dealProduct = {
    id: "top-saver-featured",
    name: "Sun Maid Raisin, Natural (6-Pack)",
    brand: "Brand Name",
    price: 80.0,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 12,
    sold: 25,
    total: 60,
  };

  const middleProducts = [
    {
      id: "top-saver-1",
      name: "British Beef Mince (10% Fat)",
      brand: "Meat Brand",
      price: 12.5,
      oldPrice: 14.0,
      discount: "-15%",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 15,
      sold: 18,
      total: 30,
    },
    {
      id: "top-saver-2",
      name: "Farmart Farmhouse Soft White",
      brand: "Farmart",
      price: 3.7,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
      rating: 4,
      reviews: 8,
      sold: 8,
      total: 20,
    },
    {
      id: "top-saver-3",
      name: "Fresh Sweet Navel Oranges 1kg",
      brand: "Brand Name",
      price: 4.5,
      oldPrice: 5.0,
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 32,
      sold: 32,
      total: 50,
    },
  ];

  return (
    <section id="deals" className="max-w-[1360px] mx-auto px-4 lg:px-8 py-7">
      {/* Header with Title and Red Countdown Timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Top Saver Today
          </h2>

          <a
            href="#all-offers"
            className="text-xs font-semibold text-gray-400 hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <span>All Offers</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>

          {/* Countdown Pill matching screenshot */}
          <div className="flex items-center gap-2 bg-red-500 text-white px-3.5 py-1.5 rounded-md text-xs font-bold shadow-xs">
            <Clock className="w-3.5 h-3.5" />
            <span className="tracking-wide text-[11px] font-medium opacity-90">
              Expires in:
            </span>
            <span className="font-mono text-xs font-black tracking-widest">
              {String(timeLeft.hours).padStart(2, "0")} :{" "}
              {String(timeLeft.minutes).padStart(2, "0")} :{" "}
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
            aria-label="Previous offer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-2xs"
            aria-label="Next offer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Featured "Deal of the Day" Card (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between relative group hover:border-amber-300 hover:shadow-md transition-all">
          {/* Wishlist button */}
          <button
            type="button"
            onClick={() => toggleWishlist(dealProduct.id)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white hover:bg-amber-500 hover:text-white border border-gray-100 shadow-2xs flex items-center justify-center text-gray-400 transition-all z-10 cursor-pointer"
            title="Add to Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                wishlist.includes(dealProduct.id)
                  ? "fill-rose-500 text-rose-500"
                  : ""
              }`}
            />
          </button>

          {/* Product Image */}
          <div className="relative w-full h-44 mb-3 flex items-center justify-center">
            <Image
              src={dealProduct.image}
              alt={dealProduct.name}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Details */}
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              {dealProduct.brand}
            </span>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-2">
              {dealProduct.name}
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
              <span className="text-[11px] text-gray-400">({dealProduct.reviews})</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-black font-mono text-amber-600 mb-3">
              ${dealProduct.price.toFixed(2)}
            </div>

            {/* Sold Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#fab528] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(dealProduct.sold / dealProduct.total) * 100}%`,
                  }}
                />
              </div>
              <span className="text-[11px] font-medium text-gray-400 mt-1 block font-mono">
                Sold: {dealProduct.sold}/{dealProduct.total}
              </span>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart button */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-3">
              {/* Stepper */}
              <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50/60 p-1">
                <button
                  type="button"
                  onClick={() => setDealQuantity(Math.max(1, dealQuantity - 1))}
                  className="w-7 h-7 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-2xs transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-9 text-center text-xs font-bold text-gray-900 font-mono">
                  {dealQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => setDealQuantity(dealQuantity + 1)}
                  className="w-7 h-7 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-2xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right">
                <span className="text-[11px] text-gray-400 mr-1 font-normal">
                  Total:
                </span>
                <span className="font-extrabold text-gray-900 text-sm font-mono">
                  ${(dealPrice * dealQuantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add To Cart Full-Width Yellow Button */}
            <button
              type="button"
              onClick={() =>
                addToCart(
                  {
                    id: dealProduct.id,
                    name: dealProduct.name,
                    price: dealProduct.price,
                    image: dealProduct.image,
                  },
                  dealQuantity
                )
              }
              className="w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Middle Column: 3 Products in Grid (lg:col-span-6) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {middleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-amber-300 hover:shadow-md transition-all relative"
            >
              {/* Discount Badge if available */}
              {product.discount && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs font-sans">
                  {product.discount}
                </span>
              )}

              {/* Wishlist button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 hover:bg-amber-500 hover:text-white border border-gray-100 shadow-2xs flex items-center justify-center text-gray-400 transition-colors z-10 cursor-pointer"
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
              <div className="relative w-full h-36 my-2 flex items-center justify-center">
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

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-base font-extrabold text-gray-900 font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through font-mono">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#fab528] h-full rounded-full"
                      style={{
                        width: `${(product.sold / product.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-gray-400 mt-1 block font-mono">
                    Sold: {product.sold}/{product.total}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Member Sign Up Promo Card (lg:col-span-3) */}
        <div className="lg:col-span-3 rounded-2xl p-6 bg-[#fcf6ee] border border-amber-100/60 shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Subtle palm leaf decorative illustration */}
          <div className="absolute right-0 top-0 bottom-0 w-32 opacity-15 pointer-events-none">
            <svg
              className="w-full h-full fill-amber-800"
              viewBox="0 0 100 200"
              preserveAspectRatio="none"
            >
              <path d="M100 0 C60 40 40 100 100 200 C80 150 70 80 100 0 Z" />
            </svg>
          </div>

          {/* Header text */}
          <div className="relative z-10 mb-4">
            <h3 className="text-3xl font-black text-red-500 tracking-tight mb-1 font-mono">
              15% OFF
            </h3>
            <p className="text-xs font-semibold text-gray-700 leading-relaxed">
              For new member sign up at the first time
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="relative z-10 space-y-3">
            {isRegistered ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-emerald-800">
                  Welcome to Farmart!
                </p>
                <p className="text-[11px] text-emerald-600">
                  15% discount voucher sent to {email}.
                </p>
              </div>
            ) : (
              <>
                {/* Email */}
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none shadow-2xs transition-all"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-white border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none shadow-2xs transition-all"
                  />
                </div>

                {/* Re-enter Password */}
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter Password"
                    className="w-full bg-white border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none shadow-2xs transition-all"
                  />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-all duration-200 active:scale-[0.98] shadow-xs mt-2 cursor-pointer"
                >
                  Register Now
                </button>
              </>
            )}
          </form>

          {/* Small security badge */}
          <div className="relative z-10 text-[10px] text-gray-400 text-center mt-3">
            Secure 256-bit SSL encrypted registration
          </div>
        </div>
      </div>
    </section>
  );
}
