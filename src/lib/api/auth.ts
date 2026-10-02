import type { LoginCredentials } from "@/types/auth";
import { getApiUrl } from "./config";
import { ApiError, fetcher } from "./fetcher";

export async function login(credentials: LoginCredentials): Promise<string> {
  const data = await fetcher(`${getApiUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (
    typeof data !== "object" ||
    data === null ||
    !("token" in data) ||
    typeof data.token !== "string" ||
    !data.token.trim() ||
    data.token.length > 2048
  ) {
    throw new ApiError("The store returned an invalid login response.");
  }
  return data.token;
}
