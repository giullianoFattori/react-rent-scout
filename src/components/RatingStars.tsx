interface RatingStarsProps {
  value: number;
  labelledBy?: string;
}

export const RatingStars = ({ value, labelledBy }: RatingStarsProps) => {
  const normalized = Math.min(Math.max(value, 0), 5);
  const rounded = Math.round(normalized * 2) / 2;

  return (
    <div
      className="flex items-center gap-1 text-sm text-slate-600"
      role="img"
      aria-label={`Avaliação ${rounded.toFixed(1)} de 5`}
      aria-labelledby={labelledBy}
    >
      <span aria-hidden="true" className="text-base text-amber-500">
        ★
      </span>
      <span className="font-medium text-slate-900">{rounded.toFixed(1)}</span>
      <span className="sr-only">de 5</span>
    </div>
  );
};
