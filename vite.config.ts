import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/lifecycle_watches/',
  server: {
    open: true,
  },
});
