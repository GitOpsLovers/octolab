import { Template, TemplateForListing } from '@octolab/domain';

import { availableTemplates } from '../domain/constants/available-templates.const';

/**
 * Get templates use case.
 *
 * @returns List of available templates.
 */
export async function getTemplatesUseCase(): Promise<TemplateForListing[]> {
    const templatesForListing: TemplateForListing[] = availableTemplates.map((template: Template) => {
        return {
            id: template.id,
            name: template.name,
            description: template.description,
            icon: template.icon,
            iconColor: template.iconColor,
            iconLibrary: template.iconLibrary,
            features: template.features,
            type: template.type,
        };
    });

    return Promise.resolve(templatesForListing);
}
