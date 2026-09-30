import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductDetailsSkeleton } from "@/components/products/ProductDetailsSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ApiError } from "@/lib/api/fetcher";
import { getProduct } from "@/lib/api/products";
import { getProductJsonLd } from "@/lib/seo";
import type { Product } from "@/types/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const getPageProduct = cache(async (id: string) => {
  const productId = Number(id);

  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(productId)) {
    return null;
  }

  return getProduct(productId);
});

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  let product: Product | null;

  try {
    product = await getPageProduct(id);
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;

    return {
      title: "Product unavailable",
      robots: { index: false, follow: true },
    };
  }

  if (!product) {
    return {
      title: "Product not found",
      robots: { index: false, follow: true },
    };
  }

  const description = product.description.replace(/\s+/g, " ").trim().slice(0, 160);
  const url = `/products/${product.id}`;

  return {
    title: product.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: product.title,
      description,
      url,
      siteName: "Store",
      type: "website",
      images: [{ url: product.image, alt: product.title }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  let product: Product | null;

  try {
    product = await getPageProduct(id);
  } catch (error) {
    if (!(error instanceof ApiError)) {
      throw error;
    }

    console.warn("Product details request failed", {
      productId: Number(id),
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProductJsonLd(product)).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetails product={product} />
    </>
  );
}
