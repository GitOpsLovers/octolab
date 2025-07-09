import { WorkflowConfig } from '@octolab/domain';

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
        name: 'Publish to NPM',
        description: 'Workflow to publish a package in NPM.',
        filename: 'npm-publish.yml',
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
        name: 'Node.js pull request verify',
        description: 'Workflow to check the quality of a pull request in a Node.js stack.',
        filename: 'node-pr-verify.yml',
    },
    'vercel-pro-deployment': {
        id: 'vercel-pro-deployment',
        runner: 'ubuntu-latest',
        jobName: 'deploy',
        branch: 'main',
        workflowName: 'Vercel PRO deployment',
        vercelTokenSecret: 'VERCEL_TOKEN',
        name: 'Vercel production deployment',
        description: 'Deploy a productive application to Vercel',
        filename: 'vercel-pro-deployment.yml',
    },
    'semantic-release': {
        id: 'semantic-release',
        runner: 'ubuntu-latest',
        branch: 'main',
        nodeVersion: '22',
        installCommand: 'npm install',
        buildCommand: 'npm run build', // opcional, pero habitual
        releaseCommand: 'npx semantic-release',
        githubTokenSecret: 'GH_TOKEN',
        workflowName: 'Semantic Release',
        jobName: 'release',
        name: 'Automated releasing with Semantic Release',
        description: 'Automate versioning, changelog generation, and releases with semantic-release on every push.',
        filename: 'semantic-release.yml',
    },
};
