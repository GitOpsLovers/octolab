import { Template } from '../models/template.models';

/**
 * List of available templates.
 */
export const availableTemplates: Template[] = [
    {
        id: 'node-ci',
        name: 'Node.js CI',
        description: 'Workflow to install dependencies, run tests and build for Node.js.',
        icon: 'FaNodeJs',
        iconColor: 'text-[#68A063]',
        features: ['Automated tests', 'Compatible with Node 16/18/20', 'Build before merge'],
        filename: 'node-js-ci.yml',
        jobName: 'build',
        workflowName: 'Node.js CI',
    },
    {
        id: 'npm-publish',
        name: 'Publish to NPM',
        description: 'Workflow to publish your package to NPM.',
        icon: 'FaNpm',
        iconColor: 'text-[#cb3737]',
        features: ['Configure NPM token', 'Test and build before publish', 'Compatible with monorepos'],
        filename: 'npm-publish.yml',
        jobName: 'publish',
        workflowName: 'Publish to NPM',
    },
];
