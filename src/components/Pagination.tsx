"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  onItemsPerPageChange?: (count: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1 && !totalItems) return null;

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const startItem = itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : undefined;
  const endItem =
    itemsPerPage && totalItems
      ? Math.min(currentPage * itemsPerPage, totalItems)
      : undefined;

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 ${className}`}
    >
      {/* Results summary and Items per page selector */}
      <div className="flex items-center gap-3 text-xs text-gray-500">
        {totalItems !== undefined && startItem !== undefined && endItem !== undefined && (
          <span>
            Showing <strong className="text-gray-900 font-bold">{startItem}–{endItem}</strong> of{" "}
            <strong className="text-gray-900 font-bold">{totalItems}</strong> products
          </span>
        )}

        {itemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center gap-1.5 ml-2 border-l border-gray-200 pl-3">
            <span className="text-gray-400">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="bg-white border border-gray-200 rounded-md px-2 py-1 text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-amber-400"
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>
        )}
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
            currentPage <= 1
              ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
              : "border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-900 active:scale-95"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Buttons */}
        {pages.map((p, idx) => {
          if (p === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-9 h-9 flex items-center justify-center text-xs text-gray-400 select-none font-bold"
              >
                ...
              </span>
            );
          }

          const pageNum = p as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-9 h-9 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                isActive
                  ? "bg-[#fab528] text-gray-900 font-black shadow-sm scale-105"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-900 active:scale-95"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
            currentPage >= totalPages
              ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
              : "border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-900 active:scale-95"
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
