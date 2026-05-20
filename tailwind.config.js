/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        duo: {
          green: '#58CC02',
          'green-dark': '#46a302',
          'green-light': '#89E219',
          blue: '#1CB0F6',
          'blue-dark': '#1899D6',
          red: '#FF4B4B',
          orange: '#FF9600',
          yellow: '#FFC800',
          purple: '#CE82FF',
          'purple-dark': '#A560E8',
          'gray-1': '#AFAFAF',
          'gray-2': '#E5E5E5',
          'gray-3': '#F7F7F7',
          'dark': '#3C3C3C',
          'border': '#E5E5E5',
          'white': '#FFFFFF',
        }
      },
      fontFamily: {
        'din': ['"DIN Round Pro"', '"Nunito"', 'sans-serif'],
        'nunito': ['"Nunito"', 'sans-serif'],
      },
      boxShadow: {
        'duo': '0 4px 0 rgba(0,0,0,0.2)',
        'duo-green': '0 4px 0 #46a302',
        'duo-blue': '0 4px 0 #1899D6',
        'duo-red': '0 4px 0 #CC0000',
        'duo-orange': '0 4px 0 #CC7900',
        'duo-purple': '0 4px 0 #A560E8',
        'duo-gray': '0 4px 0 #AFAFAF',
      },
      animation: {
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.68,-0.55,0.27,1.55)',
        'shake': 'shake 0.5s ease-in-out',
        'pop': 'pop 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-once': 'pulseOnce 0.6s ease-in-out',
        'confetti-fall': 'confettiFall 1s ease-out forwards',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 50%, 90%': { transform: 'translateX(-8px)' },
          '30%, 70%': { transform: 'translateX(8px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseOnce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(80px) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
