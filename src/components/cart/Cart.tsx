"use client";

import Link from "next/link";
import { useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCartStore } from "./CartProvider";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function Cart() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const storageError = useCartStore((state) => state.storageError);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [removedMessage, setRemovedMessage] = useState("");

  if (!hasHydrated) return <p role="status" className="text-slate-600">Loading your cart...</p>;

  return (
    <>
      {storageError && <p role="status" className="mb-5 rounded-md bg-amber-50 p-4 text-sm text-amber-900">{storageError}</p>}
      <p role="status" className="sr-only">{removedMessage}</p>
      {items.length === 0 ? (
        <EmptyState title="Your cart is empty" message="Add products to see them here." />
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.product.id}>
                <CartItem
                  item={item}
                  onQuantityChange={(quantity) => updateQuantity(item.product.id, quantity)}
                  onRemove={() => { removeItem(item.product.id); setRemovedMessage(`${item.product.title} removed from cart.`); }}
                />
              </li>
            ))}
          </ul>
          <CartSummary items={items} />
        </div>
      )}
      <Link href="/products" className="mt-6 inline-flex min-h-11 items-center rounded-md text-sm font-medium underline">Continue shopping</Link>
    </>
  );
}
