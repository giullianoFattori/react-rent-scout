import { useId } from 'react';

import { Text } from '../../Core';
import { formatCurrency } from '../../../utils';

type PricePeriod = 'noite' | 'semana' | 'mês';

export interface PriceTagProps {
  amount: number;
  currency?: string;
  period?: PricePeriod;
  taxesInfo?: string;
}

export const PriceTag = ({ amount, currency = 'BRL', period = 'noite', taxesInfo }: PriceTagProps) => {
  const tooltipId = useId();

  return (
    <div className="flex flex-col gap-1 text-right">
      <Text as="span" size="lg" weight="semibold">
        {formatCurrency(amount, { currency })} <span className="text-sm font-normal text-text-secondary">/ {period}</span>
      </Text>
      {taxesInfo && (
        <Text
          as="span"
          size="sm"
          tone="muted"
          aria-describedby={tooltipId}
          role="note"
          className="inline-flex items-center gap-1"
        >
          + taxas
          <span
            id={tooltipId}
            className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs text-text-secondary"
          >
            {taxesInfo}
          </span>
        </Text>
      )}
    </div>
  );
};
