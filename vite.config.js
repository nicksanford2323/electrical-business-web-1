import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/electrical-business-web-1/',
  server: {
    allowedHosts: [
      '6b7a5e14-50b8-421e-908c-088f65437c4b-00-1d38azhgw8zpi.kirk.replit.dev'
    ]
    // Alternatively, if you have dynamic hosts on Replit, you can allow all hosts:
    // allowedHosts: 'all'
  }
}))
