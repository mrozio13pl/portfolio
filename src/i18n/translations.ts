export const translations = {
    en: {
        languageName: 'English',
        greeting: 'Hey!',
        profession: 'Software Engineer',
        age: 'y/o',
        country: 'Poland',
        about1: 'I am',
        about2: 'Full Stack Developer',
        about3: '. I use technologies for both frontend and backend, mostly focused around',
        about4: 'NodeJS',
        about5: ' and ',
        about6: 'TypeScript',
        about7: '.', // ;-;
        about8: 'Wanna talk?',
        about9: 'Contact me',
        skillsSection: {
            title: 'Main tools I use',
            1: 'Typescript is basically my main language, I have a lot of experience with it and build tools.',
            2: 'React/Preact or NextJS for my frontend apps.',
            3: 'I use NodeJS for backend and CLI tools. For backend I rarely ever use tools like express and write a simple route handler myself.',
            others: 'Others:',
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
            note: 'Currently working on some big projects',
        },
        footer: 'my portfolio is',
    },
    pl: {
        languageName: 'Polski',
        greeting: 'Witam!',
        profession: 'Programista',
        age: 'lat',
        country: 'Polska',
        about: 'O mnie',
        skills: 'Umiejętności',
        contact: 'Kontakt',
        experience: 'Doświadczenie',
        projects: 'Projekty',
        about1: 'Jestem',
        about2: 'Programistą Full Stack-owym',
        about3: '. Używam technologii stworzonych dla frontendu i backendu, najcześciej wykorzystuje ',
        about4: 'NodeJS',
        about5: ' i ',
        about6: 'TypeScript',
        about7: '.',
        about8: 'Chcecie się skontaktować?',
        about9: 'Kontakt',
        skillsSection: {
            title: 'Główne narzędzia, którzych używam',
            1: 'TypeScript to mój główny język, mam w nim dużo doswiadczenia.',
            2: 'React/Preact lub NextJS dla aplikacji webowych.',
            3: 'Używam NodeJS dla backendu i narzędzi CLI. Dla backendu nie używam bibliotek typu Express, raczej buduję swój własny serwer.',
            others: 'Inne umiejętności:',
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
            note: 'Pracuje nad dużymi projektami w tym momencie',
        },
        footer: 'moje portfolio jest',
    },
} as const;

type Nested<T> = T extends object
    ? {
          [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Nested<T[K]>}`}`;
      }[keyof T]
    : never;

export type TranslationKeys = Nested<
    (typeof translations)[keyof typeof translations]
>;
