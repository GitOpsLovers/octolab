import { WorkflowConfig } from '../constants/workflows-dafault-configs.const';
import { EditingWorkflowYaml } from '../models/workflows.models';

/**
 * Create workflow DTO
 */
export interface CreateWorkflowDto {
    id: string;
    userId: string;
    templateId: string;
    name: string;
    description: string;
    yaml: EditingWorkflowYaml;
    data: WorkflowConfig;
}
