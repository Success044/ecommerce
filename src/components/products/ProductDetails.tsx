import Image from "next/image";
import { AddToCart } from "@/components/cart/AddToCart";
import { formatCurrency } from "@/lib/currency";
import type { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <article className="grid gap-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative h-72 sm:h-96 lg:h-[28rem]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-contain"
        />
      </div>
      <div className="min-w-0">
        <p className="mb-3 text-sm font-medium text-slate-500 capitalize">
          {product.category}
        </p>
        <h1 className="text-2xl leading-tight font-semibold tracking-tight wrap-break-word sm:text-3xl">
          {product.title}
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          <span aria-hidden="true" className="mr-1 text-amber-600">
            ★
          </span>
          {product.rating.rate.toFixed(1)} out of 5
          <span className="ml-2">
            ({product.rating.count} {product.rating.count === 1 ? "review" : "reviews"})
          </span>
        </p>
        <p className="mt-6 text-3xl font-semibold">
          {formatCurrency(product.price)}
        </p>
        <AddToCart product={product} />
        <div className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-base font-semibold">Description</h2>
          <p className="mt-3 text-base leading-7 whitespace-pre-line text-slate-600 wrap-break-word">
            {product.description}
          </p>
        </div>
      </div>
    </article>
  );
}
