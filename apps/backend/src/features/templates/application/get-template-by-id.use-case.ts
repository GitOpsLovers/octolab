import { availableTemplates } from '../domain/constants/available-templates.const';
import { Template } from '../domain/models/template.models';

/**
 * Get template by id use case.
 *
 * @param templateId Template id.
 *
 * @returns Template.
 */
export function getTemplateByIdUseCase(templateId: string): Template {
    const template = availableTemplates.find((t) => t.id === templateId);

    if (!template) {
        throw new Error(`Template ${templateId} not found`);
    }

    return template;
}
