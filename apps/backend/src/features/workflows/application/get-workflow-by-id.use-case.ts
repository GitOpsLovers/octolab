import { DatabaseWorkflow } from '../domain/models/workflows.models';
import { WorkflowsDatabaseRepository } from '../domain/repositories/workflows.repository';

/**
 * Get workflow by id use case.
 *
 * @param repository Workflows database repository.
 * @param id Workflow id.
 *
 * @returns Database workflow.
 */
export function getWorkflowByIdUseCase(repository: WorkflowsDatabaseRepository, id: string): Promise<DatabaseWorkflow | null> {
    return repository.getWorkflowById(id);
}
