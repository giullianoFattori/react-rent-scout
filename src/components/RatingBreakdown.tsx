export default function RatingBreakdown({
  items,
}: { items: { rating: 1 | 2 | 3 | 4 | 5; count: number }[] }) {
  const total = items.reduce((acc, item) => acc + item.count, 0) || 1;

  const Row = ({ label, count }: { label: number; count: number }) => {
    const pct = Math.round((count / total) * 100);

    return (
      <div className="flex items-center gap-3">
        <span className="w-6 text-sm text-slate-700">{label}★</span>
        <div className="flex-1 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-teal-600"
            style={{ width: `${pct}%` }}
            aria-hidden
          />
        </div>
        <span className="w-10 text-right text-sm text-slate-600">{pct}%</span>
      </div>
    );
  };

  const map = new Map<number, number>();
  items.forEach((item) => {
    map.set(item.rating, item.count);
  });

  return (
    <div className="space-y-2" aria-label="Distribuição de notas">
      {[5, 4, 3, 2, 1].map((rating) => (
        <Row key={rating} label={rating} count={map.get(rating) || 0} />
      ))}
    </div>
  );
}
