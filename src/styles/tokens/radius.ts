export const radius = {
  none: '0',
  xs: 'var(--radius-xs)',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  full: '999px',
} as const;

export type RadiusTokens = typeof radius;
