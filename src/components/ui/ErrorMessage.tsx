"use client";

import { useRouter } from "next/navigation";
import { useTransition, type ReactNode } from "react";

interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
  pendingFallback?: ReactNode;
}

export function ErrorMessage({
  title,
  message,
  onRetry,
  pendingFallback,
}: ErrorMessageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRetry() {
    startTransition(() => {
      if (onRetry) {
        onRetry();
      } else {
        router.refresh();
      }
    });
  }

  if (isPending && pendingFallback) {
    return pendingFallback;
  }

  return (
    <div
      role="alert"
      className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
      <button
        type="button"
        onClick={handleRetry}
        disabled={isPending}
        aria-busy={isPending}
        className="mt-6 min-h-11 rounded-md bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
      >
        {isPending ? "Trying again..." : "Try again"}
      </button>
    </div>
  );
}
