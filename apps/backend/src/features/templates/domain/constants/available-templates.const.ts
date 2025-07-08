import type { Template } from '@octolab/domain';

/**
 * List of available templates.
 */
export const availableTemplates: Template[] = [
    {
        id: 'node-pr-verify',
        name: 'Node.js pull request verify',
        description: 'Workflow to check the quality of a pull request in a Node.js stack.',
        icon: 'FaNodeJs',
        iconColor: '#68A063',
        iconLibrary: 'fa',
        features: ['Execution in Pull requests', 'Multiple Node versions', 'Lint & Test', 'Build before merge'],
    },
    {
        id: 'npm-publish',
        name: 'Publish to NPM',
        description: 'Workflow to publish a package in NPM.',
        icon: 'FaNpm',
        iconColor: '#cb3737',
        iconLibrary: 'fa',
        features: ['Configurable target branch', 'Official or proprietary registry', 'Secure NPM token', 'Test and build before publish'],
    },
    {
        id: 'vercel-pro-deployment',
        name: 'Vercel production deployment',
        description: 'Deploy a productive application to Vercel',
        icon: 'IoLogoVercel',
        iconColor: '#000000',
        iconLibrary: 'io5',
        features: [
            'Automatic production deployment on main branch',
            'Environment and secrets pulled from Vercel',
            'Project built in CI pipeline',
            'Secure authentication using GitHub secrets',
        ],
    },
];
