// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'; // <--- ADD THIS IMPORT

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: { // <--- ADD THIS RESOLVE BLOCK
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
});
