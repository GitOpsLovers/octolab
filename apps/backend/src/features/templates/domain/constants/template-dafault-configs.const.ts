import { NodePrVerifyTemplateConfig, NpmPublishTemplateConfig } from '../models/template.models';

/**
 * Editor configuration model
 */
export type TempplateConfig = NpmPublishTemplateConfig | NodePrVerifyTemplateConfig;

/**
 * Default configurations for each template.
 */
export const templatesDefaultConfigs: Record<string, TempplateConfig> = {
    'npm-publish': {
        id: 'npm-publish',
        runner: 'ubuntu-latest',
        branch: 'main',
        nodeVersion: '22',
        installCommand: 'npm install',
        testCommand: 'npm run test',
        buildCommand: 'npm run build',
        npmTokenSecret: 'NPM_TOKEN',
        workflowName: 'Publish to NPM',
    },
    'node-pr-verify': {
        id: 'node-pr-verify',
        runner: 'ubuntu-latest',
        nodeVersion: '22',
        installCommand: 'npm install',
        lintCommand: 'npm run lint',
        testCommand: 'npm run test',
        buildCommand: 'npm run build',
        workflowName: 'Node.js Pull request verify',
    },
};
