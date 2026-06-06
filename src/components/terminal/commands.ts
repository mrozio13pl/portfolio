import { CHATFOLIO_BASE_URL, EMAIL, GITHUB, LINKED_IN } from '@/constants';
import { createTerminalSpinner } from './spinner';
import ansis from 'ansis';
import ky from 'ky';

const OPEN_TARGETS = {
    chatfolio: CHATFOLIO_BASE_URL,
    github: GITHUB,
    linkedin: LINKED_IN,
    email: `mailto:${EMAIL}`,
    mail: `mailto:${EMAIL}`,
    cv: '/cv.pdf',
} as const;

type WriteFn = (data: string | Uint8Array) => void;

type WttrResponse = {
    current_condition?: Array<{
        FeelsLikeC?: string;
        humidity?: string;
        temp_C?: string;
        weatherDesc?: Array<{ value?: string }>;
        winddir16Point?: string;
        windspeedKmph?: string;
    }>;
};

export type CommandContext = {
    args: string[];
    rawArgs: string;
    commands: TerminalCommand[];
    askChatfolio: (question: string) => Promise<void>;
    clearAgentHistory: () => void;
    write: WriteFn;
    writePrompt: () => void;
};

type CommandRun = (ctx: CommandContext) => void | Promise<void>;

type TerminalCommandDefinition = {
    name: string;
    aliases?: string[];
    description: string;
    usage?: string;
    run: CommandRun;
};

export type TerminalCommand = TerminalCommandDefinition & {
    aliases: string[];
};

export function defineCommand(command: TerminalCommandDefinition): TerminalCommand {
    return {
        aliases: [],
        ...command,
    };
}

function openTarget(target: string) {
    if (target.startsWith('mailto:')) {
        window.location.href = target;
        return;
    }

    window.open(target, '_blank', 'noopener,noreferrer');
}

export const COMMANDS = [
    defineCommand({
        name: 'agent',
        aliases: ['ask'],
        description: 'ask chatfolio agent',
        usage: 'agent <question>',
        async run({ askChatfolio, rawArgs, write, writePrompt }) {
            const question = rawArgs.trim();

            if (!question) {
                write(`${ansis.yellowBright('Usage:')} ${ansis.bold('agent <question>')}\r\n`);
                writePrompt();
                return;
            }

            await askChatfolio(question);
        },
    }),
    defineCommand({
        name: 'cat',
        description: 'read fake files',
        usage: 'cat secrets',
        run({ rawArgs, write, writePrompt }) {
            const file = rawArgs.trim().toLowerCase();

            if (!file) {
                write(`${ansis.yellowBright('Usage:')} ${ansis.bold('cat secrets')}\r\n`);
                writePrompt();
                return;
            }

            if (['secrets', 'secrets.txt'].includes(file)) {
                write('no secrets, just bad commit messages\r\n');
                writePrompt();
                return;
            }

            write(`cat: ${file}: No such file\r\n`);
            writePrompt();
        },
    }),
    defineCommand({
        name: 'open',
        aliases: ['xdg-open'],
        description: 'open portfolio links',
        usage: 'open <github|linkedin|email|cv|chatfolio>',
        run({ rawArgs, write, writePrompt }) {
            const targetName = rawArgs.trim().toLowerCase();

            if (!targetName) {
                write(`${ansis.yellowBright('Usage:')} ${ansis.bold('open <target>')}\r\n`);
                write(`targets: ${Object.keys(OPEN_TARGETS).join(', ')}\r\n`);
                writePrompt();
                return;
            }

            const target = OPEN_TARGETS[targetName as keyof typeof OPEN_TARGETS];

            if (!target) {
                write(`open: unknown target: ${targetName}\r\n`);
                write(`targets: ${Object.keys(OPEN_TARGETS).join(', ')}\r\n`);
                writePrompt();
                return;
            }

            openTarget(target);
            writePrompt();
        },
    }),
    defineCommand({
        name: 'weather',
        aliases: ['wttr'],
        description: 'show real weather via wttr.in',
        usage: 'weather [location]',
        async run({ rawArgs, write, writePrompt }) {
            const location = rawArgs.trim() || 'Rabka';
            const spinner = createTerminalSpinner(write, 'fetching wttr.in');
            spinner.start();

            try {
                const weather = await ky
                    .get(`https://wttr.in/${encodeURIComponent(location)}`, {
                        searchParams: { format: 'j1' },
                    })
                    .json<WttrResponse>();
                const current = weather.current_condition?.[0];

                spinner.stop();

                if (!current) {
                    write(`${ansis.red('weather failed: empty wttr response')}\r\n`);
                    return;
                }

                write(
                    [
                        `${ansis.cyan(location)}: ${current.weatherDesc?.[0]?.value ?? 'unknown'}`,
                        `temp: ${current.temp_C ?? '?'}°C, feels: ${current.FeelsLikeC ?? '?'}°C`,
                        `wind: ${current.windspeedKmph ?? '?'} km/h ${current.winddir16Point ?? ''}`.trim(),
                        `humidity: ${current.humidity ?? '?'}%`,
                    ].join('\r\n') + '\r\n',
                );
            } catch (error) {
                spinner.stop();
                console.error(error);
                write(`${ansis.red('weather failed')}\r\n`);
            } finally {
                spinner.stop();
                writePrompt();
            }
        },
    }),
    defineCommand({
        name: 'chatfolio',
        description: 'open chatfolio in a new tab',
        run({ writePrompt }) {
            openTarget(CHATFOLIO_BASE_URL);
            writePrompt();
        },
    }),
    defineCommand({
        name: 'clear',
        description: 'clear terminal',
        run({ write, writePrompt }) {
            write('\x1b[2J\x1b[H');
            writePrompt();
        },
    }),
    defineCommand({
        name: 'reset',
        description: 'clear agent memory',
        run({ clearAgentHistory, write, writePrompt }) {
            clearAgentHistory();
            write(`${ansis.green('history cleared')}\r\n`);
            writePrompt();
        },
    }),
    defineCommand({
        name: 'help',
        aliases: ['?'],
        description: 'show this help',
        run({ commands, write, writePrompt }) {
            const lines = [
                ansis.bold(
                    'a simple terminal for asking my ai about me (my-chatfolio.vercel.app)\r\n',
                ),
                ansis.bold('commands'),
                ...commands.map((command) => {
                    const names = [command.name, ...command.aliases].join(', ');
                    const usage = command.usage ? ansis.dim(` (${command.usage})`) : '';
                    return `  ${names.padEnd(16)} ${command.description}${usage}`;
                }),
            ];

            write(lines.join('\r\n') + '\r\n');
            writePrompt();
        },
    }),
] satisfies TerminalCommand[];

export const COMMAND_MAP = new Map(
    COMMANDS.flatMap((command) =>
        [command.name, ...command.aliases].map((name) => [name, command] as const),
    ),
);
