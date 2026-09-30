"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { Skeleton } from "@/components/ui/Skeleton";

export function AuthButton() {
  const { user, hasHydrated, logout, storageError } = useAuth();
  const router = useRouter();
  if (!hasHydrated)
    return (
      <div role="status">
        <Skeleton className="h-11 w-20" />
      </div>
    );
  return (
    <>
      {user ? (
        <button
          type="button"
          onClick={() => {
            logout();
            router.replace("/products");
          }}
          className="min-h-11 rounded-md px-3 text-sm font-medium hover:bg-slate-100"
        >
          Log out
        </button>
      ) : (
        <Link
          href="/login"
          className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100"
        >
          Log in
        </Link>
      )}
      {storageError && (
        <p role="status" className="max-w-xs text-sm text-amber-800">
          {storageError}
        </p>
      )}
    </>
  );
}
