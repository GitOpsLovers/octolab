import { MyWorkflowsRepository } from '../domain/repositories/my-workflows.repository';

/**
 * Delete workflows use case.
 *
 * @param repository My workflows repository.
 * @param workflowId Workflow ID.
 */
export function deleteWorkflowUseCase(repository: MyWorkflowsRepository, workflowId: string): Promise<void> {
    return repository.delete(workflowId);
}
