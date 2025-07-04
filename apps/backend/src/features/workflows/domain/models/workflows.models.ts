/**
 * Workflow from database
 */
export interface DatabaseWorkflow {
    id: string;
    userId: string;
    name: string;
    description: string;
    yaml: string;
    data: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Template configuration for NPM publish workflow
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
}

/**
 * Template configuration for Node PR Verify workflow
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
}

/**
 * Editing workflow YAML model
 */
export interface EditingWorkflowYaml {
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

/**
 * User workflow model
 */
export interface UserWorkflow {
    id: string;
    name: string;
    description: string;
    updatedAt: string;
}
