import { WorkflowConfig } from '@octolab/domain';

import { workflowsDefaultConfigs } from '../domain/constants/workflows-dafault-configs.const';

/**
 * Get template configuration use case.
 *
 * @param template Template name.
 *
 * @returns Workflow configuration.
 */
export async function getWorkflowConfigUseCase(template: string): Promise<WorkflowConfig> {
    const config = workflowsDefaultConfigs[template];

    if (!config) {
        throw new Error(`Workflow ${template} not found`);
    }

    return Promise.resolve(config);
}
