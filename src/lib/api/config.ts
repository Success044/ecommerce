import { ApiError } from "./fetcher";

export function getApiUrl(): string {
  const url = process.env.FAKE_STORE_API_URL?.trim();
  if (!url) throw new ApiError("The store is not configured. Please try again later.");
  return url.replace(/\/+$/, "");
}
