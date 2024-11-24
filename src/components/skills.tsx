import {
    SiEslint,
    SiEslintHex,
    SiGit,
    SiGitHex,
    SiJavascript,
    SiJavascriptHex,
    SiJest,
    SiJestHex,
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
    SiPnpm,
    SiPnpmHex,
    SiPreact,
    SiPreactHex,
    SiPrettier,
    SiPrettierHex,
    SiReact,
    SiReactHex,
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
import { useTranslation } from '@/i18n/use-translator';

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
        node: <SiEslint color={SiEslintHex} />,
        tool: 'ESLint',
    },
    {
        node: <SiGit color={SiGitHex} />,
        tool: 'Git',
    },
    {
        node: <SiPrettier color={SiPrettierHex} />,
        tool: 'Prettier',
    },
    {
        node: <img src="/icons/vscode.svg" alt="vscode" className="size-12" />,
        tool: 'VSCode',
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
        node: <SiVitest color={SiVitestHex} />,
        tool: 'Vitest',
    },
    {
        node: <SiJest color={SiJestHex} />,
        tool: 'Jest',
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
        node: <SiPnpm color={SiPnpmHex} />,
        tool: 'PNPM',
    },
];

export function Skills() {
    const t = useTranslation();

    return (
        <>
            <h2 className="font-primary font-extrabold text-3xl pt-12">
                {t('skills' as any) || 'Skills'}
            </h2>
            <p className="op-50">
                I'm very familiar with the Typescript/Javascript ecosystems and
                very good at problem solving. I've been in this space for a long
                time and I feel very comfortable with it.
            </p>
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

            <h3 className="font-primary font-extrabold text-2xl flex items-center gap-1">
                <Terminal className="text-lime-3" />
                Main stuff
            </h3>
            <p className="op-50">
                Languages and tools I'm most familiar with and use on a daily
                basis
            </p>
            <div className="relative overflow-hidden w-full max-w-full">
                <Carousel tools={mainTools} />
            </div>
            <h3 className="font-primary font-extrabold text-xl flex items-center gap-1 op-80">
                <Shapes className="text-lime-3" />
                Other tools and technologies
            </h3>
            <p className="op-50">
                Other tools and technologies I have a decent experience with
            </p>
            <div className="relative overflow-hidden w-full max-w-full">
                <Carousel tools={toolsAndTechnologies} />
            </div>
        </>
    );
}
