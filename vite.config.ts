import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages - update this to your repo name
  // e.g., base: '/harber-auth/' if your repo is named harber-auth
  base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
})
