import { Template } from '../domain/models/template.models';
import { TemplatesRepository } from '../domain/repositories/templates.repository';

/**
 * Get templates use case.
 *
 * @param repository Templates repository.
 *
 * @returns All templates.
 */
export function getTemplatesUseCase(repository: TemplatesRepository): Promise<Template[]> {
    return repository.getAll();
}
