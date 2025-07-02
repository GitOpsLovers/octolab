import { useContext } from 'react';

import { EditorContext } from '../contexts/editor.context';

export function useEditor() {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}
