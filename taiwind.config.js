module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      transform: ['hover', 'focus'],
      keyframes: {
        'drop-to-left-bucket': {
          '0%': {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
          '50%': {
            top: '30%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
          },
          '100%': {
            top: '70%',
            left: '25%',
            transform: 'translate(-50%, -50%)',
            opacity: 0
          }
        },
        'drop-to-right-bucket': {
          '0%': {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
          '50%': {
            top: '30%',
            left: '70%',
            transform: 'translate(-50%, -50%)',
          },
          '100%': {
            top: '70%',
            left: '75%',
            transform: 'translate(-50%, -50%)',
            opacity: 0
          }
        }
      },
      animation: {
        'drop-to-left-bucket': 'drop-to-left-bucket 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'drop-to-right-bucket': 'drop-to-right-bucket 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [],
}