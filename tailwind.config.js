/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EAF7FF',
          100: '#D5EFFF',
          200: '#AAE0FF',
          300: '#80D0FF',
          400: '#55C1FF',
          500: '#0070BA', // PayPal primary blue
          600: '#003087', // PayPal dark blue
          700: '#002C6E',
          800: '#002356',
          900: '#001A3D',
        },
        secondary: {
          50: '#F5F7FA',
          100: '#E4E9F2',
          200: '#CBD4E1',
          300: '#A8B9CC',
          400: '#8EA3B9',
          500: '#169BD7', // PayPal secondary blue
          600: '#142C8E',
          700: '#0E1F66',
          800: '#091340',
          900: '#040919',
        },
        success: '#2C9B00', // PayPal green
        warning: '#FFB700', // PayPal yellow
        danger: '#C72E2E',  // PayPal red
      },
      fontFamily: {
        sans: ['PayPal Sans Big', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '4px',
        'lg': '8px',
      },
      boxShadow: {
        'paypal': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'paypal-hover': '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}