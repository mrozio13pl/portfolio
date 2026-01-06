import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface TextShimmerProps {
    children: string;
    className?: string;
}

export function TextShimmer({
    children,
    className,
}: TextShimmerProps) {
    const dynamicSpread = useMemo(() => {
        return children.length * 2;
    }, [children]);

    return (
        <motion.p
            className={clsx(
                'relative inline-block bg-[length:250%_100%,auto] bg-clip-text',
                'text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]',
                '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
                'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]',
                className
            )}
            initial={{ backgroundPosition: '100% center' }}
            animate={{ backgroundPosition: '0% center' }}
            transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
            }}
            style={
                {
                    '--spread': `${dynamicSpread}px`,
                    backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
                } as React.CSSProperties
            }
        >
            {children}
        </motion.p>
    );
}