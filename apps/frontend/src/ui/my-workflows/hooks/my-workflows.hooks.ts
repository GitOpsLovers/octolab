import { useContext } from 'react';

import { MyWorkflowsContext } from '../contexts/my-workflows.context';

/**
 * Hook to use the my workflows context
 *
 * @returns The my workflows context
 */
export function useMyWorkflows() {
    const context = useContext(MyWorkflowsContext);

    if (!context) {
        throw new Error('useMyWorkflows must be used within a MyWorkflowsProvider');
    }

    return context;
}
