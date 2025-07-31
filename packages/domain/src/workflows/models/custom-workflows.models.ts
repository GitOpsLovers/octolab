import { Trigger } from '../../triggers/models/triggers.models';

import { Job } from './workflows.models';

/**
 * Configuration for custom workflows
 */
export interface CustomWorkflowConfig {
    id: 'custom';
    name: string;
    description: string;
    filename: string;
    workflowName: string;
    on: Trigger;
    branch?: string;
    schedule?: string;
    jobs: Job[];
}
