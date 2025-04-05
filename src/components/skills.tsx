import {
    SiDaisyui,
    SiDaisyuiHex,
    SiExpo,
    SiExpoHex,
    SiGit,
    SiGitHex,
    SiJavascript,
    SiJavascriptHex,
    SiLucia,
    SiLuciaHex,
    SiMongodb,
    SiMongodbHex,
    SiMysql,
    SiMysqlHex,
    SiNextdotjs,
    SiNodedotjs,
    SiNodedotjsHex,
    SiNpm,
    SiNpmHex,
    SiPhp,
    SiPhpHex,
    SiPreact,
    SiPreactHex,
    SiPuppeteer,
    SiPuppeteerHex,
    SiReact,
    SiReactHex,
    SiReacthookform,
    SiReacthookformHex,
    SiShadcnui,
    SiShadcnuiHex,
    SiSocketdotio,
    SiStripe,
    SiStripeHex,
    SiTailwindcss,
    SiTailwindcssHex,
    SiTurborepo,
    SiTurborepoHex,
    SiTypescript,
    SiTypescriptHex,
    SiUnocss,
    SiUnocssHex,
    SiVitest,
    SiVitestHex,
} from '@icons-pack/react-simple-icons';
import { Shapes, Terminal } from 'lucide-react';
import { Carousel, type Tool } from './carousel';
import { useTranslate } from '@/i18n';

const mainTools: Tool[] = [
    {
        node: <SiTypescript color={SiTypescriptHex} />,
        tool: 'Typescript',
    },
    {
        node: <SiJavascript color={SiJavascriptHex} />,
        tool: 'Javascript',
    },
    {
        node: <SiReact color={SiReactHex} />,
        tool: 'React',
    },
    {
        node: <SiPreact color={SiPreactHex} />,
        tool: 'Preact',
    },
    {
        node: <SiNextdotjs />,
        tool: 'Next.js',
    },
    {
        node: <SiNpm color={SiNpmHex} />,
        tool: 'NPM packages',
    },
    {
        node: <SiTailwindcss color={SiTailwindcssHex} />,
        tool: 'Tailwind CSS',
    },
    {
        node: <SiUnocss color={SiUnocssHex} />,
        tool: 'UnoCSS',
    },
    {
        node: <SiMongodb color={SiMongodbHex} />,
        tool: 'MongoDB',
    },
];

const toolsAndTechnologies: Tool[] = [
    {
        node: <SiTurborepo color={SiTurborepoHex} />,
        tool: 'Turborepo',
    },
    {
        node: <SiGit color={SiGitHex} />,
        tool: 'Git',
    },
    {
        node: <SiLucia color={SiLuciaHex} />,
        tool: 'Lucia Auth',
    },
    {
        node: <SiSocketdotio />,
        tool: 'WebSocket',
    },
    {
        node: <SiStripe color={SiStripeHex} />,
        tool: 'Stripe',
    },
    {
        node: <SiPuppeteer color={SiPuppeteerHex} />,
        tool: 'Puppeteer',
    },
    {
        node: <SiVitest color={SiVitestHex} />,
        tool: 'Vitest',
    },
    {
        node: <SiMysql color={SiMysqlHex} />,
        tool: 'MySQL',
    },
    {
        node: <SiPhp color={SiPhpHex} />,
        tool: 'PHP',
    },
    {
        node: <img src="/icons/java.svg" alt="java" className="size-12" />,
        tool: 'Java',
    },
    {
        node: <SiShadcnui color={SiShadcnuiHex} />,
        tool: 'Shadcn UI',
    },
    {
        node: <SiDaisyui color={SiDaisyuiHex} />,
        tool: 'Daisy UI',
    },
    {
        node: <SiReacthookform color={SiReacthookformHex} />,
        tool: 'React Hook Form',
    },
    {
        node: (
            <svg
                width="60"
                height="45"
                viewBox="0 0 60 45"
                fill="none"
                className="size-5"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 0H15V15H30V30H15V45H0V30V15V0ZM45 30V15H30V0H45H60V15V30V45H45H30V30H45Z"
                    className="fill-white"
                />
            </svg>
        ),
        tool: 'BetterAuth',
    },
    {
        node: <SiExpo color={SiExpoHex} />,
        tool: 'Expo',
    },
];

export function Skills() {
    const t = useTranslate()('skillsSection');

    return (
        <>
            <h2 className="font-primary font-extrabold text-3xl pt-12 mb-2">
                {t('title')}
            </h2>
            <p className="op-50">{t('description')}</p>
            <div className="flex flex-col gap-4 py-8">
                <div className="flex gap-2 items-center px-4">
                    <SiTypescript
                        color={SiTypescriptHex}
                        className="size-16 min-w-16"
                    />
                    <p>{t('1')}</p>
                </div>
                <div className="flex gap-2 items-center px-4">
                    <SiReact color={SiReactHex} className="size-16 min-w-16" />
                    <p>{t('2')}</p>
                </div>
                <div className="flex gap-2 items-center px-4">
                    <SiNodedotjs
                        color={SiNodedotjsHex}
                        className="size-16 min-w-16"
                    />
                    <p>{t('3')}</p>
                </div>
            </div>

            <h3 className="font-primary font-extrabold text-2xl flex items-center gap-1">
                <Terminal className="text-lime-3" />
                {t('main.title')}
            </h3>
            <p className="op-50">{t('main.description')}</p>
            <div className="relative overflow-hidden w-full max-w-full">
                <Carousel tools={mainTools} />
            </div>
            <h3 className="font-primary font-extrabold text-xl flex items-center gap-1 op-80">
                <Shapes className="text-lime-3" />
                {t('others.title')}
            </h3>
            <p className="op-50">{t('others.description')}</p>
            <div className="relative overflow-hidden w-full max-w-full">
                <Carousel tools={toolsAndTechnologies} />
            </div>
        </>
    );
}
