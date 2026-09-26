import {hydrogen} from '@shopify/hydrogen/vite';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [hydrogen(), tsconfigPaths()],
  server: {port: 3000},
});
