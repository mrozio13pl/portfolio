import { JustifiedLayout } from '@immich/justified-layout-wasm';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import photoManifest from 'virtual:photo-manifest';

export type GalleryPhoto = {
    id: string;
    url: string;
    width: number;
    height: number;
    createdAt: string;
};

type GalleryProps = {
    tripId?: string;
    photos?: GalleryPhoto[];
    className?: string;
};

function slug(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function useElementWidth<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updateWidth = (nextWidth: number) => {
            const roundedWidth = Math.floor(nextWidth);
            setWidth((currentWidth) =>
                currentWidth === roundedWidth ? currentWidth : roundedWidth,
            );
        };

        updateWidth(element.clientWidth);

        if (!('ResizeObserver' in window)) return;

        const observer = new ResizeObserver(([entry]) => {
            if (!entry) return;
            updateWidth(entry.contentRect.width);
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, width };
}

export function Gallery({ tripId, photos, className }: GalleryProps) {
    const { ref, width } = useElementWidth<HTMLDivElement>();
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const galleryPhotos = useMemo(() => {
        const manifestPhotos = photos ?? photoManifest;
        const tripPhotos = tripId
            ? manifestPhotos.filter((photo) => slug(photo.id).startsWith(slug(tripId)))
            : manifestPhotos;

        return [...tripPhotos].sort(
            (a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id),
        );
    }, [photos, tripId]);

    const aspectRatios = useMemo(
        () => new Float32Array(galleryPhotos.map((photo) => photo.width / photo.height)),
        [galleryPhotos],
    );

    const layout = useMemo(() => {
        if (width <= 0 || aspectRatios.length === 0) return undefined;

        return new JustifiedLayout(aspectRatios, {
            rowHeight: width < 640 ? 140 : 220,
            rowWidth: width,
            spacing: 8,
            heightTolerance: 0.25,
        });
    }, [aspectRatios, width]);

    const selectedPhoto = selectedIndex === undefined ? undefined : galleryPhotos[selectedIndex];

    useEffect(() => {
        if (selectedIndex === undefined || selectedIndex < galleryPhotos.length) return;
        setSelectedIndex(undefined);
    }, [galleryPhotos.length, selectedIndex]);

    useEffect(() => {
        if (!selectedPhoto) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeViewer();
            if (event.key === 'ArrowLeft') moveSelection(-1);
            if (event.key === 'ArrowRight') moveSelection(1);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [galleryPhotos.length, selectedPhoto]);

    function openViewer(index: number) {
        setSelectedIndex(index);
    }

    function closeViewer() {
        setSelectedIndex(undefined);
    }

    function moveSelection(direction: -1 | 1) {
        setSelectedIndex((index) => {
            if (index === undefined) return index;
            return (index + direction + galleryPhotos.length) % galleryPhotos.length;
        });
    }

    return (
        <div ref={ref} className={className}>
            {layout && (
                <div
                    className="relative w-full"
                    style={{ height: Math.ceil(layout.containerHeight) }}
                >
                    {galleryPhotos.map((photo, index) => {
                        const position = layout.getPosition(index);

                        return (
                            <figure
                                key={photo.id}
                                className="absolute overflow-hidden rounded-lg bg-white/5 cursor-zoom-in"
                                style={{
                                    top: position.top,
                                    left: position.left,
                                    width: position.width,
                                    height: position.height,
                                }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    openViewer(index);
                                }}
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.id}
                                    width={photo.width}
                                    height={photo.height}
                                    loading="lazy"
                                    decoding="async"
                                    className="size-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </figure>
                        );
                    })}
                </div>
            )}

            {selectedPhoto &&
                createPortal(
                    <div
                        className="fixed inset-0 z-100 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Photo viewer"
                        onClick={closeViewer}
                    >
                        <button
                            type="button"
                            className="absolute right-4 top-4 z-1 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                            aria-label="Close photo viewer"
                            onClick={(event) => {
                                event.stopPropagation();
                                closeViewer();
                            }}
                        >
                            <X size={24} />
                        </button>

                        {galleryPhotos.length > 1 && (
                            <button
                                type="button"
                                className="absolute left-3 md:left-6 top-1/2 z-1 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                                aria-label="Previous photo"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    moveSelection(-1);
                                }}
                            >
                                <ChevronLeft size={32} />
                            </button>
                        )}

                        <img
                            src={selectedPhoto.url}
                            alt={selectedPhoto.id}
                            width={selectedPhoto.width}
                            height={selectedPhoto.height}
                            className="max-h-[88dvh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
                            onClick={(event) => event.stopPropagation()}
                        />

                        {galleryPhotos.length > 1 && (
                            <button
                                type="button"
                                className="absolute right-3 md:right-6 top-1/2 z-1 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                                aria-label="Next photo"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    moveSelection(1);
                                }}
                            >
                                <ChevronRight size={32} />
                            </button>
                        )}

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
                            {selectedIndex! + 1} / {galleryPhotos.length}
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
}
