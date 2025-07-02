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
