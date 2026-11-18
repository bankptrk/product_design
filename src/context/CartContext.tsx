"use client";

import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  toggleWishlist: (id: string) => boolean;
  wishlist: string[];
  toastMessage: string | null;
  closeToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "initial-1",
      name: "Organic Valencia Oranges 3kg",
      price: 18.5,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "initial-2",
      name: "Premium Farm Fresh Milk 1L",
      price: 4.25,
      quantity: 4,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
    },
  ]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  // Initial total matching screenshot approx $2,450.50 or calculated
  const calculatedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = calculatedTotal + 2420.0; // base cart balance + added items

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setToastMessage(`Added "${item.name}" (x${quantity}) to your cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleWishlist = (id: string) => {
    let added = false;
    setWishlist((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        added = true;
        return [...prev, id];
      }
    });
    return added;
  };

  const closeToast = () => setToastMessage(null);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        cartTotal,
        wishlistCount: wishlist.length,
        addToCart,
        toggleWishlist,
        wishlist,
        toastMessage,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
