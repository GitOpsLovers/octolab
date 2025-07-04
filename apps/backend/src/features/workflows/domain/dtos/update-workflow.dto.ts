import { WorkflowConfig } from '../constants/workflows-dafault-configs.const';
import { EditingWorkflowYaml } from '../models/workflows.models';

/**
 * Update workflow DTO
 */
export interface UpdateWorkflowDto {
    id: string;
    templateId: string;
    name: string;
    description: string;
    yaml: EditingWorkflowYaml;
    data: WorkflowConfig;
}
