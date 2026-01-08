import { SECTIONS } from '@/constants';
import { Button } from './ui/button';
import { LanguagePicker } from './language-picker';
import { useTranslate } from '@/i18n';
import {
    FolderOpenDot,
    GraduationCap,
    Handshake,
    PersonStanding,
    type LucideIcon,
} from 'lucide-react';
import { startTransition } from 'react';
import { useSection } from '@/hooks/section';
import clsx from 'clsx';

const sectionIcons: Record<(typeof SECTIONS)[number], LucideIcon> = {
    about: PersonStanding,
    contact: Handshake,
    experience: GraduationCap,
    projects: FolderOpenDot,
};

export function Navbar() {
    const t = useTranslate()('sections');
    const { currentSection, setCurrentSection } = useSection();

    return (
        <span className='md:static fixed top-0 left-0 flex justify-center w-full z-6'>
            <nav className="bg-gray-800/40 mt-12 p-2 rounded-full md:w-full flex justify-between items-center text-xl [&_p]:select-none backdrop-blur-xl">
                <div className="flex mobile:gap-1 items-center mx-2">
                    {SECTIONS.map((section, index) => {
                        const Icon = sectionIcons[section];

                        return (
                            <Button
                                variant="ghost"
                                as="a"
                                href={'#' + section}
                                className={clsx("!p-2 capitalize", section === currentSection && 'bg-white/20 pointer-events-none')}
                                onClick={() => setCurrentSection(section)}
                                key={index}
                            >
                                <span className="mobile:block hidden">
                                    {t(section)}
                                </span>
                                <span className="mobile:hidden">
                                    <Icon />
                                </span>
                            </Button>
                        );
                    })}
                </div>
                <LanguagePicker />
            </nav>
        </span>
    );
}
