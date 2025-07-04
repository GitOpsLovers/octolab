import { EditorRepository } from '../domain/repositories/editor.repository';

import { WorkflowConfig } from '@features/editor/domain/models/editor.models';

/**
 * Get workflow configuration use case.
 *
 * @param repository Editor repository.
 * @param id Template id.
 *
 * @returns Workflow configuration.
 */
export function getWorkflowConfigUseCase(repository: EditorRepository, id: string): Promise<WorkflowConfig> {
    return repository.getWorkflowConfig(id);
}
