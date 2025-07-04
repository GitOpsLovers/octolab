'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';

import { EditorContext } from '../contexts/editor.context';

import { generateEditingWorkflowFromConfigUseCase } from '@features/editor/application/generate-editing-workflow-from-config.use-case';
import { getOneTemplateUseCase } from '@features/templates/application/get-one-template.use-case';
import { getTemplateConfigUseCase } from '@features/templates/application/get-template-config.use-case';
import { Template, TemplateConfig } from '@features/templates/domain/models/template.models';
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
    const [templateConfig, setTemplateConfig] = useState<TemplateConfig | null>(null);
    const [initialTemplateConfig, setInitialTemplateConfig] = useState<TemplateConfig | null>(null);

    // Fetch the template and its configuration
    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const repository = templatesApiRepository();
                const templateFromApi = await getOneTemplateUseCase(repository, templateId);

                setTemplate(templateFromApi);
            } catch (err) {
                console.error('Error fetching template:', err);
            } finally {
                setLoading(false);
            }
        };
        const fetchTemplateConfig = async () => {
            try {
                const repository = templatesApiRepository();
                const templateConfigFromApi = await getTemplateConfigUseCase(repository, templateId);

                setTemplateConfig(templateConfigFromApi);
                setInitialTemplateConfig(templateConfigFromApi); // 💥 Guardas copia original
            } catch (err) {
                console.error('Error fetching template configuration:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplate();
        fetchTemplateConfig();
    }, [templateId]);

    // Generate the editing workflow from the template configuration for the preview
    const editingWorkflow = useMemo(() => {
        if (!templateConfig) return null;

        return generateEditingWorkflowFromConfigUseCase(templateConfig);
    }, [templateConfig]);

    // Reset the config to the default values
    const resetTemplateConfig = () => {
        if (initialTemplateConfig) {
            setTemplateConfig(initialTemplateConfig);
        }
    };

    const value = { template, templateConfig, setTemplateConfig, resetTemplateConfig, errors, setErrors, editingWorkflow, loading };

    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
