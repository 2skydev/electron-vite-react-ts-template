import electron from 'vite-plugin-electron';

import react from '@vitejs/plugin-react';

import { join } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/index.ts',
      },
      preload: {
        input: {
          index: join(__dirname, 'electron/preload/index.ts'),
        },
      },
    }),
    tsconfigPaths(),
    svgr(),
    checker({}),
  ],
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    minify: process.env.NODE_ENV === 'production' ? false : 'esbuild',
    sourcemap: process.env.NODE_ENV !== 'production',
  },
});
