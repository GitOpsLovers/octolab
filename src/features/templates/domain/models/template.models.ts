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
}

/**
 * Template configuration for NPM publish workflow
 */
export interface NpmPublishTemplateConfig {
    template: 'npm-publish';
    branch: string;
    nodeVersion: string;
    installCommand: string;
    testCommand: string;
    buildCommand: string;
    npmTokenSecret: string;
}

/**
 * Template configuration for Node CI workflow
 */
export interface NodeCiTemplateConfig {
    template: 'node-ci';
    branch: string;
    nodeVersion: string;
    installCommand: string;
    testCommand: string;
    buildCommand: string;
}
