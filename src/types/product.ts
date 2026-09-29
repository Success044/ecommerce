export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export type SortOrder = "asc" | "desc";

export interface ProductFilterValues {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}
