import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api/bgg': {
        target: 'https://api.geekdo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bgg/, '/api'),
        secure: true,
      },
    },
  },
})
