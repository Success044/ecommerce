import type { SortOrder } from "@/types/product";
import type { FormEvent } from "react";

interface ProductSortProps {
  sort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  disabled: boolean;
}

export function ProductSort({ sort, onSortChange, disabled }: ProductSortProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selectedSort = new FormData(event.currentTarget).get("sort");
    onSortChange(selectedSort === "desc" ? "desc" : "asc");
  }

  return (
    <form action="/products" onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
      <label htmlFor="product-sort" className="text-sm font-medium text-slate-700">
        Sort by
      </label>
      <select
        key={sort}
        id="product-sort"
        name="sort"
        defaultValue={sort}
        disabled={disabled}
        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm"
      >
        <option value="asc">Product ID: ascending</option>
        <option value="desc">Product ID: descending</option>
      </select>
      <button
        type="submit"
        disabled={disabled}
        className="min-h-11 rounded-md bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-700"
      >
        Apply
      </button>
    </form>
  );
}
