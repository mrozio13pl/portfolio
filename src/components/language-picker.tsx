import { Languages } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { useLocale, translations } from '@/i18n';

export function LanguagePicker() {
    const [locale, setLocale] = useLocale();

    return (
        <Select
            value={locale}
            onValueChange={(value) => setLocale(value)}>
            <SelectTrigger className="w-min">
                <Languages />
            </SelectTrigger>
            <SelectContent>
                {Object.keys(translations).map((lang) => (
                    <SelectItem value={lang} key={lang}>
                        {translations[lang as keyof typeof translations].languageName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}