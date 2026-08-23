import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // This is a user Pages site (sebasurbina.github.io), so it is served at `/`.
  base: '/',
  plugins: [react()],
})
