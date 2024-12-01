import type { ReactElement } from 'react';

export interface Tool {
    node: ReactElement;
    tool: string;
}

export function Carousel({ tools }: { tools: Tool[] }) {
    return (
        <div>
            <div
                className="absolute right-0 w-12 h-full z-10 pointer-events-none"
                style={{
                    background:
                        'linear-gradient(to right, transparent 0, #121212 70%)',
                }}
            />
            <div
                className="absolute left-0 w-12 h-full z-10 pointer-events-none"
                style={{
                    background:
                        'linear-gradient(to left, transparent 0, #121212 70%)',
                }}
            />
            <div className="flex items-center gap-4 h-24 w-max track">
                {tools.concat(tools).map(({ node, tool }, index) => (
                    <div
                        className="flex-shrink-0 [&_svg]:size-12 flex flex-col items-center duration-100 cursor-default group hover:scale-115"
                        key={index}>
                        {node}
                        <p className="text-white/50 text-xs duration-100 group-hover:text-white/80">
                            {tool}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
