'use client';

import { useEditor } from '../hooks/editor.hooks';

/**
 * Editor title component.
 */
export function EditorTitle() {
    const { template } = useEditor();

    if (!template) {
        return null;
    }

    return (
        <div className="mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">{template.name}</h1>
            <p className="text-text/70 text-base mt-1">{template.description}</p>
        </div>
    );
}
