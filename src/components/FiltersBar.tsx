import { FormEvent, useEffect, useMemo, useState } from 'react';

import { Modal } from './Modal';

type PropertyType = 'Casa' | 'Apartamento' | 'Cabana' | 'Studio';
type Cancelation = 'flex' | 'mod' | 'rig';

type Amenities = {
  wifi?: boolean;
  cozinha?: boolean;
  estacionamento?: boolean;
};

export type Filters = {
  price: [number, number] | null;
  type: PropertyType | null;
  amenities: Amenities;
  petFriendly: boolean | null;
  cancelation: Cancelation | null;
};

export const initialFilters: Filters = {
  price: null,
  type: null,
  amenities: {},
  petFriendly: null,
  cancelation: null,
};

interface FiltersBarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

type DraftFilters = Filters;

const amenityLabels: Record<keyof Amenities, string> = {
  wifi: 'Wi-Fi',
  cozinha: 'Cozinha',
  estacionamento: 'Estacionamento',
};

const propertyTypeLabels: Record<PropertyType, string> = {
  Casa: 'Casa',
  Apartamento: 'Apartamento',
  Cabana: 'Cabana',
  Studio: 'Studio',
};

const cancelationLabels: Record<Cancelation, string> = {
  flex: 'Flexível',
  mod: 'Moderada',
  rig: 'Rígida',
};

const chipBaseClasses =
  'inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring focus-visible:ring-slate-400';
const chipActiveClasses = 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800';
const chipInactiveClasses = 'bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900';

export const FiltersBar = ({ filters, onFiltersChange }: FiltersBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<DraftFilters>(filters);
  const [draftPriceMin, setDraftPriceMin] = useState('');
  const [draftPriceMax, setDraftPriceMax] = useState('');

  useEffect(() => {
    if (isModalOpen) {
      setDraftFilters(filters);
      setDraftPriceMin(filters.price ? String(filters.price[0]) : '');
      setDraftPriceMax(
        filters.price && filters.price[1] !== Number.MAX_SAFE_INTEGER
          ? String(filters.price[1])
          : ''
      );
    }
  }, [isModalOpen, filters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;

    if (filters.price) count += 1;
    if (filters.type) count += 1;
    if (Object.values(filters.amenities).some(Boolean)) count += 1;
    if (filters.petFriendly !== null) count += 1;
    if (filters.cancelation) count += 1;

    return count;
  }, [filters]);

  const togglePriceChip = () => {
    if (filters.price) {
      onFiltersChange({ ...filters, price: null });
      return;
    }

    onFiltersChange({ ...filters, price: [0, 600] });
  };

  const toggleTypeChip = () => {
    if (filters.type) {
      onFiltersChange({ ...filters, type: null });
      return;
    }

    onFiltersChange({ ...filters, type: 'Apartamento' });
  };

  const toggleAmenitiesChip = () => {
    if (Object.values(filters.amenities).some(Boolean)) {
      onFiltersChange({ ...filters, amenities: {} });
      return;
    }

    onFiltersChange({ ...filters, amenities: { wifi: true } });
  };

  const togglePetFriendlyChip = () => {
    if (filters.petFriendly !== null) {
      onFiltersChange({ ...filters, petFriendly: null });
      return;
    }

    onFiltersChange({ ...filters, petFriendly: true });
  };

  const toggleCancelationChip = () => {
    if (filters.cancelation) {
      onFiltersChange({ ...filters, cancelation: null });
      return;
    }

    onFiltersChange({ ...filters, cancelation: 'flex' });
  };

  const handleDraftAmenityChange = (key: keyof Amenities) => {
    setDraftFilters((prev) => {
      const current = prev.amenities[key];
      const updatedAmenities = { ...prev.amenities };

      if (current) {
        delete updatedAmenities[key];
      } else {
        updatedAmenities[key] = true;
      }

      return { ...prev, amenities: updatedAmenities };
    });
  };

  const handleDraftTypeChange = (value: PropertyType | '') => {
    setDraftFilters((prev) => ({ ...prev, type: value === '' ? null : value }));
  };

  const handleDraftPetFriendlyChange = (value: string) => {
    if (value === 'true') {
      setDraftFilters((prev) => ({ ...prev, petFriendly: true }));
      return;
    }

    if (value === 'false') {
      setDraftFilters((prev) => ({ ...prev, petFriendly: false }));
      return;
    }

    setDraftFilters((prev) => ({ ...prev, petFriendly: null }));
  };

  const handleDraftCancelationChange = (value: Cancelation | '') => {
    setDraftFilters((prev) => ({ ...prev, cancelation: value === '' ? null : value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const minValue = draftPriceMin.trim() === '' ? null : Number(draftPriceMin);
    const maxValue = draftPriceMax.trim() === '' ? null : Number(draftPriceMax);

    const safeMin = minValue === null || Number.isNaN(minValue) ? 0 : Math.max(minValue, 0);
    const safeMax =
      maxValue === null || Number.isNaN(maxValue)
        ? Number.MAX_SAFE_INTEGER
        : Math.max(maxValue, 0);

    const normalizedMax = safeMax < safeMin ? safeMin : safeMax;

    const priceRange =
      minValue === null && maxValue === null
        ? null
        : ([safeMin, normalizedMax === Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : normalizedMax] as [number, number]);

    const resolvedPrice =
      priceRange && priceRange[0] === 0 && priceRange[1] === Number.MAX_SAFE_INTEGER
        ? null
        : priceRange;

    onFiltersChange({ ...draftFilters, price: resolvedPrice });
    setIsModalOpen(false);
  };

  const handleClearFilters = () => {
    const resetFilters = { ...initialFilters, amenities: {} };
    setDraftFilters(resetFilters);
    setDraftPriceMin('');
    setDraftPriceMax('');
    onFiltersChange(resetFilters);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePriceChip}
          className={`${chipBaseClasses} ${filters.price ? chipActiveClasses : chipInactiveClasses}`}
        >
          Preço
        </button>
        <button
          type="button"
          onClick={toggleTypeChip}
          className={`${chipBaseClasses} ${filters.type ? chipActiveClasses : chipInactiveClasses}`}
        >
          Tipo
        </button>
        <button
          type="button"
          onClick={toggleAmenitiesChip}
          className={`${chipBaseClasses} ${Object.values(filters.amenities).some(Boolean) ? chipActiveClasses : chipInactiveClasses}`}
        >
          Comodidades
        </button>
        <button
          type="button"
          onClick={togglePetFriendlyChip}
          className={`${chipBaseClasses} ${
            filters.petFriendly !== null ? chipActiveClasses : chipInactiveClasses
          }`}
        >
          Pet-friendly
        </button>
        <button
          type="button"
          onClick={toggleCancelationChip}
          className={`${chipBaseClasses} ${filters.cancelation ? chipActiveClasses : chipInactiveClasses}`}
        >
          Cancelamento
        </button>
        <div className="ml-auto flex items-center gap-3">
          {activeFiltersCount > 0 ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} ativos
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-400"
          >
            Mais filtros
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Filtros"
        description="Refine sua busca com os filtros abaixo."
        actions={
          <>
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 focus:outline-none focus-visible:ring focus-visible:ring-slate-400"
            >
              Limpar tudo
            </button>
            <button
              type="submit"
              form="filters-modal-form"
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring focus-visible:ring-slate-400"
            >
              Aplicar filtros
            </button>
          </>
        }
      >
        <form id="filters-modal-form" className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800">Preço mínimo</label>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={draftPriceMin}
                onChange={(event) => setDraftPriceMin(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus-visible:ring focus-visible:ring-slate-400"
                placeholder="Ex: 200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800">Preço máximo</label>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={draftPriceMax}
                onChange={(event) => setDraftPriceMax(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus-visible:ring focus-visible:ring-slate-400"
                placeholder="Ex: 1200"
              />
            </div>
          </div>

          <div>
            <span className="block text-sm font-semibold text-slate-800">Tipo de propriedade</span>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300">
                <input
                  type="radio"
                  name="property-type"
                  value=""
                  checked={draftFilters.type === null}
                  onChange={() => handleDraftTypeChange('')}
                />
                <span>Qualquer</span>
              </label>
              {Object.entries(propertyTypeLabels).map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300"
                >
                  <input
                    type="radio"
                    name="property-type"
                    value={value}
                    checked={draftFilters.type === value}
                    onChange={() => handleDraftTypeChange(value as PropertyType)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-sm font-semibold text-slate-800">Comodidades</span>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(Object.keys(amenityLabels) as (keyof Amenities)[]).map((key) => (
                <label
                  key={key}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300"
                >
                  <input
                    type="checkbox"
                    name={`amenity-${key}`}
                    checked={Boolean(draftFilters.amenities[key])}
                    onChange={() => handleDraftAmenityChange(key)}
                  />
                  <span>{amenityLabels[key]}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800" htmlFor="pet-friendly-select">
              Pet-friendly
            </label>
            <select
              id="pet-friendly-select"
              value={
                draftFilters.petFriendly === null
                  ? ''
                  : draftFilters.petFriendly
                  ? 'true'
                  : 'false'
              }
              onChange={(event) => handleDraftPetFriendlyChange(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus-visible:ring focus-visible:ring-slate-400"
            >
              <option value="">Todos</option>
              <option value="true">Permitido</option>
              <option value="false">Não permitido</option>
            </select>
          </div>

          <div>
            <span className="block text-sm font-semibold text-slate-800">Política de cancelamento</span>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300">
                <input
                  type="radio"
                  name="cancelation"
                  value=""
                  checked={draftFilters.cancelation === null}
                  onChange={() => handleDraftCancelationChange('')}
                />
                <span>Qualquer</span>
              </label>
              {Object.entries(cancelationLabels).map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300"
                >
                  <input
                    type="radio"
                    name="cancelation"
                    value={value}
                    checked={draftFilters.cancelation === value}
                    onChange={() => handleDraftCancelationChange(value as Cancelation)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FiltersBar;
