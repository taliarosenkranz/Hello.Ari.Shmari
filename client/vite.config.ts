import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Hello.Ari.Shmari/',  // Updated to match new repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
