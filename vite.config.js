import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), createBlockletPlugin()],
    resolve: {
      alias: {
        '@' : path.resolve(__dirname, 'src')
      }
    }
  };
});
