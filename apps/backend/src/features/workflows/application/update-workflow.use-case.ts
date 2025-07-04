import { UpdateWorkflowDto } from '../domain/dtos/update-workflow.dto';
import { DatabaseWorkflow } from '../domain/models/workflows.models';
import { WorkflowsDatabaseRepository } from '../domain/repositories/workflows.repository';

/**
 * Update workflow use case.
 *
 * @param repository Workflows database repository
 * @param requestData Request data
 * @param userId User ID
 *
 * @returns Updated workflow
 */
export function updateWorkflowUseCase(repository: WorkflowsDatabaseRepository, requestData: any, userId: string): Promise<DatabaseWorkflow> {
    const updateDto: UpdateWorkflowDto = {
        ...requestData,
        userId,
    };

    return repository.updateWorkflow(updateDto);
}
