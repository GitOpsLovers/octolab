import { templatesDefaultConfigs, TempplateConfig } from '../domain/constants/template-dafault-configs.const';

/**
 * Get template configuration use case.
 *
 * @param template Template name.
 *
 * @returns Template configuration.
 */
export function getTemplateConfigUseCase(template: string): TempplateConfig {
    const config = templatesDefaultConfigs[template];

    if (!config) {
        throw new Error(`Template ${template} not found`);
    }

    return config;
}
