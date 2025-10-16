export const typography = {
  fontFamily: {
    sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
    heading: ['"Inter Tight"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
  },
  fontWeight: {
    regular: 'var(--font-weight-regular)',
    medium: 'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold: 'var(--font-weight-bold)',
  },
  fontSize: {
    xs: ['var(--font-size-xs)', 'var(--line-height-xs)'],
    sm: ['var(--font-size-sm)', 'var(--line-height-sm)'],
    md: ['var(--font-size-md)', 'var(--line-height-md)'],
    lg: ['var(--font-size-lg)', 'var(--line-height-lg)'],
    xl: ['var(--font-size-xl)', 'var(--line-height-xl)'],
    '2xl': ['var(--font-size-2xl)', 'var(--line-height-2xl)'],
    '3xl': ['var(--font-size-3xl)', 'var(--line-height-3xl)'],
  },
  lineHeight: {
    xs: 'var(--line-height-xs)',
    sm: 'var(--line-height-sm)',
    md: 'var(--line-height-md)',
    lg: 'var(--line-height-lg)',
    xl: 'var(--line-height-xl)',
    '2xl': 'var(--line-height-2xl)',
    '3xl': 'var(--line-height-3xl)',
  },
} as const;

export type TypographyTokens = typeof typography;
