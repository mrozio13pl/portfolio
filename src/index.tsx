import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from '@/app';
import { GITHUB } from '@/constants';
import { SectionProvider } from '@/hooks/section';
import '@fontsource-variable/sora';
import '@fontsource/poppins';

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <SectionProvider>
                <App />
            </SectionProvider>
        </StrictMode>
    );
}

const link = document.createElement('link');
link.rel = 'icon';
link.href = GITHUB + '.png';
document.head.appendChild(link);