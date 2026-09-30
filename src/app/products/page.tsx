import { ProductExplorer } from "@/components/products/ProductExplorer";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ApiError } from "@/lib/api/fetcher";
import { getCategories, getProducts } from "@/lib/api/products";
import type { SortOrder } from "@/types/product";

interface ProductsPageProps {
  searchParams: Promise<{
    sort?: string | string[];
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const query = await searchParams;

  const sort: SortOrder = query.sort === "desc" ? "desc" : "asc";

  const [productsResult, categoriesResult] = await Promise.allSettled([
    getProducts(sort),
    getCategories(),
  ]);

  if (productsResult.status === "rejected") {
    const error: unknown = productsResult.reason;

    if (!(error instanceof ApiError)) {
      throw error;
    }

    console.warn("Product request failed", {
      status: error.status,
    });

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

  const products = productsResult.value;

  const categories =
    categoriesResult.status === "fulfilled"
      ? categoriesResult.value
      : [...new Set(products.map((product) => product.category))];

  if (categoriesResult.status === "rejected") {
    const error: unknown = categoriesResult.reason;

    console.warn("Category request failed", {
      status: error instanceof ApiError ? error.status : undefined,
    });
  }

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
    >
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Products</h1>

      <ProductExplorer
        products={products}
        categories={categories}
        sort={sort}
      />
    </main>
  );
}
