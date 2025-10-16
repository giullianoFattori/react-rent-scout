import { PropertyCard, PropertyCardProps } from '../Property/PropertyCard';

export interface ResultsGridProps {
  items: PropertyCardProps[];
  layout?: 'default' | 'withMap';
}

export const ResultsGrid = ({ items, layout = 'default' }: ResultsGridProps) => {
  return (
    <div
      className={[
        'grid gap-lg',
        layout === 'withMap' ? 'lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.6fr)]' : 'grid-cols-1',
      ].join(' ')}
    >
      <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
        {items.map((item) => (
          <PropertyCard key={item.id} {...item} />
        ))}
      </div>
      {layout === 'withMap' && (
        <aside className="sticky top-28 hidden h-[calc(100vh-160px)] rounded-xl border border-border-subtle bg-surface-base p-md shadow-md lg:block">
          <span className="text-sm text-text-secondary">Mapa interativo (placeholder)</span>
        </aside>
      )}
    </div>
  );
};
