/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0e0d14',
        bone: '#efece5',
        signal: '#a855f7',
        'signal-dim': 'rgba(168,85,247,0.4)',
        hud: 'rgba(239,236,229,0.45)',
        'ink-2': '#16151c',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['Fraunces', 'ui-serif', 'serif'],
        news: ['Newsreader', 'ui-serif', 'serif'],
      },
      animation: {
        'dot-drift': 'dotDrift 2s ease-in-out infinite',
        'blink': 'blink 1.05s steps(1) infinite',
        'ping-ring': 'pingRing 1.6s ease-out infinite',
        'signal-ping': 'signalPing 1.6s ease-in-out infinite',
        'float-up': 'floatUp .6s ease both',
        'wm-in': 'wmIn .6s cubic-bezier(.2,.7,.2,1) forwards',
        'glitch': 'glitchRise .85s cubic-bezier(.2,.7,.2,1) both',
      },
      keyframes: {
        dotDrift: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        blink: {
          '0%,50%': { opacity: '1' },
          '51%,100%': { opacity: '0' },
        },
        pingRing: {
          '0%': { transform: 'scale(1)', opacity: '.7' },
          '75%,100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        signalPing: {
          '0%,100%': { opacity: '.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wmIn: {
          '0%': { opacity: '0', transform: 'scale(1.08) translateX(24px)', textShadow: '7px 0 rgba(192,132,252,.85),-7px 0 rgba(126,34,206,.85)' },
          '100%': { opacity: '.13', transform: 'none', textShadow: '0 0 transparent' },
        },
        glitchRise: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
    },
  },
  safelist: ['hidden', 'lg:block'],
  plugins: [],
}