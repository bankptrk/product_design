"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import HeroBanners from "@/components/HeroBanners";
import CategorySlider from "@/components/CategorySlider";
import FeaturedBrands from "@/components/FeaturedBrands";
import TopSaverToday from "@/components/TopSaverToday";
import BestSeller from "@/components/BestSeller";
import JustLanding from "@/components/JustLanding";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#f7f8fa] flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
        {/* Navigation & Header */}
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <HeroBanners />

          {/* Browse by Category */}
          <CategorySlider />

          {/* Featured Brands */}
          <FeaturedBrands />

          {/* Top Saver Today */}
          <TopSaverToday />

          {/* Best Seller */}
          <BestSeller />

          {/* Just Landing */}
          <JustLanding />

          {/* Service Guarantees / Trust Badges */}
          <TrustBadges />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Floating Cart Toast */}
        <CartToast />
      </div>
    </CartProvider>
  );
}
