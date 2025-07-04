import { EditingWorkflow } from '../models/workflows.models';

import { TemplateConfig } from '@features/templates/domain/constants/template-dafault-configs.const';

/**
 * Create workflow DTO
 */
export interface CreateWorkflowDto {
    id: string;
    name: string;
    content: EditingWorkflow;
    config: TemplateConfig;
}
