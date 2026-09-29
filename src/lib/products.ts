import type { Product, ProductFilterValues } from "@/types/product";

export function getPriceRangeError(filters: ProductFilterValues): string | null {
  const min = Number(filters.minPrice);
  const max = Number(filters.maxPrice);

  if (filters.minPrice !== "" && (!Number.isFinite(min) || min < 0)) {
    return "Enter a minimum price of 0 or more.";
  }

  if (filters.maxPrice !== "" && (!Number.isFinite(max) || max < 0)) {
    return "Enter a maximum price of 0 or more.";
  }

  if (filters.minPrice !== "" && filters.maxPrice !== "" && min > max) {
    return "Minimum price must not exceed maximum price.";
  }

  return null;
}

export function filterProducts(products: Product[], filters: ProductFilterValues): Product[] {
  if (getPriceRangeError(filters)) {
    return [];
  }

  const search = filters.search.trim().toLowerCase();
  const min = filters.minPrice === "" ? 0 : Number(filters.minPrice);
  const max = filters.maxPrice === "" ? Infinity : Number(filters.maxPrice);

  return products.filter((product) =>
    product.title.toLowerCase().includes(search) &&
    (filters.category === "" || product.category === filters.category) &&
    product.price >= min &&
    product.price <= max,
  );
}

export function paginateProducts(products: Product[], page: number, pageSize: number) {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new RangeError("Page size must be a positive integer.");
  }

  const totalPages = Math.ceil(products.length / pageSize);
  const currentPage = Math.max(1, Math.min(Number.isInteger(page) ? page : 1, totalPages || 1));
  const start = (currentPage - 1) * pageSize;

  return {
    products: products.slice(start, start + pageSize),
    currentPage,
    totalPages,
  };
}
