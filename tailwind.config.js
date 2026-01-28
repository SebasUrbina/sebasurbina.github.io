/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        helix: {
          cyan: '#00bcd4',
          teal: '#26a69a',
          green: '#4caf50',
          blue: '#489bcf',
          purple: '#4a61a4',
        },
        space: {
          deep: '#0a1929',
          darker: '#050d14',
          terminal: 'rgba(10, 25, 41, 0.85)',
        },
        text: {
          primary: '#e0e0e0',
          bright: '#ffffff',
          dim: '#6b7280',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 188, 212, 0.4)',
        'glow-teal': '0 0 20px rgba(38, 166, 154, 0.3)',
      }
    },
  },
  plugins: [
    typography,
  ],
} 