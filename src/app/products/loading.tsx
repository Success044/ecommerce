import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";

export default function ProductsLoading() {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
    >
      <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
      <ProductGridSkeleton />
    </main>
  );
}
