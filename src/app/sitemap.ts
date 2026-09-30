import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api/products";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const siteUrl = getSiteUrl();

  return [
    { url: new URL("/products", siteUrl).href },
    ...products.map((product) => ({
      url: new URL(`/products/${product.id}`, siteUrl).href,
    })),
  ];
}
