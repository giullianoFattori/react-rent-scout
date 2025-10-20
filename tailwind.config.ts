import { type Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin';

import { colors as tokenColors, radius, shadows, spacing, typography } from './src/styles/tokens';

const palette = tokenColors as Record<string, any>;

const config = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        ...palette,
        primary: {
          ...palette.primary,
          600: '#0d9488',
          700: '#0f766e',
        },
        neutral: {
          ...palette.neutral,
          bg: '#f8fafc',
          text: '#0f172a',
          sub: '#475569',
          border: '#e2e8f0',
        },
      },
      spacing,
      borderRadius: radius,
      boxShadow: shadows,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      lineHeight: typography.lineHeight,
      fontWeight: typography.fontWeight,
    },
  },
  plugins: [flowbitePlugin],
} satisfies Config;

export default config;
