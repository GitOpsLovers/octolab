import { TemplateConfig } from '../domain/models/template.models';
import { TemplatesRepository } from '../domain/repositories/templates.repository';

/**
 * Get template configuration use case.
 *
 * @param repository Templates repository.
 * @param id Template id.
 *
 * @returns Template configuration.
 */
export function getTemplateConfigUseCase(repository: TemplatesRepository, id: string): Promise<TemplateConfig> {
    return repository.getTemplateConfig(id);
}
