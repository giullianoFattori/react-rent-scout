import { FormEvent, useEffect, useState } from 'react';

export interface SearchCompactPayload {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface SearchCompactProps {
  value?: SearchCompactPayload;
  onSubmit: (payload: SearchCompactPayload) => void;
  variant?: 'block' | 'inline';
}

const baseInput =
  'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600';

export const SearchCompact = ({ variant = 'block', value, onSubmit }: SearchCompactProps) => {
  const [destination, setDestination] = useState(value?.destination ?? '');
  const [checkIn, setCheckIn] = useState(value?.checkIn ?? '');
  const [checkOut, setCheckOut] = useState(value?.checkOut ?? '');
  const [dateRange, setDateRange] = useState(() => {
    if (value?.checkIn && value?.checkOut) {
      return `${value.checkIn} — ${value.checkOut}`;
    }

    return '';
  });
  const [guests, setGuests] = useState(value?.guests ?? 2);

  useEffect(() => {
    if (value) {
      setDestination(value.destination);
      setCheckIn(value.checkIn);
      setCheckOut(value.checkOut);
      setGuests(value.guests);
      if (value.checkIn && value.checkOut) {
        setDateRange(`${value.checkIn} — ${value.checkOut}`);
      } else {
        setDateRange('');
      }
    }
  }, [value]);

  const labelClassName =
    'sr-only md:static md:m-0 md:block md:h-auto md:w-auto md:overflow-visible md:whitespace-normal md:border-0 md:p-0 md:text-xs md:font-medium md:text-slate-500 md:[clip:auto] md:[clip-path:none]';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sanitizedGuests = guests > 0 ? guests : 1;

    onSubmit({
      destination,
      checkIn,
      checkOut,
      guests: sanitizedGuests,
    });

    if (guests <= 0) {
      setGuests(sanitizedGuests);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr,1fr,1fr,0.6fr] md:gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="destination-search" className="sr-only">
            Destino
          </label>
          <input
            id="destination-search"
            name="destination"
            type="text"
            className={baseInput}
            placeholder="Destino"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`dates-${variant}`} className={labelClassName}>
            Check-in — Check-out
          </label>
          <input
            id={`dates-${variant}`}
            name="dateRange"
            type="text"
            className={baseInput}
            placeholder="Check-in — Check-out"
            value={dateRange}
            onChange={(event) => {
              const { value: nextValue } = event.target;
              setDateRange(nextValue);

              const parts = nextValue.split(/—| - /);
              const start = parts[0]?.trim() ?? '';
              const end = parts[1]?.trim() ?? '';

              setCheckIn(start);
              setCheckOut(end);
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="guests-search" className="sr-only">
            Hóspedes
          </label>
          <input
            id={`guests-${variant}`}
            name="guests"
            type="number"
            min={1}
            className={baseInput}
            placeholder="Hóspedes"
            value={guests === 0 ? '' : guests}
            onChange={(event) => {
              const nextValue = event.target.value;

              if (nextValue === '') {
                setGuests(0);
                return;
              }

              const parsed = Number(nextValue);

              if (!Number.isNaN(parsed)) {
                setGuests(parsed > 0 ? parsed : 1);
              }
            }}
            onBlur={() => {
              if (guests <= 0) {
                setGuests(1);
              }
            }}
          />
        </div>

        <div className="md:flex md:items-center md:justify-end">
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 md:w-auto"
            data-evt="search_submit"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
};
