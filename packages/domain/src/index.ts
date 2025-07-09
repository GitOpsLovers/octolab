/**
 * Template model
 */
export interface Template {
    id: string;
    name: string;
    description: string;
    icon: string;
    iconColor: string;
    iconLibrary: string;
    features: string[];
}

/**
 * User model
 */
export interface User {
    id: string;
    workflows: number;
}

export type WorkflowConfig = NpmPublishWorkflowConfig | NodePrVerifyWorkflowConfig | VercelProDeploymentWorkflowConfig | SemanticReleaseWorkflowConfig;

/**
 * Base workflow configuration model
 */
export interface BaseWorkflowConfig {
    id: string;
    runner: string;
    jobName: string;
    name: string;
    description: string;
    filename: string;
    workflowName: string;
    branch?: string;
    nodeVersion?: string;
    installCommand?: string;
    buildCommand?: string;
}

/**
 * Template configuration for NPM publish workflow
 */
export interface NpmPublishWorkflowConfig extends BaseWorkflowConfig {
    id: 'npm-publish';
    testCommand: string;
    npmTokenSecret: string;
}

/**
 * Template configuration for Node PR Verify workflow
 */
export interface NodePrVerifyWorkflowConfig extends BaseWorkflowConfig {
    id: 'node-pr-verify';
    lintCommand: string;
    testCommand: string;
}

/**
 * Template configuration for Vercel PRO deployment workflow
 */
export interface VercelProDeploymentWorkflowConfig extends BaseWorkflowConfig {
    id: 'vercel-pro-deployment';
    vercelTokenSecret: string;
}

/**
 * Template configuration for Semantic Release workflow
 */
export interface SemanticReleaseWorkflowConfig extends BaseWorkflowConfig {
    id: 'semantic-release';
    releaseCommand: string;
    githubTokenSecret: string;
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