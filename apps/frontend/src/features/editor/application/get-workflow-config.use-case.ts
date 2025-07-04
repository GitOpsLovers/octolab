import { WorkflowsRepository } from '../domain/repositories/workflows.repository';

import { WorkflowConfig } from '@features/editor/domain/models/editor.models';

/**
 * Get workflow configuration use case.
 *
 * @param repository Workflows repository.
 * @param id Template id.
 *
 * @returns Workflow configuration.
 */
export function getWorkflowConfigUseCase(repository: WorkflowsRepository, id: string): Promise<WorkflowConfig> {
    return repository.getWorkflowConfig(id);
}
