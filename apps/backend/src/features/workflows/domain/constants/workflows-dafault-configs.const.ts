import { NodePrVerifyWorkflowConfig, NpmPublishWorkflowConfig } from '../models/workflows.models';

/**
 * Workflow configuration model
 */
export type WorkflowConfig = NpmPublishWorkflowConfig | NodePrVerifyWorkflowConfig;

/**
 * Default configurations for each workflow.
 */
export const workflowsDefaultConfigs: Record<string, WorkflowConfig> = {
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
        jobName: 'build',
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
        jobName: 'verify',
    },
};
