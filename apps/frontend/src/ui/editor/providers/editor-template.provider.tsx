'use client';

import { Template, WorkflowConfig } from '@octolab/domain';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import { EditorTemplateContext } from '../contexts/editor.context';

import { generateEditingWorkflowFromConfigUseCase } from '@features/editor/application/generate-editing-workflow-from-config.use-case';
import { getOneWorkflowUseCase } from '@features/editor/application/get-one-workflow.use-case';
import { getRunnersUseCase } from '@features/editor/application/get-runners.use-case';
import { getWorkflowConfigUseCase } from '@features/editor/application/get-workflow-config.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';
import { getOneTemplateUseCase } from '@features/templates/application/get-one-template.use-case';
import { templatesApiRepository } from '@features/templates/infrastructure/templates-api.repository';
import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

interface EditorTemplateProviderProps {
    children: ReactNode;
    templateId: string;
    workflowId: string;
}

/**
 * Editor template provider
 */
export function EditorTemplateProvider({ children, templateId, workflowId }: EditorTemplateProviderProps) {
    const { authToken, isLoading } = useAuthUser();
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [template, setTemplate] = useState<Template | null>(null);
    const [availableRunners, setAvailableRunners] = useState<string[]>([]);
    const [editingWorkflow, setEditingWorkflow] = useState<WorkflowConfig | null>(null);
    const [initialEditingWorkflowData, setInitialEditingWorkflowData] = useState<WorkflowConfig | null>(null);
    const [isEditingExistingWorkflow, setIsEditingExistingWorkflow] = useState<boolean>(false);

    /**
     * Get runners
     */
    useEffect(() => {
        const fetchRunners = async () => {
            try {
                const repository = editorApiRepository();
                const runners = await getRunnersUseCase(repository);

                setAvailableRunners(runners);
            } catch (err) {
                console.error('Error fetching runners:', err);
            }
        };

        fetchRunners();
    }, []);

    useEffect(() => {
        const init = async () => {
            // Si hay workflowId, buscamos en DB (incluyendo los custom)
            if (workflowId) {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const repository = editorApiRepository(authToken!);
                    const existingWorkflow = await getOneWorkflowUseCase(repository, workflowId);

                    if (existingWorkflow) {
                        const existingWorkflowData = JSON.parse(existingWorkflow.data);

                        const workflow: WorkflowConfig = {
                            id: existingWorkflowData.id,
                            runner: existingWorkflowData.runner,
                            nodeVersion: existingWorkflowData.nodeVersion,
                            installCommand: existingWorkflowData.installCommand,
                            testCommand: existingWorkflowData.testCommand,
                            lintCommand: existingWorkflowData.lintCommand,
                            buildCommand: existingWorkflowData.buildCommand,
                            workflowName: existingWorkflowData.workflowName,
                            jobName: existingWorkflowData.jobName,
                            npmTokenSecret: existingWorkflowData.npmTokenSecret,
                            vercelTokenSecret: existingWorkflowData.vercelTokenSecret,
                            filename: existingWorkflowData.filename ?? 'custom-workflow.yml',
                            name: existingWorkflow.name,
                            description: existingWorkflow.description,
                            branch: existingWorkflowData.branch,
                            jobs: existingWorkflowData.jobs,
                            on: existingWorkflowData.on,
                        };

                        setEditingWorkflow(structuredClone(workflow));
                        setInitialEditingWorkflowData(structuredClone(workflow));
                        setIsEditingExistingWorkflow(true);
                        setLoading(false);
                        return;
                    }
                } catch (err) {
                    console.error('Error fetching workflow:', err);
                }
            }

            const fetchTemplate = async (): Promise<Template | null> => {
                try {
                    const repository = templatesApiRepository();
                    const templateFromApi = await getOneTemplateUseCase(repository, templateId);
                    setTemplate(templateFromApi);
                    return templateFromApi;
                } catch (err) {
                    console.error('Error fetching template:', err);
                    return null;
                }
            };

            const fetchWorkflowConfig = async (templateOverride?: Template | null) => {
                try {
                    const repository = editorApiRepository();
                    const workflowConfigFromApi = await getWorkflowConfigUseCase(repository, templateId);

                    const initialWorkflow: WorkflowConfig = {
                        ...workflowConfigFromApi,
                        name: templateOverride?.name ?? '',
                        description: templateOverride?.description ?? '',
                    };

                    setEditingWorkflow(structuredClone(initialWorkflow));
                    setInitialEditingWorkflowData(structuredClone(initialWorkflow));
                } catch (err) {
                    console.error('Error fetching workflow config:', err);
                }
            };

            const templateFetched = await fetchTemplate();
            await fetchWorkflowConfig(templateFetched);

            setLoading(false);
        };

        if (!isLoading) {
            setLoading(true);
            init();
        }
    }, [isLoading, authToken, templateId, workflowId]);

    const editingWorkflowYaml = useMemo(() => {
        if (!editingWorkflow) return null;
        return generateEditingWorkflowFromConfigUseCase(editingWorkflow);
    }, [editingWorkflow]);

    const resetEditingWorkflow = () => {
        if (initialEditingWorkflowData) {
            setEditingWorkflow(structuredClone(initialEditingWorkflowData));
        }
    };

    const setWorkflowNameAndDescription = (name: string, description: string) => {
        setEditingWorkflow((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                name,
                description,
            };
        });
    };

    const value = {
        editingWorkflow,
        editingWorkflowYaml,
        availableRunners,
        template,
        isEditingExistingWorkflow,
        loading,
        errors,
        setEditingWorkflow,
        resetEditingWorkflow,
        setIsEditingExistingWorkflow,
        setWorkflowNameAndDescription,
        setErrors,
    };

    return <EditorTemplateContext.Provider value={value}>{children}</EditorTemplateContext.Provider>;
}
