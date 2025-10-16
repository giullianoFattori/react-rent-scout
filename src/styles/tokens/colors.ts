const createScale = (token: string) =>
  ({
    1: `var(--${token}-1)`,
    2: `var(--${token}-2)`,
    3: `var(--${token}-3)`,
    4: `var(--${token}-4)`,
    5: `var(--${token}-5)`,
    6: `var(--${token}-6)`,
    7: `var(--${token}-7)`,
    8: `var(--${token}-8)`,
    9: `var(--${token}-9)`,
    10: `var(--${token}-10)`,
    11: `var(--${token}-11)`,
    12: `var(--${token}-12)`,
  }) as const;

const primaryScale = createScale('primary');
const neutralScale = createScale('neutral');
const accentScale = createScale('accent');
const successScale = createScale('success');
const warningScale = createScale('accent');
const errorScale = createScale('error');

const brandLegacy = {
  50: 'var(--color-brand-50)',
  100: 'var(--color-brand-100)',
  200: 'var(--color-brand-200)',
  300: 'var(--color-brand-300)',
  400: 'var(--color-brand-400)',
  500: 'var(--color-brand-500)',
  600: 'var(--color-brand-600)',
  700: 'var(--color-brand-700)',
  800: 'var(--color-brand-800)',
  900: 'var(--color-brand-900)',
  950: 'var(--color-brand-950)',
} as const;

const accentLegacy = {
  50: 'var(--color-accent-50)',
  100: 'var(--color-accent-100)',
  200: 'var(--color-accent-200)',
  300: 'var(--color-accent-300)',
  400: 'var(--color-accent-400)',
  500: 'var(--color-accent-500)',
  600: 'var(--color-accent-600)',
  700: 'var(--color-accent-700)',
  800: 'var(--color-accent-800)',
  900: 'var(--color-accent-900)',
  950: 'var(--color-accent-950)',
} as const;

const neutralLegacy = {
  50: 'var(--color-neutral-50)',
  100: 'var(--color-neutral-100)',
  200: 'var(--color-neutral-200)',
  300: 'var(--color-neutral-300)',
  400: 'var(--color-neutral-400)',
  500: 'var(--color-neutral-500)',
  600: 'var(--color-neutral-600)',
  700: 'var(--color-neutral-700)',
  800: 'var(--color-neutral-800)',
  900: 'var(--color-neutral-900)',
  950: 'var(--color-neutral-950)',
} as const;

export const colors = {
  primary: primaryScale,
  neutralScale,
  accentScale,
  successScale,
  warningScale,
  errorScale,
  brand: brandLegacy,
  accent: accentLegacy,
  neutral: neutralLegacy,
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    disabled: 'var(--color-text-disabled)',
    inverse: 'var(--color-text-inverse)',
  },
  surface: {
    base: 'var(--color-surface-base)',
    muted: 'var(--color-surface-muted)',
    elevated: 'var(--color-surface-elevated)',
    overlay: 'var(--color-surface-overlay)',
    bg: 'var(--color-bg)',
  },
  border: {
    subtle: 'var(--color-border-subtle)',
    strong: 'var(--color-border-strong)',
    focus: 'var(--color-border-focus)',
  },
  feedback: {
    success: 'var(--color-accent-ok)',
    warning: 'var(--color-accent-warn)',
    error: 'var(--color-accent-err)',
    info: 'var(--color-info)',
  },
} as const;

export type ColorTokens = typeof colors;
