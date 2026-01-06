import React, { createContext, useContext, useState, startTransition } from 'react';
import type { SECTIONS } from '@/constants';

export type Section = (typeof SECTIONS)[number];

interface SectionContextType {
    currentSection: Section;
    setCurrentSection: (section: Section) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSection, setCurrentSection] = useState<Section>(
        (window.location.hash.slice(1) as Section) || 'about'
    );

    const setSection = (section: Section) => {
        startTransition(() => {
            setCurrentSection(section);
        });
    };

    return (
        <SectionContext.Provider value={{ currentSection, setCurrentSection: setSection }}>
            {children}
        </SectionContext.Provider>
    );
};

export const useSection = () => {
    const context = useContext(SectionContext);
    if (!context) throw new Error('useSection must be used within a SectionProvider');
    return context;
};