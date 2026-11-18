"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartToast() {
  const { toastMessage, closeToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-sm">
      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
      <span className="text-xs font-semibold leading-snug">{toastMessage}</span>
      <button
        type="button"
        onClick={closeToast}
        className="text-gray-400 hover:text-white transition-colors ml-auto p-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
