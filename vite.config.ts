import react from '@vitejs/plugin-react';

import path from 'path';
import { defineConfig } from 'vite';
import electron from 'vite-electron-plugin';
import { alias } from 'vite-electron-plugin/plugin';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    checker({}),
    tsconfigPaths(),
    electron({
      include: ['app'],
      plugins: [
        alias([
          {
            find: '@app',
            replacement: path.join(__dirname, 'app'),
          },
        ]),
      ],
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
