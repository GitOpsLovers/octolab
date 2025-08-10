'use client';

import { ReactNode } from 'react';

import { useEditorTemplate } from '../../hooks/editor-template.hooks';

import { TemplateWorkflowEditorForm } from './template-workflow-editor-form.component';

/**
 * Template workflow editor wrapper component.
 */
export function TemplateWorkflowEditorWrapper(): ReactNode {
    const { editingWorkflow } = useEditorTemplate();

    if (!editingWorkflow) return null;

    return <TemplateWorkflowEditorForm />;
}
