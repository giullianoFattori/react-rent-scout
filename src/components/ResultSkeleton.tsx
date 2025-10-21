export default function ResultSkeleton() {
  return (
    <article className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="w-full aspect-[4/3] bg-slate-200/60 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-2/3 bg-slate-200/70 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-slate-200/70 rounded animate-pulse" />
        <div className="h-4 w-1/3 bg-slate-200/70 rounded animate-pulse" />
      </div>
    </article>
  );
}
