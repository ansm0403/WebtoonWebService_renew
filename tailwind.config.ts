import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes : {
        skeleton : {
          "0%" : { transform : "scale(1.0)" },
          "50%" : { transform : "scale(1.05)" },
          "100%" : { transform : "scale(1.0)" }
        },
      },
      animation : {
        skeleton : "skeleton 0.5s ease-in-out infinite"
      }
    },
  },
  important : true,
  plugins: [],
}
export default config
