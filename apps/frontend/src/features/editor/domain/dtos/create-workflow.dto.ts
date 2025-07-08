import { WorkflowConfig, WorkflowYaml } from '../models/editor.models';

/**
 * Create workflow DTO
 */
export interface CreateWorkflowDto {
    id: string;
    templateId: string;
    name: string;
    description: string;
    yaml: WorkflowYaml;
    data: WorkflowConfig;
}
