import { Trigger } from '@octolab/domain';

import { EditorRepository } from '../domain/repositories/editor.repository';

/**
 * Get triggers use case
 *
 * @param repository Editor repository.
 *
 * @returns The list of triggers.
 */
export function getTriggersUseCase(repository: EditorRepository): Promise<Trigger[]> {
    return repository.getTriggers();
}
