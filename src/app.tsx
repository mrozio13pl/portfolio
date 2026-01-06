import { Layout } from '@/components/layout';
import { Socials } from '@/components/socials';
import { Quote } from '@/components/quote';
import { Contact } from '@/components/sections/contact';
import { Navbar } from '@/components/navbar';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { LanguagePicker } from '@/components/language-picker';
import { Experience } from '@/components/sections/experience';
import { Footer } from '@/components/footer';
import { Projects } from '@/components/sections/projects';
import { About } from '@/components/sections/about';
import { useSection } from '@/hooks/section';
import { useScreenSize } from '@/hooks/screen';
import { useTranslate } from '@/i18n';
import { BIRTH_DATE, GITHUB, SECTIONS, TIMEZONE } from '@/constants';
import { Cake, Clock2, Dot } from 'lucide-react';
import { useEffect, useState, useRef, ViewTransition, startTransition } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

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

function Info() {
    const t = useTranslate();
    const timeDifference = getTimezoneDifference(TIMEZONE);

    return (
        <div className="w-full flex flex-col justify-center py-4">
            <h1 className="font-primary font-extrabold text-4xl tracking-tight">
                mrozio
            </h1>
            <p className="text-white/50">
                {t('profession')}
            </p>
            <p className="text-white/50 mt-2">
                📍 Rabka-Zdrój, {t('country')}{' '}
                <img
                    src="/poland.svg"
                    className="inline-flex"
                    height={20}
                    width={20}
                />
            </p>
            <p className="text-white/50 flex gap-1 items-center">
                <Clock2 />
                {adjustTimeByHours(timeDifference)}
                <span className="text-white/40">
                    {' '}
                    {t('hourDifference')(timeDifference)}
                </span>
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

export function App() {
    const t = useTranslate();

    const { currentSection, setCurrentSection } = useSection();
    const [scrollY, setScrollY] = useState(0);
    const [collapsed, setCollapsed] = useState(false);
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
                        <div className={clsx(collapsed && 'md:h-48')} />

                        <div className='absolute px-4 lt-md:hidden'>
                            <div
                                className="flex justify-between gap-8 pointer-events-none select-none w-full py-10">
                                <div className="relative mt-12 mr-12 w-min">
                                    <div className="bg-dot-white size-50 max-h-50 op-20" />
                                    <div
                                        className="size-50 absolute duration-100 rounded-md -right-8 -top-7.5 bg-gray-7"
                                    />
                                </div>
                                <div className='op-20 mt-4'>
                                    <Info />
                                </div>
                            </div>
                        </div>

                        <motion.div
                            className={clsx(
                                'px-4 md:mt-0 mt-20',
                                collapsed && 'mobile:fixed'
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
                                        : 'flex justify-between gap-8'
                                )}>
                                <div className="relative mt-12 mr-12 w-min">
                                    <div className="bg-dot-white size-50 max-h-50" />
                                    <img
                                        src={GITHUB + '.png'}
                                        alt="pfp"
                                        className="md:min-w-50 absolute duration-100 rounded-md -right-8 -top-7.5 bg-gray-5"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <Info />
                            </div>
                        </motion.div>

                        <div
                            className={clsx(
                                'duration-200 fixed w-230 lt-mobile:w-auto justify-end mt-16 flex pointer-events-none',
                                collapsed
                                    ? 'op-100'
                                    : 'op-0 cursor-none'
                            )}>
                            <div className="md:flex flex-col gap-2 hidden pointer-events-auto">
                                {SECTIONS.map((section, index) => (
                                    <a href={'#' + section} key={index} onClick={() => startTransition(() => setCurrentSection(section))}>
                                        <div className="flex items-center gap-2 capitalize">
                                            <Dot
                                                className={clsx(
                                                    'size-16 -m-6',
                                                    currentSection === section
                                                        ? 'text-cyan-3'
                                                        : 'text-gray-7'
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
                                    <p className='text-gray-3 text-xs'>{t('sections.with')}{' '}
                                        <a target="_blank" href="https://mrozio13pl.github.io/i18n/" className="underline">@mrozio/i18n</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={clsx('duration-200 flex-1', collapsed && 'duration-300!')}>
                            <div
                                className={clsx(
                                    'm-4 flex gap-2',
                                    collapsed && 'mobile:mt-40'
                                )}>
                                <span className='text-lime-3'>$</span>
                                <Quote />
                            </div>

                            <Navbar />

                            <div className='mx-2'>
                                {currentSection === 'about' && (
                                    <ViewTransition name='about'>
                                        <section ref={(el) => { sectionRefs.current.about = el }}>
                                            <About />
                                        </section>
                                    </ViewTransition>
                                )}

                                {currentSection === 'experience' && (
                                    <ViewTransition name='experience'>
                                        <section ref={(el) => { sectionRefs.current.experience = el }}>
                                            <Experience />
                                        </section>
                                    </ViewTransition>
                                )}

                                {currentSection === 'projects' && (
                                    <ViewTransition name='projects'>
                                        <section ref={(el) => { sectionRefs.current.projects = el }}>
                                            <Projects />
                                        </section>
                                    </ViewTransition>
                                )}

                                {currentSection === 'contact' && (
                                    <ViewTransition name='contact'>
                                        <section ref={(el) => { sectionRefs.current.contact = el }}>
                                            <Contact />
                                        </section>
                                    </ViewTransition>
                                )}
                            </div>
                        </div>

                        <ViewTransition name='footer'>
                            <section id="footer" className={clsx(collapsed && 'md:mb-4')}>
                                <Footer />
                            </section>
                        </ViewTransition>
                    </div>
                </div>
            </TracingBeam>
        </Layout>
    );
}
