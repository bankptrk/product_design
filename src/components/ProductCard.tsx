"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Badge from "@/components/Badge";
import QuantityStepper from "@/components/QuantityStepper";

export interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  onQuickView?: (product: Product) => void;
  className?: string;
}

export default function ProductCard({
  product,
  viewMode = "grid",
  onQuickView,
  className = "",
}: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = wishlist.includes(product.id);
  const isAvailable = product.inStock !== false;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  // --- List View Layout ---
  if (viewMode === "list") {
    return (
      <div
        className={`group bg-white rounded-2xl border border-gray-100 hover:border-amber-300 transition-all duration-200 hover:shadow-md p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${className}`}
      >
        {/* Product Image & Badges */}
        <Link
          href={`/products/${product.id}`}
          className="relative w-full sm:w-48 h-44 shrink-0 bg-[#f7f8fa] rounded-xl flex items-center justify-center p-3 overflow-hidden border border-gray-50 block"
        >
          {product.discount && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <Badge variant="discount">{product.discount}</Badge>
            </div>
          )}

          {product.badge && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <Badge variant="brand">{product.badge}</Badge>
            </div>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 192px"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Content & Details */}
        <div className="flex-1 min-w-0 space-y-2 w-full text-left">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {product.brand}
            </span>
            {isAvailable ? (
              <Badge variant="stock" dot>
                In Stock
              </Badge>
            ) : (
              <Badge variant="out-of-stock">
                Out of Stock
              </Badge>
            )}
          </div>

          <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < product.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-medium">
              ({product.reviews} customer reviews)
            </span>
          </div>

          {product.description && (
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Stock progress bar if counts available */}
          {product.soldCount !== undefined && product.totalStock !== undefined && (
            <div className="pt-1 max-w-xs">
              <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                <span>Sold: {product.soldCount}</span>
                <span>In Stock: {product.totalStock - product.soldCount}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-400 h-1.5 rounded-full"
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

        {/* Pricing & Actions Column */}
        <div className="sm:border-l sm:border-gray-100 sm:pl-6 flex flex-col justify-between items-start sm:items-end w-full sm:w-48 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 gap-3">
          <div className="sm:text-right">
            <div className="flex items-baseline sm:justify-end gap-2">
              <span className="text-xl font-black text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.unit && (
              <span className="text-[11px] text-gray-400 block mt-0.5">
                Unit: {product.unit}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            {/* Quantity Stepper (DESIGN.md 6.1) */}
            <div className="flex items-center justify-between w-full">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                size="sm"
                ariaLabel={`Quantity for ${product.name}`}
              />

              <div className="flex items-center gap-1.5">
                {/* Quick View Button */}
                {onQuickView && (
                  <button
                    type="button"
                    onClick={() => onQuickView(product)}
                    className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-amber-100 text-gray-600 hover:text-amber-800 transition-colors flex items-center justify-center border border-gray-200 cursor-pointer"
                    title="Quick View"
                    aria-label={`Quick view ${product.name}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-8 h-8 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${
                    isWishlisted
                      ? "bg-rose-50 border-rose-200 text-rose-500"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:text-rose-500"
                  }`}
                  title="Add to Wishlist"
                  aria-label={`Wishlist ${product.name}`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-500" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              disabled={!isAvailable}
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-2xs cursor-pointer ${
                isAvailable
                  ? "bg-[#fab528] hover:bg-[#e59d12] text-gray-900 active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isAvailable ? `Add to Cart • $${(product.price * quantity).toFixed(2)}` : "Sold Out"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Grid View Layout (Standard Farmart Card) ---
  return (
    <div
      className={`group relative bg-white rounded-2xl border border-gray-100 hover:border-amber-300 transition-all duration-300 hover:shadow-md p-4 flex flex-col justify-between ${className}`}
    >
      {/* Top Bar: Discount Sticker & Wishlist Toggle */}
      <div className="flex items-center justify-between w-full relative z-10">
        <div>
          {product.discount ? (
            <Badge variant="discount">{product.discount}</Badge>
          ) : product.badge ? (
            <Badge variant="brand">{product.badge}</Badge>
          ) : (
            <span />
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Quick View Icon Action Button */}
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="w-8 h-8 rounded-full bg-white hover:bg-amber-500 hover:text-white border border-gray-100 shadow-2xs flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
              title="Quick view product"
              aria-label={`Quick view ${product.name}`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Wishlist Circular Button */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="w-8 h-8 rounded-full bg-white hover:bg-rose-50 border border-gray-100 shadow-2xs flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors"
            title="Wishlist toggle"
            aria-label={`Toggle wishlist for ${product.name}`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isWishlisted ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-full h-40 my-3 flex items-center justify-center overflow-hidden block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Meta Content */}
      <div className="flex flex-col flex-1 justify-between space-y-2">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            {product.brand}
          </span>
          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < product.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-medium">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Pricing Bar */}
        <div className="pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
            {product.unit && (
              <span className="text-[10px] text-gray-400 ml-auto">
                {product.unit}
              </span>
            )}
          </div>

          {/* Stock Progress Bar (DESIGN.md 6.4) */}
          {product.soldCount !== undefined && product.totalStock !== undefined ? (
            <div className="mt-2.5">
              <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                <span>Sold: {product.soldCount}</span>
                <span>Stock: {product.totalStock}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-400 h-1.5 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (product.soldCount / product.totalStock) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="mt-2">
              {isAvailable ? (
                <Badge variant="stock" dot>
                  In Stock
                </Badge>
              ) : (
                <Badge variant="out-of-stock">
                  Out of Stock
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="pt-3 border-t border-gray-50">
          <button
            type="button"
            disabled={!isAvailable}
            onClick={handleAddToCart}
            className={`w-full bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-4 py-2 rounded-lg text-xs tracking-wider uppercase transition-all duration-200 active:scale-[0.98] shadow-2xs hover:shadow flex items-center justify-center gap-1.5 ${
              !isAvailable ? "opacity-50 cursor-not-allowed bg-gray-200" : ""
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isAvailable ? "Add to Cart" : "Out of Stock"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
