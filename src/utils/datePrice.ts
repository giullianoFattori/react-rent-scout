const toDigits = (value: string) => value.replace(/\D/g, '');

export const maskDate = (value: string) => {
  const digits = toDigits(value).slice(0, 8);
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

export const parseDMY = (value: string): Date | null => {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const [, dd, mm, yyyy] = match;
  const parsed = new Date(Number(yyyy), Number(mm) - 1, Number(dd));

  const isValid =
    parsed.getFullYear() === Number(yyyy) &&
    parsed.getMonth() === Number(mm) - 1 &&
    parsed.getDate() === Number(dd);

  return isValid ? parsed : null;
};

export const diffDays = (start: Date, end: Date) => {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
};

export const fmtBRL = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const isBlocked = (date: string, blocked: string[]) => blocked.includes(date);
