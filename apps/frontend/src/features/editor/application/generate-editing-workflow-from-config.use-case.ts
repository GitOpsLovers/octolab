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
        {
            name: 'Setup Node',
            uses: 'actions/setup-node@v4',
            with: {
                'node-version': workflowConfig.nodeVersion,
            },
        },
        {
            name: 'Install dependencies',
            run: workflowConfig.installCommand,
        },
    ];

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

    if (workflowConfig.id === 'npm-publish') {
        steps.push({
            name: 'Publish to NPM',
            uses: 'JS-DevTools/npm-publish@v3',
            with: {
                token: `\${{ secrets.${workflowConfig.npmTokenSecret} }}`,
            },
        });
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
