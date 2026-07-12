"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { WCProduct, WCVariation } from "@/lib/woocommerce";

export interface CartItem {
  product: WCProduct;
  quantity: number;
  variation?: WCVariation;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: WCProduct; quantity?: number; variation?: WCVariation }
  | { type: "REMOVE_ITEM"; productId: number; variationId?: number }
  | { type: "UPDATE_QTY"; productId: number; variationId?: number; quantity: number }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState;
  addItem: (product: WCProduct, qty?: number, variation?: WCVariation) => void;
  removeItem: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) =>
          i.product.id === action.product.id &&
          i.variation?.id === action.variation?.id
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id && i.variation?.id === action.variation?.id
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { product: action.product, quantity: action.quantity ?? 1, variation: action.variation },
        ],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Persist cart to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("organic-bd-cart");
    if (saved) {
      const parsed: CartItem[] = JSON.parse(saved);
      parsed.forEach((item) => dispatch({ type: "ADD_ITEM", product: item.product, quantity: item.quantity }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("organic-bd-cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: WCProduct, qty = 1, variation?: WCVariation) =>
  dispatch({ type: "ADD_ITEM", product, quantity: qty, variation });
  const removeItem = (productId: number) => dispatch({ type: "REMOVE_ITEM", productId });
  const updateQty = (productId: number, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", productId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + parseFloat(i.product.price) * i.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
