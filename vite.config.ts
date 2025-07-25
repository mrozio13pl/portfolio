import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-oxc';
import UnoCSS from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), UnoCSS(), tsconfigPaths()],
    css: {
        transformer: 'lightningcss',
    },
});
