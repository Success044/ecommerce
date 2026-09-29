import type { Product, SortOrder } from "@/types/product";
import { ApiError, fetcher } from "./fetcher";

function getApiUrl(): string {
  const apiUrl = process.env.FAKE_STORE_API_URL?.trim();

  if (!apiUrl) {
    throw new ApiError("The store is not configured. Please try again later.");
  }

  return apiUrl.replace(/\/+$/, "");
}

function isRating(value: unknown): value is Product["rating"] {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "rate" in value &&
    typeof value.rate === "number" &&
    value.rate >= 0 &&
    value.rate <= 5 &&
    "count" in value &&
    typeof value.count === "number" &&
    Number.isInteger(value.count) &&
    value.count >= 0
  );
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    Number.isInteger(value.id) &&
    value.id > 0 &&
    "title" in value &&
    typeof value.title === "string" &&
    "price" in value &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    "description" in value &&
    typeof value.description === "string" &&
    "category" in value &&
    typeof value.category === "string" &&
    "image" in value &&
    typeof value.image === "string" &&
    "rating" in value &&
    isRating(value.rating)
  );
}

export async function getProducts(sort: SortOrder = "asc"): Promise<Product[]> {
  const data = await fetcher(`${getApiUrl()}/products?sort=${sort}`);

  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new ApiError(
      "The store returned invalid products. Please try again.",
    );
  }

  return data;
}

export async function getProduct(id: number): Promise<Product | null> {
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  let data: unknown;

  try {
    data = await fetcher(`${getApiUrl()}/products/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }

  if (data === null) {
    return null;
  }

  if (!isProduct(data)) {
    throw new ApiError(
      "The store returned an invalid product. Please try again.",
    );
  }

  return data;
}

export async function getCategories(): Promise<string[]> {
  const data = await fetcher(`${getApiUrl()}/products/categories`);

  if (
    !Array.isArray(data) ||
    !data.every((value) => typeof value === "string")
  ) {
    throw new ApiError(
      "The store returned invalid categories. Please try again.",
    );
  }

  return data;
}
