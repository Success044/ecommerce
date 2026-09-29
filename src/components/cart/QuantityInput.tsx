"use client";

import { useId, useState } from "react";
import { isValidQuantity } from "@/lib/cart";

interface QuantityInputProps {
  value: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

export function QuantityInput({ value, onChange, disabled = false }: QuantityInputProps) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const isInvalid = draft !== null && !isValidQuantity(Number(draft));

  function handleStep(quantity: number) {
    setDraft(null);
    onChange(quantity);
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">Quantity</label>
      <div className="inline-flex items-center rounded-md border border-slate-300 bg-white">
        <button type="button" aria-label="Decrease quantity" disabled={disabled || value <= 1} onClick={() => handleStep(value - 1)} className="min-h-11 min-w-11 rounded-l-md text-lg hover:bg-slate-100 disabled:opacity-40">−</button>
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
          className="min-h-11 w-16 border-x border-slate-300 text-center text-sm"
        />
        <button type="button" aria-label="Increase quantity" disabled={disabled || !isValidQuantity(value + 1)} onClick={() => handleStep(value + 1)} className="min-h-11 min-w-11 rounded-r-md text-lg hover:bg-slate-100 disabled:opacity-40">+</button>
      </div>
      {isInvalid && <p id={`${id}-error`} className="mt-1 text-sm text-red-700">Enter a whole number of at least 1.</p>}
    </div>
  );
}
