import { ProductSkeleton } from "./ProductSkeleton";

export function ProductGridSkeleton() {
  return (
    <div
      aria-busy="true"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}
