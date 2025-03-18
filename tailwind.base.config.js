module.exports = {
  theme: {
    extend: {
      screens: {
        xs: '320px',
      },
      colors: {
        'primary-white': 'var(--color-primary-white)',
        'primary-lightest': 'var(--color-primary-lightest)',
        'primary-lighter': 'var(--color-primary-lighter)',
        primary: 'var(--color-primary)',
        'primary-darker': 'var(--color-primary-darker)',
        'primary-darkest': 'var(--color-primary-darkest)',
        'primary-black': 'var(--color-primary-black)',
        'secondary-white': 'var(--color-secondary-white)',
        'secondary-lightest': 'var(--color-secondary-lightest)',
        'secondary-lighter': 'var(--color-secondary-lighter)',
        secondary: 'var(--color-secondary)',
        'secondary-darker': 'var(--color-secondary-darker)',
        'secondary-darkest': 'var(--color-secondary-darkest)',
        'secondary-black': 'var(--color-secondary-black)',
        main: 'var(--color-main)',
        title: 'black',
        background: 'var(--color-background)',
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
          950: 'var(--color-gray-950)',
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
        purple: '#9747FF',
        'purple-light': '#DDC3FF',
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
      },
      opacity: {
        45: 0.45,
      },
      boxShadow: {
        'xl-hover': '0 20px 25px -5px rgb(0 0 0 / 0.2)',
      },
    },
  },
}
