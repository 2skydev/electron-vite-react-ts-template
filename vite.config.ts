import react from '@vitejs/plugin-react';

import { join } from 'path';
import { defineConfig } from 'vite';
import electron from 'vite-electron-plugin';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    checker({}),
    tsconfigPaths(),
    svgr(),
    electron({
      include: ['electron'],
    }),
  ],
  clearScreen: false,
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    minify: process.env.NODE_ENV === 'production' ? false : 'esbuild',
    sourcemap: process.env.NODE_ENV !== 'production',
  },
});
