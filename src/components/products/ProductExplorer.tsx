"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { filterProducts, getPriceRangeError, paginateProducts } from "@/lib/products";
import type { Product, ProductFilterValues, SortOrder } from "@/types/product";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { ProductGridSkeleton } from "./ProductGridSkeleton";
import { ProductSort } from "./ProductSort";

const initialFilters: ProductFilterValues = { search: "", category: "", minPrice: "", maxPrice: "" };
const pageSize = 8;

interface ProductExplorerProps {
  products: Product[];
  categories: string[];
  sort: SortOrder;
}

export function ProductExplorer({ products, categories, sort }: ProductExplorerProps) {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({ page: 1, sort });
  const [isPending, startTransition] = useTransition();
  const priceError = getPriceRangeError(filters);
  const filteredProducts = filterProducts(products, filters);
  const page = pagination.sort === sort ? pagination.page : 1;
  const result = paginateProducts(filteredProducts, page, pageSize);

  function handleFiltersChange(nextFilters: ProductFilterValues) {
    setFilters(nextFilters);
    setPagination({ page: 1, sort });
  }

  function handleSortChange(nextSort: SortOrder) {
    if (nextSort === sort) return;
    setPagination({ page: 1, sort: nextSort });
    startTransition(() => router.push(`/products?sort=${nextSort}`, { scroll: false }));
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" className="text-sm text-slate-600">
          {isPending ? "Loading products..." : filteredProducts.length === 0 ? "0 products" : `Showing ${(result.currentPage - 1) * pageSize + 1} to ${Math.min(result.currentPage * pageSize, filteredProducts.length)} of ${filteredProducts.length} products`}
        </p>
        <ProductSort sort={sort} onSortChange={handleSortChange} disabled={isPending} />
      </div>
      <ProductFilters
        filters={filters}
        categories={categories}
        priceError={priceError}
        disabled={isPending}
        onChange={handleFiltersChange}
        onReset={() => handleFiltersChange(initialFilters)}
      />
      {isPending ? <ProductGridSkeleton /> : filteredProducts.length === 0 ? (
        <EmptyState
          title={products.length === 0 ? "No products available" : "No matching products"}
          message={products.length === 0 ? "Please check back soon." : "Adjust your filters or reset them to see more products."}
        />
      ) : (
        <>
          <ProductGrid products={result.products} />
          <Pagination currentPage={result.currentPage} totalPages={result.totalPages} onPageChange={(nextPage) => setPagination({ page: nextPage, sort })} />
        </>
      )}
    </>
  );
}
