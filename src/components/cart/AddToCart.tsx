"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { CartProduct } from "@/types/cart";
import { useCartStore } from "./CartProvider";
import { QuantityInput } from "./QuantityInput";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export function AddToCart({ product }: { product: CartProduct }) {
  const { user, hasHydrated: authHydrated } = useAuth();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authHydrated) return;
    if (!user) {
      const returnTo = window.location.pathname + window.location.search;
      router.push(`/login?returnTo=${encodeURIComponent(returnTo)}`);
      return;
    }
    if (!hasHydrated) return;
    const added = addItem(product, quantity);
    setMessage(added ? `Added ${quantity} to your cart.` : "Choose a valid quantity.");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 border-t border-slate-200 pt-5">
      <div className="flex flex-wrap items-end gap-3">
        <QuantityInput value={quantity} disabled={!user || !hasHydrated} onChange={(next) => { setQuantity(next); setMessage(""); }} />
        <button type="submit" disabled={!authHydrated || (Boolean(user) && !hasHydrated)} className="min-h-11 flex-1 rounded-md bg-slate-900 px-4 text-sm font-medium whitespace-nowrap text-white hover:bg-slate-700 disabled:opacity-50">
          {user ? "Add to cart" : "Log in to add"}
        </button>
      </div>
      <p role="status" className="mt-2 min-h-5 text-sm text-slate-600">{message}</p>
      {message.startsWith("Added") && <Link href="/cart" className="text-sm font-medium underline">View cart</Link>}
    </form>
  );
}
