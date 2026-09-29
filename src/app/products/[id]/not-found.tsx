export default function ProductNotFound() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">Product not found</h1>
      <p className="mt-3 text-sm text-slate-600">
        This product could not be found. Select Products above to browse available items.
      </p>
    </div>
  );
}
