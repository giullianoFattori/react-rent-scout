import { Button, Card, Stack, Text } from '../../Core';
import { RatingStars } from '../Ratings/RatingStars';

export interface ReviewItem {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface ReviewsProps {
  averageRating: number;
  totalReviews: number;
  items: ReviewItem[];
  onLoadMore?: () => void;
  onWriteReview?: () => void;
  canWriteReview?: boolean;
}

export const Reviews = ({
  averageRating,
  totalReviews,
  items,
  onLoadMore,
  onWriteReview,
  canWriteReview = false,
}: ReviewsProps) => {
  return (
    <section aria-labelledby="reviews-section">
      <Stack gap="sm">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <Text as="h2" id="reviews-section" size="lg" weight="semibold">
              Avaliações
            </Text>
            <RatingStars rating={averageRating} reviewsCount={totalReviews} />
          </div>
          {canWriteReview && (
            <Button type="button" variant="secondary" onClick={onWriteReview} data-evt="cta_click" data-ctx="reviews_write">
              Escrever avaliação
            </Button>
          )}
        </header>

        <Stack gap="sm" as="ul" className="list-none p-0">
          {items.map((review) => (
            <Card as="li" key={review.id} padding="md">
              <Stack gap="2xs">
                <div className="flex items-center justify-between">
                  <Text as="span" weight="semibold">
                    {review.author}
                  </Text>
                  <Text as="time" dateTime={review.date} size="sm" tone="muted">
                    {new Date(review.date).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                  </Text>
                </div>
                <RatingStars rating={review.rating} />
                <Text size="md">{review.comment}</Text>
              </Stack>
            </Card>
          ))}
        </Stack>

        {onLoadMore && (
          <Button
            type="button"
            variant="secondary"
            onClick={onLoadMore}
            data-evt="cta_click"
            data-ctx="reviews_load_more"
          >
            Ver mais avaliações
          </Button>
        )}
      </Stack>
    </section>
  );
};
