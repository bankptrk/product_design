"use client";

import React, { use, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Clock,
  Share2,
  Maximize2,
  Check,
  CheckCircle2,
  ChevronRight,
  Flame,
  Leaf,
  Info,
  Package,
  Sparkles,
} from "lucide-react";

import { CartProvider, useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";
import TrustBadges from "@/components/TrustBadges";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import Badge from "@/components/Badge";
import QuantityStepper from "@/components/QuantityStepper";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";
import Dialog from "@/components/Dialog";
import { mockProducts } from "@/data/products";
import { Product } from "@/types/product";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Department pastel colors mapping from DESIGN.md Section 2.4
const departmentPastelMap: Record<string, string> = {
  "Fruits & Vegetables": "bg-[#ffe8df]/50 border-[#ffe8df]",
  "Breads & Sweets": "bg-[#eee9df]/50 border-[#eee9df]",
  "Frozen Seafoods": "bg-[#d8eef5]/50 border-[#d8eef5]",
  "Raw Meats": "bg-[#d9ede2]/50 border-[#d9ede2]",
  "Wines & Alcohol Drinks": "bg-[#e8e4f8]/50 border-[#e8e4f8]",
  "Milk & Dairies": "bg-[#fef9c3]/50 border-[#fef9c3]",
};

function ProductDetailContent({ productId }: { productId: string }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();

  // Find product by id, fallback to first product if not matched
  const product: Product = useMemo(() => {
    return (
      mockProducts.find((p) => p.id === productId) || mockProducts[0]
    );
  }, [productId]);

  const isWishlisted = wishlist.includes(product.id);
  const isAvailable = product.inStock !== false;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Additional gallery angles
  const galleryImages = useMemo(() => {
    return [
      product.image,
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    ];
  }, [product.image]);

  // Related products from same category or brand
  const relatedProducts = useMemo(() => {
    return mockProducts
      .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
      .slice(0, 4);
  }, [product]);

  // Frequently bought together bundle
  const bundleItem = useMemo(() => {
    return mockProducts.find((p) => p.id !== product.id && p.category !== product.category) || mockProducts[1];
  }, [product]);

  const [includeBundleItem, setIncludeBundleItem] = useState(true);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
  };

  const handleBuyBundle = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1
    );
    if (includeBundleItem && bundleItem) {
      addToCart(
        {
          id: bundleItem.id,
          name: bundleItem.name,
          price: bundleItem.price,
          image: bundleItem.image,
        },
        1
      );
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const departmentBg =
    departmentPastelMap[product.category] || "bg-[#f7f8fa] border-gray-100";

  const discountSavings = product.oldPrice
    ? (product.oldPrice - product.price).toFixed(2)
    : null;

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Global Navigation & Header */}
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation Bar */}
        <div className="bg-white border-b border-gray-200/80">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <Breadcrumbs
              items={[
                { label: "Catalog", href: "/products" },
                {
                  label: product.category,
                  href: `/products?category=${encodeURIComponent(product.category)}`,
                },
                { label: product.name },
              ]}
            />
          </div>
        </div>

        {/* Main Product Container */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-10">
          {/* Top 2-Column Hero: Image Gallery & Buy Box */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Image Gallery (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Stage Display */}
              <div
                className={`relative w-full aspect-square rounded-2xl ${departmentBg} border flex items-center justify-center p-6 sm:p-8 overflow-hidden group transition-all duration-300`}
              >
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.discount && (
                    <Badge variant="discount" className="shadow-xs">
                      {product.discount}
                    </Badge>
                  )}
                  {product.badge && (
                    <Badge variant="brand" className="shadow-xs">
                      {product.badge}
                    </Badge>
                  )}
                </div>

                {/* Top Action Trays: Wishlist & Share */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-amber-600 border border-gray-100 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                    title="Share product link"
                    aria-label="Share product"
                  >
                    {copiedLink ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-gray-100 shadow-2xs flex items-center justify-center transition-all cursor-pointer ${
                      isWishlisted ? "text-rose-500" : "text-gray-400 hover:text-rose-500"
                    }`}
                    title="Save to Wishlist"
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`}
                    />
                  </button>
                </div>

                {/* Primary Photo */}
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Enlarge / Fullscreen Zoom Trigger */}
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 bg-white/95 hover:bg-white text-gray-700 hover:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs backdrop-blur-xs transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
                  <span>Enlarge</span>
                </button>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                {galleryImages.map((img, idx) => {
                  const isActive = selectedImage === img;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-gray-50 border-2 overflow-hidden transition-all cursor-pointer ${
                        isActive
                          ? "border-[#fab528] ring-2 ring-amber-400/30 scale-102"
                          : "border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100"
                      }`}
                      aria-label={`View photo angle ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} angle ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Quick Trust Checklist */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">100% Organic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span className="truncate">Cold Chain</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">7-Day Refund</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Info & Buy Box (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Brand & Stock Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {product.brand}
                    </span>
                    <span className="text-gray-300">•</span>
                    <Link
                      href={`/products?category=${encodeURIComponent(product.category)}`}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md hover:underline"
                    >
                      {product.category}
                    </Link>
                  </div>

                  {isAvailable ? (
                    <Badge variant="stock" dot>
                      In Stock • Ready to Ship
                    </Badge>
                  ) : (
                    <Badge variant="out-of-stock">
                      Currently Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Product Title */}
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Review Counter */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200 fill-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="font-mono font-bold text-gray-900">
                    {product.rating}.0 / 5.0
                  </span>
                  <span className="text-gray-300">•</span>
                  <a
                    href="#product-tabs"
                    className="text-gray-600 hover:text-amber-600 hover:underline font-medium"
                  >
                    ({product.reviews} customer verified reviews)
                  </a>
                  <span className="text-gray-300">•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    98% Satisfaction
                  </span>
                </div>

                {/* Pricing Hero Box */}
                <div className="bg-[#f7f8fa] rounded-xl p-4 sm:p-5 border border-gray-100 flex flex-wrap items-baseline justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-3xl sm:text-4xl font-black text-amber-600 tracking-tight">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="font-mono text-base text-gray-400 line-through">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                      {discountSavings && (
                        <Badge variant="discount">
                          Save ${discountSavings}
                        </Badge>
                      )}
                    </div>

                    {product.unit && (
                      <p className="text-xs text-gray-500">
                        Package:{" "}
                        <span className="font-semibold text-gray-700">
                          {product.unit}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Estimated Delivery Note */}
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      Same-Day 2hr Delivery
                    </span>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Order within 45 mins to get today
                    </p>
                  </div>
                </div>

                {/* Brief Description */}
                {product.description && (
                  <p className="text-sm text-gray-600 leading-relaxed pt-1">
                    {product.description}
                  </p>
                )}

                {/* Stock Meter (DESIGN.md 6.4) */}
                {product.soldCount !== undefined && product.totalStock !== undefined && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span className="flex items-center gap-1 font-semibold text-amber-800">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        Selling fast! {product.soldCount} claimed
                      </span>
                      <span className="text-gray-500 font-medium">
                        Only {product.totalStock - product.soldCount} left in stock
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            (product.soldCount / product.totalStock) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Actions Strip */}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Quantity Stepper (DESIGN.md 6.1) */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider sm:hidden">
                      Quantity:
                    </span>
                    <QuantityStepper
                      value={quantity}
                      onChange={setQuantity}
                      size="lg"
                      disabled={!isAvailable}
                      ariaLabel={`Quantity for ${product.name}`}
                    />
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    type="button"
                    disabled={!isAvailable}
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-amber cursor-pointer active:scale-[0.98] ${
                      isAvailable
                        ? "bg-[#fab528] hover:bg-[#e59d12] text-gray-900"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isAvailable
                        ? `Add to Cart • $${(product.price * quantity).toFixed(2)}`
                        : "Out of Stock"}
                    </span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${
                      isWishlisted
                        ? "bg-rose-50 border-rose-200 text-rose-500"
                        : "bg-white border-gray-200 text-gray-600 hover:text-rose-500 hover:border-gray-900"
                    }`}
                    title="Add to Wishlist"
                    aria-label="Wishlist toggle"
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted ? "fill-rose-500" : ""}`}
                    />
                  </button>
                </div>

                {/* Shipping & Assurance Banner */}
                <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Free Express Delivery</p>
                      <p className="text-[11px] text-gray-500">Orders $35+ qualify automatically</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">100% Quality Guaranteed</p>
                      <p className="text-[11px] text-gray-500">Free replacement or instant refund</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Bought Together Bundle */}
          {bundleItem && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Frequently Bought Together
              </h3>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {/* Current Product Mini Card */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 p-2 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        This item
                      </span>
                      <p className="text-xs font-bold text-gray-900 max-w-[160px] truncate">
                        {product.name}
                      </p>
                      <p className="font-mono text-xs font-black text-amber-600">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <span className="text-gray-300 font-bold text-lg">+</span>

                  {/* Companion Product Mini Card */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBundleItem}
                      onChange={(e) => setIncludeBundleItem(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer accent-[#fab528]"
                    />
                    <div className="relative w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 p-2 shrink-0">
                      <Image
                        src={bundleItem.image}
                        alt={bundleItem.name}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">
                        Pair with
                      </span>
                      <p className="text-xs font-bold text-gray-900 max-w-[160px] truncate">
                        {bundleItem.name}
                      </p>
                      <p className="font-mono text-xs font-black text-amber-600">
                        ${bundleItem.price.toFixed(2)}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Bundle Checkout Box */}
                <div className="flex items-center gap-4 lg:border-l lg:border-gray-100 lg:pl-6 w-full lg:w-auto justify-between lg:justify-end">
                  <div>
                    <span className="text-xs text-gray-500 block">Total Combo Price:</span>
                    <span className="font-mono text-2xl font-black text-gray-900">
                      $
                      {(
                        product.price +
                        (includeBundleItem ? bundleItem.price : 0)
                      ).toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleBuyBundle}
                    className="bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>Add Bundle to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Product Tabs Section (DESIGN.md 6.1, 6.6 with Tabs) */}
          <div id="product-tabs" className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <Tabs defaultValue="description">
              <TabsList className="mb-6">
                <TabsTrigger value="description" icon={<Info className="w-4 h-4" />}>
                  Description & Details
                </TabsTrigger>
                <TabsTrigger value="nutrition" icon={<Package className="w-4 h-4" />}>
                  Nutritional Facts & Origin
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  icon={<Star className="w-4 h-4" />}
                  badge={product.reviews}
                >
                  Customer Reviews
                </TabsTrigger>
                <TabsTrigger value="shipping" icon={<Truck className="w-4 h-4" />}>
                  Shipping & Cold Storage
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Description */}
              <TabsContent value="description" className="space-y-6">
                <div className="prose max-w-none text-sm text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Our <strong>{product.name}</strong> is sustainably harvested and farm-sourced
                    under rigorous quality standards. Cultivated by family-run partner farms who prioritize
                    soil health, biodiversity, and zero chemical pesticide runoff.
                  </p>
                  <p>
                    Every batch is quality inspected upon delivery to our temperature-regulated fulfillment hubs,
                    ensuring that you receive produce at peak flavor, vibrant color, and optimum nutritional value.
                  </p>

                  <h4 className="text-base font-bold text-gray-900 pt-2">
                    Key Highlights & Guarantees
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 not-prose text-xs text-gray-700">
                    <li className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Certified Organic & Non-GMO verified</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero synthetic additives, artificial waxes, or dyes</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Farm-to-door transit under 24 hours from harvest</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Recyclable and compostable eco-packaging</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              {/* Tab 2: Nutritional Facts & Specifications */}
              <TabsContent value="nutrition" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Nutrition Table */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="text-sm font-bold text-gray-900">
                        Nutritional Values (Per 100g serving)
                      </h4>
                    </div>
                    <table className="w-full text-xs text-left">
                      <tbody className="divide-y divide-gray-100 text-gray-600">
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-2.5 font-semibold text-gray-800">Energy (Calories)</td>
                          <td className="px-4 py-2.5 font-mono text-gray-900">32 kcal / 134 kJ</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-2.5 font-semibold text-gray-800">Total Fat</td>
                          <td className="px-4 py-2.5 font-mono text-gray-900">0.3g</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-2.5 font-semibold text-gray-800">Total Carbohydrate</td>
                          <td className="px-4 py-2.5 font-mono text-gray-900">7.7g</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-2.5 font-semibold text-gray-800">Dietary Fiber</td>
                          <td className="px-4 py-2.5 font-mono text-gray-900">2.0g</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-2.5 font-semibold text-gray-800">Sugars</td>
                          <td className="px-4 py-2.5 font-mono text-gray-900">4.9g</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-2.5 font-semibold text-gray-800">Protein</td>
                          <td className="px-4 py-2.5 font-mono text-gray-900">0.7g</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-2.5 font-semibold text-gray-800">Vitamin C</td>
                          <td className="px-4 py-2.5 font-mono text-emerald-600 font-bold">58.8mg (98% DV)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Specifications & Origin */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-900">
                      Product Specifications
                    </h4>
                    <dl className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <dt className="text-gray-400 font-semibold uppercase text-[10px]">Brand / Farm</dt>
                        <dd className="font-bold text-gray-900 mt-0.5">{product.brand}</dd>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <dt className="text-gray-400 font-semibold uppercase text-[10px]">Category</dt>
                        <dd className="font-bold text-gray-900 mt-0.5">{product.category}</dd>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <dt className="text-gray-400 font-semibold uppercase text-[10px]">Storage Temp</dt>
                        <dd className="font-bold text-gray-900 mt-0.5">2°C – 4°C (Chilled)</dd>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <dt className="text-gray-400 font-semibold uppercase text-[10px]">Shelf Life</dt>
                        <dd className="font-bold text-gray-900 mt-0.5">5 – 7 days refrigerated</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 3: Customer Reviews */}
              <TabsContent value="reviews" className="space-y-8">
                {/* Aggregate Summary */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left space-y-1">
                    <span className="font-mono text-4xl sm:text-5xl font-black text-gray-900">
                      {product.rating}.0
                    </span>
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-200 fill-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Based on {product.reviews} verified customer ratings
                    </p>
                  </div>

                  <div className="flex-1 max-w-xs w-full space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-right font-medium">5 Star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-400 h-2 rounded-full w-[88%]" />
                      </div>
                      <span className="w-8 font-mono text-[11px] text-gray-400">88%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-right font-medium">4 Star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-400 h-2 rounded-full w-[10%]" />
                      </div>
                      <span className="w-8 font-mono text-[11px] text-gray-400">10%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-right font-medium">3 Star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-400 h-2 rounded-full w-[2%]" />
                      </div>
                      <span className="w-8 font-mono text-[11px] text-gray-400">2%</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsReviewDialogOpen(true)}
                    className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all cursor-pointer shadow-2xs shrink-0"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Individual Review Comments */}
                <div className="space-y-4">
                  {[
                    {
                      name: "Eleanor Vance",
                      date: "2 days ago",
                      rating: 5,
                      text: "Incredible freshness! Arrived still chilled in an eco insulated pouch. The aroma and flavor are 100x better than generic supermarket produce.",
                      verified: true,
                    },
                    {
                      name: "Marcus Lindqvist",
                      date: "1 week ago",
                      rating: 5,
                      text: "Always reordering this every week. Super juicy, organic, and perfect for smoothies or daily healthy snacking for our kids.",
                      verified: true,
                    },
                    {
                      name: "Sarah Chen",
                      date: "2 weeks ago",
                      rating: 4,
                      text: "Top tier quality and excellent packaging. Arrived within 90 minutes from placing the order online.",
                      verified: true,
                    },
                  ].map((rev, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-gray-100 bg-white space-y-2 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                            {rev.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-gray-900 block">
                              {rev.name}
                            </span>
                            <span className="text-[10px] text-gray-400">{rev.date}</span>
                          </div>
                        </div>

                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3" />
                            Verified Buyer
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-200 fill-gray-200"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {rev.text}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab 4: Shipping & Returns */}
              <TabsContent value="shipping" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
                    <Truck className="w-5 h-5 text-sky-600" />
                    <h4 className="font-bold text-gray-900">Cold Chain Express</h4>
                    <p className="leading-relaxed">
                      Delivered in temperature-controlled electric vans with biodegradable gel packs.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <h4 className="font-bold text-gray-900">Fast 2-Hour Dispatch</h4>
                    <p className="leading-relaxed">
                      Order between 8:00 AM - 8:00 PM for same-day delivery right to your door.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
                    <RotateCcw className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-gray-900">Freshness Guarantee</h4>
                    <p className="leading-relaxed">
                      If any item doesn&apos;t meet your standards, snap a photo for an immediate refund.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                    You Might Also Like
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 mt-1">
                    Related {product.category}
                  </h2>
                </div>

                <Link
                  href={`/products?category=${encodeURIComponent(product.category)}`}
                  className="text-xs font-bold text-gray-700 hover:text-amber-600 flex items-center gap-1 transition-colors"
                >
                  <span>View All in {product.category}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}

          {/* Service Guarantees / Trust Badges */}
          <div className="pt-4">
            <TrustBadges />
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Cart Toast */}
      <CartToast />

      {/* Fullscreen Photo Zoom Modal powered by Dialog (DESIGN.md 6.6) */}
      <Dialog
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        title={product.name}
        description={`High-resolution detail inspection • Category: ${product.category}`}
        icon={<Maximize2 className="w-6 h-6" />}
        iconVariant="brand"
        size="2xl"
        cancelText="Close"
      >
        <div className="flex flex-col items-center justify-center bg-gray-50/50 rounded-xl p-4">
          <div className="relative w-full h-[360px] sm:h-[420px]">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-contain"
            />
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            {product.description || "Fresh farm quality guaranteed."}
          </p>
        </div>
      </Dialog>

      {/* Write a Review Modal powered by Dialog (DESIGN.md 6.6) */}
      <Dialog
        isOpen={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        title="Write a Product Review"
        description={`Share your feedback on ${product.name} with fellow food lovers!`}
        icon={<Star className="w-6 h-6" />}
        iconVariant="brand"
        size="md"
        footer={
          reviewSubmitted ? (
            <button
              type="button"
              onClick={() => {
                setReviewSubmitted(false);
                setIsReviewDialogOpen(false);
              }}
              className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Done
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsReviewDialogOpen(false)}
                className="border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setReviewSubmitted(true)}
                className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          )
        }
      >
        {reviewSubmitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-sm font-bold text-emerald-900">
              Thank you for your review!
            </p>
            <p className="text-xs text-emerald-700">
              Your feedback has been submitted and will appear shortly after verification.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">
                Overall Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= reviewRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 fill-gray-200"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-gray-700 ml-2">
                  {reviewRating} of 5 stars
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Your Review
              </label>
              <textarea
                rows={4}
                placeholder="How was the taste, texture, and delivery freshness?"
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);

  return (
    <CartProvider>
      <ProductDetailContent productId={resolvedParams.id} />
    </CartProvider>
  );
}
