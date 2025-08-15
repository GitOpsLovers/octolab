'use client';

import { Template } from '@octolab/domain';
import { ReactNode, useEffect, useState } from 'react';

import { TemplateContext } from '../contexts/templates.context';

import { getOneTemplateUseCase } from '@features/templates/application/get-one-template.use-case';
import { templatesApiRepository } from '@features/templates/infrastructure/templates-api.repository';

interface TemplateProviderProps {
    children: ReactNode;
    templateId: string;
}

/**
 * Template context provider
 */
export function TemplateProvider({ children, templateId }: TemplateProviderProps) {
    const [template, setTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch template
     */
    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const repository = templatesApiRepository();
                const templateData = await getOneTemplateUseCase(repository, templateId);

                setTemplate(templateData);
            } catch (err) {
                console.error('Error fetching templates:', err);
                setError('Failed to load templates');
            } finally {
                setLoading(false);
            }
        };

        fetchTemplate();
    }, [templateId]);

    const value = { template, setTemplate, loading, error };

    return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>;
}
