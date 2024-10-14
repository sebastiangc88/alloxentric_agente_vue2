/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Esta línea incluye todos los archivos .vue dentro de src
    "./components/detalle_oferta.vue" // Esta línea incluye específicamente tu componente
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

