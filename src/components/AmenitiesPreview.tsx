interface AmenitiesPreviewProps {
  items: string[];
  onViewAll?: () => void;
}

export const AmenitiesPreview = ({ items, onViewAll }: AmenitiesPreviewProps) => {
  const visibleAmenities = items.slice(0, 6);
  const hasMore = items.length > visibleAmenities.length;

  return (
    <section aria-labelledby="amenities-heading">
      <h2 id="amenities-heading" className="text-lg font-semibold text-slate-900">
        O que esse lugar oferece
      </h2>
      <ul className="mt-3 grid grid-cols-1 gap-y-2 gap-x-6 text-slate-700 sm:grid-cols-2">
        {visibleAmenities.map((amenity) => (
          <li key={amenity} className="flex items-center gap-2 text-sm">
            <span aria-hidden="true">•</span>
            <span>{amenity}</span>
          </li>
        ))}
      </ul>
      {hasMore && onViewAll ? (
        <button
          type="button"
          onClick={onViewAll}
          className="mt-3 h-9 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
        >
          Ver todas as comodidades
        </button>
      ) : null}
    </section>
  );
};

export default AmenitiesPreview;
