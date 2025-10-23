interface ReviewsProps {
  id?: string;
  rating: number;
  count: number;
}

const reviewSamples = [
  'Ótima localização e anfitrião muito atencioso. Voltaremos com certeza!',
  'O apartamento estava impecável e superou nossas expectativas.',
  'Check-in simples, vizinhança tranquila e fácil acesso ao metrô.',
  'As fotos são fiéis. Espaço limpo, organizado e bem equipado.',
  'Wi-Fi rápido e cama super confortável. Recomendo!',
  'Adoramos a varanda e a vista. Perfeito para relaxar após o passeio.',
];

export const Reviews = ({ id, rating, count }: ReviewsProps) => {
  const visibleReviews = Array.from({ length: Math.min(6, count) }).map((_, index) => ({
    id: index,
    name: `Hóspede ${index + 1}`,
    date: 'Mar 2025',
    text: reviewSamples[index % reviewSamples.length],
  }));

  return (
    <section id={id} aria-labelledby="reviews-heading" className="pt-4">
      <h2 id="reviews-heading" className="text-lg font-semibold text-slate-900">
        Avaliações — ★ {rating.toFixed(2)}
      </h2>
      <p className="mt-1 text-sm text-slate-600">{count} avaliações de hóspedes recentes</p>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        {visibleReviews.map((review) => (
          <article
            key={review.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            aria-label={`Avaliação de ${review.name}`}
          >
            <header className="flex items-center justify-between">
              <span className="font-medium text-slate-900">{review.name}</span>
              <span className="text-sm text-slate-600">{review.date}</span>
            </header>
            <p className="mt-2 text-sm text-slate-700">{review.text}</p>
          </article>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 h-10 rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
      >
        Ver todas as avaliações
      </button>
    </section>
  );
};

export default Reviews;
