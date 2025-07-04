import { WorkflowsRepository } from '../domain/repositories/workflows.repository';

/**
 * Workflows Api Repository
 */
export const workflowsApiRepository = (): WorkflowsRepository => ({
    create: async (createDto: any): Promise<any> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/workflows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createDto),
        });

        if (!response.ok) {
            throw new Error('Error fetching workflows');
        }

        return response.json();
    },
});
