import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from '../utils/date';

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
  'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:placeholder-slate-300 disabled:opacity-70';
const errorInput =
  'border-red-500 focus:border-red-500 focus:ring-red-600 focus:outline-none';
const primaryButton =
  'h-11 w-full md:w-auto px-6 rounded-lg bg-teal-600 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600';

const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

type GuestType = 'adults' | 'children' | 'babies' | 'pets';

type GuestCounts = Record<GuestType, number>;

const MIN_ADULTS = 1;

const createInitialGuests = (total?: number): GuestCounts => ({
  adults: total && total > 0 ? Math.max(MIN_ADULTS, total) : 0,
  children: 0,
  babies: 0,
  pets: 0,
});

const guestRows: ReadonlyArray<{
  label: string;
  description: string;
  key: GuestType;
  min: number;
}> = [
  { label: 'Adultos', description: '13+ anos', key: 'adults', min: MIN_ADULTS },
  { label: 'Crianças', description: '2–12 anos', key: 'children', min: 0 },
  { label: 'Bebês', description: 'Menos de 2 anos', key: 'babies', min: 0 },
  { label: 'Pets', description: 'Animais de estimação', key: 'pets', min: 0 },
];

const emptyGuests: GuestCounts = { adults: 0, children: 0, babies: 0, pets: 0 };

const labelGuests = ({ adults, children, babies, pets }: GuestCounts) => {
  const total = adults + children + babies;
  const parts = [
    total
      ? `${total} ${total > 1 ? 'hóspedes' : 'hóspede'}`
      : 'Hóspedes',
    pets ? `${pets} ${pets > 1 ? 'pets' : 'pet'}` : '',
  ].filter(Boolean);

  return parts.join(', ');
};

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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [focusedDateInput, setFocusedDateInput] = useState<'checkin' | 'checkout'>('checkin');
  const calendarRef = useRef<HTMLDivElement>(null);
  const checkInInputRef = useRef<HTMLInputElement>(null);
  const checkOutInputRef = useRef<HTMLInputElement>(null);
  const [calendarMonth, setCalendarMonth] = useState(() =>
    startOfMonth(new Date()),
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
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

  useEffect(() => {
    if (!calendarOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
        setHoveredDate(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCalendarOpen(false);
        setHoveredDate(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [calendarOpen]);

  const totalGuests = useMemo(
    () => guestCounts.adults + guestCounts.children + guestCounts.babies,
    [guestCounts],
  );

  const guestButtonLabel = useMemo(
    () => labelGuests(guestCounts),
    [guestCounts],
  );

  const updateGuestCount = (type: GuestType, delta: number) => {
    setGuestCounts((prev) => {
      const next: GuestCounts = {
        ...prev,
        [type]: Math.max(0, prev[type] + delta),
      };

      if (type === 'adults') {
        const others = next.children + next.babies + next.pets;
        if (next.adults < MIN_ADULTS && others > 0) {
          next.adults = MIN_ADULTS;
        }
      } else if (delta > 0 && next.adults < MIN_ADULTS) {
        next.adults = MIN_ADULTS;
      }

      return next;
    });
  };

  const clearGuests = () => {
    setGuestCounts({ ...emptyGuests });
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

  const parsedCheckIn = useMemo(() => parseDate(checkIn), [checkIn]);
  const parsedCheckOut = useMemo(() => parseDate(checkOut), [checkOut]);

  const isCheckInValid = Boolean(parsedCheckIn);
  const isCheckOutEnabled = isCheckInValid;

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const ensureCalendarMonthVisible = (base: Date | null) => {
    if (base) {
      setCalendarMonth(startOfMonth(base));
    } else {
      setCalendarMonth(startOfMonth(new Date()));
    }
  };

  const focusCheckoutInput = () => {
    requestAnimationFrame(() => {
      checkOutInputRef.current?.focus();
    });
  };

  const openCalendar = (target: 'checkin' | 'checkout') => {
    setFocusedDateInput(target);
    const baseDate =
      target === 'checkin'
        ? parsedCheckIn
        : parsedCheckOut ?? parsedCheckIn;
    ensureCalendarMonthVisible(baseDate ?? null);
    setCalendarOpen(true);
  };

  const closeCalendar = () => {
    setCalendarOpen(false);
    setHoveredDate(null);
  };

  const handleManualCheckInChange = (value: string) => {
    resetDateErrors();
    const masked = maskDate(value);
    setCheckIn(masked);

    let clearedCheckout = false;
    const nextDate = parseDate(masked);
    if (nextDate) {
      ensureCalendarMonthVisible(nextDate);
      if (masked.length === 10) {
        focusCheckoutInput();
      }
      if (checkOut) {
        const parsedExistingCheckOut = parseDate(checkOut);
        if (!parsedExistingCheckOut || !isAfter(parsedExistingCheckOut, nextDate)) {
          setCheckOut('');
          clearedCheckout = true;
        }
      }
    }

    if (!nextDate && checkOut) {
      setCheckOut('');
      clearedCheckout = true;
    }

    if (checkOut && !clearedCheckout) {
      setDateRangeError(validateDateRange(masked, checkOut));
    } else if (clearedCheckout) {
      setCheckOutError(null);
      setDateRangeError(null);
    }
  };

  const handleManualCheckOutChange = (value: string) => {
    resetDateErrors();
    const masked = maskDate(value);
    setCheckOut(masked);

    const nextDate = parseDate(masked);
    if (nextDate) {
      ensureCalendarMonthVisible(nextDate);
    }

    if (checkIn) {
      setDateRangeError(validateDateRange(checkIn, masked));
    }
  };

  const handleDateSelection = (selected: Date) => {
    const formatted = format(selected, 'dd/MM/yyyy');

    if (!parsedCheckIn || (parsedCheckIn && parsedCheckOut)) {
      setCheckIn(formatted);
      setCheckOut('');
      setCheckInError(null);
      setCheckOutError(null);
      setDateRangeError(null);
      setFocusedDateInput('checkout');
      ensureCalendarMonthVisible(selected);
      focusCheckoutInput();
      return;
    }

    if (isBefore(selected, parsedCheckIn)) {
      setCheckIn(formatted);
      setCheckOut('');
      setCheckInError(null);
      setCheckOutError(null);
      setDateRangeError(null);
      setFocusedDateInput('checkout');
      ensureCalendarMonthVisible(selected);
      focusCheckoutInput();
      return;
    }

    if (isSameDay(selected, parsedCheckIn)) {
      return;
    }

    setCheckOut(format(selected, 'dd/MM/yyyy'));
    setCheckOutError(null);
    setDateRangeError(null);
    setFocusedDateInput('checkout');
    closeCalendar();
  };

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(calendarMonth));
    const end = endOfMonth(calendarMonth);
    const days: Date[] = [];
    let current = start;

    while (current <= end || days.length % 7 !== 0) {
      days.push(current);
      current = addDays(current, 1);
    }

    return days;
  }, [calendarMonth]);

  const isInRange = (day: Date) => {
    if (parsedCheckIn && parsedCheckOut) {
      return isWithinInterval(day, {
        start: parsedCheckIn,
        end: parsedCheckOut,
      });
    }

    if (parsedCheckIn && hoveredDate && isAfter(hoveredDate, parsedCheckIn)) {
      return isWithinInterval(day, {
        start: parsedCheckIn,
        end: hoveredDate,
      });
    }

    return false;
  };

  const weekdayLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

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
      <div className="grid grid-cols-1 items-start gap-3 md:grid md:grid-cols-[1.2fr,1fr,1fr,0.6fr] md:gap-2">
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

        <div className="relative flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor={`checkin-${variant}`} className="sr-only">
                Check-in
              </label>
              <input
                id={`checkin-${variant}`}
                name="checkIn"
                inputMode="numeric"
                pattern={String.raw`\d{2}/\d{2}/\d{4}`}
                placeholder="Check-in"
                ref={checkInInputRef}
                className={`${baseInput} ${checkInError ? errorInput : ''}`.trim()}
                value={checkIn}
                aria-describedby={`hint-date-${variant}`}
                aria-invalid={checkInError ? 'true' : undefined}
                onFocus={() => openCalendar('checkin')}
                onClick={() => openCalendar('checkin')}
                onChange={(event) => {
                  handleManualCheckInChange(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Tab') {
                    closeCalendar();
                  }
                }}
                onBlur={() => {
                  setTimeout(() => {
                    if (!calendarOpen) {
                      setCheckInError(validateDate(checkIn));
                      setDateRangeError(validateDateRange(checkIn, checkOut));
                    }
                  }, 0);
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
                pattern={String.raw`\d{2}/\d{2}/\d{4}`}
                placeholder="Check-out"
                ref={checkOutInputRef}
                className={`${baseInput} ${
                  checkOutError ? errorInput : ''
                }`.trim()}
                value={checkOut}
                aria-invalid={checkOutError ? 'true' : undefined}
                aria-describedby={`hint-date-${variant}`}
                aria-disabled={isCheckOutEnabled ? undefined : 'true'}
                disabled={!isCheckOutEnabled}
                onFocus={() => {
                  if (isCheckOutEnabled) {
                    openCalendar('checkout');
                  }
                }}
                onClick={() => {
                  if (isCheckOutEnabled) {
                    openCalendar('checkout');
                  }
                }}
                onChange={(event) => {
                  if (!isCheckOutEnabled) {
                    return;
                  }

                  handleManualCheckOutChange(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Tab') {
                    closeCalendar();
                  }
                }}
                onBlur={() => {
                  setTimeout(() => {
                    if (!calendarOpen) {
                      setCheckOutError(validateDate(checkOut));
                      setDateRangeError(validateDateRange(checkIn, checkOut));
                    }
                  }, 0);
                }}
              />
            </div>
          </div>
          <small id={`hint-date-${variant}`} className="sr-only">
            Formato esperado: dia/mês/ano, por exemplo 24/12/2025
          </small>
          <p
            className={`min-h-[1.125rem] text-sm ${
              checkInError || checkOutError || dateRangeError
                ? 'text-red-600'
                : 'text-transparent'
            }`}
            role={checkInError || checkOutError || dateRangeError ? 'status' : undefined}
          >
            {checkInError || checkOutError || dateRangeError || '\u00a0'}
          </p>

          {calendarOpen ? (
            <div
              ref={calendarRef}
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 w-full rounded-xl border border-slate-200 bg-white p-4 shadow-lg md:w-[20rem] md:right-auto"
            >
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
                  onClick={() => setCalendarMonth((prev) => addMonths(prev, -1))}
                  aria-label="Mês anterior"
                >
                  ‹
                </button>
                <div className="text-sm font-semibold text-slate-900 capitalize">
                  {new Intl.DateTimeFormat('pt-BR', {
                    month: 'long',
                    year: 'numeric',
                  }).format(calendarMonth)}
                </div>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
                  onClick={() => setCalendarMonth((prev) => addMonths(prev, 1))}
                  aria-label="Próximo mês"
                >
                  ›
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500">
                {weekdayLabels.map((label) => (
                  <div key={label}>{label}</div>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1 text-sm">
                {calendarDays.map((day) => {
                  const isCurrentMonth = day.getMonth() === calendarMonth.getMonth();
                  const isSelectedStart = parsedCheckIn ? isSameDay(day, parsedCheckIn) : false;
                  const isSelectedEnd = parsedCheckOut ? isSameDay(day, parsedCheckOut) : false;
                  const inRange = isInRange(day);
                  const isDisabled =
                    (focusedDateInput === 'checkout' && parsedCheckIn && isBefore(day, parsedCheckIn)) ||
                    isBefore(day, today);

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-transparent transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 ${
                        isSelectedStart || isSelectedEnd
                          ? 'bg-teal-600 text-white'
                          : inRange
                          ? 'bg-teal-50 text-teal-700'
                          : isCurrentMonth
                          ? 'text-slate-900 hover:border-teal-200 hover:bg-teal-50'
                          : 'text-slate-400'
                      } ${isDisabled ? 'cursor-not-allowed opacity-40 hover:bg-transparent' : ''}`.trim()}
                      onClick={() => {
                        if (isDisabled) {
                          return;
                        }
                        handleDateSelection(day);
                      }}
                      onMouseEnter={() => {
                        if (parsedCheckIn && !parsedCheckOut && !isBefore(day, parsedCheckIn)) {
                          setHoveredDate(day);
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredDate(null);
                      }}
                      aria-pressed={isSelectedStart || isSelectedEnd}
                      aria-label={format(day, 'dd/MM/yyyy')}
                      disabled={isDisabled}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
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
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4 text-slate-500"
              >
                <path
                  d="m6 9 6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {guestSelectorOpen ? (
              <div
                id={`guests-panel-${variant}`}
                role="dialog"
                aria-label="Selecionar hóspedes"
                className="absolute right-0 z-40 mt-2 w-72 max-w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-3 shadow-lg"
              >
                {guestRows.map(({ label, description, key, min }) => {
                  const valueForType = guestCounts[key];
                  const dynamicMin =
                    key === 'adults' &&
                    guestCounts.children + guestCounts.babies + guestCounts.pets === 0
                      ? 0
                      : min;

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
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-40"
                          onClick={() => updateGuestCount(key, -1)}
                          aria-label={`Remover ${label.toLowerCase()}`}
                          disabled={valueForType <= dynamicMin}
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm text-slate-900">
                          {valueForType}
                        </span>
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
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
                      clearGuests();
                    }}
                  >
                    Limpar
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center rounded-lg bg-teal-600 px-4 text-sm font-semibold text-white hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
                    onClick={() => setGuestSelectorOpen(false)}
                  >
                    Aplicar
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
