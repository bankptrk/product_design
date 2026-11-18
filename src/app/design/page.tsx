"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Palette,
  Type,
  Layers,
  Component,
  Copy,
  Check,
  Sparkles,
  Search,
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Mail,
  Send,
  Lock,
  Eye,
  EyeOff,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Flame,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sliders,
  CheckCircle2,
  SlidersHorizontal,
  FileText,
  Bookmark,
  MessageSquare,
  Trash2,
  Tag,
  Maximize2,
} from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import CartToast from "@/components/CartToast";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogSize,
} from "@/components/Dialog";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { mockProducts } from "@/data/products";

// --- Types & Data ---

interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  twClass: string;
  usage: string;
  contrastOnDark?: boolean;
}

const primaryTokens: ColorToken[] = [
  {
    name: "Primary Amber (Brand)",
    variable: "--primary-amber",
    hex: "#fab528",
    twClass: "bg-[#fab528]",
    usage: "Primary CTA buttons, brand badges, active states",
  },
  {
    name: "Primary Amber Dark",
    variable: "--primary-amber-dark",
    hex: "#e59d12",
    twClass: "bg-[#e59d12]",
    usage: "Hover state for primary buttons and interactive accents",
  },
  {
    name: "Primary Amber Light",
    variable: "--amber-100",
    hex: "#fef3c7",
    twClass: "bg-amber-100",
    usage: "Icon containers, highlighted chips, selected category border",
  },
  {
    name: "Primary Amber Tint",
    variable: "--amber-50",
    hex: "#fffbeb",
    twClass: "bg-amber-50",
    usage: "Newsletter bar background, badge pill background",
  },
  {
    name: "Primary Amber Text",
    variable: "--amber-800",
    hex: "#92400e",
    twClass: "text-amber-800",
    usage: "Readable high-contrast text on amber backgrounds",
  },
];

const neutralTokens: ColorToken[] = [
  {
    name: "Canvas Background",
    variable: "--background",
    hex: "#f7f8fa",
    twClass: "bg-[#f7f8fa]",
    usage: "Main store application background",
  },
  {
    name: "Surface White",
    variable: "--surface",
    hex: "#ffffff",
    twClass: "bg-white",
    usage: "Cards, modals, header bar, navigation",
  },
  {
    name: "Surface Subtle",
    variable: "--surface-subtle",
    hex: "#f9fafb",
    twClass: "bg-gray-50",
    usage: "Input fields, hover fills, secondary containers",
  },
  {
    name: "Border Subtle",
    variable: "--border-subtle",
    hex: "#f3f4f6",
    twClass: "border-gray-100",
    usage: "Card outlines, section dividers",
  },
  {
    name: "Border Default",
    variable: "--border-default",
    hex: "#e5e7eb",
    twClass: "border-gray-200",
    usage: "Input borders, inactive pills, quantity stepper bounds",
  },
  {
    name: "Text Muted",
    variable: "--text-muted",
    hex: "#9ca3af",
    twClass: "text-gray-400",
    usage: "Strikethrough prices, metadata, icon default color",
  },
  {
    name: "Text Secondary",
    variable: "--text-secondary",
    hex: "#4b5563",
    twClass: "text-gray-600",
    usage: "Descriptions, category labels, body text",
  },
  {
    name: "Text Primary (Charcoal)",
    variable: "--foreground",
    hex: "#191c1f",
    twClass: "text-[#191c1f]",
    usage: "Headings, titles, high-emphasis text",
  },
];

const semanticTokens: ColorToken[] = [
  {
    name: "Success Emerald",
    variable: "--emerald-500",
    hex: "#10b981",
    twClass: "bg-emerald-500",
    usage: "In stock status, verified badges, checkmarks",
  },
  {
    name: "Success Subtle Fill",
    variable: "--emerald-50",
    hex: "#ecfdf5",
    twClass: "bg-emerald-50",
    usage: "Stock availability pill background",
  },
  {
    name: "Danger / Discount Red",
    variable: "--red-500",
    hex: "#ef4444",
    twClass: "bg-red-500",
    usage: "Discount badges (-15%), sale alert badges",
  },
  {
    name: "Warning Gold",
    variable: "--amber-500",
    hex: "#f59e0b",
    twClass: "bg-amber-500",
    usage: "Review stars, flash deal fire icons",
  },
  {
    name: "Info Sky Blue",
    variable: "--sky-600",
    hex: "#0284c7",
    twClass: "bg-sky-600",
    usage: "Frozen seafoods icon, informational callouts",
  },
];

const departmentPastelTokens: ColorToken[] = [
  {
    name: "Lavender Pastels",
    variable: "--pastel-lavender",
    hex: "#e8e4f8",
    twClass: "bg-[#e8e4f8]",
    usage: "Food Pouch & New Snacks banners",
  },
  {
    name: "Sand Beige",
    variable: "--pastel-sand",
    hex: "#eee9df",
    twClass: "bg-[#eee9df]",
    usage: "Organic Tea 100% & Breads banners",
  },
  {
    name: "Soft Sky Blue",
    variable: "--pastel-sky",
    hex: "#d8eef5",
    twClass: "bg-[#d8eef5]",
    usage: "Soda Drinks 24 Pieces & Seafood banners",
  },
  {
    name: "Mint Sage",
    variable: "--pastel-mint",
    hex: "#d9ede2",
    twClass: "bg-[#d9ede2]",
    usage: "Fresh Meat Sausage & Organic produce banners",
  },
  {
    name: "Soft Peach",
    variable: "--pastel-peach",
    hex: "#ffe8df",
    twClass: "bg-[#ffe8df]",
    usage: "Summer Fruits & Citrus highlights",
  },
  {
    name: "Soft Lemon",
    variable: "--pastel-lemon",
    hex: "#fef9c3",
    twClass: "bg-[#fef9c3]",
    usage: "Milks, Dairies & Butter cards",
  },
];

function DesignSystemContent() {
  const { addToCart, toggleWishlist, wishlist } = useCart();

  // Active section tab
  const [activeTab, setActiveTab] = useState<
    "all" | "foundations" | "elements" | "components" | "dialogs" | "tokens"
  >("all");

  // Interactive Dialog state
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDangerDialogOpen, setIsDangerDialogOpen] = useState(false);
  const [isQuickViewDialogOpen, setIsQuickViewDialogOpen] = useState(false);
  const [isPromoDialogOpen, setIsPromoDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isCompoundDialogOpen, setIsCompoundDialogOpen] = useState(false);
  const [sizeDemoOpen, setSizeDemoOpen] = useState(false);
  const [currentDemoSize, setCurrentDemoSize] = useState<DialogSize>("md");
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [promoEmail, setPromoEmail] = useState("");

  // Reusable catalog demo state
  const [demoPage, setDemoPage] = useState(2);
  const [demoViewMode, setDemoViewMode] = useState<"grid" | "list">("grid");

  // Copy-to-clipboard state
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // Interactive Product Card state
  const [dealQty, setDealQty] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [activeCategoryPill, setActiveCategoryPill] = useState("Breads & Sweets");
  const [sampleSearchCategory, setSampleSearchCategory] = useState("ALL CATEGORIES");
  const [isSearchCatOpen, setIsSearchCatOpen] = useState(false);
  const [fontTestText, setFontTestText] = useState(
    "Active Summer with Organic Farm Produce & Delicious Deals"
  );

  // Live countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 12, seconds: 27 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-gray-900 font-sans selection:bg-amber-200 selection:text-amber-900 pb-20">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-500 shadow-xs border border-amber-300/40 group-hover:scale-105 transition-transform">
                <svg
                  className="w-6 h-6 fill-amber-500 text-amber-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
                </svg>
              </div>
              <div className="leading-none">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-gray-900">
                    Farmart
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-gray-900">
                    Design System
                  </span>
                </div>
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mt-0.5 block">
                  STYLE GUIDE & TOKENS SPECIFICATION
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
              <span>Products Page</span>
            </Link>
            <a
              href="#tokens-matrix"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>DESIGN.md Spec</span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#fab528] hover:bg-[#e59d12] text-gray-900 rounded-lg shadow-xs transition-all active:scale-95"
            >
              <span>Back to Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-[1360px] mx-auto px-4 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
            {[
              { id: "all", label: "All Guidelines", icon: Layers },
              { id: "foundations", label: "Foundations & Tokens", icon: Palette },
              { id: "elements", label: "Buttons & Form Controls", icon: Sliders },
              { id: "components", label: "Product Cards & Badges", icon: Component },
              { id: "dialogs", label: "Modals & Dialogs", icon: MessageSquare },
              { id: "tokens", label: "Tokens Spec Matrix", icon: Bookmark },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-amber-400 text-gray-900 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Copy Notification Toast */}
      {copiedValue && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-gray-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>Copied &quot;{copiedValue}&quot; to clipboard!</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-[1360px] mx-auto px-4 lg:px-8 pt-8 space-y-12">
        {/* Hero Introduction */}
        <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-[#fab528] rounded-3xl p-8 md:p-12 text-gray-900 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-end pr-8">
            <Sparkles className="w-72 h-72 text-white" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-xs text-xs font-extrabold tracking-wider uppercase mb-4 text-amber-950 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>DESIGN.md Implementation Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4 text-gray-900">
              Farmart Design System & Style Guide
            </h1>
            <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed mb-6">
              A comprehensive single source of truth for design tokens, typography scales,
              interactive components, color harmony, and accessibility standards powering Farmart.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#colors"
                className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
              >
                Browse Color Tokens
              </a>
              <a
                href="#cards"
                className="px-5 py-2.5 bg-white/90 hover:bg-white text-gray-900 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-2xs border border-white/50"
              >
                Interactive Cards Preview
              </a>
              <a
                href="#dialogs"
                className="px-5 py-2.5 bg-white/90 hover:bg-white text-gray-900 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-2xs border border-white/50"
              >
                Dialogs & Modals
              </a>
              <Link
                href="/products"
                className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>Open Product List Page</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: COLOR PALETTES & DESIGN TOKENS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "foundations") && (
          <section id="colors" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Palette className="w-6 h-6 text-amber-500" />
                  <span>1. Color Token Architecture</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Click any color swatch to copy its Hex code or Tailwind class name.
                </p>
              </div>
              <span className="text-xs font-mono font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full w-fit">
                WCAG 2.1 AA Compliant
              </span>
            </div>

            {/* 1.1 Brand Primary */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Primary Brand Palette (Sunshine Amber)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {primaryTokens.map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.hex)}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
                  >
                    <div
                      className={`h-24 w-full rounded-xl ${token.twClass} flex items-end p-2.5 border border-black/5 shadow-inner transition-transform group-hover:scale-[1.02]`}
                    >
                      <button
                        type="button"
                        className="bg-white/90 backdrop-blur-xs p-1.5 rounded-md text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                        title="Copy hex"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">{token.name}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                        <span className="text-amber-700 font-bold">{token.hex}</span>
                        <span className="text-gray-400">{token.variable}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2 line-clamp-2">
                        {token.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1.2 Neutral & Surface Palette */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Neutral, Canvas & Surface Palette
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {neutralTokens.map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.hex)}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                  >
                    <div
                      className={`h-16 w-full rounded-xl ${token.twClass} flex items-end p-2 border border-gray-200/60 shadow-inner group-hover:scale-[1.02] transition-transform`}
                    >
                      <button
                        type="button"
                        className="bg-white/90 p-1.5 rounded-md text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                        title="Copy hex"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="mt-2.5">
                      <span className="text-xs font-bold text-gray-900 block truncate">
                        {token.name}
                      </span>
                      <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                        <span className="text-gray-800 font-bold">{token.hex}</span>
                        <span className="text-gray-400">{token.twClass}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                        {token.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1.3 Semantic Signals & Feedback */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Semantic Signals & Status Colors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {semanticTokens.map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.hex)}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div
                      className={`h-16 w-full rounded-xl ${token.twClass} flex items-end p-2 border border-black/5 shadow-inner group-hover:scale-[1.02] transition-transform`}
                    />
                    <div className="mt-2.5">
                      <span className="text-xs font-bold text-gray-900 block truncate">
                        {token.name}
                      </span>
                      <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                        <span className="text-gray-800 font-bold">{token.hex}</span>
                        <span className="text-gray-400">{token.variable}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                        {token.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1.4 Department Pastels */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Department Soft Pastels (Category & Promo Cards)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {departmentPastelTokens.map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.hex)}
                    className="bg-white rounded-2xl p-3 border border-gray-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group text-center"
                  >
                    <div
                      className={`h-14 w-full rounded-xl ${token.twClass} border border-black/5 shadow-inner group-hover:scale-105 transition-transform mb-2`}
                    />
                    <span className="text-xs font-bold text-gray-900 block truncate">
                      {token.name}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500 block mt-0.5">
                      {token.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 2: TYPOGRAPHY HIERARCHY
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "foundations") && (
          <section id="typography" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Type className="w-6 h-6 text-amber-500" />
                  <span>2. Typography Hierarchy (Geist Sans & Mono)</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Type scales and letter-spacing tuned for grocery scanning and high read-speed.
                </p>
              </div>
            </div>

            {/* Interactive Font Preview Tester */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
                Typeface Live Sandbox (Type custom text to preview typography scale):
              </label>
              <input
                type="text"
                value={fontTestText}
                onChange={(e) => setFontTestText(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                placeholder="Type preview text..."
              />
            </div>

            {/* Type Scales Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
              <div className="divide-y divide-gray-100">
                {/* Display Hero */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-3">
                    <span className="text-xs font-bold text-amber-600 block uppercase tracking-wider">
                      Display Hero
                    </span>
                    <span className="text-xs text-gray-400 font-mono">42px / ExtraBold / -0.025em</span>
                  </div>
                  <div className="lg:col-span-9">
                    <div className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                      {fontTestText}
                    </div>
                  </div>
                </div>

                {/* Heading 1 */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-3">
                    <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      Heading 1 (H1)
                    </span>
                    <span className="text-xs text-gray-400 font-mono">32px / Bold / -0.02em</span>
                  </div>
                  <div className="lg:col-span-9">
                    <div className="text-3xl font-bold tracking-tight text-gray-900">
                      {fontTestText}
                    </div>
                  </div>
                </div>

                {/* Heading 2 */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-3">
                    <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      Heading 2 (Section Title)
                    </span>
                    <span className="text-xs text-gray-400 font-mono">24px / Bold / -0.015em</span>
                  </div>
                  <div className="lg:col-span-9">
                    <div className="text-2xl font-bold tracking-tight text-gray-900">
                      Top Saver Today & Best Seller Items
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-3">
                    <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      Price Token (Hero vs Regular)
                    </span>
                    <span className="text-xs text-gray-400 font-mono">24px Black vs 14px Strikethrough</span>
                  </div>
                  <div className="lg:col-span-9 flex items-baseline gap-3">
                    <span className="text-2xl font-black text-amber-600 tracking-tight">$80.00</span>
                    <span className="text-sm font-semibold text-gray-400 line-through">$105.00</span>
                    <span className="text-xs font-extrabold bg-red-500 text-white px-2 py-0.5 rounded-md">
                      -24%
                    </span>
                  </div>
                </div>

                {/* Body & Caption */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-3">
                    <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      Body & Captions
                    </span>
                    <span className="text-xs text-gray-400 font-mono">14px Regular & 11px Muted</span>
                  </div>
                  <div className="lg:col-span-9 space-y-1">
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                      Farmart is your trusted neighborhood grocery market, delivering certified organic
                      produce, sun-ripened orchard fruits, and farm fresh dairy within hours.
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      Free delivery on all neighborhood baskets over $50.00.
                    </p>
                  </div>
                </div>

                {/* Micro Overline Badge */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-3">
                    <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      Brand Overline / Badge
                    </span>
                    <span className="text-xs text-gray-400 font-mono">10px ExtraBold Uppercase</span>
                  </div>
                  <div className="lg:col-span-9 flex items-center gap-3">
                    <span className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">
                      BRAND: FARMART ORGANICS
                    </span>
                    <span className="text-[10px] font-extrabold tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase border border-amber-200">
                      FRESH HARVEST
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 3: SPACING, RADIUS & SHADOWS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "foundations") && (
          <section id="spacing" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                <Layers className="w-6 h-6 text-amber-500" />
                <span>3. Border Radii, Elevation & Shadows</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Visual geometry standards giving Farmart its friendly, approachable aesthetic.
              </p>
            </div>

            {/* Border Radii */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Border Radius Tokens
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: "rounded (4px)", radius: "rounded", usage: "Quantity buttons" },
                  { name: "rounded-md (6px)", radius: "rounded-md", usage: "Discount tags" },
                  { name: "rounded-lg (8px)", radius: "rounded-lg", usage: "Input boxes, buttons" },
                  { name: "rounded-xl (12px)", radius: "rounded-xl", usage: "Icon containers, toasts" },
                  { name: "rounded-2xl (16px)", radius: "rounded-2xl", usage: "Product cards, banners" },
                  { name: "rounded-full (9999px)", radius: "rounded-full", usage: "Pill tags, avatars" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs text-center flex flex-col items-center justify-between"
                  >
                    <div
                      className={`w-16 h-16 ${item.radius} bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-xs font-mono font-bold text-amber-900 mb-3`}
                    >
                      {item.radius.replace("rounded-", "") || "4px"}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">{item.name}</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{item.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shadows & Elevation */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Elevation & Shadow Levels
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: "shadow-2xs (Resting border)",
                    twClass: "shadow-2xs",
                    desc: "Subtle definition on pure white elements",
                  },
                  {
                    name: "shadow-sm (Card Default)",
                    twClass: "shadow-sm",
                    desc: "Standard resting elevation for product cards",
                  },
                  {
                    name: "shadow-md (Card Hover)",
                    twClass: "shadow-md",
                    desc: "Active hover state for interactive product cards",
                  },
                  {
                    name: "shadow-xl (Dropdown/Toast)",
                    twClass: "shadow-xl",
                    desc: "Floating mega menu & global cart toasts",
                  },
                ].map((shadow) => (
                  <div
                    key={shadow.name}
                    className={`bg-white rounded-2xl p-5 border border-gray-100 ${shadow.twClass} transition-transform hover:-translate-y-1`}
                  >
                    <span className="text-xs font-mono font-bold text-amber-600 block">
                      {shadow.name}
                    </span>
                    <p className="text-xs text-gray-500 mt-2">{shadow.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 4: BUTTONS & INTERACTIVE CONTROLS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "elements") && (
          <section id="buttons" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Sliders className="w-6 h-6 text-amber-500" />
                  <span>4. Buttons & Interactive Controls</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Complete matrix of action buttons, wishlists, quantity steppers, and states.
                </p>
              </div>
            </div>

            {/* Buttons Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Primary Yellow Buttons */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                  Primary Brand (Farmart Yellow)
                </span>
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs hover:shadow active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Shop By Category</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: "design-button-demo",
                        name: "Sample Grocery Item",
                        price: 12.0,
                        image:
                          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80",
                      })
                    }
                    className="w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (Interactive)</span>
                  </button>

                  <button
                    type="button"
                    disabled
                    className="w-full bg-amber-200 text-amber-800/60 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider cursor-not-allowed"
                  >
                    Disabled Primary
                  </button>
                </div>
              </div>

              {/* Secondary & Outline Buttons */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                  Secondary & Outline Actions
                </span>
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2"
                  >
                    <span>Discover Flavors</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className="w-full border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View All Offers</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    className="w-full bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold px-4 py-2.5 rounded-lg text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Subtle Tint Action</span>
                  </button>
                </div>
              </div>

              {/* Wishlist, Stepper & Micro Controls */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                  Wishlist & Stepper Controls
                </span>

                {/* Interactive Quantity Stepper */}
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[11px] font-bold text-gray-600 block mb-2">
                    Interactive Stepper:
                  </span>
                  <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white p-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setDealQty((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-gray-900">
                      {dealQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDealQty((q) => q + 1)}
                      className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Circular Icon Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleWishlist("design-wishlist-demo")}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                      wishlist.includes("design-wishlist-demo")
                        ? "bg-red-50 border-red-200 text-red-500 shadow-xs"
                        : "bg-white border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200 shadow-2xs"
                    }`}
                    title="Toggle wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlist.includes("design-wishlist-demo") ? "fill-red-500" : ""
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-amber-600 hover:border-amber-300 shadow-2xs flex items-center justify-center transition-colors"
                    title="Quick search"
                  >
                    <Search className="w-4 h-4" />
                  </button>

                  <div className="relative">
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full bg-amber-500 text-gray-950 flex items-center justify-center shadow-xs"
                      title="Cart icon"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center px-1">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 5: BADGES, TAGS & STATUS INDICATORS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "elements") && (
          <section id="badges" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                <Bookmark className="w-6 h-6 text-amber-500" />
                <span>5. Badges, Pills & Status Indicators</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Visual micro-indicators for discounts, flash deals, stock availability, and categories.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Discount Badges */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Discount Stickers
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-red-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-2xs">
                      -15%
                    </span>
                    <span className="bg-red-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-2xs">
                      -30% OFF
                    </span>
                    <span className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                      HOT DEAL
                    </span>
                  </div>
                </div>

                {/* Stock Indicators */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Stock Availability
                  </span>
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>IN STOCK (45 available)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 block w-fit">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>ONLY 3 LEFT IN STOCK</span>
                    </span>
                  </div>
                </div>

                {/* Campaign & Tag Pills */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Campaign Pill Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-900 text-xs font-bold tracking-wide uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      <span>Active Summer</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold tracking-wide uppercase">
                      <span>Organic Pure</span>
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Rating Micro-components
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-800">4.9</span>
                      <span className="text-xs text-gray-400">(128 reviews)</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <Star className="w-3.5 h-3.5 text-gray-300" />
                      </div>
                      <span className="text-xs text-gray-400">(42)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 6: FORM CONTROLS & INPUTS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "elements") && (
          <section id="inputs" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="w-6 h-6 text-amber-500" />
                <span>6. Form Inputs & Interactive Controls</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Store search with dropdown category selector, newsletter subscription, and input fields.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Universal Header Search Input */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Store Universal Search Bar with Category Selector
                </span>

                <div className="relative">
                  <div className="flex items-center w-full border-2 border-gray-100 rounded-lg bg-gray-50/70 focus-within:border-amber-400 focus-within:bg-white transition-all shadow-xs">
                    {/* Category Select Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsSearchCatOpen(!isSearchCatOpen)}
                        className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:text-gray-900 shrink-0 uppercase tracking-wide border-r border-gray-200"
                      >
                        <span>{sampleSearchCategory}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                      </button>

                      {isSearchCatOpen && (
                        <div className="absolute left-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-lg shadow-xl py-1.5 z-50 text-xs font-medium">
                          {["ALL CATEGORIES", "FRUITS & VEG", "BREADS & SWEETS", "RAW MEATS"].map(
                            (cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  setSampleSearchCategory(cat);
                                  setIsSearchCatOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between"
                              >
                                {cat}
                                {sampleSearchCategory === cat && (
                                  <Check className="w-3.5 h-3.5 text-amber-500" />
                                )}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="I'm shopping for organic mangoes, fresh milk..."
                      className="flex-1 bg-transparent px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 outline-none"
                    />

                    <button
                      type="button"
                      className="px-4 py-2.5 text-gray-600 hover:text-amber-600 transition-colors"
                      title="Search"
                    >
                      <Search className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400">
                  Focus state applies <code>border-amber-400</code> with white surface fill.
                </p>
              </div>

              {/* Newsletter Subscription Input */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Newsletter Subscription Control
                </span>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-amber-400 focus:bg-white shadow-2xs"
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Password field with toggle */}
                <div className="pt-2">
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Secure account password"
                      defaultValue="SecretGroceryPass123"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-10 py-2 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 7: COMPLETE COMPONENT BLUEPRINTS & CARDS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "components") && (
          <section id="cards" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                <Component className="w-6 h-6 text-amber-500" />
                <span>7. Component Blueprints & Live Cards</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Fully functional, live representations of Farmart product cards, deal spotlights, and badges.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 7.1 Deal of the Day Spotlight Hero Card (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-amber-400/60 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  {/* Top Bar with Countdown */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-1.5 text-red-600 font-extrabold text-xs tracking-wider uppercase">
                      <Flame className="w-4 h-4 fill-red-500 text-red-500" />
                      <span>Deal of The Day</span>
                    </div>
                    {/* Countdown */}
                    <div className="flex items-center gap-1 font-mono text-xs font-black">
                      <span className="bg-gray-900 text-white px-2 py-0.5 rounded">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span>:</span>
                      <span className="bg-gray-900 text-white px-2 py-0.5 rounded">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span>:</span>
                      <span className="bg-gray-900 text-white px-2 py-0.5 rounded">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Product Visual */}
                  <div className="relative w-full h-48 my-4 flex items-center justify-center">
                    <Image
                      src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80"
                      alt="Sun Maid Raisin"
                      width={200}
                      height={200}
                      className="object-contain max-h-44 hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-0 left-0 bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                      -24%
                    </span>
                  </div>

                  {/* Details */}
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                    BRAND NAME
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-0.5 line-clamp-1">
                    Sun Maid Raisin, Natural Organic (6-Pack)
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">(12 reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2.5 mt-3">
                    <span className="text-2xl font-black text-amber-600">$80.00</span>
                    <span className="text-sm font-semibold text-gray-400 line-through">$105.00</span>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Sold: 25</span>
                      <span>Total: 60</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all"
                        style={{ width: "42%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-gray-100 mt-6 flex items-center gap-3">
                  <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-1">
                    <button
                      type="button"
                      onClick={() => setDealQty((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center shadow-2xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-gray-900">
                      {dealQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDealQty((q) => q + 1)}
                      className="w-7 h-7 rounded bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart(
                        {
                          id: "deal-hero-sunmaid",
                          name: "Sun Maid Raisin, Natural Organic (6-Pack)",
                          price: 80.0,
                          image:
                            "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80",
                        },
                        dealQty
                      )
                    }
                    className="flex-1 bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-2xs flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* 7.2 Standard Product Grid Cards (7 cols: 2 cards side by side) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "design-prod-1",
                    name: "British Beef Mince (10% Lean Fat)",
                    brand: "Meat Brand",
                    price: 12.5,
                    oldPrice: 14.0,
                    discount: "-15%",
                    image:
                      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80",
                    rating: 5,
                    reviews: 15,
                    sold: 18,
                    total: 30,
                  },
                  {
                    id: "design-prod-2",
                    name: "Farmart Farmhouse Soft White Bread",
                    brand: "Farmart Bakery",
                    price: 3.7,
                    image:
                      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
                    rating: 4,
                    reviews: 8,
                    sold: 12,
                    total: 20,
                  },
                ].map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-amber-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Top Badge & Wishlist */}
                        <div className="flex items-center justify-between mb-2">
                          {product.discount ? (
                            <span className="bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                              {product.discount}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              FRESH
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                              isWishlisted
                                ? "bg-red-50 border-red-200 text-red-500"
                                : "bg-white border-gray-200 text-gray-400 hover:text-red-500 shadow-2xs"
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500" : ""}`} />
                          </button>
                        </div>

                        {/* Product Image */}
                        <div className="relative w-full h-36 flex items-center justify-center my-1 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={140}
                            height={140}
                            className="object-contain max-h-32 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Meta */}
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mt-2">
                          {product.brand}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 mt-1 line-clamp-2 leading-tight group-hover:text-amber-700 transition-colors">
                          {product.name}
                        </h4>

                        {/* Stars */}
                        <div className="flex items-center gap-1 mt-1.5 text-amber-400">
                          {[...Array(product.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-[11px] text-gray-400 ml-1">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-base font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Stock Progress */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 mb-1">
                            <span>Sold: {product.sold}</span>
                            <span>{product.total}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-amber-400 h-full rounded-full"
                              style={{ width: `${(product.sold / product.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Add Button */}
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
                        className="mt-4 w-full bg-gray-50 hover:bg-[#fab528] text-gray-800 hover:text-gray-900 font-bold py-2 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-gray-200 hover:border-amber-400"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 7.3 Category Pills & Trust Badges Strip */}
            <div className="space-y-4 pt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Category Navigation Chips & Service Guarantees
              </span>

              {/* Category Chips Bar */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex flex-wrap items-center gap-2">
                {[
                  "Fruits & Vegetables",
                  "Breads & Sweets",
                  "Frozen Seafoods",
                  "Raw Meats",
                  "Wines & Alcohol Drinks",
                  "Milks & Dairies",
                ].map((cat) => {
                  const isActive = activeCategoryPill === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategoryPill(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-amber-400 text-gray-900 shadow-xs scale-102"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs">
                {[
                  {
                    icon: <Truck className="w-5 h-5 text-amber-500" />,
                    title: "Free Shipping",
                    desc: "For all orders over $50",
                  },
                  {
                    icon: <RotateCcw className="w-5 h-5 text-amber-500" />,
                    title: "30-Day Returns",
                    desc: "If goods have problems",
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
                    title: "100% Secure Payment",
                    desc: "Guaranteed safe & secure",
                  },
                  {
                    icon: <Headphones className="w-5 h-5 text-amber-500" />,
                    title: "24/7 Dedicated Support",
                    desc: "Anywhere & anytime assistance",
                  },
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                      {perk.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">
                        {perk.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 7.3 Reusable Catalog Design System Components */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>7.3 Reusable Catalog Components (ProductCard, Breadcrumbs, Pagination)</span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Modular design system components powering the new <code className="font-mono text-amber-800">/products</code> grocery catalog.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fab528] hover:bg-[#e59d12] text-gray-900 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-2xs active:scale-95 shrink-0"
                  >
                    <span>View /products Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Breadcrumbs Component Preview */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Breadcrumbs Component: &lt;Breadcrumbs /&gt;
                  </span>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <Breadcrumbs
                      items={[
                        { label: "Products", href: "/products" },
                        { label: "Fruits & Vegetables", href: "/products?category=Fruits%20%26%20Vegetables" },
                        { label: "Organic Fresh Strawberries (500g)" },
                      ]}
                    />
                  </div>
                </div>

                {/* ProductCard Component Preview (Grid vs List toggle) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      ProductCard Component (Grid &amp; List Mode): &lt;ProductCard /&gt;
                    </span>
                    <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                      <button
                        type="button"
                        onClick={() => setDemoViewMode("grid")}
                        className={`px-2 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                          demoViewMode === "grid"
                            ? "bg-white text-gray-900 shadow-2xs"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        Grid Mode
                      </button>
                      <button
                        type="button"
                        onClick={() => setDemoViewMode("list")}
                        className={`px-2 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                          demoViewMode === "list"
                            ? "bg-white text-gray-900 shadow-2xs"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        List Mode
                      </button>
                    </div>
                  </div>

                  <div
                    className={
                      demoViewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        : "space-y-3"
                    }
                  >
                    {mockProducts.slice(0, 3).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        viewMode={demoViewMode}
                        onQuickView={() => setIsQuickViewDialogOpen(true)}
                      />
                    ))}
                  </div>
                </div>

                {/* Pagination Component Preview */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Pagination Component: &lt;Pagination /&gt;
                  </span>
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    <Pagination
                      currentPage={demoPage}
                      totalPages={5}
                      onPageChange={(page) => setDemoPage(page)}
                      totalItems={60}
                      itemsPerPage={12}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 8: DIALOGS & MODAL OVERLAYS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "components" || activeTab === "dialogs") && (
          <section id="dialogs" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-amber-500" />
                  <span>8. Dialogs &amp; Modal Overlays</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Fully accessible, portalled modal dialogs adhering to DESIGN.md specs (rounded-2xl, shadow-2xl, backdrop blur).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                  Component Blueprint 6.6
                </span>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Confirmation / Order Review */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                      Primary Action
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">size=&quot;md&quot;</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    Order Confirmation Modal
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Standard confirmation dialog with amber icon badge, summary breakdown, and primary Farmart yellow CTA button.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsConfirmDialogOpen(true)}
                  className="w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs hover:shadow active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Launch Confirmation Modal</span>
                </button>
              </div>

              {/* Card 2: Destructive / Danger Alert */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                      Destructive
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">size=&quot;sm&quot;</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    Destructive Action Alert
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Compact danger modal featuring coral red alert badge, confirmation safeguard message, and red CTA button.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDangerDialogOpen(true)}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <span>Launch Destructive Modal</span>
                </button>
              </div>

              {/* Card 3: Product Quick View */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      E-Commerce Rich
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">size=&quot;2xl&quot;</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    Product Quick View Modal
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Extra-wide product showcase panel with image spotlight, interactive quantity stepper, rating, and add-to-cart trigger.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuickViewDialogOpen(true)}
                  className="w-full bg-gray-900 hover:bg-black text-white font-bold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors shadow-2xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>Launch Product Quick View</span>
                </button>
              </div>

              {/* Card 4: Promotional Newsletter */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Promotion &amp; Form
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">size=&quot;md&quot;</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    Promo Coupon &amp; Subscription
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Newsletter capture modal with embedded coupon copy chip, text input field, and voucher claim trigger.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPromoDialogOpen(true)}
                  className="w-full border border-gray-200 hover:border-amber-400 bg-white text-gray-800 font-bold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors shadow-2xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span>Launch Promo Coupon Modal</span>
                </button>
              </div>

              {/* Card 5: Success Order Notice */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Success State
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">size=&quot;md&quot;</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    Success Feedback Modal
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Positive completion modal featuring emerald checkmark badge, order status summary, and confirmation action.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSuccessDialogOpen(true)}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Launch Success Modal</span>
                </button>
              </div>

              {/* Card 6: Compound Components Architecture */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                      Architecture
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">Composable</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    Compound Subcomponents
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Exports <code className="text-amber-800 font-mono">DialogHeader</code>, <code className="text-amber-800 font-mono">DialogBody</code>, and <code className="text-amber-800 font-mono">DialogFooter</code> for fully customized layouts.
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/60 font-mono text-[11px] text-gray-600 leading-snug">
                  <div>&lt;Dialog isOpen=&#123;open&#125;&gt;</div>
                  <div className="pl-2">&lt;DialogHeader /&gt;</div>
                  <div className="pl-2">&lt;DialogBody /&gt;</div>
                  <div className="pl-2">&lt;DialogFooter /&gt;</div>
                  <div>&lt;/Dialog&gt;</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCompoundDialogOpen(true)}
                  className="w-full bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>Launch Compound Modal</span>
                </button>
              </div>
            </div>

            {/* Sizing Scale Playground */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Dialog Size Scale Matrix
                  </h3>
                  <p className="text-xs text-gray-500">
                    Test the 5 standardized width presets adhering to DESIGN.md responsive breakpoints.
                  </p>
                </div>
                <span className="text-xs font-mono text-gray-400">max-w-&#123;sm | md | lg | xl | 2xl&#125;</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { size: "sm", label: "Small (384px)", desc: "Quick alerts & confirms" },
                  { size: "md", label: "Medium (448px)", desc: "Standard forms & modals" },
                  { size: "lg", label: "Large (512px)", desc: "Multi-field forms" },
                  { size: "xl", label: "Extra Large (576px)", desc: "Detailed panels" },
                  { size: "2xl", label: "2X Large (672px)", desc: "Product quick view" },
                ].map((item) => (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => {
                      setCurrentDemoSize(item.size as DialogSize);
                      setSizeDemoOpen(true);
                    }}
                    className="p-3 rounded-xl border border-gray-200 hover:border-amber-400 bg-white hover:bg-amber-50/40 text-left transition-all group shadow-2xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-gray-900 uppercase group-hover:text-amber-800">
                        {item.size}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-800 block">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Specifications & Accessibility Token Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-800">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Visual &amp; Elevation Tokens</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1.5 leading-relaxed">
                  <li>• <strong>Surface:</strong> Clean white card (<code className="font-mono text-gray-800">bg-white</code>)</li>
                  <li>• <strong>Corner Radius:</strong> 16px (<code className="font-mono text-gray-800">rounded-2xl</code>)</li>
                  <li>• <strong>Shadow:</strong> High depth (<code className="font-mono text-gray-800">shadow-2xl</code>)</li>
                  <li>• <strong>Overlay:</strong> <code className="font-mono text-gray-800">bg-black/50 backdrop-blur-xs</code></li>
                  <li>• <strong>Border:</strong> Subtle <code className="font-mono text-gray-800">border-gray-100</code></li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>WAI-ARIA &amp; Accessibility</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1.5 leading-relaxed">
                  <li>• <strong>Role:</strong> <code className="font-mono text-gray-800">role=&quot;dialog&quot;</code>, <code className="font-mono text-gray-800">aria-modal=&quot;true&quot;</code></li>
                  <li>• <strong>Labelling:</strong> Linked <code className="font-mono text-gray-800">aria-labelledby</code> &amp; <code className="font-mono text-gray-800">aria-describedby</code></li>
                  <li>• <strong>Escape Dismiss:</strong> Native <code className="font-mono text-gray-800">ESC</code> key listener</li>
                  <li>• <strong>Scroll Lock:</strong> Body scroll frozen while active</li>
                  <li>• <strong>Outside Click:</strong> Backdrop dismissal enabled</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-800">
                  <Layers className="w-4 h-4 text-sky-500" />
                  <span>React 19 &amp; Next.js Portal</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1.5 leading-relaxed">
                  <li>• <strong>Portal Target:</strong> Rendered to <code className="font-mono text-gray-800">document.body</code></li>
                  <li>• <strong>Hydration-Safe:</strong> Mounted check prevents SSR mismatch</li>
                  <li>• <strong>Stacking Cleanliness:</strong> Immune to parent overflow &amp; z-index</li>
                  <li>• <strong>Animations:</strong> Smooth entry fade and zoom (<code className="font-mono text-gray-800">zoom-in-95</code>)</li>
                  <li>• <strong>Tree Shakeable:</strong> Zero external UI framework bloat</li>
                </ul>
              </div>
            </div>

            {/* Code Implementation Blueprint */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
              <div className="bg-gray-900 text-white px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Usage Snippet: @/components/Dialog</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `import { Dialog } from "@/components/Dialog";\n\n<Dialog\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Confirm Order"\n  description="Please review your items."\n  confirmText="Proceed"\n  cancelText="Cancel"\n  confirmVariant="primary"\n  onConfirm={handleConfirm}\n>\n  <p>Your modal body content here.</p>\n</Dialog>`
                    )
                  }
                  className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </button>
              </div>
              <div className="p-4 bg-gray-950 text-gray-200 font-mono text-xs overflow-x-auto leading-relaxed">
                <pre>{`import { Dialog } from "@/components/Dialog";

// Standard Controlled Dialog
<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Checkout Order"
  description="Please confirm your delivery address and total before proceeding."
  icon={<ShoppingBag className="w-6 h-6 text-amber-600" />}
  iconVariant="brand"
  size="md"
  confirmText="Proceed to Payment"
  cancelText="Review Cart"
  confirmVariant="primary"
  onConfirm={handleCheckout}
>
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
    <p>Body content rendered cleanly with Farmart tokens.</p>
  </div>
</Dialog>`}</pre>
              </div>
            </div>

            {/* --- Live Dialog Instances --- */}

            {/* 1. Confirmation Dialog */}
            <Dialog
              isOpen={isConfirmDialogOpen}
              onClose={() => setIsConfirmDialogOpen(false)}
              title="Confirm Checkout Order"
              description="Your order is almost ready! Please confirm your delivery address and total before proceeding."
              icon={<ShoppingBag className="w-6 h-6 text-amber-600" />}
              iconVariant="brand"
              size="md"
              confirmText="Proceed to Payment"
              cancelText="Review Cart"
              confirmVariant="primary"
              onConfirm={() => {
                addToCart({
                  id: "dialog-sample-order",
                  name: "Farm Fresh Family Bundle",
                  price: 49.99,
                  image:
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80",
                });
              }}
            >
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Estimated Delivery:</span>
                  <span className="font-bold text-gray-900">Today, 2:00 PM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Shipping Fee:</span>
                  <span className="font-bold text-emerald-600">FREE (Orders &gt; $50)</span>
                </div>
                <div className="border-t border-gray-200/60 pt-2 flex items-center justify-between font-bold text-sm text-gray-900">
                  <span>Total Due:</span>
                  <span className="text-amber-600 font-black">$49.99</span>
                </div>
              </div>
            </Dialog>

            {/* 2. Destructive Dialog */}
            <Dialog
              isOpen={isDangerDialogOpen}
              onClose={() => setIsDangerDialogOpen(false)}
              title="Remove Item from Cart?"
              description="Are you sure you want to remove this fresh organic item? You can always add it back later from the catalog."
              icon={<Trash2 className="w-6 h-6 text-red-600" />}
              iconVariant="danger"
              size="sm"
              confirmText="Yes, Remove"
              cancelText="Cancel"
              confirmVariant="danger"
              onConfirm={() => {
                copyToClipboard("Item removed from cart");
              }}
            >
              <p className="text-xs text-gray-500 bg-red-50/50 p-3 rounded-lg border border-red-100 leading-relaxed">
                Removing items during flash sale hours may forfeit current deal discount pricing.
              </p>
            </Dialog>

            {/* 3. Product Quick View Dialog */}
            <Dialog
              isOpen={isQuickViewDialogOpen}
              onClose={() => setIsQuickViewDialogOpen(false)}
              size="2xl"
              showCloseButton={true}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative aspect-square bg-[#f7f8fa] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-4">
                  <Image
                    src="https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=600&q=80"
                    alt="Fresh Organic Strawberries"
                    width={300}
                    height={300}
                    className="object-contain max-h-56"
                    unoptimized
                  />
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                    -23% OFF
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      IN STOCK (Northern Orchard)
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900">
                      Organic Farm Fresh Strawberries (500g)
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-semibold">(48 reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-amber-600">$8.50</span>
                    <span className="text-xs text-gray-400 line-through">$11.00</span>
                    <span className="text-xs font-bold text-emerald-600">Save $2.50</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    Hand-picked sweet strawberries cultivated organically without synthetic pesticides.
                    Delivered within 24 hours of morning harvest.
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50/60 p-1">
                      <button
                        type="button"
                        onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                        className="w-7 h-7 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-2xs cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-9 text-center text-xs font-bold text-gray-900">
                        {quickViewQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuickViewQty(quickViewQty + 1)}
                        className="w-7 h-7 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        for (let i = 0; i < quickViewQty; i++) {
                          addToCart({
                            id: "quickview-strawberries",
                            name: "Organic Farm Fresh Strawberries (500g)",
                            price: 8.5,
                            image:
                              "https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=300&q=80",
                          });
                        }
                        setIsQuickViewDialogOpen(false);
                      }}
                      className="flex-1 bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs hover:shadow active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart • ${(8.5 * quickViewQty).toFixed(2)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>

            {/* 4. Promo Dialog */}
            <Dialog
              isOpen={isPromoDialogOpen}
              onClose={() => setIsPromoDialogOpen(false)}
              title="Get 15% Off Your Next Basket"
              description="Subscribe to the Farmart Harvest Newsletter to receive fresh weekly discounts and farm-to-table recipes."
              icon={<Tag className="w-6 h-6 text-amber-600" />}
              iconVariant="brand"
              size="md"
            >
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-800 block">
                      PROMO CODE
                    </span>
                    <span className="text-base font-black tracking-wider text-gray-900 font-mono">
                      FARMART15
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("FARMART15")}
                    className="px-3 py-1.5 text-xs font-bold bg-white text-gray-800 border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-600" />
                    <span>Copy Code</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Enter your email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={promoEmail}
                      onChange={(e) => setPromoEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard("Subscribed with " + (promoEmail || "newsletter"));
                    setIsPromoDialogOpen(false);
                  }}
                  className="w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs hover:shadow active:scale-95 cursor-pointer"
                >
                  Claim 15% Voucher
                </button>
              </div>
            </Dialog>

            {/* 5. Success Dialog */}
            <Dialog
              isOpen={isSuccessDialogOpen}
              onClose={() => setIsSuccessDialogOpen(false)}
              title="Order Confirmed!"
              description="Your order #FMT-89240 has been placed successfully and is being packed with organic goodness."
              icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              iconVariant="success"
              size="md"
              confirmText="Done"
              cancelText="Download Receipt"
              confirmVariant="primary"
              onConfirm={() => setIsSuccessDialogOpen(false)}
            >
              <div className="space-y-3">
                <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Dispatch:</span>
                    <span className="font-bold text-gray-900">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Courier:</span>
                    <span className="font-bold text-gray-900">Farmart Express Cold Van</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Notification:</span>
                    <span className="font-bold text-gray-900">SMS updates sent to phone</span>
                  </div>
                </div>
              </div>
            </Dialog>

            {/* 6. Dynamic Size Demo Dialog */}
            <Dialog
              isOpen={sizeDemoOpen}
              onClose={() => setSizeDemoOpen(false)}
              title={`Dialog Size Preset: ${currentDemoSize.toUpperCase()}`}
              description={`Demonstrating responsive width constrained by size="${currentDemoSize}" based on DESIGN.md.`}
              size={currentDemoSize}
              confirmText="Close Demo"
              confirmVariant="primary"
            >
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 space-y-2">
                <p>
                  Active max-width token:{" "}
                  <code className="font-mono font-bold text-amber-700">
                    {currentDemoSize === "sm"
                      ? "max-w-sm (384px)"
                      : currentDemoSize === "md"
                      ? "max-w-md (448px)"
                      : currentDemoSize === "lg"
                      ? "max-w-lg (512px)"
                      : currentDemoSize === "xl"
                      ? "max-w-xl (576px)"
                      : "max-w-2xl (672px)"}
                  </code>
                </p>
                <p>
                  Features automatic responsive padding (<code className="font-mono">p-4 sm:p-6</code>) and centered viewport alignment with scroll protection.
                </p>
              </div>
            </Dialog>

            {/* 7. Compound Components Demo Dialog */}
            <Dialog
              isOpen={isCompoundDialogOpen}
              onClose={() => setIsCompoundDialogOpen(false)}
              size="lg"
              showCloseButton={false}
            >
              <DialogClose onClick={() => setIsCompoundDialogOpen(false)} />
              <DialogHeader>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[10px] font-extrabold uppercase tracking-wider w-fit">
                  Composable Architecture
                </div>
                <DialogTitle>Assembled with Subcomponents</DialogTitle>
                <DialogDescription>
                  This dialog utilizes fine-grained subcomponents: DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, and DialogClose.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 text-xs text-sky-950 space-y-2">
                  <p className="font-semibold">
                    Why use compound components?
                  </p>
                  <p className="text-gray-600">
                    Compound subcomponents let developers arrange custom headers, custom form grids, multi-step tabs, or customized footer actions without overriding the core Dialog modal accessibility or portal architecture.
                  </p>
                </div>
              </DialogBody>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setIsCompoundDialogOpen(false)}
                  className="border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard("Compound subcomponents tested");
                    setIsCompoundDialogOpen(false);
                  }}
                  className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs hover:shadow active:scale-95 cursor-pointer"
                >
                  Looks Great!
                </button>
              </DialogFooter>
            </Dialog>
          </section>
        )}

        {/* =========================================================================
            SECTION 9: DESIGN TOKENS SPECIFICATION MATRIX
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "tokens") && (
          <section id="tokens-matrix" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-amber-500" />
                  <span>9. DESIGN.md Tokens Matrix &amp; CSS Mapping</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Reference map connecting CSS variables, Tailwind classes, and DESIGN.md definitions.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-800 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Token Name</th>
                      <th className="py-3 px-4">CSS Custom Property</th>
                      <th className="py-3 px-4">Computed Value</th>
                      <th className="py-3 px-4">Tailwind 4 Utility</th>
                      <th className="py-3 px-4">Design Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Primary Amber</td>
                      <td className="py-3 px-4 text-amber-600">--primary-amber</td>
                      <td className="py-3 px-4">#fab528</td>
                      <td className="py-3 px-4 text-gray-800">bg-[#fab528]</td>
                      <td className="py-3 px-4 font-sans">Brand core action color</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Primary Amber Dark</td>
                      <td className="py-3 px-4 text-amber-600">--primary-amber-dark</td>
                      <td className="py-3 px-4">#e59d12</td>
                      <td className="py-3 px-4 text-gray-800">bg-[#e59d12]</td>
                      <td className="py-3 px-4 font-sans">Hover interaction state</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Page Canvas</td>
                      <td className="py-3 px-4 text-gray-500">--background</td>
                      <td className="py-3 px-4">#f7f8fa</td>
                      <td className="py-3 px-4 text-gray-800">bg-[#f7f8fa]</td>
                      <td className="py-3 px-4 font-sans">Default app backdrop</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Foreground Text</td>
                      <td className="py-3 px-4 text-gray-500">--foreground</td>
                      <td className="py-3 px-4">#191c1f</td>
                      <td className="py-3 px-4 text-gray-800">text-[#191c1f]</td>
                      <td className="py-3 px-4 font-sans">High-contrast body &amp; titles</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Max Container</td>
                      <td className="py-3 px-4 text-gray-500">--container-max</td>
                      <td className="py-3 px-4">1360px</td>
                      <td className="py-3 px-4 text-gray-800">max-w-[1360px]</td>
                      <td className="py-3 px-4 font-sans">Standard layout boundary</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Card Radius</td>
                      <td className="py-3 px-4 text-gray-500">--radius-card</td>
                      <td className="py-3 px-4">16px</td>
                      <td className="py-3 px-4 text-gray-800">rounded-2xl</td>
                      <td className="py-3 px-4 font-sans">Product cards, banners &amp; dialogs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Control Radius</td>
                      <td className="py-3 px-4 text-gray-500">--radius-control</td>
                      <td className="py-3 px-4">8px</td>
                      <td className="py-3 px-4 text-gray-800">rounded-lg</td>
                      <td className="py-3 px-4 font-sans">Buttons, inputs, dropdowns</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Dialog Overlay</td>
                      <td className="py-3 px-4 text-gray-500">--overlay-backdrop</td>
                      <td className="py-3 px-4">rgba(0,0,0,0.5)</td>
                      <td className="py-3 px-4 text-gray-800">bg-black/50 backdrop-blur-xs</td>
                      <td className="py-3 px-4 font-sans">Modal focus dimming backdrop</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Dialog Elevation</td>
                      <td className="py-3 px-4 text-gray-500">--elevation-dialog</td>
                      <td className="py-3 px-4">shadow-2xl</td>
                      <td className="py-3 px-4 text-gray-800">shadow-2xl</td>
                      <td className="py-3 px-4 font-sans">Floating modal surface shadow</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Font Sans</td>
                      <td className="py-3 px-4 text-gray-500">--font-geist-sans</td>
                      <td className="py-3 px-4">Geist Sans</td>
                      <td className="py-3 px-4 text-gray-800">font-sans</td>
                      <td className="py-3 px-4 font-sans">Primary UI typography</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Floating Global Cart Toast for Interactive Previews */}
      <CartToast />
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <CartProvider>
      <DesignSystemContent />
    </CartProvider>
  );
}
