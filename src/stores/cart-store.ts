import { createStore } from "zustand/vanilla";
import { isValidQuantity } from "@/lib/cart";
import type { CartLineItem, CartProduct } from "@/types/cart";

export interface CartState {
  items: CartLineItem[];
  hasHydrated: boolean;
  storageError: string | null;
  addItem: (product: CartProduct, quantity: number) => boolean;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
}

export function createCartStore(canUseCart: () => boolean) {
  return createStore<CartState>()((set, get) => ({
    items: [],
    hasHydrated: false,
    storageError: null,
    addItem: (product, quantity) => {
      if (!canUseCart() || !isValidQuantity(quantity)) return false;

      const existing = get().items.find((item) => item.product.id === product.id);
      const nextQuantity = (existing?.quantity ?? 0) + quantity;
      if (!isValidQuantity(nextQuantity)) return false;

      const { id, title, price, image } = product;
      set((state) => ({
        items: existing
          ? state.items.map((item) =>
              item.product.id === id
                ? { ...item, quantity: nextQuantity }
                : item,
            )
          : [...state.items, { product: { id, title, price, image }, quantity }],
      }));
      return true;
    },
    updateQuantity: (productId, quantity) => {
      if (!canUseCart() || !isValidQuantity(quantity)) return;
      set((state) => ({
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      }));
    },
    removeItem: (productId) => {
      if (!canUseCart()) return;
      set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId),
      }));
    },
  }));
}

export type CartStore = ReturnType<typeof createCartStore>;
