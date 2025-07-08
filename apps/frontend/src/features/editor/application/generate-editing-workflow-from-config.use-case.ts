import { NodePrVerifyWorkflowConfig, NpmPublishWorkflowConfig, Step, VercelProDeploymentWorkflowConfig, WorkflowConfig, WorkflowYaml } from '../domain/models/editor.models';

/**
 * Generate base steps
 */
function baseSteps(): Step[] {
    return [
        {
            name: 'Checkout code',
            uses: 'actions/checkout@v4',
        },
    ];
}

/**
 * Generate Node.js steps
 */
function nodeSteps(config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig): Step[] {
    const steps: Step[] = [
        {
            name: 'Setup Node',
            uses: 'actions/setup-node@v4',
            with: {
                'node-version': config.nodeVersion,
            },
        },
        {
            name: 'Install dependencies',
            run: config.installCommand,
        },
        {
            name: 'Run tests',
            run: config.testCommand,
        },
        {
            name: 'Build package',
            run: config.buildCommand,
        },
    ];

    if (config.id === 'node-pr-verify') {
        steps.splice(2, 0, {
            name: 'Run lint',
            run: config.lintCommand,
        });
    }

    if (config.id === 'npm-publish') {
        steps.push({
            name: 'Publish to NPM',
            uses: 'JS-DevTools/npm-publish@v3',
            with: {
                token: `\${{ secrets.${config.npmTokenSecret} }}`,
            },
        });
    }

    return steps;
}

/**
 * Generate Vercel steps
 */
function vercelSteps(config: VercelProDeploymentWorkflowConfig): Step[] {
    return [
        {
            name: 'Install Vercel CLI',
            run: 'npm install --global vercel@latest',
        },
        {
            name: 'Pull Vercel Environment Information',
            run: `vercel pull --yes --environment=production --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
        {
            name: 'Build Project Artifacts',
            run: `vercel build --prod --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
        {
            name: 'Deploy Project Artifacts to Vercel',
            run: `vercel deploy --prebuilt --prod --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
    ];
}

/**
 * Generate steps based on workflow config
 */
function generateSteps(config: WorkflowConfig): Step[] {
    const steps = baseSteps();

    if (config.id === 'node-pr-verify' || config.id === 'npm-publish') {
        steps.push(...nodeSteps(config));
    } else if (config.id === 'vercel-pro-deployment') {
        steps.push(...vercelSteps(config));
    }

    return steps;
}

/**
 * Generate a workflow from a workflow config
 */
export function generateEditingWorkflowFromConfigUseCase(workflowConfig: WorkflowConfig): WorkflowYaml {
    const on = workflowConfig.id === 'node-pr-verify' ? { pull_request: {} } : { push: { branches: [workflowConfig.branch] } };
    const steps = generateSteps(workflowConfig);

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
