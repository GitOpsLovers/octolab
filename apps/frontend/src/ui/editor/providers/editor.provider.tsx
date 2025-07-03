'use client';

import { useMemo, useState } from 'react';

import { EditorContext } from '../contexts/editor.context';

import { EditorConfig, Step } from '@features/editor/domain/editor.models';
import { availableTemplates } from '@features/templates/domain/constants/available-templates.const';

function generateSteps(config: EditorConfig): Step[] {
    const steps: Step[] = [
        {
            name: 'Checkout code',
            uses: 'actions/checkout@v4',
        },
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
    ];

    if (config.template === 'node-pr-verify') {
        steps.push({
            name: 'Run lint',
            run: config.lintCommand,
        });
    }

    steps.push(
        {
            name: 'Run tests',
            run: config.testCommand,
        },
        {
            name: 'Build package',
            run: config.buildCommand,
        },
    );

    if (config.template === 'npm-publish') {
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

function getWorkflowTrigger(config: EditorConfig) {
    return config.template === 'node-pr-verify' ? { pull_request: {} } : { push: { branches: [config.branch] } };
}

/**
 * Editor context provider
 */
export function EditorProvider({ children, defaultConfig }: { children: React.ReactNode; defaultConfig: EditorConfig }) {
    const [config, setConfig] = useState<EditorConfig>(defaultConfig);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const steps = useMemo(() => generateSteps(config), [config]);
    const workflowTrigger = useMemo(() => getWorkflowTrigger(config), [config]);

    const workflowConfig = useMemo(() => {
        const templateData = availableTemplates.find((t) => t.id === config.template);

        return {
            name: config.workflowName,
            on: workflowTrigger,
            jobs: {
                [templateData?.jobName ?? 'build']: {
                    'runs-on': config.runner,
                    steps,
                },
            },
        };
    }, [config, workflowTrigger, steps]);

    // Reset the config to the default values
    const resetConfig = () => {
        setConfig(defaultConfig);
    };

    return <EditorContext.Provider value={{ config, setConfig, resetConfig, errors, setErrors, workflowConfig }}>{children}</EditorContext.Provider>;
}
