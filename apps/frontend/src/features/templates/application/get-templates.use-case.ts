import { TemplateForListing } from '@octolab/domain';

import { TemplatesRepository } from '../domain/repositories/templates.repository';

/**
 * Get templates use case.
 *
 * @param repository Templates repository.
 *
 * @returns All templates.
 */
export function getTemplatesUseCase(repository: TemplatesRepository): Promise<TemplateForListing[]> {
    return repository.getAll();
}
