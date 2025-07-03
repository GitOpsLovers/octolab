import { EditorConfig } from '@features/editor/domain/editor.models';

/**
 * Default configurations for each template.
 */
export const templatesDefaultConfigs: Record<string, EditorConfig> = {
    'npm-publish': {
        template: 'npm-publish',
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
        template: 'node-pr-verify',
        runner: 'ubuntu-latest',
        nodeVersion: '22',
        installCommand: 'npm install',
        lintCommand: 'npm run lint',
        testCommand: 'npm run test',
        buildCommand: 'npm run build',
        workflowName: 'Node.js Pull request verify',
    },
};
