import { useContext } from 'react';

import { EditorContext } from '../contexts/editor.context';

/**
 * Hook to use the editor context
 *
 * @returns The editor context
 */
export function useEditor() {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }

    return context;
}
