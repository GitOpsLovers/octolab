import { Step, WorkflowConfig, WorkflowYaml } from '../domain/models/editor.models';

/**
 * Generate editing workflow from template configuration use case.
 *
 * @param workflowConfig Template configuration
 *
 * @returns Editing workflow
 */
export function generateEditingWorkflowFromConfigUseCase(workflowConfig: WorkflowConfig): WorkflowYaml {
    const on = workflowConfig.id === 'node-pr-verify' ? { pull_request: {} } : { push: { branches: [workflowConfig.branch] } };

    const steps: Step[] = [
        {
            name: 'Checkout code',
            uses: 'actions/checkout@v4',
        },
    ];

    // If template is vercel-pro-deployment, add Install Vercel CLI step after checkout
    if (workflowConfig.id === 'vercel-pro-deployment') {
        steps.push({
            name: 'Install Vercel CLI',
            run: 'npm install --global vercel@latest',
        });
    }

    // Add Setup Node only for node-pr-verify or npm-publish
    if (workflowConfig.id === 'node-pr-verify' || workflowConfig.id === 'npm-publish') {
        steps.push({
            name: 'Setup Node',
            uses: 'actions/setup-node@v4',
            with: {
                'node-version': workflowConfig.nodeVersion,
            },
        });
    }

    // Steps to install, test, build only if NOT vercel-pro-deployment
    if (workflowConfig.id !== 'vercel-pro-deployment') {
        steps.push({
            name: 'Install dependencies',
            run: workflowConfig.installCommand,
        });

        if (workflowConfig.id === 'node-pr-verify') {
            steps.push({
                name: 'Run lint',
                run: workflowConfig.lintCommand,
            });
        }

        steps.push(
            {
                name: 'Run tests',
                run: workflowConfig.testCommand,
            },
            {
                name: 'Build package',
                run: workflowConfig.buildCommand,
            },
        );
    }

    if (workflowConfig.id === 'npm-publish') {
        steps.push({
            name: 'Publish to NPM',
            uses: 'JS-DevTools/npm-publish@v3',
            with: {
                token: `\${{ secrets.${workflowConfig.npmTokenSecret} }}`,
            },
        });
    }

    // Add final Vercel steps if template is vercel-pro-deployment
    if (workflowConfig.id === 'vercel-pro-deployment') {
        steps.push(
            {
                name: 'Pull Vercel Environment Information',
                run: `vercel pull --yes --environment=production --token=\${{ secrets.${workflowConfig.vercelTokenSecret} }}`,
            },
            {
                name: 'Build Project Artifacts',
                run: `vercel build --prod --token=\${{ secrets.${workflowConfig.vercelTokenSecret} }}`,
            },
            {
                name: 'Deploy Project Artifacts to Vercel',
                run: `vercel deploy --prebuilt --prod --token=\${{ secrets.${workflowConfig.vercelTokenSecret} }}`,
            },
        );
    }

    return {
        name: workflowConfig.workflowName,
        on,
        jobs: {
            [workflowConfig.jobName ?? 'build']: {
                'runs-on': workflowConfig.runner,
                steps,
            },
        },
    };
}
