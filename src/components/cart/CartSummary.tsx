import { getCartTotal } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";
import type { CartLineItem } from "@/types/cart";

export function CartSummary({ items }: { items: CartLineItem[] }) {
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <section aria-labelledby="cart-summary-title" className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 id="cart-summary-title" className="text-lg font-semibold">Cart summary</h2>
      <p className="mt-3 text-sm text-slate-600">{count} {count === 1 ? "item" : "items"}</p>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
        <span className="font-medium">Total</span>
        <span className="text-xl font-semibold">{formatCurrency(getCartTotal(items))}</span>
      </div>
    </section>
  );
}
