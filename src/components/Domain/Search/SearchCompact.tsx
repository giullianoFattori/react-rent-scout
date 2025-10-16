import { FormEvent, useId, useMemo, useState } from 'react';

import { Button, Stack, TextInput } from '../../Core';
import { StepperInput } from '../../Core/Inputs/StepperInput';
import { VisuallyHidden } from '../../Core/A11y/VisuallyHidden';
import { Text } from '../../Core/Typography/Text';

export interface GuestsValue {
  adults: number;
  children: number;
  infants: number;
}

export interface DateRangeValue {
  checkIn?: string;
  checkOut?: string;
}

export interface SearchCompactValue {
  location: string;
  dateRange: DateRangeValue;
  guests: GuestsValue;
}

type SearchVariant = 'inline' | 'block';

export interface SearchCompactProps {
  initialValue?: SearchCompactValue;
  onSubmit: (value: SearchCompactValue) => void;
  variant?: SearchVariant;
  loading?: boolean;
}

const defaultGuests: GuestsValue = {
  adults: 1,
  children: 0,
  infants: 0,
};

export const SearchCompact = ({
  initialValue,
  onSubmit,
  variant = 'inline',
  loading = false,
}: SearchCompactProps) => {
  const [location, setLocation] = useState(initialValue?.location ?? '');
  const [dateRange, setDateRange] = useState<DateRangeValue>(initialValue?.dateRange ?? {});
  const [guests, setGuests] = useState<GuestsValue>(initialValue?.guests ?? defaultGuests);

  const id = useId();

  const guestsSummary = useMemo(() => {
    const totalGuests = guests.adults + guests.children;
    const parts = [];
    if (totalGuests > 0) {
      parts.push(`${totalGuests} hóspede${totalGuests > 1 ? 's' : ''}`);
    }
    if (guests.infants > 0) {
      parts.push(`${guests.infants} bebê${guests.infants > 1 ? 's' : ''}`);
    }
    return parts.join(', ') || 'Selecione hóspedes';
  }, [guests]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      location,
      dateRange,
      guests,
    });
  };

  const formLayout =
    variant === 'inline'
      ? 'grid w-full grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.75fr)_auto]'
      : 'flex w-full flex-col gap-sm rounded-xl border border-border-subtle bg-surface-base p-md shadow-sm';

  return (
    <form
      onSubmit={handleSubmit}
      className={formLayout}
      data-evt="search_submit"
      data-ctx={variant === 'inline' ? 'header_search' : 'home_search'}
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <TextInput
          label="Destino"
          placeholder="Para onde você quer ir?"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          hideLabel={variant === 'inline'}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-checkin`} className="text-sm font-medium text-text-secondary">
          Check-in
        </label>
        <input
          id={`${id}-checkin`}
          type="date"
          className="h-11 rounded-md border border-border-subtle bg-surface-base px-4 text-sm text-text-primary focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring focus-visible:ring-brand-400/40"
          value={dateRange.checkIn ?? ''}
          onChange={(event) => setDateRange((prev) => ({ ...prev, checkIn: event.target.value }))}
          aria-label="Data de check-in"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-checkout`} className="text-sm font-medium text-text-secondary">
          Check-out
        </label>
        <input
          id={`${id}-checkout`}
          type="date"
          className="h-11 rounded-md border border-border-subtle bg-surface-base px-4 text-sm text-text-primary focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring focus-visible:ring-brand-400/40"
          value={dateRange.checkOut ?? ''}
          onChange={(event) => setDateRange((prev) => ({ ...prev, checkOut: event.target.value }))}
          aria-label="Data de check-out"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-text-secondary">Hóspedes</span>
        <Stack gap="xs" className="rounded-md border border-border-subtle bg-surface-base p-sm">
          <VisuallyHidden>
            <legend>Selecionar hóspedes</legend>
          </VisuallyHidden>
          <Stack direction="horizontal" justify="between" align="center">
            <Stack gap="3xs">
              <Text size="md" weight="medium">
                Adultos
              </Text>
              <Text size="sm" tone="muted">
                13 anos ou mais
              </Text>
            </Stack>
            <StepperInput
              label="Adultos"
              aria-label="Quantidade de adultos"
              hideLabel
              min={1}
              value={guests.adults}
              onChange={(value) => setGuests((prev) => ({ ...prev, adults: value }))}
            />
          </Stack>

          <Stack direction="horizontal" justify="between" align="center">
            <Stack gap="3xs">
              <Text size="md" weight="medium">
                Crianças
              </Text>
              <Text size="sm" tone="muted">
                2 a 12 anos
              </Text>
            </Stack>
            <StepperInput
              label="Crianças"
              aria-label="Quantidade de crianças"
              hideLabel
              min={0}
              value={guests.children}
              onChange={(value) => setGuests((prev) => ({ ...prev, children: value }))}
            />
          </Stack>

          <Stack direction="horizontal" justify="between" align="center">
            <Stack gap="3xs">
              <Text size="md" weight="medium">
                Bebês
              </Text>
              <Text size="sm" tone="muted">
                Menos de 2 anos
              </Text>
            </Stack>
            <StepperInput
              label="Bebês"
              aria-label="Quantidade de bebês"
              hideLabel
              min={0}
              value={guests.infants}
              onChange={(value) => setGuests((prev) => ({ ...prev, infants: value }))}
            />
          </Stack>
        </Stack>
        <VisuallyHidden>
          <output>{guestsSummary}</output>
        </VisuallyHidden>
      </div>

      <div className="flex items-end">
        <Button type="submit" loading={loading} className="w-full sm:w-auto" data-evt="cta_click" data-ctx="search_submit">
          Buscar
        </Button>
      </div>
    </form>
  );
};
