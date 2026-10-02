"use client";

import { useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import {
  filterProducts,
  getPriceRangeError,
  paginateProducts,
} from "@/lib/products";
import {
  getProductFilters,
  getProductPage,
  getProductsUrl,
} from "@/lib/product-query";
import type { Product, ProductFilterValues, SortOrder } from "@/types/product";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { ProductGridSkeleton } from "./ProductGridSkeleton";
import { ProductSort } from "./ProductSort";

const initialFilters: ProductFilterValues = {
  search: "",
  category: "",
  minPrice: "",
  maxPrice: "",
};
const pageSize = 8;

interface ProductExplorerProps {
  products: Product[];
  categories: string[];
  sort: SortOrder;
}

export function ProductExplorer({
  products,
  categories,
  sort,
}: ProductExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lastEditedUrl = useRef<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const filters = getProductFilters(searchParams);
  const priceError = getPriceRangeError(filters);
  const filteredProducts = filterProducts(products, filters);
  const page = getProductPage(searchParams);
  const result = paginateProducts(filteredProducts, page, pageSize);

  let statusText = "0 products";

  if (isPending) {
    statusText = "Loading products...";
  } else if (filteredProducts.length > 0) {
    const firstProduct = (result.currentPage - 1) * pageSize + 1;
    const lastProduct = Math.min(
      result.currentPage * pageSize,
      filteredProducts.length,
    );
    statusText = `Showing ${firstProduct} to ${lastProduct} of ${filteredProducts.length} products`;
  }

  function updateClientUrl(url: string, replace = false) {
    if (url === `${window.location.pathname}${window.location.search}`) return;

    // Update filter URLs without fetching the catalog again.
    if (replace) {
      window.history.replaceState(null, "", url);
    } else {
      window.history.pushState(null, "", url);
    }
  }

  function handleFiltersChange(nextFilters: ProductFilterValues) {
    const params = new URLSearchParams(window.location.search);
    const url = getProductsUrl(params, { ...nextFilters, page: "1" });
    const isTyping = nextFilters.category === filters.category;
    // Group typing in one field into a single history entry. Category changes add a new entry.
    const replace = isTyping && lastEditedUrl.current === window.location.href;

    updateClientUrl(url, replace);
    lastEditedUrl.current = isTyping ? window.location.href : null;
  }

  function handleReset() {
    lastEditedUrl.current = null;
    const params = new URLSearchParams(window.location.search);
    updateClientUrl(getProductsUrl(params, { ...initialFilters, page: "1" }));
  }

  function handlePageChange(nextPage: number) {
    const params = new URLSearchParams(window.location.search);
    updateClientUrl(getProductsUrl(params, { page: String(nextPage) }));
  }

  function handleSortChange(nextSort: SortOrder) {
    if (nextSort === sort) return;
    const params = new URLSearchParams(window.location.search);
    const url = getProductsUrl(params, { sort: nextSort, page: "1" });
    startTransition(() => router.push(url, { scroll: false }));
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" className="text-sm text-slate-600">
          {statusText}
        </p>
        <ProductSort
          sort={sort}
          onSortChange={handleSortChange}
          disabled={isPending}
        />
      </div>
      <ProductFilters
        filters={filters}
        categories={categories}
        priceError={priceError}
        disabled={isPending}
        onChange={handleFiltersChange}
        onBlur={() => {
          lastEditedUrl.current = null;
        }}
        onReset={handleReset}
      />
      {isPending ? (
        <ProductGridSkeleton />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          title={
            products.length === 0
              ? "No products available"
              : "No matching products"
          }
          message={
            products.length === 0
              ? "Please check back soon."
              : "Adjust your filters or reset them to see more products."
          }
        />
      ) : (
        <>
          <ProductGrid products={result.products} />
          <Pagination
            currentPage={result.currentPage}
            totalPages={result.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
