import { useMemo, useState } from 'react';
import RatingBreakdown from './RatingBreakdown';
import ReviewFormModal from './ReviewFormModal';
import ReviewItem from './ReviewItem';
import type { Review } from './Reviews.types';

interface ReviewsProps {
  id?: string;
  rating: number;
  count: number;
}

const PAGE_SIZE = 6;

type SortKey = 'recent' | 'best' | 'worst';

const sortLabels: Record<SortKey, string> = {
  recent: 'Mais recentes',
  best: 'Melhor avaliadas',
  worst: 'Pior avaliadas',
};

export const Reviews = ({ id, rating, count }: ReviewsProps) => {
  const initial = useMemo<Review[]>(
    () =>
      Array.from({ length: Math.max(12, count) }).map((_, index) => ({
        id: index,
        name: `Hóspede ${index + 1}`,
        dateISO: new Date(2025, index % 12, 1 + (index % 27)).toISOString(),
        rating: (5 - (index % 5)) as 1 | 2 | 3 | 4 | 5,
        text: 'Ótima localização e anfitrião atencioso. Voltaria com certeza.',
        helpful: Math.floor(Math.random() * 10),
      })),
    [count],
  );

  const [reviews, setReviews] = useState<Review[]>(initial);
  const [sort, setSort] = useState<SortKey>('recent');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breakdown = useMemo(
    () => {
      const buckets = new Map<number, number>();
      [1, 2, 3, 4, 5].forEach((score) => buckets.set(score, 0));
      reviews.forEach((review) => {
        const current = buckets.get(review.rating) ?? 0;
        buckets.set(review.rating, current + 1);
      });

      return [1, 2, 3, 4, 5].map((score) => ({
        rating: score as 1 | 2 | 3 | 4 | 5,
        count: buckets.get(score) ?? 0,
      }));
    },
    [reviews],
  );

  const sorted = useMemo(() => {
    const list = [...reviews];

    switch (sort) {
      case 'best':
        return list.sort((a, b) => b.rating - a.rating || b.helpful - a.helpful);
      case 'worst':
        return list.sort((a, b) => a.rating - b.rating || b.helpful - a.helpful);
      default:
        return list.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
    }
  }, [reviews, sort]);

  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  function handleSubmit(review: Review) {
    setReviews((prev) => [review, ...prev]);
    setSort('recent');
    setPage(1);
  }

  function handleLoadMore() {
    setPage((prev) => prev + 1);
  }

  return (
    <section id={id} aria-labelledby="reviews-heading" className="pt-4">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="reviews-heading" className="text-lg font-semibold text-slate-900">
          Avaliações — ★ {rating.toFixed(2)}
        </h2>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="h-9 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
        >
          Escrever avaliação
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        <RatingBreakdown items={breakdown} />
        <div className="flex items-center justify-start gap-2 md:justify-end">
          <label htmlFor="reviews-sort" className="text-sm text-slate-600">
            Ordenar por
          </label>
          <select
            id="reviews-sort"
            className="h-9 rounded-lg border border-slate-300 px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((review) => (
          <ReviewItem key={review.id} r={review} />
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        {hasMore ? (
          <button
            type="button"
            onClick={handleLoadMore}
            className="h-10 rounded-lg bg-teal-600 px-4 text-sm font-medium text-white transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            Carregar mais
          </button>
        ) : null}
      </div>

      <ReviewFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </section>
  );
};

export default Reviews;
