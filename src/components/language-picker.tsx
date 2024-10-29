import { Languages } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { translations } from '@/i18n/translations';
import { useLocale, type Language } from '@/i18n/use-translator';

export function LanguagePicker() {
    const { locale, setLocale } = useLocale();

    return (
        <Select defaultValue={locale} onValueChange={(value) => setLocale(value as Language)}>
            <SelectTrigger className="w-min">
                <Languages />
            </SelectTrigger>
            <SelectContent>
                {Object.keys(translations).map((lang) => (
                    <SelectItem value={lang} key={lang}>
                        {translations[lang as Language].languageName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}