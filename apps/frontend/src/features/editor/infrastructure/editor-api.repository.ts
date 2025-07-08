import { WorkflowConfig } from '@octolab/domain';

import { EditorRepository } from '../domain/repositories/editor.repository';

/**
 * Editor Api Repository
 */
export const editorApiRepository = (token?: string): EditorRepository => ({
    getOne: async (id: string): Promise<any> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/workflows/${id ?? ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching workflow');
        }

        return response.json();
    },
    getWorkflowConfig: async (id: string): Promise<WorkflowConfig> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/workflows/${id}/config`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching workflow configuration');
        }

        return response.json();
    },
    create: async (createDto: any): Promise<any> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/workflows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(createDto),
        });

        if (!response.ok) {
            throw new Error('Error fetching workflows');
        }

        return response.json();
    },
});
