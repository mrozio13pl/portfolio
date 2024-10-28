import { Layout } from '@/components/layout';
import { Link } from '@/components/ui/link';
import { Socials } from '@/components/socials';
import { Quote } from '@/components/quote';
import { Skills } from '@/components/skills';
import { Contact } from '@/components/contact';
import { Navbar } from '@/components/navbar';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { LanguagePicker } from '@/components/language-picker';
import { Experience } from '@/components/experience';
import { Footer } from '@/components/footer';
import { Projects } from '@/components/projects';
import { useScreenSize } from '@/hooks/screen';
import { useTranslation } from '@/i18n/use-translator';
import { BIRTH_DATE, GITHUB, SECTIONS, TIMEZONE } from '@/constants';
import { Cake, Clock2, Dot } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
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

export function App() {
    const t = useTranslation();

    const [scrollY, setScrollY] = useState(0);
    const [collapsed, setCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { width } = useScreenSize();

    const sectionRefs = useRef<{
        [key: string]: HTMLElement | null;
    }>({});

    const timeDifference = getTimezoneDifference(TIMEZONE);

    const handleScroll = () => {
        if (document.readyState !== 'complete') return;

        setScrollY(window.scrollY);

        requestAnimationFrame(() => {
            let maxVisibleSection = '';
            let maxTop = Number.POSITIVE_INFINITY;

            Object.entries(sectionRefs.current).forEach(([key, ref]) => {
                if (ref) {
                    const rect = (
                        ref as any as HTMLElement
                    ).getBoundingClientRect();

                    if (rect.y < 0) return;

                    if (rect.y < maxTop) {
                        maxTop = rect.y;
                        maxVisibleSection = key;
                    }
                }
            });

            if (maxVisibleSection) setActiveSection(maxVisibleSection);
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        handleScroll();
    }, [activeSection]);

    useEffect(() => {
        setCollapsed(scrollY > 0);
    }, [scrollY]);

    return (
        <Layout>
            <TracingBeam>
                <div className="flex justify-center">
                    <div className="w-200 lt-mobile:w-[calc(100%-50px)]! px-10 relative antialiased">
                        <Navbar />

                        <motion.div
                            className={clsx(
                                'px-4 md:mt-0 mt-12',
                                collapsed && 'mobile:fixed'
                            )}
                            animate={{
                                x: collapsed && width > 660 ? -300 : 0,
                            }}>
                            <div
                                className={clsx(
                                    'md:flex lt-mobile:block w-full py-10',
                                    collapsed
                                        ? 'flex-col hidden'
                                        : 'flex justify-between gap-8'
                                )}>
                                <div className="relative mt-12 mr-12 w-min">
                                    <div className="bg-dot-white size-50 z-0 max-h-50" />
                                    <img
                                        src={GITHUB + '.png'}
                                        alt="pfp"
                                        className="md:min-w-50 absolute duration-100 rounded-md -right-8 -top-8 bg-gray-5"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-center py-4">
                                    <h1 className="primary-font font-extrabold text-4xl">
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
                                            -{' '}
                                            {timeDifference !== 0
                                                ? (timeDifference > 0
                                                      ? '+'
                                                      : '-') +
                                                  timeDifference +
                                                  'hour difference'
                                                : 'Same time'}
                                        </span>
                                    </p>
                                    <p className="text-white/50 flex gap-1 items-center">
                                        <Cake />
                                        {getAge(BIRTH_DATE)} {t('age')}
                                    </p>
                                    <div className="flex gap-8 items-center">
                                        <Socials />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div
                            className={clsx(
                                'fixed w-220 lt-mobile:w-auto justify-end mt-16 flex',
                                collapsed
                                    ? 'duration-200 op-100'
                                    : 'op-0 pointer-events-none'
                            )}>
                            <div className="md:flex flex-col gap-2 hidden">
                                {SECTIONS.map((section, index) => (
                                    <a href={'#' + section} key={index}>
                                        <div className="flex items-center gap-2 capitalize">
                                            <Dot
                                                className={clsx(
                                                    'size-16 -m-6',
                                                    activeSection === section
                                                        ? 'text-cyan-3'
                                                        : 'text-gray-7'
                                                )}
                                            />
                                            <p className="hover:underline">
                                                {t(section as any) || section}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                                <LanguagePicker />
                            </div>
                        </div>

                        <div
                            className={clsx(
                                'my-4 flex gap-2',
                                collapsed && 'mobile:mt-40'
                            )}>
                            {'>'}
                            <Quote />
                        </div>

                        <section
                            id="about"
                            ref={(el) => (sectionRefs.current.about = el)}>
                            <h2 className="primary-font font-extrabold text-3xl pt-12 text-cyan-3">
                                👋 {t('greeting')} ==
                            </h2>
                            <p className="mt-8 line-height-9">
                                {t('about1')}{' '}
                                <span className="bg-gray-9 p-1 rounded-lg">
                                    {t('about2')}
                                </span>{' '}
                                {t('about3')}{' '}
                                <span className="bg-gray-9 p-1 rounded-lg">
                                    {t('about4')}
                                </span>{' '}
                                {t('about5')}{' '}
                                <span className="bg-gray-9 p-1 rounded-lg">
                                    {t('about6')}
                                </span>
                                {t('about7')}
                                <br />
                                <br />
                                <span className="flex items-center">
                                    {t('about8')}{' '}
                                    <Link
                                        href="#contact"
                                        className="text-cyan-1 ml-1">
                                        {t('about9')}
                                    </Link>
                                    !
                                </span>
                            </p>
                        </section>

                        <section
                            id="skills"
                            ref={(el) => (sectionRefs.current.skills = el)}>
                            <Skills />
                        </section>

                        <section
                            id="experience"
                            ref={(el) => (sectionRefs.current.experience = el)}>
                            <Experience />
                        </section>

                        <section
                            id="projects"
                            ref={(el) => (sectionRefs.current.projects = el)}>
                            <Projects />
                        </section>

                        <section
                            id="contact"
                            ref={(el) => (sectionRefs.current.contact = el)}>
                            <Contact />
                        </section>

                        <section id="footer">
                            <Footer />
                        </section>
                    </div>
                </div>
            </TracingBeam>
        </Layout>
    );
}
