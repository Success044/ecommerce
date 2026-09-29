export function ProductDetailsSkeleton() {
  return (
    <div>
      <p role="status" className="mb-6 text-sm text-slate-600">
        Loading product details...
      </p>
      <div
        aria-busy="true"
        className="grid gap-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-8 lg:grid-cols-2 lg:gap-12"
      >
        <div
          aria-hidden="true"
          className="h-72 rounded-md bg-slate-100 motion-safe:animate-pulse sm:h-96 lg:h-[28rem]"
        />
        <div aria-hidden="true" className="motion-safe:animate-pulse">
          <div className="h-16 w-full rounded bg-slate-200" />
          <div className="mt-6 h-9 w-28 rounded bg-slate-200" />
          <div className="mt-8 h-32 w-full rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
