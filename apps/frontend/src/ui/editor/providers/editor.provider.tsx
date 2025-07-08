'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';

import { EditorContext } from '../contexts/editor.context';

import { generateEditingWorkflowFromConfigUseCase } from '@features/editor/application/generate-editing-workflow-from-config.use-case';
import { getOneWorkflowUseCase } from '@features/editor/application/get-one-workflow.use-case';
import { getWorkflowConfigUseCase } from '@features/editor/application/get-workflow-config.use-case';
import { WorkflowConfig } from '@features/editor/domain/models/editor.models';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';
import { getOneTemplateUseCase } from '@features/templates/application/get-one-template.use-case';
import { Template } from '@features/templates/domain/models/template.models';
import { templatesApiRepository } from '@features/templates/infrastructure/templates-api.repository';
import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

interface EditorProviderProps {
    children: ReactNode;
    templateId: string;
    workflowId: string;
}

/**
 * Editor context provider
 */
export function EditorProvider({ children, templateId, workflowId }: EditorProviderProps) {
    const { authToken, isLoading } = useAuthUser();
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [template, setTemplate] = useState<Template | null>(null);
    const [editingWorkflow, setEditingWorkflow] = useState<WorkflowConfig | null>(null);
    const [initialEditingWorkflowData, setInitialEditingWorkflowData] = useState<WorkflowConfig | null>(null);
    const [isEditingExistingWorkflow, setIsEditingExistingWorkflow] = useState<boolean>(false);

    /**
     * Initialize the editor data
     *
     * This effect fecthes an existing workflow from Backend.
     * If it doesn't exist, it fetches the template and the base workflow configuration.
     */
    useEffect(() => {
        const init = async () => {
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

                    setEditingWorkflow(initialWorkflow);
                    setInitialEditingWorkflowData(initialWorkflow);
                } catch (err) {
                    console.error('Error fetching workflow config:', err);
                }
            };

            const fetchWorkflow = async () => {
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
                            filename: '????', // Esto puedes reemplazarlo con el que toque
                            name: existingWorkflow.name,
                            description: existingWorkflow.description,
                            branch: existingWorkflowData.branch,
                        };

                        setEditingWorkflow(workflow);
                        setInitialEditingWorkflowData(workflow);
                        setIsEditingExistingWorkflow(true);
                    } else {
                        const templateFetched = await fetchTemplate();
                        await fetchWorkflowConfig(templateFetched);
                    }
                } catch (err) {
                    console.error('Error fetching workflow:', err);
                }
            };

            if (isLoading) return;

            setLoading(true);

            if (authToken) {
                await fetchWorkflow();
            } else {
                const templateFetched = await fetchTemplate();
                await fetchWorkflowConfig(templateFetched);
            }

            setLoading(false);
        };

        init();
    }, [isLoading, authToken, templateId, workflowId]);

    const editingWorkflowYaml = useMemo(() => {
        if (!editingWorkflow) return null;
        return generateEditingWorkflowFromConfigUseCase(editingWorkflow);
    }, [editingWorkflow]);

    const resetEditingWorkflow = () => {
        if (initialEditingWorkflowData) {
            setEditingWorkflow(initialEditingWorkflowData);
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
        template,
        editingWorkflow,
        setEditingWorkflow,
        resetEditingWorkflow,
        errors,
        setErrors,
        editingWorkflowYaml,
        loading,
        setWorkflowNameAndDescription,
        isEditingExistingWorkflow,
    };

    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
