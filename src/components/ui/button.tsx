import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

const buttonVariants = cva(
    'inline-flex justify-center items-center rounded-full text-sm font-medium focus:outline-none py-2 px-4',
    {
        variants: {
            variant: {
                default: 'focus-visible:ring-2 focus-visible:ring-offset-2',
                ghost: 'duration-100 hover:bg-white/10',
            },
        },
    }
);
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export function Button({
    children,
    className,
    variant = 'default',
}: {
    children: ReactNode;
    variant?: ButtonVariantProps['variant'];
} & React.HTMLProps<HTMLButtonElement>) {
    return (
        <button className={clsx(buttonVariants({ variant }), className)}>
            {children}
        </button>
    );
}
