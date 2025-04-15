import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import flowbitePlugin from 'flowbite/plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),flowbitePlugin],
  server: {
    proxy: {
      "/api/": "http://localhost:5000",
      // "/uploads/": "http://localhost:5000",
    },
  },
})
