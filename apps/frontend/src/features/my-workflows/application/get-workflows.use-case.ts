import { UserWorkflow } from '../domain/models/my-workflows.models';
import { MyWorkflowsRepository } from '../domain/repositories/my-workflows.repository';

/**
 * Get workflows use case.
 *
 * @param repository My workflows repository.
 *
 * @returns All workflows.
 */
export function getWorkflowsUseCase(repository: MyWorkflowsRepository): Promise<UserWorkflow[]> {
    return repository.getAll();
}
