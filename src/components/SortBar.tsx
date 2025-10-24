export type SortKey = 'default' | 'price_asc' | 'price_desc' | 'rating_desc';

type SortOption = {
  key: SortKey;
  label: string;
};

const sortOptions: SortOption[] = [
  { key: 'default', label: 'Padrão' },
  { key: 'price_asc', label: 'Preço (menor → maior)' },
  { key: 'price_desc', label: 'Preço (maior → menor)' },
  { key: 'rating_desc', label: 'Avaliação' },
];

type SortBarProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export const SortBar = ({ value, onChange }: SortBarProps) => {
  return (
    <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
      <span className="text-sm font-medium text-slate-700 md:text-base">Ordenar por</span>
      <div className="flex flex-wrap items-center gap-2">
        {sortOptions.map((option) => {
          const isActive = option.key === value;

          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.key)}
              className={`inline-flex h-9 items-center rounded-lg border px-3 text-sm font-medium transition focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
                isActive
                  ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm'
                  : 'border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SortBar;
