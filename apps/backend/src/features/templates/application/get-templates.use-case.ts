import { availableTemplates } from '../domain/constants/available-templates.const';
import { Template } from '../domain/models/template.models';

/**
 * Get templates use case.
 *
 * @returns List of available templates.
 */
export async function getTemplatesUseCase(): Promise<Template[]> {
    return Promise.resolve(availableTemplates);
}
