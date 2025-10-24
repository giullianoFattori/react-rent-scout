import { useState } from 'react';
import { Header } from '../components/Header';
import AmenityDrawer from '../components/AmenityDrawer';
import AmenitiesPreview from '../components/AmenitiesPreview';
import BookingWidget from '../components/BookingWidget';
import GalleryGrid from '../components/GalleryGrid';
import Policies from '../components/Policies';
import Reviews from '../components/Reviews';
import type { AmenityCategory, Policies as PoliciesType } from '../components/Amenities.types';

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

const amenityCategories: AmenityCategory[] = [
  {
    id: 'basic',
    name: 'Básico',
    items: [
      { key: 'wifi', label: 'Wi-Fi veloz', available: true },
      { key: 'ac', label: 'Ar-condicionado', available: true },
      { key: 'heating', label: 'Aquecimento central', available: false },
      { key: 'tv', label: 'Smart TV com streaming', available: true },
    ],
  },
  {
    id: 'kitchen',
    name: 'Cozinha',
    items: [
      { key: 'kitchen', label: 'Cozinha completa', available: true },
      { key: 'stove', label: 'Fogão', available: true },
      { key: 'oven', label: 'Forno', available: true },
      { key: 'dishwasher', label: 'Lava-louças', available: false },
    ],
  },
  {
    id: 'workspace',
    name: 'Área de trabalho',
    items: [
      { key: 'desk', label: 'Mesa dedicada', available: true },
      { key: 'monitor', label: 'Monitor extra', available: false },
    ],
  },
  {
    id: 'safety',
    name: 'Segurança',
    items: [
      { key: 'camera', label: 'Câmeras de segurança externas', available: true },
      { key: 'alarm', label: 'Sistema de alarme', available: false },
      { key: 'extinguisher', label: 'Extintor de incêndio', available: true },
    ],
  },
  {
    id: 'accessibility',
    name: 'Acessibilidade',
    items: [
      { key: 'elevator', label: 'Elevador', available: true },
      { key: 'step-free', label: 'Acesso sem degraus', available: false },
    ],
  },
  {
    id: 'parking',
    name: 'Estacionamento',
    items: [
      { key: 'garage', label: 'Vaga na garagem', available: true },
      { key: 'street', label: 'Estacionamento na rua', available: true },
    ],
  },
  {
    id: 'pets',
    name: 'Pet-friendly',
    items: [
      { key: 'pets', label: 'Pets permitidos', available: true },
      { key: 'pet-fee', label: 'Taxa para pets', available: false },
    ],
  },
];

const policies: PoliciesType = {
  checkin: 'Após 15:00',
  checkout: 'Até 11:00',
  smoking: false,
  parties: false,
  quietHours: '22:00–08:00',
  pets: 'sob consulta',
  cancelation: 'Gratuito até 5 dias antes',
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
  const [openAmenities, setOpenAmenities] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text">
      <Header />

      <section className="max-w-7xl mx-auto px-4 py-4 md:px-6">
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

          <AmenitiesPreview items={stay.amenities} onViewAll={() => setOpenAmenities(true)} />

          <article className="prose prose-slate max-w-none text-slate-700">
            {stay.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          <section aria-labelledby="policies-heading">
            <h2 id="policies-heading" className="sr-only">
              Políticas e regras
            </h2>
            <Policies p={policies} />
          </section>

          <section aria-labelledby="house-rules-heading">
            <h2 id="house-rules-heading" className="text-lg font-semibold text-slate-900">
              Regras adicionais da casa
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {stay.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>

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

      <AmenityDrawer open={openAmenities} onClose={() => setOpenAmenities(false)} cats={amenityCategories} />
    </div>
  );
};

export default Detail;
