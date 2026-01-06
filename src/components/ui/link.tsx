import React from 'react';
import clsx from 'clsx';
import { SquareArrowUpRight } from 'lucide-react';
import { useSection, type Section } from '@/hooks/section';

export function Link({
    children,
    className,
    ...props
}: React.HTMLProps<HTMLAnchorElement>) {
    const { setCurrentSection } = useSection();

    return (
        <a
            className={clsx(
                'inline-flex align-baseline translate-y-6px items-center gap-1 duration-100 rounded-lg hover:bg-white/10 pl-1 pr-2 -mt-1.5',
                className
            )}
            onClick={() => props.href?.startsWith('#') && setCurrentSection(props.href!.slice(1) as Section)}
            target={props.href?.startsWith('http') ? '_blank' : void 0}
            {...props}>
            <SquareArrowUpRight className="size-5" /> {children}
        </a>
    );
}
