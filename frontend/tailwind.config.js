/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        background:"#FFFFFF",
        text:"#313338",
        accent:"#00AC8C",
        error:"#F24444",
      },
    },
  },
  plugins: [],
}
