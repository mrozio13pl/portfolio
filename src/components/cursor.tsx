import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function Cursor() {
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });
    const cursorControls = useAnimation();

    useEffect(() => {
        let prevTime = Date.now();
        let prevX = 0;
        let prevY = 0;
        let resetScaleTimeout: NodeJS.Timeout;

        const moveCursor = (e: MouseEvent) => {
            const currentTime = Date.now();
            const timeDelta = Math.max((currentTime - prevTime) / 1000, 0.001); // clamp to avoid division by 0

            const deltaX = e.clientX - prevX;
            const deltaY = e.clientY - prevY;

            const vx = deltaX / timeDelta;
            const vy = deltaY / timeDelta;

            setVelocity((prev) => ({
                vx: prev.vx * 0.8 + vx * 0.2,
                vy: prev.vy * 0.8 + vy * 0.2,
            }));

            setCursor({ x: e.clientX, y: e.clientY });

            prevX = e.clientX;
            prevY = e.clientY;
            prevTime = currentTime;

            if (resetScaleTimeout) {
                clearTimeout(resetScaleTimeout);
            }

            resetScaleTimeout = setTimeout(() => {
                setVelocity({ vx: 0, vy: 0 });
            }, 50);
        };

        const handleMouseEnter = () => {
            cursorControls.start({
                opacity: 1,
                transition: { duration: 0.4, ease: 'easeInOut' },
            });
        };

        const handleMouseLeave = () => {
            cursorControls.start({
                opacity: 0,
                transition: { duration: 0.6, ease: 'easeInOut' },
            });
        };

        document.body.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.body.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorControls]);

    const velocityMagnitude = Math.sqrt(velocity.vx ** 2 + velocity.vy ** 2);
    const transformScale =
        velocityMagnitude < 10
            ? 0.75
            : Math.min(2, 0.5 + velocityMagnitude / 750);

    return (
        <motion.div
            animate={cursorControls}
            className="pointer-events-none fixed z-15 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent lt-mobile:hidden"
            style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}>
            <motion.div
                animate={{
                    scale: transformScale,
                    rotate: velocity.vx / 5,
                    opacity: transformScale,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lime-200/90 h-3 w-3 rounded-sm"
                initial={{ scale: 1, opacity: 1 }}
            />
        </motion.div>
    );
}
