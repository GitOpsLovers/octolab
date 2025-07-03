import { Template } from '../models/template.models';

/**
 * List of available templates.
 */
export const availableTemplates: Template[] = [
    {
        id: 'node-ci',
        name: 'Node.js CI',
        description: 'Workflow to install dependencies, run tests and build for Node.js.',
        icon: '🟢',
        features: ['Automated tests', 'Compatible with Node 16/18/20', 'Build before merge'],
    },
    {
        id: 'npm-publish',
        name: 'Publish to NPM',
        description: 'Workflow to publish your package to NPM.',
        icon: '📦',
        features: ['Configure NPM token', 'Test and build before publish', 'Compatible with monorepos'],
    },
];
