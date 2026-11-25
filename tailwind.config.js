/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Dharana brand palette (sampled from the client logo) ----
        rose: {
          DEFAULT: '#C99086', // primary: dusty rosy terracotta (logo background)
          dark: '#B67B71',
        },
        clay: {
          DEFAULT: '#8B5D55', // secondary: muted rose brown (ivory text passes AA on it)
          dark: '#734A43',
        },
        blush: {
          DEFAULT: '#EED5CE', // accent: soft blush pink
          light: '#F7E9E4',
        },
        ivory: '#F6EFE4', // logo lettering colour
        cream: {
          DEFAULT: '#FBF7F1', // page background
          dark: '#EFE4D6',
        },
        sand: '#F3EADF',
        umber: {
          DEFAULT: '#3E2A26', // body text, passes AA on cream and on rose
          light: '#5A423C',
          muted: '#7A6159',
        },
        line: '#E6D7CA',
        // Legacy names kept as aliases so the checkout, plans and admin
        // screens pick up the brand without being rewritten.
        sage: {
          DEFAULT: '#8B5D55',
          dark: '#734A43',
          light: '#F7E9E4',
        },
        olive: {
          DEFAULT: '#3E2A26',
          light: '#5A423C',
        },
        gold: {
          DEFAULT: '#EED5CE',
          dark: '#D9B3A8',
        },
        uh: {
          sand: '#F5F2E9',
          sandDark: '#E8E3D7',
          linen: '#C4BEB1',
          linenDark: '#B3ACA0',
          blue: '#1c3fe4',
          blueHover: '#1430b8',
          dark: '#111111',
          black: '#000000',
          card: '#161616',
          border: '#E5E0D5',
        },
        obsidian: {
          950: '#030303',
          900: '#080808',
          850: '#0E0E0E',
          800: '#141414',
          700: '#1F1F1F',
          600: '#2A2A2A',
        },
        emerald: {
          glow: '#00F59B',
          vibrant: '#10B981',
          deep: '#059669',
        },
        solar: {
          amber: '#F59E0B',
          orange: '#FF6B00',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-heading)', 'Georgia', 'serif'],
        display: ['var(--font-heading)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'glow-radial': 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15), transparent 70%)',
        'glow-amber': 'radial-gradient(circle at center, rgba(245, 158, 11, 0.12), transparent 70%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0.001', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
    },
  },
  plugins: [],
};
