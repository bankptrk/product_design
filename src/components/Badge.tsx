import React from "react";

export type BadgeVariant =
  | "discount"
  | "deal"
  | "stock"
  | "out-of-stock"
  | "count"
  | "brand"
  | "info"
  | "subtle";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  discount: "bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs",
  deal: "inline-flex items-center gap-1 bg-amber-400/20 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider",
  stock: "inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full",
  "out-of-stock": "inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full",
  count: "inline-flex items-center justify-center bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full",
  brand: "bg-amber-400 text-gray-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider",
  info: "inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full",
  subtle: "inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded-md",
};

export default function Badge({
  variant = "subtle",
  dot = false,
  icon,
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center font-sans select-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${
            variant === "stock"
              ? "bg-emerald-500"
              : variant === "discount" || variant === "out-of-stock"
              ? "bg-red-500"
              : variant === "deal" || variant === "brand"
              ? "bg-amber-500"
              : "bg-gray-400"
          }`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="mr-1 shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
