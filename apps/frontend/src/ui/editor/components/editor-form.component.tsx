'use client';

import { ReactNode } from 'react';

import { useEditor } from '../hooks/editor.hooks';

import { CustomWorkflowForm } from './workflow-custom-form.component';
import { TemplateWorkflowForm } from './workflow-template-form.component';

/**
 * Editor form component
 */
export function EditorForm(): ReactNode {
    const { editingWorkflow } = useEditor();

    if (!editingWorkflow) return null;

    if (editingWorkflow.id === 'custom') {
        return <CustomWorkflowForm />;
    }

    return <TemplateWorkflowForm />;
}
