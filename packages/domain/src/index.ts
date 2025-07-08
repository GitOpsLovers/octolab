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
    jobName: string;
    name: string;
    description: string;
    filename: string;
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
    jobName: string;
    name: string;
    description: string;
    filename: string;
}

/**
 * Template configuration for Node PR Verify workflow
 */
export interface VercelProDeploymentWorkflowConfig {
    id: 'vercel-pro-deployment';
    runner: string;
    jobName: string;
    branch: string;
    workflowName: string;
    vercelTokenSecret: string;
    name: string;
    description: string;
    filename: string;
}