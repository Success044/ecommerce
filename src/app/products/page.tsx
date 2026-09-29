import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { ProductSort } from "@/components/products/ProductSort";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ApiError } from "@/lib/api/fetcher";
import { getProducts } from "@/lib/api/products";
import type { Product, SortOrder } from "@/types/product";

interface ProductsPageProps {
  searchParams: Promise<{ sort?: string | string[] }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = await searchParams;
  const sort: SortOrder = query.sort === "desc" ? "desc" : "asc";
  let products: Product[];

  try {
    products = await getProducts(sort);
  } catch (error) {
    if (!(error instanceof ApiError)) {
      throw error;
    }

    console.warn("Product request failed", { status: error.status });

    return (
      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <h1 className="mb-8 text-3xl font-semibold tracking-tight">Products</h1>
        <ErrorMessage
          title="Products are temporarily unavailable"
          message="We couldn't load the catalog. Please try again in a moment."
          pendingFallback={<ProductGridSkeleton />}
        />
      </main>
    );
  }

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
          <p className="mt-2 text-sm text-slate-600">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
        <ProductSort sort={sort} />
      </div>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          title="No products available"
          message="Please check back soon."
        />
      )}
    </main>
  );
}
