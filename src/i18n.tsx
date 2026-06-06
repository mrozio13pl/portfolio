import { createI18n } from '@mrozio/i18n';
import { Link } from '@/components/ui/link';
import { useSection } from './hooks/section';

const trans = {
    en: {
        languageName: 'English',
        greeting: 'hi',
        profession: 'Full Stack Developer',
        hourDifference(difference: number) {
            if (difference !== 0) {
                if (difference > 0) {
                    return `+${difference} hour difference`;
                } else {
                    return `${difference} hour difference`;
                }
            }

            return 'Same time';
        },
        sections: {
            country: 'Poland',
            about: 'About me',
            skills: 'Skills',
            contact: 'Contact',
            experience: 'Experience',
            projects: 'Projects',
            with: 'with',
        },
        age: 'y/o',
        country: 'Poland',
        about() {
            const { setCurrentSection } = useSection();

            return (
                <>
                    I'm a self-taught{' '}
                    <span className="bg-gray-9 p-1 rounded-lg">Full Stack Developer</span>. My
                    interests focus on web development, useful automation, tech news, the dev space
                    in general, video editing (including drone footage), gym, cycling and{' '}
                    <a
                        href="/#trips"
                        className="text-cyan-1 hover:underline underline-offset-3"
                        onClick={() => setCurrentSection('trips')}
                    >
                        travelling
                    </a>
                    .
                    <br />
                    The only hobby I currently have is Arch Linux.
                    <br />
                    <br />
                    <span className="flex items-center">
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="/cv.pdf"
                            className="text-cyan-1 ml-1"
                        >
                            Resume
                        </Link>
                    </span>
                </>
            );
        },
        contactSection: {
            title: 'Get in touch',
            1: 'Thank you for reading my portfolio! Fell free to get in touch for whatever reason.',
            2: 'You can reach me out via',
            3: 'or',
            4: "I'm also available on",
        },
        projectsSection: {
            title: 'Projects',
            libraries: 'Libraries',
            small: 'Smaller projects',
        },
        tripsSection: {
            title: 'My travels',
            subtitle: 'Some of my trips and countries I have visited so far.',
            showAll: 'show all trips',
            day: '1 day',
            days(days: number) {
                return `${days} days`;
            },
        },
        footer: 'my portfolio is',
        chat: {
            header: 'Chat with',
            mobile: 'Chat',
            title: 'Welcome to my portfolio chat!',
            subtitle: "Ask me anything relevant to me, I'll try my best to answer it.",
            placeholder: 'Ask me something...',
            send: 'Send',
            reset: 'Reset',
            loading: 'Thinking...',
            oops: 'Woops!',
            error: 'Something went wrong, please try again!',
            footer: 'Psst... made with',
        },
    },
    pl: {
        languageName: 'Polski',
        greeting: 'cześć',
        profession: 'Full-stack Deweloper',
        hourDifference(difference: number) {
            if (difference !== 0) {
                if (difference > 0) {
                    return `+${difference} różnica godzin`;
                } else {
                    return `${difference} różnica godzin`;
                }
            }

            return 'Ta sama godzina';
        },
        age: 'lat',
        sections: {
            country: 'Polska',
            about: 'O mnie',
            skills: 'Umiejętności',
            contact: 'Kontakt',
            experience: 'Doświadczenie',
            projects: 'Projekty',
            with: 'przez',
        },
        about() {
            const { setCurrentSection } = useSection();

            return (
                <>
                    Jestem{' '}
                    <span className="bg-gray-9 p-1 rounded-lg">Programistą Full Stack-owym</span>i
                    samoukiem. Moje zainteresowania skupiają się na tworzeniu stron internetowych,
                    przydatnej automatyzacji, nowinkach technologicznych, szeroko pojętym świecie
                    programowania, montażu wideo (w tym ujęć z drona), siłowni, jeździe na rowerze i{' '}
                    <a
                        href="/#trips"
                        className="text-cyan-1 hover:underline underline-offset-3"
                        onClick={() => setCurrentSection('trips')}
                    >
                        podróżowaniu
                    </a>
                    .
                    <br />
                    Moim jedynym obecnie hobby jest Arch Linux.
                    <br />
                    <br />
                    <span className="flex items-center">
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="/cv.pdf"
                            className="text-cyan-1 ml-1"
                        >
                            Moje CV
                        </Link>
                    </span>
                </>
            );
        },
        contactSection: {
            title: 'Skontaktujmy się',
            1: 'Dziekujemy za czytanie mojego portfolio. Zapraszam do kontaktu!',
            2: 'Możesz się ze mną skontaktować przez',
            3: 'albo na',
            4: 'Jestem też dostępny na',
        },
        projectsSection: {
            title: 'Projekty',
            libraries: 'Biblioteki',
            small: 'Mniejsze projekty',
        },
        tripsSection: {
            title: 'Moje podróże',
            subtitle: 'Kilka moich podróży i krajów, które do tej pory zwiedziłem.',
            showAll: 'pokaż wszystkie podróże',
            day: '1 dzień',
            days(days: number) {
                return `${days} dni`;
            },
        },
        footer: 'moje portfolio jest',
        chat: {
            header: 'Porozmawiaj z',
            mobile: 'Chat',
            title: 'Witam na moim chatcie!',
            subtitle: 'Pytaj mnie czegoś dotyczące mnie, postaram się na to odpowiedzieć.',
            placeholder: 'Zapytaj mnie czegoś...',
            send: 'Wyślij',
            reset: 'Resetuj',
            loading: 'Myślę...',
            oops: 'Ups!',
            error: 'Coś poszło nie tak, spróbuj ponownie!',
            footer: 'Psst... Zobacz',
        },
    },
} as const;

const navigatorLocale = navigator.language?.slice(0, 2)?.toLowerCase();

const defaultLocale = localStorage.getItem('locale') || navigatorLocale;

export const { useTranslate, useLocale, locales, translations } = createI18n(trans, {
    defaultLocale,
    onLocaleChange(locale) {
        localStorage.setItem('locale', locale);
    },
    fallbackLocales: ['en', 'pl'],
});
