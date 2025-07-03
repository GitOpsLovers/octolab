/**
 * Template model
 */
export interface Template {
    id: string;
    name: string;
    description: string;
    icon: string;
    iconColor: string;
    features: string[];
    filename: string;
    jobName: string;
    workflowName: string;
}

/**
 * Template configuration for NPM publish workflow
 */
export interface NpmPublishTemplateConfig {
    template: 'npm-publish';
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
export interface NodePrVerifyTemplateConfig {
    template: 'node-pr-verify';
    runner: string;
    nodeVersion: string;
    installCommand: string;
    lintCommand: string;
    testCommand: string;
    buildCommand: string;
    workflowName: string;
}
