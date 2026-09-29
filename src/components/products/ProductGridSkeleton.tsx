import { ProductSkeleton } from "./ProductSkeleton";

const skeletonIds = ["skeleton-a", "skeleton-b", "skeleton-c", "skeleton-d", "skeleton-e", "skeleton-f", "skeleton-g", "skeleton-h"];

export function ProductGridSkeleton() {
  return (
    <div
      aria-busy="true"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {skeletonIds.map((id) => (
        <ProductSkeleton key={id} />
      ))}
    </div>
  );
}
