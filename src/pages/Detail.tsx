import { Header } from '../components/Header';
import AmenitiesPreview from '../components/AmenitiesPreview';
import BookingWidget from '../components/BookingWidget';
import GalleryGrid from '../components/GalleryGrid';
import Reviews from '../components/Reviews';

type Stay = {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  images: string[];
  amenities: string[];
  description: string;
  rules: string[];
  cancelation: string;
  coords?: { lat: number; lng: number };
};

const stay: Stay = {
  id: 1,
  title: 'Apartamento moderno perto da praia',
  location: 'Copacabana, Rio de Janeiro',
  rating: 4.84,
  reviewsCount: 128,
  pricePerNight: 520,
  guests: 4,
  bedrooms: 2,
  beds: 3,
  baths: 2,
  images: [
    'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505692794403-34d4982c1e39?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-0ef3c08ef1d3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590490359854-dfba19688d87?auto=format&fit=crop&w=1200&q=80',
  ],
  amenities: [
    'Wi-Fi veloz',
    'Cozinha completa',
    'Ar-condicionado',
    'Estacionamento gratuito',
    'Máquina de lavar',
    'Pet-friendly',
    'Varanda com vista',
    'Smart TV com streaming',
  ],
  description:
    'Espaço renovado e luminoso, a poucos passos da praia de Copacabana. Localização privilegiada com cafés, restaurantes e mercados por perto. Ideal para famílias ou grupos que buscam conforto e praticidade durante a estadia.\n\nA cozinha é totalmente equipada e conta com eletrodomésticos modernos. Internet rápida para trabalho remoto, ar-condicionado em todos os cômodos e uma varanda com vista parcial para o mar.',
  rules: ['Proibido fumar', 'Sem festas ou eventos', 'Horário silencioso após 22h'],
  cancelation: 'Cancelamento gratuito até 5 dias antes do check-in. Após esse período, aplica-se taxa de 50% do valor total.',
  coords: { lat: -22.971177, lng: -43.182543 },
};

const ActionButton = ({ children }: { children: string }) => (
  <button
    type="button"
    className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
  >
    {children}
  </button>
);

const Detail = () => {
  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text">
      <Header />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">{stay.title}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span>★ {stay.rating.toFixed(2)}</span>
              <span aria-hidden="true">·</span>
              <a
                href="#reviews"
                className="underline decoration-slate-400 underline-offset-2 transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
              >
                {stay.reviewsCount} avaliações
              </a>
              <span aria-hidden="true">·</span>
              <span>{stay.location}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ActionButton>Compartilhar</ActionButton>
            <ActionButton>Salvar</ActionButton>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <GalleryGrid images={stay.images} />
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 gap-8 px-4 py-6 md:px-6 lg:grid-cols-[1.6fr,0.9fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
            <span>{stay.guests} hóspedes</span>
            <span aria-hidden="true">·</span>
            <span>{stay.bedrooms} quartos</span>
            <span aria-hidden="true">·</span>
            <span>{stay.beds} camas</span>
            <span aria-hidden="true">·</span>
            <span>{stay.baths} banheiros</span>
          </div>

          <AmenitiesPreview items={stay.amenities} />

          <article className="prose prose-slate max-w-none text-slate-700">
            {stay.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section aria-labelledby="house-rules-heading">
              <h2 id="house-rules-heading" className="text-lg font-semibold text-slate-900">
                Regras da casa
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {stay.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="cancelation-heading">
              <h2 id="cancelation-heading" className="text-lg font-semibold text-slate-900">
                Cancelamento
              </h2>
              <p className="mt-2 text-sm text-slate-700">{stay.cancelation}</p>
            </section>
          </div>

          <section
            aria-label={`Mapa próximo a ${stay.location}`}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div
              role="img"
              aria-label={`Mapa ilustrativo da região de ${stay.location}`}
              className="flex h-64 items-center justify-center bg-gradient-to-br from-teal-100 via-slate-100 to-slate-200 text-sm font-medium text-slate-500 md:h-80"
            >
              Vista do bairro (mapa placeholder)
            </div>
          </section>

          <Reviews id="reviews" rating={stay.rating} count={stay.reviewsCount} />
        </div>

        <aside className="h-max lg:sticky lg:top-24">
          <BookingWidget
            pricePerNight={stay.pricePerNight}
            rating={stay.rating}
            reviewsCount={stay.reviewsCount}
            minNights={2}
            cleaningFee={80}
            serviceFeeRate={0.12}
            blockedDates={['24/12/2025', '25/12/2025', '31/12/2025', '01/01/2026']}
          />
        </aside>
      </section>
    </div>
  );
};

export default Detail;
