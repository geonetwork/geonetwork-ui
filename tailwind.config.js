module.exports = {
  purge: ['./{apps,libs}/*/src/**/*.{html,ts}'],
  theme: {
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
        grey: {
          '100': 'var(--color-grey-100)',
          '200': 'var(--color-grey-200)',
          '300': 'var(--color-grey-300)',
          '400': 'var(--color-grey-400)',
          '500': 'var(--color-grey-500)',
          '600': 'var(--color-grey-600)',
          '700': 'var(--color-grey-700)',
          '800': 'var(--color-grey-800)',
          '900': 'var(--color-grey-900)',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
