import {
    SiNodedotjs,
    SiNodedotjsHex,
    SiReact,
    SiReactHex,
    SiTypescript,
    SiTypescriptHex,
} from '@icons-pack/react-simple-icons';
import { Carousel } from './carousel';
import { useTranslation } from '@/i18n/use-translator';

export function Skills() {
    const t = useTranslation();

    return (
        <>
            <h2 className="primary-font font-extrabold text-3xl pt-12">
                {t('skills' as any) || 'Skills'}
            </h2>
            <p className="op-50">{t('skillsSection.title')}:</p>
            <div className="flex flex-col gap-4 py-8">
                <div className="flex gap-2 items-center px-4">
                    <SiTypescript
                        color={SiTypescriptHex}
                        className="size-16 min-w-16"
                    />
                    <p>{t('skillsSection.1')}</p>
                </div>
                <div className="flex gap-2 items-center px-4">
                    <SiReact color={SiReactHex} className="size-16 min-w-16" />
                    <p>{t('skillsSection.2')}</p>
                </div>
                <div className="flex gap-2 items-center px-4">
                    <SiNodedotjs
                        color={SiNodedotjsHex}
                        className="size-16 min-w-16"
                    />
                    <p>{t('skillsSection.3')}</p>
                </div>
            </div>
            <p className="op-50">{t('skillsSection.others')}</p>
            <div className="relative overflow-hidden w-full max-w-full py-4">
                <Carousel />
            </div>
        </>
    );
}
