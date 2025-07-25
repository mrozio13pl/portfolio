import { createI18n } from "@mrozio/i18n";
import { Link } from "./components/ui/link";
import { GITHUB } from "./constants";

const trans = {
    en: {
        languageName: 'English',
        greeting: 'Hey!',
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
            return (
                <>
                    I'm a self-taught <span className='bg-gray-9 p-1 rounded-lg'>Full Stack Developer</span>.
                    I use technologies for both frontend and backend, mostly focused around{' '}
                    <span className='bg-gray-9 p-1 rounded-lg'>NodeJS</span> and{' '}
                    <span className='bg-gray-9 p-1 rounded-lg'>TypeScript</span>. When I'm not coding, I'm probably trying out new tech.
                    <br />
                    <br />
                    <span className="flex items-center">
                        Wanna talk?
                        <Link
                            href="#contact"
                            className="text-cyan-1 ml-1">
                            Contact me
                        </Link>
                        !
                    </span>
                </>
            );
        },
        skillsSection: {
            title: 'Skills',
            description:
                "I'm very familiar with the Typescript & Javascript ecosystems and very good at problem solving. I've been in this space for a long time and I feel very comfortable with it.",
            1: "Typescript is basically my main language, I've been using it for +2 years and built several projects and tools with it.",
            2: 'React/Preact for my frontend apps or NextJS for my SSR apps.',
            3: 'NodeJS for backend and CLI tools. For backend I rarely use tools like Express (unless necessary), rather I build my own server to improve performance.',
            main: {
                title: 'Main stuff',
                description:
                    "Languages and tools I'm most familiar with and use on a daily basis.",
            },
            others: {
                title: 'Other tools and technologies',
                description:
                    'Other tools and technologies I have a decent experience with',
            },
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
            1: {
                name: 'Sudoku in Terminal',
                description:
                    'Sudoku game working entirely within your terminal window. 🧩',
            },
            2: {
                name: 'UNO (Multiplayer Online)',
                description:
                    'Simple UNO game implementation in Javascript, NodeJS.',
            },
            3: {
                name: 'Chatfolio',
                description:
                    'Personalized chatbot designed for portfolio websites.',
            },
            4: {
                name: 'Portfolio',
                description:
                    'My portfolio website. Made with TypeScript, React, UnoCSS and Vite.',
            },
            note: 'Currently working on some big projects',
            forMore: () => (
                <p className="flex items-center">
                    For more projects check out{' '}
                    <Link
                        className="mx-1"
                        target="_blank"
                        href={GITHUB + '?tab=repositories'}>
                        repos
                    </Link>{' '}
                    on my GitHub.
                </p>
            )
        },
        footer: 'my portfolio is',
        chat: {
            header: 'Chat with',
            mobile: 'Chat',
            title: 'Welcome to my portfolio chat!',
            subtitle:
                "Ask me anything relevant to me, I'll try my best to answer it.",
            placeholder: 'Ask me something...',
            send: 'Send',
            reset: 'Reset',
            loading: 'Thinking...',
            oops: 'Woops!',
            error: 'Something went wrong, please try again!',
            footer: 'Psst... You should check out',
        },
    },
    pl: {
        languageName: 'Polski',
        greeting: 'Witam!',
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
            return (
                <>
                    Jestem <span className='bg-gray-9 p-1 rounded-lg'>Programistą Full Stack-owym</span>
                    i samoukiem. Używam technologii stworzonych dla frontendu i backendu, najcześciej wykorzystuje{' '}
                    <span className='bg-gray-9 p-1 rounded-lg'>NodeJS</span> i{' '}
                    <span className='bg-gray-9 p-1 rounded-lg'>TypeScript</span>. Kiedy nie programuje, najprawdopodobniej próbuje nowych technologii.
                    <br />
                    <br />
                    <span className="flex items-center">
                        Chcesz się skontaktować?
                        <Link
                            href="#contact"
                            className="text-cyan-1 ml-1">
                            Porozmawiajmy
                        </Link>
                        !
                    </span>
                </>
            );
        },
        skillsSection: {
            title: 'Umiejętności',
            description:
                'Jestem dobrze ozeznany z ekosystemamy Typescripta i Javascripta, jestem dobry w rozwiązywaniu problemów. Siedzę w tym od dawna i czuję się z nimi bardzo komfortowo.',
            1: 'Typescript jest praktycznie moim głównym jezykiem programowania, używam go od ponad 2 lat i stworzyłem z nim dużo projektów i narzędzi.',
            2: 'Aplikacje webowe tworze z React/Preact dla aplikacji frontendowych lub NextJS dla aplikacji SSR.',
            3: 'NodeJS dla backendu i narzędzi CLI. Dla backendu rzadko używam bibliotek typu Express, staram się budować swój własny serwer.',
            main: {
                title: 'Główny tech',
                description:
                    'Jezyki i narzędzia, którymi jestem najbardziej zainteresowany i używam codziennie.',
            },
            others: {
                title: 'Inne narzędzia i technologie',
                description:
                    'Inne narzędzia i technologie, z którymi mam dobre doswiadczenie.',
            },
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
            1: {
                name: 'Sudoku w Terminalu',
                description: 'Gra Sudoku w terminalu. 🧩',
            },
            2: {
                name: 'UNO (Multiplayer Online)',
                description:
                    'Prosta implementacja gry UNO z użyciem Javascript, NodeJS.',
            },
            3: {
                name: 'Chatfolio',
                description:
                    'Spersonalizowany chatbot stworzony dla stron portfolio.',
            },
            4: {
                name: 'Portfolio',
                description:
                    'Moja strona portfolio. Stworzna z użyciem TypeScript, React, UnoCSS and Vite.',
            },
            note: 'Pracuje nad dużymi projektami w tym momencie',
            forMore: () => (
                <p className="flex items-center">
                    Więcej projektów znajdziesz w moich{' '}
                    <Link
                        className="mx-1"
                        target="_blank"
                        href={GITHUB + '?tab=repositories'}>
                        repozytoriach
                    </Link>{' '}
                    na GitHubie.
                </p>
            ),
        },
        footer: 'moje portfolio jest',
        chat: {
            header: 'Porozmawiaj z',
            mobile: 'Chat',
            title: 'Witam na moim chatcie!',
            subtitle:
                'Pytaj mnie czegoś dotyczące mnie, postaram się na to odpowiedzieć.',
            placeholder: 'Zapytaj mnie czegoś...',
            send: 'Wyślij',
            reset: 'Resetuj',
            loading: 'Myślę...',
            oops: 'Ups!',
            error: 'Coś poszło nie tak, spróbuj ponownie!',
            footer: 'Psst... Powinienieś zobaczyć',
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
});