import { EMAIL, LINKED_IN } from '@/constants';
import { Link } from '@/components/ui/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { useTranslate } from '@/i18n';
import { Button } from '@/components/ui/button';
import copy from 'copy-text-to-clipboard';
import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

export function Contact() {
    const t = useTranslate()('contactSection');

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const size = Math.min(document.body.getBoundingClientRect().width - 160, 600);

    useEffect(() => {
        let phi = 3.8;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: size * 2,
            height: size * 2,
            phi,
            theta: 0,
            dark: 0.95,
            diffuse: 0.5,
            mapSamples: 15000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.5, 1, 1],
            glowColor: [1, 1, 1],
            opacity: 0.9,
            markers: [{ location: [49.5730616, 19.9160931], size: 0.05 }],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.00025;
            },
        });

        return () => {
            globe.destroy();
        };
    }, [size]);

    return (
        <div className="relative mobile:py-20 mb-20 mt-12">
            <div className="z-10">
                <h2 className="font-primary font-extrabold text-6xl lt-mobile:text-4xl mt-12 text-center">
                    {t('title')}
                    <span className="text-cyan-2">.</span>
                </h2>
                <div className="flex justify-center">
                    <div className="max-w-4/5 mt-12 space-y-4">
                        <p>{t('1')}</p>
                        <p>
                            {t('2')}{' '}
                            <Link href={'mailto:' + EMAIL} className="text-cyan-1">
                                email
                            </Link>{' '}
                            {t('3')}{' '}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className="underline underline-offset-2 ml-1">
                                            Discord
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="flex gap-1 items-center">
                                            <Button className="!p-2" variant="ghost">
                                                <Copy
                                                    className="size-4"
                                                    onClick={() => copy('mrozio13pl')}
                                                />
                                            </Button>
                                            <p>mrozio13pl</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            .
                        </p>
                        <p>
                            {t('4')}{' '}
                            <Link href={LINKED_IN} target="_blank" className="text-cyan-1">
                                LinkedIn
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
            <div
                style={{
                    background:
                        'radial-gradient(circle at center, rgba(207, 250, 254, 0.1) 0, rgba(34, 211, 238, 0) 50%) no-repeat',
                    mixBlendMode: 'hard-light',
                }}
                className="h-100 mobile:w-[calc(100%-100px)] w-full absolute top-0 -left-20 transform-origin-cc animate-second pointer-events-none"
            />
            <div
                style={{
                    background:
                        'radial-gradient(circle at center, rgba(207, 250, 254, 0.1) 0, rgba(34, 211, 238, 0) 50%) no-repeat',
                    mixBlendMode: 'hard-light',
                }}
                className="h-100 duration-100 mobile:w-[calc(100%-100px)] w-full absolute top-0 left-30 transform-origin-cc animate-first pointer-events-none"
            />
            <div
                className="mt-18 max-h-[calc(100dvh-1200px+300px)] lt-mobile:-mb-20 -mb-40 flex justify-center overflow-hidden op-30"
                style={{
                    minHeight: size / 3,
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        maxWidth: '100%',
                        aspectRatio: 1,
                        height: size + 'px',
                        width: size + 'px',
                    }}
                />
            </div>
        </div>
    );
}
