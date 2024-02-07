/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {

      colors: {
        'glass': 'rgba(255, 255, 255, 0.1)',
        'milk': '#f0f0f0',
        'graySec': '#767677',
        'themeCyan': '#08e0f0',
        'navy': '#0f172a',
        'blackHole': '#020202',
        'lightBlack': '#0e0e0e',
        'blackBg': '#171717',
        'grayCard': {
          '400': '#252525',
          '600': '#292929',
          '800': '#2c2c2c'
        }
      },

      backgroundImage: {
        'glassy-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)',
      },

      boxShadow: {
        'themeCyan': '0 0 10px #08e0f0',
        'neonCyan': '0 0 10px #08e0f0, 0 0 20px #08e0f0',
      },

      animation: {
        'RGB': 'animateRGB 10s linear infinite',
        'rot5': 'rot5 1s infinite',
      },

      keyframes: {
        animateRGB: {
          '0%': {filter: 'hue-rotate(0deg)'},
          '100%': {filter: 'hue-rotate(360deg)'},
        },

        rot5: {
          '0%': {transform: 'rotate(0)'},
          '50%': {
            transform: 'rotate(180deg)',
            borderTopColor: '#f0f0f0',
            borderBottomColor: '#f0f0f0',
            borderRightColor: 'transparent',
            borderLeftColor: 'transparent'
          },
          '100%': {transform: 'rotate(360deg)'}
        }
      },

    }
  },

  plugins: [],
}