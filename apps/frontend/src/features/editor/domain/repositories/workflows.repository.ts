import { CreateWorkflowDto } from '../dtos/create-workflow.dto';

/**
 * Workflows repository.
 */
export interface WorkflowsRepository {
    /**
     * Create a new workflow.
     *
     * @param createDto Create workflow DTO.
     *
     * @returns The created workflow.
     */
    create: (createDto: CreateWorkflowDto) => Promise<any>;
}
