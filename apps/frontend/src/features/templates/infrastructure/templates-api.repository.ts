import { Template, TemplateConfig } from '../domain/models/template.models';
import { TemplatesRepository } from '../domain/repositories/templates.repository';

/**
 * Templates Api Repository
 */
export const templatesApiRepository = (): TemplatesRepository => ({
    getAll: async (): Promise<Template[]> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/templates`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching templates');
        }

        return response.json();
    },
    getTemplateConfig: async (id: string): Promise<TemplateConfig> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/templates/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching template configuration');
        }

        return response.json();
    },
});
