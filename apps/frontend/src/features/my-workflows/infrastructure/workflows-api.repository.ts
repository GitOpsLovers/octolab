import { UserWorkflow } from '../domain/models/my-workflows.models';
import { MyWorkflowsRepository } from '../domain/repositories/my-workflows.repository';

/**
 * My Workflows Api Repository
 *
 * @param token Authorization token.
 */
export const myWorkflowsApiRepository = (token: string): MyWorkflowsRepository => ({
    getAll: async (): Promise<UserWorkflow[]> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/workflows`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching templates');
        }

        return response.json();
    },
});
