import { useEffect, useState } from 'react';

const QUOTE = "i'm way too addicted to programming";
const TYPING_INTERVAL = 65;

export function Quote() {
    const [isTyping, setIsTyping] = useState(true);
    const [quote, setQuote] = useState('');

    useEffect(() => {
        if (!isTyping) return;

        const timeout = setTimeout(() => {
            if (quote.length === QUOTE.length) {
                setIsTyping(false);
                return;
            }

            setQuote((prev) => prev + QUOTE[prev.length]);
        }, TYPING_INTERVAL);

        return () => clearTimeout(timeout);
    }, [quote]);

    return (
        <p>
            {quote}
            {isTyping && '|'}
        </p>
    );
}
