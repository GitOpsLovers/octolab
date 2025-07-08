'use client';

import { Template } from '@octolab/domain';
import { ReactNode, useEffect, useState } from 'react';

import { TemplatesContext } from '../contexts/templates.context';

import { getTemplatesUseCase } from '@features/templates/application/get-templates.use-case';
import { templatesApiRepository } from '@features/templates/infrastructure/templates-api.repository';

/**
 * Templates context provider
 */
export function TemplatesProvider({ children }: { children: ReactNode }) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const repository = templatesApiRepository();
                const templatesData = await getTemplatesUseCase(repository);

                setTemplates(templatesData);
            } catch (err) {
                console.error('Error fetching templates:', err);
                setError('Failed to load templates');
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const value = { templates, setTemplates, loading, error };

    return <TemplatesContext.Provider value={value}>{children}</TemplatesContext.Provider>;
}
