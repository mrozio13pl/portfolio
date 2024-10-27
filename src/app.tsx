import { Layout } from '@/components/layout';
import { Link } from '@/components/link';
import { Socials } from '@/components/socials';
import { Quote } from '@/components/quote';
import { Skills } from '@/components/skills';
import { Contact } from '@/components/contact';
import { Navbar } from '@/components/navbar';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { useTranslation } from '@/i18n/use-translator';
import { BIRTH_DATE, GITHUB, SECTIONS } from '@/constants';
import { Cake, Dot } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { LanguagePicker } from '@/components/language-picker';
import { Experience } from '@/components/experience';
import { Footer } from './components/footer';
import { Projects } from './components/projects';

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

export function App() {
    const t = useTranslation();

    const [scrollY, setScrollY] = useState(0);
    const [collapsed, setCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const sectionRefs = useRef<{
        [key: string]: HTMLElement | null;
    }>({});

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
                    <div className="w-200 px-10 relative antialiased">
                        <Navbar />

                        <motion.div
                            className="px-4"
                            animate={{
                                x: collapsed ? -300 : 0,
                                position: collapsed ? 'fixed' : 'static',
                            }}>
                            <div
                                className={clsx(
                                    'flex w-full py-10',
                                    collapsed
                                        ? 'flex-col'
                                        : 'justify-between gap-8'
                                )}>
                                <div className="relative mt-12 mr-12 w-min">
                                    <div className="bg-dot-white size-50 z-0 max-h-50" />
                                    <img
                                        src={GITHUB + '.png'}
                                        alt="pfp"
                                        className="min-w-50 duration-100 rounded-md absolute -right-8 -top-8 bg-gray-5"
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
                                'fixed w-220 justify-end mt-16 flex',
                                collapsed
                                    ? 'duration-200 op-100'
                                    : 'op-0 pointer-events-none'
                            )}>
                            <div className="flex flex-col gap-2">
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
                                collapsed && 'mt-40'
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
