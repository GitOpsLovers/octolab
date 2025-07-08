import { Template } from '@octolab/domain';

import { availableTemplates } from '../domain/constants/available-templates.const';

/**
 * Get templates use case.
 *
 * @returns List of available templates.
 */
export async function getTemplatesUseCase(): Promise<Template[]> {
    return Promise.resolve(availableTemplates);
}
