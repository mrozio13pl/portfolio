import { CHATFOLIO_BASE_URL, CHATFOLIO_ID } from '@/constants';
import { COMMAND_MAP, COMMANDS } from './commands';
import { CLEAR, createTerminalSpinner } from './spinner';
import { MarkdownRenderer } from '@wterm/markdown';
import { Terminal, useTerminal } from '@wterm/react';
import ansis from 'ansis';
import ky from 'ky';
import { Minus, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import '@wterm/react/css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

interface Position {
    x: number;
    y: number;
}

const PROMPT = ansis.greenBright('$ ');
const STORAGE_KEY = 'messages';
const greetings = `\r╔╦╗ ╦═╗ ╔═╗ ╔═╗ ╦ ╔═╗
\r║║║ ╠╦╝ ║ ║ ╔═╝ ║ ║ ║
\r╩ ╩ ╩╚═ ╚═╝ ╚═╝ ╩ ╚═╝`;

function normalizeTerminalText(text: string) {
    return text.replace(/\r?\n/g, '\r\n');
}

function clampTerminalPosition(position: Position, element: HTMLElement | null): Position {
    const margin = 16;
    const width = element?.offsetWidth ?? Math.min(window.innerWidth - margin * 2, 760);
    const height = element?.offsetHeight ?? 480;
    const maxX = Math.max(margin, window.innerWidth - width - margin);
    const maxY = Math.max(margin, window.innerHeight - height - margin);

    return {
        x: Math.min(Math.max(margin, position.x), maxX),
        y: Math.min(Math.max(margin, position.y), maxY),
    };
}

export default function AppTerminal() {
    const { ref, write: terminalWrite, focus } = useTerminal();
    const [isMinimized, setIsMinimized] = useState(true);
    const [position, setPosition] = useState<Position>({ x: 16, y: 16 });
    const inputRef = useRef('');
    const commandHistoryRef = useRef<string[]>([]);
    const commandHistoryIndexRef = useRef<number | null>(null);
    const commandDraftRef = useRef('');
    const historyRef = useRef<Message[]>([]);
    const busyRef = useRef(false);
    const abortRef = useRef<AbortController | null>(null);
    const terminalContainerRef = useRef<HTMLElement>(null);
    const scrollFrameRef = useRef<number | null>(null);
    const scrollTimeoutRef = useRef<number | null>(null);
    const dragOffsetRef = useRef<Position | null>(null);
    const hasPlacedTerminalRef = useRef(false);

    const scrollToBottom = useCallback(() => {
        if (scrollTimeoutRef.current !== null || scrollFrameRef.current !== null) return;

        scrollTimeoutRef.current = window.setTimeout(() => {
            scrollTimeoutRef.current = null;
            scrollFrameRef.current = requestAnimationFrame(() => {
                scrollFrameRef.current = null;
                // internal wterm stuff
                const instance = ref.current?.instance as { _scrollToBottom?: () => void } | null;
                instance?._scrollToBottom?.();
            });
        }, 0);
    }, [ref]);

    const write = useCallback(
        (data: string | Uint8Array) => {
            terminalWrite(data);
            scrollToBottom();
        },
        [terminalWrite, scrollToBottom],
    );

    const writePrompt = useCallback(() => {
        inputRef.current = '';
        write(PROMPT);
    }, [write]);

    const placeTerminal = useCallback(() => {
        setPosition((currentPosition) => {
            const terminalElement = terminalContainerRef.current;
            const nextPosition = hasPlacedTerminalRef.current
                ? currentPosition
                : {
                      x:
                          window.innerWidth -
                          (terminalElement?.offsetWidth ?? Math.min(window.innerWidth - 32, 760)) -
                          16,
                      y: 16,
                  };

            hasPlacedTerminalRef.current = true;
            return clampTerminalPosition(nextPosition, terminalElement);
        });
    }, []);

    const startDrag = useCallback((event: PointerEvent<HTMLElement>) => {
        if (event.button !== 0) return;
        if ((event.target as HTMLElement).closest('button')) return;

        const rect = terminalContainerRef.current?.getBoundingClientRect();
        if (!rect) return;

        dragOffsetRef.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
        event.preventDefault();
    }, []);

    const moveDrag = useCallback((event: PointerEvent<HTMLElement>) => {
        if (!dragOffsetRef.current) return;

        setPosition(
            clampTerminalPosition(
                {
                    x: event.clientX - dragOffsetRef.current.x,
                    y: event.clientY - dragOffsetRef.current.y,
                },
                terminalContainerRef.current,
            ),
        );
    }, []);

    const stopDrag = useCallback((event: PointerEvent<HTMLElement>) => {
        dragOffsetRef.current = null;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }, []);

    const clearAgentHistory = useCallback(() => {
        historyRef.current = [];
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const replaceInput = useCallback(
        (value: string) => {
            inputRef.current = value;
            write(CLEAR + PROMPT + value);
        },
        [write],
    );

    const pushCommandHistory = useCallback((line: string) => {
        const command = line.trim();

        if (!command) return;
        if (commandHistoryRef.current.at(-1) === command) return;

        commandHistoryRef.current = [...commandHistoryRef.current, command];
    }, []);

    const showCommandHistory = useCallback(
        (direction: 'previous' | 'next') => {
            const history = commandHistoryRef.current;

            if (!history.length) return;

            if (direction === 'previous' && commandHistoryIndexRef.current === null) {
                commandDraftRef.current = inputRef.current;
            }

            if (direction === 'previous') {
                commandHistoryIndexRef.current =
                    commandHistoryIndexRef.current === null
                        ? history.length - 1
                        : Math.max(0, commandHistoryIndexRef.current - 1);
                replaceInput(history[commandHistoryIndexRef.current]);
                return;
            }

            if (commandHistoryIndexRef.current === null) return;

            if (commandHistoryIndexRef.current >= history.length - 1) {
                commandHistoryIndexRef.current = null;
                replaceInput(commandDraftRef.current);
                return;
            }

            commandHistoryIndexRef.current += 1;
            replaceInput(history[commandHistoryIndexRef.current]);
        },
        [replaceInput],
    );

    const askChatfolio = useCallback(
        async (question: string) => {
            if (!question.trim()) {
                write(`${ansis.yellowBright('Usage:')} ${ansis.bold('agent <question>')}\r\n`);
                writePrompt();
                return;
            }

            if (busyRef.current) {
                write(`${ansis.yellow('Agent already running. Press Ctrl+C to abort.')}\r\n`);
                writePrompt();
                return;
            }

            busyRef.current = true;
            abortRef.current = new AbortController();

            let answer = '';
            const spinner = createTerminalSpinner(write, 'chatfolio');
            spinner.start();

            try {
                const { body } = await ky.post(CHATFOLIO_BASE_URL + '/api/v1/messages', {
                    json: {
                        messages: historyRef.current,
                        message: question,
                        clientId: CHATFOLIO_ID,
                        stream: true,
                    },
                    signal: abortRef.current.signal,
                });

                const reader = body!.getReader();
                const decoder = new TextDecoder('utf-8');
                const markdownRenderer = new MarkdownRenderer({ width: 82 });

                while (true) {
                    const { value, done } = await reader.read();

                    if (value) {
                        const chunk = decoder.decode(value);
                        const renderedChunk = markdownRenderer.push(chunk);
                        answer += chunk;

                        if (renderedChunk) {
                            spinner.stop();
                            write(normalizeTerminalText(renderedChunk));
                        }
                    }

                    if (done) break;
                }

                const renderedTail = markdownRenderer.flush();

                if (renderedTail) {
                    spinner.stop();
                    write(normalizeTerminalText(renderedTail));
                }

                spinner.stop();

                historyRef.current = [
                    ...historyRef.current,
                    { role: 'user', content: question, timestamp: Date.now() },
                    { role: 'assistant', content: answer, timestamp: Date.now() },
                ];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(historyRef.current));
                write('\r\n');
            } catch (error) {
                const hadSpinner = spinner.stop();
                const prefix = hadSpinner ? '' : '\r\n';

                if (error instanceof DOMException && error.name === 'AbortError') {
                    write(`${prefix}${ansis.yellow('aborted')}\r\n`);
                } else {
                    console.error(error);
                    write(`${prefix}${ansis.red('Something went wrong. Try again.')}\r\n`);
                }
            } finally {
                spinner.stop();
                busyRef.current = false;
                abortRef.current = null;
                writePrompt();
            }
        },
        [write, writePrompt],
    );

    const runCommand = useCallback(
        (rawLine: string) => {
            const line = rawLine.trim();

            if (!line) {
                writePrompt();
                return;
            }

            const [commandName = ''] = line.split(/\s+/, 1);
            const rawArgs = line.slice(commandName.length).trimStart();
            const args = rawArgs ? rawArgs.split(/\s+/) : [];
            const command = COMMAND_MAP.get(commandName.toLowerCase());

            if (!command) {
                write(`command not found: ${commandName}\r\n`);
                write(`try: ${ansis.bold('agent <question>')} or ${ansis.bold('help')}\r\n`);
                writePrompt();
                return;
            }

            command.run({
                args,
                rawArgs,
                commands: COMMANDS,
                askChatfolio,
                clearAgentHistory,
                write,
                writePrompt,
            });
        },
        [askChatfolio, clearAgentHistory, write, writePrompt],
    );

    const handleData = useCallback(
        (data: string) => {
            if (busyRef.current) {
                if (data.includes('\u0003')) {
                    abortRef.current?.abort();
                }
                return;
            }

            for (let index = 0; index < data.length; index++) {
                const char = data[index];

                if (char === '\x1b') {
                    const sequence = data.slice(index, index + 3);

                    if (sequence === '\x1b[A') {
                        showCommandHistory('previous');
                        index += 2;
                    } else if (sequence === '\x1b[B') {
                        showCommandHistory('next');
                        index += 2;
                    }

                    continue;
                }

                if (char === '\r' || char === '\n') {
                    const line = inputRef.current;
                    inputRef.current = '';
                    commandHistoryIndexRef.current = null;
                    commandDraftRef.current = '';
                    pushCommandHistory(line);
                    write('\r\n');
                    runCommand(line);
                    continue;
                }

                if (char === '\u007f' || char === '\b') {
                    if (inputRef.current.length) {
                        commandHistoryIndexRef.current = null;
                        inputRef.current = inputRef.current.slice(0, -1);
                        write('\b \b');
                    }
                    continue;
                }

                if (char === '\u0003') {
                    inputRef.current = '';
                    commandHistoryIndexRef.current = null;
                    commandDraftRef.current = '';
                    write('^C\r\n');
                    writePrompt();
                    continue;
                }

                if (char >= ' ') {
                    commandHistoryIndexRef.current = null;
                    inputRef.current += char;
                    write(char);
                }
            }
        },
        [runCommand, pushCommandHistory, showCommandHistory, write, writePrompt],
    );

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current !== null) {
                clearTimeout(scrollTimeoutRef.current);
            }

            if (scrollFrameRef.current !== null) {
                cancelAnimationFrame(scrollFrameRef.current);
            }
        };
    }, []);

    useEffect(() => {
        placeTerminal();
        window.addEventListener('resize', placeTerminal);

        return () => window.removeEventListener('resize', placeTerminal);
    }, [placeTerminal]);

    useEffect(() => {
        const storedMessages = localStorage.getItem(STORAGE_KEY);

        try {
            if (storedMessages) {
                historyRef.current = JSON.parse(storedMessages);
            }
        } catch (error) {
            localStorage.removeItem(STORAGE_KEY);
            console.error('Error parsing terminal agent messages:', error);
        }
    }, []);

    if (isMinimized) {
        return (
            <button
                type="button"
                className="fixed bottom-4 right-4 z-50 px-4 py-2 font-mono text-sm text-lime-3 shadow-2xl backdrop-blur-lg hover:underline"
                onClick={() => {
                    setIsMinimized(false);
                    requestAnimationFrame(focus);
                }}
            >
                ~/agent
            </button>
        );
    }

    return (
        <section
            ref={terminalContainerRef}
            className="fixed z-50 w-[calc(100%-2rem)] overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-xl md:w-190"
            style={{ left: position.x, top: position.y }}
        >
            <header
                className="flex h-10 cursor-move touch-none select-none items-center justify-between border-b border-white/10 bg-white/5 px-4 font-mono text-sm text-white/70"
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={stopDrag}
                onPointerCancel={stopDrag}
            >
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Minimize terminal"
                        className="size-3 rounded-full bg-red-400"
                        onClick={() => setIsMinimized(true)}
                    />
                    <button
                        type="button"
                        aria-label="Minimize terminal"
                        className="size-3 rounded-full bg-yellow-400"
                        onClick={() => setIsMinimized(true)}
                    />
                    <button
                        type="button"
                        aria-label="Focus terminal"
                        className="size-3 rounded-full bg-green-400"
                        onClick={focus}
                    />
                    <span className="ml-2">mrozio@portfolio: ~/agent</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Minimize terminal"
                        onClick={() => setIsMinimized(true)}
                    >
                        <Minus size={14} />
                    </button>
                    <button
                        type="button"
                        aria-label="Hide terminal"
                        onClick={() => setIsMinimized(true)}
                    >
                        <X size={14} />
                    </button>
                </div>
            </header>
            <Terminal
                ref={ref}
                className="h-110 max-h-[70dvh] bg-black/80 p-3 font-mono text-sm rounded-t-0! [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                rows={18}
                cols={86}
                autoResize
                cursorBlink
                onData={handleData}
                onReady={() => {
                    write(`${ansis.cyanBright.bold(greetings)}\r\n`);
                    write(
                        `type ${ansis.bold('agent <question>')} to ask chatfolio, or ${ansis.bold('help')} ^^\r\n\r\n`,
                    );
                    writePrompt();
                    focus();
                }}
            />
        </section>
    );
}
