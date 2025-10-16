import { type Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin';
import flowbiteReact from 'flowbite-react/tailwind';
import tailwindcssAnimate from 'tailwindcss-animate';

import { colors, radius, shadows, spacing, typography } from './src/styles/tokens';

const config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius: radius,
      boxShadow: shadows,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      lineHeight: typography.lineHeight,
      fontWeight: typography.fontWeight,
    },
  },
  plugins: [flowbitePlugin, flowbiteReact, tailwindcssAnimate],
} satisfies Config;

export default config;
