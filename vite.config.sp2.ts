import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const projectRoot = process.cwd();

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  root: 'src',
  base: './',
  build: {
    outDir: path.resolve(projectRoot, 'dist-sp2'),
    emptyOutDir: true,
    target: 'esnext',
    assetsInlineLimit: 1024 * 1024,
    rollupOptions: {
      input: {
        'index': path.resolve(projectRoot, 'src/prototypes/sp2-workspace/index.tsx'),
      },
      output: {
        entryFileNames: 'sp2-workspace/index.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        format: 'es',
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(projectRoot, 'src') },
    ],
  },
});
