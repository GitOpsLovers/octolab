'use client';

import { TemplateLanding } from '../components/templates.component';
import { TemplateProvider } from '../providers/template.provider';

interface TemplateContainerProps {
    templateId: string;
}

/**
 * Template container component
 */
export default function TemplateContainer({ templateId }: TemplateContainerProps) {
    return (
        <TemplateProvider templateId={templateId}>
            <TemplateLanding />
        </TemplateProvider>
    );
}
