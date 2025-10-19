import { useMemo } from 'react';

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
}: PropertyCardProps) => {
  const safeImages = images.length > 0 ? images : [{ src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80', alt: title }];

  const priceLabel = useMemo(() => currencyFormatter(pricePerNight, currency), [pricePerNight, currency]);

  return (
    <article className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition hover:border-slate-300 hover:shadow-md focus-within:border-teal-500 focus-within:shadow-md">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={safeImages[0].src}
          alt={safeImages[0].alt}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-teal-700 shadow-sm">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 p-3">
        <h3 className="line-clamp-1 text-base font-medium text-slate-900">{title}</h3>
        <div className="text-sm text-slate-600" aria-label={`Localização ${location} com avaliação ${rating}`}>
          {`${location} • ★ ${rating.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`}
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900">
            {priceLabel}
            <span className="ml-1 text-sm font-normal text-slate-600">/ noite</span>
          </p>
        </div>
      </div>
    </article>
  );
};
