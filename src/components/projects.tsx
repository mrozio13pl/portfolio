import { useTranslation } from '@/i18n/use-translator';
import { Pickaxe } from 'lucide-react';
import { Link } from './link';
import { GITHUB } from '@/constants';

export function Projects() {
    const t = useTranslation();

    return (
        <div>
            <div className="flex w-full justify-center items-center py-12 gap-2 px-4">
                <div className="bg-gray-8 h-1 w-full" />
                <h2 className="font-primary font-extrabold text-4xl">
                    {t('projectsSection.title')}
                </h2>
                <div className="bg-gray-8 rounded-full h-1 w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4 lt-mobile:block">
                <a href="https://my-chatfolio.vercel.app/" target="_blank">
                    <div className="relative duration-100 hover:scale-101 rounded-2xl overflow-hidden">
                        <img
                            src="https://raw.githubusercontent.com/mrozio13pl/chatfolio/refs/heads/main/chatfolio-preview.png"
                            alt="chatfolio"
                            className="w-full h-full object-cover"
                        />
                        <div className="top-0 absolute size-full flex flex-col justify-end p-4 bg-black/30">
                            <div className="text-white font-primary font-extrabold text-xl">
                                {t('projectsSection.3.name')}
                            </div>
                            <div className="text-white/90 text-sm">
                                {t('projectsSection.3.description')}
                                <br />
                            </div>
                        </div>
                    </div>
                </a>
                <a
                    href="https://github.com/mrozio13pl/sudoku-in-terminal"
                    target="_blank">
                    <div className="relative duration-100 hover:scale-101 -mt-2">
                        <img
                            src="https://github.com/mrozio13pl/sudoku-in-terminal/raw/main/assets/menu.png"
                            alt="sudoku"
                            className="w-full h-full object-cover"
                        />
                        <div className="top-0 absolute size-full flex flex-col justify-end p-8 rounded-2xl">
                            <div className="text-white font-primary font-extrabold text-xl">
                                {t('projectsSection.1.name')}
                            </div>
                            <div className="text-white/80 text-sm">
                                {t('projectsSection.1.description')}
                                <br />
                            </div>
                        </div>
                    </div>
                </a>
                <a
                    href="https://github.com/mrozio13pl/portfolio"
                    target="_blank">
                    <div className="relative duration-100 hover:scale-101 rounded-2xl overflow-hidden">
                        <img
                            src="/preview.png"
                            alt="portfolio"
                            className="w-full h-full object-cover"
                        />
                        <div className="top-0 absolute size-full flex flex-col justify-end p-4 bg-black/40">
                            <div className="text-white font-primary font-extrabold text-xl">
                                {t('projectsSection.4.name')}
                            </div>
                            <div className="text-white/80 text-sm">
                                {t('projectsSection.4.description')}
                                <br />
                            </div>
                        </div>
                    </div>
                </a>
                <a href="https://github.com/mrozio13pl/uno" target="_blank">
                    <div className="relative duration-100 hover:scale-101 rounded-2xl overflow-hidden">
                        <img
                            src="https://github.com/mrozio13pl/uno/raw/main/assets/screenshot_1.png"
                            alt="sudoku"
                            className="w-full h-full object-cover"
                        />
                        <div className="top-0 absolute size-full flex flex-col justify-end p-4 bg-black/50">
                            <div className="text-white font-primary font-extrabold text-xl">
                                {t('projectsSection.2.name')}
                            </div>
                            <div className="text-white/90 text-sm">
                                {t('projectsSection.2.description')}
                                <br />
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <div className="ml-4 mt-6 space-y-2">
                <p className="text-gray-7">
                    {t('projectsSection.note')}{' '}
                    <Pickaxe className="inline-flex" />
                </p>
                <p className="flex items-center">
                    {t('projectsSection.forMore.1')}{' '}
                    <Link
                        className="mx-1"
                        target="_blank"
                        href={GITHUB + '?tab=repositories'}>
                        {t('projectsSection.forMore.2')}
                    </Link>{' '}
                    {t('projectsSection.forMore.3')}
                </p>
            </div>
        </div>
    );
}
