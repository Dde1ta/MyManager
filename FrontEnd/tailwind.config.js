/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // THIS IS REQUIRED!
  safelist: [
    {
      // Safelist for folder colors
      pattern: /(bg|text|border)-(blue|green|purple|red|orange|teal|pink)-(500|600)/,
    },
    {
      // Safelist for alert priorities
      pattern: /border-(red|yellow|blue)-500/,
    }
  ],
  theme: {
    extend: {}
  },
  plugins: [
    typography, // Keep this if you're using the note editor
  ],
}