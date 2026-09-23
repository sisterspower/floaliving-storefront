import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171713',
        ivory: '#f4f0e8',
        paper: '#faf8f3',
        stone: '#ded7ca',
        muted: '#6d685e',
        line: '#d9d3c7',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      spacing: {
        4.5: '18px',
      },
    },
  },
  plugins: [],
} satisfies Config;
