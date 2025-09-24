import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://doyoun.shop", // ✅ 실제 백엔드
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // "/api" 떼고 전달
      },
    },
  },
})
