import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Arial', 'Helvetica', 'sans-serif'], // Basic system sans-serif
        headline: ['"Times New Roman"', 'Times', 'serif'], // Basic system serif
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        'header-title-background': 'hsl(var(--header-title-background))',
        'header-title-text': 'hsl(var(--header-title-text))',
        'header-subtitle-text': 'hsl(var(--header-subtitle-text))',
        'info-bar-background': 'hsl(var(--info-bar-background))',
        'info-bar-text': 'hsl(var(--info-bar-text))',
        'announcement-bar-background': 'hsl(var(--announcement-bar-background))',
        'announcement-bar-text': 'hsl(var(--announcement-bar-text))',
        
        'poll-background': 'hsl(var(--poll-background))',
        'poll-title-text': 'hsl(var(--poll-title-text))',
        'poll-option-border': 'hsl(var(--poll-option-border))',

        'rules-background': 'hsl(var(--rules-background))',
        'rules-border': 'hsl(var(--rules-border))',
        'rules-text': 'hsl(var(--rules-text))',

        'form-background': 'hsl(var(--form-background))',
        'form-label-text': 'hsl(var(--form-label-text))',
        'form-input-background': 'hsl(var(--form-input-background))',
        'form-input-border': 'hsl(var(--form-input-border))',
        'form-button-background': 'hsl(var(--form-button-background))',
        'form-button-text': 'hsl(var(--form-button-text))',
        'form-button-border': 'hsl(var(--form-button-border))',

        'thread-card-background': 'hsl(var(--thread-card-background))',
        'thread-card-border': 'hsl(var(--thread-card-border))',
        'comment-card-background': 'hsl(var(--comment-card-background))',
        'comment-card-border': 'hsl(var(--comment-card-border))',

        'footer-background': 'hsl(var(--footer-background))',
        'footer-text': 'hsl(var(--footer-text))',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
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
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: '0rem', // Sharp corners
        md: '0rem', // Sharp corners
        sm: '0rem', // Sharp corners
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Scroll by half the total width (content is duplicated)
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        marquee: 'marquee 40s linear infinite', // Adjust duration as needed
      },
      boxShadow: { // Remove default shadows
        sm: 'none',
        DEFAULT: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        '2xl': 'none',
        inner: 'none',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
