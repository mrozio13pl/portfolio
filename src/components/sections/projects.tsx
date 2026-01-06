import { useLocale, useTranslate } from '@/i18n';
import { Pickaxe } from 'lucide-react';
import dedent from 'dedent';
import type { ReactNode } from 'react';

interface Project {
    title: string;
    subtitle?: string;
    href: string;
    description: string | ReactNode;
    category: 'big' | 'small' | 'library';
}

const Code = (props: React.ComponentProps<'code'>) => <code className='bg-gray-8/50 rounded-lg py-1 px-1.5' {...props} />;

const projectsEn: Project[] = [
    {
        title: 'MWG Giewont Dashboard',
        href: 'mwggiewont.pl',
        description: dedent`A +1 year project for racing pigeon lofts that allows the owner and breeders to manage their pigeons. This is a completely new solution for a complex problem that also had to be very intuitive for admin and most importantly users to use.

        It is packed with tons of features such as CMS-like environment, dashboard, customizable themes, i18n, SMS, emails, PDF generation, user profiles, PWA and more.

        It was built mostly with Next.js, Hono for the API, MySQL and Kysely for database, shadcn for the ui, better-auth.

        It runs on Coolify on Hetzner VPS.`,
        category: 'big',
    },
    {
        title: 'i18n',
        subtitle: 'Documentation',
        href: 'mrozio13pl.github.io/i18n',
        category: 'library',
        description: 'A type-safe lightweight internalization library for React. Specifically made for the Giewont dashboard.',
    },
    {
        title: 'typle',
        subtitle: 'Github',
        href: 'github.com/mrozio13pl/typle',
        category: 'library',
        description: (
            <p>
                Just a simple CLI tool I made a long time ago that when run installs missing <Code>@types</Code> packages for typescript.
                I now mainly use it for installing specific package like <Code>typle install react</Code>.
                <br />
                Also used my own <a target="_blank" href="https://github.com/mrozio13pl/ofi" className='op-50 hover:underline'>CLI library</a> and <a target="_blank" href="https://github.com/mrozio13pl/clittle" className='op-50 hover:underline'>arguments parser</a> btw.
            </p>
        )
    },
    {
        title: 'Sudoku in terminal',
        subtitle: 'Github',
        href: 'github.com/mrozio13pl/sudoku-in-terminal',
        category: 'small',
        description: (
            <p>
                Sudoku game in terminal with different levels of difficulty, settings, replays, themes made with React and Ink.
                <br />
                You can try it by typing <Code>npx sudoku-in-terminal</Code> in terminal.
            </p>
        )
    },
    {
        title: 'UNO (Multiplayer Online)',
        subtitle: 'Github',
        href: 'github.com/mrozio13pl/uno',
        category: 'small',
        description: dedent`This is a simple UNO implementation using NodeJS and WebSockets with logs, rooms, chat and basic player managent. The implementation of this is a little bit cursed as it was basically my first more advanced project.`,
    }
];

const projectsPl: Project[] = [
    {
        title: 'Panel MWG Giewont',
        href: 'mwggiewont.pl',
        description: dedent`Ponadroczna praca nad systemem dla Międzynarodowego Wspólnego Gołębnika, który pozwala właścicielowi i hodowcom zarządzać gołębiami. To zupełnie nowe rozwiązanie złożonego problemu, które musiało być bardzo intuicyjne zarówno dla admina, a przede wszystkim dla użytkowników.

        System ma wiele funkcji, takich jak środowisko typu CMS, dashboard, personalizowane motywy, i18n, powiadomienia SMS i e-mail, generowanie plików PDF, profile użytkowników, PWA i wiele więcej.

        Całość została zbudowana głównie przy użyciu Next.js, Hono dla API, MySQL z Kysely do bazy danych, shadcn dla UI oraz better-auth.

        Projekt działa na Coolify na VPS-ie od Hetzner, ponieważ jest to znacznie tańsze rozwiązanie niż korzystanie z platform typu Vercel.`,
        category: 'big',
    },
    {
        title: 'i18n',
        subtitle: 'Dokumentacja',
        href: 'mrozio13pl.github.io/i18n',
        category: 'library',
        description: 'Typowana, mała biblioteka do tworzenia tłumaczeń w React. Stworzona specjalnie na potrzeby panelu Giewont.',
    },
    {
        title: 'typle',
        subtitle: 'Github',
        href: 'github.com/mrozio13pl/typle',
        category: 'library',
        description: (
            <p>
                Proste narzędzie CLI, które stworzyłem dawno temu. Po uruchomieniu automatycznie instaluje brakujące biblioteki <Code>@types</Code> dla TypeScripta.
                Obecnie używam go głównie do instalowania konkretnych paczek, np. <Code>typle install react</Code>.
                <br />
                Przy okazji, wykorzystałem tu własną <a target="_blank" href="https://github.com/mrozio13pl/ofi" className='op-50 hover:underline'>bibliotekę CLI</a> oraz <a target="_blank" href="https://github.com/mrozio13pl/clittle" className='op-50 hover:underline'>parser argumentów</a>.
            </p>
        )
    },
    {
        title: 'Sudoku w terminalu',
        subtitle: 'Github',
        href: 'github.com/mrozio13pl/sudoku-in-terminal',
        category: 'small',
        description: (
            <p>
                Gra Sudoku w terminalu z różnymi poziomami trudności, ustawieniami, powtórkami i motywami, zbudowana przy użyciu React i Ink.
                <br />
                Możesz ją wypróbować, wpisując <Code>npx sudoku-in-terminal</Code> w swoim terminalu.
            </p>
        )
    },
    {
        title: 'UNO (Multiplayer Online)',
        subtitle: 'Github',
        href: 'github.com/mrozio13pl/uno',
        category: 'small',
        description: dedent`Prosta implementacja gry UNO przy użyciu Node.js i WebSockets, zawierająca logi, pokoje, czat i podstawowe zarządzanie graczami. Kod tego projektu jest nieco brzydki, ponieważ był to mój pierwszy bardziej zaawansowany projekt.`,
    }
];

export function Projects() {
    const t = useTranslate()('projectsSection');
    const [locale] = useLocale();
    const Separator = () => <div className='h-1 w-full bg-white/5 my-8' />;

    const projects = locale === 'en' ? projectsEn : projectsPl;

    return (
        <div className='mb-6'>
            <h2 className="font-primary font-extrabold text-4xl text-cyan-3 py-12">
                {t('title')}
            </h2>

            <div className='leading-8'>
                <div>
                    {projects.filter(p => p.category === 'big').map((project, index) => (
                        <div key={index} className='flex flex-col gap-y-4'>
                            <div>
                                <h3 className='font-primary font-extrabold text-2xl'>{project.title}</h3>
                                <a className='op-50 hover:underline' href={`https://${project.href}/`} target="_blank">{project.subtitle || project.href}</a>
                            </div>
                            <p className='whitespace-pre-wrap text-#F7F7E3 text-balance'>
                                {project.description}
                            </p>
                        </div>
                    ))}
                </div>

                <Separator />

                <div className='space-y-12'>
                    <h4 className='font-primary font-extrabold text-2xl text-cyan-2'>{t('libraries')}</h4>

                    {projects.filter(p => p.category === 'library').map((project, index) => (
                        <div key={index} className='flex flex-col gap-y-4'>
                            <div>
                                <h3 className='font-primary font-bold text-xl'>{project.title}</h3>
                                <a className='op-50 hover:underline' href={`https://${project.href}/`} target="_blank">{project.subtitle || project.href}</a>
                            </div>
                            <p className='whitespace-pre-wrap text-#F7F7E3'>
                                {project.description}
                            </p>
                        </div>
                    ))}
                </div>

                <Separator />

                <div className='space-y-12'>
                    <h4 className='font-primary font-extrabold text-2xl text-cyan-2'>{t('small')}</h4>

                    {projects.filter(p => p.category === 'small').map((project, index) => (
                        <div key={index} className='flex flex-col gap-y-4'>
                            <div>
                                <h3 className='font-primary font-bold text-xl'>{project.title}</h3>
                                <a className='op-50 hover:underline' href={`https://${project.href}/`} target="_blank">{project.subtitle || project.href}</a>
                            </div>
                            <p className='whitespace-pre-wrap text-#F7F7E3 text-balance op-90'>
                                {project.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
