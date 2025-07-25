import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-oxc';
import html from 'vite-plugin-simple-html';
import UnoCSS from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), UnoCSS(), tsconfigPaths(), html({ minify: true })],
    css: {
        transformer: 'lightningcss',
    },
});
