import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'lib/index.esm.js',
      format: 'es',
    },
  ],
  external: ['vitest'],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: './lib',
      rootDir: './src',
      exclude: ['tests/**/*.ts', 'node_modules/**'],
    }),
    json(),
  ],
};
