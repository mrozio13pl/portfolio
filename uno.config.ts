import {
    defineConfig,
    presetUno,
    presetWind,
    transformerVariantGroup,
} from 'unocss';
import toEscapedUri from 'mini-svg-data-uri';

export default defineConfig({
    presets: [presetUno(), presetWind()],
    transformers: [transformerVariantGroup()],
    theme: {
        breakpoints: {
            mobile: '660px',
            md: '1330px',
        },
    },
    rules: [
        ['animate-first', { animation: 'moveFirst 10s ease infinite' }],
        ['animate-second', { animation: 'moveSecond 10s ease infinite' }],
        [
            /^bg-grid-(\w+)$/,
            ([, color], { theme }) => ({
                'background-image': `url("${toEscapedUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${
                        theme.colors?.[color] || color
                    }"><path d="M0 .5H31.5V32"/></svg>`
                )}")`,
            }),
        ],
        [
            /^bg-grid-small-(\w+)$/,
            ([, color], { theme }) => ({
                'background-image': `url("${toEscapedUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${
                        theme.colors?.[color] || color
                    }"><path d="M0 .5H31.5V32"/></svg>`
                )}")`,
            }),
        ],
        [
            /^bg-dot-(\w+)$/,
            ([, color], { theme }) => ({
                'background-image': `url("${toEscapedUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${
                        theme.colors?.[color] || color
                    }" cx="10" cy="10" r="5.1257413380501518"></circle></svg>`
                )}")`,
            }),
        ],
    ],
});
