/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        winter: {
          100: '#E0F7FA',
          200: '#B2EBF2',
          900: '#006064'
        }
      },
      animation: {
        'snow': 'snow 10s linear infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        snow: {
          '0%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [],
}
