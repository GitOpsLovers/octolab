/**
 * Workflow configuration model
 */
export type WorkflowConfig = NpmPublishWorkflowConfig | NodePrVerifyWorkflowConfig;

/**
 * Workflow configuration for NPM Publish
 */
export interface NpmPublishWorkflowConfig {
    id: 'npm-publish';
    runner: string;
    branch: string;
    nodeVersion: string;
    installCommand: string;
    testCommand: string;
    buildCommand: string;
    npmTokenSecret: string;
    workflowName: string;
    jobName: string;
    filename: string;
    name: string;
    description: string;
}

/**
 * Workflow configuration for Node PR Verify
 */
export interface NodePrVerifyWorkflowConfig {
    id: 'node-pr-verify';
    runner: string;
    nodeVersion: string;
    installCommand: string;
    lintCommand: string;
    testCommand: string;
    buildCommand: string;
    workflowName: string;
    jobName: string;
    filename: string;
    name: string;
    description: string;
}

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
