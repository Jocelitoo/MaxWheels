import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compressPlugin from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compressPlugin({
      algorithm: 'gzip',
      ext: '.gz', // file extension
      deleteOriginFile: false, // keep original files
      threshold: 10240, // only compress files over 10KB
    }),
  ],
});
