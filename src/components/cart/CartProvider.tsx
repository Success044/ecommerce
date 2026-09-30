"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import { restoreCart } from "@/lib/cart";
import { createCartStore, type CartState, type CartStore } from "@/stores/cart-store";
import { useAuth } from "@/components/auth/AuthProvider";

const CartContext = createContext<CartStore | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return <CartSession key={user?.username ?? "guest"}>{children}</CartSession>;
}

function CartSession({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [store] = useState(() => createCartStore(() => Boolean(user)));

  useEffect(() => {
    if (!user) return;
    const storageKey = `ecommerce-cart:${user.username}`;
    try {
      const saved = window.localStorage.getItem(storageKey);
      const items = saved === null ? [] : restoreCart(JSON.parse(saved));
      store.setState({ items, hasHydrated: true, storageError: null });
    } catch {
      store.setState({
        hasHydrated: true,
        storageError: "Your saved cart could not be restored. You can start a new cart.",
      });
    }

    return store.subscribe((state, previous) => {
      if (state.items === previous.items) return;

      try {
        window.localStorage.setItem(storageKey, JSON.stringify(state.items));
        if (state.storageError) store.setState({ storageError: null });
      } catch {
        if (!state.storageError) {
          store.setState({ storageError: "Your cart works for this visit, but changes could not be saved in this browser." });
        }
      }
    });
  }, [store, user]);

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
}

export function useCartStore<T>(selector: (state: CartState) => T): T {
  const store = useContext(CartContext);
  if (!store) throw new Error("Cart components must be inside CartProvider.");
  return useStore(store, selector);
}
