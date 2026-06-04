import { useCallback, useEffect, useRef, useState } from 'react';

import { clsx } from 'clsx';

const morphTime = 0.75;

const useMorphingText = (text: string, hoverText: string, isHovered: boolean) => {
    const currentTextRef = useRef(text);
    const morphRef = useRef(0);
    const timeRef = useRef(new Date());

    const text1Ref = useRef<HTMLSpanElement>(null);
    const text2Ref = useRef<HTMLSpanElement>(null);

    const setStaticText = useCallback((text: string) => {
        const [current1, current2] = [text1Ref.current, text2Ref.current];
        if (!current1 || !current2) return;

        current1.textContent = text;
        current1.style.filter = 'none';
        current1.style.opacity = '100%';

        current2.textContent = '';
        current2.style.filter = 'none';
        current2.style.opacity = '0%';
    }, []);

    const setStyles = useCallback((fromText: string, toText: string, fraction: number) => {
        const [current1, current2] = [text1Ref.current, text2Ref.current];
        if (!current1 || !current2) return;

        const safeFraction = Math.min(Math.max(fraction, 0.001), 1);
        const invertedFraction = 1 - safeFraction;

        current2.style.filter = `blur(${Math.min(8 / safeFraction - 8, 100)}px)`;
        current2.style.opacity = `${Math.pow(safeFraction, 0.4) * 100}%`;

        current1.style.filter = `blur(${Math.min(8 / Math.max(invertedFraction, 0.001) - 8, 100)}px)`;
        current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

        current1.textContent = fromText;
        current2.textContent = toText;
    }, []);

    useEffect(() => {
        currentTextRef.current = text;
        morphRef.current = 0;
        setStaticText(text);
    }, [text, hoverText, setStaticText]);

    useEffect(() => {
        const targetText = isHovered ? hoverText : text;
        const fromText = currentTextRef.current;

        if (fromText === targetText) {
            setStaticText(targetText);
            return;
        }

        morphRef.current = 0;
        timeRef.current = new Date();

        let animationFrameId: number;

        const animate = () => {
            const newTime = new Date();
            const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
            timeRef.current = newTime;
            morphRef.current += dt;

            const fraction = Math.min(morphRef.current / morphTime, 1);
            setStyles(fromText, targetText, fraction);

            if (fraction < 1) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            currentTextRef.current = targetText;
            setStaticText(targetText);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [text, hoverText, isHovered, setStaticText, setStyles]);

    return { text1Ref, text2Ref };
};

interface MorphingTextProps {
    className?: string;
    text: string;
    hoverText: string;
    isHovered?: boolean;
    onHoverChange?: (isHovered: boolean) => void;
}

const Texts: React.FC<Pick<MorphingTextProps, 'text' | 'hoverText'> & { isHovered: boolean }> = ({
    text,
    hoverText,
    isHovered,
}) => {
    const { text1Ref, text2Ref } = useMorphingText(text, hoverText, isHovered);
    return (
        <>
            <span className="absolute inset-0 block w-full whitespace-nowrap" ref={text1Ref} />
            <span className="absolute inset-0 block w-full whitespace-nowrap" ref={text2Ref} />
        </>
    );
};

const SvgFilters: React.FC = () => (
    <svg id="filters" className="hidden" preserveAspectRatio="xMidYMid slice">
        <defs>
            <filter id="threshold">
                <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
                />
            </filter>
        </defs>
    </svg>
);

const MorphingText: React.FC<MorphingTextProps> = ({
    text,
    hoverText,
    className,
    isHovered: controlledIsHovered,
    onHoverChange,
}) => {
    const [uncontrolledIsHovered, setUncontrolledIsHovered] = useState(false);
    const isHovered = controlledIsHovered ?? uncontrolledIsHovered;

    const setIsHovered = useCallback(
        (isHovered: boolean) => {
            setUncontrolledIsHovered(isHovered);
            onHoverChange?.(isHovered);
        },
        [onHoverChange],
    );

    return (
        <div
            className={clsx(
                'relative block w-full font-bold leading-none [filter:url(#threshold)_blur(0.6px)]',
                className,
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
        >
            <Texts text={text} hoverText={hoverText} isHovered={isHovered} />
            <SvgFilters />
        </div>
    );
};

export { MorphingText };
