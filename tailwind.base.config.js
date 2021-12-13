module.exports = {
  purge: {
    enabled: process.env.TAILWIND_MODE === 'build',
  },
  darkMode: false, // or 'media' or 'class',
  theme: {
    inset: {
      '1/10': '10%',
      '1/2': '50%',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-lighter': 'var(--color-primary-lighter)',
        'primary-lightest': 'var(--color-primary-lightest)',
        'primary-darker': 'var(--color-primary-darker)',
        'primary-darkest': 'var(--color-primary-darkest)',
        secondary: 'var(--color-secondary)',
        'secondary-lighter': 'var(--color-secondary-lighter)',
        'secondary-lightest': 'var(--color-secondary-lightest)',
        'secondary-darker': 'var(--color-secondary-darker)',
        'secondary-darkest': 'var(--color-secondary-darkest)',
        main: 'var(--color-main)',
        background: 'var(--color-background)',
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        orange: {
          50: '#fff8f1',
          100: '#feecdc',
          200: '#fcd9bd',
          300: '#fdba8c',
          400: '#ff8a4c',
          500: '#ff5a1f',
          600: '#d03801',
          700: '#b43403',
          800: '#8a2c0d',
          900: '#73230d',
        },
      },
      boxShadow: {
        primary:
          '0 0 37px -10px var(--color-primary-lightest), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
        'primary-light': '0 0 44px 0 rgba(5, 31, 156, 0.09)',
      },
      fontFamily: {
        sans: 'var(--font-family-main, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
        serif:
          'var(--font-family-title, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
        title:
          'var(--font-family-title, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)', // alias for serif
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      },
      fontSize: {
        13: '13px',
        21: [
          '21px',
          {
            lineHeight: '25px',
          },
        ],
        28: '28px',
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    visibility: ['responsive', 'group-hover'],
    opacity: ['disabled'],
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
