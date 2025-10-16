import { useMemo, useState } from 'react';

import { RatingStars } from './RatingStars';

export interface PropertyCardImage {
  src: string;
  alt: string;
}

export interface PropertyCardProps {
  title: string;
  location: string;
  rating: number;
  pricePerNight: number;
  currency?: string;
  images: PropertyCardImage[];
  badge?: string;
  onViewDetails?: () => void;
}

const currencyFormatter = (value: number, currency: string) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const PropertyCard = ({
  title,
  location,
  rating,
  pricePerNight,
  currency = 'BRL',
  images,
  badge,
  onViewDetails,
}: PropertyCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const safeImages = images.length > 0 ? images : [{ src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80', alt: title }];
  const totalImages = safeImages.length;

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };
  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const priceLabel = useMemo(() => currencyFormatter(pricePerNight, currency), [pricePerNight, currency]);

  return (
    <article className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition hover:border-slate-300 hover:shadow-md focus-within:border-teal-500 focus-within:shadow-md">
      <div className="relative">
        <img
          src={safeImages[currentImage].src}
          alt={safeImages[currentImage].alt}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-teal-700 shadow-sm">
            {badge}
          </span>
        )}
        {totalImages > 1 && (
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-2">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              aria-label="Ver imagem anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              aria-label="Ver próxima imagem"
            >
              ›
            </button>
          </div>
        )}
        {totalImages > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1">
            {safeImages.map((_, index) => (
              <span
                key={`dot-${index}`}
                className={`h-1.5 w-1.5 rounded-full transition ${index === currentImage ? 'bg-white' : 'bg-white/50'}`}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 p-3">
        <h3 className="line-clamp-1 text-base font-medium text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600" aria-label={`Localização ${location}`}>
          {location}
        </p>
        <RatingStars value={rating} />
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-slate-900">
            {priceLabel}
            <span className="ml-1 text-sm font-normal text-slate-600">/ noite</span>
          </p>
          <button
            type="button"
            onClick={onViewDetails}
            className="text-sm font-medium text-teal-700 underline-offset-2 transition hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </article>
  );
};
