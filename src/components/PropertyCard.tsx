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
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="relative">
        <img
          src={safeImages[0].src}
          alt={safeImages[0].alt}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm ring-1 ring-black/5">
            {badge}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 text-slate-900 font-medium">{title}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-slate-600" aria-label={`Localização ${location} com avaliação ${rating}`}>
          <span>{location}</span>
          <span>•</span>
          <span>{`★ ${rating.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`}</span>
        </div>
        <div className="mt-1 text-slate-900 font-semibold">
          {priceLabel}
          <span className="ml-1 text-xs font-normal text-slate-500">/ noite</span>
        </div>
      </div>
    </article>
  );
};
