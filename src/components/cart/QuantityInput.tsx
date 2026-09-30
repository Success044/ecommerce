"use client";

import { useId, useState } from "react";
import { isValidQuantity } from "@/lib/cart";

interface QuantityInputProps {
  value: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

export function QuantityInput({
  value,
  onChange,
  disabled = false,
}: QuantityInputProps) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const isInvalid = draft !== null && !isValidQuantity(Number(draft));

  function handleStep(quantity: number) {
    setDraft(null);
    onChange(quantity);
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-slate-600">
          Quantity
        </label>
        <div className="inline-flex shrink-0 items-center rounded-md border border-slate-200 bg-slate-50">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={disabled || value <= 1}
            onClick={() => handleStep(value - 1)}
            className="min-h-11 w-11 rounded-l-md text-lg text-slate-700 enabled:hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-35"
          >
            −
          </button>
          <input
            id={id}
            name="quantity"
            type="number"
            min="1"
            step="1"
            required
            value={draft ?? value}
            disabled={disabled}
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? `${id}-error` : undefined}
            onChange={(event) => {
              const next = event.target.value;
              setDraft(next);
              const quantity = Number(next);
              if (isValidQuantity(quantity)) onChange(quantity);
            }}
            onBlur={() => setDraft(null)}
            className="min-h-11 w-11 bg-transparent text-center text-sm font-semibold text-slate-900 tabular-nums [appearance:textfield] disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={disabled || !isValidQuantity(value + 1)}
            onClick={() => handleStep(value + 1)}
            className="min-h-11 w-11 rounded-r-md text-lg text-slate-700 enabled:hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-35"
          >
            +
          </button>
        </div>
      </div>
      {isInvalid && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
          Enter a whole number of at least 1.
        </p>
      )}
    </div>
  );
}
