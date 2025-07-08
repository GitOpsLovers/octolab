import { WorkflowsDatabaseRepository } from '../domain/repositories/workflows.repository';

/**
 * Delete workflow use case.
 *
 * @param repository Workflows database repository
 * @param workflowId Workflow id
 */
export function deleteWorkflowUseCase(repository: WorkflowsDatabaseRepository, workflowId: string): Promise<void> {
    return repository.deleteWorkflow(workflowId);
}
