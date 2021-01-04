module.exports = {
  purge: ['./{apps,libs,webcomponents}/*/src/**/*.{html,ts}'],
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
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    visibility: ['responsive', 'group-hover'],
  },
  plugins: [],
}
