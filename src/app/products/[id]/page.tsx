import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductDetailsSkeleton } from "@/components/products/ProductDetailsSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ApiError } from "@/lib/api/fetcher";
import { getProduct } from "@/lib/api/products";
import type { Product } from "@/types/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(productId)) {
    notFound();
  }

  let product: Product | null;

  try {
    product = await getProduct(productId);
  } catch (error) {
    if (!(error instanceof ApiError)) {
      throw error;
    }

    console.warn("Product details request failed", {
      productId,
      status: error.status,
    });

    return (
      <>
        <h1 className="mb-8 text-3xl font-semibold tracking-tight">
          Product details
        </h1>
        <ErrorMessage
          title="Product details are temporarily unavailable"
          message="We couldn't load this product. Please try again in a moment."
          pendingFallback={<ProductDetailsSkeleton />}
        />
      </>
    );
  }

  if (product === null) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
