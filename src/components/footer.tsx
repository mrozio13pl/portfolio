import { useTranslate } from '@/i18n';
import { CodeXml } from 'lucide-react';

export function Footer() {
    const t = useTranslate();

    return (
        <div className="w-full border-t-2 border-gray8/50 flex justify-between py-4 px-8">
            <p className="text-gray-2 flex gap-2">
                {t('footer')}{' '}
                <a
                    href="https://github.com/mrozio13pl/portfolio"
                    rel="noreferrer"
                    target="_blank"
                    className="underline inline-flex">
                    open source
                </a>
                <CodeXml />
            </p>
            <p className="text-gray-7">
                &copy; mrozio13pl ~ {new Date().getFullYear()}
            </p>
        </div>
    );
}
