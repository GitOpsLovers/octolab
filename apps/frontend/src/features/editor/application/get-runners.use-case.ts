import { Runner } from '@octolab/domain';

import { EditorRepository } from '../domain/repositories/editor.repository';

/**
 * Get runners use case
 *
 * @param repository Editor repository.
 *
 * @returns The list of runners.
 */
export function getRunnersUseCase(repository: EditorRepository): Promise<Runner[]> {
    return repository.getRunners();
}
