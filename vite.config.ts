import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig, type Plugin } from 'vite';

function rbphManifest(): Plugin {
  return {
    name: 'rbph-manifest',
    apply: 'build',
    async writeBundle() {
      await writeFile(
        resolve('dist/rbph-vue-app.json'),
        `${JSON.stringify(
          {
            type: 'rbph-vue-app',
            version: 1,
            entry: './assets/index.js',
            styles: ['./assets/style.css'],
          },
          null,
          2,
        )}\n`,
      );
    },
  };
}

export default defineConfig({
  plugins: [vue(), rbphManifest()],
  build: {
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/entry.ts'),
      formats: ['es'],
      fileName: () => 'assets/index.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => (assetInfo.name?.endsWith('.css') ? 'assets/style.css' : 'assets/[name][extname]'),
        chunkFileNames: 'assets/[name].js',
      },
    },
  },
});
