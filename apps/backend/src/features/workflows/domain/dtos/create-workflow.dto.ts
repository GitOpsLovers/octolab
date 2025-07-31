import { WorkflowTemplateConfig, WorkflowYaml, CustomWorkflowConfig } from '@octolab/domain';

/**
 * Create workflow DTO
 */
export interface CreateWorkflowDto {
    id: string;
    userId: string;
    templateId: string;
    name: string;
    description: string;
    type: string;
    yaml: WorkflowYaml;
    data: WorkflowTemplateConfig | CustomWorkflowConfig;
}
