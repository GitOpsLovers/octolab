import { useContext } from 'react';

import { EditorTemplateContext } from '../contexts/editor.context';

/**
 * Hook to use the editor template context
 *
 * @returns The editor template context
 */
export function useEditorTemplate() {
    const context = useContext(EditorTemplateContext);

    if (!context) {
        throw new Error('useEditorTemplate must be used within an EditorTemplateProvider');
    }

    return context;
}
