'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';

import { EditorContext } from '../contexts/editor.context';

import { generateEditingWorkflowFromConfigUseCase } from '@features/editor/application/generate-editing-workflow-from-config.use-case';
import { getWorkflowConfigUseCase } from '@features/editor/application/get-workflow-config.use-case';
import { WorkflowConfig } from '@features/editor/domain/models/editor.models';
import { workflowsApiRepository } from '@features/editor/infrastructure/workflows-api.repository';
import { getOneTemplateUseCase } from '@features/templates/application/get-one-template.use-case';
import { Template } from '@features/templates/domain/models/template.models';
import { templatesApiRepository } from '@features/templates/infrastructure/templates-api.repository';

interface EditorProviderProps {
    children: ReactNode;
    templateId: string;
}

/**
 * Editor context provider
 */
export function EditorProvider({ children, templateId }: EditorProviderProps) {
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [template, setTemplate] = useState<Template | null>(null);
    const [editingWorkflow, setEditingWorkflow] = useState<WorkflowConfig | null>(null);
    const [initialEditingWorkflowData, setInitialEditingWorkflowData] = useState<WorkflowConfig | null>(null);

    // Fetch the template
    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const repository = templatesApiRepository();
                const templateFromApi = await getOneTemplateUseCase(repository, templateId);
                setTemplate(templateFromApi);
            } catch (err) {
                console.error('Error fetching template:', err);
            }
        };

        fetchTemplate();
    }, [templateId]);

    // Fetch workflow configuration
    useEffect(() => {
        const fetchWorkflowConfig = async () => {
            try {
                const repository = workflowsApiRepository();
                const workflowConfigFromApi = await getWorkflowConfigUseCase(repository, templateId);
                const initialWorkflow: WorkflowConfig = {
                    ...workflowConfigFromApi,
                    name: template?.name ?? '',
                    description: template?.description ?? '',
                };

                setEditingWorkflow(initialWorkflow);
                setInitialEditingWorkflowData(initialWorkflow);
            } catch (err) {
                console.error('Error fetching workflow configuration:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkflowConfig();
    }, [templateId, template]);

    // Generate the editing workflow yaml for the preview
    const editingWorkflowYaml = useMemo(() => {
        if (!editingWorkflow) return null;

        return generateEditingWorkflowFromConfigUseCase(editingWorkflow);
    }, [editingWorkflow]);

    // Reset the editing workflow to the default values
    const resetEditingWorkflow = () => {
        if (initialEditingWorkflowData) {
            setEditingWorkflow(initialEditingWorkflowData);
        }
    };

    // Update workflow title and description
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
    };

    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
