import fs from 'node:fs/promises';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import html from 'vite-plugin-simple-html';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import sharp from 'sharp';

const photoManifestModuleId = 'virtual:photo-manifest';
const resolvedPhotoManifestModuleId = `\0${photoManifestModuleId}`;

async function findPhotoFiles(directory: string): Promise<string[]> {
    const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp']);

    try {
        const entries = await fs.readdir(directory, { withFileTypes: true });
        const nestedFiles = await Promise.all(
            entries.map(async (entry) => {
                const entryPath = path.join(directory, entry.name);

                if (entry.isDirectory()) return findPhotoFiles(entryPath);
                if (!entry.isFile()) return [];
                if (!imageExtensions.has(path.extname(entry.name).toLowerCase())) return [];

                return [entryPath];
            }),
        );

        return nestedFiles.flat().sort();
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return [];
        throw error;
    }
}

function toPublicPhotoUrl(relativePath: string) {
    return `/photos/${relativePath.split('/').map(encodeURIComponent).join('/')}`;
}

function toIsoDate(match: RegExpMatchArray) {
    const [, year, month, day, hour = '00', minute = '00', second = '00'] = match;
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`).toISOString();
}

function getMetadataCreatedAt(metadata: sharp.Metadata, relativePath: string) {
    const exifText = metadata.exif?.toString('latin1');
    const exifDate = exifText?.match(
        /(20\d{2}|19\d{2}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/,
    );
    if (exifDate) return toIsoDate(exifDate);

    const xmpText = metadata.xmp?.toString('utf8');
    const xmpDate = xmpText?.match(/(20\d{2}|19\d{2})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
    if (xmpDate) return toIsoDate(xmpDate);

    const fileDate = relativePath.match(
        /(20\d{2}|19\d{2})(\d{2})(\d{2})[_-]?(\d{2})(\d{2})(\d{2})?/,
    );
    if (fileDate) return toIsoDate(fileDate);
}

function gallery(): Plugin {
    const photosDirectory = path.resolve(process.cwd(), 'public/photos');

    return {
        name: 'gallery-plugin',
        resolveId(id) {
            if (id === photoManifestModuleId) return resolvedPhotoManifestModuleId;
        },
        async load(id) {
            if (id !== resolvedPhotoManifestModuleId) return;

            const files = await findPhotoFiles(photosDirectory);
            const photos = await Promise.all(
                files.map(async (filePath) => {
                    const [metadata, stat] = await Promise.all([
                        sharp(filePath).metadata(),
                        fs.stat(filePath),
                    ]);
                    const relativePath = path
                        .relative(photosDirectory, filePath)
                        .split(path.sep)
                        .join('/');
                    const createdAt =
                        getMetadataCreatedAt(metadata, relativePath) ??
                        stat.birthtime.toISOString();

                    return {
                        id: relativePath.replace(/\.[^.]+$/, ''),
                        url: toPublicPhotoUrl(relativePath),
                        width: metadata.width ?? 1,
                        height: metadata.height ?? 1,
                        createdAt,
                    };
                }),
            );

            photos.sort(
                (a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id),
            );

            return `export default ${JSON.stringify(photos)};`;
        },
    };
}

export default defineConfig({
    plugins: [gallery(), react(), UnoCSS(), ViteImageOptimizer(), html({ minify: true })],
    css: {
        transformer: 'lightningcss',
    },
    resolve: {
        tsconfigPaths: true,
    },
});
