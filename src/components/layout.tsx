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
            <div className="absolute size-full z-2 pointer-events-none top-0 overflow-hidden flex justify-center">
                <div className="inline-flex max-w-800px size-full blur-xl opacity-20 -mt-4">
                    <div className="grow" style={{
                        background: 'conic-gradient(from 0.25turn at 10% 0%, rgb(255, 255, 255) 10deg, rgb(66, 135, 245) 30deg, rgba(17, 17, 17, 0) 90deg)'
                    }} />

                    <div className="grow" style={{
                        background: 'conic-gradient(from 0.25turn at 10% 0%, rgb(255, 255, 255) 10deg, rgb(66, 135, 245) 30deg, rgba(17, 17, 17, 0) 90deg)',
                        transform: 'scale(-1, 1)'
                    }} />
                </div>
            </div>

            <div className="absolute flex justify-center w-full z-3 pointer-events-none">
                <div className="w-1/4 h-screen">
                    <SparklesCore />
                </div>
            </div>

            <div className="bg-gradient-to-t from-#0f0f0f to-#141414 text-[#f0f0f0] relative overflow-hidden lt-mobile:pb-6">
                <div className="z-10">
                    {children}
                </div>
            </div>
            <Chat />
            {/* <Cursor /> - following cursor, disabled cuz i found it to be annoying */}
        </main>
    );
}
