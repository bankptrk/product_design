import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

export default function TrustBadges() {
  const perks = [
    {
      icon: <Truck className="w-6 h-6 text-amber-500" />,
      title: "Free Shipping",
      desc: "For all orders over $50",
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-amber-500" />,
      title: "30-Day Returns",
      desc: "If goods have problems",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: "100% Secure Payment",
      desc: "Guaranteed safe & secure",
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-500" />,
      title: "24/7 Dedicated Support",
      desc: "Anywhere & anytime assistance",
    },
  ];

  return (
    <section className="max-w-[1360px] mx-auto px-4 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        {perks.map((perk, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50/70 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
              {perk.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-tight">
                {perk.title}
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">{perk.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
