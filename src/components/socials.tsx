import { useState } from 'react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { AtSign, FileUser } from 'lucide-react';
import { clsx } from 'clsx';
import { EMAIL, GITHUB, LINKED_IN } from '@/constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

// this is bcs i cant upgrade simple icons since they removed some mcroslop related icons like linkedin i believe
// simple-icons/simple-icons#10019
const LinkedIn = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <title>LinkedIn</title>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
    </svg>
);

export function Socials() {
    const [showFullMail, setShowFullMail] = useState(false);
    const className = 'op-50 duration-100 hover:op-90';

    return (
        <div className="mt-4 flex gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <a href="/cv.pdf" rel="noreferrer" target="_blank" className={className}>
                            <FileUser />
                        </a>
                    </TooltipTrigger>
                    <TooltipContent>Resume</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <a href={GITHUB} rel="noreferrer" target="_blank" className={className}>
                <SiGithub />
            </a>
            <a href={LINKED_IN} rel="noreferrer" target="_blank" className={className}>
                <LinkedIn />
            </a>
            <a
                href={'mailto:' + EMAIL}
                className={clsx(className, 'flex items-center gap-1 w-full')}
                onMouseOver={() => setShowFullMail(true)}
                onMouseLeave={() => setShowFullMail(false)}
            >
                <AtSign className="min-w-6" />
                <span
                    className={clsx(
                        'inline-block transition-all duration-600 ease-in-out overflow-hidden',
                        showFullMail ? 'w-full opacity-100' : 'w-0 opacity-0',
                    )}
                >
                    {EMAIL}
                </span>
            </a>
        </div>
    );
}
