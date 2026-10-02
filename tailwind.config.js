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
        cream: {
          DEFAULT: '#faf8f4',
          dark: '#efe9dd',
        },
        sage: {
          DEFAULT: '#6b8f71',
          dark: '#56755b',
          light: '#e9efe9',
        },
        olive: {
          DEFAULT: '#2c3320',
          light: '#3d472c',
        },
        gold: {
          DEFAULT: '#e6d8b8',
          dark: '#d4c096',
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Barlow Condensed"', 'serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      backgroundImage: {
        'glow-radial': 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15), transparent 70%)',
        'glow-amber': 'radial-gradient(circle at center, rgba(245, 158, 11, 0.12), transparent 70%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
