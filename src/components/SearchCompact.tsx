import { FormEvent, useEffect, useMemo, useState } from 'react';

export interface SearchCompactPayload {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface SearchCompactProps {
  variant?: 'inline' | 'block';
  value?: SearchCompactPayload;
  onSubmit: (payload: SearchCompactPayload) => void;
}

const baseInput =
  'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-500 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600';

export const SearchCompact = ({ variant = 'block', value, onSubmit }: SearchCompactProps) => {
  const [destination, setDestination] = useState(value?.destination ?? '');
  const [checkIn, setCheckIn] = useState(value?.checkIn ?? '');
  const [checkOut, setCheckOut] = useState(value?.checkOut ?? '');
  const [guests, setGuests] = useState(value?.guests ?? 2);

  useEffect(() => {
    if (value) {
      setDestination(value.destination);
      setCheckIn(value.checkIn);
      setCheckOut(value.checkOut);
      setGuests(value.guests);
    }
  }, [value]);

  const containerClasses =
    variant === 'inline'
      ? 'rounded-xl border border-slate-200 bg-white/90 px-2 py-1 shadow-sm transition-shadow duration-150 ease-out hover:shadow-md'
      : '';

  const gridClasses =
    variant === 'inline'
      ? 'grid grid-cols-1 gap-3 sm:grid-cols-[1.2fr,1fr,1fr,auto] sm:gap-2'
      : 'grid grid-cols-1 gap-3 md:grid-cols-[1.2fr,1fr,1fr,0.6fr] md:gap-2';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      destination,
      checkIn,
      checkOut,
      guests,
    });
  };

  const summaryGuests = useMemo(
    () => (guests > 1 ? `${guests} hóspedes` : `${guests} hóspede`),
    [guests]
  );

  return (
    <form className={containerClasses} onSubmit={handleSubmit} noValidate>
      <div className={gridClasses}>
        <div className="flex flex-col gap-1">
          <label htmlFor={`destination-${variant}`} className="text-xs font-medium text-slate-500">
            Destino
          </label>
          <input
            id={`destination-${variant}`}
            name="destination"
            type="text"
            className={baseInput}
            placeholder="Para onde você quer ir?"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`checkin-${variant}`} className="text-xs font-medium text-slate-500">
            Check-in
          </label>
          <input
            id={`checkin-${variant}`}
            name="checkIn"
            type="date"
            className={baseInput}
            placeholder="dd/mm/aaaa"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`checkout-${variant}`} className="text-xs font-medium text-slate-500">
            Check-out
          </label>
          <input
            id={`checkout-${variant}`}
            name="checkOut"
            type="date"
            className={baseInput}
            placeholder="dd/mm/aaaa"
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`guests-${variant}`} className="text-xs font-medium text-slate-500">
            Hóspedes
          </label>
          <div className="flex h-11 items-center justify-between rounded-lg border border-slate-300 bg-white px-3">
            <span className="text-sm text-slate-900">{summaryGuests}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Diminuir quantidade de hóspedes"
                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                disabled={guests <= 1}
              >
                −
              </button>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                aria-label="Adicionar hóspede"
                onClick={() => setGuests((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 md:ml-auto md:flex md:items-end">
          <button
            type="submit"
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-medium text-white transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 md:mt-0 md:w-auto"
            data-evt="search_submit"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
};
