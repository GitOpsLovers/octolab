'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';

import { EditorContext } from '../contexts/editor.context';

import { Step } from '@features/editor/domain/editor.models';
import { getTemplateConfigUseCase } from '@features/templates/application/get-template-config.use-case';
import { TemplateConfig } from '@features/templates/domain/models/template.models';
import { templatesApiRepository } from '@features/templates/infrastructure/templates-api.repository';

function generateSteps(template: TemplateConfig): Step[] {
    const steps: Step[] = [
        {
            name: 'Checkout code',
            uses: 'actions/checkout@v4',
        },
        {
            name: 'Setup Node',
            uses: 'actions/setup-node@v4',
            with: {
                'node-version': template.nodeVersion,
            },
        },
        {
            name: 'Install dependencies',
            run: template.installCommand,
        },
    ];

    if (template.id === 'node-pr-verify') {
        steps.push({
            name: 'Run lint',
            run: template.lintCommand,
        });
    }

    steps.push(
        {
            name: 'Run tests',
            run: template.testCommand,
        },
        {
            name: 'Build package',
            run: template.buildCommand,
        },
    );

    if (template.id === 'npm-publish') {
        steps.push({
            name: 'Publish to NPM',
            uses: 'JS-DevTools/npm-publish@v3',
            with: {
                token: `\${{ secrets.${template.npmTokenSecret} }}`,
            },
        });
    }

    return steps;
}

function getWorkflowTrigger(template: TemplateConfig) {
    return template.id === 'node-pr-verify' ? { pull_request: {} } : { push: { branches: [template.branch] } };
}

/**
 * Editor context provider
 */
export function EditorProvider({ children, templateId }: { children: ReactNode; templateId: string }) {
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [templateConfig, setTemplateConfig] = useState<TemplateConfig | null>(null);
    const [initialTemplateConfig, setInitialTemplateConfig] = useState<TemplateConfig | null>(null);

    const steps = useMemo(() => {
        if (!templateConfig) return [];
        return generateSteps(templateConfig);
    }, [templateConfig]);

    const workflowTrigger = useMemo(() => {
        if (!templateConfig) return {};
        return getWorkflowTrigger(templateConfig);
    }, [templateConfig]);

    const workflowConfig = useMemo(() => {
        if (!templateConfig) return {};
        return {
            name: templateConfig.workflowName,
            on: workflowTrigger,
            jobs: {
                [templateConfig.jobName ?? 'build']: {
                    'runs-on': templateConfig.runner,
                    steps,
                },
            },
        };
    }, [templateConfig, workflowTrigger, steps]);

    useEffect(() => {
        const fetchTemplateConfig = async () => {
            try {
                const repository = templatesApiRepository();
                const templateConfigFromApi = await getTemplateConfigUseCase(repository, templateId);

                setTemplateConfig(templateConfigFromApi);
                setInitialTemplateConfig(templateConfigFromApi); // 💥 Guardas copia original
            } catch (err) {
                console.error('Error fetching templates:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplateConfig();
    }, [templateId]);

    // Reset the config to the default values
    const resetTemplateConfig = () => {
        if (initialTemplateConfig) {
            setTemplateConfig(initialTemplateConfig);
        }
    };

    const value = { templateConfig, setTemplateConfig, resetTemplateConfig, errors, setErrors, workflowConfig, loading };

    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
