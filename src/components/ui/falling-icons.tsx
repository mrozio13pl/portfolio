import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useScreenSize } from '@/hooks/screen';

interface BodyState {
    id: number;
    x: number;
    y: number;
    angle: number;
    speed: number;
}

const maxVelocity = 25;

export function FallingIcons({ icons }: { icons: { icon: React.ReactNode; size: number; color: string; }[]; }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef(Matter.Engine.create());
    const [isGrabbing, setIsGrabbing] = useState(false);
    const [bodies, setBodies] = useState<BodyState[]>([]);
    const [colored, setColored] = useState(false);
    const { width, height } = useScreenSize();

    useEffect(() => {
        if (!containerRef.current) return;

        const engine = engineRef.current;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        Matter.Events.on(engine, 'beforeUpdate', () => {
            iconBodies.forEach(body => {
                const velocity = body.velocity;
                const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

                if (speed > maxVelocity) {
                    const ratio = maxVelocity / speed;
                    Matter.Body.setVelocity(body, {
                        x: velocity.x * ratio,
                        y: velocity.y * ratio
                    });
                }

                // if outside
                const buffer = 100;
                if (
                    body.position.x < -buffer ||
                    body.position.x > width + buffer ||
                    body.position.y < -buffer ||
                    body.position.y > height + buffer
                ) {
                    Matter.Body.setPosition(body, {
                        x: width / 2,
                        y: 50
                    });
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });
                }
            });
        });

        const runner = Matter.Runner.create();
        const iconBodies = icons.map(({ size }, i) => {
            return Matter.Bodies.rectangle(
                Math.random() * (width - size) + (size / 2),
                Math.min(window.innerHeight * (.5 + Math.random() * .5), window.innerHeight - size),
                size, size,
                {
                    restitution: 0.5,
                    friction: 0.1,
                    label: `icon-${i}`
                }
            );
        });

        const floor = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true });
        const wallL = Matter.Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true });
        const wallR = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true });

        const mouse = Matter.Mouse.create(containerRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });

        Matter.Composite.add(engine.world, [...iconBodies, floor, ceiling, wallL, wallR, mouseConstraint]);
        Matter.Runner.run(runner, engine);

        let frameId: number;
        const sync = () => {
            setBodies(iconBodies.map(b => ({
                id: b.id,
                x: b.position.x,
                y: b.position.y,
                angle: b.angle,
                speed: b.speed,
            })));
            frameId = requestAnimationFrame(sync);
        };
        sync();

        Matter.Events.on(mouseConstraint, 'startdrag', () => setIsGrabbing(true));
        Matter.Events.on(mouseConstraint, 'enddrag', () => setIsGrabbing(false));

        const colorTimeout = setTimeout(() => setColored(true), 2000);

        return () => {
            cancelAnimationFrame(frameId);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
            Matter.Composite.clear(engine.world, false);
            clearTimeout(colorTimeout);
        };
    }, [icons, width, height]);

    return (
        <motion.div
            style={{ height }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .5 }}
            className={clsx(
                "absolute w-full left-0 bottom-0 mb-2",
                isGrabbing ? 'pointer-events-auto' : 'pointer-events-none'
            )}
        >
            <div
                ref={containerRef}
                className="relative size-full overflow-hidden"
            >
                {bodies.map((body, i) => {
                    const { size, color, icon } = icons[i];
                     const intensity = colored ? Math.min(body.speed / (maxVelocity / 2), 1) : 0;

                    return (
                        <div
                            key={body.id}
                            className="group absolute pointer-events-auto cursor-grab active:cursor-grabbing"
                            style={{
                                transform: `translate(${body.x - size / 2}px, ${body.y - size / 2}px) rotate(${body.angle}rad)`,
                                userSelect: 'none',
                                touchAction: 'none',
                                height: size,
                                width: size,
                            }}
                        >
                            <div className='relative'>
                                <div className='text-gray7'>
                                    {icon}
                                </div>
                                <div className='absolute top-0 group-active:opacity-100! duration-400' style={{ color, opacity: intensity }}>
                                    {icon}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    );
};