import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import html from 'vite-plugin-simple-html';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
    plugins: [react(), UnoCSS(), ViteImageOptimizer(), html({ minify: true })],
    css: {
        transformer: 'lightningcss',
    },
    resolve: {
        tsconfigPaths: true,
    },
});
