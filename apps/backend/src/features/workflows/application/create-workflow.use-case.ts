import { CreateWorkflowDto } from '../domain/dtos/create-workflow.dto';
import { DatabaseWorkflow } from '../domain/models/workflows.models';
import { WorkflowsDatabaseRepository } from '../domain/repositories/workflows.repository';

/**
 * Create workflow use case.
 *
 * @param repository Workflows database repository
 * @param requestData Request data
 * @param userId User ID
 *
 * @returns Created workflow
 */
export function createWorkflowUseCase(repository: WorkflowsDatabaseRepository, requestData: any, userId: string): Promise<DatabaseWorkflow> {
    const createDto: CreateWorkflowDto = {
        ...requestData,
        userId,
    };

    return repository.createWorkflow(createDto);
}
