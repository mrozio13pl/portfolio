import { useLocale, useTranslate } from '@/i18n';
import { Link } from '../ui/link';
import type { ReactNode } from 'react';

interface Experience {
    title: string;
    profession: string;
    date: string;
    description: string | ReactNode;
}

const EXPERIENCES_EN: Experience[] = [

    {
        title: 'OLR Giewont',
        profession: 'Web Developer',
        date: '2024 - 2026',
        description: (
            <>
                A classmate from my technical college got me into building websites for his family business,
                which also happens to be the largest international racing pigeon loft in Europe.
                I’ve since created and maintained sites like <Link href='https://mwggiewont.pl'>mwggiewont.pl</Link>
                and <Link href='https://grandprixpoland.pl'>grandprixpoland.pl</Link>.
            </>
        ),
    },
    {
        title: 'Accent School of Polish',
        profession: 'Apprenticeships',
        date: '2024',
        description:
            'Remote apprenticeships at Accent School of Polish, Kraków. Worked in a 5-person team to develop a website featuring Polish language exercises, quizzes and questions using PHP and MySQL.',
    },
    {
        title: 'Andea Solutions',
        profession: 'Apprenticeships',
        date: '2022',
        description:
            'Apprenticeships in Andea Solutions, Cracow. Tasks such as frontend development and working on automation solutions for manufacturing lines.',
    },
];

const EXPERIENCES_PL: Experience[] = [
    {
        title: 'MWG Giewont',
        profession: 'Programista Frontend i Backend',
        date: '2024 - 2026',
        description: (
            <>
                Kolega z klasy technikum zaciągnął mnie do tworzenia stron internetowych dla ich firmy.
                Jest to największy międzynarodowy gołębnik w Europie.
                Stworzyłem i zajmuję się stronami takimi jak <Link href='https://mwggiewont.pl'>mwggiewont.pl</Link>
                czy <Link href='https://grandprixpoland.pl'>grandprixpoland.pl</Link>.
            </>
        ),
    },
    {
        title: 'Accent School of Polish',
        profession: 'Praktykant',
        date: '2024',
        description:
            'Praktyki zdalne w Accent School of Polish, Kraków. Praca w grupie 5 osób, projekt strony internetowej z zadaniami, quizami, pytaniami z języka polskiego z użyciem PHP i MySQL.',
    },
    {
        title: 'Andea Solutions',
        profession: 'Praktykant',
        date: '2022',
        description:
            'Praktyki w Andea Solutions, Kraków. Zadania takie jak frontend development oraz zajmowanie się automatyką linii produkcyjnych.',
    },
];

export function Experience() {
    const t = useTranslate();
    const locale = useLocale()[0];

    const EXPERIENCES = locale === 'en' ? EXPERIENCES_EN : EXPERIENCES_PL;

    return (
        <div>
            <h2 className="font-primary font-extrabold text-4xl text-cyan-3 py-12">
                {t('sections.experience')}
            </h2>

            <div>
                {EXPERIENCES.map((experience, index, arr) => (
                    <div className="flex gap-4" key={index}>
                        <div className="flex items-center flex-col relative">
                            <div className="rounded-full min-h-6 min-w-6 border-2 border-gray8" />
                            <div className="bg-gray8 h-full w-0.25" />
                            {index !== arr.length - 1 && (
                                <div className="bg-gray8 w-0.25 absolute min-h-6 top- bottom-0" />
                            )}
                        </div>
                        <div className="w-full space-y-2 pb-6">
                            <div className="w-full flex justify-between items-center">
                                <h3 className="text-2xl">
                                    <span className="font-extrabold text-lime-2 font-primary">
                                        {experience.title}
                                    </span>
                                    <span className="text-gray7 font-extrabold">
                                        {' '}
                                        /{' '}
                                    </span>
                                    <span className="text-lg">
                                        {experience.profession}
                                    </span>
                                </h3>
                                <p className="text-gray4">{experience.date}</p>
                            </div>
                            <p className="text-#F7F7E3 leading-7 text-balance">
                                {experience.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
