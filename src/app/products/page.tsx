"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";
import TrustBadges from "@/components/TrustBadges";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import ProductFilters, { CategoryCount, BrandCount } from "@/components/ProductFilters";
import Pagination from "@/components/Pagination";
import Dialog from "@/components/Dialog";
import { Product, ProductSortOption, FilterState } from "@/types/product";
import { mockProducts } from "@/data/products";

// Department pastel colors mapping from DESIGN.md Section 2.4
const departmentTheme: Record<string, { bg: string; text: string; desc: string }> = {
  All: {
    bg: "bg-amber-100/60 border-amber-200",
    text: "text-amber-900",
    desc: "Explore our complete selection of fresh, organic farm produce and pantry essentials.",
  },
  "Fruits & Vegetables": {
    bg: "bg-[#ffe8df] border-[#ffd5c4]",
    text: "text-amber-950",
    desc: "Handpicked sweet seasonal fruits and crisp farm greens harvested daily.",
  },
  "Breads & Sweets": {
    bg: "bg-[#eee9df] border-[#e2d9ca]",
    text: "text-amber-950",
    desc: "Artisanal sourdoughs, flaky butter pastries, and healthy whole-grain bakes.",
  },
  "Frozen Seafoods": {
    bg: "bg-[#d8eef5] border-[#bde2ee]",
    text: "text-sky-950",
    desc: "Wild-caught salmon, Atlantic tiger prawns, and ocean-fresh seafoods.",
  },
  "Raw Meats": {
    bg: "bg-[#d9ede2] border-[#bee2cd]",
    text: "text-emerald-950",
    desc: "Ethically farmed grass-fed beef, free-range poultry, and tender cutlets.",
  },
  "Coffees and Teas": {
    bg: "bg-[#eee9df] border-[#e2d9ca]",
    text: "text-amber-950",
    desc: "Single-origin Arabica roasts, ceremonial matcha, and botanical herbal blends.",
  },
  "Milks and Dairies": {
    bg: "bg-[#fef9c3] border-[#fef08a]",
    text: "text-amber-950",
    desc: "Creamy Jersey cow whole milks, aged Dutch cheeses, and farm-fresh butter.",
  },
  "Pet Foods": {
    bg: "bg-[#e8e4f8] border-[#d3ccf1]",
    text: "text-purple-950",
    desc: "Grain-free nutritious recipes crafted specifically for your furry family.",
  },
  "Organic Harvest": {
    bg: "bg-[#d9ede2] border-[#bee2cd]",
    text: "text-emerald-950",
    desc: "Certified organic pantry essentials, virgin cold-pressed oils, and superfoods.",
  },
};

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("q") || "";

  const { addToCart } = useCart();

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    searchTerm: initialSearch,
    priceRange: [0, 100],
    brands: [],
    minRating: null,
    inStockOnly: false,
    onSaleOnly: false,
  });

  // Display state
  const [sortBy, setSortBy] = useState<ProductSortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Compute category item counts
  const categoryCounts = useMemo<CategoryCount[]>(() => {
    const counts: Record<string, number> = { All: mockProducts.length };
    mockProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const categoryList = [
      "All",
      "Fruits & Vegetables",
      "Breads & Sweets",
      "Frozen Seafoods",
      "Raw Meats",
      "Coffees and Teas",
      "Milks and Dairies",
      "Pet Foods",
      "Organic Harvest",
    ];

    return categoryList.map((cat) => ({
      name: cat,
      count: counts[cat] || 0,
    }));
  }, []);

  // Compute brand item counts
  const brandCounts = useMemo<BrandCount[]>(() => {
    const counts: Record<string, number> = {};
    mockProducts.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Category filter
      if (filters.category !== "All" && product.category !== filters.category) {
        return false;
      }

      // Search term
      if (filters.searchTerm.trim() !== "") {
        const query = filters.searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) {
          return false;
        }
      }

      // Price range
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Brands
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }

      // Rating
      if (filters.minRating !== null && product.rating < filters.minRating) {
        return false;
      }

      // In Stock
      if (filters.inStockOnly && product.inStock === false) {
        return false;
      }

      // On Sale
      if (filters.onSaleOnly && !product.discount) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        return list.sort((a, b) => a.price - b.price);
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "discount":
        return list.sort((a, b) => {
          const discA = a.discount ? parseInt(a.discount.replace(/[^0-9]/g, "")) : 0;
          const discB = b.discount ? parseInt(b.discount.replace(/[^0-9]/g, "")) : 0;
          return discB - discA;
        });
      case "newest":
        return list.reverse();
      case "featured":
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const handleResetFilters = () => {
    setFilters({
      category: "All",
      searchTerm: "",
      priceRange: [0, 100],
      brands: [],
      minRating: null,
      inStockOnly: false,
      onSaleOnly: false,
    });
    setCurrentPage(1);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewQty(1);
  };

  const currentTheme =
    departmentTheme[filters.category] || departmentTheme["All"];

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      <Header />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 lg:px-8 py-5 space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            ...(filters.category !== "All"
              ? [{ label: filters.category }]
              : []),
          ]}
        />

        {/* Dynamic Category Hero Banner */}
        <section
          className={`rounded-3xl p-6 sm:p-8 border shadow-2xs relative overflow-hidden transition-all duration-300 ${currentTheme.bg}`}
        >
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs text-[11px] font-black tracking-wider uppercase text-amber-950 border border-white/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Farmart Fresh Groceries</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
              {filters.category === "All" ? "All Grocery Products" : filters.category}
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              {currentTheme.desc}
            </p>
          </div>

          {/* Quick Department Switcher Pills */}
          <div className="relative z-10 mt-5 pt-4 border-t border-black/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categoryCounts.map((cat) => {
              const isActive = filters.category === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, category: cat.name }));
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-white/80 hover:bg-white text-gray-800 hover:shadow-xs border border-white/50"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              );
            })}
          </div>
        </section>

        {/* Catalog Main Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs sticky top-20">
            <ProductFilters
              categories={categoryCounts}
              brands={brandCounts}
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Products Column */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Toolbar: Search, Sorting, View Modes & Mobile Filter Trigger */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Bar inside catalog */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={filters.searchTerm}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
                    setCurrentPage(1);
                  }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-amber-400 focus:bg-white transition-colors"
                />
                {filters.searchTerm && (
                  <button
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, searchTerm: "" }))}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Controls Group */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                {/* Mobile Filter Drawer Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 hidden sm:inline" />
                  <span className="hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as ProductSortOption)
                    }
                    className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-2 text-xs font-bold text-gray-800 focus:outline-hidden focus:border-amber-400 cursor-pointer"
                  >
                    <option value="featured">Featured Deals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="discount">Highest Discount</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-white text-gray-900 shadow-2xs font-bold"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    title="Grid view"
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-white text-gray-900 shadow-2xs font-bold"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    title="List view"
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Pills Bar */}
            {(filters.category !== "All" ||
              filters.searchTerm ||
              filters.brands.length > 0 ||
              filters.minRating !== null ||
              filters.inStockOnly ||
              filters.onSaleOnly ||
              filters.priceRange[0] > 0 ||
              filters.priceRange[1] < 100) && (
              <div className="flex flex-wrap items-center gap-1.5 bg-amber-50/60 border border-amber-100 p-2.5 rounded-xl text-xs">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mr-1">
                  Active Filters:
                </span>

                {filters.category !== "All" && (
                  <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-gray-800 px-2.5 py-0.5 rounded-full font-semibold">
                    Category: {filters.category}
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, category: "All" }))
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.searchTerm && (
                  <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-gray-800 px-2.5 py-0.5 rounded-full font-semibold">
                    &quot;{filters.searchTerm}&quot;
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, searchTerm: "" }))
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
                  <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-gray-800 px-2.5 py-0.5 rounded-full font-semibold">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, priceRange: [0, 100] }))
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.brands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 bg-white border border-amber-200 text-gray-800 px-2.5 py-0.5 rounded-full font-semibold"
                  >
                    {b}
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          brands: prev.brands.filter((item) => item !== b),
                        }))
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {filters.minRating && (
                  <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-gray-800 px-2.5 py-0.5 rounded-full font-semibold">
                    {filters.minRating}★ & above
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, minRating: null }))
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.inStockOnly && (
                  <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-gray-800 px-2.5 py-0.5 rounded-full font-semibold">
                    In Stock Only
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, inStockOnly: false }))
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.onSaleOnly && (
                  <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-gray-800 px-2.5 py-0.5 rounded-full font-semibold">
                    On Sale Only
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, onSaleOnly: false }))
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-amber-800 hover:text-amber-950 font-bold underline ml-auto text-[11px]"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid / List Content */}
            {paginatedProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    : "space-y-4"
                }
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-2xs space-y-4 my-8">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    No matching products found
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We couldn&apos;t find any items matching your current filters. Try
                    loosening price boundaries, clearing search keywords, or selecting another department.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#fab528] hover:bg-[#e59d12] text-gray-900 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-2xs hover:shadow active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 px-5 py-2 shadow-2xs">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  totalItems={sortedProducts.length}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={(count) => {
                    setItemsPerPage(count);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Guarantees / Service Trust Badges */}
        <div className="pt-6">
          <TrustBadges />
        </div>
      </main>

      <Footer />
      <CartToast />

      {/* --- Mobile Filter Drawer (using Dialog) --- */}
      <Dialog
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Groceries"
        size="md"
        confirmText="Apply Filters"
        confirmVariant="primary"
        onConfirm={() => setIsMobileFilterOpen(false)}
      >
        <div className="max-h-[60vh] overflow-y-auto pr-1">
          <ProductFilters
            categories={categoryCounts}
            brands={brandCounts}
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
            }}
            onResetFilters={handleResetFilters}
          />
        </div>
      </Dialog>

      {/* --- Product Quick View Modal (using Dialog) --- */}
      {quickViewProduct && (
        <Dialog
          isOpen={Boolean(quickViewProduct)}
          onClose={() => setQuickViewProduct(null)}
          size="2xl"
          showCloseButton={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left Image Spotlight */}
            <div className="relative aspect-square bg-[#f7f8fa] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-4">
              <Image
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                width={360}
                height={360}
                className="object-contain max-h-60"
                unoptimized
              />
              {quickViewProduct.discount && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs">
                  {quickViewProduct.discount}
                </span>
              )}
              {quickViewProduct.badge && (
                <span className="absolute top-3 right-3 bg-amber-400 text-gray-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Right Meta & Actions */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {quickViewProduct.brand}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {quickViewProduct.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-gray-900 leading-snug">
                  {quickViewProduct.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < quickViewProduct.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">
                    ({quickViewProduct.reviews} verified reviews)
                  </span>
                </div>
              </div>

              {/* Price & Unit */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-600">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${quickViewProduct.oldPrice.toFixed(2)}
                  </span>
                )}
                {quickViewProduct.unit && (
                  <span className="text-xs text-gray-500 ml-1">
                    / {quickViewProduct.unit}
                  </span>
                )}
              </div>

              {/* Description */}
              {quickViewProduct.description && (
                <p className="text-xs text-gray-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>
              )}

              {/* Stock Status Pill */}
              <div>
                {quickViewProduct.inStock !== false ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <Check className="w-3.5 h-3.5" />
                    In Stock &amp; Ready for Delivery
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    Currently Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="flex items-center gap-3 pt-2">
                <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50/60 p-1">
                  <button
                    type="button"
                    onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                    className="w-8 h-8 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-2xs cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-gray-900">
                    {quickViewQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuickViewQty(quickViewQty + 1)}
                    className="w-8 h-8 rounded bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={quickViewProduct.inStock === false}
                  onClick={() => {
                    for (let i = 0; i < quickViewQty; i++) {
                      addToCart({
                        id: quickViewProduct.id,
                        name: quickViewProduct.name,
                        price: quickViewProduct.price,
                        image: quickViewProduct.image,
                      });
                    }
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-2xs hover:shadow active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Cart • ${(quickViewProduct.price * quickViewQty).toFixed(2)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <CartProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center text-xs text-gray-500 font-semibold">
            Loading Farmart groceries...
          </div>
        }
      >
        <ProductsCatalogContent />
      </Suspense>
    </CartProvider>
  );
}
