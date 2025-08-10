'use client';

import { Template, WorkflowTemplateConfig } from '@octolab/domain';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { EditorTemplateContext } from '../contexts/editor.context';

import { generateWorkflowYamlForTemplatesUseCase } from '@features/editor/application/generate-workflow-yaml-for-templates.use-case';
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
    const [editingWorkflow, setEditingWorkflow] = useState<WorkflowTemplateConfig | null>(null);
    const [initialEditingWorkflowData, setInitialEditingWorkflowData] = useState<WorkflowTemplateConfig | null>(null);
    const [isEditingExistingWorkflow, setIsEditingExistingWorkflow] = useState<boolean>(false);
    const [highlightedFieldKey, setHighlightedFieldKey] = useState<string | null>(null);

    /**
     * Get available runners
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

    /**
     * Get template workflow configuration
     */
    useEffect(() => {
        const init = async () => {
            // If we have workflow Id, we look them up in the database (we are editing)
            if (workflowId) {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const repository = editorApiRepository(authToken!);
                    const existingWorkflow = await getOneWorkflowUseCase(repository, workflowId);

                    if (existingWorkflow) {
                        const existingWorkflowData = JSON.parse(existingWorkflow.data);

                        const workflow: WorkflowTemplateConfig = {
                            id: existingWorkflowData.id,
                            name: existingWorkflow.name,
                            runner: existingWorkflowData.runner,
                            jobName: existingWorkflowData.jobName,
                            description: existingWorkflow.description,
                            filename: existingWorkflowData.filename ?? 'custom-workflow.yml',
                            fields: existingWorkflowData.fields,
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

            // We obtain the template data
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

            // We obtain the workflow template configuration
            const fetchWorkflowConfig = async () => {
                try {
                    const repository = editorApiRepository();
                    const workflowConfigFromApi = await getWorkflowConfigUseCase(repository, templateId);

                    const initialWorkflow: WorkflowTemplateConfig = {
                        ...workflowConfigFromApi,
                        name: 'Set workflow name',
                        description: 'Set workflow description',
                    };

                    setEditingWorkflow(structuredClone(initialWorkflow));
                    setInitialEditingWorkflowData(structuredClone(initialWorkflow));
                } catch (err) {
                    console.error('Error fetching template workflow configuration:', err);
                }
            };

            Promise.all([fetchTemplate(), fetchWorkflowConfig()]);

            setLoading(false);
        };

        if (!isLoading) {
            setLoading(true);
            init();
        }
    }, [isLoading, authToken, templateId, workflowId]);

    /**
     * Set the workflow YAML based on the editing workflow
     */
    const editingWorkflowYaml = useMemo(() => {
        if (!editingWorkflow) return null;

        return generateWorkflowYamlForTemplatesUseCase(editingWorkflow);
    }, [editingWorkflow]);

    /**
     * Reset the editing workflow to its initial state
     */
    const resetEditingWorkflow = () => {
        if (initialEditingWorkflowData) {
            setEditingWorkflow(structuredClone(initialEditingWorkflowData));
        }
    };

    /**
     * Set the workflow name and description
     */
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

    /**
     * Focus the YAML editor at the specified field
     */
    const focusYamlAtField = useCallback((fieldKey: string | null) => {
        setHighlightedFieldKey(fieldKey);
    }, []);

    const value = {
        editingWorkflow,
        editingWorkflowYaml,
        availableRunners,
        template,
        isEditingExistingWorkflow,
        highlightedFieldKey,
        loading,
        errors,
        setEditingWorkflow,
        resetEditingWorkflow,
        setIsEditingExistingWorkflow,
        setWorkflowNameAndDescription,
        focusYamlAtField,
        setErrors,
    };

    return <EditorTemplateContext.Provider value={value}>{children}</EditorTemplateContext.Provider>;
}
