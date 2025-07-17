import { Action } from '@octolab/domain';

import { EditorRepository } from '../domain/repositories/editor.repository';

/**
 * Get actions use case
 *
 * @param repository Editor repository.
 *
 * @returns List of actions.
 */
export function getActionsUseCase(repository: EditorRepository): Promise<Action[]> {
    return repository.getActions();
}
