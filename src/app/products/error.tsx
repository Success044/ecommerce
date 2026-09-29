"use client";

import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";

interface ProductsErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ProductsError({ retry }: ProductsErrorProps) {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
    >
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Products</h1>
      <ErrorMessage
        title="Unable to load products"
        message="We couldn't load the catalog. Please try again."
        onRetry={retry}
        pendingFallback={<ProductGridSkeleton />}
      />
    </main>
  );
}
