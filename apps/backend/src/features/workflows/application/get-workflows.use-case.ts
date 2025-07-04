import { DatabaseWorkflow } from '../domain/models/workflows.models';
import { WorkflowsDatabaseRepository } from '../domain/repositories/workflows.repository';

/**
 * Get workflows use case.
 *
 * @param repository Workflows database repository.
 *
 * @returns Database workflows.
 */
export function getWorkflowsUseCase(repository: WorkflowsDatabaseRepository): Promise<DatabaseWorkflow[]> {
    return repository.getWorkflows();
}
