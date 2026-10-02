"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export function LoginForm({ returnTo }: { returnTo: string }) {
  const { user, hasHydrated, login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, action, pending] = useActionState(
    async (_previous: { error: string | null }, data: FormData) => {
      try {
        const error = await login({
          username: String(data.get("username") ?? ""),
          password: String(data.get("password") ?? ""),
        });
        return { error };
      } catch {
        return { error: "Unable to log in. Please try again." };
      }
    },
    { error: null },
  );

  useEffect(() => {
    if (hasHydrated && user) router.replace(returnTo);
  }, [hasHydrated, user, returnTo, router]);

  const isBusy = !hasHydrated || pending || Boolean(user);

  return (
    <form action={action} className="mt-6 space-y-5">
      <div>
        <label htmlFor="username" className="mb-2 block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          disabled={isBusy}
          autoComplete="username"
          required
          maxLength={100}
          className="min-h-11 w-full rounded-md border border-slate-300 px-3"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isBusy}
          autoComplete="current-password"
          required
          maxLength={200}
          className="min-h-11 w-full rounded-md border border-slate-300 px-3"
        />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button
        disabled={isBusy}
        aria-busy={isBusy}
        type="submit"
        className="min-h-11 w-full rounded-md bg-slate-900 px-4 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {isBusy ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
