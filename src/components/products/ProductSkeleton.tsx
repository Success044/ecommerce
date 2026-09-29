export function ProductSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-slate-200 bg-white p-5 motion-safe:animate-pulse"
    >
      <div className="mb-5 h-48 rounded-md bg-slate-100" />
      <div className="mb-3 h-3 w-24 rounded bg-slate-200" />
      <div className="mb-2 h-4 w-full rounded bg-slate-200" />
      <div className="mb-6 h-4 w-2/3 rounded bg-slate-200" />
      <div className="h-6 w-20 rounded bg-slate-200" />
    </div>
  );
}
