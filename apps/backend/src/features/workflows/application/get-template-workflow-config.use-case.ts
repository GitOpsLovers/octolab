import { WorkflowTemplateConfig } from '@octolab/domain';

import { workflowsDefaultConfigs } from '../domain/constants/workflows-dafault-configs.const';

/**
 * Get template workflow configuration use case.
 *
 * @param templateId Template ID.
 *
 * @returns Template workflow configuration.
 */
export async function getTemplateWorkflowConfigUseCase(templateId: string): Promise<WorkflowTemplateConfig> {
    const config = workflowsDefaultConfigs[templateId];

    if (!config) {
        throw new Error(`Workflow ${templateId} not found`);
    }

    return Promise.resolve(config);
}
