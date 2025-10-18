import { FormEvent, useEffect, useMemo, useState } from 'react';

export interface SearchCompactPayload {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface SearchCompactProps {
  value?: SearchCompactPayload;
  onSubmit: (payload: SearchCompactPayload) => void;
}

const baseInput =
  'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/40';

const rangeInput =
  'h-full w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0';

export const SearchCompact = ({ value, onSubmit }: SearchCompactProps) => {
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
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr,1.2fr,1fr,0.7fr] md:gap-2">
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

        <fieldset className="flex flex-col gap-1 border-0 p-0">
          <legend id="dates-label-card" className="sr-only">
            Datas
          </legend>
          <div className="flex h-11 items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600/40">
            <label htmlFor="checkin-search" className="sr-only">
              Check-in
            </label>
            <input
              id="checkin-search"
              name="checkIn"
              type="date"
              className={rangeInput}
              placeholder="Check-in"
              aria-labelledby="dates-label-card"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
            />
            <span aria-hidden="true" className="text-slate-300">
              —
            </span>
            <label htmlFor="checkout-search" className="sr-only">
              Check-out
            </label>
            <input
              id="checkout-search"
              name="checkOut"
              type="date"
              className={rangeInput}
              placeholder="Check-out"
              aria-labelledby="dates-label-card"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </div>
        </fieldset>

        <div className="flex flex-col gap-1">
          <label htmlFor="guests-search" className="sr-only">
            Hóspedes
          </label>
          <div className="flex h-11 items-center justify-between rounded-lg border border-slate-300 bg-white px-3">
            <span className="text-sm text-slate-900">{summaryGuests}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Diminuir quantidade de hóspedes"
                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                disabled={guests <= 1}
              >
                −
              </button>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
                aria-label="Adicionar hóspede"
                onClick={() => setGuests((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="md:flex md:items-center md:justify-end">
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-primary-600 px-6 text-sm font-semibold text-white transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 md:w-auto"
            data-evt="search_submit"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
};
