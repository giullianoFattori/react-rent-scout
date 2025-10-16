/**
 * Home.tsx
 *
 * Layout decisions:
 * - Estrutura mobile-first com container centralizado (max-w-7xl) e seções verticais,
 *   mantendo o Header sticky conforme solicitado.
 * - O componente SearchCompact possui variantes para Home (block) e para o Header (inline).
 * - A página foi pensada para ser facilmente estendida à tela de Resultados: basta reutilizar
 *   SearchCompact + PropertyCard + FiltersBar e mover a seção de grid para uma rota dedicada,
 *   adicionando paginação e o mapa descritos na documentação.
 */

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
      'Escolha as datas, informe os hóspedes e finalize o pagamento com segurança. Enviamos a confirmação detalhada em poucos minutos.',
  },
  {
    question: 'Quais taxas existem?',
    answer:
      'Mostramos o preço total estimado antes de pagar, incluindo taxas de limpeza e serviço. Sem taxas ocultas.',
  },
  {
    question: 'O que acontece se eu precisar cancelar?',
    answer:
      'Cada imóvel possui política específica. Destacamos as regras de cancelamento antes da reserva para você decidir com confiança.',
  },
];

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-slate-200 py-3">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between text-left text-base font-medium text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
      aria-expanded={isOpen}
    >
      {question}
      <span className="ml-4 text-teal-600">{isOpen ? '−' : '+'}</span>
    </button>
    {isOpen && <p className="mt-2 text-sm text-slate-600">{answer}</p>}
  </div>
);

export const Home = () => {
  const [searchSummary, setSearchSummary] = useState<SearchCompactPayload>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSearch = (payload: SearchCompactPayload) => {
    setSearchSummary(payload);
    console.info('search_submit', payload);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onSearch={handleSearch} />

      <main className="space-y-10 pb-10 pt-6 md:pb-16 md:pt-10">
        <section className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Encontre a estadia perfeita</h1>
          <p className="mt-2 text-base text-slate-600">
            Curadoria de casas e apartamentos. Sem taxa oculta e suporte em português.
          </p>
        </section>

        <section className="px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-3 md:p-4">
            <SearchCompact variant="block" onSubmit={handleSearch} value={searchSummary} />
          </div>
        </section>

        <section aria-labelledby="collections-heading" className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 id="collections-heading" className="text-xl font-semibold text-slate-900">
              Descubra por destino ou estilo
            </h2>
            <span className="text-sm text-slate-500">Toque em um chip para iniciar uma busca rápida</span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {collections.map((collection) => (
              <button
                key={collection}
                type="button"
                className="inline-flex h-9 items-center rounded-full bg-slate-100 px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                data-evt="cta_click"
                data-ctx="collection_chip"
              >
                {collection}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="properties-heading" className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="properties-heading" className="text-xl font-semibold text-slate-900">
                Sugestões para você
              </h2>
              <span className="text-sm text-slate-500">Baseado nas pesquisas mais populares desta semana</span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((property) => (
                <PropertyCard key={property.title} {...property} />
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <h2 id="faq-heading" className="text-xl font-semibold text-slate-900">
              FAQ curto (3 itens)
            </h2>
            <div className="mt-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq((current) => (current === index ? null : index))}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
