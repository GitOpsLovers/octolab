import { CreateWorkflowDto } from '../dtos/create-workflow.dto';
import { UpdateWorkflowDto } from '../dtos/update-workflow.dto';
import { DatabaseWorkflow } from '../models/workflows.models';

/**
 * Workflows database repository.
 */
export interface WorkflowsDatabaseRepository {
    /**
     * Get all workflows for a user.
     *
     * @param userId User id
     *
     * @returns Database workflows
     */
    getWorkflows: (userId: string) => Promise<DatabaseWorkflow[]>;

    /**
     * Get workflow by id.
     *
     * @param id Workflow id
     *
     * @returns Database workflow
     */
    getWorkflowById: (id: string) => Promise<DatabaseWorkflow | null>;

    /**
     * Create a new workflow.
     *
     * @param createDto Workflow to create
     *
     * @returns Created database workflow
     */
    createWorkflow: (createDto: CreateWorkflowDto) => Promise<DatabaseWorkflow>;

    /**
     * Update a new workflow.
     *
     * @param updateDto Workflow to update
     *
     * @returns Updated database workflow
     */
    updateWorkflow: (updateDto: UpdateWorkflowDto) => Promise<DatabaseWorkflow>;
}
