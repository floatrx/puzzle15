import { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(var(--background))',
          foreground: 'hsl(var(--background-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      spacing: {
        board: 'clamp(30px, 5vh, 5vh)',
      },
      size: {
        cell: 'clamp(80px, 10vw, 130px)',
      },
    },
  },
  plugins: [],
} satisfies Config;
