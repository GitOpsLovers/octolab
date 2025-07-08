import { UserWorkflow } from '@features/my-workflows/domain/models/my-workflows.models';

/**
 * My workflows context provider model
 */
export interface MyWorkflowsContextType {
    workflows: UserWorkflow[];
    setWorkflows: (workflows: UserWorkflow[]) => void;
    loading: boolean;
    error: string | null;
    deleteWorkflow: (workflowId: string) => void;
}
