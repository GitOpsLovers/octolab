import { EditingWorkflow, Step } from '../domain/editor.models';

import { TemplateConfig } from '@features/templates/domain/models/template.models';

/**
 * Generate editing workflow from template configuration use case.
 *
 * @param templateConfig Template configuration
 *
 * @returns Editing workflow
 */
export function generateEditingWorkflowFromConfigUseCase(templateConfig: TemplateConfig): EditingWorkflow {
    const on = templateConfig.id === 'node-pr-verify' ? { pull_request: {} } : { push: { branches: [templateConfig.branch] } };
    const steps: Step[] = [
        {
            name: 'Checkout code',
            uses: 'actions/checkout@v4',
        },
        {
            name: 'Setup Node',
            uses: 'actions/setup-node@v4',
            with: {
                'node-version': templateConfig.nodeVersion,
            },
        },
        {
            name: 'Install dependencies',
            run: templateConfig.installCommand,
        },
    ];

    if (templateConfig.id === 'node-pr-verify') {
        steps.push({
            name: 'Run lint',
            run: templateConfig.lintCommand,
        });
    }

    steps.push(
        {
            name: 'Run tests',
            run: templateConfig.testCommand,
        },
        {
            name: 'Build package',
            run: templateConfig.buildCommand,
        },
    );

    if (templateConfig.id === 'npm-publish') {
        steps.push({
            name: 'Publish to NPM',
            uses: 'JS-DevTools/npm-publish@v3',
            with: {
                token: `\${{ secrets.${templateConfig.npmTokenSecret} }}`,
            },
        });
    }

    return {
        name: templateConfig.workflowName,
        on,
        jobs: {
            [templateConfig.jobName ?? 'build']: {
                'runs-on': templateConfig.runner,
                steps,
            },
        },
    };
}
