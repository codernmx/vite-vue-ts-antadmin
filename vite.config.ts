import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from "path"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    host: '0.0.0.0',
    hmr: true,
    port: 100,
    cors: true, // 允许跨域
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/',//测试环境
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
