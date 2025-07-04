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
}
