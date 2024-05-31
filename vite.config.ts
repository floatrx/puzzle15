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
    // Tauri expects a fixed port
    strictPort: true,
    // Vite should ignore watching `src-tauri`
    watch: {
      ignored: ['**/src-tauri/**'],
    },
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
  // prevent vite from obscuring rust errors
  clearScreen: false,
});
