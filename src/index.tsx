import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { App } from '@/app';
import { GITHUB } from '@/constants';
import { SectionProvider } from '@/hooks/section';
import '@fontsource-variable/sora/index.css';
import '@fontsource/poppins/index.css';
import type { Engine } from '@tsparticles/engine';

const initParticles = async (engine: Engine) => {
    await loadSlim(engine);
};

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <ParticlesProvider init={initParticles}>
                <SectionProvider>
                    <App />
                </SectionProvider>
            </ParticlesProvider>
        </StrictMode>,
    );
}

const link = document.createElement('link');
link.rel = 'icon';
link.href = GITHUB + '.png';
document.head.appendChild(link);
