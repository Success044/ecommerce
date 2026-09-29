import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/currency";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5">
      <Link href={`/products/${product.id}`} className="group rounded-md">
        <div className="relative mb-5 h-48">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            className="object-contain"
          />
        </div>
        <p className="mb-2 text-xs font-medium text-slate-500 capitalize">
          {product.category}
        </p>
        <h2 className="mb-4 text-base leading-6 font-semibold wrap-break-word group-hover:underline">
          {product.title}
        </h2>
      </Link>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
        <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
        <p
          className="text-sm text-slate-600"
          aria-label={`Rated ${product.rating.rate} out of 5, ${product.rating.count} reviews`}
        >
          <span aria-hidden="true" className="mr-1 text-amber-600">
            ★
          </span>
          {product.rating.rate.toFixed(1)}
          <span className="ml-1 text-slate-500">({product.rating.count})</span>
        </p>
      </div>
    </article>
  );
}
