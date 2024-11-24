import type { ReactNode } from 'react';
import { Chat } from '@/components/chat/chat';
import { Cursor } from '@/components/cursor';
import '../globals.css';
import 'uno.css';
import '@fontsource/poppins';
import '@fontsource-variable/sora';

export function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="bg-gradient-to-t from-#0f0f0f to-#141414 text-[#f0f0f0] relative overflow-hidden">
                {children}
            </div>
            <Chat />
            <Cursor />
        </>
    );
}
