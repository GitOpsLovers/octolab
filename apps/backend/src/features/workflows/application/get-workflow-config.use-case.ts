import { EditingWorkflow, workflowsDefaultConfigs } from '../domain/constants/workflows-dafault-configs.const';

/**
 * Get template configuration use case.
 *
 * @param template Template name.
 *
 * @returns Template configuration.
 */
export async function getWorkflowConfigUseCase(template: string): Promise<EditingWorkflow> {
    const config = workflowsDefaultConfigs[template];

    if (!config) {
        throw new Error(`Template ${template} not found`);
    }

    return Promise.resolve(config);
}
