"use client";

import { ProductDetailsSkeleton } from "@/components/products/ProductDetailsSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface ProductErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ProductError({ retry }: ProductErrorProps) {
  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Product details</h1>
      <ErrorMessage
        title="Unable to display this product"
        message="Something went wrong. Please try again."
        onRetry={retry}
        pendingFallback={<ProductDetailsSkeleton />}
      />
    </>
  );
}
