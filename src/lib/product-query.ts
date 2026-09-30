import type { ProductFilterValues, SortOrder } from "@/types/product";

type SearchParams = Pick<URLSearchParams, "get">;

export function getProductFilters(params: SearchParams): ProductFilterValues {
  return {
    search: params.get("search") ?? "",
    category: params.get("category") ?? "",
    minPrice: params.get("minPrice") ?? "",
    maxPrice: params.get("maxPrice") ?? "",
  };
}

export function getProductPage(params: SearchParams): number {
  const value = params.get("page") ?? "1";
  const page = Number(value);

  return /^\d+$/.test(value) && Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function getProductsUrl(
  params: URLSearchParams,
  changes: Partial<ProductFilterValues> & { sort?: SortOrder; page?: string },
): string {
  const nextParams = new URLSearchParams(params);

  for (const [key, value] of Object.entries(changes)) {
    if (value === "" || (key === "page" && value === "1")) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
  }

  const query = nextParams.toString();
  return query ? `/products?${query}` : "/products";
}
