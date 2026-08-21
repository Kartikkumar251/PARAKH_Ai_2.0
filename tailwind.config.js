/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        neon: {
          cyan: '#00f5ff',
          purple: '#bf00ff',
          green: '#39ff14',
          pink: '#ff0080',
          yellow: '#ffff00',
        },
        cyber: {
          black: '#020408',
          dark: '#060d14',
          card: '#0a1520',
          border: '#0f2030',
        },
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'bar1': 'bar 0.8s ease-in-out infinite alternate',
        'bar2': 'bar 0.6s ease-in-out infinite alternate',
        'bar3': 'bar 1.1s ease-in-out infinite alternate',
        'bar4': 'bar 0.7s ease-in-out infinite alternate',
        'bar5': 'bar 0.9s ease-in-out infinite alternate',
        'bar6': 'bar 0.5s ease-in-out infinite alternate',
        'bar7': 'bar 1.3s ease-in-out infinite alternate',
        'bar8': 'bar 0.65s ease-in-out infinite alternate',
        'bar9': 'bar 0.85s ease-in-out infinite alternate',
        'bar10': 'bar 1.0s ease-in-out infinite alternate',
        'bar11': 'bar 0.75s ease-in-out infinite alternate',
        'bar12': 'bar 0.55s ease-in-out infinite alternate',
        'glitch': 'glitch 0.4s cubic-bezier(.25,.46,.45,.94) both',
        'ticker': 'ticker 20s linear infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        flicker: {
          '0%, 98%, 100%': { opacity: '1' },
          '99%': { opacity: '0.4' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bar: {
          '0%': { transform: 'scaleY(0.15)' },
          '100%': { transform: 'scaleY(1)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 2px)' },
          '40%': { transform: 'translate(3px, -2px)' },
          '60%': { transform: 'translate(-2px, 3px)' },
          '80%': { transform: 'translate(2px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
