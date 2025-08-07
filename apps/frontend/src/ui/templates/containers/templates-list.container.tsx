'use client';

import { TemplatesList } from '../components/templates-list.component';
import { TemplatesProvider } from '../providers/templates.provider';

/**
 * Templates list container component
 */
export default function TemplatesListContainer() {
    return (
        <TemplatesProvider>
            <TemplatesList />
        </TemplatesProvider>
    );
}
