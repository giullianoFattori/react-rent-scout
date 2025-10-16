interface RatingStarsProps {
  value: number;
  labelledBy?: string;
}

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={`h-4 w-4 ${filled ? 'text-teal-600' : 'text-slate-300'}`}
    focusable="false"
  >
    <path
      d="M12 3.5 14.6 9l5.9.4-4.5 3.8 1.5 5.7L12 15.9l-5.5 3 1.5-5.7-4.5-3.8 5.9-.4z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

export const RatingStars = ({ value, labelledBy }: RatingStarsProps) => {
  const normalized = Math.min(Math.max(value, 0), 5);
  const rounded = Math.round(normalized * 2) / 2;

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Avaliação ${rounded.toFixed(1)} de 5`}
      aria-labelledby={labelledBy}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1;
        const filled = rounded >= starIndex;
        const half = !filled && rounded + 0.5 >= starIndex;
        if (half) {
          return (
            <div key={starIndex} className="relative flex h-4 w-4">
              <Star filled={false} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                <Star filled />
              </div>
            </div>
          );
        }
        return <Star key={starIndex} filled={filled} />;
      })}
      <span className="text-sm font-medium text-slate-700">{rounded.toFixed(1)}</span>
    </div>
  );
};
