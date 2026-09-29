import Link from "next/link";
import type { ReactNode } from "react";

interface ProductLayoutProps {
  children: ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
    >
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex min-h-11 flex-wrap items-center gap-2 text-sm">
          <li>
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center rounded-md font-medium text-slate-600 hover:text-slate-900 hover:underline"
            >
              Products
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="text-slate-400">/</span>
            <span aria-current="page" className="font-medium text-slate-900">
              Product details
            </span>
          </li>
        </ol>
      </nav>
      {children}
    </main>
  );
}
