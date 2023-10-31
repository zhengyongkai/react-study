import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // 这里就是需要配置resolve里的别名
            '@': path.join(__dirname, './src'), // path记得引入
        },
    },
    build: {
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['react', 'react-dom'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    react: 'React',
                    'react-dom': 'react-dom',
                },
            },
        },
    },
});
