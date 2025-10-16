import { FormEvent, useMemo, useState } from 'react';

import { Button, Card, Stack, Text, TextInput } from '../../Core';
import { StepperInput } from '../../Core/Inputs/StepperInput';
import { formatCurrency } from '../../../utils';

export interface BookingWidgetValue {
  checkIn?: string;
  checkOut?: string;
  guests: number;
}

export interface BookingWidgetProps {
  nightlyRate: number;
  cleaningFee?: number;
  serviceFee?: number;
  currency?: string;
  disabled?: boolean;
  loading?: boolean;
  onSubmit: (value: BookingWidgetValue) => void;
  onContactHost?: () => void;
}

export const BookingWidget = ({
  nightlyRate,
  cleaningFee = 0,
  serviceFee = 0,
  currency = 'BRL',
  disabled = false,
  loading = false,
  onSubmit,
  onContactHost,
}: BookingWidgetProps) => {
  const [value, setValue] = useState<BookingWidgetValue>({
    guests: 1,
  });

  const total = useMemo(() => {
    const nights = value.checkIn && value.checkOut ? Math.max(1, calculateNights(value.checkIn, value.checkOut)) : 1;
    const nightlyTotal = nightlyRate * nights;
    return {
      nights,
      subtotal: nightlyTotal,
      total: nightlyTotal + cleaningFee + serviceFee,
    };
  }, [cleaningFee, nightlyRate, serviceFee, value.checkIn, value.checkOut]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <Card padding="md" className="sticky top-28 flex flex-col gap-md">
      <header className="flex items-baseline justify-between">
        <Text as="span" size="lg" weight="semibold">
          {formatCurrency(nightlyRate, { currency })}{' '}
          <span className="text-sm font-normal text-text-secondary">/ noite</span>
        </Text>
        <Text as="span" size="sm" tone="secondary">
          {total.nights} noite{total.nights > 1 ? 's' : ''}
        </Text>
      </header>

      <form className="flex flex-col gap-sm" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-sm">
          <TextInput
            label="Check-in"
            type="date"
            value={value.checkIn ?? ''}
            onChange={(event) => setValue((prev) => ({ ...prev, checkIn: event.target.value }))}
            disabled={disabled}
            required
          />
          <TextInput
            label="Check-out"
            type="date"
            value={value.checkOut ?? ''}
            onChange={(event) => setValue((prev) => ({ ...prev, checkOut: event.target.value }))}
            disabled={disabled}
            required
          />
          <StepperInput
            label="Hóspedes"
            min={1}
            value={value.guests}
            onChange={(guests) => setValue((prev) => ({ ...prev, guests }))}
            disabled={disabled}
          />
        </div>

        <Button type="submit" loading={loading} disabled={disabled} data-evt="cta_click" data-ctx="booking_reserve">
          Reservar
        </Button>
      </form>

      <Button
        type="button"
        variant="secondary"
        disabled={disabled}
        onClick={onContactHost}
        data-evt="cta_click"
        data-ctx="booking_contact_host"
      >
        Contatar anfitrião
      </Button>

      <Stack gap="2xs">
        <Text as="span" size="sm" tone="secondary">
          Resumo
        </Text>
        <div className="flex items-center justify-between text-sm">
          <span>
            {formatCurrency(nightlyRate, { currency })} × {total.nights} noite{total.nights > 1 ? 's' : ''}
          </span>
          <span>{formatCurrency(total.subtotal, { currency })}</span>
        </div>
        {cleaningFee > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span>Taxa de limpeza</span>
            <span>{formatCurrency(cleaningFee, { currency })}</span>
          </div>
        )}
        {serviceFee > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span>Taxa de serviço</span>
            <span>{formatCurrency(serviceFee, { currency })}</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-border-subtle pt-2 text-base font-semibold text-text-primary">
          <span>Total</span>
          <span>{formatCurrency(total.total, { currency })}</span>
        </div>
      </Stack>
    </Card>
  );
};

const calculateNights = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
};
