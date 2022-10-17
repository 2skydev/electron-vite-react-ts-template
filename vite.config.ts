import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import electron from 'vite-plugin-electron';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    checker({}),
    tsconfigPaths(),
    svgr(),
    electron({
      main: {
        entry: 'app/index.ts',
        vite: {
          plugins: [tsconfigPaths()],
          build: {
            outDir: 'dist/app',
          },
        },
      },
      preload: {
        input: {
          index: join(__dirname, 'app/preload/index.ts'),
        },
        vite: {
          build: {
            outDir: 'dist/app/preload',
          },
        },
      },
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
