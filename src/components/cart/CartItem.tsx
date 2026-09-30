import Image from "next/image";
import Link from "next/link";
import { getLineTotal } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";
import type { CartLineItem } from "@/types/cart";
import { QuantityInput } from "./QuantityInput";

interface CartItemProps {
  item: CartLineItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <article className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row">
      <Link
        href={`/products/${item.product.id}`}
        className="shrink-0 self-start rounded-md"
      >
        <Image
          src={item.product.image}
          alt={item.product.title}
          width={96}
          height={96}
          className="h-24 w-24 object-contain"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <h2 className="font-semibold wrap-break-word">
          <Link
            href={`/products/${item.product.id}`}
            className="hover:underline"
          >
            {item.product.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {formatCurrency(item.product.price)} each
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="w-full sm:w-56">
            <QuantityInput value={item.quantity} onChange={onQuantityChange} />
          </div>
          <div className="ml-auto text-right">
            <p className="font-semibold">
              {formatCurrency(getLineTotal(item))}
            </p>
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${item.product.title}`}
              className="mt-1 min-h-11 rounded-md text-sm text-red-700 underline hover:text-red-900"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
