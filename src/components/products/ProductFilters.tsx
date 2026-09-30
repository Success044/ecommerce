import type { ProductFilterValues } from "@/types/product";

interface ProductFiltersProps {
  filters: ProductFilterValues;
  categories: string[];
  priceError: string | null;
  disabled: boolean;
  onChange: (filters: ProductFilterValues) => void;
  onBlur: () => void;
  onReset: () => void;
}

export function ProductFilters({
  filters,
  categories,
  priceError,
  disabled,
  onChange,
  onBlur,
  onReset,
}: ProductFiltersProps) {
  return (
    <fieldset
      disabled={disabled}
      onBlur={onBlur}
      className="mb-6 rounded-xl border border-slate-200 bg-white p-5"
    >
      <legend className="sr-only">Filter products</legend>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-medium"
          >
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            value={filters.search}
            onChange={(event) =>
              onChange({ ...filters, search: event.target.value })
            }
            placeholder="Search by name"
            className="min-h-11 w-full rounded-md border border-slate-300 px-3 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="product-category"
            className="mb-2 block text-sm font-medium"
          >
            Category
          </label>
          <select
            id="product-category"
            value={filters.category}
            onChange={(event) =>
              onChange({ ...filters, category: event.target.value })
            }
            className="min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="">All categories</option>
            {filters.category && !categories.includes(filters.category) && (
              <option value={filters.category}>{filters.category}</option>
            )}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="minimum-price"
            className="mb-2 block text-sm font-medium"
          >
            Minimum price ($)
          </label>
          <input
            id="minimum-price"
            type="number"
            min="0"
            step="0.01"
            value={filters.minPrice}
            onChange={(event) =>
              onChange({ ...filters, minPrice: event.target.value })
            }
            aria-invalid={Boolean(priceError)}
            aria-describedby={priceError ? "price-range-error" : undefined}
            placeholder="No minimum"
            className="min-h-11 w-full rounded-md border border-slate-300 px-3 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="maximum-price"
            className="mb-2 block text-sm font-medium"
          >
            Maximum price ($)
          </label>
          <input
            id="maximum-price"
            type="number"
            min="0"
            step="0.01"
            value={filters.maxPrice}
            onChange={(event) =>
              onChange({ ...filters, maxPrice: event.target.value })
            }
            aria-invalid={Boolean(priceError)}
            aria-describedby={priceError ? "price-range-error" : undefined}
            placeholder="No maximum"
            className="min-h-11 w-full rounded-md border border-slate-300 px-3 text-sm"
          />
        </div>
      </div>
      {priceError && (
        <p
          id="price-range-error"
          role="alert"
          className="mt-3 text-sm text-red-700"
        >
          {priceError}
        </p>
      )}
      <button
        type="button"
        onClick={onReset}
        className="mt-3 min-h-11 rounded-md text-sm font-medium text-slate-600 underline hover:text-slate-900"
      >
        Reset filters
      </button>
    </fieldset>
  );
}
