'use client';

import { useEditor } from '../hooks/editor.hooks';

/**
 * Editor title component.
 */
export function EditorTitle() {
    const { workflowConfig } = useEditor();

    return (
        <div className="mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">{workflowConfig.name}</h1>
            <p className="text-text/70 text-base mt-1">{workflowConfig.description}</p>
        </div>
    );
}
