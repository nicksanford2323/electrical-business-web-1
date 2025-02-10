import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/electrical-business-web-1/', // The subfolder name of your GH Pages site
})
