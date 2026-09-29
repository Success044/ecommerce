import type { SortOrder } from "@/types/product";

interface ProductSortProps {
  sort: SortOrder;
}

export function ProductSort({ sort }: ProductSortProps) {
  return (
    <form action="/products" className="flex flex-wrap items-center gap-3">
      <label htmlFor="product-sort" className="text-sm font-medium text-slate-700">
        Sort by
      </label>
      <select
        id="product-sort"
        name="sort"
        defaultValue={sort}
        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm"
      >
        <option value="asc">Product ID: ascending</option>
        <option value="desc">Product ID: descending</option>
      </select>
      <button
        type="submit"
        className="min-h-11 rounded-md bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-700"
      >
        Apply
      </button>
    </form>
  );
}
