"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Palette,
  Type,
  Layers,
  Component,
  Copy,
  Sparkles,
  Search,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Mail,
  Eye,
  Flame,
  ArrowRight,
  Sliders,
  CheckCircle2,
  FileText,
  Bookmark,
  MessageSquare,
  X,
  CheckCircle,
  LayoutGrid,
  Trash2,
  AlertTriangle,
  Info,
  MapPin,
  Package,
} from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import CartToast from "@/components/CartToast";
import Badge from "@/components/Badge";
import QuantityStepper from "@/components/QuantityStepper";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogBadge,
  DialogSize,
} from "@/components/Dialog";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import ProductFilters, { CategoryCount, BrandCount } from "@/components/ProductFilters";
import { mockProducts } from "@/data/products";
import { FilterState } from "@/types/product";

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
    name: "color-primary (Brand Amber)",
    variable: "--color-primary",
    hex: "#fab528",
    twClass: "bg-[#fab528]",
    usage: "Primary CTA buttons, category menu button, badge accents",
  },
  {
    name: "color-primary-dark",
    variable: "--color-primary-dark",
    hex: "#e59d12",
    twClass: "bg-[#e59d12]",
    usage: "Hover state for primary buttons and interactive accents",
  },
  {
    name: "color-primary-light",
    variable: "--color-primary-light",
    hex: "#fef3c7",
    twClass: "bg-amber-100",
    usage: "Subtle chip backgrounds, icon containers, highlights",
  },
  {
    name: "color-primary-tint",
    variable: "--color-primary-tint",
    hex: "#fffbeb",
    twClass: "bg-amber-50",
    usage: "Card badges, soft notification backgrounds, icon frames",
  },
  {
    name: "color-primary-text",
    variable: "--color-primary-text",
    hex: "#92400e",
    twClass: "text-amber-800",
    usage: "Text on light amber backgrounds for WCAG AA compliance",
  },
];

const neutralTokens: ColorToken[] = [
  {
    name: "color-canvas",
    variable: "--color-canvas",
    hex: "#f7f8fa",
    twClass: "bg-[#f7f8fa]",
    usage: "Main application page background",
  },
  {
    name: "color-surface",
    variable: "--color-surface",
    hex: "#ffffff",
    twClass: "bg-white",
    usage: "Product cards, navigation bars, dropdown containers",
  },
  {
    name: "color-surface-subtle",
    variable: "--color-surface-subtle",
    hex: "#f9fafb",
    twClass: "bg-gray-50",
    usage: "Input backgrounds, alternate table rows, badge backdrops",
  },
  {
    name: "color-border-subtle",
    variable: "--color-border-subtle",
    hex: "#f3f4f6",
    twClass: "border-gray-100",
    usage: "Subtle card borders, dividers, list separators",
  },
  {
    name: "color-border-default",
    variable: "--color-border-default",
    hex: "#e5e7eb",
    twClass: "border-gray-200",
    usage: "Input outlines, standard button borders",
  },
  {
    name: "color-border-focus",
    variable: "--color-border-focus",
    hex: "#fab528",
    twClass: "focus:border-amber-400",
    usage: "Active input outline, focused element ring",
  },
  {
    name: "color-text-primary",
    variable: "--color-text-primary",
    hex: "#191c1f",
    twClass: "text-gray-900",
    usage: "Headlines, primary product names, main navigation",
  },
  {
    name: "color-text-secondary",
    variable: "--color-text-secondary",
    hex: "#4b5563",
    twClass: "text-gray-600",
    usage: "Body copy, secondary links, descriptions",
  },
  {
    name: "color-text-muted",
    variable: "--color-text-muted",
    hex: "#9ca3af",
    twClass: "text-gray-400",
    usage: "Strikethrough pricing, placeholder text, breadcrumbs",
  },
  {
    name: "color-text-inverse",
    variable: "--color-text-inverse",
    hex: "#ffffff",
    twClass: "text-white",
    usage: "Text on dark buttons, toast alerts, discount badges",
    contrastOnDark: true,
  },
];

const semanticTokens: ColorToken[] = [
  {
    name: "color-success",
    variable: "--color-success",
    hex: "#10b981",
    twClass: "bg-emerald-500",
    usage: "In Stock status, completed checks, verified badges",
  },
  {
    name: "color-success-bg",
    variable: "--color-success-bg",
    hex: "#ecfdf5",
    twClass: "bg-emerald-50",
    usage: "In stock pills, success alert container",
  },
  {
    name: "color-danger",
    variable: "--color-danger",
    hex: "#ef4444",
    twClass: "bg-red-500",
    usage: "Discount stickers (-15%), low stock alerts, errors",
  },
  {
    name: "color-danger-bg",
    variable: "--color-danger-bg",
    hex: "#fef2f2",
    twClass: "bg-red-50",
    usage: "Discount container, error banners",
  },
  {
    name: "color-warning",
    variable: "--color-warning",
    hex: "#f59e0b",
    twClass: "bg-amber-500",
    usage: "Star ratings, deal countdown fire icon",
  },
  {
    name: "color-info",
    variable: "--color-info",
    hex: "#0284c7",
    twClass: "bg-sky-500",
    usage: "Seafood badges, info tooltips, active filters",
  },
];

const departmentTokens: ColorToken[] = [
  {
    name: "dept-lavender",
    variable: "--dept-lavender",
    hex: "#e8e4f8",
    twClass: "bg-[#e8e4f8]",
    usage: "Food Pouch / Snack release promo tiles",
  },
  {
    name: "dept-sand",
    variable: "--dept-sand",
    hex: "#eee9df",
    twClass: "bg-[#eee9df]",
    usage: "Organic Tea / Grains / Bakery department cards",
  },
  {
    name: "dept-sky",
    variable: "--dept-sky",
    hex: "#d8eef5",
    twClass: "bg-[#d8eef5]",
    usage: "Soda drinks / Frozen seafoods department banners",
  },
  {
    name: "dept-mint",
    variable: "--dept-mint",
    hex: "#d9ede2",
    twClass: "bg-[#d9ede2]",
    usage: "Fresh meats / Farm vegetables department cards",
  },
  {
    name: "dept-peach",
    variable: "--dept-peach",
    hex: "#ffe8df",
    twClass: "bg-[#ffe8df]",
    usage: "Fresh fruits / Summer specialties promo cards",
  },
  {
    name: "dept-lemon",
    variable: "--dept-lemon",
    hex: "#fef9c3",
    twClass: "bg-[#fef9c3]",
    usage: "Dairies, butter & fresh cheese category cards",
  },
];

// Spacing scale tokens
const spacingTokens = [
  { token: "space-1", size: "4px", tw: "p-1, gap-1", usage: "Micro-badge padding, star rating gaps" },
  { token: "space-2", size: "8px", tw: "p-2, gap-2", usage: "Wishlist button padding, tag gaps, inline icon margins" },
  { token: "space-3", size: "12px", tw: "p-3, gap-3", usage: "Category button padding, stepper component sizing" },
  { token: "space-4", size: "16px", tw: "p-4, gap-4", usage: "Standard card internal padding, form input spacing" },
  { token: "space-5", size: "20px", tw: "p-5, gap-5", usage: "Product card body padding, section header gaps" },
  { token: "space-6", size: "24px", tw: "p-6, gap-6", usage: "Major card inner padding, trust badge grid padding" },
  { token: "space-8", size: "32px", tw: "py-8, gap-8", usage: "Section vertical spacing, footer link columns" },
  { token: "space-12", size: "48px", tw: "py-12", usage: "Major hero banners, footer container spacing" },
];

// Elevation levels
const elevationTokens = [
  {
    token: "shadow-2xs",
    spec: "0 1px 2px rgba(0,0,0,0.03)",
    twClass: "shadow-2xs",
    usage: "Subtle borders on light elements, stepper button resting",
  },
  {
    token: "shadow-sm",
    spec: "0 1px 3px rgba(0,0,0,0.05)",
    twClass: "shadow-sm",
    usage: "Base product card resting state, trust badge container",
  },
  {
    token: "shadow-md",
    spec: "0 4px 6px -1px rgba(0,0,0,0.07)",
    twClass: "shadow-md",
    usage: "Product card hover state, sticky navigation bar",
  },
  {
    token: "shadow-xl",
    spec: "0 20px 25px -5px rgba(0,0,0,0.1)",
    twClass: "shadow-xl",
    usage: "Floating mega menu, category select popup, cart toast",
  },
  {
    token: "shadow-amber",
    spec: "0 4px 14px 0 rgba(250,181,40,0.35)",
    twClass: "shadow-[0_4px_14px_0_rgba(250,181,40,0.35)]",
    usage: "Primary CTA button elevation on hover interaction",
  },
];

// Shape tokens
const shapeTokens = [
  { name: "radius-sm", px: "4px", tw: "rounded", usage: "Quantity stepper counters, small tooltips" },
  { name: "radius-md", px: "6px", tw: "rounded-md", usage: "Action buttons, discount percentage badges" },
  { name: "radius-lg", px: "8px", tw: "rounded-lg", usage: "Search input box, dropdown menus, tab buttons" },
  { name: "radius-xl", px: "12px", tw: "rounded-xl", usage: "Feature icon containers, trust badge boxes, toast alerts" },
  { name: "radius-2xl", px: "16px", tw: "rounded-2xl", usage: "Product cards, deal showcase panels, hero banners, dialogs" },
  { name: "radius-full", px: "9999px", tw: "rounded-full", usage: "Wishlist circular buttons, avatar indicators, pill tags" },
];

function DesignSystemContent() {
  const [activeTab, setActiveTab] = useState<
    "all" | "foundations" | "elements" | "components" | "detail" | "dialogs" | "dos-donts" | "tokens"
  >("all");

  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [stepperVal, setStepperVal] = useState(1);
  const [stepperSize, setStepperSize] = useState<"sm" | "md" | "lg">("md");
  const [activePage, setActivePage] = useState(1);
  const [previewViewMode, setPreviewViewMode] = useState<"grid" | "list">("grid");

  // Type tester state
  const [sampleText, setSampleText] = useState("Fresh Organic Farm Harvest");
  const [sampleWeight, setSampleWeight] = useState("font-bold");

  // Dialog Demo states
  const [activeSizeDialog, setActiveSizeDialog] = useState<DialogSize | null>(null);
  const [isDestructiveAlertOpen, setIsDestructiveAlertOpen] = useState(false);
  const [isNewsletterDialogOpen, setIsNewsletterDialogOpen] = useState(false);
  const [isAddressFormDialogOpen, setIsAddressFormDialogOpen] = useState(false);
  const [isDataMatrixDialogOpen, setIsDataMatrixDialogOpen] = useState(false);
  const [isQuickViewDialogOpen, setIsQuickViewDialogOpen] = useState(false);
  const [quickViewQty, setQuickViewQty] = useState(1);

  // Filter sidebar demo state
  const [filterState, setFilterState] = useState<FilterState>({
    category: "All",
    searchTerm: "",
    priceRange: [0, 100],
    brands: [],
    minRating: null,
    inStockOnly: false,
    onSaleOnly: false,
  });

  const demoCategories: CategoryCount[] = [
    { name: "Fruits & Vegetables", count: 124 },
    { name: "Breads & Sweets", count: 86 },
    { name: "Frozen Seafoods", count: 54 },
    { name: "Raw Meats", count: 68 },
    { name: "Coffees and Teas", count: 42 },
    { name: "Milks and Dairies", count: 39 },
  ];

  const demoBrands: BrandCount[] = [
    { name: "Green Harvest", count: 48 },
    { name: "Farmart", count: 62 },
    { name: "Ocean Delight", count: 24 },
    { name: "Golden Bakery", count: 35 },
    { name: "Nature's Pride", count: 19 },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(null), 2200);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-gray-900 pb-24 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Application Header for Style Guide */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer select-none">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-500 shadow-xs border border-amber-300/40 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-amber-500 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-gray-900 leading-none">Farmart</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#fab528] text-gray-950 uppercase tracking-wider">
                  DESIGN.MD SPEC
                </span>
              </div>
              <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase block mt-0.5">
                Official Design System &amp; Tokens Guide
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
              <span>Catalog</span>
            </Link>
            <Link
              href="/products/prod-1"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Product Detail</span>
            </Link>
            <Link
              href="/overview"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-900 bg-rose-50 rounded-lg border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-rose-600" />
              <span>UI Flow</span>
            </Link>
            <a
              href="#tokens-matrix"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>YAML Frontmatter</span>
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
              { id: "components", label: "Product Cards & Sidebar", icon: Component },
              { id: "detail", label: "Product Detail Page", icon: Package },
              { id: "dialogs", label: "Modals & Dialogs", icon: MessageSquare },
              { id: "dos-donts", label: "Do's & Don'ts", icon: CheckCircle2 },
              { id: "tokens", label: "Tokens Matrix & YAML", icon: Bookmark },
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
              <span>DESIGN.md Specification Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4 text-gray-900">
              Farmart Design System &amp; Style Guide
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
                Dialogs &amp; Modals
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
            SECTION 1: OVERVIEW & BRAND IDENTITY
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "foundations") && (
          <section id="overview" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-amber-500" />
                  <span>1. Design Philosophy &amp; Brand Identity</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Core aesthetics, brand character, and fundamental principles from DESIGN.md Section 1.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                  1
                </div>
                <h3 className="text-sm font-bold text-gray-900">Clarity First</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Essential purchase metrics (pricing, discounts, unit quantities, stock levels) must be scannable at a glance.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                  2
                </div>
                <h3 className="text-sm font-bold text-gray-900">Warm &amp; Welcoming</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Friendly rounded corners (<code className="text-amber-800 font-mono">rounded-2xl</code>), cheerful amber touches (<code className="text-amber-800 font-mono">#fab528</code>), and soft pastel category backgrounds.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                  3
                </div>
                <h3 className="text-sm font-bold text-gray-900">High Affordance</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Clear visual hierarchy for call-to-action buttons, interactive steppers <code className="text-amber-800 font-mono">[- 1 +]</code>, and wishlists.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                  4
                </div>
                <h3 className="text-sm font-bold text-gray-900">Performance &amp; Responsiveness</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Fluid 12-column grids, accessible touch targets (minimum 40px), and seamless desktop-to-mobile adaptation.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 2: COLOR PALETTES & DESIGN TOKENS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "foundations") && (
          <section id="colors" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Palette className="w-6 h-6 text-amber-500" />
                  <span>2. Color Palette &amp; Token System</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Click any swatch to copy Hex Code or Tailwind utility classes.
                </p>
              </div>
            </div>

            {/* 2.1 Brand Primary */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <span>2.1 Brand Primary (Warm Amber / Sunshine)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {primaryTokens.map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.hex)}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
                  >
                    <div
                      className={`h-24 w-full rounded-xl ${token.twClass} flex items-end p-2.5 border border-black/5 shadow-inner transition-transform group-hover:scale-[1.02]`}
                    >
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/90 text-gray-900 shadow-2xs">
                        {token.hex}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className="text-xs font-bold text-gray-900 block truncate">{token.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{token.twClass}</span>
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug line-clamp-2">{token.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2.2 Neutrals & Surfaces */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                2.2 Neutral &amp; Surface Tokens
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {neutralTokens.map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.hex)}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                  >
                    <div
                      className={`h-16 w-full rounded-xl ${token.twClass} flex items-end p-2 border border-gray-200/60 shadow-inner group-hover:scale-[1.02] transition-transform`}
                    >
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/90 text-gray-900 shadow-2xs">
                        {token.hex}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className="text-xs font-bold text-gray-900 block truncate">{token.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{token.twClass}</span>
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug line-clamp-2">{token.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2.3 Semantic & Feedback */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                2.3 Semantic &amp; Feedback Tokens
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {semanticTokens.map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.hex)}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div
                      className={`h-16 w-full rounded-xl ${token.twClass} flex items-end p-2 border border-black/5 shadow-inner group-hover:scale-[1.02] transition-transform`}
                    >
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/90 text-gray-900 shadow-2xs">
                        {token.hex}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className="text-xs font-bold text-gray-900 block truncate">{token.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{token.twClass}</span>
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug line-clamp-2">{token.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2.4 Department Pastel Palette */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                2.4 Department Pastel Palette (Promotions &amp; Category Banners)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {departmentTokens.map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.hex)}
                    className="bg-white rounded-2xl p-3 border border-gray-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group text-center"
                  >
                    <div
                      className={`h-14 w-full rounded-xl ${token.twClass} border border-black/5 shadow-inner group-hover:scale-105 transition-transform mb-2`}
                    />
                    <span className="text-xs font-bold text-gray-900 block truncate">{token.name}</span>
                    <span className="text-[10px] font-mono text-gray-400 block mt-0.5">{token.hex}</span>
                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-tight">{token.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 3: TYPOGRAPHY HIERARCHY
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "foundations") && (
          <section id="typography" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Type className="w-6 h-6 text-amber-500" />
                  <span>3. Typography Hierarchy</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Geist Sans</strong> for primary UI text, and <strong>Geist Mono</strong> for numeric data, prices, timers, and stock counts.
                </p>
              </div>
            </div>

            {/* Interactive Type Tester */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <input
                  type="text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  placeholder="Type preview text here..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs font-medium text-gray-800 outline-none focus:border-amber-400"
                />
                <div className="flex items-center gap-2">
                  {["font-normal", "font-semibold", "font-bold", "font-black"].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSampleWeight(w)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        sampleWeight === w
                          ? "bg-amber-400 text-gray-900 shadow-2xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {w.replace("font-", "")}
                    </button>
                  ))}
                </div>
              </div>
              <div className={`p-4 bg-gray-50/50 rounded-xl text-center text-gray-900 text-2xl sm:text-3xl ${sampleWeight} tracking-tight`}>
                {sampleText || "The quick brown fox jumps over the lazy dog"}
              </div>
            </div>

            {/* Typography Hierarchy Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-800 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Level</th>
                      <th className="py-3 px-4">Font Family</th>
                      <th className="py-3 px-4">Size (px / rem)</th>
                      <th className="py-3 px-4">Weight</th>
                      <th className="py-3 px-4">Line Height</th>
                      <th className="py-3 px-4">Tailwind Utility Class</th>
                      <th className="py-3 px-4">Live Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Display Hero</td>
                      <td className="py-3 px-4 text-gray-500 font-sans">Geist Sans</td>
                      <td className="py-3 px-4">42px / 2.625rem</td>
                      <td className="py-3 px-4">ExtraBold (800)</td>
                      <td className="py-3 px-4">1.15 (-0.025em)</td>
                      <td className="py-3 px-4 text-amber-700">text-[42px] font-extrabold</td>
                      <td className="py-3 px-4 font-sans text-xl font-extrabold text-gray-900 truncate max-w-[200px]">
                        Active Summer
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Heading 1 (H1)</td>
                      <td className="py-3 px-4 text-gray-500 font-sans">Geist Sans</td>
                      <td className="py-3 px-4">32px / 2.0rem</td>
                      <td className="py-3 px-4">Bold (700)</td>
                      <td className="py-3 px-4">1.2 (-0.02em)</td>
                      <td className="py-3 px-4 text-amber-700">text-3xl font-bold</td>
                      <td className="py-3 px-4 font-sans text-lg font-bold text-gray-900 truncate max-w-[200px]">
                        Top Saver Today
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Heading 2 (H2)</td>
                      <td className="py-3 px-4 text-gray-500 font-sans">Geist Sans</td>
                      <td className="py-3 px-4">24px / 1.5rem</td>
                      <td className="py-3 px-4">Bold (700)</td>
                      <td className="py-3 px-4">1.25 (-0.015em)</td>
                      <td className="py-3 px-4 text-amber-700">text-2xl font-bold</td>
                      <td className="py-3 px-4 font-sans text-base font-bold text-gray-900 truncate max-w-[200px]">
                        Featured Brands
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Heading 3 (H3)</td>
                      <td className="py-3 px-4 text-gray-500 font-sans">Geist Sans</td>
                      <td className="py-3 px-4">18px / 1.125rem</td>
                      <td className="py-3 px-4">Bold (700)</td>
                      <td className="py-3 px-4">1.3 (-0.01em)</td>
                      <td className="py-3 px-4 text-amber-700">text-lg font-bold</td>
                      <td className="py-3 px-4 font-sans text-sm font-bold text-gray-900 truncate max-w-[200px]">
                        Card Section Heading
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Product Title</td>
                      <td className="py-3 px-4 text-gray-500 font-sans">Geist Sans</td>
                      <td className="py-3 px-4">14px / 0.875rem</td>
                      <td className="py-3 px-4">SemiBold (600)</td>
                      <td className="py-3 px-4">1.35 (normal)</td>
                      <td className="py-3 px-4 text-amber-700">text-sm font-semibold</td>
                      <td className="py-3 px-4 font-sans text-xs font-semibold text-gray-800 truncate max-w-[200px]">
                        British Beef Mince (10% Fat)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Body (Regular)</td>
                      <td className="py-3 px-4 text-gray-500 font-sans">Geist Sans</td>
                      <td className="py-3 px-4">14px / 0.875rem</td>
                      <td className="py-3 px-4">Normal (400)</td>
                      <td className="py-3 px-4">1.5 (normal)</td>
                      <td className="py-3 px-4 text-amber-700">text-sm text-gray-600</td>
                      <td className="py-3 px-4 font-sans text-xs text-gray-600 truncate max-w-[200px]">
                        Fresh organic farm produce daily
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-amber-600">Price Hero</td>
                      <td className="py-3 px-4 text-amber-600 font-sans font-bold">Geist Mono</td>
                      <td className="py-3 px-4">24px / 1.5rem</td>
                      <td className="py-3 px-4">Black (900)</td>
                      <td className="py-3 px-4">1.0 (-0.02em)</td>
                      <td className="py-3 px-4 text-amber-700 font-mono">text-2xl font-black font-mono</td>
                      <td className="py-3 px-4 font-mono text-lg font-black text-amber-600">
                        $80.00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Price Regular</td>
                      <td className="py-3 px-4 text-amber-600 font-sans font-bold">Geist Mono</td>
                      <td className="py-3 px-4">15px / 0.9375rem</td>
                      <td className="py-3 px-4">Bold (700)</td>
                      <td className="py-3 px-4">1.1 (-0.01em)</td>
                      <td className="py-3 px-4 text-amber-700 font-mono">text-[15px] font-bold font-mono</td>
                      <td className="py-3 px-4 font-mono text-xs font-bold text-gray-900">
                        $12.50
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-400">Price Strikethrough</td>
                      <td className="py-3 px-4 text-amber-600 font-sans font-bold">Geist Mono</td>
                      <td className="py-3 px-4">12px / 0.75rem</td>
                      <td className="py-3 px-4">Medium (500)</td>
                      <td className="py-3 px-4">1.0 (normal)</td>
                      <td className="py-3 px-4 text-amber-700 font-mono">text-xs line-through font-mono</td>
                      <td className="py-3 px-4 font-mono text-xs text-gray-400 line-through">
                        $14.00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">Badge / Overline</td>
                      <td className="py-3 px-4 text-gray-500 font-sans">Geist Sans</td>
                      <td className="py-3 px-4">10px / 0.625rem</td>
                      <td className="py-3 px-4">ExtraBold (800)</td>
                      <td className="py-3 px-4">1.0 (0.05em)</td>
                      <td className="py-3 px-4 text-amber-700">text-[10px] font-extrabold uppercase</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-500 text-white font-sans">
                          -15% OFF
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 4: LAYOUT & SPACING SCALE
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "foundations") && (
          <section id="layout" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <LayoutGrid className="w-6 h-6 text-amber-500" />
                  <span>4. Spacing, Grid &amp; Sizing Scale</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Base 4px unit with 1360px max width container and responsive column grids.
                </p>
              </div>
            </div>

            {/* Visual Base-4 Spacing Scale */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Spacing Tokens Scale (Base 4px Unit)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {spacingTokens.map((s) => (
                  <div key={s.token} className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-800">{s.token}</span>
                      <span className="text-xs font-mono text-gray-600 font-bold">{s.size}</span>
                    </div>
                    <div className="h-3 bg-amber-400 rounded-md" style={{ width: s.size }} />
                    <p className="text-[10px] text-gray-400 leading-snug">{s.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 5: ELEVATION & DEPTH
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "foundations") && (
          <section id="elevation" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-amber-500" />
                  <span>5. Elevation &amp; Depth Scale</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Subtle layered shadows defining resting, hover, and floating component elevations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {elevationTokens.map((shadow) => (
                <div
                  key={shadow.token}
                  className={`bg-white rounded-2xl p-5 border border-gray-100 ${shadow.twClass} transition-all hover:-translate-y-1`}
                >
                  <span className="text-xs font-mono font-bold text-amber-700 block">
                    {shadow.token}
                  </span>
                  <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">{shadow.usage}</p>
                  <span className="text-[9px] font-mono text-gray-400 block mt-3 truncate">{shadow.spec}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 6: SHAPES & CORNER RADII
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "foundations") && (
          <section id="shapes" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Component className="w-6 h-6 text-amber-500" />
                  <span>6. Shapes &amp; Border Radii Scale</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Friendly rounded geometry giving Farmart its cheerful and approachable aesthetic.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {shapeTokens.map((item) => (
                <div
                  key={item.name}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs text-center flex flex-col items-center justify-between"
                >
                  <div
                    className={`w-16 h-16 ${item.tw} bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-xs font-mono font-bold text-amber-900 mb-3`}
                  >
                    {item.px}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">{item.name}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{item.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 7: COMPONENTS BLUEPRINTS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "elements" || activeTab === "components") && (
          <section id="components" className="space-y-10 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Sliders className="w-6 h-6 text-amber-500" />
                  <span>7. Component Blueprints &amp; Specifications</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Fully interactive buttons, steppers, badges, form controls, product cards, and filter sidebars.
                </p>
              </div>
            </div>

            {/* 7.1 Buttons */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                7.1 Buttons &amp; Interactive Controls
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Primary Button */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
                  <span className="text-xs font-bold text-gray-700 block">1. Primary Button</span>
                  <button
                    type="button"
                    className="w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg transition-all duration-200 active:scale-[0.98] text-xs uppercase tracking-wider shadow-xs"
                  >
                    Shop Now
                  </button>
                  <p className="text-[10px] text-gray-400">Core action: Cart checkout, promo banners</p>
                </div>

                {/* Secondary Button */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
                  <span className="text-xs font-bold text-gray-700 block">2. Secondary Button</span>
                  <button
                    type="button"
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold px-5 py-2.5 rounded-lg transition-colors text-xs uppercase tracking-wider"
                  >
                    View Details
                  </button>
                  <p className="text-[10px] text-gray-400">High contrast secondary callout</p>
                </div>

                {/* Outline Button */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
                  <span className="text-xs font-bold text-gray-700 block">3. Outline Button</span>
                  <button
                    type="button"
                    className="w-full border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2 rounded-lg transition-colors text-xs"
                  >
                    Discover Flavors
                  </button>
                  <p className="text-[10px] text-gray-400">Secondary browsing and filter tabs</p>
                </div>

                {/* Wishlist Action Button */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
                  <span className="text-xs font-bold text-gray-700 block">4. Icon Action Button</span>
                  <div className="flex items-center justify-center gap-3 py-1">
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-white hover:bg-amber-500 hover:text-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-700 transition-all cursor-pointer"
                      title="Wishlist"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-white hover:bg-amber-500 hover:text-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-700 transition-all cursor-pointer"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">Floating circular action buttons</p>
                </div>

                {/* Quantity Stepper */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 block">5. Quantity Stepper</span>
                    <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-md">
                      {(["sm", "md", "lg"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStepperSize(s)}
                          className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                            stepperSize === s
                              ? "bg-white text-gray-900 shadow-2xs"
                              : "text-gray-500 hover:text-gray-900"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center py-1">
                    <QuantityStepper
                      value={stepperVal}
                      onChange={setStepperVal}
                      size={stepperSize}
                      ariaLabel="Design system demo stepper"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 text-center font-mono">
                    Size: {stepperSize} • Value: {stepperVal}
                  </p>
                </div>
              </div>
            </div>

            {/* 7.2 Badges & Indicators */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                7.2 Badges &amp; Status Indicators (Badge.tsx)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Discount Badge</span>
                  <Badge variant="discount">-23% OFF</Badge>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Deal Pill</span>
                  <Badge
                    variant="deal"
                    icon={<Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />}
                  >
                    Deal of Day
                  </Badge>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Stock Status Pill</span>
                  <Badge variant="stock" dot>
                    In Stock
                  </Badge>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Out of Stock</span>
                  <Badge variant="out-of-stock">
                    Sold Out
                  </Badge>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Brand Tag</span>
                  <Badge variant="brand">FRESH</Badge>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Category Count</span>
                  <Badge variant="count">86 items</Badge>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Transit Status</span>
                  <Badge variant="info">Cold Chain</Badge>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Subtle Outline</span>
                  <Badge variant="subtle">Organic</Badge>
                </div>
              </div>
            </div>

            {/* 7.3 Navigation & Content Tabs (Tabs.tsx) */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                7.3 Interactive Navigation &amp; Content Tabs (Tabs.tsx)
              </h3>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-4">
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview" icon={<Info className="w-4 h-4" />}>
                      Overview &amp; Origin
                    </TabsTrigger>
                    <TabsTrigger value="specs" icon={<Package className="w-4 h-4" />}>
                      Specifications
                    </TabsTrigger>
                    <TabsTrigger value="reviews" icon={<Sparkles className="w-4 h-4" />} badge={48}>
                      Customer Reviews
                    </TabsTrigger>
                  </TabsList>

                  <div className="pt-4 text-xs text-gray-600 leading-relaxed">
                    <TabsContent value="overview">
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                        <p className="font-bold text-gray-900">Farm Fresh Direct Sourcing</p>
                        <p>Harvested daily from certified organic producers with zero synthetic fertilizers or pesticide runoff.</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="specs">
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Packaging</span>
                          <span className="font-bold text-gray-800">500g biodegradable punnet</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-semibold block text-[10px] uppercase">Storage</span>
                          <span className="font-bold text-gray-800">Keep chilled at 2°C – 4°C</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="reviews">
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                        <p className="font-bold text-amber-600 font-mono">4.9 / 5.0 (48 Verified Customer Reviews)</p>
                        <p>98% of buyers recommend this product for outstanding flavor and prompt cold delivery.</p>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>

            {/* 7.3 Form Controls */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                7.3 Form Controls &amp; Inputs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Bar */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-gray-700 block">Universal Search Bar with Category Select</span>
                  <div className="flex items-center w-full border-2 border-gray-100 rounded-lg bg-gray-50/70 focus-within:border-amber-400 focus-within:bg-white transition-all shadow-xs">
                    <span className="px-3.5 py-2.5 text-xs font-semibold text-gray-700 border-r border-gray-200">
                      All Categories
                    </span>
                    <input
                      type="text"
                      placeholder="I'm shopping for..."
                      className="flex-1 bg-transparent px-4 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none"
                    />
                    <button type="button" className="px-4 py-2 text-gray-600 hover:text-amber-600">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Newsletter Form */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-gray-700 block">Email Subscription Form</span>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-800 outline-none focus:border-amber-400 shadow-2xs"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 7.4 Product Cards */}
            <div id="cards" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                  7.4 Product Cards (Grid &amp; List Views)
                </h3>
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPreviewViewMode("grid")}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      previewViewMode === "grid" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-500"
                    }`}
                  >
                    Grid View
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewMode("list")}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      previewViewMode === "list" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-500"
                    }`}
                  >
                    List View
                  </button>
                </div>
              </div>

              {previewViewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {mockProducts.slice(0, 4).map((p) => (
                    <ProductCard key={p.id} product={p} viewMode="grid" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {mockProducts.slice(0, 2).map((p) => (
                    <ProductCard key={p.id} product={p} viewMode="list" />
                  ))}
                </div>
              )}
            </div>

            {/* 7.7 Breadcrumbs & 7.8 Pagination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-gray-700 block">7.7 Breadcrumbs Component</span>
                <Breadcrumbs
                  items={[
                    { label: "Groceries", href: "/products" },
                    { label: "Fruits & Vegetables", href: "/products?category=Fruits%20%26%20Vegetables" },
                    { label: "Organic Strawberries" },
                  ]}
                />
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-gray-700 block">7.8 Pagination Controls</span>
                <Pagination
                  currentPage={activePage}
                  totalPages={5}
                  totalItems={48}
                  itemsPerPage={12}
                  onPageChange={(p) => setActivePage(p)}
                />
              </div>
            </div>

            {/* 7.9 Catalog Filter Sidebar Preview */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-4 pt-6">
              <div>
                <span className="text-xs font-bold text-gray-700 block">7.9 Catalog Filter Sidebar Blueprint</span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Live interactive preview of ProductFilters supporting categories, price range, brands, and ratings.
                </p>
              </div>
              <div className="max-w-xs border border-gray-100 rounded-2xl p-4 bg-gray-50/30">
                <ProductFilters
                  categories={demoCategories}
                  brands={demoBrands}
                  filters={filterState}
                  onFilterChange={(newF) => setFilterState(newF)}
                  onResetFilters={() =>
                    setFilterState({
                      category: "All",
                      searchTerm: "",
                      priceRange: [0, 100],
                      brands: [],
                      minRating: null,
                      inStockOnly: false,
                      onSaleOnly: false,
                    })
                  }
                />
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 7.10: PRODUCT DETAIL PAGE PATTERN (DESIGN.md Showcase)
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "components" || activeTab === "detail") && (
          <section id="product-detail-pattern" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <Package className="w-6 h-6 text-amber-500" />
                  <span>7.10 Product Detail Page Pattern (/products/[id])</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Full production layout composing Breadcrumbs, Department Pastel canvases, Geist Mono Price Hero, QuantityStepper, Badges, Tabs, and Dialog modals.
                </p>
              </div>

              <Link
                href="/products/prod-1"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#fab528] hover:bg-[#e59d12] text-gray-900 text-xs font-bold rounded-lg shadow-2xs transition-all active:scale-95"
              >
                <span>Open Live Product Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature Spotlight Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Visual Preview */}
              <div className="lg:col-span-5 bg-[#ffe8df]/50 rounded-2xl border border-[#ffe8df] p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                  <Badge variant="discount">-23% OFF</Badge>
                  <Badge variant="brand">FRESH</Badge>
                </div>

                <div className="relative w-48 h-48 my-2">
                  <Image
                    src="https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=600&q=80"
                    alt="Organic Farm Fresh Strawberries"
                    fill
                    sizes="192px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="w-full bg-white/90 backdrop-blur-xs rounded-xl p-3 border border-white/60 shadow-2xs text-center space-y-1 mt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    Green Harvest • Fruits &amp; Vegetables
                  </span>
                  <p className="text-xs font-bold text-gray-900 truncate">
                    Organic Farm Fresh Strawberries (500g)
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="font-mono text-xl font-black text-amber-600">
                      $8.50
                    </span>
                    <span className="font-mono text-xs text-gray-400 line-through">
                      $11.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Design System Integration Checklist */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                    Design System Conformance
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    Component Composition &amp; Token Blueprint
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    The Product Detail route strictly follows DESIGN.md tokens and patterns to deliver a cohesive, high-conversion grocery commerce experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Department Pastel Tint
                    </span>
                    <p className="text-gray-500 text-[11px]">
                      Contextual canvas backdrops matching category (e.g. Soft Peach <code className="font-mono text-[10px] bg-white px-1 py-0.5 rounded">#ffe8df</code>).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Geist Mono Typography
                    </span>
                    <p className="text-gray-500 text-[11px]">
                      Price Hero (<code className="font-mono text-[10px] bg-white px-1 py-0.5 rounded">text-3xl font-black text-amber-600</code>) and stock counts.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      QuantityStepper (Size L)
                    </span>
                    <p className="text-gray-500 text-[11px]">
                      Touch-friendly 36px controls with tabular figures and boundary clamping.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Multi-Tab Panels (Tabs)
                    </span>
                    <p className="text-gray-500 text-[11px]">
                      Structured tabs for Description, Nutrition table, Customer Reviews, and Shipping.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Dialog Image Zoom
                    </span>
                    <p className="text-gray-500 text-[11px]">
                      Fullscreen modal inspection powered by <code className="font-mono text-[10px] bg-white px-1 py-0.5 rounded">Dialog size=&quot;2xl&quot;</code>.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Interactive Review Dialog
                    </span>
                    <p className="text-gray-500 text-[11px]">
                      Customer feedback flow powered by <code className="font-mono text-[10px] bg-white px-1 py-0.5 rounded">Dialog size=&quot;md&quot;</code> with star rating picker.
                    </p>
                  </div>
                </div>

                {/* Direct Links to Test Products */}
                <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-500">
                    Explore live routes:
                  </span>
                  {[
                    { id: "prod-1", label: "Strawberries (Fruits)" },
                    { id: "prod-2", label: "Beef Steak (Meats)" },
                    { id: "prod-3", label: "Salmon (Seafood)" },
                    { id: "prod-5", label: "Sourdough (Bakery)" },
                  ].map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 7.6: DIALOGS & MODALS SHOWCASE (DESIGN.md Section 6.6)
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "dialogs") && (
          <section id="dialogs" className="space-y-8 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-amber-500" />
                  <span>7.6 Dialogs &amp; Modal System</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Full specification conforming to DESIGN.md Section 6.6: Portalled, WAI-ARIA compliant, with 5 size presets and semantic icon badges.
                </p>
              </div>
            </div>

            {/* Sizing Presets Launcher Matrix */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                1. Sizing Presets Matrix &amp; Live Triggers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    size: "sm" as DialogSize,
                    width: "384px (max-w-sm)",
                    role: "Destructive prompts, small confirmations",
                    variant: "danger" as const,
                    onClick: () => setIsDestructiveAlertOpen(true),
                    btnText: "Launch 'sm' (Delete Prompt)",
                    color: "border-red-200 hover:border-red-400",
                  },
                  {
                    size: "md" as DialogSize,
                    width: "448px (max-w-md)",
                    role: "Standard alerts, newsletter vouchers",
                    variant: "brand" as const,
                    onClick: () => setIsNewsletterDialogOpen(true),
                    btnText: "Launch 'md' (Newsletter)",
                    color: "border-amber-200 hover:border-amber-400",
                  },
                  {
                    size: "lg" as DialogSize,
                    width: "512px (max-w-lg)",
                    role: "Rich forms, multi-step address entries",
                    variant: "info" as const,
                    onClick: () => setIsAddressFormDialogOpen(true),
                    btnText: "Launch 'lg' (Address Form)",
                    color: "border-sky-200 hover:border-sky-400",
                  },
                  {
                    size: "xl" as DialogSize,
                    width: "576px (max-w-xl)",
                    role: "Inventory data tables, detail panels",
                    variant: "warning" as const,
                    onClick: () => setIsDataMatrixDialogOpen(true),
                    btnText: "Launch 'xl' (Inventory Table)",
                    color: "border-amber-200 hover:border-amber-400",
                  },
                  {
                    size: "2xl" as DialogSize,
                    width: "672px (max-w-2xl)",
                    role: "Product Quick View, rich media showcase",
                    variant: "brand" as const,
                    onClick: () => setIsQuickViewDialogOpen(true),
                    btnText: "Launch '2xl' (Quick View)",
                    color: "border-amber-200 hover:border-amber-400",
                  },
                ].map((item) => (
                  <div
                    key={item.size}
                    className={`bg-white rounded-2xl p-5 border ${item.color} shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                          {item.size}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">{item.width}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">{item.role}</p>
                    </div>

                    <button
                      type="button"
                      onClick={item.onClick}
                      className="w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-3 py-2 rounded-lg text-xs uppercase tracking-wider transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
                    >
                      {item.btnText}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic Icon Badges Showcase */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                2. Semantic Icon Badges (12x12 rounded-2xl border shadow-2xs)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs text-center flex flex-col items-center">
                  <DialogBadge variant="brand">
                    <Sparkles className="w-6 h-6" />
                  </DialogBadge>
                  <span className="text-xs font-bold text-gray-900 mt-2">Brand Warm Amber</span>
                  <span className="text-[10px] font-mono text-gray-400">bg-amber-50 text-amber-600</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs text-center flex flex-col items-center">
                  <DialogBadge variant="success">
                    <CheckCircle className="w-6 h-6" />
                  </DialogBadge>
                  <span className="text-xs font-bold text-gray-900 mt-2">Success Emerald</span>
                  <span className="text-[10px] font-mono text-gray-400">bg-emerald-50 text-emerald-600</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs text-center flex flex-col items-center">
                  <DialogBadge variant="danger">
                    <Trash2 className="w-6 h-6" />
                  </DialogBadge>
                  <span className="text-xs font-bold text-gray-900 mt-2">Danger Coral Red</span>
                  <span className="text-[10px] font-mono text-gray-400">bg-red-50 text-red-600</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs text-center flex flex-col items-center">
                  <DialogBadge variant="warning">
                    <AlertTriangle className="w-6 h-6" />
                  </DialogBadge>
                  <span className="text-xs font-bold text-gray-900 mt-2">Warning Amber</span>
                  <span className="text-[10px] font-mono text-gray-400">bg-amber-50 text-amber-500</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs text-center flex flex-col items-center">
                  <DialogBadge variant="info">
                    <Info className="w-6 h-6" />
                  </DialogBadge>
                  <span className="text-xs font-bold text-gray-900 mt-2">Info Sky Blue</span>
                  <span className="text-[10px] font-mono text-gray-400">bg-sky-50 text-sky-600</span>
                </div>
              </div>
            </div>

            {/* Accessibility & Architecture Specification List */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                3. Accessibility &amp; UX Compliance Checklist (DESIGN.md Section 6.6)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-gray-600">
                <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">WAI-ARIA Attributes</strong>
                    <span>Built-in role=&quot;dialog&quot;, aria-modal=&quot;true&quot;, aria-labelledby.</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">Escape Key &amp; Backdrop Click</strong>
                    <span>Pressing Escape or clicking backdrop smoothly dismisses the modal.</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">Body Scroll Locking</strong>
                    <span>Prevents background page scrolling while the dialog surface is open.</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">React 19 Safe Portal</strong>
                    <span>Renders to document.body via createPortal without hydration mismatch.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- MODAL 1: Destructive Confirmation Alert (sm preset) --- */}
            <Dialog
              isOpen={isDestructiveAlertOpen}
              onClose={() => setIsDestructiveAlertOpen(false)}
              size="sm"
            >
              <DialogHeader>
                <DialogBadge variant="danger">
                  <Trash2 className="w-6 h-6" />
                </DialogBadge>
                <DialogTitle>Delete Shipping Address?</DialogTitle>
                <DialogDescription>
                  This action is permanent and will remove this address from your Farmart account.
                </DialogDescription>
              </DialogHeader>
              <DialogBody className="space-y-3 text-xs text-gray-600">
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-900 font-medium">
                  <strong>Warning:</strong> Any active scheduled reorders tied to this address will require updating.
                </div>
              </DialogBody>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setIsDestructiveAlertOpen(false)}
                  className="border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsDestructiveAlertOpen(false)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                >
                  Delete Address
                </button>
              </DialogFooter>
            </Dialog>

            {/* --- MODAL 2: Newsletter & Voucher Prompt (md preset) --- */}
            <Dialog
              isOpen={isNewsletterDialogOpen}
              onClose={() => setIsNewsletterDialogOpen(false)}
              size="md"
            >
              <DialogHeader>
                <DialogBadge variant="brand">
                  <Sparkles className="w-6 h-6" />
                </DialogBadge>
                <DialogTitle>Claim Your 15% First Order Voucher</DialogTitle>
                <DialogDescription>
                  Subscribe to the Farmart weekly harvest newsletter for instant discount vouchers and farm updates.
                </DialogDescription>
              </DialogHeader>
              <DialogBody className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-white border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-800 outline-none shadow-2xs"
                  />
                </div>
                <p className="text-[11px] text-gray-400">
                  Instant coupon code will be emailed upon confirmation. Cancel anytime.
                </p>
              </DialogBody>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setIsNewsletterDialogOpen(false)}
                  className="border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewsletterDialogOpen(false)}
                  className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                >
                  Get 15% Voucher
                </button>
              </DialogFooter>
            </Dialog>

            {/* --- MODAL 3: Rich Multi-Step Address Form (lg preset) --- */}
            <Dialog
              isOpen={isAddressFormDialogOpen}
              onClose={() => setIsAddressFormDialogOpen(false)}
              size="lg"
            >
              <DialogHeader>
                <DialogBadge variant="info">
                  <MapPin className="w-6 h-6" />
                </DialogBadge>
                <DialogTitle>Add New Delivery Address</DialogTitle>
                <DialogDescription>
                  Enter residential or office address for fresh grocery doorstep deliveries.
                </DialogDescription>
              </DialogHeader>
              <DialogBody className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Recipient Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full bg-white border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    className="w-full bg-white border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none"
                  />
                </div>
              </DialogBody>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setIsAddressFormDialogOpen(false)}
                  className="border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddressFormDialogOpen(false)}
                  className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                >
                  Save Address
                </button>
              </DialogFooter>
            </Dialog>

            {/* --- MODAL 4: Inventory Data Table (xl preset) --- */}
            <Dialog
              isOpen={isDataMatrixDialogOpen}
              onClose={() => setIsDataMatrixDialogOpen(false)}
              size="xl"
            >
              <DialogHeader>
                <DialogBadge variant="warning">
                  <AlertTriangle className="w-6 h-6" />
                </DialogBadge>
                <DialogTitle>Store Inventory &amp; Stock Availability</DialogTitle>
                <DialogDescription>
                  Real-time inventory levels across regional fulfillment centers.
                </DialogDescription>
              </DialogHeader>
              <DialogBody className="space-y-4">
                <div className="border border-gray-100 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-800 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">Fulfillment Center</th>
                        <th className="py-2.5 px-3">Stock Level</th>
                        <th className="py-2.5 px-3">ETA Standard</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                      <tr>
                        <td className="py-2 px-3 font-semibold text-gray-900">San Francisco Bay Hub</td>
                        <td className="py-2 px-3 font-mono font-bold text-emerald-600">340 units</td>
                        <td className="py-2 px-3 font-mono">Today (Same-Day)</td>
                        <td className="py-2 px-3">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Operational
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-gray-900">Oakland Cold Storage</td>
                        <td className="py-2 px-3 font-mono font-bold text-amber-600">82 units</td>
                        <td className="py-2 px-3 font-mono">Tomorrow Morning</td>
                        <td className="py-2 px-3">
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                            Low Stock
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-gray-900">San Jose South Hub</td>
                        <td className="py-2 px-3 font-mono font-bold text-emerald-600">190 units</td>
                        <td className="py-2 px-3 font-mono">Today Evening</td>
                        <td className="py-2 px-3">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Operational
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </DialogBody>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setIsDataMatrixDialogOpen(false)}
                  className="border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Close Table
                </button>
              </DialogFooter>
            </Dialog>

            {/* --- MODAL 5: Product Quick View (2xl preset) --- */}
            <Dialog
              isOpen={isQuickViewDialogOpen}
              onClose={() => setIsQuickViewDialogOpen(false)}
              size="2xl"
            >
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md font-sans">
                    -23% OFF
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    In Stock
                  </span>
                </div>
                <DialogTitle className="text-xl font-bold mt-2">
                  Organic Farm Fresh Strawberries (500g)
                </DialogTitle>
                <DialogDescription>
                  Handpicked certified organic strawberries delivered cold-packed from Watsonville orchards.
                </DialogDescription>
              </DialogHeader>

              <DialogBody className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="relative w-full h-56 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-100">
                    <Image
                      src="https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=600&q=80"
                      alt="Organic Farm Fresh Strawberries"
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="space-y-4 text-xs text-gray-600">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black font-mono text-amber-600">$8.50</span>
                      <span className="text-sm font-mono text-gray-400 line-through">$11.00</span>
                    </div>

                    <p className="leading-relaxed">
                      Rich in vitamin C and antioxidants. Harvested daily at peak ripeness to ensure exceptional sweet flavor and fresh aroma.
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <span className="font-bold text-gray-700">Quantity:</span>
                      <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50/60 p-1">
                        <button
                          type="button"
                          onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                          className="w-7 h-7 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-2xs transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-xs font-bold text-gray-900 font-mono">
                          {quickViewQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuickViewQty(quickViewQty + 1)}
                          className="w-7 h-7 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-2xs transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogBody>

              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setIsQuickViewDialogOpen(false)}
                  className="border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => setIsQuickViewDialogOpen(false)}
                  className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-6 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart (${(8.5 * quickViewQty).toFixed(2)})</span>
                </button>
              </DialogFooter>
            </Dialog>

            {/* --- Generic Dialog for arbitrary size testing --- */}
            {activeSizeDialog && (
              <Dialog
                isOpen={Boolean(activeSizeDialog)}
                onClose={() => setActiveSizeDialog(null)}
                size={activeSizeDialog}
              >
                <DialogHeader>
                  <DialogBadge variant="brand">
                    <Sparkles className="w-6 h-6" />
                  </DialogBadge>
                  <DialogTitle>Size Preset: {activeSizeDialog.toUpperCase()}</DialogTitle>
                  <DialogDescription>
                    Testing container sizing preset {activeSizeDialog.toUpperCase()} conforming to DESIGN.md.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody className="space-y-3 text-xs text-gray-600">
                  <p>
                    This modal container conforms to <code className="font-mono text-gray-800">rounded-2xl shadow-2xl border border-gray-100</code> with entry zoom animation.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <button
                    type="button"
                    onClick={() => setActiveSizeDialog(null)}
                    className="border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSizeDialog(null)}
                    className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                  >
                    Confirm
                  </button>
                </DialogFooter>
              </Dialog>
            )}
          </section>
        )}

        {/* =========================================================================
            SECTION 8: DO'S AND DON'TS
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "dos-donts") && (
          <section id="dos-donts" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <span>8. Do&apos;s and Don&apos;ts</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Design guardrails and best practices defined in DESIGN.md Section 8.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pair 1: Primary Color */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  <span>DO: Use Warm Amber for Key CTAs</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Use <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">#fab528</code> for primary action buttons, category dropdown triggers, and active tab indicators to direct shopper focus.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
                  <X className="w-4 h-4" />
                  <span>DON&apos;T: Overuse Amber on Entire Canvas</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Avoid using bright yellow-amber as the whole page background or for non-action elements, which causes visual fatigue.
                </p>
              </div>

              {/* Pair 2: Contrast */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  <span>DO: Maintain WCAG AA High Contrast</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pair light amber or white backgrounds with deep contrast text (<code className="font-mono text-gray-800">text-amber-900</code> or <code className="font-mono text-gray-800">text-gray-900</code>) to maintain at least 4.5:1 ratio.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
                  <X className="w-4 h-4" />
                  <span>DON&apos;T: Use Light Text on Yellow</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Never place white or light-gray text directly over <code className="font-mono text-gray-800">#fab528</code> buttons; always use <code className="font-mono text-gray-800">text-gray-900</code>.
                </p>
              </div>

              {/* Pair 3: Typography */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  <span>DO: Use Geist Mono for Numbers &amp; Prices</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Apply <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded font-mono">font-mono</code> to financial prices, countdown clocks, stock counts, and numeric steppers for tabular alignment.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
                  <X className="w-4 h-4" />
                  <span>DON&apos;T: Mix Inconsistent Font Families</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Do not introduce third-party serif or script fonts; maintain consistency between Geist Sans for body/headlines and Geist Mono for data.
                </p>
              </div>

              {/* Pair 4: Corner Radii */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  <span>DO: Standardize Radii by Component Level</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Stick to <code className="font-mono text-gray-800">rounded-lg</code> (8px) for buttons/inputs and <code className="font-mono text-gray-800">rounded-2xl</code> (16px) for cards, banners, and modals.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
                  <X className="w-4 h-4" />
                  <span>DON&apos;T: Mix Sharp &amp; Rounded Corners</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Avoid mixing razor-sharp square edges (<code className="font-mono text-gray-800">rounded-none</code>) with friendly 16px rounded surfaces on the same page.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 9: DESIGN TOKENS SPECIFICATION MATRIX & RAW YAML
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "tokens") && (
          <section id="tokens-matrix" className="space-y-6 scroll-mt-24">
            <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-amber-500" />
                  <span>9. DESIGN.md Tokens Matrix &amp; Frontmatter Specification</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Single source of truth matching the schema checked by <code className="font-mono text-amber-700">npx @google/design.md lint DESIGN.md</code>.
                </p>
              </div>
            </div>

            {/* Tokens Mapping Table */}
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
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">color-primary</td>
                      <td className="py-3 px-4 text-amber-600">--color-primary</td>
                      <td className="py-3 px-4">#fab528</td>
                      <td className="py-3 px-4 text-gray-800">bg-[#fab528]</td>
                      <td className="py-3 px-4 font-sans">Brand core action color</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">color-primary-dark</td>
                      <td className="py-3 px-4 text-amber-600">--color-primary-dark</td>
                      <td className="py-3 px-4">#e59d12</td>
                      <td className="py-3 px-4 text-gray-800">bg-[#e59d12]</td>
                      <td className="py-3 px-4 font-sans">Hover interaction state</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">color-canvas</td>
                      <td className="py-3 px-4 text-gray-500">--color-canvas</td>
                      <td className="py-3 px-4">#f7f8fa</td>
                      <td className="py-3 px-4 text-gray-800">bg-[#f7f8fa]</td>
                      <td className="py-3 px-4 font-sans">Default app backdrop</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">color-surface</td>
                      <td className="py-3 px-4 text-gray-500">--color-surface</td>
                      <td className="py-3 px-4">#ffffff</td>
                      <td className="py-3 px-4 text-gray-800">bg-white</td>
                      <td className="py-3 px-4 font-sans">Cards, header, dropdown surfaces</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">radius-2xl</td>
                      <td className="py-3 px-4 text-gray-500">--radius-2xl</td>
                      <td className="py-3 px-4">16px</td>
                      <td className="py-3 px-4 text-gray-800">rounded-2xl</td>
                      <td className="py-3 px-4 font-sans">Product cards, banners &amp; dialogs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">radius-lg</td>
                      <td className="py-3 px-4 text-gray-500">--radius-lg</td>
                      <td className="py-3 px-4">8px</td>
                      <td className="py-3 px-4 text-gray-800">rounded-lg</td>
                      <td className="py-3 px-4 font-sans">Buttons, inputs, dropdowns</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-bold text-gray-900">shadow-2xl</td>
                      <td className="py-3 px-4 text-gray-500">--shadow-2xl</td>
                      <td className="py-3 px-4">0 25px 50px -12px rgba(0,0,0,0.25)</td>
                      <td className="py-3 px-4 text-gray-800">shadow-2xl</td>
                      <td className="py-3 px-4 font-sans">Floating modal surface shadow</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Raw YAML Frontmatter Viewer */}
            <div className="bg-gray-900 text-gray-100 rounded-2xl p-6 shadow-xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <span className="text-amber-400 font-bold font-sans">DESIGN.md YAML Frontmatter</span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(`---
version: alpha
name: Farmart Design System
colors:
  primary: "#fab528"
  primary-dark: "#e59d12"
  primary-light: "#fef3c7"
  primary-tint: "#fffbeb"
  primary-text: "#92400e"
  canvas: "#f7f8fa"
  surface: "#ffffff"
  surface-subtle: "#f9fafb"
  border-subtle: "#f3f4f6"
  border-default: "#e5e7eb"
  border-focus: "#fab528"
  text-primary: "#191c1f"
  text-secondary: "#4b5563"
  text-muted: "#9ca3af"
  text-inverse: "#ffffff"
  success: "#10b981"
  success-bg: "#ecfdf5"
  danger: "#ef4444"
  danger-bg: "#fef2f2"
  warning: "#f59e0b"
  info: "#0284c7"
---`)
                  }
                  className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 text-[11px] font-sans flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy YAML</span>
                </button>
              </div>
              <pre className="overflow-x-auto text-amber-200/90 leading-relaxed text-[11px]">
{`---
version: alpha
name: Farmart Design System
description: Foundational design tokens and blueprints for Farmart grocery platform
colors:
  primary: "#fab528"
  primary-dark: "#e59d12"
  primary-light: "#fef3c7"
  primary-tint: "#fffbeb"
  primary-text: "#92400e"
  canvas: "#f7f8fa"
  surface: "#ffffff"
  surface-subtle: "#f9fafb"
  border-subtle: "#f3f4f6"
  border-default: "#e5e7eb"
  border-focus: "#fab528"
  text-primary: "#191c1f"
  text-secondary: "#4b5563"
  text-muted: "#9ca3af"
  text-inverse: "#ffffff"
  success: "#10b981"
  success-bg: "#ecfdf5"
  danger: "#ef4444"
  danger-bg: "#fef2f2"
  warning: "#f59e0b"
  info: "#0284c7"
---`}
              </pre>
            </div>
          </section>
        )}
      </main>

      {/* Floating Global Cart Toast */}
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
