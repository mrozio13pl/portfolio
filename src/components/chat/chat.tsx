import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import ky from 'ky';
import { Markdown } from './markdown';
import { Wink } from './^^';
import {
    ArrowUpRight,
    Bot,
    ChevronDown,
    ChevronUp,
    MessageCircleWarning,
    RefreshCcw,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { CHATFOLIO_ID } from '@/constants';
import { useTranslate } from '@/i18n';

interface TMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
    isError?: boolean;
}

function Message({ message }: { message: TMessage }) {
    const timestamp = new Date(message.timestamp).toLocaleTimeString();
    const errorMessage = 'Something went wrong, please try again!';

    return (
        <div
            className={clsx(
                'px-4 py-2 flex w-full',
                message.role === 'user' ? 'justify-end' : 'gap-2'
            )}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger
                        className={clsx(
                            'break-words rounded-lg py-2 px-4',
                            message.isError && 'bg-red-500/20',
                            message.role === 'assistant'
                                ? 'border border-gray-500/20 text-left'
                                : 'max-w-[60%] bg-gray-500/20 py-3 text-right'
                        )}>
                        {message.isError && (
                            <span className="flex items-center gap-1">
                                <MessageCircleWarning />
                                <p className="font-medium text-lg">Woops!</p>
                            </span>
                        )}
                        <Markdown
                            content={
                                message.isError ? errorMessage : message.content
                            }
                        />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs bg-gray-8/90">
                        {timestamp}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export default function Chat() {
    const t = useTranslate();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [input, setInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const isDisabled =
        isLoading || isBotTyping || !inputRef.current?.value.trim().length;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const isNearBottom = () => {
        if (!containerRef.current) return false;

        return (
            containerRef.current.scrollHeight -
                containerRef.current.clientHeight -
                200 <=
            containerRef.current.scrollTop
        );
    };

    useEffect(() => {
        const storedMessages = localStorage.getItem('messages');

        try {
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }
        } catch (error) {
            localStorage.removeItem('messages');
            console.error('Error parsing messages:', error);
        }
    }, []);

    useEffect(() => {
        if (isNearBottom()) {
            scrollToBottom();
        }
    }, [messages, isLoading]);

    useEffect(() => {
        if (messages.length) {
            localStorage.setItem('messages', JSON.stringify(messages));
        }
    }, [messages]);

    function reset() {
        setMessages([]);
        localStorage.removeItem('messages');
    }

    async function submit() {
        if (!input.trim().length || isDisabled) return;

        setIsLoading(true);
        setIsBotTyping(true);

        try {
            setMessages((prev) => [
                ...prev,
                { role: 'user', content: input, timestamp: Date.now() },
                { role: 'assistant', content: '', timestamp: Date.now() },
            ]);

            const { body } = await ky.post(
                'https://my-chatfolio.vercel.app/api/v1/messages',
                {
                    json: {
                        messages,
                        message: input,
                        clientId: CHATFOLIO_ID,
                        stream: true,
                    },
                }
            );

            const reader = body!.getReader();
            const decoder = new TextDecoder('utf-8');
            let contentBuffer = '';

            inputRef.current!.value = '';
            setInput('');
            setIsLoading(false);

            while (true) {
                const { value, done } = await reader.read();

                if (value) {
                    const chunk = decoder.decode(value);
                    contentBuffer += chunk;

                    setMessages((prev) => {
                        const updatedMessages = [...prev];
                        updatedMessages[messages.length + 1].content =
                            contentBuffer;
                        updatedMessages[messages.length + 1].timestamp =
                            Date.now();
                        return updatedMessages;
                    });
                }

                if (done) break;
            }
        } catch (error) {
            console.error(error);
            setMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[messages.length + 1].timestamp = Date.now();
                updatedMessages[messages.length + 1].isError = true;
                return updatedMessages;
            });
        } finally {
            setIsLoading(false);
            setIsBotTyping(false);
        }
    }

    return (
        <motion.div
            className="fixed bottom-4 right-4 z-20 w-80 border border-gray-900/50 bg-gray-900/10 backdrop-blur-lg rounded-lg text-white flex flex-col"
            animate={{ height: isCollapsed ? 'auto' : '55%' }}
            initial={false}
            transition={{ type: 'tween', duration: 0.3 }}>
            <div
                className={clsx(
                    'py-4 lt-mobile:py-2 px-8 flex justify-between items-center w-full cursor-pointer *:select-none z-20',
                    !isCollapsed && 'border-b border-b-gray-900/50'
                )}
                onClick={() => setIsCollapsed(!isCollapsed)}>
                <div className="flex items-center gap-4">
                    <div className="bg-lime-5 animate-pulse rounded-full size-2.5 -ml-2" />
                    <div>
                        <p className="text-sm">{t('chat.header')}</p>
                        <h1 className="font-primary font-extrabold text-2xl -mt-1">
                            Mrozio
                        </h1>
                    </div>
                </div>
                <div>
                    {isCollapsed ? (
                        <ChevronUp size={16} />
                    ) : (
                        <ChevronDown size={16} />
                    )}
                </div>
            </div>
            {!isCollapsed && (
                <motion.div
                    className="w-full flex-grow overflow-hidden flex flex-col"
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={{
                        collapsed: { height: 0, opacity: 0 },
                        expanded: { height: 'auto', opacity: 1 },
                    }}
                    transition={{ type: 'tween', duration: 0.3 }}>
                    <div
                        className="flex flex-col w-full overflow-y-auto flex-grow"
                        ref={containerRef}>
                        {messages.length ? (
                            <>
                                {messages
                                    .filter(
                                        (message) =>
                                            message.content || message.isError
                                    )
                                    .map((message, index) => (
                                        <Message
                                            key={index}
                                            message={message}
                                        />
                                    ))}
                                {isLoading && (
                                    <div className="border border-gray-500/20 ml-4 mb-2 px-4 py-2 rounded-lg text-white w-min">
                                        {t('chat.loading')}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="h-full flex flex-col justify-center items-center text-center overflow-y-auto overflow-x-hidden break-words">
                                <Bot className="size-16" />
                                <h2 className="font-semibold text-xl">
                                    {t('chat.title')}
                                </h2>
                                <p className="text-sm text-balance text-gray-4 mt-2">
                                    {t('chat.subtitle')}
                                </p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="w-full flex items-center p-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        className="!p-2"
                                        disabled={isBotTyping}
                                        onClick={reset}>
                                        <RefreshCcw />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-900/50">
                                    {t('chat.reset')}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <input
                            type="text"
                            className="[all:unset] w-full py-2 px-4 bg-black/20 rounded-md"
                            placeholder={t('chat.placeholder')}
                            ref={inputRef}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    submit();
                                }
                            }}
                            maxLength={200}
                        />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        type="button"
                                        className="!p-2 bg-lime-4 hover:bg-lime-5"
                                        onClick={() => submit()}
                                        disabled={isDisabled}>
                                        <ArrowUpRight />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-900/50">
                                    {t('chat.send')}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex justify-center text-sm">
                        <p className="text-sm op-70 mb-2">
                            {t('chat.footer')}{' '}
                            <a
                                href="https://my-chatfolio.vercel.app/"
                                target="_blank"
                                rel="noreferrer"
                                className="underline">
                                Chatfolio
                            </a>{' '}
                            <Wink />
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
