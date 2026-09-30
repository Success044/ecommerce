export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-lg bg-slate-200 motion-safe:animate-pulse ${className}`}
    />
  );
}
