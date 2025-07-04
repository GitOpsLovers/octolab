import { UpdateWorkflowDto } from '../domain/dtos/update-workflow.dto';
import { DatabaseWorkflow } from '../domain/models/workflows.models';
import { WorkflowsDatabaseRepository } from '../domain/repositories/workflows.repository';

/**
 * Update workflow use case.
 *
 * @param repository Workflows database repository
 * @param updateDto Update workflow DTO
 *
 * @returns Updated workflow
 */
export function updateWorkflowUseCase(repository: WorkflowsDatabaseRepository, updateDto: UpdateWorkflowDto): Promise<DatabaseWorkflow> {
    return repository.updateWorkflow(updateDto);
}
