import { templatesDefaultConfigs, TemplateConfig } from '../domain/constants/template-dafault-configs.const';

/**
 * Get template configuration use case.
 *
 * @param template Template name.
 *
 * @returns Template configuration.
 */
export async function getTemplateConfigUseCase(template: string): Promise<TemplateConfig> {
    const config = templatesDefaultConfigs[template];

    if (!config) {
        throw new Error(`Template ${template} not found`);
    }

    return Promise.resolve(config);
}
