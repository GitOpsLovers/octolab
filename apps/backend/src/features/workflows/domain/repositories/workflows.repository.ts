import { CreateWorkflowDto } from '../dtos/create-workflow.dto';
import { DatabaseWorkflow } from '../models/workflows.models';

/**
 * Workflows database repository.
 */
export interface WorkflowsDatabaseRepository {
    /**
     * Create a new workflow.
     *
     * @param createDto Workflow to create
     *
     * @returns Created workflow
     */
    createWorkflow: (createDto: CreateWorkflowDto) => Promise<DatabaseWorkflow>;
}
