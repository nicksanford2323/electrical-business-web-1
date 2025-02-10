import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use '/' as the base when running in development (i.e. on Replit)
  // and '/electrical-business-web-2/' for production builds.
  base: command === 'serve' ? '/' : '/electrical-business-web-2/',
}))
