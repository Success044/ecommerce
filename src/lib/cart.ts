import type { CartLineItem, CartProduct } from "@/types/cart";

export function isValidQuantity(quantity: number): boolean {
  return Number.isSafeInteger(quantity) && quantity > 0;
}

function isCartProduct(value: unknown): value is CartProduct {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    Number.isSafeInteger(value.id) &&
    value.id > 0 &&
    "title" in value &&
    typeof value.title === "string" &&
    value.title.trim().length > 0 &&
    "price" in value &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    "image" in value &&
    typeof value.image === "string" && value.image.length > 0
  );
}

function isCartLineItem(value: unknown): value is CartLineItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "product" in value &&
    isCartProduct(value.product) &&
    "quantity" in value &&
    typeof value.quantity === "number" &&
    isValidQuantity(value.quantity)
  );
}

export function restoreCart(value: unknown): CartLineItem[] {
  if (!Array.isArray(value)) return [];

  const items = new Map<number, CartLineItem>();

  for (const item of value) {
    if (isCartLineItem(item) && !items.has(item.product.id)) {
      const { id, title, price, image } = item.product;
      items.set(id, {
        product: { id, title, price, image },
        quantity: item.quantity,
      });
    }
  }

  return [...items.values()];
}

export function getLineTotal(item: CartLineItem): number {
  return (Math.round(item.product.price * 100) * item.quantity) / 100;
}

export function getCartTotal(items: CartLineItem[]): number {
  return (
    items.reduce(
      (total, item) =>
        total + Math.round(item.product.price * 100) * item.quantity,
      0,
    ) / 100
  );
}
