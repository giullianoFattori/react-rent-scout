import type { AmenityCategory } from './Amenities.types';

type AmenityListProps = {
  cats: AmenityCategory[];
  showUnavailable?: boolean;
};

const AmenityList = ({ cats, showUnavailable = false }: AmenityListProps) => {
  const Row = ({ label, available }: { label: string; available: boolean }) => (
    <li
      className={`flex items-center gap-2 text-sm ${
        available ? 'text-slate-800' : 'text-slate-400'
      }`}
    >
      <span
        aria-hidden
        className={`inline-block h-2 w-2 rounded-full ${
          available ? 'bg-teal-600' : 'bg-slate-300'
        }`}
      />
      <span>{label}</span>
    </li>
  );

  return (
    <div className="space-y-5">
      {cats.map((cat) => (
        <section key={cat.id} aria-labelledby={`${cat.id}-title`}>
          <h3 id={`${cat.id}-title`} className="mb-2 font-medium text-slate-900">
            {cat.name}
          </h3>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {cat.items
              .filter((item) => showUnavailable || item.available)
              .map((item) => (
                <Row key={item.key} label={item.label} available={item.available} />
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default AmenityList;
