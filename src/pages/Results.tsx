import { useMemo, useState } from 'react';

import { EmptyState } from '../components/EmptyState';
import { Header } from '../components/Header';
import { PropertyCard, PropertyCardProps } from '../components/PropertyCard';
import { SearchCompact, SearchCompactPayload } from '../components/SearchCompact';
import { PropertyCardSkeleton } from '../components/Domain/Skeletons/Skeletons';

const mockResults: PropertyCardProps[] = [
  {
    title: 'Apartamento moderno no centro histórico',
    location: 'Lisboa, Portugal',
    rating: 4.8,
    pricePerNight: 540,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        alt: 'Sala de estar com decoração moderna',
      },
      {
        src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80',
        alt: 'Quarto iluminado com cama queen',
      },
    ],
    badge: 'Destaque',
  },
  {
    title: 'Casa pé na areia com deck privativo',
    location: 'Florianópolis, Brasil',
    rating: 4.9,
    pricePerNight: 920,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
        alt: 'Deck com vista para o mar',
      },
      {
        src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        alt: 'Sala ampla com janelas panorâmicas',
      },
    ],
  },
  {
    title: 'Cabana minimalista cercada pela natureza',
    location: 'Campos do Jordão, Brasil',
    rating: 4.7,
    pricePerNight: 610,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=800&q=80',
        alt: 'Cabana de madeira cercada por árvores',
      },
      {
        src: 'https://images.unsplash.com/photo-1600585154340-0ef3c08ef1d3?auto=format&fit=crop&w=800&q=80',
        alt: 'Sala aconchegante com lareira',
      },
    ],
  },
  {
    title: 'Studio criativo com espaço de coworking',
    location: 'Curitiba, Brasil',
    rating: 4.6,
    pricePerNight: 330,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
        alt: 'Studio com estações de trabalho',
      },
    ],
    badge: 'Pet-friendly',
  },
  {
    title: 'Loft iluminado com varanda panorâmica',
    location: 'São Paulo, Brasil',
    rating: 4.8,
    pricePerNight: 520,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80',
        alt: 'Sala com varanda ampla e vista da cidade',
      },
      {
        src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        alt: 'Cozinha planejada integrada à sala',
      },
    ],
  },
  {
    title: 'Penthouse com rooftop e jacuzzi',
    location: 'Buenos Aires, Argentina',
    rating: 5,
    pricePerNight: 1120,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=800&q=80',
        alt: 'Rooftop com jacuzzi iluminada à noite',
      },
      {
        src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        alt: 'Sala moderna minimalista com vista urbana',
      },
    ],
  },
  {
    title: 'Chalé sustentável com vista para o lago',
    location: 'Gramado, Brasil',
    rating: 4.8,
    pricePerNight: 680,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
        alt: 'Chalé com deck voltado para o lago',
      },
      {
        src: 'https://images.unsplash.com/photo-1468938351469-5f366f03b81b?auto=format&fit=crop&w=800&q=80',
        alt: 'Interior do chalé com decoração rústica',
      },
    ],
  },
  {
    title: 'Villa mediterrânea para famílias grandes',
    location: 'Porto, Portugal',
    rating: 4.9,
    pricePerNight: 990,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?auto=format&fit=crop&w=800&q=80',
        alt: 'Villa com piscina e área externa ampla',
      },
      {
        src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80',
        alt: 'Suíte principal com cama king',
      },
    ],
  },
];

const skeletonPlaceholders = Array.from({ length: 8 }, (_, index) => index);

export const Results = () => {
  const [searchSummary, setSearchSummary] = useState<SearchCompactPayload>();
  const isLoading = false;
  const results = mockResults;

  const handleSearch = (payload: SearchCompactPayload) => {
    setSearchSummary(payload);
    console.info('search_submit', payload);
  };

  const totalLabel = useMemo(() => {
    if (!results.length) {
      return 'Nenhum resultado disponível no momento';
    }

    if (results.length === 1) {
      return '1 estadia encontrada';
    }

    return `${results.length} estadias encontradas`;
  }, [results.length]);

  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text">
      <Header />

      <main className="pb-12">
        <section className="mx-auto max-w-7xl px-4 pb-4 pt-6 md:px-6">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Resultados</h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Ajuste os filtros ou explore as recomendações a seguir para encontrar sua próxima estadia.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
            <SearchCompact onSubmit={handleSearch} value={searchSummary} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-6 pt-6 md:px-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Estadias recomendadas</h2>
              <p className="text-sm text-slate-600">{totalLabel}</p>
            </div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Resultados simulados
            </div>
          </div>

          <div className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {skeletonPlaceholders.map((item) => (
                  <PropertyCardSkeleton key={`skeleton-${item}`} />
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((property) => (
                  <PropertyCard key={property.title} {...property} />
                ))}
              </div>
            ) : (
              <div className="py-10">
                <EmptyState
                  title="Não encontramos acomodações"
                  description="Tente ajustar as datas, destino ou número de hóspedes para ver mais opções."
                  ctaLabel="Limpar pesquisa"
                  onCta={() => console.info('empty_state_reset')}
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;
