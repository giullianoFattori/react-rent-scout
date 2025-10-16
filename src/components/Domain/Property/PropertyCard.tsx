import { useMemo, useState } from 'react';

import {
  Badge,
  Card,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  IconButton,
  Stack,
  Text,
} from '../../Core';
import { RatingStars } from '../Ratings/RatingStars';
import { PriceTag } from '../Pricing/PriceTag';

interface PropertyImage {
  src: string;
  alt: string;
}

export interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  rating: number;
  reviewsCount?: number;
  pricePerNight: number;
  currency?: string;
  badge?: {
    label: string;
    tone?: 'brand' | 'accent' | 'neutral';
  };
  images: PropertyImage[];
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export const PropertyCard = ({
  id,
  title,
  location,
  rating,
  reviewsCount,
  pricePerNight,
  currency = 'BRL',
  badge,
  images,
  isFavorite = false,
  onToggleFavorite,
  onViewDetails,
}: PropertyCardProps) => {
  const [activeImage, setActiveImage] = useState(0);

  const safeImages = images.length > 0 ? images.slice(0, 5) : [{ src: '/placeholder.jpg', alt: title }];
  const totalImages = safeImages.length;

  const currentImage = safeImages[activeImage];

  const goTo = (index: number) => {
    setActiveImage((index + totalImages) % totalImages);
  };

  const handlePrev = () => goTo(activeImage - 1);
  const handleNext = () => goTo(activeImage + 1);

  const locationLabel = useMemo(() => `Localização: ${location}`, [location]);

  return (
    <Card padding="none" interactive className="overflow-hidden">
      <div className="relative">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-sm">
          {badge && (
            <Badge variant={badge.tone ?? 'brand'} tone="solid">
              {badge.label}
            </Badge>
          )}
          <IconButton
            variant="secondary"
            density="compact"
            icon={<HeartIcon className={isFavorite ? 'text-accent-500' : 'text-text-primary'} />}
            label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            onClick={() => onToggleFavorite?.(id)}
            data-evt="cta_click"
            data-ctx="property_favorite"
          />
        </div>
        {totalImages > 1 && (
          <>
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
              {safeImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={`h-2 w-2 rounded-full ${index === activeImage ? 'bg-surface-base shadow-xs' : 'bg-surface-base/50'}`}
                  onClick={() => goTo(index)}
                  aria-label={`Ver imagem ${index + 1} de ${totalImages}`}
                />
              ))}
            </div>
            <div className="absolute inset-y-0 flex w-full items-center justify-between px-sm">
              <IconButton
                variant="ghost"
                icon={<ChevronLeftIcon className="h-5 w-5" />}
                label="Imagem anterior"
                onClick={handlePrev}
              />
              <IconButton
                variant="ghost"
                icon={<ChevronRightIcon className="h-5 w-5" />}
                label="Próxima imagem"
                onClick={handleNext}
              />
            </div>
          </>
        )}
      </div>

      <Stack gap="sm" className="p-md">
        <Stack gap="3xs">
          <Text as="h3" size="lg" weight="semibold" className="line-clamp-2">
            {title}
          </Text>
          <Text as="p" size="sm" tone="secondary" aria-label={locationLabel}>
            {location}
          </Text>
        </Stack>

        <RatingStars rating={rating} reviewsCount={reviewsCount} />

        <div className="flex items-end justify-between">
          <PriceTag amount={pricePerNight} currency={currency} />
          <button
            type="button"
            className="text-sm font-medium text-brand-700 underline-offset-2 hover:text-brand-800 focus-ring"
            onClick={() => onViewDetails?.(id)}
            data-evt="cta_click"
            data-ctx="property_details"
          >
            Ver detalhes
          </button>
        </div>
      </Stack>
    </Card>
  );
};
