import { SECTIONS } from '@/constants';
import { Button } from './ui/button';
import { LanguagePicker } from './language-picker';
import { useTranslation } from '@/i18n/use-translator';
import {
    Brain,
    FolderOpenDot,
    GraduationCap,
    Handshake,
    PersonStanding,
    type LucideIcon,
} from 'lucide-react';

const sectionIcons: Record<(typeof SECTIONS)[number], LucideIcon> = {
    about: PersonStanding,
    contact: Handshake,
    experience: GraduationCap,
    projects: FolderOpenDot,
    skills: Brain,
};

export function Navbar() {
    const t = useTranslation();

    return (
        <nav className="bg-gray-800/40 my-4 p-2 rounded-full flex justify-between items-center text-xl [&_p]:select-none md:static fixed top-0 backdrop-blur-xl z-20 mobile:w-full mobile:max-w-200">
            <div className="block lt-mobile:hidden">
                <p className="font-primary font-extrabold px-4">
                    <a href="/">mrozio</a>
                </p>
            </div>
            <div className="flex mobile:gap-1 items-center">
                {SECTIONS.map((section, index) => {
                    const Icon = sectionIcons[section];

                    return (
                        <Button variant="ghost" className="!p-2" key={index}>
                            <a href={'#' + section} className="capitalize">
                                <span className="md:block hidden">
                                    {t(section as any) || section}
                                </span>
                                <span className="md:hidden">
                                    <Icon />
                                </span>
                            </a>
                        </Button>
                    );
                })}
                <LanguagePicker />
            </div>
        </nav>
    );
}
