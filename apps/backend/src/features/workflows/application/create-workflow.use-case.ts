import { CreateWorkflowDto } from '../domain/dtos/create-workflow.dto';
import { DatabaseWorkflow } from '../domain/models/workflows.models';
import { WorkflowsDatabaseRepository } from '../domain/repositories/workflows.repository';

/**
 * Create workflow use case.
 *
 * @param repository Workflows database repository
 * @param createDto Create workflow DTO
 *
 * @returns Created workflow
 */
export function createWorkflowUseCase(repository: WorkflowsDatabaseRepository, createDto: CreateWorkflowDto): Promise<DatabaseWorkflow> {
    return repository.createWorkflow(createDto);
}
