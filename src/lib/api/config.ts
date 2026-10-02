export function getApiUrl(): string {
  const url =
    process.env.FAKE_STORE_API_URL?.trim() || "https://fakestoreapi.com";
  return url.replace(/\/+$/, "");
}
