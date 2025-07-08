import { NodePrVerifyWorkflowConfig, NpmPublishWorkflowConfig, VercelProDeploymentWorkflowConfig } from '@octolab/domain';

/**
 * Workflow configuration model
 */
export type WorkflowConfig = NpmPublishWorkflowConfig | NodePrVerifyWorkflowConfig | VercelProDeploymentWorkflowConfig;

/**
 * Workflow YAML model
 */
export interface WorkflowYaml {
    name: string;
    on: any;
    jobs: Record<string, Job>;
}

/**
 * Jobs model
 */
export interface Job {
    'runs-on': string;
    steps: Step[];
}

/**
 * Step model
 */
export interface Step {
    name: string;
    run?: string;
    uses?: string;
    with?: Record<string, string>;
    env?: Record<string, string>;
}
