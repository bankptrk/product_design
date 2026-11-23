import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-12">
      {/* Upper Newsletter Bar */}
      <div className="border-b border-gray-100 py-10 bg-amber-50/30">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Join our newsletter for £10 off
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Register now to get updates on promotions and coupons.
            </p>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-amber-400 shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-500 border border-amber-300/40">
                <svg
                  className="w-5 h-5 fill-amber-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-black text-gray-900 block leading-none">
                  Farmart
                </span>
                <span className="text-[8px] font-bold tracking-widest text-gray-400 block uppercase mt-0.5">
                  GROCERY
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed max-w-sm mb-4">
              Farmart is your one-stop online destination for fresh farm produce,
              wholesome bakery items, premium meats, and grocery essentials
              delivered right to your door.
            </p>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold text-gray-800">8 800 332 65 66</span>
                <span className="text-gray-400 font-normal">(Support 24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>510 Market Street, Suite 400, San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>
                <Link href="/design" className="text-amber-700 font-bold hover:text-amber-800 transition-colors flex items-center gap-1">
                  <span>Design System</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-extrabold">Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/overview" className="text-gray-800 font-bold hover:text-amber-700 transition-colors flex items-center gap-1">
                  <span>UI Flow Overview</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-extrabold">React Flow</span>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Hot Deals & Promos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Fruits & Vegetables
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Breads & Sweets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Frozen Seafoods
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Raw Meats
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Wines & Drinks
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Account */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  FAQs & Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & payment methods */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Farmart Grocery. All rights reserved.</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-gray-100 text-[10px] font-bold text-gray-600">
              VISA
            </span>
            <span className="px-2 py-1 rounded bg-gray-100 text-[10px] font-bold text-gray-600">
              Mastercard
            </span>
            <span className="px-2 py-1 rounded bg-gray-100 text-[10px] font-bold text-gray-600">
              PayPal
            </span>
            <span className="px-2 py-1 rounded bg-gray-100 text-[10px] font-bold text-gray-600">
              Apple Pay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
