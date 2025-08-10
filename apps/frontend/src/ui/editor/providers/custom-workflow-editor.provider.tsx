'use client';

import { Action, CustomWorkflowConfig, Template } from '@octolab/domain';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EditorCustomContext } from '../contexts/editor.context';

import { generateWorkflowYamlForCustomUseCase } from '@features/editor/application/generate-workflow-yaml-for-custom.use-case';
import { getActionsUseCase } from '@features/editor/application/get-actions.use-case';
import { getOneWorkflowUseCase } from '@features/editor/application/get-one-workflow.use-case';
import { getRunnersUseCase } from '@features/editor/application/get-runners.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';
import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

interface EditorProviderProps {
    children: ReactNode;
    workflowId: string;
}

const createBaseCustomWorkflow = (): CustomWorkflowConfig => ({
    id: 'custom',
    name: 'Workflow name',
    description: 'Workflow description',
    filename: 'custom-workflow.yml',
    workflowName: 'Custom workflow',
    on: 'push',
    branch: 'main',
    schedule: '0 0 * * *',
    jobs: [
        {
            id: 'job-1',
            name: 'Name',
            runner: 'ubuntu-latest',
            steps: [
                {
                    internalId: uuidv4(),
                    id: 'step-one',
                    type: 'run',
                    name: 'Custom command',
                    run: 'echo "Hello world"',
                },
            ],
        },
    ],
});

/**
 * Custom workflow editor provider.
 */
export function CustomWorkflowEditorProvider({ children, workflowId }: EditorProviderProps) {
    const { authToken, isLoading } = useAuthUser();
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [template] = useState<Template | null>(null);
    const [editingWorkflow, setEditingWorkflow] = useState<CustomWorkflowConfig | null>(null);
    const [initialEditingWorkflowData, setInitialEditingWorkflowData] = useState<CustomWorkflowConfig | null>(null);
    const [isEditingExistingWorkflow, setIsEditingExistingWorkflow] = useState<boolean>(false);
    const [availableRunners, setAvailableRunners] = useState<string[]>([]);
    const [availableActions, setAvailableActions] = useState<Action[]>([]);
    const [highlightedFieldKey, setHighlightedFieldKey] = useState<string | null>(null);

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

                        const workflow: CustomWorkflowConfig = {
                            id: existingWorkflowData.id,
                            workflowName: existingWorkflowData.workflowName,
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

            const workflow = createBaseCustomWorkflow();
            setEditingWorkflow(structuredClone(workflow));
            setInitialEditingWorkflowData(structuredClone(workflow));
            setLoading(false);
            return;
        };

        if (!isLoading) {
            setLoading(true);
            init();
        }
    }, [isLoading, authToken, workflowId]);

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

    /**
     * Get actions
     */
    useEffect(() => {
        const fetchActions = async () => {
            try {
                const repository = editorApiRepository();
                const actions = await getActionsUseCase(repository);
                setAvailableActions(actions);
            } catch (err) {
                console.error('Error fetching actions:', err);
            }
        };

        fetchActions();
    }, []);

    // Set the workflow YAML based on the editing workflow
    const editingWorkflowYaml = useMemo(() => {
        if (!editingWorkflow) return null;

        return generateWorkflowYamlForCustomUseCase(editingWorkflow);
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

    const focusYamlAtField = useCallback((fieldKey: string | null) => {
        setHighlightedFieldKey(fieldKey);
    }, []);

    const value = {
        template,
        editingWorkflow,
        editingWorkflowYaml,
        isEditingExistingWorkflow,
        availableRunners,
        availableActions,
        highlightedFieldKey,
        loading,
        errors,
        setIsEditingExistingWorkflow,
        setWorkflowNameAndDescription,
        setEditingWorkflow,
        resetEditingWorkflow,
        focusYamlAtField,
        setErrors,
    };

    return <EditorCustomContext.Provider value={value}>{children}</EditorCustomContext.Provider>;
}
