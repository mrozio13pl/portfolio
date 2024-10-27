import { useLocale, useTranslation } from '@/i18n/use-translator';

interface Experience {
    title: string;
    profession: string;
    date: string;
    description: string;
}

const EXPERIENCES_EN: Experience[] = [
    {
        title: 'Freelancer',
        profession: 'Frontend & Backend Developer',
        date: 'Present',
        description:
            'Currently looking for a freelance job as a developer. I create NodeJS and web applications.',
    },
    {
        title: 'Andea Solutions',
        profession: 'Apprenticeships',
        date: '2022',
        description:
            'Apprenticeships in Andea Solutions, Cracow. Tasks such as frontend development and database management.',
    },
];

const EXPERIENCES_PL: Experience[] = [
    {
        title: 'Freelancer',
        profession: 'Programista Frontend i Backend',
        date: 'Obecnie',
        description:
            'Wolny do pracy jako programista frontend i backend. Tworzę aplikacje NodeJS oraz aplikacje webowe.',
    },
    {
        title: 'Andea Solutions',
        profession: 'Praktykant',
        date: '2022',
        description:
            'Praktyki w Andea Solutions, Kraków. Zadania takie jak frontend development oraz zarządzanie bazą danych.',
    },
];

export function Experience() {
    const t = useTranslation();
    const { locale } = useLocale();

    const EXPERIENCES = locale === 'en' ? EXPERIENCES_EN : EXPERIENCES_PL;

    return (
        <div className="">
            <h2 className="primary-font font-extrabold text-4xl py-12">
                {t('experience' as any) || 'Experience'}
            </h2>

            <div>
                {EXPERIENCES.map((experience, index) => (
                    <div className="flex gap-4" key={index}>
                        <div className="flex items-center flex-col">
                            <div className="rounded-full min-h-6 min-w-6 border-2 border-gray8" />
                            <div className="bg-gray8 h-full w-0.5" />
                        </div>
                        <div className="w-full space-y-2 pb-6">
                            <div className="w-full flex justify-between items-center">
                                <h3 className="text-2xl">
                                    <span className="font-extrabold text-lime-2 primary-font">
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
                            <p className="text-gray-5">
                                {experience.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
