import { EditingWorkflow } from '../models/editor.models';

import { TemplateConfig } from '@features/templates/domain/models/template.models';

/**
 * Create workflow DTO
 */
export interface CreateWorkflowDto {
    id: string;
    name: string;
    content: EditingWorkflow;
    config: TemplateConfig;
}
