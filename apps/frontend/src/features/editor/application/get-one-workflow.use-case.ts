import { EditorRepository } from '../domain/repositories/editor.repository';

/**
 * Get one workflow use case.
 *
 * @param repository Editor repository.
 * @param id Workflow id.
 *
 * @returns Workflow.
 */
export function getOneWorkflowUseCase(repository: EditorRepository, id: string): Promise<any> {
    return repository.getOne(id);
}
