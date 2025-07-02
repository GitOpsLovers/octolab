'use client';

import { useState } from 'react';

import { EditorContext } from '../contexts/editor.context';
import { EditorConfig } from '../models/editor.models';

/**
 * Editor context provider
 */
export function EditorProvider({ children, defaultConfig }: { children: React.ReactNode; defaultConfig: EditorConfig }) {
    const [config, setConfig] = useState<EditorConfig>(defaultConfig);

    return <EditorContext.Provider value={{ config, setConfig }}>{children}</EditorContext.Provider>;
}
