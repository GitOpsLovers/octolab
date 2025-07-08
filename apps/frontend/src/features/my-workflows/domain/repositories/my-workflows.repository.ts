import { UserWorkflow } from '../models/my-workflows.models';

/**
 * My workflows repository.
 */
export interface MyWorkflowsRepository {
    /**
     * Get all workflows.
     *
     *  @returns All workflows.
     */
    getAll: () => Promise<UserWorkflow[]>;

    /**
     * Delete a workflow.
     *
     * @param workflowId Workflow ID.
     */
    delete: (workflowId: string) => Promise<void>;
}
