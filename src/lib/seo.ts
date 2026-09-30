import type { Product } from "@/types/product";

export function getSiteUrl(): URL {
  const url = new URL(process.env.SITE_URL?.trim() || "http://localhost:3000");

  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password
  ) {
    throw new Error(
      "SITE_URL must be an HTTP or HTTPS URL without credentials.",
    );
  }

  return new URL(url.origin);
}

export function getProductJsonLd(product: Product) {
  const url = new URL(`/products/${product.id}`, getSiteUrl()).href;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.title,
    description: product.description,
    image: product.image,
    category: product.category,
    url,
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "USD",
    },
    ...(product.rating.count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.rate,
        ratingCount: product.rating.count,
        bestRating: 5,
        worstRating: 0,
      },
    }),
  };
}
