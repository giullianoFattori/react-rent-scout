import { useEffect, useMemo, useState } from 'react';
import AmenityList from './AmenityList';
import type { AmenityCategory } from './Amenities.types';

type AmenityDrawerProps = {
  open: boolean;
  onClose: () => void;
  cats: AmenityCategory[];
};

const AmenityDrawer = ({ open, onClose, cats }: AmenityDrawerProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) {
      setQuery('');
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const filteredCategories = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return cats;
    }

    return cats
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.label.toLowerCase().includes(term)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [cats, query]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Todas as comodidades"
        className="absolute inset-y-0 right-0 h-full w-full max-w-lg rounded-l-2xl border-l border-slate-200 bg-white p-4 shadow-xl transition-transform duration-200 ease-out lg:rounded-none"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">Todas as comodidades</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            Fechar
          </button>
        </div>
        <div className="mt-3">
          <label htmlFor="amenities-search" className="sr-only">
            Buscar comodidades
          </label>
          <input
            id="amenities-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar comodidades"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
          />
        </div>
        <div className="mt-4 h-[calc(100%-7rem)] overflow-y-auto pb-6">
          <AmenityList cats={filteredCategories} showUnavailable />
        </div>
      </aside>
    </div>
  );
};

export default AmenityDrawer;
