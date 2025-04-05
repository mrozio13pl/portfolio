import { lazy, type ReactNode } from 'react';
import { SparklesCore } from '@/components/ui/sparkles';
import '../globals.css';
import 'uno.css';
import '@fontsource/poppins';
import '@fontsource-variable/sora';

const Chat = lazy(() => import('@/components/chat/chat'));

export function Layout({ children }: { children: ReactNode }) {
    return (
        <main className='relative antialiased'>
            {/* TODO: fix it for mobile */}
            <div className="absolute w-full h-200vh h-screen z-2 pointer-events-none">
                <div className="inline-flex flex-col h-200vh blur-xl -transform-rotate-90 opacity-20">
                    <div className="grow" style={{
                        background: 'conic-gradient(from 180deg at 99% 60% in lab, rgb(255, 255, 255) 18deg, rgb(66, 135, 245) 6deg, rgba(17, 17, 17, 0) 90deg, rgba(17, 17, 17, 0) 342deg, rgb(255, 255, 255) 360deg)'
                    }} />

                    <div className="grow" style={{
                        background: "conic-gradient(from 0deg at 99% 40% in lab, rgb(255, 255, 255) 0deg, rgba(17, 17, 17, 0) 18deg, rgba(17, 17, 17, 0) 270deg, rgb(66, 135, 245) 344deg, rgb(255, 255, 255) 342deg)"
                    }} />
                </div>
            </div>

            <div className="absolute flex justify-center w-full z-3 pointer-events-none">
                <div className="w-1/4 h-screen">
                    <SparklesCore />
                </div>
            </div>

            <div className="bg-gradient-to-t from-#0f0f0f to-#141414 text-[#f0f0f0] relative overflow-hidden">
                <div className="z-10">
                    {children}
                </div>
            </div>
            <Chat />
            {/* <Cursor /> - following cursor, disabled cuz i found it to be annoying */}
        </main>
    );
}
