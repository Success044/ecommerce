import type { Product } from "./product";

export type CartProduct = Pick<Product, "id" | "title" | "price" | "image">;

export interface CartLineItem {
  product: CartProduct;
  quantity: number;
}
