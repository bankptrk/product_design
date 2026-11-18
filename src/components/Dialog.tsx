"use client";

import React, { useEffect, useId, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const emptySubscribe = () => () => {};

export type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type DialogIconVariant = "brand" | "success" | "danger" | "warning" | "info" | "neutral";
export type DialogConfirmVariant = "primary" | "danger" | "dark";

export interface DialogProps {
  /** Controls open/close state of the dialog */
  isOpen: boolean;
  /** Callback fired when the dialog requests to close */
  onClose: () => void;
  /** Dialog heading title */
  title?: React.ReactNode;
  /** Dialog subtitle or explanatory description */
  description?: React.ReactNode;
  /** Optional icon rendered in a badge above the title */
  icon?: React.ReactNode;
  /** Color theme for the icon badge container */
  iconVariant?: DialogIconVariant;
  /** Maximum width preset for the dialog container */
  size?: DialogSize;
  /** Main body content */
  children?: React.ReactNode;
  /** Custom footer content; overrides confirmText/cancelText when provided */
  footer?: React.ReactNode;
  /** Label for confirm action button */
  confirmText?: string;
  /** Label for cancel action button */
  cancelText?: string;
  /** Style variant for confirm button */
  confirmVariant?: DialogConfirmVariant;
  /** Callback fired when confirm button is clicked */
  onConfirm?: () => void;
  /** Whether to show the top-right close icon button */
  showCloseButton?: boolean;
  /** Whether clicking the backdrop overlay closes the dialog */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape key closes the dialog */
  closeOnEscape?: boolean;
  /** Additional custom class names for the dialog card surface */
  className?: string;
}

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

const iconVariantClasses: Record<DialogIconVariant, string> = {
  brand: "bg-amber-50 text-amber-600 border-amber-200",
  success: "bg-emerald-50 text-emerald-600 border-emerald-200",
  danger: "bg-red-50 text-red-600 border-red-200",
  warning: "bg-amber-50 text-amber-500 border-amber-200",
  info: "bg-sky-50 text-sky-600 border-sky-200",
  neutral: "bg-gray-100 text-gray-600 border-gray-200",
};

const confirmVariantClasses: Record<DialogConfirmVariant, string> = {
  primary:
    "bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold shadow-2xs hover:shadow active:scale-95",
  danger:
    "bg-red-500 hover:bg-red-600 text-white font-bold shadow-2xs hover:shadow active:scale-95",
  dark:
    "bg-gray-900 hover:bg-black text-white font-bold shadow-2xs hover:shadow active:scale-95",
};

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  icon,
  iconVariant = "brand",
  size = "md",
  children,
  footer,
  confirmText,
  cancelText,
  confirmVariant = "primary",
  onConfirm,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = "",
}: DialogProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const id = useId();
  const titleId = `farmart-dialog-title-${id}`;
  const descriptionId = `farmart-dialog-desc-${id}`;

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isMounted || !isOpen) return null;

  const hasHeader = Boolean(title || description || icon);
  const hasDefaultFooter = Boolean(confirmText || cancelText);
  const showFooter = Boolean(footer || hasDefaultFooter);

  const dialogContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
        onClick={() => {
          if (closeOnBackdropClick) onClose();
        }}
        aria-hidden="true"
      />

      {/* Dialog Surface Card */}
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 transition-all duration-200 animate-in zoom-in-95 my-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-right close button */}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center shadow-2xs border border-gray-100 focus:outline-hidden focus:ring-2 focus:ring-amber-400/40"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Header */}
        {hasHeader && (
          <div className="p-6 pb-4 flex flex-col items-start gap-3">
            {icon && (
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs ${iconVariantClasses[iconVariant]}`}
              >
                {icon}
              </div>
            )}
            <div className="space-y-1 pr-6">
              {title && (
                <h3
                  id={titleId}
                  className="text-lg sm:text-xl font-bold tracking-tight text-gray-900"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p id={descriptionId} className="text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Body content */}
        {children && (
          <div
            className={`text-sm text-gray-600 leading-relaxed ${
              hasHeader ? "px-6 pb-6 pt-0" : "p-6"
            }`}
          >
            {children}
          </div>
        )}

        {/* Footer */}
        {showFooter && (
          <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-wrap items-center justify-end gap-3 rounded-b-2xl">
            {footer ? (
              footer
            ) : (
              <>
                {cancelText && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="border border-gray-200 hover:border-gray-900 bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors"
                  >
                    {cancelText}
                  </button>
                )}
                {confirmText && (
                  <button
                    type="button"
                    onClick={() => {
                      if (onConfirm) onConfirm();
                      onClose();
                    }}
                    className={`px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all duration-200 ${confirmVariantClasses[confirmVariant]}`}
                  >
                    {confirmText}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
}

// --- Compound Subcomponents ---

export function DialogHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pb-4 space-y-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg sm:text-xl font-bold tracking-tight text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function DialogDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-sm text-gray-600 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function DialogBody({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pt-0 text-sm text-gray-600 leading-relaxed ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogFooter({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-wrap items-center justify-end gap-3 rounded-b-2xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogClose({
  className = "",
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center shadow-2xs border border-gray-100 ${className}`}
      aria-label="Close dialog"
      {...props}
    >
      <X className="w-4 h-4" />
    </button>
  );
}

export default Dialog;
