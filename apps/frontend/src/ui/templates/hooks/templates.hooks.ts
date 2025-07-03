import { useContext } from 'react';

import { TemplatesContext } from '../contexts/templates.context';

/**
 * Hook to use the templates context
 *
 * @returns The templates context
 */
export function useTemplates() {
    const context = useContext(TemplatesContext);

    if (!context) {
        throw new Error('useTemplates must be used within a TemplatesProvider');
    }

    return context;
}
