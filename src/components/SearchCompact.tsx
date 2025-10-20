import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600';
const errorInput =
  'border-red-500 focus:border-red-500 focus:ring-red-600 focus:outline-none';
const primaryButton =
  'h-11 w-full md:w-auto px-6 rounded-lg bg-teal-600 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600';

const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

type GuestType = 'adults' | 'children' | 'babies' | 'pets';

type GuestCounts = Record<GuestType, number>;

const MIN_ADULTS = 1;

const createInitialGuests = (total?: number): GuestCounts => ({
  adults: Math.max(MIN_ADULTS, total ?? 2),
  children: 0,
  babies: 0,
  pets: 0,
});

const guestRows: ReadonlyArray<{
  label: string;
  description: string;
  key: GuestType;
}> = [
  { label: 'Adultos', description: '13+ anos', key: 'adults' },
  { label: 'Crianças', description: '2–12 anos', key: 'children' },
  { label: 'Bebês', description: 'Menos de 2 anos', key: 'babies' },
  { label: 'Pets', description: 'Animais de estimação', key: 'pets' },
];

const maskDate = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);

  if (digits.length <= 2) {
    return day;
  }

  if (digits.length <= 4) {
    return `${day}/${month}`;
  }

  return `${day}/${month}/${year}`;
};

const parseDate = (value: string) => {
  if (!DATE_REGEX.test(value)) {
    return null;
  }

  const [day, month, year] = value.split('/').map(Number);
  const parsed = new Date(year, month - 1, day);

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
};

const validateDate = (value: string) => {
  if (!value) {
    return 'Informe a data';
  }

  if (!DATE_REGEX.test(value)) {
    return 'Use o formato dia/mês/ano';
  }

  if (!parseDate(value)) {
    return 'Data inválida';
  }

  return null;
};

const validateDateRange = (start: string, end: string) => {
  const startDate = parseDate(start);
  const endDate = parseDate(end);

  if (!startDate || !endDate) {
    return null;
  }

  if (endDate <= startDate) {
    return 'Check-out deve ser após o check-in';
  }

  return null;
};

export const SearchCompact = ({ variant = 'block', value, onSubmit }: SearchCompactProps) => {
  const [destination, setDestination] = useState(value?.destination ?? '');
  const [checkIn, setCheckIn] = useState(value?.checkIn ?? '');
  const [checkOut, setCheckOut] = useState(value?.checkOut ?? '');
  const [guestCounts, setGuestCounts] = useState<GuestCounts>(() =>
    createInitialGuests(value?.guests),
  );
  const [guestSelectorOpen, setGuestSelectorOpen] = useState(false);
  const guestSelectorRef = useRef<HTMLDivElement>(null);
  const [checkInError, setCheckInError] = useState<string | null>(null);
  const [checkOutError, setCheckOutError] = useState<string | null>(null);
  const [dateRangeError, setDateRangeError] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setDestination(value.destination);
      setCheckIn(value.checkIn);
      setCheckOut(value.checkOut);
      setGuestCounts(createInitialGuests(value.guests));
    }
  }, [value]);

  useEffect(() => {
    if (!guestSelectorOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        guestSelectorRef.current &&
        !guestSelectorRef.current.contains(event.target as Node)
      ) {
        setGuestSelectorOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setGuestSelectorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [guestSelectorOpen]);

  const labelClassName =
    'sr-only md:static md:m-0 md:block md:h-auto md:w-auto md:overflow-visible md:whitespace-normal md:border-0 md:p-0 md:text-xs md:font-medium md:text-slate-500 md:[clip:auto] md:[clip-path:none]';

  const totalGuests = useMemo(
    () => guestCounts.adults + guestCounts.children + guestCounts.babies,
    [guestCounts],
  );

  const guestButtonLabel = useMemo(() => {
    const guestLabel =
      totalGuests === 1 ? '1 hóspede' : `${totalGuests} hóspedes`;
    const petCount = guestCounts.pets;

    if (petCount === 0) {
      return guestLabel;
    }

    const petLabel = petCount === 1 ? '1 pet' : `${petCount} pets`;
    return `${guestLabel}, ${petLabel}`;
  }, [guestCounts, totalGuests]);

  const updateGuestCount = (type: GuestType, delta: number) => {
    setGuestCounts((prev) => {
      const next = { ...prev };
      const nextValue = prev[type] + delta;

      if (type === 'adults') {
        next[type] = Math.max(MIN_ADULTS, nextValue);
      } else {
        next[type] = Math.max(0, nextValue);
      }

      return next;
    });
  };

  const resetDateErrors = () => {
    setCheckInError(null);
    setCheckOutError(null);
    setDateRangeError(null);
  };

  const runDateValidation = () => {
    const nextCheckInError = validateDate(checkIn);
    const nextCheckOutError = validateDate(checkOut);
    const nextRangeError = validateDateRange(checkIn, checkOut);

    setCheckInError(nextCheckInError);
    setCheckOutError(nextCheckOutError);
    setDateRangeError(nextRangeError);

    return !nextCheckInError && !nextCheckOutError && !nextRangeError;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isDateValid = runDateValidation();

    if (!isDateValid) {
      return;
    }

    if (guestCounts.adults < MIN_ADULTS) {
      setGuestCounts((prev) => ({ ...prev, adults: MIN_ADULTS }));
    }

    const sanitizedGuests = Math.max(totalGuests, MIN_ADULTS);

    onSubmit({
      destination,
      checkIn,
      checkOut,
      guests: sanitizedGuests,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 items-center gap-3 md:grid md:grid-cols-[1.2fr,1fr,1fr,0.6fr] md:gap-2">
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
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className={labelClassName}>Check-in — Check-out</span>
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor={`checkin-${variant}`} className="sr-only">
                Check-in
              </label>
              <input
                id={`checkin-${variant}`}
                name="checkIn"
                inputMode="numeric"
                pattern="\\d{2}/\\d{2}/\\d{4}"
                placeholder="Check-in"
                className={`${baseInput} ${checkInError ? errorInput : ''}`.trim()}
                value={checkIn}
                aria-describedby="hint-date"
                aria-invalid={checkInError ? 'true' : undefined}
                onChange={(event) => {
                  resetDateErrors();
                  setCheckIn(maskDate(event.target.value));
                }}
                onBlur={() => {
                  setCheckInError(validateDate(checkIn));
                  setDateRangeError(validateDateRange(checkIn, checkOut));
                }}
              />
            </div>
            <div className="flex-1">
              <label htmlFor={`checkout-${variant}`} className="sr-only">
                Check-out
              </label>
              <input
                id={`checkout-${variant}`}
                name="checkOut"
                inputMode="numeric"
                pattern="\\d{2}/\\d{2}/\\d{4}"
                placeholder="Check-out"
                className={`${baseInput} ${checkOutError ? errorInput : ''}`.trim()}
                value={checkOut}
                aria-invalid={checkOutError ? 'true' : undefined}
                onChange={(event) => {
                  resetDateErrors();
                  setCheckOut(maskDate(event.target.value));
                }}
                onBlur={() => {
                  setCheckOutError(validateDate(checkOut));
                  setDateRangeError(validateDateRange(checkIn, checkOut));
                }}
              />
            </div>
          </div>
          <small id="hint-date" className="sr-only">
            Formato esperado: dia/mês/ano, por exemplo 24/12/2025
          </small>
          {(checkInError || checkOutError || dateRangeError) && (
            <p className="text-sm text-red-600" role="status">
              {checkInError || checkOutError || dateRangeError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`guests-${variant}`} className="sr-only">
            Hóspedes
          </label>
          <div className="relative" ref={guestSelectorRef}>
            <button
              id={`guests-${variant}`}
              type="button"
              className={`${baseInput} flex items-center justify-between text-left`}
              onClick={() => setGuestSelectorOpen((prev) => !prev)}
              aria-haspopup="dialog"
              aria-expanded={guestSelectorOpen}
              aria-controls={`guests-panel-${variant}`}
            >
              <span>{guestButtonLabel}</span>
            </button>
            {guestSelectorOpen ? (
              <div
                id={`guests-panel-${variant}`}
                role="dialog"
                aria-label="Selecionar hóspedes"
                className="absolute right-0 z-40 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg"
              >
                {guestRows.map(({ label, description, key }) => {
                  const valueForType = guestCounts[key];
                  const isAdults = key === 'adults';
                  const minValue = isAdults ? MIN_ADULTS : 0;

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">{label}</p>
                        <p className="text-xs text-slate-500">{description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
                          onClick={() => updateGuestCount(key, -1)}
                          aria-label={`Remover ${label.toLowerCase()}`}
                          disabled={valueForType <= minValue}
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm text-slate-900">
                          {valueForType}
                        </span>
                        <button
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
                          onClick={() => updateGuestCount(key, 1)}
                          aria-label={`Adicionar ${label.toLowerCase()}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm font-medium text-teal-600 hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
                    onClick={() => {
                      setGuestCounts(createInitialGuests());
                      setGuestSelectorOpen(false);
                    }}
                  >
                    Limpar
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
                    onClick={() => setGuestSelectorOpen(false)}
                  >
                    Concluir
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="md:flex md:items-center md:justify-end">
          <button
            type="submit"
            className={primaryButton}
            data-evt="search_submit"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
};
