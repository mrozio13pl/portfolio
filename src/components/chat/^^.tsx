import { useEffect, useState } from 'react';
import clsx from 'clsx';

export function Wink() {
    const [showWink, setShowWink] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowWink(true);

            setTimeout(() => {
                setShowWink(false);
            }, 250);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className={clsx('text-2.5 font-semibold', showWink && 'pr-0.2')}>
            ^ {showWink ? '-' : '^'}
        </span>
    );
}
