import { EditingWorkflowYaml } from '../models/workflows.models';

import { EditingWorkflow } from '@features/templates/domain/constants/template-dafault-configs.const';

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
