import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'sky-start': '#50B8E7',
        'sky-1': '#EDF7FC',
        'sky-2': '#C9E8F7',
        'sky-3': '#A5D8F3',
        'sky-end': '#80C9EF',
      },
      contrast: {
        250: '2.5', // 250%
        300: '3.0', // 300%
        400: '4.0', // 400%
      },
      fontFamily: {
        dkCoolCrayon: ['DKCoolCrayon', 'sans-serif'],
        crayonLibre: ['CrayonLibre', 'sans-serif'],
        pastelCrayon: ['PastelCrayon', 'sans-serif'],
      },
    },
  },
  variants: {
    filter: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
} satisfies Config;
