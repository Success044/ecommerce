import { Skeleton } from "@/components/ui/Skeleton";

export function CartSkeleton() {
  return (
    <div role="status">
      <div
        aria-hidden="true"
        className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]"
      >
        <div className="space-y-4">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row"
            >
              <Skeleton className="h-24 w-24 shrink-0" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-24" />
                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <Skeleton className="mb-2 h-5 w-16" />
                    <Skeleton className="h-11 w-40" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="mt-1 h-11 w-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <Skeleton className="h-7 w-36" />
          <Skeleton className="mt-3 h-5 w-20" />
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>
      </div>
      <Skeleton className="mt-6 h-11 w-36" />
    </div>
  );
}
