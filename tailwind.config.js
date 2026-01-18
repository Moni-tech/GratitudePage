/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tribute: {
          bg: {
            dark: '#050505',    // Obsidian
            light: '#121212',   // Deep Charcoal
            paper: '#0A0505',   // Dark Glass Base (Replaces White Paper)
            glass: 'rgba(20, 10, 10, 0.4)', // Dark Warm Glass
          },
          text: {
            primary: '#F0F0F0',   // Mist White
            secondary: '#A0A0A0', // Cool Grey
            ink: '#E8D5C4',       // Pale Warm Mist (Light text for dark glass)
            dim: 'rgba(240, 240, 240, 0.5)', // Low contrast
          },
          accent: '#E09F3E',      // Luminous Amber
          seal: '#4A0404',        // Deep Wine
          copper: '#B87333',      // Antique Copper
        }
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
