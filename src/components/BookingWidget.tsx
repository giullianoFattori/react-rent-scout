import { useMemo, useState } from 'react';
import { diffDays, fmtBRL, isBlocked, maskDate, parseDMY } from '../utils/datePrice';

type BookingWidgetProps = {
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  minNights?: number;
  cleaningFee?: number;
  serviceFeeRate?: number;
  blockedDates?: string[];
};

const inputBase =
  'h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600';
const btnPrimary =
  'h-11 w-full rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600';
const helpText = 'mt-1 text-sm';

const BookingWidget = ({
  pricePerNight,
  rating,
  reviewsCount,
  minNights = 1,
  cleaningFee = 80,
  serviceFeeRate = 0.12,
  blockedDates = [],
}: BookingWidgetProps) => {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);

  const parsedCheckin = useMemo(() => parseDMY(checkin), [checkin]);
  const parsedCheckout = useMemo(() => parseDMY(checkout), [checkout]);
  const nights = useMemo(() => {
    if (!parsedCheckin || !parsedCheckout) {
      return 0;
    }

    return Math.max(0, diffDays(parsedCheckin, parsedCheckout));
  }, [parsedCheckin, parsedCheckout]);

  const errors: Record<'checkin' | 'checkout', string | undefined> = {
    checkin: undefined,
    checkout: undefined,
  };

  if (checkin && !parsedCheckin) {
    errors.checkin = 'Digite uma data válida (dd/mm/aaaa).';
  } else if (checkin && isBlocked(checkin, blockedDates)) {
    errors.checkin = 'Data indisponível.';
  }

  if (checkout && !parsedCheckout) {
    errors.checkout = 'Digite uma data válida (dd/mm/aaaa).';
  } else if (checkout && isBlocked(checkout, blockedDates)) {
    errors.checkout = 'Data indisponível.';
  }

  if (!errors.checkin && !errors.checkout && parsedCheckin && parsedCheckout) {
    if (nights <= 0) {
      errors.checkout = 'A data de saída deve ser após a de entrada.';
    } else if (nights < minNights) {
      errors.checkout = `Mínimo de ${minNights} ${minNights > 1 ? 'noites' : 'noite'}.`;
    }
  }

  const subtotal = nights * pricePerNight;
  const serviceFee = Math.round(subtotal * serviceFeeRate);
  const cleaning = nights > 0 ? cleaningFee : 0;
  const total = subtotal + serviceFee + cleaning;

  const canBook = Boolean(
    parsedCheckin &&
      parsedCheckout &&
      nights >= minNights &&
      !errors.checkin &&
      !errors.checkout,
  );

  const statusMessage =
    (checkin && isBlocked(checkin, blockedDates)) ||
    (checkout && isBlocked(checkout, blockedDates))
      ? 'Algumas datas selecionadas estão indisponíveis.'
      : undefined;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-5">
      <div className="flex items-baseline justify-between">
        <div className="text-slate-900">
          <span className="text-xl font-semibold">{fmtBRL(pricePerNight)}</span>
          <span className="text-sm text-slate-600"> / noite</span>
        </div>
        <div className="text-sm text-slate-600">★ {rating.toFixed(2)} · {reviewsCount} avaliações</div>
      </div>

      <form className="mt-4 space-y-3" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="checkin" className="sr-only">
            Check-in
          </label>
          <input
            id="checkin"
            inputMode="numeric"
            placeholder="Check-in (dd/mm/aaaa)"
            value={checkin}
            onChange={(event) => setCheckin(maskDate(event.target.value))}
            aria-invalid={Boolean(errors.checkin)}
            aria-describedby={errors.checkin ? 'checkin-error' : undefined}
            className={`${inputBase} ${
              errors.checkin ? 'border-red-500 focus:ring-red-600 focus:border-red-600' : ''
            }`}
            autoComplete="off"
          />
          {errors.checkin ? (
            <p id="checkin-error" className={`${helpText} text-red-600`}>
              {errors.checkin}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="checkout" className="sr-only">
            Check-out
          </label>
          <input
            id="checkout"
            inputMode="numeric"
            placeholder="Check-out (dd/mm/aaaa)"
            value={checkout}
            onChange={(event) => setCheckout(maskDate(event.target.value))}
            aria-invalid={Boolean(errors.checkout)}
            aria-describedby={errors.checkout ? 'checkout-error' : undefined}
            className={`${inputBase} ${
              errors.checkout ? 'border-red-500 focus:ring-red-600 focus:border-red-600' : ''
            }`}
            autoComplete="off"
          />
          {errors.checkout ? (
            <p id="checkout-error" className={`${helpText} text-red-600`}>
              {errors.checkout}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="guests" className="sr-only">
            Hóspedes
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            value={guests}
            onChange={(event) => setGuests(Math.max(1, Number(event.target.value) || 1))}
            className={inputBase}
          />
        </div>
        <button
          type="submit"
          className={`${btnPrimary} ${!canBook ? 'cursor-not-allowed opacity-60' : ''}`}
          disabled={!canBook}
        >
          Reservar
        </button>
      </form>

      <div className="mt-4 space-y-1 text-sm text-slate-700">
        <div className="flex items-center justify-between">
          <span>
            {fmtBRL(pricePerNight)} × {nights || 0} {nights === 1 ? 'noite' : 'noites'}
          </span>
          <span>{fmtBRL(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxa de serviço ({Math.round(serviceFeeRate * 100)}%)</span>
          <span>{fmtBRL(serviceFee)}</span>
        </div>
        {nights > 0 ? (
          <div className="flex items-center justify-between">
            <span>Taxa de limpeza</span>
            <span>{fmtBRL(cleaning)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-medium text-slate-900">
          <span>Total</span>
          <span>{fmtBRL(total)}</span>
        </div>
      </div>

      {statusMessage ? (
        <p className="mt-2 text-sm text-amber-700">{statusMessage}</p>
      ) : null}
    </div>
  );
};

export default BookingWidget;
