import { EMAIL, LINKED_IN } from '@/constants';
import { Link } from './link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { useTranslation } from '@/i18n/use-translator';
import { Button } from './ui/button';
import copy from 'copy-text-to-clipboard';

export function Contact() {
    const t = useTranslation();

    return (
        <div className="relative py-20 mb-20 mt-12">
            <div className="z-10">
                <h2 className="primary-font font-extrabold text-6xl mt-12 text-center">
                    {t('contactSection.title')}
                    <span className="text-cyan-2">.</span>
                </h2>
                <div className="flex justify-center">
                    <div className="max-w-4/5 mt-12 space-y-4">
                        <p>{t('contactSection.1')}</p>
                        <p className="flex">
                            {t('contactSection.2')}{' '}
                            <Link
                                href={'mailto:' + EMAIL}
                                className="text-cyan-1">
                                email
                            </Link>{' '}
                            {t('contactSection.3')}{' '}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className="underline underline-offset-2 ml-1">
                                            Discord
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="flex gap-1 items-center">
                                            <Button
                                                className="!p-2"
                                                variant="ghost">
                                                <Copy
                                                    className="size-4"
                                                    onClick={() =>
                                                        copy('mrozio13pl')
                                                    }
                                                />
                                            </Button>
                                            <p>mrozio13pl</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            .
                        </p>
                        <p className="flex">
                            {t('contactSection.4')}{' '}
                            <Link
                                href={LINKED_IN}
                                target="_blank"
                                className="text-cyan-1">
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
                className="h-100 w-[calc(100%-100px)] absolute top-0 -left-20 transform-origin-cc animate-second pointer-events-none"
            />
            <div
                style={{
                    background:
                        'radial-gradient(circle at center, rgba(207, 250, 254, 0.1) 0, rgba(34, 211, 238, 0) 50%) no-repeat',
                    mixBlendMode: 'hard-light',
                }}
                className="h-100 duration-100 w-[calc(100%-100px)] absolute top-0 left-30 transform-origin-cc animate-first pointer-events-none"
            />
        </div>
    );
}
