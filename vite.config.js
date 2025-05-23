import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': 'http://localhost:4444',
      '/works': 'http://localhost:4444'
    }
  },
  plugins: [react(),tailwindcss()],
})
