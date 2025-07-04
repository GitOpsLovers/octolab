import { EditingWorkflow, EditingWorkflowYaml } from '../models/editor.models';

/**
 * Create workflow DTO
 */
export interface CreateWorkflowDto {
    id: string;
    templateId: string;
    name: string;
    description: string;
    yaml: EditingWorkflowYaml;
    data: EditingWorkflow;
}
