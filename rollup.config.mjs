import typescript from 'rollup-plugin-typescript';
import { readFileSync } from 'fs';
import { dts } from 'rollup-plugin-dts';
import vue from 'rollup-plugin-vue';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

// @see https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226
export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    external: ['vue'],
    plugins: [
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015',
      }),
      vue({ template: { optimizeSSR: true } }),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    external: ['vue'],
    plugins: [
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015',
      }),
      vue(),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      name: 'VuePagination',
    },
    external: ['vue'],
    plugins: [
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015',
      }),
      vue(),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.typings,
      format: 'es',
    },
    external: ['vue'],
    plugins: [
      dts({
        tsconfig: './tsconfig.lib.json'
      })
    ]
  }
];

function addMinToFilename(fileName) {
  return fileName.replace(/.js$/, '.min.js');
}
