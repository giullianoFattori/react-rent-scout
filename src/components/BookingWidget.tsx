import { useMemo, useState } from 'react';

interface BookingWidgetProps {
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
}

export const BookingWidget = ({ pricePerNight, rating, reviewsCount }: BookingWidgetProps) => {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);

  const nights = useMemo(() => {
    if (!checkin || !checkout) {
      return 1;
    }

    const [checkinDay, checkinMonth, checkinYear] = checkin.split('/').map(Number);
    const [checkoutDay, checkoutMonth, checkoutYear] = checkout.split('/').map(Number);

    if (
      Number.isNaN(checkinDay) ||
      Number.isNaN(checkinMonth) ||
      Number.isNaN(checkinYear) ||
      Number.isNaN(checkoutDay) ||
      Number.isNaN(checkoutMonth) ||
      Number.isNaN(checkoutYear)
    ) {
      return 1;
    }

    const checkinDate = new Date(checkinYear, checkinMonth - 1, checkinDay);
    const checkoutDate = new Date(checkoutYear, checkoutMonth - 1, checkoutDay);
    const diff = checkoutDate.getTime() - checkinDate.getTime();
    const totalNights = Math.round(diff / (1000 * 60 * 60 * 24));

    return Number.isFinite(totalNights) && totalNights > 0 ? totalNights : 1;
  }, [checkin, checkout]);

  const subtotal = pricePerNight * nights;
  const fee = Math.round(subtotal * 0.12);
  const total = subtotal + fee;

  const baseInputClassName =
    'h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600';

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-5">
      <div className="flex items-baseline justify-between">
        <div className="text-slate-900">
          <span className="text-xl font-semibold">R$ {pricePerNight}</span>{' '}
          <span className="text-sm text-slate-600">/ noite</span>
        </div>
        <div className="text-sm text-slate-600">
          ★ {rating.toFixed(2)} · {reviewsCount} avaliações
        </div>
      </div>

      <form className="mt-4 space-y-3" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="checkin" className="sr-only">
            Check-in
          </label>
          <input
            id="checkin"
            name="checkin"
            value={checkin}
            onChange={(event) => setCheckin(event.target.value)}
            placeholder="Check-in (dd/mm/aaaa)"
            className={baseInputClassName}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="checkout" className="sr-only">
            Check-out
          </label>
          <input
            id="checkout"
            name="checkout"
            value={checkout}
            onChange={(event) => setCheckout(event.target.value)}
            placeholder="Check-out (dd/mm/aaaa)"
            className={baseInputClassName}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="guests" className="sr-only">
            Hóspedes
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
            className={baseInputClassName}
          />
        </div>
        <button
          type="submit"
          className="h-11 w-full rounded-lg bg-teal-600 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
        >
          Reservar
        </button>
      </form>

      <div className="mt-4 space-y-1 text-sm text-slate-700">
        <div className="flex items-center justify-between">
          <span>
            R$ {pricePerNight} × {nights} {nights > 1 ? 'noites' : 'noite'}
          </span>
          <span>R$ {subtotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxas</span>
          <span>R$ {fee}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-medium text-slate-900">
          <span>Total</span>
          <span>R$ {total}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
