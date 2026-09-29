import Link from "next/link";
import { CartLink } from "@/components/cart/CartLink";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/products" className="text-xl font-semibold tracking-tight">
          Store
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          <Link
            href="/products"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Products
          </Link>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
