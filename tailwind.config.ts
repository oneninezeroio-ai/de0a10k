import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}','./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        brand: { 50:'#F5F0FF',100:'#EDE5FF',200:'#D9CCFF',300:'#B899FF',400:'#9466FF',500:'#7C3AED',600:'#6D28D9',700:'#5B21B6',800:'#4C1D95',900:'#3B0764' },
        gold:  { 50:'#FFFBEB',100:'#FEF3C7',200:'#FDE68A',300:'#FCD34D',400:'#FBBF24',500:'#F59E0B',600:'#D97706',700:'#B45309',800:'#92400E',900:'#78350F' },
      },
      animation: {
        'spinSlow': 'spinSlow 0.7s linear infinite',
        'orbFloat': 'orbFloat 14s ease-in-out infinite',
        'shimmer':  'shimmer 1.5s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}
export default config
