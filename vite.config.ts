import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/global";',
      },
    },
    modules: {
      exportGlobals: true,
      scopeBehaviour: 'local',
      generateScopedName: '[local]-[hash:base64:3]',
    },
  },
});
