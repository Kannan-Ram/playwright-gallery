import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 3002,
    allowedHosts: [
      '.ngrok-free.app',
      '.ngrok.app',
    ],
  },
  build: {
    outDir: 'dist',
  },
})
