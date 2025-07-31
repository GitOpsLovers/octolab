import { WorkflowTemplateConfig } from '@octolab/domain';

import { EditorRepository } from '../domain/repositories/editor.repository';

/**
 * Get workflow configuration use case.
 *
 * @param repository Editor repository.
 * @param id Template id.
 *
 * @returns Workflow configuration.
 */
export function getWorkflowConfigUseCase(repository: EditorRepository, id: string): Promise<WorkflowTemplateConfig> {
    return repository.getWorkflowConfig(id);
}
