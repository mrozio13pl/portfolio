import { clsx } from 'clsx';

export function Flag({ className, ...props }: React.ComponentProps<'span'>) {
    return <span className={clsx('*:(w-8 rounded-sm)', className)} {...props} />;
}
