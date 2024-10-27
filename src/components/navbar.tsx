import { SECTIONS } from '@/constants';
import { Button } from './ui/button';
import { LanguagePicker } from './language-picker';
import { useTranslation } from '@/i18n/use-translator';

export function Navbar() {
    const t = useTranslation();

    return (
        <nav className="bg-gray-800 my-4 p-2 rounded-full flex justify-between items-center text-xl [&_p]:select-none">
            <div>
                <p className="primary-font font-extrabold px-4">
                    <a href="/">mrozio</a>
                </p>
            </div>
            <div className="flex gap-0 items-center">
                {SECTIONS.map((section, index) => (
                    <Button variant="ghost" key={index}>
                        <a href={'#' + section} className="capitalize">
                            {t(section as any) || section}
                        </a>
                    </Button>
                ))}
                <LanguagePicker />
            </div>
        </nav>
    );
}
