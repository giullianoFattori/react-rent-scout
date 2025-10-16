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

import { useState } from 'react';

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

      <main className="space-y-12 pb-12 pt-8 md:space-y-16 md:pb-20 md:pt-12">
        <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-xl shadow-slate-900/5 backdrop-blur">
            <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] lg:items-start xl:px-14 xl:py-12">
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                    Curadoria especializada
                  </span>
                  <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                    Encontre a estadia perfeita
                  </h1>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                    Casas e apartamentos selecionados a dedo para sua próxima viagem. Sem taxas ocultas e com suporte humano em português.
                  </p>
                </div>
                <dl className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2 sm:text-base">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Imóveis verificados</dt>
                    <dd className="mt-1 text-lg font-semibold text-slate-900">+2.500</dd>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Avaliação média</dt>
                    <dd className="mt-1 text-lg font-semibold text-slate-900">4,8 estrelas</dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/10 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">Planeje sua próxima estadia</h2>
                  <span className="text-xs font-medium uppercase tracking-wide text-teal-600">Busca rápida</span>
                </div>
                <SearchCompact variant="block" onSubmit={handleSearch} value={searchSummary} />
                <p className="text-xs text-slate-500">
                  Dica: experimente datas flexíveis para descobrir estadias com melhores tarifas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="collections-heading" className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="flex flex-col gap-3 text-left">
            <h2 id="collections-heading" className="text-xl font-semibold text-slate-900 md:text-2xl">
              Descubra por destino ou estilo
            </h2>
            <span className="text-sm text-slate-500 md:text-base">Escolha um tema para iniciar uma busca personalizada.</span>
          </div>
          <div className="mt-5 -mx-4 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-start md:gap-4 md:overflow-visible md:px-0">
            {collections.map((collection) => (
              <button
                key={collection}
                type="button"
                className="inline-flex h-10 min-w-[9.5rem] shrink-0 snap-start items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 md:min-w-0"
                data-evt="cta_click"
                data-ctx="collection_chip"
              >
                {collection}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="properties-heading" className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr),minmax(0,0.85fr)] lg:items-start">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-left">
                <h2 id="properties-heading" className="text-xl font-semibold text-slate-900 md:text-2xl">
                  Sugestões para você
                </h2>
                <span className="text-sm text-slate-500 md:text-base">
                  Baseado nas pesquisas mais populares desta semana
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {properties.map((property) => (
                  <PropertyCard key={property.title} {...property} />
                ))}
              </div>
            </div>
            <aside className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10 lg:sticky lg:top-28">
              <div>
                <h2 id="faq-heading" className="text-lg font-semibold text-slate-900">
                  FAQ curto (3 itens)
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Respondemos às dúvidas mais comuns sobre a experiência RS Rent Scout.
                </p>
              </div>
              <div>
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
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
