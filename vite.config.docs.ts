import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'

export default defineConfig({
  base: `./`,
  plugins: [
    vue(),
  ],
  build: {
    outDir: 'docs',
  },
});
