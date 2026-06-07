import { Layout } from '@/components/layout';
import { Socials } from '@/components/socials';
import { Quote } from '@/components/quote';
import { Contact } from '@/components/sections/contact';
import { Navbar } from '@/components/navbar';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { MorphingText } from '@/components/ui/morphing-text';
import { LanguagePicker } from '@/components/language-picker';
import { Experience } from '@/components/sections/experience';
import { Footer } from '@/components/footer';
import { Projects } from '@/components/sections/projects';
import { About } from '@/components/sections/about';
import { useSection } from '@/hooks/section';
import { useScreenSize } from '@/hooks/screen';
import { useTranslate } from '@/i18n';
import { BIRTH_DATE, GITHUB, SECTIONS, TIMEZONE } from '@/constants';
import { Cake, Dot } from 'lucide-react';
import {
    useEffect,
    useState,
    useRef,
    ViewTransition,
    startTransition,
    lazy,
    Suspense,
} from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';

const mapMask = `
  linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%),
  linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%),
  linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%)
`;

function getAge(birthDate: Date) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}

function getTimezoneDifference(tz: string) {
    const now = new Date();
    const clientOffset = now.getTimezoneOffset() / 60;

    const targetDate = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
    }).format(now);

    const targetOffset = new Date(targetDate).getTimezoneOffset() / 60;

    return targetOffset - clientOffset;
}

function adjustTimeByHours(increment: number) {
    const now = new Date();
    now.setHours(now.getHours() + increment);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

interface InfoProps {
    isNameHovered?: boolean;
    onNameHoverChange?: (isNameHovered: boolean) => void;
    isBackground?: boolean;
}

function Info({ isNameHovered, onNameHoverChange, isBackground }: InfoProps) {
    const t = useTranslate();

    return (
        <div className="w-full flex flex-col justify-center py-4 relative">
            <MorphingText
                className="font-primary font-extrabold text-4xl h-12 tracking-tight -ml-2px"
                text="Jakub Mrożek"
                hoverText="mrozio"
                isHovered={isNameHovered}
                onHoverChange={onNameHoverChange}
            />
            <p className={clsx('text-white/50', isBackground && '-mt-2px')}>{t('profession')}</p>
            <p className="text-white/50 mt-2">
                📍 Rabka-Zdrój, {t('country')}{' '}
                <img src="/poland.svg" className="inline-flex" height={20} width={20} />
            </p>
            <p className="text-#8a8a8a flex gap-1 items-center">
                <Cake />
                {getAge(BIRTH_DATE)} {t('age')}
            </p>
            <div className="flex gap-8 items-center">
                <Socials />
            </div>
        </div>
    );
}

const LocationMap = lazy(() =>
    import('@/components/map').then((m) => ({ default: m.LocationMap })),
);

const Trips = lazy(() => import('@/components/sections/trips').then((m) => ({ default: m.Trips })));
const AppTerminal = lazy(() => import('@/components/terminal/terminal'));

function AgentTerminalButton({ isLoading = false }: { isLoading?: boolean }) {
    return (
        <button
            type="button"
            className="fixed bottom-4 right-4 z-50 px-4 py-2 font-mono text-sm text-lime-3 shadow-2xl backdrop-blur-lg hover:underline"
            disabled={isLoading}
        >
            {isLoading ? 'loading ~/agent' : '~/agent'}
        </button>
    );
}

export function App() {
    const t = useTranslate();
    const timeDifference = getTimezoneDifference(TIMEZONE);

    const { currentSection, setCurrentSection } = useSection();
    const [scrollY, setScrollY] = useState(0);
    const [collapsed, setCollapsed] = useState(false);
    const [isNameHovered, setIsNameHovered] = useState(false);
    const [isTerminalRequested, setIsTerminalRequested] = useState(false);
    const { width } = useScreenSize();

    const sectionRefs = useRef<{
        [key: string]: HTMLElement | null;
    }>({});

    const handleScroll = () => {
        if (document.readyState === 'complete') setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        handleScroll();
    }, [currentSection]);

    useEffect(() => {
        setCollapsed(scrollY > 50 && width > 1330);
    }, [scrollY, width, currentSection]);

    return (
        <Layout>
            <TracingBeam>
                <div className="flex justify-center z-5 min-h-dvh">
                    <div className="w-200 lt-mobile:w-[calc(100%-50px)]! px-10 relative antialiased flex flex-col">
                        <p className="clock-blink group text-white/40 hidden md:flex gap-1 items-center absolute font-mono right-16 top-2 z-20">
                            <span className="group-hover:hidden">
                                {adjustTimeByHours(timeDifference)}
                            </span>
                            <span className="hidden group-hover:block">
                                {' '}
                                {t('hourDifference')(timeDifference)}
                            </span>
                        </p>
                        <div className="absolute px-4 lt-md:hidden">
                            <div className="flex justify-between gap-8 pointer-events-none select-none w-full py-10">
                                <div className="relative mt-8 mr-12 w-min">
                                    <div className="bg-dot-white size-50 max-h-50 op-20" />
                                    <div className="size-50 absolute duration-100 rounded-md -right-8 -top-7.5 bg-gray-7" />
                                </div>
                                <div className="op-20 mt-4 z-1">
                                    <Info
                                        isNameHovered={isNameHovered}
                                        onNameHoverChange={setIsNameHovered}
                                        isBackground
                                    />
                                </div>
                                <div className="absolute top-0 -right-50 w-5/8 h-80 z-0">
                                    <div
                                        className="size-full bg-#141414"
                                        style={{
                                            maskImage: mapMask,
                                            WebkitMaskImage: mapMask,
                                            maskComposite: 'intersect',
                                        }}
                                    >
                                        <Suspense fallback={null}>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="size-full"
                                            >
                                                <LocationMap />
                                            </motion.div>
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ViewTransition name="info">
                            <div className={clsx(collapsed && 'md:h-78')} />

                            <motion.div
                                className={clsx(
                                    'px-4 md:mt-0 mt-20 z-2',
                                    collapsed && 'mobile:fixed',
                                )}
                                animate={{
                                    x: collapsed ? -300 : 0,
                                }}
                            >
                                <div
                                    className={clsx(
                                        'md:flex lt-mobile:block w-full py-10',
                                        collapsed
                                            ? 'flex-col hidden'
                                            : 'flex justify-between gap-8',
                                    )}
                                >
                                    <div className="relative mt-8 mr-12 w-min">
                                        <div className="bg-dot-white size-50 max-h-50" />
                                        <img
                                            src={GITHUB + '.png'}
                                            alt="pfp"
                                            className="md:min-w-50 absolute duration-100 rounded-md -right-8 -top-7.5 bg-gray-5"
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <Info
                                        isNameHovered={isNameHovered}
                                        onNameHoverChange={setIsNameHovered}
                                    />
                                </div>
                            </motion.div>

                            <div
                                className={clsx(
                                    'duration-200 fixed w-230 lt-mobile:w-auto justify-end mt-16 flex pointer-events-none',
                                    collapsed ? 'op-100' : 'op-0 cursor-none',
                                )}
                            >
                                <div className="md:flex flex-col gap-2 hidden pointer-events-auto">
                                    {SECTIONS.map((section, index) => (
                                        <a
                                            href={'#' + section}
                                            key={index}
                                            onClick={() =>
                                                startTransition(() => setCurrentSection(section))
                                            }
                                        >
                                            <div className="flex items-center gap-2 capitalize">
                                                <Dot
                                                    className={clsx(
                                                        'size-16 -m-6',
                                                        currentSection === section
                                                            ? 'text-cyan-3'
                                                            : 'text-gray-7',
                                                    )}
                                                />
                                                <p className="hover:underline">
                                                    {t('sections')(section)}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                    <div className="flex items-center">
                                        <LanguagePicker />
                                        <p className="text-gray-3 text-xs">
                                            {t('sections.with')}{' '}
                                            <a
                                                target="_blank"
                                                href="https://mrozio13pl.github.io/i18n/"
                                                className="underline"
                                            >
                                                @mrozio/i18n
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={clsx(
                                    'duration-200 flex-1',
                                    collapsed && 'duration-300!',
                                )}
                            >
                                <Navbar />

                                <div className="mx-2">
                                    {currentSection === 'about' && (
                                        <ViewTransition name="about">
                                            <section
                                                ref={(el) => {
                                                    sectionRefs.current.about = el;
                                                }}
                                            >
                                                <div className="m-4 flex gap-2 font-mono w-full mt-12">
                                                    <span className="text-lime-3">$</span>
                                                    <Quote />
                                                </div>
                                                <About />
                                            </section>
                                        </ViewTransition>
                                    )}

                                    {currentSection === 'experience' && (
                                        <ViewTransition name="experience">
                                            <section
                                                ref={(el) => {
                                                    sectionRefs.current.experience = el;
                                                }}
                                            >
                                                <Experience />
                                            </section>
                                        </ViewTransition>
                                    )}

                                    {currentSection === 'projects' && (
                                        <ViewTransition name="projects">
                                            <section
                                                ref={(el) => {
                                                    sectionRefs.current.projects = el;
                                                }}
                                            >
                                                <Projects />
                                            </section>
                                        </ViewTransition>
                                    )}

                                    {currentSection === 'contact' && (
                                        <ViewTransition name="contact">
                                            <section
                                                ref={(el) => {
                                                    sectionRefs.current.contact = el;
                                                }}
                                            >
                                                <Contact />
                                            </section>
                                        </ViewTransition>
                                    )}

                                    {currentSection === 'trips' && (
                                        <ViewTransition name="trips">
                                            <section
                                                ref={(el) => {
                                                    sectionRefs.current.trips = el;
                                                }}
                                            >
                                                <Suspense fallback={null}>
                                                    <Trips />
                                                </Suspense>
                                            </section>
                                        </ViewTransition>
                                    )}
                                </div>
                            </div>
                        </ViewTransition>

                        <ViewTransition name="footer">
                            <section id="footer" className={clsx(collapsed && 'md:mb-4')}>
                                <Footer />
                            </section>
                        </ViewTransition>
                    </div>
                </div>
            </TracingBeam>

            {isTerminalRequested ? (
                <Suspense fallback={<AgentTerminalButton isLoading />}>
                    <AppTerminal />
                </Suspense>
            ) : (
                <button
                    type="button"
                    className="fixed bottom-4 right-4 z-50 px-4 py-2 font-mono text-sm text-lime-3 shadow-2xl backdrop-blur-lg hover:underline"
                    onClick={() => setIsTerminalRequested(true)}
                >
                    ~/agent
                </button>
            )}
        </Layout>
    );
}
