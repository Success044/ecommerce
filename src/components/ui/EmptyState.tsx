interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
    </div>
  );
}
