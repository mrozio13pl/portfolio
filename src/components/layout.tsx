import { lazy, type ReactNode } from 'react';
import { Cursor } from '@/components/cursor';
import '../globals.css';
import 'uno.css';
import '@fontsource/poppins';
import '@fontsource-variable/sora';

const Chat = lazy(() => import('@/components/chat/chat'));

export function Layout({ children }: { children: ReactNode }) {
    return (
        <main>
            <div className="bg-gradient-to-t from-#0f0f0f to-#141414 text-[#f0f0f0] relative overflow-hidden">
                {children}
            </div>
            <Chat />
            <Cursor />
        </main>
    );
}
