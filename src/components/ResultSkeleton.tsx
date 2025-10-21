export default function ResultSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] w-full animate-pulse bg-slate-200/60" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200/60" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200/60" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200/60" />
      </div>
    </article>
  );
}
