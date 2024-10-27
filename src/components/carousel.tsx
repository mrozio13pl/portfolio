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
    SiNpm,
    SiNpmHex,
    SiPhp,
    SiPhpHex,
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
import type { ReactElement } from 'react';

const tools: { node: ReactElement; tool: string }[] = [
    {
        node: <SiTypescript color={SiTypescriptHex} />,
        tool: 'Typescript',
    },
    {
        node: <SiJavascript color={SiJavascriptHex} />,
        tool: 'Javascript',
    },
    {
        node: <SiNextdotjs />,
        tool: 'Next.js',
    },
    {
        node: <SiReact color={SiReactHex} />,
        tool: 'React',
    },
    {
        node: <SiMongodb color={SiMongodbHex} />,
        tool: 'MongoDB',
    },
    {
        node: <SiTurborepo color={SiTurborepoHex} />,
        tool: 'Turborepo',
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
        node: <SiEslint color={SiEslintHex} />,
        tool: 'ESLint',
    },
    {
        node: <SiGit color={SiGitHex} />,
        tool: 'Git',
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
];

export function Carousel() {
    return (
        <div className="flex justify-center items-center gap-4 track h-24">
            {tools.concat(tools).map(({ node, tool }, index) => (
                <div
                    className="flex-shrink-0 [&_svg]:size-12 flex flex-col items-center duration-100 hover:scale-105 slider"
                    key={index}>
                    {node}
                    <p className="text-white/50 text-xs">{tool}</p>
                </div>
            ))}
        </div>
    );
}
