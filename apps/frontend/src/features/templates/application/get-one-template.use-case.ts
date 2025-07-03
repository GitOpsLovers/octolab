import { Template } from '../domain/models/template.models';
import { TemplatesRepository } from '../domain/repositories/templates.repository';

/**
 * Get one template use case.
 *
 * @param repository Templates repository.
 * @param id Template id.
 *
 * @returns Template.
 */
export function getOneTemplateUseCase(repository: TemplatesRepository, id: string): Promise<Template> {
    return repository.getOne(id);
}
