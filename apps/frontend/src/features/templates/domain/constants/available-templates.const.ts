import { Template } from '../models/template.models';

/**
 * List of available templates.
 */
export const availableTemplates: Template[] = [
    {
        id: 'node-pr-verify',
        name: 'Node.js pull request verify',
        description: 'Workflow to check the quality of a pull request in a Node.js stack.',
        icon: 'FaNodeJs',
        iconColor: 'text-[#68A063]',
        features: ['Execution in Pull requests', 'Multiple Node versions', 'Lint & Test', 'Build before merge'],
        filename: 'node-pr-verify-ci.yml',
        jobName: 'verify',
        workflowName: 'Node.js Pull Request Verify',
    },
    {
        id: 'npm-publish',
        name: 'Publish to NPM',
        description: 'Workflow to publish a package in NPM.',
        icon: 'FaNpm',
        iconColor: 'text-[#cb3737]',
        features: ['Configurable target branch', 'Official or proprietary registry', 'Secure NPM token', 'Test and build before publish'],
        filename: 'npm-publish.yml',
        jobName: 'publish',
        workflowName: 'Publish to NPM',
    },
];
