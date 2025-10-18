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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md focus-within:border-primary-600 focus-within:shadow-md">
      <div className="relative">
        <img
          src={safeImages[currentImage].src}
          alt={safeImages[currentImage].alt}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm ring-1 ring-black/5">
            {badge}
          </span>
        )}
        {totalImages > 1 && (
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
              aria-label="Ver imagem anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
              aria-label="Ver próxima imagem"
            >
              ›
            </button>
          </div>
        )}
        {totalImages > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {safeImages.map((_, index) => (
              <span
                key={`dot-${index}`}
                className={`h-1.5 w-1.5 rounded-full transition ${index === currentImage ? 'bg-white' : 'bg-white/60'}`}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-medium text-slate-900 line-clamp-1">{title}</h3>
        <p className="text-sm text-slate-600" aria-label={`Localização ${location}`}>
          {location}
        </p>
        <RatingStars value={rating} />
        <div className="mt-auto flex items-center justify-between pt-1">
          <p className="text-sm font-semibold text-slate-900">
            {priceLabel}
            <span className="ml-1 text-xs font-normal text-slate-500">/ noite</span>
          </p>
          <button
            type="button"
            onClick={onViewDetails}
            className="text-sm font-semibold text-primary-700 underline-offset-4 transition hover:text-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </article>
  );
};
