import { useState } from 'react';
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';
import { AtSign } from 'lucide-react';
import clsx from 'clsx';
import { EMAIL, GITHUB, LINKED_IN } from '@/constants';

export function Socials() {
    const [showFullMail, setShowFullMail] = useState(false);
    const className = 'op-50 duration-100 hover:op-90';

    return (
        <div className="mt-4 flex gap-2">
            <a href={GITHUB} target="_blank" className={className}>
                <SiGithub />
            </a>
            <a href={LINKED_IN} target="_blank" className={className}>
                <SiLinkedin />
            </a>
            <a
                href={'mailto:' + EMAIL}
                className={clsx(className, 'flex items-center gap-1 w-full')}
                onMouseOver={() => setShowFullMail(true)}
                onMouseLeave={() => setShowFullMail(false)}>
                <AtSign className="min-w-6" />
                <span
                    className={clsx(
                        'inline-block transition-all duration-600 ease-in-out overflow-hidden',
                        showFullMail ? 'w-full opacity-100' : 'w-0 opacity-0'
                    )}>
                    {EMAIL}
                </span>
            </a>
        </div>
    );
}
