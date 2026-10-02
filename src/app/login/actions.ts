"use server";

import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/fetcher";
import type { LoginCredentials, LoginResult } from "@/types/auth";

export async function loginAction(
  credentials: LoginCredentials,
): Promise<LoginResult> {
  const { username, password } = credentials;
  if (
    typeof username !== "string" ||
    !username.trim() ||
    username.length > 100 ||
    typeof password !== "string" ||
    !password ||
    password.length > 200
  ) {
    return { user: null, error: "Enter a username and password." };
  }

  try {
    await login({ username: username.trim(), password });
    return { user: { username: username.trim() }, error: null };
  } catch (error) {
    return {
      user: null,
      error:
        error instanceof ApiError && error.status === 401
          ? "Incorrect username or password."
          : "Login is temporarily unavailable. Please try again in a moment.",
    };
  }
}
