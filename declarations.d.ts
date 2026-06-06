declare module '*.css' {}

declare module 'virtual:photo-manifest' {
    export type PhotoManifestItem = {
        id: string;
        url: string;
        width: number;
        height: number;
        createdAt: string;
    };

    const photos: PhotoManifestItem[];
    export default photos;
}
