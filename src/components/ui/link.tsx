import React from 'react';
import clsx from 'clsx';
import { SquareArrowUpRight } from 'lucide-react';

export function Link({
    children,
    className,
    ...props
}: React.HTMLProps<HTMLAnchorElement>) {
    return (
        <a
            className={clsx(
                'inline-flex items-center gap-1 duration-100 rounded-lg hover:bg-white/10 px-1',
                className
            )}
            {...props}>
            <SquareArrowUpRight className="size-5" /> {children}
        </a>
    );
}
