import { create } from 'zustand';
import delve from 'dlv';
import { type TranslationKeys, translations } from './translations.js';

export type Language = keyof typeof translations;

interface LocaleState {
    locale: Language;
    setLocale: (locale: Language) => void;
}

const defaultLocale =
    localStorage.getItem('locale') ||
    navigator.language.slice(0, 2).toLowerCase();

export const useLocale = create<LocaleState>((set) => ({
    locale: defaultLocale as Language,
    setLocale: (locale: Language) => {
        set(() => ({ locale }));
        localStorage.setItem('locale', locale);
    },
}));

export function useTranslation() {
    const { locale } = useLocale();
    const t = (key: TranslationKeys) =>
        delve(translations[locale], key) as string;

    return t;
}
