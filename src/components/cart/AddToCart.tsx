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
    setMessage(added ? `Added ${quantity} to cart.` : "Choose a valid quantity.");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 border-t border-slate-200 pt-5">
      <QuantityInput
        value={quantity}
        disabled={!user || !hasHydrated}
        onChange={(next) => {
          setQuantity(next);
          setMessage("");
        }}
      />
      <button
        type="submit"
        disabled={!authHydrated || (Boolean(user) && !hasHydrated)}
        className="mt-3 min-h-11 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white enabled:hover:bg-slate-800 enabled:active:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {user ? "Add to cart" : "Log in to add"}
      </button>
      <div className="mt-2 grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs">
        <p role="status" className="text-slate-600">{message}</p>
        {message.startsWith("Added") && (
          <Link href="/cart" className="inline-flex min-h-11 items-center rounded-sm font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600">
            View cart
          </Link>
        )}
      </div>
    </form>
  );
}
