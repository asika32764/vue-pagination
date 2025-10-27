import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'

export default defineConfig({
  base: `./`,
  resolve: {
    alias: {
      '~': resolve('./src'),
    },
  },
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      rollupTypes: true,
      exclude: ['src/docs/**/*']
    }),
  ],
  build: {
    outDir: 'dist',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VuePagination',
      // the proper extensions will be added
      fileName: 'vue-pagination',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
