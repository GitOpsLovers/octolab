import { useContext } from 'react';

import { TemplateContext, TemplatesContext } from '../contexts/templates.context';

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

/**
 * Hook to use the template context
 *
 * @returns The templates context
 */
export function useTemplate() {
    const context = useContext(TemplateContext);

    if (!context) {
        throw new Error('useTemplate must be used within a TemplateProvider');
    }

    return context;
}
