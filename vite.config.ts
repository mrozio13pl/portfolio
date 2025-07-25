import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-oxc';
import UnoCSS from 'unocss/vite';
import html from 'vite-plugin-simple-html';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        react(),
        UnoCSS(),
        ViteImageOptimizer(),
        tsconfigPaths(),
        html({ minify: true })
    ],
    css: {
        transformer: 'lightningcss',
    },
});
