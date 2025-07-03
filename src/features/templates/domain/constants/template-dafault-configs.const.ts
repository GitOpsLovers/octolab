import { EditorConfig } from '@features/editor/domain/editor.models';

/**
 * Default configurations for each template.
 */
export const templatesDefaultConfigs: Record<string, EditorConfig> = {
    'npm-publish': {
        template: 'npm-publish',
        branch: 'main',
        nodeVersion: '18',
        installCommand: 'npm install',
        testCommand: 'npm test',
        buildCommand: 'npm run build',
        npmTokenSecret: 'NPM_TOKEN',
    },
    'node-ci': {
        template: 'node-ci',
        branch: 'main',
        nodeVersion: '18',
        installCommand: 'npm install',
        testCommand: 'npm test',
        buildCommand: 'npm run build',
    },
};
