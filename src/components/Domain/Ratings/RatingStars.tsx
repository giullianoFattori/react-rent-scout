import { StarIcon, Text } from '../../Core';

export interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
}

export const RatingStars = ({ rating, reviewsCount }: RatingStarsProps) => {
  const normalized = Math.min(Math.max(rating, 0), 5);
  const fullStars = Math.floor(normalized);
  const hasHalfStar = normalized - fullStars >= 0.25 && normalized - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2" aria-label={`Nota ${normalized.toFixed(1)} de 5`}>
      <div className="flex items-center gap-1 text-accent-500">
        {Array.from({ length: fullStars }).map((_, index) => (
          <StarIcon key={`full-${index}`} className="h-4 w-4" />
        ))}
        {hasHalfStar && (
          <div className="relative h-4 w-4">
            <StarIcon className="absolute inset-0 h-4 w-4 text-accent-500" style={{ clipPath: 'inset(0 50% 0 0)' }} />
            <StarIcon className="h-4 w-4 text-neutral-300" />
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <StarIcon key={`empty-${index}`} className="h-4 w-4 text-neutral-300" />
        ))}
      </div>
      <Text as="span" size="sm" tone="secondary">
        {normalized.toFixed(1)} {reviewsCount ? `(${reviewsCount})` : ''}
      </Text>
    </div>
  );
};
