import { useContext } from 'react';

import { EditorCustomContext } from '../contexts/editor.context';

/**
 * Hook to use the editor context
 *
 * @returns The editor context
 */
export function useEditorCustom() {
    const context = useContext(EditorCustomContext);

    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }

    return context;
}
