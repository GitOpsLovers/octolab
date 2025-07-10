import type { Template } from '@octolab/domain';

/**
 * List of available templates.
 */
export const availableTemplates: Template[] = [
    {
        id: 'node-pr-verify',
        name: 'Node.js pull request verify',
        description: 'Verify and ensure the quality of pull requests in a Node.js codebase.',
        icon: 'FaNodeJs',
        iconColor: '#68A063',
        iconLibrary: 'fa',
        features: ['Configurable runners', 'Multiple Node versions', 'Lint and test checks', 'Build verification'],
    },
    {
        id: 'npm-publish',
        name: 'Publish to NPM',
        description: 'Publish and release packages to NPM automatically after merging.',
        icon: 'FaNpm',
        iconColor: '#cb3737',
        iconLibrary: 'fa',
        features: ['Configurable runners', 'Target branch configuration', 'Multiple Node versions', 'Secure NPM authentication'],
    },
    {
        id: 'vercel-pro-deployment',
        name: 'Vercel production deployment',
        description: 'Deploy an application to Vercel in production environment.',
        icon: 'IoLogoVercel',
        iconColor: '#000000',
        iconLibrary: 'io5',
        features: ['Configurable runners', 'Target branch configuration', 'Sync environment and secrets from Vercel', 'Prebuilt artifact deployment'],
    },
    {
        id: 'semantic-release',
        name: 'Releasing with Semantic Release',
        description: 'Automate versioning, changelog generation and release generation on every push.',
        icon: 'FaRobot',
        iconColor: '#40a9ff',
        iconLibrary: 'fa',
        features: ['Configurable runners', 'Target branch configuration', 'Multiple Node versions', 'Automated versioning and changelog'],
    },
    {
        id: 'aws-s3-cloudfront-deploy',
        name: 'Deploy to AWS S3 and CloudFront',
        description: 'Automate deployments to AWS for modern static or frontend applications.',
        icon: 'FaAws',
        iconColor: '#FF9900',
        iconLibrary: 'fa',
        features: ['Configurable runners', 'Target branch configuration', 'Secure AWS authentication with IAM roles', 'Automatic CloudFront cache invalidation'],
    },
];
