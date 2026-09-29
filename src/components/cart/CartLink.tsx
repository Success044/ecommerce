"use client";

import Link from "next/link";
import { useCartStore } from "./CartProvider";

export function CartLink() {
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const count = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <Link href="/cart" className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
      Cart{hasHydrated && count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
