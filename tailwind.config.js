module.exports = {
  purge: ['./{apps,libs,webcomponents}/*/src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary))',
        'primary-lighter': 'rgb(var(--color-primary-lighter))',
        'primary-lightest': 'rgb(var(--color-primary-lightest))',
        'primary-darker': 'rgb(var(--color-primary-darker))',
        'primary-darkest': 'rgb(var(--color-primary-darkest))',
        secondary: 'rgb(var(--color-secondary))',
        'secondary-lighter': 'rgb(var(--color-secondary-lighter))',
        'secondary-lightest': 'rgb(var(--color-secondary-lightest))',
        'secondary-darker': 'rgb(var(--color-secondary-darker))',
        'secondary-darkest': 'rgb(var(--color-secondary-darkest))',
        main: 'rgb(var(--color-main))',
        background: 'rgb(var(--color-background))',
        gray: {
          '100': 'rgb(var(--color-gray-100))',
          '200': 'rgb(var(--color-gray-200))',
          '300': 'rgb(var(--color-gray-300))',
          '400': 'rgb(var(--color-gray-400))',
          '500': 'rgb(var(--color-gray-500))',
          '600': 'rgb(var(--color-gray-600))',
          '700': 'rgb(var(--color-gray-700))',
          '800': 'rgb(var(--color-gray-800))',
          '900': 'rgb(var(--color-gray-900))',
        },
      },
      backgroundColor: {
        primary: 'rgba(var(--color-primary), var(--bg-opacity, 1))',
        'primary-lighter':
          'rgba(var(--color-primary-lighter), var(--bg-opacity, 1))',
        'primary-lightest':
          'rgba(var(--color-primary-lightest), var(--bg-opacity, 1))',
        'primary-darker':
          'rgba(var(--color-primary-darker), var(--bg-opacity, 1))',
        'primary-darkest':
          'rgba(var(--color-primary-darkest), var(--bg-opacity, 1))',
        secondary: 'rgba(var(--color-secondary), var(--bg-opacity, 1))',
        'secondary-lighter':
          'rgba(var(--color-secondary-lighter), var(--bg-opacity, 1))',
        'secondary-lightest':
          'rgba(var(--color-secondary-lightest), var(--bg-opacity, 1))',
        'secondary-darker':
          'rgba(var(--color-secondary-darker), var(--bg-opacity, 1))',
        'secondary-darkest':
          'rgba(var(--color-secondary-darkest), var(--bg-opacity, 1))',
        main: 'rgba(var(--color-main), var(--bg-opacity, 1))',
        background: 'rgba(var(--color-background), var(--bg-opacity, 1))',
        gray: {
          '100': 'rgba(var(--color-gray-100), var(--bg-opacity, 1))',
          '200': 'rgba(var(--color-gray-200), var(--bg-opacity, 1))',
          '300': 'rgba(var(--color-gray-300), var(--bg-opacity, 1))',
          '400': 'rgba(var(--color-gray-400), var(--bg-opacity, 1))',
          '500': 'rgba(var(--color-gray-500), var(--bg-opacity, 1))',
          '600': 'rgba(var(--color-gray-600), var(--bg-opacity, 1))',
          '700': 'rgba(var(--color-gray-700), var(--bg-opacity, 1))',
          '800': 'rgba(var(--color-gray-800), var(--bg-opacity, 1))',
          '900': 'rgba(var(--color-gray-900), var(--bg-opacity, 1))',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
