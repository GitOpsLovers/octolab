'use client';

import { ReactNode, useEffect, useState } from 'react';

import { MyWorkflowsContext } from '../contexts/my-workflows.context';

import { getWorkflowsUseCase } from '@features/my-workflows/application/get-workflows.use-case';
import { UserWorkflow } from '@features/my-workflows/domain/models/my-workflows.models';
import { myWorkflowsApiRepository } from '@features/my-workflows/infrastructure/workflows-api.repository';
import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

/**
 * My workflows context provider
 */
export function MyWorkflowsProvider({ children }: { children: ReactNode }) {
    const { authToken } = useAuthUser();
    const [workflows, setWorkflows] = useState<UserWorkflow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authToken) return;

        const fetchWorkflows = async () => {
            try {
                const repository = myWorkflowsApiRepository(authToken);
                const workflowsData = await getWorkflowsUseCase(repository);

                setWorkflows(workflowsData);
            } catch (err) {
                console.error('Error fetching workflows:', err);
                setError('Failed to load workflows');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkflows();
    }, [authToken]);

    const value = { workflows, setWorkflows, loading, error };

    return <MyWorkflowsContext.Provider value={value}>{children}</MyWorkflowsContext.Provider>;
}
