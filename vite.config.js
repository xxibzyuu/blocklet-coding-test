/*
 * @Description:
 * @Author: yuanzeyu
 * @Date: 2023-10-31 01:27:43
 * @LastEditTime: 2023-11-01 16:04:00
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist', // 指定构建输出目录，默认为 'dist'
      assetsDir: 'assets', // 指定静态资源的输出目录，默认为 'assets'
      sourcemap: true, // 是否生成源映射文件，默认为 false
    },
    plugins: [vue(), createBlockletPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
