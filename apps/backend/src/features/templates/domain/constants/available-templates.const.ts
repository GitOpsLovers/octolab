import type { Template } from '@octolab/domain';

/**
 * List of available templates.
 */
export const availableTemplates: Template[] = [
    {
        id: 'node-pr-verify',
        name: 'Node.js pull request verify',
        description: 'Verify and ensure the quality of pull requests in a Node.js codebase before merging.',
        icon: 'FaNodeJs',
        iconColor: '#68A063',
        iconLibrary: 'fa',
        features: ['Run on pull requests', 'Multiple Node versions', 'Lint and test checks', 'Build verification before merge'],
    },
    {
        id: 'npm-publish',
        name: 'Publish to NPM',
        description: 'Publish and release packages to NPM automatically after merging to main.',
        icon: 'FaNpm',
        iconColor: '#cb3737',
        iconLibrary: 'fa',
        features: ['Target branch configuration', 'Supports private or public registries', 'Secure NPM authentication', 'Build and test before publish'],
    },
    {
        id: 'vercel-pro-deployment',
        name: 'Vercel production deployment',
        description: 'Deploy your application to Vercel automatically after merging to production.',
        icon: 'IoLogoVercel',
        iconColor: '#000000',
        iconLibrary: 'io5',
        features: ['Auto deploy on main branch', 'Sync environment and secrets', 'Build in CI pipeline', 'Secure token-based authentication'],
    },
    {
        id: 'semantic-release',
        name: 'Automated releasing with Semantic Release',
        description: 'Automate versioning, changelog generation, and releases with semantic-release on every push.',
        icon: 'FaRobot',
        iconColor: '#40a9ff',
        iconLibrary: 'fa',
        features: ['Automatic version and changelog', 'Release on main branch', 'Publish to registries or GitHub', 'Auto-generated release notes'],
    },
];
