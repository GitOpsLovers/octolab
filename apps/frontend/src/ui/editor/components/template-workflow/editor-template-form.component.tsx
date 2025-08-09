'use client';

import { ReactNode } from 'react';

import { useEditorTemplate } from '../../hooks/editor-template.hooks';

import { TemplateWorkflowForm } from './workflow-template-form.component';

/**
 * Editor form for templates component
 */
export function EditorTemplateForm(): ReactNode {
    const { editingWorkflow } = useEditorTemplate();

    if (!editingWorkflow) return null;

    return <TemplateWorkflowForm />;
}
