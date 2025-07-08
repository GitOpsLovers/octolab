import { WorkflowConfig } from '@octolab/domain';

import { CreateWorkflowDto } from '../dtos/create-workflow.dto';

/**
 * Editor repository.
 */
export interface EditorRepository {
    /**
     * Get one workflow
     *
     * @param id Workflow id.
     *
     * @returns The workflow.
     */
    getOne: (id: string) => Promise<any>;

    /**
     * Get workflow configuration.
     *
     * @param id Template id.
     *
     * @returns Workflow configuration.
     */
    getWorkflowConfig: (id: string) => Promise<WorkflowConfig>;

    /**
     * Create a new workflow.
     *
     * @param createDto Create workflow DTO.
     *
     * @returns The created workflow.
     */
    create: (createDto: CreateWorkflowDto) => Promise<any>;
}
