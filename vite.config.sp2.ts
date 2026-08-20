import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { createVendorAliases, loadVendorPackagesConfig } from './scripts/utils/vendor-packages.mjs';
import { injectStablePageIds } from './vite-plugins/injectStablePageIds';
import { forceInlineDynamicImportsOff } from './vite-plugins/forceInlineDynamicImportsOff';

const projectRoot = process.cwd();
const vendorPackagesConfig = loadVendorPackagesConfig(projectRoot);
const vendorAliases = createVendorAliases(projectRoot, vendorPackagesConfig);

export default defineConfig({
  plugins: [
    tailwindcss(),
    injectStablePageIds(),
    forceInlineDynamicImportsOff(false),
    react({
      jsxRuntime: 'classic',
      babel: { configFile: false, babelrc: false }
    }),
  ],

  root: 'src',
  base: '/axhub.w/',

  build: {
    outDir: path.resolve(projectRoot, 'dist'),
    emptyOutDir: false,
    target: 'esnext',
    assetsInlineLimit: 1024 * 1024,

    rollupOptions: {
      input: {
        'prototypes/sp2-workspace/index': path.resolve(projectRoot, 'src/prototypes/sp2-workspace/index.tsx'),
      },
      output: {
        entryFileNames: (chunkInfo) => `${chunkInfo.name}.js`,
        format: 'es',
      },
    },

    minify: false,
  },

  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(projectRoot, 'src') },
      ...vendorAliases.map((alias) => ({
        find: new RegExp(`^${alias.packageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`),
        replacement: alias.runtimeEntryAbsolute,
      })),
    ],
  },

  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
      sass: { api: 'modern-compiler' }
    }
  },

  esbuild: {
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  },
});
