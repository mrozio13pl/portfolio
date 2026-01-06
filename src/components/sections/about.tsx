import { useTranslate } from "@/i18n";
import { FallingIcons } from "../ui/falling-icons";
import { SiArchlinux, SiBun, SiExpo, SiExpress, SiGit, SiHono, SiMongodb, SiNextdotjs, SiNodedotjs, SiPhp, SiReact, SiSqlite, SiTailwindcss, SiTmux, SiTypescript, SiVite } from "@icons-pack/react-simple-icons";
import { SiNodedotjsHex, SiReactHex, SiGitHex, SiArchlinuxHex, SiTypescriptHex, SiHonoHex, SiViteHex, SiSqliteHex, SiMongodbHex, SiTmuxHex, SiTailwindcssHex, SiExpoHex, SiPhpHex } from '@icons-pack/react-simple-icons';

const icons = [
    { color: '#fff', icon: SiNextdotjs, size: 62 },
    { color: SiNodedotjsHex, icon: SiNodedotjs, size: 96 },
    { color: SiReactHex, icon: SiReact, size: 62 },
    { color: SiGitHex, icon: SiGit, size: 62 },
    { color: SiArchlinuxHex, icon: SiArchlinux, size: 62 },
    { color: SiTypescriptHex, icon: SiTypescript, size: 96 },
    { color: SiHonoHex, icon: SiHono, size: 62 },
    { color: '#FBF0DE', icon: SiBun, size: 36 },
    { color: SiViteHex, icon: SiVite, size: 36 },
    { color: SiSqliteHex, icon: SiSqlite, size: 36 },
    { color: SiMongodbHex, icon: SiMongodb, size: 36 },
    { color: SiTmuxHex, icon: SiTmux, size: 36 },
    { color: SiExpoHex, icon: SiExpo, size: 36 },
    { color: '#ccc', icon: SiExpress, size: 36 },
    { color: SiPhpHex, icon: SiPhp, size: 36 },
    { color: SiTailwindcssHex, icon: SiTailwindcss, size: 36 },
].map(({ icon: Icon, size, ...props }, i) => ({
    icon: <Icon key={i} size={size - 2} />,
    size,
    ...props
}));

export function About() {
    const t = useTranslate();

    return (
        <div className="relative h-full text-#F7F7E3">
            <h2 className="font-primary font-extrabold text-3xl pt-12 text-cyan-3">
                {t('greeting')}
            </h2>
            <p className="mt-8 line-height-9">
                {t('about')()}
            </p>
            <div className="py-20 -z-1">
                <FallingIcons icons={icons} />
            </div>
        </div>
    )
}