import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    watch: {
      ignored: [
        '**/第二次修改/**',
        '**/第三次修改/**',
        '**/第四次修改/**',
        '**/界面/**',
        '**/tmp/**',
      ],
    },
  },
})
