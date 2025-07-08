import { WorkflowConfig, WorkflowYaml } from '@octolab/domain';

/**
 * Update workflow DTO
 */
export interface UpdateWorkflowDto {
    id: string;
    userId: string;
    templateId: string;
    name: string;
    description: string;
    yaml: WorkflowYaml;
    data: WorkflowConfig;
}
