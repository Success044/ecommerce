import type { Metadata } from "next";
import { Cart } from "@/components/cart/Cart";

export const metadata: Metadata = {
  title: "Shopping cart",
  description: "Review your cart, update quantities and view your total.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
    >
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">
        Shopping cart
      </h1>
      <Cart />
    </main>
  );
}
