export const capitalize = (value: string) => {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

interface CurrencyFormatterOptions {
  currency?: string;
  minimumFractionDigits?: number;
}

export const formatCurrency = (
  value: number,
  { currency = 'BRL', minimumFractionDigits = 0 }: CurrencyFormatterOptions = {}
) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits: 2,
  }).format(value);
