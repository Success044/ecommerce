import { ProductDetailsSkeleton } from "@/components/products/ProductDetailsSkeleton";

export default function ProductLoading() {
  return (
    <>
      <h1 className="sr-only">Product details</h1>
      <ProductDetailsSkeleton />
    </>
  );
}
