"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createStore, useStore } from "zustand";
import { loginAction } from "@/app/login/actions";
import type { AuthUser, LoginCredentials } from "@/types/auth";

const storageKey = "ecommerce-auth";

function createAuthStore() {
  return createStore<{
    user: AuthUser | null;
    hasHydrated: boolean;
    storageError: string | null;
    login: (credentials: LoginCredentials) => Promise<string | null>;
    logout: () => void;
  }>()((set) => ({
    user: null,
    hasHydrated: false,
    storageError: null,
    login: async (credentials) => {
      const result = await loginAction(credentials);
      if (result.error !== null) return result.error;
      let storageError: string | null = null;
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(result.user));
      } catch {
        storageError =
          "Login works for this visit, but cannot be saved for a reload.";
      }
      set({ user: result.user, storageError });
      return null;
    },
    logout: () => {
      try {
        sessionStorage.removeItem(storageKey);
        set({ user: null, storageError: null });
      } catch {
        set({
          user: null,
          storageError:
            "Logged out here, but saved login could not be cleared. Clear this site's browser storage before reloading.",
        });
      }
    },
  }));
}

const AuthContext = createContext<ReturnType<typeof createAuthStore> | null>(
  null,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createAuthStore);
  useEffect(() => {
    let user: AuthUser | null = null;
    try {
      const saved: unknown = JSON.parse(
        sessionStorage.getItem(storageKey) ?? "null",
      );
      if (
        typeof saved === "object" &&
        saved !== null &&
        "username" in saved &&
        typeof saved.username === "string" &&
        saved.username.trim() &&
        saved.username.length <= 100
      ) {
        user = { username: saved.username };
      }
    } catch {
      // let it be...
    }
    store.setState({ user, hasHydrated: true });
  }, [store]);
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const store = useContext(AuthContext);
  if (!store) throw new Error("Auth components must be inside AuthProvider.");
  return useStore(store);
}
