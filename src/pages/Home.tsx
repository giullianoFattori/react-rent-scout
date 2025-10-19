import { useMemo, useState } from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { PropertyCard, PropertyCardProps } from '../components/PropertyCard';
import { SearchCompact, SearchCompactPayload } from '../components/SearchCompact';

const collections = [
  'Buenos Aires',
  'Ubatuba',
  'Praia',
  'Pet-friendly',
  'Com cozinha',
  'Vista para o mar',
  'Coworking',
  'Família grande',
];

const collectionIcons: Record<string, string> = {
  'Buenos Aires': '🌆',
  Ubatuba: '🌴',
  Praia: '🏖️',
  'Pet-friendly': '🐾',
  'Com cozinha': '🍳',
  'Vista para o mar': '🌊',
  Coworking: '💼',
  'Família grande': '👨‍👩‍👧‍👦',
};

const properties: PropertyCardProps[] = [
  {
    title: 'Loft iluminado com varanda e vista para a cidade',
    location: 'São Paulo, Brasil',
    rating: 4.8,
    pricePerNight: 520,
    images: [
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80', alt: 'Sala com varanda e vista urbana' },
      { src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80', alt: 'Quarto iluminado com cama queen' },
      { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', alt: 'Cozinha planejada' },
    ],
    badge: 'Super anfitrião',
  },
  {
    title: 'Casa pé na areia com deck exclusivo',
    location: 'Maresias, Brasil',
    rating: 4.9,
    pricePerNight: 940,
    images: [
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80', alt: 'Deck com vista para o mar' },
      { src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80', alt: 'Sala com grandes janelas' },
    ],
    badge: 'Vista privilegiada',
  },
  {
    title: 'Cabana aconchegante cercada de araucárias',
    location: 'Campos do Jordão, Brasil',
    rating: 4.7,
    pricePerNight: 610,
    images: [
      { src: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=800&q=80', alt: 'Cabana de madeira iluminada' },
      { src: 'https://images.unsplash.com/photo-1600585154340-0ef3c08ef1d3?auto=format&fit=crop&w=800&q=80', alt: 'Sala com lareira e poltronas' },
    ],
  },
  {
    title: 'Apartamento pet-friendly próximo ao metrô',
    location: 'Lisboa, Portugal',
    rating: 4.6,
    pricePerNight: 430,
    images: [
      { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', alt: 'Sala de estar com sofá cinza' },
      { src: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=800&q=80', alt: 'Cozinha compacta' },
    ],
  },
  {
    title: 'Penthouse com rooftop e jacuzzi',
    location: 'Buenos Aires, Argentina',
    rating: 5,
    pricePerNight: 1120,
    images: [
      { src: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=800&q=80', alt: 'Rooftop com jacuzzi e iluminação noturna' },
      { src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', alt: 'Sala moderna minimalista' },
    ],
  },
  {
    title: 'Chalé sustentável com vista para o lago',
    location: 'Gramado, Brasil',
    rating: 4.8,
    pricePerNight: 680,
    images: [
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80', alt: 'Chalé com deck de madeira' },
      { src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80', alt: 'Vista do lago ao entardecer' },
    ],
  },
  {
    title: 'Studio criativo no centro com coworking',
    location: 'Curitiba, Brasil',
    rating: 4.5,
    pricePerNight: 320,
    images: [
      { src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80', alt: 'Studio com área de trabalho' },
    ],
  },
  {
    title: 'Villa mediterrânea para famílias grandes',
    location: 'Porto, Portugal',
    rating: 4.9,
    pricePerNight: 990,
    images: [
      { src: 'https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?auto=format&fit=crop&w=800&q=80', alt: 'Villa com piscina' },
      { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80', alt: 'Quarto amplo com cama king' },
    ],
  },
];

const faqs = [
  {
    question: 'Como funciona a reserva?',
    answer:
      'Você escolhe datas e hóspedes, verifica o total e confirma o pagamento. Enviamos a confirmação em poucos minutos.',
  },
  {
    question: 'Existem taxas ocultas?',
    answer: 'Não. Exibimos o total estimado antes de você reservar.',
  },
  {
    question: 'Posso cancelar?',
    answer: 'Sim. Confira a política da acomodação antes de concluir a reserva.',
  },
];

export const Home = () => {
  const [searchSummary, setSearchSummary] = useState<SearchCompactPayload>();

  const handleSearch = (payload: SearchCompactPayload) => {
    setSearchSummary(payload);
    console.info('search_submit', payload);
  };

  const formattedSummary = useMemo(() => {
    if (!searchSummary) {
      return '';
    }

    const formatDate = (value: string) => {
      if (!value) {
        return '';
      }
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return '';
      }
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
      }).format(date);
    };

    const parts: string[] = [];

    parts.push(searchSummary.destination || 'Destino flexível');

    const formattedCheckIn = formatDate(searchSummary.checkIn);
    const formattedCheckOut = formatDate(searchSummary.checkOut);

    if (formattedCheckIn && formattedCheckOut) {
      parts.push(`${formattedCheckIn} – ${formattedCheckOut}`);
    } else {
      parts.push('Datas flexíveis');
    }

    const guestsLabel = searchSummary.guests > 1 ? `${searchSummary.guests} hóspedes` : `${searchSummary.guests} hóspede`;
    parts.push(guestsLabel);

    return parts.join(' · ');
  }, [searchSummary]);

  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text">
      <Header />

      <main>
        <section className="mx-auto max-w-7xl px-4 py-6 text-center md:px-6 md:py-10">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Encontre a estadia perfeita</h1>
          <p className="mt-2 text-slate-600">
            Curadoria de casas e apartamentos. Sem taxa oculta e suporte em português.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
            <SearchCompact onSubmit={handleSearch} value={searchSummary} />
          </div>
          {formattedSummary && (
            <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-primary-700">
              {formattedSummary}
            </p>
          )}
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mt-4 md:mt-6">
            <div className="flex justify-start gap-3 overflow-x-auto snap-x snap-mandatory md:gap-4">
              {collections.map((collection) => (
                <button
                  key={collection}
                  type="button"
                  className="inline-flex shrink-0 items-center rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  data-evt="cta_click"
                  data-ctx="collection_chip"
                >
                  {collection}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 py-8 md:px-6">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Sugestões para você</h2>
          <p className="mt-2 text-sm text-slate-600">Selecionamos espaços com alto índice de avaliação e anfitriões confiáveis.</p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard key={property.title} {...property} />
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <h2 className="sr-only">FAQ</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className={`py-3 ${index !== faqs.length - 1 ? 'border-b border-slate-200' : ''}`}
              >
                <summary className="cursor-pointer text-left text-base font-medium text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
