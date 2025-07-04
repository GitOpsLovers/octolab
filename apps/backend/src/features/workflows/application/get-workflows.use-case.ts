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
export async function getWorkflowsUseCase(repository: WorkflowsDatabaseRepository, userId: string): Promise<UserWorkflow[]> {
    const databaseWorkflows = await repository.getWorkflows(userId);

    return databaseWorkflows.map((workflow) => {
        const templateId = JSON.parse(workflow.data).id;

        return {
            id: workflow.id,
            name: workflow.name,
            description: workflow.description,
            templateId,
            yaml: workflow.yaml,
            data: workflow.data,
            updatedAt: workflow.updatedAt,
        };
    });
}
