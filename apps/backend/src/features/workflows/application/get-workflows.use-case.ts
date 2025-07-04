import { UserWorkflow } from '../domain/models/workflows.models';
import { WorkflowsDatabaseRepository } from '../domain/repositories/workflows.repository';

/**
 * Get workflows use case.
 *
 * @param repository Workflows database repository.
 * @param userId User identifier.
 *
 * @returns User workflows.
 */
export function getWorkflowsUseCase(repository: WorkflowsDatabaseRepository, userId: string): Promise<UserWorkflow[]> {
    const databaseWorkflows = repository.getWorkflows(userId);

    return databaseWorkflows.then((workflows) =>
        workflows.map((workflow) => ({
            id: workflow.id,
            name: workflow.name,
            description: workflow.description,
            updatedAt: workflow.updatedAt,
            // eslint-disable-next-line prettier/prettier
        })));
}
