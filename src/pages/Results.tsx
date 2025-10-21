import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { EmptyState } from '../components/EmptyState';
import { Header } from '../components/Header';
import { PropertyCard, PropertyCardProps } from '../components/PropertyCard';
import { SearchCompact, SearchCompactPayload } from '../components/SearchCompact';
import { FiltersBar, Filters, initialFilters } from '../components/FiltersBar';
import ResultSkeleton from '../components/ResultSkeleton';
import SortBar, { type SortKey } from '../components/SortBar';

type FilterableProperty = PropertyCardProps & {
  propertyType: 'Casa' | 'Apartamento' | 'Cabana' | 'Studio';
  amenities: { wifi?: boolean; cozinha?: boolean; estacionamento?: boolean };
  petFriendly: boolean;
  cancelation: 'flex' | 'mod' | 'rig';
};

const mockResults: FilterableProperty[] = [
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
    propertyType: 'Apartamento',
    amenities: { wifi: true, cozinha: true },
    petFriendly: false,
    cancelation: 'flex',
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
    propertyType: 'Casa',
    amenities: { wifi: true, estacionamento: true },
    petFriendly: true,
    cancelation: 'mod',
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
    propertyType: 'Cabana',
    amenities: { estacionamento: true },
    petFriendly: false,
    cancelation: 'rig',
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
    propertyType: 'Studio',
    amenities: { wifi: true },
    petFriendly: true,
    cancelation: 'flex',
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
    propertyType: 'Apartamento',
    amenities: { wifi: true, cozinha: true },
    petFriendly: false,
    cancelation: 'mod',
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
    propertyType: 'Apartamento',
    amenities: { wifi: true },
    petFriendly: false,
    cancelation: 'rig',
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
    propertyType: 'Casa',
    amenities: { cozinha: true, estacionamento: true },
    petFriendly: true,
    cancelation: 'flex',
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
    propertyType: 'Casa',
    amenities: { wifi: true, cozinha: true, estacionamento: true },
    petFriendly: true,
    cancelation: 'mod',
  },
];

const PAGE_SIZE = 4;
const skeletonPlaceholders = Array.from({ length: 8 }, (_, index) => index);

const isSortKey = (value: string | null): value is SortKey =>
  value === 'default' || value === 'price_asc' || value === 'price_desc' || value === 'rating_desc';

const toPropertyCardProps = ({
  propertyType,
  amenities,
  petFriendly,
  cancelation,
  ...cardProps
}: FilterableProperty): PropertyCardProps => {
  void propertyType;
  void amenities;
  void petFriendly;
  void cancelation;

  return cardProps;
};

export const Results = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchSummary, setSearchSummary] = useState<SearchCompactPayload>();
  const [filters, setFilters] = useState<Filters>(() => ({
    ...initialFilters,
    amenities: {},
  }));
  const [sortKey, setSortKey] = useState<SortKey>(() => {
    const param = searchParams.get('sort');
    return isSortKey(param) ? param : 'default';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const hasInteracted = useRef(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerLoading = useCallback(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    setIsLoading(true);
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    triggerLoading();

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [triggerLoading]);

  useEffect(() => {
    const param = searchParams.get('sort');
    const nextSort = isSortKey(param) ? param : 'default';

    setSortKey((current) => (current === nextSort ? current : nextSort));
  }, [searchParams]);

  useEffect(() => {
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      return;
    }

    triggerLoading();
    setVisibleCount(PAGE_SIZE);
  }, [filters, triggerLoading]);

  const handleSearch = (payload: SearchCompactPayload) => {
    setSearchSummary(payload);
    console.info('search_submit', payload);
    triggerLoading();
    setVisibleCount(PAGE_SIZE);
  };

  const handleResetFilters = () => {
    setFilters({
      ...initialFilters,
      amenities: {},
    });
    setSearchSummary(undefined);
    setVisibleCount(PAGE_SIZE);
    triggerLoading();
    console.info('filters_reset');
  };

  const handleSortChange = useCallback(
    (nextSort: SortKey) => {
      setSortKey((current) => (current === nextSort ? current : nextSort));
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        const currentParam = params.get('sort');

        if (nextSort === 'default') {
          if (currentParam === null) {
            return prev;
          }

          params.delete('sort');
          return params;
        }

        if (currentParam === nextSort) {
          return prev;
        }

        params.set('sort', nextSort);
        return params;
      });
    },
    [setSearchParams]
  );

  const filteredResults = useMemo(() => {
    return mockResults.filter((property) => {
      if (filters.price) {
        const [min, max] = filters.price;
        if (property.pricePerNight < min || property.pricePerNight > max) {
          return false;
        }
      }

      if (filters.type && property.propertyType !== filters.type) {
        return false;
      }

      const selectedAmenities = Object.entries(filters.amenities).filter(([, value]) => Boolean(value));
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(([key]) => property.amenities[key as keyof typeof property.amenities]);
        if (!hasAllAmenities) {
          return false;
        }
      }

      if (filters.petFriendly !== null && property.petFriendly !== filters.petFriendly) {
        return false;
      }

      if (filters.cancelation && property.cancelation !== filters.cancelation) {
        return false;
      }

      return true;
    });
  }, [filters]);
  const sortedResults = useMemo(() => {
    if (sortKey === 'default') {
      return filteredResults;
    }

    const nextResults = [...filteredResults];

    switch (sortKey) {
      case 'price_asc':
        nextResults.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'price_desc':
        nextResults.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating_desc':
        nextResults.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return nextResults;
  }, [filteredResults, sortKey]);

  const paginatedResults = useMemo(
    () => sortedResults.slice(0, visibleCount),
    [sortedResults, visibleCount]
  );

  const totalLabel = useMemo(() => {
    if (isLoading) {
      return 'Carregando estadias disponíveis...';
    }

    if (!filteredResults.length) {
      return 'Nenhum resultado disponível no momento';
    }

    if (filteredResults.length === 1) {
      return 'Exibindo 1 estadia';
    }

    if (paginatedResults.length === filteredResults.length) {
      return `${filteredResults.length} estadias encontradas`;
    }

    return `Exibindo ${paginatedResults.length} de ${filteredResults.length} estadias`;
  }, [filteredResults.length, isLoading, paginatedResults.length]);

  const hasMoreResults = !isLoading && paginatedResults.length < sortedResults.length;

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

        <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
            <FiltersBar filters={filters} onFiltersChange={setFilters} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="rounded-xl border border-slate-200 bg-white px-3 shadow-sm md:px-4">
            <SortBar value={sortKey} onChange={handleSortChange} />
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
                  <ResultSkeleton key={`skeleton-${item}`} />
                ))}
              </div>
            ) : paginatedResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedResults.map((property) => {
                  const cardProps = toPropertyCardProps(property);

                  return <PropertyCard key={property.title} {...cardProps} />;
                })}
              </div>
            ) : (
              <div className="py-10">
                <EmptyState
                  title="Não encontramos acomodações"
                  description="Tente ajustar as datas, destino ou número de hóspedes para ver mais opções."
                  ctaLabel="Limpar filtros"
                  onCta={handleResetFilters}
                />
                <div className="mt-6 flex flex-col items-center gap-2 text-sm text-slate-500">
                  <p>Você também pode explorar destaques na página inicial ou tentar outro destino.</p>
                  <button
                    type="button"
                    onClick={() => console.info('empty_state_explore_home')}
                    className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                  >
                    Ver sugestões populares
                  </button>
                </div>
              </div>
            )}
            {hasMoreResults ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((current) => Math.min(current + PAGE_SIZE, sortedResults.length))
                  }
                  className="inline-flex items-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  Carregar mais
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;
